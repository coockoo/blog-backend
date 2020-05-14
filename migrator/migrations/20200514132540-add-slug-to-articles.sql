alter table articles add column slug text unique not null default md5(random()::text);
alter table articles alter column slug drop default;
