/* Replace with your SQL commands */
CREATE TYPE status_type AS ENUM ('active', 'complete');
CREATE TABLE orders (id SERIAL PRIMARY KEY, user_id bigint REFERENCES users(id), order_status status_type);