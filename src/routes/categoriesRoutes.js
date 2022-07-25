import { Router } from 'express';
import { getCategories, addCategory } from "../controllers/categoriesControllers.js";
import { validateCategory } from "../middlewares/validateCategoryMiddleware.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategories);
categoriesRouter.post("/categories", validateCategory, addCategory);

export default categoriesRouter;