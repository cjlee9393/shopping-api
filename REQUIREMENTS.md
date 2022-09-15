# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: 'products' [GET]
- Show: 'products/:id' [GET]
- Create [token required]: 'products' [POST]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]: 'users' [GET]
- Show [token required]: 'users/:id' [GET]
- Create New [token required]: 'users' [POST]

#### Orders
- Current Order by user (args: user id)[token required]: 'orders/:id' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

* [token required]: bearer token, see TOKEN_AUTH in *.env* in README.md

## Data Shapes
#### Product
- id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- username
- password_digest

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Database Tables and Columns
- products (id SERIAL PRIMARY KEY, name VARCHAR(128), price integer)
- users (id SERIAL PRIMARY KEY, first_name VARCHAR(128), last_name VARCHAR(128), username VARCHAR(128), password_digest text)
- orders (id SERIAL PRIMARY KEY, user_id bigint REFERENCES users(id), order_status status_type)
- order_products (id SERIAL PRIMARY KEY, quantity integer, order_id bigint REFERENCES orders(id), product_id bigint REFERENCES products(id))