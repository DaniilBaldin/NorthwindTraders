export const totalCustomersLengthQuery = `SELECT COUNT(1) as total FROM customers`;

export const getAllCustomersQuery = 'SELECT * FROM customers LIMIT ${limit} OFFSET ${offset}';

export const getCustomerQuery = 'SELECT * FROM customers WHERE customers.CustomerID = ?';

export const totalEmployeesLengthQuery = `SELECT COUNT(1) as total FROM employees`;

export const getAllEmployeesQuery =
    'SELECT EmployeeID, LastName, FirstName, Title, TitleOfCourtesy, BirthDate, HireDate, Address, City, Region, PostalCode, Country, HomePhone, Extension, Notes, ReportsTo FROM employees LIMIT ${limit} OFFSET ${offset}';

export const getEmployeeQuery =
    'SELECT Report.EmployeeID AS ReportId, Report.FirstName AS ReportFirstName, Report.LastName AS ReportLastName, employees.EmployeeID, employees.LastName, employees.FirstName, employees.Title, employees.TitleOfCourtesy, employees.BirthDate, employees.HireDate, employees.Address, employees.City, employees.Region, employees.PostalCode, employees.Country, employees.HomePhone, employees.Extension, employees.Notes, employees.ReportsTo FROM employees LEFT JOIN employees AS Report ON Report.EmployeeID = employees.ReportsTo WHERE employees.EmployeeID = ?';

export const totalOrdersLengthQuery = `SELECT COUNT(1) as total FROM orders`;

export const getAllOrdersQuery =
    'SELECT SUM(orderdetails.UnitPrice * orderdetails.Discount * orderdetails.Quantity) AS TotalProductsDiscount, SUM(orderdetails.UnitPrice * orderdetails.Quantity) AS TotalProductsPrice, SUM(orderdetails.Quantity) AS TotalProductsItems, COUNT(orderdetails.OrderID) AS TotalProducts, orders.OrderId, CustomerID, EmployeeID, OrderDate, RequiredDate, ShippedDate, ShipVia, Freight, ShipName, ShipAddress, ShipCity, ShipRegion, ShipPostalCode, ShipCountry, ProductId FROM orders, orderdetails WHERE orderdetails.OrderID = orders.OrderID GROUP BY orders.OrderID LIMIT ${limit} OFFSET ${offset}';

export const getOrderQuery =
    'SELECT shippers.CompanyName AS ShipViaCompanyName, SUM(orderdetails.UnitPrice * orderdetails.Discount * orderdetails.Quantity) AS TotalProductsDiscount, SUM(orderdetails.UnitPrice * orderdetails.Quantity) AS TotalProductsPrice, SUM(orderdetails.Quantity) AS TotalProductsItems, COUNT(orderdetails.OrderID) AS TotalProducts, orders.OrderID, CustomerID, EmployeeID, OrderDate, RequiredDate, ShippedDate, ShipVia, Freight, ShipName, ShipAddress, ShipCity, ShipRegion, ShipPostalCode, ShipCountry, ProductID FROM orders, orderdetails, shippers WHERE orderdetails.OrderID = orders.OrderID AND orders.OrderID = ? AND orders.ShipVia = shippers.ShipperID GROUP BY orders.OrderID';

export const getOrderDetailsQuery =
    'SELECT orderdetails.OrderID, orderdetails.Quantity, orderdetails.UnitPrice AS OrderUnitPrice, orderdetails.Discount, products.ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, products.UnitPrice AS ProductUnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued FROM products, orderdetails WHERE orderdetails.OrderID = ? AND orderdetails.ProductID = products.ProductID';

export const totalProductsLengthQuery = `SELECT COUNT(1) as total FROM products`;

export const getAllProductsQuery = 'SELECT * FROM products LIMIT ${limit} OFFSET ${offset}';

export const getProductQuery =
    'SELECT ProductID, ProductName, products.SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued, suppliers.CompanyName AS SupplierName FROM products, suppliers WHERE products.ProductID = ? AND suppliers.SupplierID = products.SupplierID';

export const searchProductsQuery =
    "SELECT ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued FROM products WHERE ProductName LIKE '%${search}%' LIMIT ${limit}";

export const searchCustomersQuery =
    "SELECT CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax FROM customers WHERE CompanyName LIKE '%${search}%' OR ContactName LIKE '%${search}%' OR ContactTitle LIKE '%${search}%' OR Address LIKE '%${search}%' LIMIT ${limit}";

export const totalSuppliersLengthQuery = `SELECT COUNT(1) as total FROM suppliers`;

export const getAllSuppliersQuery = 'SELECT * FROM suppliers LIMIT ${limit} OFFSET ${offset}';

export const getSupplierQuery = 'SELECT * FROM suppliers WHERE suppliers.SupplierID = ?';
