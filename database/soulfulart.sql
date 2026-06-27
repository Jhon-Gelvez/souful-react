-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: soulfulart
-- ------------------------------------------------------
-- Server version	8.0.45

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
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'animes','2026-02-10 15:44:52'),(2,'animales','2026-02-10 15:45:31'),(3,'muñecas','2026-02-10 15:45:36'),(4,'objetos','2026-02-10 16:21:26'),(6,'amigurumis','2026-03-13 14:26:13');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` varchar(50) NOT NULL,
  `name_product` varchar(255) NOT NULL,
  `alt` text,
  `price` decimal(12,2) NOT NULL,
  `image_url` varchar(512) NOT NULL,
  `public_id` varchar(255) NOT NULL,
  `file_size` float DEFAULT NULL,
  `mime_type` varchar(50) DEFAULT NULL,
  `dimensions` varchar(20) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_product_category` (`category_id`),
  CONSTRAINT `fk_product_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES ('14eaa04d-f46b-4bec-bfb3-74811fb59804','olas','olas',8.00,'https://res.cloudinary.com/dnucajsxn/image/upload/f_auto,q_auto/v1780345213/kodjaqifkyis8kwycgql.jpg','kodjaqifkyis8kwycgql',96881,'image/jpg','736x736',4,1,'2026-06-01 20:20:14','2026-06-01 20:20:14'),('171052aa-84aa-4ecf-a630-fd6e8d379163','dragon wallpaper garuda','dragon wallpaper garuda x2 xd',1.00,'https://res.cloudinary.com/dnucajsxn/image/upload/f_auto,q_auto/v1771190935/m0gf2kdfmpzkylzyseyp.png','m0gf2kdfmpzkylzyseyp',670499,'image/png','1920x1080',1,1,'2026-02-15 21:28:57','2026-03-08 20:41:38'),('4fcfb4f0-3ce4-4c37-aa2b-e23b5dd90aa2','garuda','foto estilo hacker ',3.00,'https://res.cloudinary.com/dnucajsxn/image/upload/f_auto,q_auto/v1771190968/trnedaauxhmx9qa9n5ms.png','trnedaauxhmx9qa9n5ms',7828290,'image/png','3840x2160',1,1,'2026-02-15 21:29:29','2026-03-07 19:15:34'),('9f914f49-12bb-4749-a712-18277bab7d5f','aguila','un aguila 🦅',1.00,'https://res.cloudinary.com/dnucajsxn/image/upload/f_auto,q_auto/v1771333757/gcpllxsz9yyf9quewyqh.png','gcpllxsz9yyf9quewyqh',1463960,'image/png','1920x1080',4,1,'2026-02-17 13:09:19','2026-06-01 20:49:09'),('c55f8e55-797c-4c12-a15d-57cbc3b7528d','garuda wallpaper neon','garuda neon',1.00,'https://res.cloudinary.com/dnucajsxn/image/upload/f_auto,q_auto/v1771190944/ixv1adylk5mfuuardrii.jpg','ixv1adylk5mfuuardrii',1108620,'image/jpg','5120x2880',1,1,'2026-02-15 21:29:05','2026-03-08 23:10:48'),('cbc79715-b4a4-42fb-b521-f45849795367','arch','solo un dato',45.00,'https://res.cloudinary.com/dnucajsxn/image/upload/f_auto,q_auto/v1771190929/rntbdlmchwtyivwl0j3o.png','rntbdlmchwtyivwl0j3o',655869,'image/png','1920x1080',1,1,'2026-02-15 21:28:51','2026-06-01 20:48:39');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-24 15:33:37
