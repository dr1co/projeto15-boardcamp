import { Router } from 'express';
import { getCustomers, getCustomerById, addCustomer, updateCustomer } from '../controllers/customersControllers.js';
import { validateCustomer } from '../middlewares/validateCustomerMiddleware.js';

const customerRouter = Router();

customerRouter.get("/customers", getCustomers);
customerRouter.get("/customers/:id", getCustomerById);
customerRouter.post("/customers", validateCustomer, addCustomer);
customerRouter.put("/customers/:id", validateCustomer, updateCustomer);

export default customerRouter;