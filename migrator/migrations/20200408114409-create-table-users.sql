create table users (
  id bigserial not null primary key,

  nickname text unique,
  password text not null,

  first_name text,
  last_name text
);
