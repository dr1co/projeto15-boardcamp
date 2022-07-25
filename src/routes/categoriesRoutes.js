import { Router } from express();
import { getCategories } from "../controllers/categoriesControllers";

const categoriesRouter = Router()

categoriesRouter.get("/categories", getCategories);
categoriesRouter.post("/categories", validateCategory, addCategory);