/* Replace with your SQL commands */
CREATE TABLE product_orders (
    id integer,
    quantity integer,
    product_id bigint REFERENCES products(id),
    order_id bigint REFERENCES orders(id)
)