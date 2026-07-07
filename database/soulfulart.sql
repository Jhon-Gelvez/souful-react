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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
(6,'amigurumis','2026-03-13 14:26:13');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` varchar(50) NOT NULL,
  `name_product` varchar(255) NOT NULL,
  `alt` text DEFAULT NULL,
  `price` decimal(12,2) NOT NULL,
  `image_url` varchar(512) NOT NULL,
  `public_id` varchar(255) NOT NULL,
  `file_size` float DEFAULT NULL,
  `mime_type` varchar(50) DEFAULT NULL,
  `dimensions` varchar(20) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_product_category` (`category_id`),
  CONSTRAINT `fk_product_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES
('02bd55ef-4513-4f7c-8a71-a6e6863dc1f8','florero tejido','girasol, tulipan, rosa ',10000.00,'https://res.cloudinary.com/dnucajsxn/image/upload/f_auto,q_auto/v1782083399/rnisywdplm1zbs63rsaf.jpg','rnisywdplm1zbs63rsaf',98797,'image/jpg','1200x1600',4,1,'2026-06-21 23:09:59','2026-07-07 13:09:53'),
('0465eb9e-3def-4ec0-99da-337e870e6a27','manilla de loro','manilla de loro hecha en pillar',15000.00,'https://res.cloudinary.com/dnucajsxn/image/upload/f_auto,q_auto/v1782083857/w5xiidjgzcpzjjakxloj.jpg','w5xiidjgzcpzjjakxloj',45936,'image/jpg','481x641',2,1,'2026-06-21 23:17:37','2026-07-07 13:25:47'),
('2f1eb429-455c-4b8c-ae06-95954e16326c','manillas cruz','3  manillas tejidas con diferentes disenos',30000.00,'https://res.cloudinary.com/dnucajsxn/image/upload/f_auto,q_auto/v1782083517/v4m4l8dxvijq3gter3ec.jpg','v4m4l8dxvijq3gter3ec',177435,'image/jpg','1200x1600',4,1,'2026-06-21 23:11:57','2026-06-21 23:11:57'),
('9f2a713f-fe00-4583-8795-326d67c9b188','llavero de piña','llavero tejido de una pina',10000.00,'https://res.cloudinary.com/dnucajsxn/image/upload/v1782086376/gemy5soddxecn0atff3d.jpg','gemy5soddxecn0atff3d',136860,'image/jpg','1600x1200',4,1,'2026-06-21 23:14:48','2026-07-07 13:31:26'),
('a76a4fac-b927-4349-9f79-0bc7094f713f','ramo de flores','ramo tejido con girasoles tulipanes y rozas',60000.00,'https://res.cloudinary.com/dnucajsxn/image/upload/f_auto,q_auto/v1782083773/hnhbkedrrx4syljhhmff.jpg','hnhbkedrrx4syljhhmff',175203,'image/jpg','1200x1600',4,1,'2026-06-21 23:16:13','2026-07-07 13:32:07'),
('c7c3e1d0-8767-4687-809d-ac3c84fa870a','muneca','muneca tejida con vestido rojo',15000.00,'https://res.cloudinary.com/dnucajsxn/image/upload/f_auto,q_auto/v1782083608/nehcro7wtiepthwbhymf.jpg','nehcro7wtiepthwbhymf',82903,'image/jpg','899x1599',3,1,'2026-06-21 23:13:29','2026-06-21 23:13:29'),
('d79075b9-1396-49dd-8ab6-84758e0fccb4','inozuke','muneco tejido de innozuke',15000.00,'https://res.cloudinary.com/dnucajsxn/image/upload/v1782086405/kfhewgsg5ds2g1wvhzz2.jpg','kfhewgsg5ds2g1wvhzz2',173615,'image/jpg','1600x1200',3,1,'2026-06-21 23:14:05','2026-06-27 19:01:30');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
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

-- Dump completed on 2026-07-07  8:49:55
