-- CreateTable
CREATE TABLE `site_contents` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(255) NOT NULL,
    `value` LONGTEXT NOT NULL,
    `section` VARCHAR(100) NOT NULL,
    `label` VARCHAR(255) NOT NULL,
    `type` VARCHAR(50) NOT NULL DEFAULT 'text',
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `site_contents_key_key`(`key`),
    INDEX `site_contents_section_idx`(`section`),
    INDEX `site_contents_key_idx`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
