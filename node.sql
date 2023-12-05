-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 22, 2023 at 01:29 PM
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
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `itemlist`
--

INSERT INTO `itemlist` (`id`, `itemcode`, `quantity`, `price`) VALUES
(1, '張五亮', 101, '0941571259'),
(2, '黃婷婷', 102, '0952863475'),
(3, '古巨基', 103, '0963685315'),
(4, '王保傑', 201, '0975582794');

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
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `repair`
--

INSERT INTO `repair` (`ID`, `ROOM`, `REPORTDATE`, `DEVICE`, `PROBLEM`) VALUES
(1, '101', '2023-11-22 21:26:49', '冰箱', '內置燈泡不亮'),
(2, '103', '2023-11-22 21:27:18', '熱水器', '熱水器無法釋出熱水'),
(3, '201', '2023-11-22 21:27:46', '門鎖', '門鎖有鬆動現象'),
(4, '102', '2023-11-22 21:28:38', '冷氣機', '不夠冷');

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `name`, `amount`) VALUES
(1, 'qwer', '$argon2id$v=19$m=65536,t=3,p=4$wJab3O14ptQpv7XXb7w+cA$gwxR9eIC+efU2o9MRVCaFhYbLFSmG+tg15wPmG8+acg', 'qwer', 500),
(2, 'test', '$argon2id$v=19$m=65536,t=3,p=4$XGB/v13SmUCsoD+itCzU7Q$gq+y5SGbsUIYU5NxT6c72fsUvjxJ5OL6SMPmNup9WlQ', 'test', 500);

-- --------------------------------------------------------

--
-- Table structure for table `visitors`
--

DROP TABLE IF EXISTS `visitors`;
CREATE TABLE IF NOT EXISTS `visitors` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `VDATE` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `VNAME` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `IDCARD` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `VROOM` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `visitors`
--

INSERT INTO `visitors` (`ID`, `VDATE`, `VNAME`, `IDCARD`, `VROOM`) VALUES
(1, '2023-11-22 21:24:34', 'Min-Hong Huang', 'L679021112', '102'),
(2, '2023-11-22 21:24:56', 'Amack Liu', 'P8658329831', '101'),
(3, '2023-11-22 21:25:26', '陳明德', 'X5643845122', '201'),
(4, '2023-11-22 21:26:25', '吳宏達', 'M9583576234', '103');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
