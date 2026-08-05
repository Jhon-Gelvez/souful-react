use soulfulart;


UPDATE product_images
SET image_url = "https://res.cloudinary.com/dnucajsxn/image/upload/v1782086376/gemy5soddxecn0atff3d.jpg"
where id = "9f2a713f-fe00-4583-8795-326d67c9b188";

SELECT * FROM images;
SELECT * FROM categories;
SELECT * FROM products;
SELECT * FROM images;
SELECT * FROM product_records;

DELETE FROM images WHERE id_image = 263;

-- consultas dia 5/08/2026

select * from images;
select * from product_records;

delete from product_records where id_record = 1;
DELETE FROM images WHERE id_image = '4';
delete from products where id_product = 4;