import express from "express";
import { getUsers, getUser, deleteUser, saveUser, updateUser } from "../Controllers/users.js";

const router = express.Router()

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", saveUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router