-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: soulfulart
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id_category` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_category`)
) ENGINE=InnoDB AUTO_INCREMENT=238 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'anime','2026-02-10 20:44:52'),(2,'animales','2026-02-10 20:45:31'),(3,'muñecas','2026-02-10 20:45:36'),(4,'objetos','2026-02-10 21:21:26'),(6,'amigurumis','2026-03-13 19:26:13');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id_image` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alt` text COLLATE utf8mb4_unicode_ci,
  `image_url` varchar(512) COLLATE utf8mb4_unicode_ci NOT NULL,
  `public_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_size` float DEFAULT NULL,
  `mime_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dimensions` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_image`),
  UNIQUE KEY `public_id` (`public_id`)
) ENGINE=InnoDB AUTO_INCREMENT=271 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'florero tejido','girasol, tulipan, rosa ','https://res.cloudinary.com/dnucajsxn/image/upload/f_auto,q_auto/v1782083399/rnisywdplm1zbs63rsaf.jpg','rnisywdplm1zbs63rsaf',98797,'image/jpg','1200x1600','2026-06-22 04:09:59','2026-07-07 18:09:53'),(2,'manilla de loro','manilla de loro hecha en pillar','https://res.cloudinary.com/dnucajsxn/image/upload/f_auto,q_auto/v1782083857/w5xiidjgzcpzjjakxloj.jpg','w5xiidjgzcpzjjakxloj',45936,'image/jpg','481x641','2026-06-22 04:17:37','2026-07-07 18:25:47'),(3,'manillas cruz','3  manillas tejidas con diferentes disenos','https://res.cloudinary.com/dnucajsxn/image/upload/f_auto,q_auto/v1782083517/v4m4l8dxvijq3gter3ec.jpg','v4m4l8dxvijq3gter3ec',177435,'image/jpg','1200x1600','2026-06-22 04:11:57','2026-06-22 04:11:57'),(4,'llavero de piña','llavero tejido de una pina','https://res.cloudinary.com/dnucajsxn/image/upload/v1782086376/gemy5soddxecn0atff3d.jpg','gemy5soddxecn0atff3d',136860,'image/jpg','1600x1200','2026-06-22 04:14:48','2026-07-07 18:31:26'),(6,'muneca','muneca tejida con vestido rojo','https://res.cloudinary.com/dnucajsxn/image/upload/f_auto,q_auto/v1782083608/nehcro7wtiepthwbhymf.jpg','nehcro7wtiepthwbhymf',82903,'image/jpg','899x1599','2026-06-22 04:13:29','2026-06-22 04:13:29'),(7,'inozuke','muneco tejido de innozuke','https://res.cloudinary.com/dnucajsxn/image/upload/v1782086405/kfhewgsg5ds2g1wvhzz2.jpg','kfhewgsg5ds2g1wvhzz2',173615,'image/jpg','1600x1200','2026-06-22 04:14:05','2026-06-28 00:01:30'),(262,'dftdfgdfgsdfgs','fhsgdghdfghdfht','https://res.cloudinary.com/dnucajsxn/image/upload/f_auto,q_auto/v1784845974/fhfbnhtgjtgmlct7xgkt.jpg','fhfbnhtgjtgmlct7xgkt',34855,'image/jpg','736x396','2026-07-24 03:32:55','2026-07-24 03:32:55'),(263,'bfghjtynbfhjntyghjygmn','bghjmnv bhnjmv hjmnykjhkmygu','https://res.cloudinary.com/dnucajsxn/image/upload/f_auto,q_auto/v1784847324/blwbhlbj5duq9frdqhrz.jpg','blwbhlbj5duq9frdqhrz',1527500,'image/jpg','3840x2160','2026-07-24 03:55:24','2026-07-24 03:55:24'),(267,'Harry Potter','llavero amigurumi Harry Potter','https://res.cloudinary.com/dnucajsxn/image/upload/f_auto,q_auto/v1785101409/ltp01ehmpqwqdj2woay9.jpg','ltp01ehmpqwqdj2woay9',103341,'image/jpg','1200x1600','2026-07-27 02:30:10','2026-07-27 02:30:10'),(269,'dev','dev2','https://res.cloudinary.com/dnucajsxn/image/upload/f_auto,q_auto/v1785932003/rvbxtpddvbtusvf6uzwx.png','rvbxtpddvbtusvf6uzwx',141757,'image/png','940x1014','2026-08-05 12:13:23','2026-08-05 12:13:46'),(270,'dev4','dev4','https://res.cloudinary.com/dnucajsxn/image/upload/f_auto,q_auto/v1785932926/nu8phjmhfvr5ktxwfnww.jpg','nu8phjmhfvr5ktxwfnww',71111,'image/jpg','1080x1080','2026-08-05 12:28:47','2026-08-05 12:28:47');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_records`
--

DROP TABLE IF EXISTS `product_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_records` (
  `id_record` int NOT NULL AUTO_INCREMENT,
  `id_product` int NOT NULL,
  `id_image` int NOT NULL,
  `id_category` int DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_record`),
  UNIQUE KEY `unique_product_image` (`id_product`,`id_image`),
  KEY `fk_records_images` (`id_image`),
  KEY `fk_records_categories` (`id_category`),
  CONSTRAINT `fk_records_categories` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id_category`),
  CONSTRAINT `fk_records_images` FOREIGN KEY (`id_image`) REFERENCES `images` (`id_image`),
  CONSTRAINT `fk_records_products` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`)
) ENGINE=InnoDB AUTO_INCREMENT=173 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_records`
--

LOCK TABLES `product_records` WRITE;
/*!40000 ALTER TABLE `product_records` DISABLE KEYS */;
INSERT INTO `product_records` VALUES (1,4,4,4,1),(3,7,7,6,1),(4,6,6,3,1),(5,1,1,4,1),(6,3,3,4,1),(7,2,2,2,1),(169,265,267,6,1),(171,267,269,1,1),(172,268,270,4,1);
/*!40000 ALTER TABLE `product_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id_product` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_product`)
) ENGINE=InnoDB AUTO_INCREMENT=269 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'florero tejido',10000.00,'2026-07-08 21:47:51'),(2,'manilla de loro',15000.00,'2026-07-08 21:47:51'),(3,'manillas cruz',30000.00,'2026-07-08 21:47:51'),(4,'llavero de piña',10000.00,'2026-07-08 21:47:51'),(6,'muneca',15000.00,'2026-07-08 21:47:51'),(7,'inozuke',15000.00,'2026-07-08 21:47:51'),(265,'Harry Potter',20000.00,'2026-07-27 02:30:10'),(267,'dev2',1111111.00,'2026-08-05 12:13:23'),(268,'dev4',44444.00,'2026-08-05 12:28:47');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-05  7:28:49
