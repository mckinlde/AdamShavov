/*
 Navicat Premium Dump SQL

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 100432 (10.4.32-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : assignment

 Target Server Type    : MySQL
 Target Server Version : 100432 (10.4.32-MariaDB)
 File Encoding         : 65001

 Date: 27/11/2025 13:04:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cache
-- ----------------------------
DROP TABLE IF EXISTS `cache`;
CREATE TABLE `cache`  (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cache
-- ----------------------------
INSERT INTO `cache` VALUES ('laravel-cache-0c3e8bb72705fe73d9302be9916ea2d9', 'i:1;', 1764258983);
INSERT INTO `cache` VALUES ('laravel-cache-0c3e8bb72705fe73d9302be9916ea2d9:timer', 'i:1764258983;', 1764258983);

-- ----------------------------
-- Table structure for cache_locks
-- ----------------------------
DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE `cache_locks`  (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cache_locks
-- ----------------------------

-- ----------------------------
-- Table structure for failed_jobs
-- ----------------------------
DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `failed_jobs_uuid_unique`(`uuid` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of failed_jobs
-- ----------------------------

-- ----------------------------
-- Table structure for internal_advisors
-- ----------------------------
DROP TABLE IF EXISTS `internal_advisors`;
CREATE TABLE `internal_advisors`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `team_id` bigint UNSIGNED NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `internal_advisors_project_id_user_id_unique`(`project_id` ASC, `user_id` ASC) USING BTREE,
  INDEX `internal_advisors_user_id_foreign`(`user_id` ASC) USING BTREE,
  INDEX `internal_advisors_team_id_foreign`(`team_id` ASC) USING BTREE,
  CONSTRAINT `internal_advisors_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `internal_advisors_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `internal_advisors_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of internal_advisors
-- ----------------------------
INSERT INTO `internal_advisors` VALUES (1, 2, 2, 2, '2025-11-27 02:55:22', '2025-11-27 02:55:22');
INSERT INTO `internal_advisors` VALUES (2, 1, 6, 1, '2025-11-27 02:55:22', '2025-11-27 02:55:22');

-- ----------------------------
-- Table structure for job_batches
-- ----------------------------
DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE `job_batches`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `cancelled_at` int NULL DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of job_batches
-- ----------------------------

-- ----------------------------
-- Table structure for jobs
-- ----------------------------
DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED NULL DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `jobs_queue_index`(`queue` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of jobs
-- ----------------------------

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO `migrations` VALUES (1, '0001_01_01_000000_create_users_table', 1);
INSERT INTO `migrations` VALUES (2, '0001_01_01_000001_create_cache_table', 1);
INSERT INTO `migrations` VALUES (3, '0001_01_01_000002_create_jobs_table', 1);
INSERT INTO `migrations` VALUES (4, '2025_01_27_000001_add_role_to_users_table', 1);
INSERT INTO `migrations` VALUES (5, '2025_01_27_000002_create_teams_table', 1);
INSERT INTO `migrations` VALUES (6, '2025_01_27_000003_create_projects_table', 1);
INSERT INTO `migrations` VALUES (7, '2025_01_27_000004_create_team_members_table', 1);
INSERT INTO `migrations` VALUES (8, '2025_01_27_000005_create_project_teams_table', 1);
INSERT INTO `migrations` VALUES (9, '2025_01_27_000006_create_internal_advisors_table', 1);
INSERT INTO `migrations` VALUES (10, '2025_01_27_000007_create_reviews_table', 1);
INSERT INTO `migrations` VALUES (11, '2025_08_26_100418_add_two_factor_columns_to_users_table', 1);
INSERT INTO `migrations` VALUES (12, '2025_11_27_022828_create_personal_access_tokens_table', 1);

-- ----------------------------
-- Table structure for password_reset_tokens
-- ----------------------------
DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE `password_reset_tokens`  (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of password_reset_tokens
-- ----------------------------

-- ----------------------------
-- Table structure for personal_access_tokens
-- ----------------------------
DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `personal_access_tokens_token_unique`(`token` ASC) USING BTREE,
  INDEX `personal_access_tokens_tokenable_type_tokenable_id_index`(`tokenable_type` ASC, `tokenable_id` ASC) USING BTREE,
  INDEX `personal_access_tokens_expires_at_index`(`expires_at` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of personal_access_tokens
-- ----------------------------

-- ----------------------------
-- Table structure for project_teams
-- ----------------------------
DROP TABLE IF EXISTS `project_teams`;
CREATE TABLE `project_teams`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_id` bigint UNSIGNED NOT NULL,
  `team_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `project_teams_project_id_team_id_unique`(`project_id` ASC, `team_id` ASC) USING BTREE,
  INDEX `project_teams_team_id_foreign`(`team_id` ASC) USING BTREE,
  CONSTRAINT `project_teams_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `project_teams_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of project_teams
-- ----------------------------
INSERT INTO `project_teams` VALUES (1, 1, 1, '2025-11-27 02:55:22', '2025-11-27 02:55:22');
INSERT INTO `project_teams` VALUES (2, 2, 1, '2025-11-27 02:55:22', '2025-11-27 02:55:22');
INSERT INTO `project_teams` VALUES (3, 1, 2, '2025-11-27 02:55:22', '2025-11-27 02:55:22');
INSERT INTO `project_teams` VALUES (4, 3, 2, '2025-11-27 02:55:22', '2025-11-27 02:55:22');

-- ----------------------------
-- Table structure for projects
-- ----------------------------
DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of projects
-- ----------------------------
INSERT INTO `projects` VALUES (1, 'Website Redesign', 'Complete redesign of the company website', '2025-11-27 02:55:22', '2025-11-27 02:55:22');
INSERT INTO `projects` VALUES (2, 'Mobile App', 'Development of a new mobile application', '2025-11-27 02:55:22', '2025-11-27 02:55:22');
INSERT INTO `projects` VALUES (3, 'API Integration', 'Integration with third-party APIs', '2025-11-27 02:55:22', '2025-11-27 02:55:22');

-- ----------------------------
-- Table structure for reviews
-- ----------------------------
DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `reviewer_id` bigint UNSIGNED NOT NULL,
  `reviewable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `reviewable_id` bigint UNSIGNED NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` int NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `reviews_reviewable_type_reviewable_id_index`(`reviewable_type` ASC, `reviewable_id` ASC) USING BTREE,
  INDEX `reviews_reviewer_id_index`(`reviewer_id` ASC) USING BTREE,
  CONSTRAINT `reviews_reviewer_id_foreign` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reviews
-- ----------------------------
INSERT INTO `reviews` VALUES (1, 2, 'App\\Models\\User', 4, 'Great work on the recent project. Very proactive and helpful.', 5, '2025-11-27 02:55:22', '2025-11-27 02:55:22');
INSERT INTO `reviews` VALUES (2, 4, 'App\\Models\\User', 2, 'Excellent leadership and clear communication.', 5, '2025-11-27 02:55:22', '2025-11-27 02:55:22');
INSERT INTO `reviews` VALUES (3, 4, 'App\\Models\\Project', 1, 'The project is well-organized and the timeline is realistic.', 4, '2025-11-27 02:55:22', '2025-11-27 02:55:22');
INSERT INTO `reviews` VALUES (4, 2, 'App\\Models\\Project', 1, 'Good progress so far. Team collaboration is excellent.', 5, '2025-11-27 02:55:22', '2025-11-27 02:55:22');
INSERT INTO `reviews` VALUES (5, 6, 'App\\Models\\Project', 2, 'As an advisor, I think the project needs more focus on UX.', 3, '2025-11-27 02:55:22', '2025-11-27 02:55:22');

-- ----------------------------
-- Table structure for sessions
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED NULL DEFAULT NULL,
  `ip_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `user_agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `sessions_user_id_index`(`user_id` ASC) USING BTREE,
  INDEX `sessions_last_activity_index`(`last_activity` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sessions
-- ----------------------------
INSERT INTO `sessions` VALUES ('w83hZLVpCchFw81pbwtznePrH2ugXk50CJXGGS11', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiV2I3WDhwY1ZOdUhJcVZQMnRCdlYyV3RHTElWclk3V1p2SWNqeENWRCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC91c2VycyI7czo1OiJyb3V0ZSI7czoxMToidXNlcnMuaW5kZXgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=', 1764266598);

-- ----------------------------
-- Table structure for team_members
-- ----------------------------
DROP TABLE IF EXISTS `team_members`;
CREATE TABLE `team_members`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `team_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `role` enum('manager','associate') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `team_members_team_id_user_id_unique`(`team_id` ASC, `user_id` ASC) USING BTREE,
  INDEX `team_members_user_id_foreign`(`user_id` ASC) USING BTREE,
  CONSTRAINT `team_members_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `team_members_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of team_members
-- ----------------------------
INSERT INTO `team_members` VALUES (1, 1, 2, 'manager', '2025-11-27 02:55:22', '2025-11-27 02:55:22');
INSERT INTO `team_members` VALUES (2, 1, 4, 'associate', '2025-11-27 02:55:22', '2025-11-27 02:55:22');
INSERT INTO `team_members` VALUES (3, 1, 5, 'associate', '2025-11-27 02:55:22', '2025-11-27 02:55:22');
INSERT INTO `team_members` VALUES (4, 2, 3, 'manager', '2025-11-27 02:55:22', '2025-11-27 02:55:22');
INSERT INTO `team_members` VALUES (5, 2, 6, 'associate', '2025-11-27 02:55:22', '2025-11-27 02:55:22');
INSERT INTO `team_members` VALUES (6, 2, 7, 'associate', '2025-11-27 02:55:22', '2025-11-27 02:55:22');

-- ----------------------------
-- Table structure for teams
-- ----------------------------
DROP TABLE IF EXISTS `teams`;
CREATE TABLE `teams`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teams
-- ----------------------------
INSERT INTO `teams` VALUES (1, 'Development Team', '2025-11-27 02:55:22', '2025-11-27 02:55:22');
INSERT INTO `teams` VALUES (2, 'Design Team', '2025-11-27 02:55:22', '2025-11-27 02:55:22');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('executive','manager','associate') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'associate',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `two_factor_secret` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `two_factor_recovery_codes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `users_email_unique`(`email` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'Executive User', 'executive@example.com', 'executive', '2025-11-27 02:55:21', '$2y$12$i5fvq6qOuNmzRZvNPE3pe.d2ofJ0yxjw3I4Nrvf6w.0lDJ29R.MqK', NULL, NULL, NULL, 'zX7Ya6otBJIzVGexoREB7svz1De4eU8rgy5ffTBRDIhj40tAcK0cS9lOpcGh', '2025-11-27 02:55:21', '2025-11-27 02:55:21');
INSERT INTO `users` VALUES (2, 'Manager One', 'manager1@example.com', 'manager', '2025-11-27 02:55:21', '$2y$12$w7Tq0B6Bw5sN.2KSMDc5Jelg29SJtUFVkpx4HVspnx5KVRpPcbATu', NULL, NULL, NULL, NULL, '2025-11-27 02:55:21', '2025-11-27 02:55:21');
INSERT INTO `users` VALUES (3, 'Manager Two', 'manager2@example.com', 'manager', '2025-11-27 02:55:21', '$2y$12$ClIA1mwCV4mA6cryi8ON3u0SP5G5X.vMS/zaw30/uQ3FrZ4dvhes.', NULL, NULL, NULL, NULL, '2025-11-27 02:55:21', '2025-11-27 02:55:21');
INSERT INTO `users` VALUES (4, 'Associate One', 'associate1@example.com', 'associate', '2025-11-27 02:55:21', '$2y$12$ppCcfh05unSGeEyQtZr8FuOjLnku/9LIP9bqzJVl5dfV668ikIRZK', NULL, NULL, NULL, NULL, '2025-11-27 02:55:21', '2025-11-27 02:55:21');
INSERT INTO `users` VALUES (5, 'Associate Two', 'associate2@example.com', 'associate', '2025-11-27 02:55:22', '$2y$12$rMkOddypT/bs32MtljqslORA3vNi57Gbin6V1nSyoc4KH0oFReuNm', NULL, NULL, NULL, NULL, '2025-11-27 02:55:22', '2025-11-27 02:55:22');
INSERT INTO `users` VALUES (6, 'Associate Three', 'associate3@example.com', 'associate', '2025-11-27 02:55:22', '$2y$12$u7bR1lS0IGfPxB4c.XK.UOKoV145V9gKXkPHp.4C8OeO2XytfKXke', NULL, NULL, NULL, NULL, '2025-11-27 02:55:22', '2025-11-27 02:55:22');
INSERT INTO `users` VALUES (7, 'Associate Four', 'associate4@example.com', 'associate', '2025-11-27 02:55:22', '$2y$12$jlKrfEVoLIqiggoydczHIeITt2fwNdnWTY5rVZdfZzGxa4mzVyhBy', NULL, NULL, NULL, NULL, '2025-11-27 02:55:22', '2025-11-27 02:55:22');

SET FOREIGN_KEY_CHECKS = 1;
