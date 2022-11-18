# NorthwindTraders

Back end part for Northwind Traders, using TypeScript and MySQL.

                ORDERS

// method: GET - https://northwind-traders-app.herokuapp.com/orders?page=(1...n)
Get orders from database with pagination. Limit = 20 items on page. Page(from 1 to n) in query params.

// method: GET - https://northwind-traders-app.herokuapp.com/order?id=(1..n)
Get order info and products in order from database by id. Order Id in query params.


                PRODUCTS

// method: GET - https://northwind-traders-app.herokuapp.com/products?page=(1...n)
Get products from database with pagination. Limit = 20 items on page. Page(from 1 to n) in query params.

// method: GET - https://northwind-traders-app.herokuapp.com/product?id=(1..n)
Get product info from database by id. Product Id in query params.


                SUPPLIERS

// method: GET - https://northwind-traders-app.herokuapp.com/suppliers?page=(1...n)
Get suppliers from database with pagination. Limit = 20 items on page. Page(from 1 to n) in query params.

// method: GET - https://northwind-traders-app.herokuapp.com/supplier?id=(1...n)
Get supplier info from database by id. Supplier Id in query params.


                EMPLOYEES

// method: GET - https://northwind-traders-app.herokuapp.com/employees?page=(1...n)
Get employees from database with pagination. Limit = 20 items on page. Page(from 1 to n) in query params.

// method: GET - https://northwind-traders-app.herokuapp.com/employee?id=(1...n)
Get employee info from database by id. Employee Id in query params.


                CUSTOMERS

// method: GET - https://northwind-traders-app.herokuapp.com/customers?page=(1...n)
Get employees from database with pagination. Limit = 20 items on page. Page(from 1 to n) in query params.

// method: GET - https://northwind-traders-app.herokuapp.com/customer?id=(1...n)
Get employee info from database by id. Customer Id in query params.


                SEARCH

// method: GET - https://northwind-traders-app.herokuapp.com/search?q=*search_request*&table=*table_name*
Search from customers or products. Search request(any length) and table name(customers or products) in query params.
