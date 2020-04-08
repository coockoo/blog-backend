create table auth_tokens (
  id bigserial not null primary key,

  user_id bigint not null references users(id),

  origin jsonb,

  access_key text unique,
  access_expires_at timestamp with time zone,

  refresh_key text unique,
  refresh_expires_at timestamp with time zone,

  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone not null default current_timestamp
);
