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
-- Table structure for table `Cart`
--

DROP TABLE IF EXISTS `Cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cart` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `Item_ID` varchar(100) DEFAULT NULL,
  `Date_Time` datetime DEFAULT (now()),
  `cost` float DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=331 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cart`
--

LOCK TABLES `Cart` WRITE;
/*!40000 ALTER TABLE `Cart` DISABLE KEYS */;
INSERT INTO `Cart` VALUES (1,'default','777','2022-11-04 02:43:21',NULL),(13,'plswork','222','2022-11-10 01:20:14',2),(14,'plswork','222','2022-11-10 01:21:10',2),(51,'nrabon','44','2022-11-13 01:48:24',4),(52,'plswork','20','2022-11-13 01:49:11',4),(53,'plswork','44','2022-11-13 01:49:11',4),(54,'plswork','20','2022-11-13 01:49:45',4),(55,'plswork','20','2022-11-13 01:49:45',4),(56,'plswork','44','2022-11-13 01:49:45',4),(57,'plswork','44','2022-11-13 01:49:45',4),(63,'mcgraha','XX20','2022-11-13 02:31:53',4),(64,'mcgraha','XY44','2022-11-13 02:31:53',4),(65,'nrabon','XX20','2022-11-13 02:37:14',4),(66,'nrabon','XY44','2022-11-13 02:37:14',4),(67,'nrabon','v1|110552646899|0','2022-11-13 02:42:21',44.99),(68,'nrabon','v1|110552646899|0','2022-11-13 02:42:21',44.99),(69,'mcgraha','v1|110552646899|0','2022-11-13 02:43:18',44.99),(70,'mcgraha','v1|110552646899|0','2022-11-13 02:43:18',44.99),(123,'DriverN','v1|110552630529|4101','2022-11-14 02:44:12',10),(124,'DriverN','v1|110552637690|0','2022-11-14 02:44:12',9.25),(125,'DriverN','v1|110552637686|0','2022-11-14 02:44:12',9.25),(126,'reaganhay','v1|110552638419|0','2022-11-14 16:54:15',14),(137,'Task1Driver','v1|110552637690|0','2022-11-14 20:59:59',9.25),(138,'Task1Driver','v1|110552633192|0','2022-11-14 20:59:59',20),(139,'Task1Driver','v1|110552630529|4101','2022-11-14 20:59:59',10),(140,'Task1Driver','v1|110552635080|4101','2022-11-14 20:59:59',156),(141,'Task1Driver','v1|110552637686|0','2022-11-14 20:59:59',9.25),(142,'Task1Driver','v1|110552637686|0','2022-11-14 20:59:59',9.25),(293,'nicktestsponsor','v1|110552690303|410108587826','2022-11-28 13:55:37',24),(310,'Adidas','v1|110552685982|410108582723','2022-11-28 19:35:01',4.99),(313,'locked','v1|110552685982|410108582723','2022-11-28 19:52:34',4.99),(323,'CDriver1','v1|110552699770|410108593086','2022-12-02 16:29:40',13),(324,'CDriver1','v1|110552697972|0','2022-12-02 16:29:40',9),(325,'CDriver1','v1|110552700608|0','2022-12-02 16:29:40',96);
/*!40000 ALTER TABLE `Cart` ENABLE KEYS */;
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

-- Dump completed on 2022-12-04 16:23:52
