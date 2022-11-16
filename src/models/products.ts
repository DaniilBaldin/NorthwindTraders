import db from '../utils/databaseConnect';

const products = class Products {
    id: string;
    ProductID: string;
    ProductName: string;
    SupplierID: string;
    CategoryID: string;
    QuantityPerUnit: string;
    UnitPrice: string;
    UnitsInStock: string;
    UnitsOnOrder: string;
    ReorderLevel: string;
    Discontinued: string;
    constructor(
        id: string,
        ProductID: string,
        ProductName: string,
        SupplierID: string,
        CategoryID: string,
        QuantityPerUnit: string,
        UnitPrice: string,
        UnitsInStock: string,
        UnitsOnOrder: string,
        ReorderLevel: string,
        Discontinued: string
    ) {
        this.id = id;
        this.ProductID = ProductID;
        this.ProductName = ProductName;
        this.SupplierID = SupplierID;
        this.CategoryID = CategoryID;
        this.QuantityPerUnit = QuantityPerUnit;
        this.UnitPrice = UnitPrice;
        this.UnitsInStock = UnitsInStock;
        this.UnitsOnOrder = UnitsOnOrder;
        this.ReorderLevel = ReorderLevel;
        this.Discontinued = Discontinued;
    }

    static getAll() {
        return db.execute(`SELECT * FROM products`);
    }

    static getAllProducts(limit: number, offset: number) {
        return db.execute(`SELECT * FROM products LIMIT ${limit} OFFSET ${offset}`);
    }

    static getProduct(ProductID: string) {
        return db.execute(
            `SELECT ProductID, ProductName, products.SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued, suppliers.CompanyName AS SupplierName FROM products, suppliers WHERE products.ProductID = ? AND suppliers.SupplierID =products.SupplierID`,
            [ProductID]
        );
    }
};

export default products;
