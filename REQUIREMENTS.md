# API Endpoints
## Products
- Index: 'products' [GET]
- Show: 'products/:id' [GET]
- Create [token required]: 'products' [POST]

## Users
- Index [token required]: 'users' [GET]
- Show [token required]: 'users/:id' [GET]
- Create New [token required]: 'users' [POST]

## Orders
- Current Order by user (args: user id)[token required]: 'orders/:id' [GET]

#### [token required]: bearer token, see TOKEN_AUTH in *.env* in README.md

# Data Shapes
## Product
- id
- name
- price

## User
- id
- firstName
- lastName
- username
- password_digest

## Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

# Database Tables and Columns
- products (id SERIAL PRIMARY KEY, name VARCHAR(128), price integer)
- users (id SERIAL PRIMARY KEY, first_name VARCHAR(128), last_name VARCHAR(128), username VARCHAR(128), password_digest text)
- orders (id SERIAL PRIMARY KEY, user_id bigint REFERENCES users(id), order_status status_type)
- order_products (id SERIAL PRIMARY KEY, quantity integer, order_id bigint REFERENCES orders(id), product_id bigint REFERENCES products(id))