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
-- Table structure for table `Sponsors`
--

DROP TABLE IF EXISTS `Sponsors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Sponsors` (
  `sponsorName` varchar(20) NOT NULL,
  `pointConversionRate` float(8,2) DEFAULT NULL,
  PRIMARY KEY (`sponsorName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sponsors`
--

LOCK TABLES `Sponsors` WRITE;
/*!40000 ALTER TABLE `Sponsors` DISABLE KEYS */;
INSERT INTO `Sponsors` VALUES ('<script>alert(\'1\')</',1.00),('Adida',1.00),('Adidas',1.00),('AdidasTwo',1.00),('brandnewsponsor',66.00),('ChaseSponsor',1.00),('CheckAgain',1.00),('CheckAgain2',2.00),('ChecklistSp',1.50),('ChecklistSp2',1.20),('ChecklistSponsor',1.20),('ClassSponsor',1.00),('my_new_sponsor',1.00),('new_sponsor',1.00),('newSponsor',0.75),('NicksTest',7.00),('nickstest5',7.00),('OldSponsor',1.50),('Scen1Sponsor',1.00),('Sponsor5',1.00),('SponsorTest',1.00),('sqli\'',1.00),('testcreate',0.75),('TestSponsor',1.00),('TestSponsor2',1.00),('UnderArmour',1.00);
/*!40000 ALTER TABLE `Sponsors` ENABLE KEYS */;
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

-- Dump completed on 2022-12-04 16:23:57
