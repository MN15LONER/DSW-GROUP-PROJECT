-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 26, 2025 at 10:26 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crime_watch_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `admin_id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `crimereports`
--

CREATE TABLE `crimereports` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `crimeType` varchar(100) NOT NULL,
  `crimeDesc` varchar(255) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `reportTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(20) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `crimereports`
--

INSERT INTO `crimereports` (`id`, `user_id`, `crimeType`, `crimeDesc`, `latitude`, `longitude`, `reportTime`, `status`) VALUES
(6, 5, 'Mugging', 'Grab and run', -26.19297736, 28.04820122, '2025-05-18 06:20:14', 'pending'),
(7, 5, 'A person got their phone stolen', 'Gun involved', -26.18294162, 28.06283535, '2025-05-18 06:47:55', 'pending'),
(9, 7, 'Got robbed', 'Sharp object', -26.18708426, 28.01589700, '2025-05-19 10:45:39', 'pending'),
(10, 7, 'Witnessed a sexual assault occur but the victim safely fled', 'Sexual', -26.18760990, 28.00741701, '2025-05-19 10:57:35', 'pending'),
(11, 7, 'Someone got pickpocketed and got their wallet taken', 'Grab and run', -26.18602352, 28.05472153, '2025-05-19 11:10:47', 'pending'),
(12, 7, 'I got tricked into giving out my pin at an atm and now my funds have been emptied from my account', 'Money scam', -26.18224317, 28.00536267, '2025-05-19 11:20:45', 'pending'),
(13, 7, 'While I was talking with a friend of mine by the road two guys came to use demanding we give them ou', 'Aggressive physical', -26.19404196, 28.00882487, '2025-05-19 18:26:05', 'pending'),
(16, 8, 'I got assaulted by a stranger', 'Aggressive physical', -26.18710911, 28.01587498, '2025-05-20 11:11:36', 'pending'),
(17, 6, 'Mugging', 'Gun involved', -26.18698881, 28.01417552, '2025-05-21 07:48:25', 'pending'),
(18, 5, 'Harrasment', 'Aggressive physical', -26.20058638, 28.06757750, '2025-05-23 16:16:14', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `panicreports`
--

CREATE TABLE `panicreports` (
  `id` int(11) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `reportTime` datetime DEFAULT current_timestamp(),
  `status` varchar(20) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `panicreports`
--

INSERT INTO `panicreports` (`id`, `latitude`, `longitude`, `reportTime`, `status`) VALUES
(1, -26.187101765508864, 28.01585865657834, '2025-05-19 11:56:37', 'pending'),
(2, -26.18712311195038, 28.015873283183616, '2025-05-20 13:00:17', 'pending'),
(3, -26.187116058038498, 28.015846074437466, '2025-05-22 16:00:14', 'pending'),
(4, -26.187116058038498, 28.015846074437466, '2025-05-22 16:00:14', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `password_resets`
--

INSERT INTO `password_resets` (`id`, `email`, `token`, `expires_at`) VALUES
(1, 'theegoldenboy15@gmail.com', '5199da13607fe210d643274ee574e7578e9c5121b1167734c111bb96d66f5838', '2025-05-20 16:26:57');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `lastname` varchar(255) NOT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `token_expires` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `password`, `created_at`, `lastname`, `reset_token`, `token_expires`) VALUES
(5, 'Mfuneko Ndeya', 'theegoldenboy15@gmail.com', '$2y$10$T0oUdsKecYNpwuveK8X0g.UviucirjuSMoWr.aELInRAOgKa5uQum', '2025-05-17 14:06:31', 'Ndeya', NULL, NULL),
(6, 'Ovayo', 'mfunekondeya7@gmail.com', '$2y$10$hg6vDDIZmSx0rhKxZQKOBeFBDTomyaCAHVqINSMcvwbphWQtVO8EW', '2025-05-18 08:46:56', 'Russell', NULL, NULL),
(7, 'Keagan', 'keaganbotha11@gmail.com', '$2y$10$Qikpfx6gbYC3MHlA/EEji.2FOcvVNwGSpxDajqA7Ux5JjXUamWvCW', '2025-05-19 10:44:35', 'Botha', NULL, NULL),
(8, 'Kabu', 'kabumbuyi85@gmail.com', '$2y$10$eM9LSgDWxjFnBGvu.OjlfOYirBtp.5Am2ITuDNeLwPNCTvnebEBrS', '2025-05-20 11:05:33', 'Mbuyi', NULL, NULL),
(9, 'Neighbourguardadmin', 'neighbourguard@gmail.com', '$2y$10$1f78A8baTaNHAtqQpoR9CeRg4YkPeLm6UJJ8ZqRbbMHdtB4KrflJS', '2025-05-23 15:16:13', 'Admin', NULL, NULL),
(10, 'Seithati Sello', 'marabesello@gmail.com', '', '2025-05-23 17:47:43', '', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `crimereports`
--
ALTER TABLE `crimereports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `panicreports`
--
ALTER TABLE `panicreports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `crimereports`
--
ALTER TABLE `crimereports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `panicreports`
--
ALTER TABLE `panicreports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
