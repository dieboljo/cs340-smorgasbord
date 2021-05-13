--Drop tables 
DROP TABLE IF EXISTS `RestaurantBrands`; 
DROP TABLE IF EXISTS `RestaurantLocations`;
DROP TABLE IF EXISTS `MenuItems`;
DROP TABLE IF EXISTS `Couriers`;
DROP TABLE IF EXISTS `Customers`;
DROP TABLE IF EXISTS `Orders`;
DROP TABLE IF EXISTS `LineItems`;


--Table for 'RestaurantBrands' 
CREATE TABLE `RestaurantBrands` (
    `brandId` int NOT NULL AUTO_INCREMENT UNIQUE, 
    `name` varchar(30) NOT NULL, 
    `logo` varchar(100),
    PRIMARY KEY(`brandId`)
)

--Table for 'RestaurantLocations'
CREATE TABLE `RestaurantLocations` (
    `locationId` int NOT NULL AUTO_INCREMENT UNIQUE, 
    `brand` int NOT NULL 
    `openTime` decimal(4, 2) NOT NULL, 
    `closeTime` decimal(4, 2) NOT NULL, 
    `address` varchar(50) NOT NULL, 
    PRIMARY KEY(`locationId`)
    CONSTRAINT `brand_fk` FOREIGN KEY(`brand`) REFERENCES `RestaurantBrands` (`brandId`)
)

--Table for 'MenuItems' 
CREATE TABLE `MenuItems` (
    `menuItemId` int NOT NULL AUTO_INCREMENT UNIQUE, 
    `name` varchar(150) NOT NULL, 
    `description` varchar(150), 
    `price` decimal(5, 2) NOT NULL, 
    `location` int NOT NULL 
    PRIMARY KEY(`menuItemId`), 
    CONSTRAINT `location_fk` FOREIGN KEY (`location`) REFERENCES `RestaurantLocations` (`locationId`) 
)

--Table for 'Couriers' 
CREATE TABLE `Couriers` (
    `courierId` int NOT NULL AUTO_INCREMENT UNIQUE, 
    `name` varchar(30), 
    `email` varchar(30) NOT NULL
    PRIMARY KEY(`courierId`)
)

--Table for 'Customers' 
CREATE TABLE `Customers` (
    `customerId` int NOT NULL AUTO_INCREMENT UNIQUE, 
    `name` varchar(30), 
    `email` varchar(30) NOT NULL UNIQUE,
    PRIMARY KEY(`customerId`)
)

--Table for Orders 
CREATE TABLE `Orders` (
    `orderId` int NOT NULL AUTO_INCREMENT UNIQUE, 
    `customer` int NOT NULL, 
    `location` int NOT NULL, 
    `courier` int, 
    `status` varchar(10) NOT NULL, 
    PRIMARY KEY(`orderId`), 
    CONSTRAINT `customer_fk` FOREIGN KEY (`customer`) REFERENCES `Customers` (`customerId`), 
    CONSTRAINT `location_fk` FOREIGN KEY (`location`) REFERENCES `RestaurantLocations` (`locationId`), 
    CONSTRAINT `courier_fk` FOREIGN KEY (`courier`) REFERENCES `Couriers` (`courierId`)
)


--Table for 'LineItems' 
CREATE TABLE `LineItems` (
    `lineItemId` int NOT NULL AUTO_INCREMENT UNIQUE, 
    `order` int NOT NULL, 
    `quantity` int NOT NULL, 
    `menuItem` int NOT NULL, 
    PRIMARY KEY(`lineItemId`), 
    CONSTRAINT `order_fk` FOREIGN KEY (`order`) REFERENCES `Orders` (`orderId`)
)
