import * as express from "express";
import { json } from "body-parser";
import { getData, getLatestData } from "./controllers/get.controller";
import { postData } from "./controllers/post.controller";
import { deleteData } from "./controllers/delete.controller";

export const router: express.Router = express.Router();

router.use(json());

router.route("/data").get(getData);
router.route("/data/latest").get(getLatestData);
router.route("/data/:mq2/:quality").post(postData);
router.route("/data").delete(deleteData);