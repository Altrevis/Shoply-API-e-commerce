-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : lun. 05 jan. 2026 à 11:43
-- Version du serveur : 8.0.44-0ubuntu0.24.04.2
-- Version de PHP : 8.2.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `Shoply-e-commerce`
--

-- --------------------------------------------------------

--
-- Structure de la table `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` int NOT NULL,
  `access_token` varchar(255) DEFAULT NULL,
  `access_token_expires_at` datetime DEFAULT NULL,
  `client_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` int NOT NULL,
  `client_id` varchar(255) DEFAULT NULL,
  `client_secret` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `redirect_uris` text,
  `grants` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` int NOT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `refresh_token_expires_at` datetime DEFAULT NULL,
  `client_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `created_at` datetime NOT NULL,
  `total_price` decimal(10,2) NOT NULL DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `order_items`
--

CREATE TABLE `order_items` (
  `id` int NOT NULL,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `unit_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `payments`
--

CREATE TABLE `payments` (
  `id` int NOT NULL,
  `order_id` int DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `method` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `stock` int NOT NULL,
  `owner_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `stock`, `owner_id`) VALUES
(1, 'Laptop', 'High performance laptop', 999.99, 8, NULL),
(2, 'Mouse', 'Wireless mouse', 29.99, 50, NULL),
(3, 'Laptop', 'High performance laptop', 999.99, 10, NULL),
(4, 'Mouse', 'Wireless mouse', 29.99, 50, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `access_token` (`access_token`),
  ADD UNIQUE KEY `access_token_2` (`access_token`),
  ADD UNIQUE KEY `access_token_3` (`access_token`),
  ADD UNIQUE KEY `access_token_4` (`access_token`),
  ADD UNIQUE KEY `access_token_5` (`access_token`),
  ADD UNIQUE KEY `access_token_6` (`access_token`),
  ADD UNIQUE KEY `access_token_7` (`access_token`),
  ADD UNIQUE KEY `access_token_8` (`access_token`),
  ADD UNIQUE KEY `access_token_9` (`access_token`),
  ADD UNIQUE KEY `access_token_10` (`access_token`),
  ADD UNIQUE KEY `access_token_11` (`access_token`),
  ADD UNIQUE KEY `access_token_12` (`access_token`),
  ADD UNIQUE KEY `access_token_13` (`access_token`),
  ADD UNIQUE KEY `access_token_14` (`access_token`),
  ADD UNIQUE KEY `access_token_15` (`access_token`),
  ADD UNIQUE KEY `access_token_16` (`access_token`),
  ADD UNIQUE KEY `access_token_17` (`access_token`),
  ADD UNIQUE KEY `access_token_18` (`access_token`),
  ADD UNIQUE KEY `access_token_19` (`access_token`),
  ADD UNIQUE KEY `access_token_20` (`access_token`),
  ADD UNIQUE KEY `access_token_21` (`access_token`),
  ADD UNIQUE KEY `access_token_22` (`access_token`),
  ADD UNIQUE KEY `access_token_23` (`access_token`),
  ADD UNIQUE KEY `access_token_24` (`access_token`),
  ADD UNIQUE KEY `access_token_25` (`access_token`),
  ADD UNIQUE KEY `access_token_26` (`access_token`),
  ADD UNIQUE KEY `access_token_27` (`access_token`),
  ADD UNIQUE KEY `access_token_28` (`access_token`),
  ADD UNIQUE KEY `access_token_29` (`access_token`),
  ADD UNIQUE KEY `access_token_30` (`access_token`),
  ADD UNIQUE KEY `access_token_31` (`access_token`),
  ADD UNIQUE KEY `access_token_32` (`access_token`),
  ADD UNIQUE KEY `access_token_33` (`access_token`),
  ADD UNIQUE KEY `access_token_34` (`access_token`),
  ADD UNIQUE KEY `access_token_35` (`access_token`),
  ADD UNIQUE KEY `access_token_36` (`access_token`),
  ADD UNIQUE KEY `access_token_37` (`access_token`),
  ADD UNIQUE KEY `access_token_38` (`access_token`),
  ADD UNIQUE KEY `access_token_39` (`access_token`),
  ADD UNIQUE KEY `access_token_40` (`access_token`),
  ADD UNIQUE KEY `access_token_41` (`access_token`),
  ADD UNIQUE KEY `access_token_42` (`access_token`),
  ADD UNIQUE KEY `access_token_43` (`access_token`),
  ADD UNIQUE KEY `access_token_44` (`access_token`),
  ADD UNIQUE KEY `access_token_45` (`access_token`),
  ADD UNIQUE KEY `access_token_46` (`access_token`),
  ADD UNIQUE KEY `access_token_47` (`access_token`),
  ADD UNIQUE KEY `access_token_48` (`access_token`),
  ADD UNIQUE KEY `access_token_49` (`access_token`),
  ADD UNIQUE KEY `access_token_50` (`access_token`),
  ADD UNIQUE KEY `access_token_51` (`access_token`),
  ADD UNIQUE KEY `access_token_52` (`access_token`),
  ADD UNIQUE KEY `access_token_53` (`access_token`),
  ADD UNIQUE KEY `access_token_54` (`access_token`),
  ADD UNIQUE KEY `access_token_55` (`access_token`),
  ADD UNIQUE KEY `access_token_56` (`access_token`),
  ADD UNIQUE KEY `access_token_57` (`access_token`),
  ADD UNIQUE KEY `access_token_58` (`access_token`),
  ADD UNIQUE KEY `access_token_59` (`access_token`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `client_id` (`client_id`),
  ADD UNIQUE KEY `client_id_2` (`client_id`),
  ADD UNIQUE KEY `client_id_3` (`client_id`),
  ADD UNIQUE KEY `client_id_4` (`client_id`),
  ADD UNIQUE KEY `client_id_5` (`client_id`),
  ADD UNIQUE KEY `client_id_6` (`client_id`),
  ADD UNIQUE KEY `client_id_7` (`client_id`),
  ADD UNIQUE KEY `client_id_8` (`client_id`),
  ADD UNIQUE KEY `client_id_9` (`client_id`),
  ADD UNIQUE KEY `client_id_10` (`client_id`),
  ADD UNIQUE KEY `client_id_11` (`client_id`),
  ADD UNIQUE KEY `client_id_12` (`client_id`),
  ADD UNIQUE KEY `client_id_13` (`client_id`),
  ADD UNIQUE KEY `client_id_14` (`client_id`),
  ADD UNIQUE KEY `client_id_15` (`client_id`),
  ADD UNIQUE KEY `client_id_16` (`client_id`),
  ADD UNIQUE KEY `client_id_17` (`client_id`),
  ADD UNIQUE KEY `client_id_18` (`client_id`),
  ADD UNIQUE KEY `client_id_19` (`client_id`),
  ADD UNIQUE KEY `client_id_20` (`client_id`),
  ADD UNIQUE KEY `client_id_21` (`client_id`),
  ADD UNIQUE KEY `client_id_22` (`client_id`),
  ADD UNIQUE KEY `client_id_23` (`client_id`),
  ADD UNIQUE KEY `client_id_24` (`client_id`),
  ADD UNIQUE KEY `client_id_25` (`client_id`),
  ADD UNIQUE KEY `client_id_26` (`client_id`),
  ADD UNIQUE KEY `client_id_27` (`client_id`),
  ADD UNIQUE KEY `client_id_28` (`client_id`),
  ADD UNIQUE KEY `client_id_29` (`client_id`),
  ADD UNIQUE KEY `client_id_30` (`client_id`),
  ADD UNIQUE KEY `client_id_31` (`client_id`),
  ADD UNIQUE KEY `client_id_32` (`client_id`),
  ADD UNIQUE KEY `client_id_33` (`client_id`),
  ADD UNIQUE KEY `client_id_34` (`client_id`),
  ADD UNIQUE KEY `client_id_35` (`client_id`),
  ADD UNIQUE KEY `client_id_36` (`client_id`),
  ADD UNIQUE KEY `client_id_37` (`client_id`),
  ADD UNIQUE KEY `client_id_38` (`client_id`),
  ADD UNIQUE KEY `client_id_39` (`client_id`),
  ADD UNIQUE KEY `client_id_40` (`client_id`),
  ADD UNIQUE KEY `client_id_41` (`client_id`),
  ADD UNIQUE KEY `client_id_42` (`client_id`),
  ADD UNIQUE KEY `client_id_43` (`client_id`),
  ADD UNIQUE KEY `client_id_44` (`client_id`),
  ADD UNIQUE KEY `client_id_45` (`client_id`),
  ADD UNIQUE KEY `client_id_46` (`client_id`),
  ADD UNIQUE KEY `client_id_47` (`client_id`),
  ADD UNIQUE KEY `client_id_48` (`client_id`),
  ADD UNIQUE KEY `client_id_49` (`client_id`),
  ADD UNIQUE KEY `client_id_50` (`client_id`),
  ADD UNIQUE KEY `client_id_51` (`client_id`),
  ADD UNIQUE KEY `client_id_52` (`client_id`),
  ADD UNIQUE KEY `client_id_53` (`client_id`),
  ADD UNIQUE KEY `client_id_54` (`client_id`),
  ADD UNIQUE KEY `client_id_55` (`client_id`),
  ADD UNIQUE KEY `client_id_56` (`client_id`),
  ADD UNIQUE KEY `client_id_57` (`client_id`),
  ADD UNIQUE KEY `client_id_58` (`client_id`),
  ADD UNIQUE KEY `client_id_59` (`client_id`),
  ADD UNIQUE KEY `client_id_60` (`client_id`),
  ADD UNIQUE KEY `client_id_61` (`client_id`);

--
-- Index pour la table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `refresh_token` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_2` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_3` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_4` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_5` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_6` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_7` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_8` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_9` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_10` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_11` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_12` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_13` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_14` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_15` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_16` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_17` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_18` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_19` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_20` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_21` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_22` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_23` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_24` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_25` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_26` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_27` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_28` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_29` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_30` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_31` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_32` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_33` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_34` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_35` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_36` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_37` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_38` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_39` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_40` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_41` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_42` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_43` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_44` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_45` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_46` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_47` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_48` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_49` (`refresh_token`),
  ADD UNIQUE KEY `refresh_token_50` (`refresh_token`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Index pour la table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Index pour la table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD CONSTRAINT `oauth_access_tokens_ibfk_103` FOREIGN KEY (`client_id`) REFERENCES `oauth_clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `oauth_access_tokens_ibfk_104` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD CONSTRAINT `oauth_refresh_tokens_ibfk_97` FOREIGN KEY (`client_id`) REFERENCES `oauth_clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `oauth_refresh_tokens_ibfk_98` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_125` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_126` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
