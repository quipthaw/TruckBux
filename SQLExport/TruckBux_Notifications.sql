-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: team-27.cobd8enwsupz.us-east-1.rds.amazonaws.com    Database: TruckBux
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `Notifications`
--

DROP TABLE IF EXISTS `Notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Notifications` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `message` varchar(100) NOT NULL,
  `dateCreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `seen` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Id_UNIQUE` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=174 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notifications`
--

LOCK TABLES `Notifications` WRITE;
/*!40000 ALTER TABLE `Notifications` DISABLE KEYS */;
INSERT INTO `Notifications` VALUES (1,'plwork','points','2022-11-04 05:01:14',1),(2,'plwork','points','2022-11-04 05:02:55',1),(3,'plwork','fun','2022-11-04 05:03:02',1),(4,'(\'nrabon\',)','points','2022-11-04 06:34:20',0),(5,'(\'nrabon\',)','points','2022-11-04 06:35:17',0),(6,'(\'nrabon\',)','points','2022-11-04 06:36:00',0),(7,'nrabon','points','2022-11-04 06:36:57',0),(8,'nrabon','points','2022-11-04 06:38:05',0),(9,'nrabon','points','2022-11-04 06:39:55',0),(10,'newGuy','points','2022-11-04 06:40:53',0),(11,'nrabon','points','2022-11-04 06:40:53',0),(12,'n','points','2022-11-04 06:41:42',0),(13,'r','points','2022-11-04 06:41:42',0),(14,'a','points','2022-11-04 06:41:42',0),(15,'b','points','2022-11-04 06:41:42',0),(16,'o','points','2022-11-04 06:41:42',0),(17,'n','points','2022-11-04 06:41:43',0),(18,'nrabon','points','2022-11-04 06:51:25',0),(19,'nrabon','points','2022-11-04 06:52:09',0),(20,'newGuy','points','2022-11-04 06:52:09',0),(21,'newGuy','points','2022-11-04 06:53:04',0),(22,'nrabon','points','2022-11-04 06:53:04',0),(23,'newGuy','points','2022-11-04 19:07:11',0),(24,'nrabon','points','2022-11-04 19:07:11',0),(25,'newGuy','points','2022-11-04 19:08:59',0),(26,'nrabon','points','2022-11-04 19:09:00',0),(27,'newGuy','points','2022-11-04 19:09:51',0),(28,'nrabon','points','2022-11-04 19:09:51',0),(29,'newGuy','points','2022-11-04 19:10:06',0),(30,'nrabon','points','2022-11-04 19:10:06',0),(31,'newGuy','points','2022-11-04 19:14:40',0),(32,'nrabon','points','2022-11-04 19:14:40',0),(33,'newGuy','points','2022-11-04 19:36:23',0),(34,'nrabon','points','2022-11-04 19:36:23',0),(35,'newGuy','points','2022-11-04 19:40:37',0),(36,'nrabon','points','2022-11-04 19:40:38',0),(37,'newGuy','points','2022-11-04 19:42:24',0),(38,'nrabon','points','2022-11-04 19:42:24',0),(39,'newGuy','points','2022-11-04 19:42:31',0),(40,'nrabon','points','2022-11-04 19:42:31',0),(41,'newGuy','points','2022-11-04 19:45:16',0),(42,'nrabon','points','2022-11-04 19:45:16',0),(43,'newGuy','points','2022-11-04 20:19:17',0),(44,'newGuy','points','2022-11-04 20:19:27',0),(45,'nrabon','points','2022-11-04 20:19:27',0),(46,'newGuy','points','2022-11-04 20:23:30',0),(47,'nrabon','points','2022-11-04 20:23:34',0),(48,'newGuy','points','2022-11-04 21:28:50',0),(49,'nrabon','points','2022-11-04 21:28:50',0),(50,'nrabon','points','2022-11-04 21:28:56',0),(51,'newGuy','points','2022-11-04 21:29:01',0),(52,'newGuy','points','2022-11-04 21:29:04',0),(53,'nrabon','points','2022-11-04 21:29:04',0),(54,'newGuy','points','2022-11-05 06:02:36',0),(55,'newGuy','points','2022-11-05 06:02:38',0),(56,'newGuy','points','2022-11-05 06:02:40',0),(57,'nrabon','points','2022-11-05 06:02:40',0),(58,'newGuy','points','2022-11-05 06:02:42',0),(59,'nrabon','points','2022-11-05 06:02:42',0),(60,'KanyeWest','points','2022-11-05 22:24:32',0),(61,'KanyeWest','points','2022-11-05 22:42:42',0),(62,'Adidas','points','2022-11-12 19:27:14',0),(63,'KanyeWest','points','2022-11-12 19:27:14',0),(64,'newGuy','points','2022-11-12 19:27:14',0),(65,'nrabon','points','2022-11-12 19:27:15',0),(66,'Adidas','points','2022-11-12 19:30:30',0),(67,'KanyeWest','points','2022-11-12 19:30:31',0),(68,'newGuy','points','2022-11-12 19:30:31',0),(69,'nrabon','points','2022-11-12 19:30:31',0),(70,'Adidas','points','2022-11-12 19:31:13',0),(71,'KanyeWest','points','2022-11-12 19:31:13',0),(72,'newGuy','points','2022-11-12 19:31:13',0),(73,'nrabon','points','2022-11-12 19:31:13',0),(74,'reaganhay','points','2022-11-14 16:36:25',0),(75,'reaganhay','points','2022-11-14 16:37:00',0),(76,'reaganhay','points','2022-11-14 16:37:11',0),(77,'Task1Driver','points','2022-11-14 20:23:13',0),(78,'reaganhay','points','2022-11-15 00:40:16',0),(79,'NewDriverTask1','points','2022-11-15 21:13:31',0),(80,'dabo','points','2022-11-15 21:37:41',0),(81,'dabo','points','2022-11-15 21:38:02',0),(82,'dabo','points','2022-11-15 21:57:53',0),(83,'dabo','points','2022-11-15 21:57:56',0),(84,'test','points','2022-11-16 16:21:04',0),(85,'KanyeWest','points','2022-11-27 08:52:24',0),(86,'KanyeWest','points','2022-11-27 09:05:08',0),(87,'KanyeWest','points','2022-11-27 09:06:28',0),(88,'KanyeWest','points','2022-11-27 09:07:22',0),(89,'KanyeWest','points','2022-11-27 09:09:47',0),(90,'KanyeWest','points','2022-11-27 09:10:20',0),(91,'KanyeWest','points','2022-11-27 09:10:54',0),(92,'KanyeWest','points','2022-11-27 09:12:11',0),(93,'KanyeWest','points','2022-11-27 09:13:15',0),(94,'KanyeWest','points','2022-11-27 09:13:46',0),(95,'KanyeWest','points','2022-11-27 09:13:58',0),(96,'KanyeWest','points','2022-11-27 09:14:30',0),(97,'KanyeWest','points','2022-11-27 09:15:15',0),(98,'KanyeWest','points','2022-11-27 09:15:29',0),(99,'KanyeWest','points','2022-11-27 09:21:22',0),(100,'KanyeWest','points','2022-11-27 09:22:06',0),(101,'KanyeWest','points','2022-11-27 09:22:48',0),(102,'KanyeWest','points','2022-11-27 09:28:31',0),(103,'KanyeWest','points','2022-11-27 09:34:18',0),(104,'KanyeWest','points','2022-11-27 09:34:55',0),(105,'KanyeWest','points','2022-11-27 09:35:18',0),(106,'KanyeWest','points','2022-11-27 09:35:31',0),(107,'newGuy','points','2022-11-27 09:35:31',0),(108,'KanyeWest','points','2022-11-27 09:35:55',0),(109,'newGuy','points','2022-11-27 09:35:55',0),(110,'KanyeWest','points','2022-11-27 09:36:10',0),(111,'newGuy','points','2022-11-27 09:36:11',0),(112,'KanyeWest','points','2022-11-27 09:36:49',0),(113,'newGuy','points','2022-11-27 09:36:49',0),(114,'KanyeWest','points','2022-11-27 09:37:22',0),(115,'newGuy','points','2022-11-27 09:37:22',0),(116,'KanyeWest','points','2022-11-27 09:38:38',0),(117,'KanyeWest','points','2022-11-27 09:41:59',0),(118,'KanyeWest','points','2022-11-28 17:22:12',0),(119,'reaganhay','points','2022-11-28 17:22:12',0),(120,'newGuy','points','2022-11-28 17:22:13',0),(121,'KanyeWest','points','2022-11-28 17:22:16',0),(122,'reaganhay','points','2022-11-28 17:22:17',0),(123,'newGuy','points','2022-11-28 17:22:17',0),(124,'KanyeWest','points','2022-11-28 17:22:23',0),(125,'reaganhay','points','2022-11-28 17:22:23',0),(126,'newGuy','points','2022-11-28 17:22:24',0),(127,'KanyeWest','points','2022-11-28 17:22:25',0),(128,'reaganhay','points','2022-11-28 17:22:26',0),(129,'newGuy','points','2022-11-28 17:22:26',0),(130,'KanyeWest','points','2022-11-28 17:22:36',0),(131,'reaganhay','points','2022-11-28 17:22:36',0),(132,'newGuy','points','2022-11-28 17:22:36',0),(133,'Adidas','points','2022-11-28 17:23:43',0),(134,'KanyeWest','points','2022-11-28 17:23:44',0),(135,'NewDriverTask1','points','2022-11-28 17:23:44',0),(136,'newGuy','points','2022-11-28 17:23:44',0),(137,'reaganhay','points','2022-11-28 17:23:44',0),(138,'Task1Driver','points','2022-11-28 17:23:44',0),(139,'test','points','2022-11-28 17:23:45',0),(140,'TestAgain','points','2022-11-28 17:23:45',0),(141,'Adidas','points','2022-11-28 17:23:49',0),(142,'KanyeWest','points','2022-11-28 17:23:49',0),(143,'NewDriverTask1','points','2022-11-28 17:23:49',0),(144,'newGuy','points','2022-11-28 17:23:49',0),(145,'reaganhay','points','2022-11-28 17:23:50',0),(146,'Task1Driver','points','2022-11-28 17:23:50',0),(147,'test','points','2022-11-28 17:23:50',0),(148,'TestAgain','points','2022-11-28 17:23:50',0),(149,'Adidas','points','2022-11-28 17:23:55',0),(150,'KanyeWest','points','2022-11-28 17:23:55',0),(151,'NewDriverTask1','points','2022-11-28 17:23:55',0),(152,'newGuy','points','2022-11-28 17:23:56',0),(153,'reaganhay','points','2022-11-28 17:23:56',0),(154,'Task1Driver','points','2022-11-28 17:23:56',0),(155,'test','points','2022-11-28 17:23:56',0),(156,'TestAgain','points','2022-11-28 17:23:57',0),(157,'KanyeWest','points','2022-11-28 20:32:29',0),(158,'KanyeWest','points','2022-11-28 20:32:32',0),(159,'CDriver2','points','2022-12-02 16:20:44',0),(160,'ChecklistDr','points','2022-12-02 20:32:59',0),(161,'ChecklistSp','points','2022-12-02 20:32:59',0),(162,'CheckAgain2','points','2022-12-02 20:45:52',0),(163,'ChecklistDr','points','2022-12-02 20:45:52',0),(164,'CheckAgain2','points','2022-12-02 20:54:22',0),(165,'ChecklistDr','points','2022-12-02 20:54:22',0),(166,'LilChecky','points','2022-12-02 20:54:22',0),(167,'TestThis','points','2022-12-02 20:54:22',0),(168,'CheckAgain2','points','2022-12-02 21:02:41',0),(169,'ChecklistDr','points','2022-12-02 21:02:41',0),(170,'LilChecky','points','2022-12-02 21:02:41',0),(171,'TestThis','points','2022-12-02 21:02:41',0),(172,'ChecklistDr','points','2022-12-02 21:03:00',0),(173,'ChecklistDr','points','2022-12-02 21:03:02',0);
/*!40000 ALTER TABLE `Notifications` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-04 16:23:49
