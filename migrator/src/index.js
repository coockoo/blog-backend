const Promise = require('bluebird');
const fs = require('fs');
const Knex = require('knex');
const path = require('path');

const readDir = Promise.promisify(fs.readdir);
const readFile = Promise.promisify((filename, cb) => fs.readFile(filename, 'utf8', cb));

async function hasTable(knex, tableName) {
  const res = await knex('information_schema.tables')
    .first()
    .where('table_schema', 'public')
    .where('table_name', tableName);
  return !!res;
}

async function applyMigration(knex, migrationsDir, migration) {
  const text = await readFile(path.join(migrationsDir, migration));

  await knex.transaction(async (trx) => {
    try {
      await knex.schema.raw(text).transacting(trx);
      await knex('migrations').insert({ name: migration }).transacting(trx);
      console.log('Applied migration %s', migration);
    } catch (error) {
      console.error('Failed to apply migration %s', migration);
      throw error;
    }
  });
}

async function applyMigrations() {
  console.log('ENV', process.env);
  const knex = Knex({
    client: 'pg',
    connection: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      ssl: false,
    },
  });

  const migrationsDir = path.join(__dirname, '../migrations');
  const createTableMigrationsPath = path.join(__dirname, 'create-table-migrations.sql');

  try {
    const hasMigrationsTable = await hasTable(knex, 'migrations');
    if (!hasMigrationsTable) {
      const migrationsTableText = await readFile(createTableMigrationsPath);
      await knex.schema.raw(migrationsTableText);
    }
    const appliedMigrations = await knex('migrations').pluck('name').orderBy('applied_at');
    let migrationsFromDir = await readDir(migrationsDir);
    migrationsFromDir = migrationsFromDir.filter(
      (migration) => migration && migration.match(/\.sql$/)
    );
    const migrationsToApply = [migrationsFromDir, appliedMigrations].reduce((a, b) =>
      a.filter((c) => !b.includes(c))
    );

    await Promise.each(migrationsToApply, (migration) => {
      return applyMigration(knex, migrationsDir, migration);
    });
    await knex.destroy();
  } catch (error) {
    await knex.destroy();
    throw error;
  }
}

async function main() {
  try {
    await applyMigrations();
    console.log('Migrations applied successfully!');
  } catch (error) {
    console.error('Error happened during apply migrations process', error);
    process.exit(1);
  }
}

main();
