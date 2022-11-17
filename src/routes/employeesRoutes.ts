import { Router } from 'express';
import bodyParser from 'body-parser';

import getAllEmployees from '../controllers/Employees/getAllEmployees';
import getEmployee from '../controllers/Employees/getEmployee';

const employeesRouter = Router();

employeesRouter.get('/employees', getAllEmployees);
employeesRouter.get('/employee', getEmployee);

employeesRouter.use(bodyParser.json());

export default employeesRouter;
