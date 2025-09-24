
BEGIN;

INSERT INTO users (username, created_at) VALUES
('alice', NOW()),
('bob', NOW()),
('charlie', NOW()),
('diana', NOW());

INSERT INTO hashtags (tag_name) VALUES
('tech'),
('javascript'),
('python'),
('webdev'),
('datascience'),
('ai'),
('sql'),
('orm');


INSERT INTO posts (id, user_id, content, created_at) VALUES
(1, 1, 'Love the new features in #javascript! #webdev #tech', NOW()),
(2, 2, 'Python for #datascience is a game changer. #python #ai', NOW()),
(3, 4, 'Sequelize makes working with #sql databases so much easier! #orm #tech', NOW()),
(4, 1, 'Just built a cool new site. #javascript #webdev', NOW());

INSERT INTO post_hashtags (post_id, hashtag_id, created_at, updated_at) VALUES
(1, 2, NOW(), NOW()), (1, 4, NOW(), NOW()), (1, 1, NOW(), NOW()),
(2, 5, NOW(), NOW()), (2, 3, NOW(), NOW()), (2, 6, NOW(), NOW()),
(3, 7, NOW(), NOW()), (3, 8, NOW(), NOW()), (3, 1, NOW(), NOW()),
(4, 2, NOW(), NOW()), (4, 4, NOW(), NOW());

INSERT INTO comments (id, post_id, user_id, content, created_at) VALUES
(5, 3, 1, 'I agree! It abstracts away so much boilerplate.', NOW());

INSERT INTO comments (id, post_id, user_id, parent_comment_id, content, created_at) VALUES
(6, 3, 2, 5, 'Have you tried the eager loading feature? It is amazing for performance.', NOW()),
(7, 3, 4, 6, 'I have! Being able to fetch all related data in one go is a lifesaver.', NOW());

INSERT INTO comments (id, post_id, user_id, content, created_at) VALUES
(8, 3, 3, 'Great discussion here.', NOW());

SELECT setval('users_id_seq', (SELECT MAX(id) FROM users), true);
SELECT setval('posts_id_seq', (SELECT MAX(id) FROM posts), true);
SELECT setval('hashtags_id_seq', (SELECT MAX(id) FROM hashtags), true);
SELECT setval('comments_id_seq', (SELECT MAX(id) FROM comments), true);


COMMIT;