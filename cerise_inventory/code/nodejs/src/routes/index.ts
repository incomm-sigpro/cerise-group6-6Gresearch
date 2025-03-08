import { Router } from "express";
import userRouter from "./user.routes";
import phoneRouter from "./phone.routes";
import userCorporationRouter from "./userCorporation.routes";
import corporationRouter from "./corporation.routes";
import addressRouter from "./address.routes";
import inventoryRouter from "./inventory.routes";
import inventoryItemsRouter from "./inventoryItems.routes";
import categoryRouter from "./category.routes";
import sourceRouter from "./source.routes";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/phone", phoneRouter);
routes.use("/user_corporation", userCorporationRouter);
routes.use("/corporation", corporationRouter);
routes.use("/address", addressRouter);
routes.use("/inventory", inventoryRouter);
routes.use("/inventory_items", inventoryItemsRouter);
routes.use("/category", categoryRouter);
routes.use("/source", sourceRouter);

export default routes;
