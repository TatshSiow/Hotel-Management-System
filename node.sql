-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 14, 2023 at 04:38 PM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `node`
--

-- --------------------------------------------------------

--
-- Table structure for table `itemlist`
--

DROP TABLE IF EXISTS `itemlist`;
CREATE TABLE IF NOT EXISTS `itemlist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `itemcode` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `quantity` int NOT NULL,
  `price` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `itemlist`
--

INSERT INTO `itemlist` (`id`, `itemcode`, `quantity`, `price`) VALUES
(1, '234', 234, '234'),
(2, '123', 123, '123'),
(3, '222', 0, '234'),
(4, '黃阿毛', 512, '123456789'),
(6, '朱三寶', 511, '1234567890'),
(7, 'asd', 451, '012311415');

-- --------------------------------------------------------

--
-- Table structure for table `repair`
--

DROP TABLE IF EXISTS `repair`;
CREATE TABLE IF NOT EXISTS `repair` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ROOM` varchar(50) NOT NULL,
  `REPORTDATE` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `DEVICE` varchar(50) NOT NULL,
  `PROBLEM` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `repair`
--

INSERT INTO `repair` (`ID`, `ROOM`, `REPORTDATE`, `DEVICE`, `PROBLEM`) VALUES
(24, '505', '2023-8-15 00:35:45', '冷氣機', ''),
(25, '307', '2023-8-15 00:36:15', '熱水器', '無法啟用熱水'),
(26, '141', '2023-8-15 00:37:39', '測試', '故障測試');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `name`, `amount`) VALUES
(1, 'test', '$argon2id$v=19$m=65536,t=3,p=4$mlOwYdvsbD1zXmko4v3t8g$KYrHu6OhLNvLULvwIaIGYkY7x/YzwUfUv2oD/pqH7RQ', 'test', 0);

-- --------------------------------------------------------

--
-- Table structure for table `visitors`
--

DROP TABLE IF EXISTS `visitors`;
CREATE TABLE IF NOT EXISTS `visitors` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `VDATE` varchar(30) NOT NULL,
  `VNAME` varchar(50) NOT NULL,
  `IDCARD` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `VROOM` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
