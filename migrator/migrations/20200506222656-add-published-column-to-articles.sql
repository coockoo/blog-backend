alter table articles add column is_published boolean not null default false;
alter table articles add column last_published_at timestamptz;
update articles set last_published_at = created_at;
