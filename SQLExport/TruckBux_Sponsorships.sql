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
-- Table structure for table `Sponsorships`
--

DROP TABLE IF EXISTS `Sponsorships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Sponsorships` (
  `username` varchar(45) NOT NULL,
  `sponsorName` varchar(45) NOT NULL,
  `active` tinyint NOT NULL,
  PRIMARY KEY (`username`,`sponsorName`),
  KEY `sponsorName_idx` (`sponsorName`),
  CONSTRAINT `username` FOREIGN KEY (`username`) REFERENCES `Users` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sponsorships`
--

LOCK TABLES `Sponsorships` WRITE;
/*!40000 ALTER TABLE `Sponsorships` DISABLE KEYS */;
INSERT INTO `Sponsorships` VALUES ('<script>alert(\'','ClassSponsor',1),('Adidas','Adidas',1),('AdidasThree','Adidas',1),('CDriver1','ChecklistSponsor',1),('ChaseSponsor','ChaseSponsor',1),('CheckAgain','CheckAgain',1),('CheckAgain2','CheckAgain2',1),('ChecklistDr','CheckAgain2',1),('ChecklistDr','ChecklistSp',1),('ChecklistSp','ChecklistSp',1),('ChecklistSp2','ChecklistSp2',1),('ChecklistSp3','ChecklistSp2',1),('ChecklistSpon','ChecklistSponsor',1),('class_sponsor_u','ClassSponsor',1),('LilChecky','CheckAgain2',1),('newGuy','Adidas',1),('newSponsorSub','newSponsor',1),('nicktestsponsor','SponsorTest',1),('nrabon','testSponsor',1),('nrabon2','SponsorTest',1),('nrabon2','TestSponsor',1),('reaganhay','TestSponsor',1),('Task1Driver','Adidas',1),('test','Adidas',1),('TestAgain','Adidas',1),('testdriver1','ClassSponsor',1),('TestSponsor','TestSponsor',1),('TestThis','CheckAgain2',1),('UAsponsor1','UnderArmour',1);
/*!40000 ALTER TABLE `Sponsorships` ENABLE KEYS */;
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

-- Dump completed on 2022-12-04 16:23:58
