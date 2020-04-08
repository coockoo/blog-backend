create table migrations (
  id bigserial primary key,

  name text not null,

  applied_at timestamp with time zone not null default current_timestamp
);
