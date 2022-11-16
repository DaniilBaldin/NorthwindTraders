import db from '../utils/databaseConnect';

const products = class Products {
    id: string;
    OrderId: string;
    CustomerID: string;
    EmployeeID: string;
    OrderDate: string;
    RequiredDate: string;
    ShippedDate: string;
    ShipVia: string;
    Freight: string;
    ShipName: string;
    ShipAddress: string;
    ShipCity: string;
    ShipRegion: string;
    ShipPostalCode: string;
    ShipCountry: string;

    constructor(
        id: string,
        OrderId: string,
        CustomerID: string,
        EmployeeID: string,
        OrderDate: string,
        RequiredDate: string,
        ShippedDate: string,
        ShipVia: string,
        Freight: string,
        ShipName: string,
        ShipAddress: string,
        ShipCity: string,
        ShipRegion: string,
        ShipPostalCode: string,
        ShipCountry: string
    ) {
        this.id = id;
        this.OrderId = OrderId;
        this.CustomerID = CustomerID;
        this.EmployeeID = EmployeeID;
        this.OrderDate = OrderDate;
        this.RequiredDate = RequiredDate;
        this.ShippedDate = ShippedDate;
        this.ShipVia = ShipVia;
        this.Freight = Freight;
        this.ShipName = ShipName;
        this.ShipAddress = ShipAddress;
        this.ShipCity = ShipCity;
        this.ShipRegion = ShipRegion;
        this.ShipPostalCode = ShipPostalCode;
        this.ShipCountry = ShipCountry;
    }

    static getAll() {
        return db.execute(`SELECT * FROM orders`);
    }

    static getAllOrders(limit: number, offset: number) {
        return db.execute(
            `SELECT SUM(orderdetails.UnitPrice * orderdetails.Discount * orderdetails.Quantity) AS TotalProductsDiscount, SUM(orderdetails.UnitPrice * orderdetails.Quantity) AS TotalProductsPrice, SUM(orderdetails.Quantity) AS TotalProductsItems, COUNT(orderdetails.OrderID) AS TotalProducts, orders.OrderId, CustomerID, EmployeeID, OrderDate, RequiredDate, ShippedDate, ShipVia, Freight, ShipName, ShipAddress, ShipCity, ShipRegion, ShipPostalCode, ShipCountry, ProductId FROM orders, orderdetails WHERE orderdetails.OrderID = orders.OrderID GROUP BY orders.OrderID LIMIT ${limit} OFFSET ${offset}`
        );
    }

    static getOrder(OrderID: string) {
        return db.execute(
            `SELECT shippers.CompanyName AS ShipViaCompanyName, SUM(orderdetails.UnitPrice * orderdetails.Discount * orderdetails.Quantity) AS TotalProductsDiscount, SUM(orderdetails.UnitPrice * orderdetails.Quantity) AS TotalProductsPrice, SUM(orderdetails.Quantity) AS TotalProductsItems, COUNT(orderdetails.OrderID) AS TotalProducts, orders.OrderID, CustomerID, EmployeeID, OrderDate, RequiredDate, ShippedDate, ShipVia, Freight, ShipName, ShipAddress, ShipCity, ShipRegion, ShipPostalCode, ShipCountry, ProductID FROM orders, orderdetails, shippers WHERE orderdetails.OrderID = orders.OrderID AND orders.OrderID = ? AND orders.ShipVia = shippers.ShipperID GROUP BY orders.OrderID`,
            [OrderID]
        );
    }

    static getOrderDetails(OrderID: string) {
        return db.execute(
            `SELECT orderdetails.OrderID, orderdetails.Quantity, orderdetails.UnitPrice AS OrderUnitPrice, orderdetails.Discount, Product.Id, ProductName, SupplierId, CategoryId, QuantityPerUnit, Product.UnitPrice AS ProductUnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued FROM Product, orderdetails WHERE orderdetails.OrderId = ? AND orderdetails.ProductId = Product.Id`,
            [OrderID]
        );
    }
};

export default products;
