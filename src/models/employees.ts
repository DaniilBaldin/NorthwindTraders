import db from '../utils/databaseConnect';

const employees = class Employees {
    id: string;
    EmployeeID: string;
    LastName: string;
    FirstName: string;
    Title: string;
    TitleOfCourtesy: string;
    BirthDate: string;
    HireDate: string;
    Address: string;
    City: string;
    Region: string;
    PostalCode: string;
    Country: string;
    HomePhone: string;
    Extension: string;
    Notes: string;
    ReportsTo: string;

    constructor(
        id: string,
        EmployeeID: string,
        LastName: string,
        FirstName: string,
        Title: string,
        TitleOfCourtesy: string,
        BirthDate: string,
        HireDate: string,
        Address: string,
        City: string,
        Region: string,
        PostalCode: string,
        Country: string,
        HomePhone: string,
        Extension: string,
        Notes: string,
        ReportsTo: string
    ) {
        this.id = id;
        this.EmployeeID = EmployeeID;
        this.LastName = LastName;
        this.FirstName = FirstName;
        this.Title = Title;
        this.TitleOfCourtesy = TitleOfCourtesy;
        this.BirthDate = BirthDate;
        this.HireDate = HireDate;
        this.Address = Address;
        this.City = City;
        this.Region = Region;
        this.PostalCode = PostalCode;
        this.Country = Country;
        this.HomePhone = HomePhone;
        this.Extension = Extension;
        this.Notes = Notes;
        this.ReportsTo = ReportsTo;
    }

    static getAll() {
        return db.execute(`SELECT COUNT(1) as total FROM employees`);
    }

    static getAllEmployees(limit: number, offset: number) {
        return db.execute(
            `SELECT EmployeeID, LastName, FirstName, Title, TitleOfCourtesy, BirthDate, HireDate, Address, City, Region, PostalCode, Country, HomePhone, Extension, Notes, ReportsTo FROM employees LIMIT ${limit} OFFSET ${offset}`
        );
    }

    static getEmployee(EmployeeID: string) {
        return db.execute(
            `SELECT Report.EmployeeID AS ReportId, Report.FirstName AS ReportFirstName, Report.LastName AS ReportLastName, employees.EmployeeID, employees.LastName, employees.FirstName, employees.Title, employees.TitleOfCourtesy, employees.BirthDate, employees.HireDate, employees.Address, employees.City, employees.Region, employees.PostalCode, employees.Country, employees.HomePhone, employees.Extension, employees.Notes, employees.ReportsTo FROM employees LEFT JOIN employees AS Report ON Report.EmployeeID = employees.ReportsTo WHERE employees.EmployeeID = ?`,
            [EmployeeID]
        );
    }

    // static getOrderDetails(OrderID: string) {
    //     return db.execute(
    //         `SELECT orderdetails.OrderID, orderdetails.Quantity, orderdetails.UnitPrice AS OrderUnitPrice, orderdetails.Discount, products.ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, products.UnitPrice AS ProductUnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued FROM products, orderdetails WHERE orderdetails.OrderID = ? AND orderdetails.ProductID = products.ProductID`,
    //         [OrderID]
    //     );
    // }
};

export default employees;
