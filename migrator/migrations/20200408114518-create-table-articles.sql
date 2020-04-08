create table articles (
  id bigserial primary key,

  author_user_id bigint references users(id),

  title text,
  body text,

  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone not null default current_timestamp
);
