-- Variables passed by backend JS indicated by '$' symbol

-- Insert into Couriers table
INSERT INTO Couriers (name, email) VALUES ($courierName, $courierEmail);

-- Insert into Customers table
INSERT INTO Customers (name, email) VALUES ($customerName, $customerEmail);

-- Insert into LineItems table
INSERT INTO LineItems (`order`, quantity, menuItem) VALUES ($lineItemQuantity, $menuItemId);

-- Insert into MenuItems table
INSERT INTO MenuItems (name, description, price, location) 
VALUES ($menuItemName, $menuItemDescription, $menuItemPrice, $menuItemLocation);

-- Insert into Orders table
INSERT INTO Orders (customer, location, courier, status) VALUES ($customerId, $locationId, $courierId, $status);

-- Insert into RestaurantBrands table
INSERT INTO RestaurantBrands (name, logo) VALUES ($brandName, $logoFileName);

-- Insert into RestaurantLocations table
INSERT INTO RestaurantLocations (brand, openTime, closeTime, address) 
VALUES ($brandId, $openTime, $closeTime, $address);

-- Delete from LineItems table
DELETE FROM LineItems WHERE lineItemId = $lineItemId;

-- Delete from MenuItems table
DELETE FROM MenuItems WHERE menuItemId = $menuItemId;

-- Delete from RestaurantLocations table
DELETE FROM RestaurantLocations WHERE locationId = $locationId;

-- Update an entry in the LineItems table
UPDATE LineItems SET quantity = $quantity WHERE lineItemId = $lineItemId;

-- Update an entry in the MenuItems table
UPDATE MenuItems 
SET name = $menuItemName, price = $price, description = $description WHERE menuItemId = $menuItemId;

-- Update an entry in the Orders table 
UPDATE Orders SET courier = $courierId, status = $newStatus WHERE orderId = $orderId;

-- Update an entry in the RestaurantLocations table
UPDATE RestaurantLocations 
SET brandId = $newBrandId, openTime = $newOpenTime, closeTime = $newCloseTime, address = $newAddress 
WHERE locationId = $locationid;

-- Select entries from the Couriers table that are not already attached to entries in the Orders table
SELECT courierId from Couriers WHERE courierId NOT IN (SELECT courier FROM Orders);

-- Select all entries from Customers table
SELECT * from Customers;

-- Select one entry from Customers table
SELECT * from Customers WHERE customerId = $customerId;

-- Select all rows from LineItems
SELECT * from LineItems

-- Select all rows from LineItems that are attached to one order
SELECT * from LineItems li WHERE `li.order` = $orderId;

-- Select all MenuItems rows that are related to row from RestaurantLocations
SELECT * from MenuItems mi WHERE mi.location = $locationId;

-- Select one entry from Orders table
SELECT * from Orders WHERE orderId = $orderId;

-- Select all entries from Orders table
SELECT * from Orders;

-- Select one brand from RestaurantBrands table
SELECT * from RestaurantBrands WHERE brandId = $brandId;

-- Select all brands from RestaurantBrands table
SELECT * from RestaurantBrands;

-- Select all entries from RestaurantLocations table, along with their brand info
SELECT rb.name, rb.logo, rb.brandId, rl.openTime, rl.closeTime, rl.address 
FROM RestaurantBrands rb, RestaurantLocations rl WHERE rb.brandId = rl.brand;
