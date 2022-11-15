import db from '../utils/databaseConnect';

const categories = class Categories {
    id: string;
    CategoryID: string;
    CategoryName: string;
    Description: string;
    constructor(id: string, CategoryID: string, CategoryName: string, Description: string) {
        this.id = id;
        this.CategoryID = CategoryID;
        this.CategoryName = CategoryName;
        this.Description = Description;
    }

    static getAll() {
        return db.execute(`SELECT * FROM categories`);
    }
};

export default categories;
