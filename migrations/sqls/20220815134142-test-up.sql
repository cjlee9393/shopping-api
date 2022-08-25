/* Replace with your SQL commands */
CREATE TABLE books(id SERIAL PRIMARY KEY, title VARCHAR(100), author VARCHAR(100), total_pages INTEGER, type VARCHAR(100), summary text);
INSERT INTO books(title, author, total_pages, type, summary) VALUES ('title', 'author', 0, 'type', 'summary');