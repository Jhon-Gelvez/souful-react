-- ========================================
-- SOULFULART - Database Schema
-- ========================================

USE soulfulart;

-- Desactivar checks para permitir renombrar tablas con FK
SET FOREIGN_KEY_CHECKS = 0;

RENAME TABLE categories TO old_categories;

-- Table: users
CREATE TABLE users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'customer') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE if EXISTS categories;

-- Table: categories
CREATE TABLE categories (
    id_category INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: products
CREATE TABLE products (
    id_product INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: images
CREATE TABLE images (
    id_image INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    alt TEXT,
    image_url VARCHAR(512) NOT NULL,
    public_id VARCHAR(255) NOT NULL UNIQUE,
    file_size FLOAT,
    mime_type VARCHAR(50),
    dimensions VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: product_records (junction: product <-> image <-> category)
CREATE TABLE product_records (
    id_record INT AUTO_INCREMENT PRIMARY KEY,
    id_product INT NOT NULL,
    id_image INT NOT NULL,
    id_category INT,
    is_active TINYINT(1) DEFAULT 1,
    FOREIGN KEY (id_product) REFERENCES products(id_product),
    FOREIGN KEY (id_image) REFERENCES images(id_image),
    FOREIGN KEY (id_category) REFERENCES categories(id_category),
    UNIQUE KEY unique_product_image (id_product, id_image)
);

-- Table: sales
CREATE TABLE sales (
    id_sale INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_record INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    total_paid DECIMAL(12,2) NOT NULL,
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_record) REFERENCES product_records(id_record)
);
