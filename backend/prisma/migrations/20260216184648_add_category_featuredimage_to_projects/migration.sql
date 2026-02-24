-- AlterTable
ALTER TABLE `projects` ADD COLUMN `category` VARCHAR(255) NULL,
    ADD COLUMN `featured_image` VARCHAR(500) NULL;

-- CreateIndex
CREATE INDEX `projects_category_idx` ON `projects`(`category`);
