import db from '../utils/databaseConnect';

const customers = class Customers {
    id: string;
    CustomerID: string;
    CompanyName: string;
    ContactName: string;
    ContactTitle: string;
    Address: string;
    City: string;
    Region: string;
    PostalCode: string;
    Country: string;
    Phone: string;
    Fax: string;

    constructor(
        id: string,
        CustomerID: string,
        CompanyName: string,
        ContactName: string,
        ContactTitle: string,
        Address: string,
        City: string,
        Region: string,
        PostalCode: string,
        Country: string,
        Phone: string,
        Fax: string
    ) {
        this.id = id;
        this.CustomerID = CustomerID;
        this.CompanyName = CompanyName;
        this.ContactName = ContactName;
        this.ContactTitle = ContactTitle;
        this.Address = Address;
        this.City = City;
        this.Region = Region;
        this.PostalCode = PostalCode;
        this.Country = Country;
        this.Phone = Phone;
        this.Fax = Fax;
    }

    static getAll() {
        return db.execute(`SELECT COUNT(1) as total FROM customers`);
    }

    static getAllCustomers(limit: number, offset: number) {
        return db.execute(`SELECT * FROM customers LIMIT ${limit} OFFSET ${offset}`);
    }

    static getCustomer(CustomerID: string) {
        return db.execute(`SELECT * FROM customers WHERE customers.CustomerID = ?`, [CustomerID]);
    }
};

export default customers;
