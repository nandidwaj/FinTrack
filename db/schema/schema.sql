CREATE DATABASE IF NOT EXISTS fintrack;
use fintrack;

create table users (
    user_id int auto_increment primary key,
    name varchar(100) not null,
    email varchar(150) not null unique,
    password_hash varchar(255) not null,
    created_at timestamp default current_timestamp
);

create table categories(
    category_id int auto_increment primary key,
    name varchar(50) not null unique,
    icon varchar(50),
    color varchar(50)
);

create table transcations(
    transcation_id int auto_increment primary key,
    user_id int not null,
    category_id int,
    amount decimal(10,2) not null,
    type enum('income','expense') not null,
    note text,
    transcation_date date not null,
    created_at timestamp default current_timestamp
    constraint fk_transactions_user foreign key (user_id) references users(user_id) on delete cascade
    constraint fk_transactions_category foreign key (category_id) references categories(category_id) on delete cascade
);

create index idx_transactions_user on transcations(user_id);
create index idx_transactions_date on transcations(transcation_date);
create index idx_transactions_category on transcations(category_id);

create table budgets(
    budget_id int auto_increment primary key,
    user_id int not null,
    category_id int not null,
    amount decimal(10,2) not null,
    month int not null,
    year int not null,
    constraint fk_budgets_user foreign key (user_id) references users(user_id) on delete cascade
    constraint fk_budgets_category foreign key (category_id) references categories(category_id) on delete cascade
    constraint unique_budget unique(user_id,category_id,month,year)
);

create table recurring_bills(
    bill_id int auto_increment primary key,
    user_id int not null,
    name varchar(100) not null,
    amount decimal(10,2) not null,
    frequency enum('monthly','yearly') not null,
    next_due_date date not null,
    is_active tinyint(1) default 1,
    constraint fk_bills_user foreign key (user_id) references users(user_id) on delete cascade
);

create table pots(
    pot_id int auto_increment primary key,
    user_id int not null,
    name varchar(100) not null,
    target_amount decimal(10,2) default 0,
    constraint fk_pots_user foreign key (user_id) references users(user_id) on delete cascade
);

--added current_amount column externally
--added category_id,last_paid_date,created_at,notes to recurring_bills table externally