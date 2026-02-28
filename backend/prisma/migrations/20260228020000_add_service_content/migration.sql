ALTER TABLE `services`
  ADD COLUMN `content` LONGTEXT NULL AFTER `description`;

UPDATE `services`
SET `content` = (
  SELECT `value`
  FROM `site_contents`
  WHERE `key` = 'services.installation.content'
  LIMIT 1
)
WHERE `slug` = 'instalacion-lamina-armada'
  AND (`content` IS NULL OR `content` = '');

UPDATE `services`
SET `content` = (
  SELECT `value`
  FROM `site_contents`
  WHERE `key` = 'services.rehabilitation.content'
  LIMIT 1
)
WHERE `slug` = 'rehabilitacion-piscinas'
  AND (`content` IS NULL OR `content` = '');

UPDATE `services`
SET `content` = (
  SELECT `value`
  FROM `site_contents`
  WHERE `key` = 'services.waterproofing.content'
  LIMIT 1
)
WHERE `slug` = 'impermeabilizacion'
  AND (`content` IS NULL OR `content` = '');
