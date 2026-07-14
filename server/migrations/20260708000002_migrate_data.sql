-- ========================================
-- SOULFULART - Data Migration
-- Migrates data from old schema to new schema
-- ========================================

USE soulfulart;

-- Step 1: Migrate categories from old_categories
INSERT INTO categories (id_category, name, created_at)
SELECT id, name, created_at FROM old_categories;

-- Step 2: Insert products (extracted from product_images)
INSERT INTO products (name, price)
SELECT name_product, price FROM product_images;

-- Step 3: Insert images (extracted from product_images)
INSERT INTO images (title, alt, image_url, public_id, file_size, mime_type, dimensions, created_at, updated_at)
SELECT name_product, alt, image_url, public_id, file_size, mime_type, dimensions, created_at, updated_at
FROM product_images;

-- Step 4: Create product_records (link product <-> image <-> category)
INSERT INTO product_records (id_product, id_image, id_category, is_active)
SELECT
    p.id_product,
    i.id_image,
    pi.category_id,
    pi.is_active
FROM product_images pi
JOIN products p ON p.name COLLATE utf8mb4_0900_ai_ci = pi.name_product COLLATE utf8mb4_0900_ai_ci AND p.price = pi.price
JOIN images i ON i.public_id COLLATE utf8mb4_0900_ai_ci = pi.public_id COLLATE utf8mb4_0900_ai_ci;

-- Verify migration
SELECT COUNT(*) AS total FROM product_records;
-- Must equal COUNT from product_images

-- ========================================
-- CLEANUP (run after verifying)
-- ========================================
DROP TABLE product_images;
DROP TABLE old_categories;
