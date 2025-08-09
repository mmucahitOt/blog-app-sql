CREATE TABLE blogs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER NOT NULL DEFAULT 0
);

INSERT INTO
    blogs (author, url, title)
VALUES (
        'Ada Lovelace',
        'https://example.com/intro-to-algorithms',
        'An Introduction to Algorithms'
    ),
    (
        'Grace Hopper',
        'https://example.com/compilers-101',
        'Compilers 101'
    );