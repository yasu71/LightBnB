INSERT INTO users (name, email, password)
VALUES ('Madina Sanders', 'madina_s@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Bernice Nunez', 'b_nunez@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Ariyan Parsons', 'AriyanParsons@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Louisa Sandoval', 'Louisa_Sandoval@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Oceran View', 'description', 'mexico-123.com', 'mexico-abc.com', 300, 3, 2, 3, 'Mexico', '123 Chihuahua st', 'Cancun', 'Quitana Roo', '77500', TRUE),
(2, 'Hollywood', 'description', 'hollywood123.com', 'hollywood-abc.com', 420, 1, 1, 3, 'United States', '123 Vine st', 'Los Angeles', 'Quitana Roo', '90001', TRUE),
(3, 'Kyoto', 'description', 'kyoto123.com', 'kyoto-abc.com', 370, 0, 1, 2, 'Japan', '123 Karasuma st', 'Kyoto', 'Kyoto', '111-2345', TRUE),
(4, 'Florence', 'description', 'florence123.com', 'florence-abc.com', 450, 1, 1, 2, 'Italy', '123 Via del Pepi st', 'Florence', 'Florence', '50121', TRUE);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2019-06-22', '2019-07-10', 4, 1),
('2020-10-02', '2019-10-07', 3, 2),
('2018-02-17', '2019-02-20', 2, 3),
('2021-11-01', '2021-11-18', 1, 4);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 2, 3, 4, 'message'),
(2, 3, 4, 5, 'message'),
(3, 4, 1, 4, 'message'),
(4, 1, 2, 3, 'message');