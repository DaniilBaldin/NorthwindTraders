import db from '../utils/databaseConnect';

const searchFrom = class SearchFrom {
    ProductName: string;

    constructor(ProductName: string) {
        this.ProductName = ProductName;
    }

    static searchProducts(search: string, limit: number) {
        return db.execute(
            `SELECT ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued FROM products WHERE ProductName LIKE '%${search}%' LIMIT ${limit}`
        );
    }

    static searchCustomers(search: string, limit: number) {
        return db.execute(
            `SELECT CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax FROM customers WHERE CompanyName LIKE '%${search}%' OR ContactName LIKE '%${search}%' OR ContactTitle LIKE '%${search}%' OR Address LIKE '%${search}%' LIMIT ${limit}`
        );
    }
};

export default searchFrom;
