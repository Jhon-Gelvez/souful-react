/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-12.3.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: soulfulart
-- ------------------------------------------------------
-- Server version	12.3.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id_category` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_category`)
) ENGINE=InnoDB AUTO_INCREMENT=237 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES
(1,'animes','2026-02-10 15:44:52'),
(2,'animales','2026-02-10 15:45:31'),
(3,'muñecas','2026-02-10 15:45:36'),
(4,'objetos','2026-02-10 16:21:26'),
(6,'amigurumis','2026-03-13 14:26:13'),
(219,'test3','2026-07-16 15:38:45');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id_image` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `alt` text DEFAULT NULL,
  `image_url` varchar(512) NOT NULL,
  `public_id` varchar(255) NOT NULL,
  `file_size` float DEFAULT NULL,
  `mime_type` varchar(50) DEFAULT NULL,
  `dimensions` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_image`),
  UNIQUE KEY `public_id` (`public_id`)
) ENGINE=InnoDB AUTO_INCREMENT=265 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES
(1,'florero tejido','girasol, tulipan, rosa ','https://res.cloudinary.com/dnucajsxn/image/upload/f_auto,q_auto/v1782083399/rnisywdplm1zbs63rsaf.jpg','rnisywdplm1zbs63rsaf',98797,'image/jpg','1200x1600','2026-06-21 23:09:59','2026-07-07 13:09:53'),
(2,'manilla de loro','manilla de loro hecha en pillar','https://res.cloudinary.com/dnucajsxn/image/upload/f_auto,q_auto/v1782083857/w5xiidjgzcpzjjakxloj.jpg','w5xiidjgzcpzjjakxloj',45936,'image/jpg','481x641','2026-06-21 23:17:37','2026-07-07 13:25:47'),
(3,'manillas cruz','3  manillas tejidas con diferentes disenos','https://res.cloudinary.com/dnucajsxn/image/upload/f_auto,q_auto/v1782083517/v4m4l8dxvijq3gter3ec.jpg','v4m4l8dxvijq3gter3ec',177435,'image/jpg','1200x1600','2026-06-21 23:11:57','2026-06-21 23:11:57'),
(4,'llavero de piña','llavero tejido de una pina','https://res.cloudinary.com/dnucajsxn/image/upload/v1782086376/gemy5soddxecn0atff3d.jpg','gemy5soddxecn0atff3d',136860,'image/jpg','1600x1200','2026-06-21 23:14:48','2026-07-07 13:31:26'),
(6,'muneca','muneca tejida con vestido rojo','https://res.cloudinary.com/dnucajsxn/image/upload/f_auto,q_auto/v1782083608/nehcro7wtiepthwbhymf.jpg','nehcro7wtiepthwbhymf',82903,'image/jpg','899x1599','2026-06-21 23:13:29','2026-06-21 23:13:29'),
(7,'inozuke','muneco tejido de innozuke','https://res.cloudinary.com/dnucajsxn/image/upload/v1782086405/kfhewgsg5ds2g1wvhzz2.jpg','kfhewgsg5ds2g1wvhzz2',173615,'image/jpg','1600x1200','2026-06-21 23:14:05','2026-06-27 19:01:30'),
(262,'dftdfgdfgsdfgs','fhsgdghdfghdfht','https://res.cloudinary.com/dnucajsxn/image/upload/f_auto,q_auto/v1784845974/fhfbnhtgjtgmlct7xgkt.jpg','fhfbnhtgjtgmlct7xgkt',34855,'image/jpg','736x396','2026-07-23 22:32:55','2026-07-23 22:32:55'),
(263,'bfghjtynbfhjntyghjygmn','bghjmnv bhnjmv hjmnykjhkmygu','https://res.cloudinary.com/dnucajsxn/image/upload/f_auto,q_auto/v1784847324/blwbhlbj5duq9frdqhrz.jpg','blwbhlbj5duq9frdqhrz',1527500,'image/jpg','3840x2160','2026-07-23 22:55:24','2026-07-23 22:55:24'),
(264,'cghjfv  g','Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim suscipit dolorem distinctio dicta? Ratione, reprehenderit neque amet, quas quasi error voluptate voluptatibus fugit vitae itaque eveniet praesentium, veniam aspernatur excepturi.','https://res.cloudinary.com/dnucajsxn/image/upload/f_auto,q_auto/v1784847839/xg9jwdojmchcthtlpvt2.jpg','xg9jwdojmchcthtlpvt2',17596,'image/jpg','736x410','2026-07-23 23:03:59','2026-07-24 20:19:59');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `product_records`
--

DROP TABLE IF EXISTS `product_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_records` (
  `id_record` int(11) NOT NULL AUTO_INCREMENT,
  `id_product` int(11) NOT NULL,
  `id_image` int(11) NOT NULL,
  `id_category` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id_record`),
  UNIQUE KEY `unique_product_image` (`id_product`,`id_image`),
  KEY `fk_records_images` (`id_image`),
  KEY `fk_records_categories` (`id_category`),
  CONSTRAINT `fk_records_categories` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id_category`),
  CONSTRAINT `fk_records_images` FOREIGN KEY (`id_image`) REFERENCES `images` (`id_image`),
  CONSTRAINT `fk_records_products` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`)
) ENGINE=InnoDB AUTO_INCREMENT=167 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_records`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `product_records` WRITE;
/*!40000 ALTER TABLE `product_records` DISABLE KEYS */;
INSERT INTO `product_records` VALUES
(1,4,4,4,1),
(3,7,7,6,1),
(4,6,6,3,1),
(5,1,1,4,1),
(6,3,3,4,1),
(7,2,2,2,1),
(166,262,264,219,1);
/*!40000 ALTER TABLE `product_records` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id_product` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_product`)
) ENGINE=InnoDB AUTO_INCREMENT=263 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES
(1,'florero tejido',10000.00,'2026-07-08 16:47:51'),
(2,'manilla de loro',15000.00,'2026-07-08 16:47:51'),
(3,'manillas cruz',30000.00,'2026-07-08 16:47:51'),
(4,'llavero de piña',10000.00,'2026-07-08 16:47:51'),
(6,'muneca',15000.00,'2026-07-08 16:47:51'),
(7,'inozuke',15000.00,'2026-07-08 16:47:51'),
(262,'test 1',9.00,'2026-07-23 23:03:59');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales` (
  `id_sale` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_record` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `total_paid` decimal(12,2) NOT NULL,
  `sale_date` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_sale`),
  KEY `fk_sales_records` (`id_record`),
  KEY `fk_sales_users` (`id_user`),
  CONSTRAINT `fk_sales_records` FOREIGN KEY (`id_record`) REFERENCES `product_records` (`id_record`),
  CONSTRAINT `fk_sales_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','customer') DEFAULT 'customer',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(132,'Test','Sale','test_sale_user','hashed_password_123','customer','2026-07-16 15:38:45');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-07-24 16:22:37
