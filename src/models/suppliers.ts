import db from '../utils/databaseConnect';

const suppliers = class Suppliers {
    id: string;
    SupplierID: string;
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
    HomePage: string;
    constructor(
        id: string,
        SupplierID: string,
        CompanyName: string,
        ContactName: string,
        ContactTitle: string,
        Address: string,
        City: string,
        Region: string,
        PostalCode: string,
        Country: string,
        Phone: string,
        Fax: string,
        HomePage: string
    ) {
        this.id = id;
        this.SupplierID = SupplierID;
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
        this.HomePage = HomePage;
    }

    static getAll() {
        return db.execute(`SELECT * FROM suppliers`);
    }

    static getAllSuppliers(limit: number, offset: number) {
        return db.execute(`SELECT * FROM suppliers LIMIT ${limit} OFFSET ${offset}`);
    }

    static getSupplier(SupplierID: string) {
        return db.execute(`SELECT * FROM suppliers WHERE suppliers.SupplierID = ?`, [SupplierID]);
    }
};

export default suppliers;
