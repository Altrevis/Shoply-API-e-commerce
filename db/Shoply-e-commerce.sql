-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3307
-- Généré le : mar. 21 oct. 2025 à 09:42
-- Version du serveur : 8.0.43-0ubuntu0.24.04.2
-- Version de PHP : 8.3.26

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
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `order_items`
--

CREATE TABLE `order_items` (
  `id` int NOT NULL,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `unit_price` decimal(10,2) NOT NULL
) ;

-- --------------------------------------------------------

--
-- Structure de la table `payments`
--

CREATE TABLE `payments` (
  `id` int NOT NULL,
  `order_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `method` varchar(100) NOT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
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
  `stock` int DEFAULT '0',
  `owner_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `stock`, `owner_id`, `created_at`, `updated_at`) VALUES
(4, 'Casque audio Sony WH-1000XM5', 'Casque sans fil avec réduction de bruit active.', 349.99, 10, 1, '2025-10-21 09:35:31', '2025-10-21 09:35:31'),
(5, 'Tapis de souris XXL', 'Tapis de souris antidérapant grand format pour setup gaming.', 29.90, 50, 2, '2025-10-21 09:35:31', '2025-10-21 09:35:31'),
(6, 'Support PC RGB', 'Support ventilé avec rétroéclairage RGB pour ordinateur portable.', 59.99, 20, 2, '2025-10-21 09:35:31', '2025-10-21 09:35:31'),
(7, 'Microphone USB Blue Yeti', 'Micro professionnel pour streaming et podcasts.', 139.99, 12, 1, '2025-10-21 09:35:31', '2025-10-21 09:35:31'),
(8, 'Hoodie \"Code & Chill\"', 'Sweat noir confortable avec logo minimaliste.', 49.99, 30, 2, '2025-10-21 09:35:31', '2025-10-21 09:35:31'),
(10, 'Casquette Shoply Edition', 'Casquette noire brodée avec logo Shoply.', 19.99, 25, 1, '2025-10-21 09:35:31', '2025-10-21 09:35:31'),
(11, 'Hoodie \"Code & Chill\"', 'Sweat noir confortable avec logo minimaliste.', 49.99, 30, 1, '2025-10-21 09:36:38', '2025-10-21 09:36:38'),
(13, 'Casquette \"Shoply Edition\"', 'Casquette noire brodée avec logo Shoply.', 19.99, 25, 1, '2025-10-21 09:36:38', '2025-10-21 09:36:38'),
(14, 'Sweatshirt \"Bug Hunter\"', 'Sweat gris avec inscription \"Bug Hunter\".', 44.99, 20, 2, '2025-10-21 09:36:38', '2025-10-21 09:36:38'),
(15, 'T-shirt \"Hello World\"', 'T-shirt blanc avec texte \"Hello World\" imprimé.', 22.99, 35, 2, '2025-10-21 09:36:38', '2025-10-21 09:36:38'),
(16, 'Hoodie \"Stack Overflow\"', 'Hoodie bleu avec logo Stack Overflow.', 54.99, 15, 1, '2025-10-21 09:36:38', '2025-10-21 09:36:38'),
(17, 'Bonnet \"Dev Life\"', 'Bonnet chaud noir avec inscription \"Dev Life\".', 18.99, 40, 2, '2025-10-21 09:36:38', '2025-10-21 09:36:38'),
(18, 'T-shirt \"Git Commit\"', 'T-shirt vert clair avec logo Git.', 23.99, 50, 1, '2025-10-21 09:36:38', '2025-10-21 09:36:38'),
(19, 'Sweatshirt \"Null Pointer\"', 'Sweat noir avec motif humoristique.', 46.99, 25, 2, '2025-10-21 09:36:38', '2025-10-21 09:36:38'),
(20, 'Hoodie \"API Master\"', 'Sweat gris clair confortable et léger.', 52.99, 20, 1, '2025-10-21 09:36:38', '2025-10-21 09:36:38'),
(21, 'Hoodie \"Code & Chill\"', 'Sweat noir confortable avec logo minimaliste.', 49.99, 30, 1, '2025-10-21 09:41:09', '2025-10-21 09:41:09'),
(23, 'Casquette \"Shoply Edition\"', 'Casquette noire brodée avec logo Shoply.', 19.99, 25, 1, '2025-10-21 09:41:09', '2025-10-21 09:41:09'),
(24, 'Sweatshirt \"Bug Hunter\"', 'Sweat gris avec inscription \"Bug Hunter\".', 44.99, 20, 2, '2025-10-21 09:41:09', '2025-10-21 09:41:09'),
(25, 'T-shirt \"Hello World\"', 'T-shirt blanc avec texte \"Hello World\" imprimé.', 22.99, 35, 2, '2025-10-21 09:41:09', '2025-10-21 09:41:09'),
(26, 'Hoodie \"Stack Overflow\"', 'Hoodie bleu avec logo Stack Overflow.', 54.99, 15, 1, '2025-10-21 09:41:09', '2025-10-21 09:41:09'),
(27, 'Bonnet \"Dev Life\"', 'Bonnet chaud noir avec inscription \"Dev Life\".', 18.99, 40, 2, '2025-10-21 09:41:09', '2025-10-21 09:41:09'),
(28, 'T-shirt \"Git Commit\"', 'T-shirt.', 23.99, 50, 1, '2025-10-21 09:41:09', '2025-10-21 09:41:09'),
(29, 'Sweatshirt \"Null Pointer\"', 'Sweat noir avec motif humoristique.', 46.99, 25, 2, '2025-10-21 09:41:09', '2025-10-21 09:41:09'),
(30, 'Hoodie \"API Master\"', 'Sweat gris clair confortable et léger.', 52.99, 20, 1, '2025-10-21 09:41:09', '2025-10-21 09:41:09');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` varchar(50) DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `role`, `created_at`, `updated_at`) VALUES
(1, 'admin@shoply.test', 'hashed_password_admin', 'Admin', 'admin', '2025-10-21 08:52:57', '2025-10-21 08:52:57'),
(2, 'user@shoply.test', 'hashed_password_user', 'User', 'user', '2025-10-21 08:52:57', '2025-10-21 08:52:57');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_orders_user` (`user_id`);

--
-- Index pour la table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_order_items_product` (`product_id`),
  ADD KEY `idx_order_items_order` (`order_id`);

--
-- Index pour la table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_payments_order` (`order_id`);

--
-- Index pour la table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_products_owner` (`owner_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_users_email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_order_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_order_items_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `fk_payments_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_owner` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
