import { randomUUID } from "crypto";
import { Database } from "../database/database.js";

const database = new Database();

export const routes = [
    {
        method: "GET",
        path: "/users",
        handler: (req, res) => {
            const users = database.select("users");
            return res.end(JSON.stringify(users));
        },
    },
    {
        method: "POST",
        path: "/users",
        handler: (req, res) => {
            const { name, email, senha } = req.body;

            database.insert("users", { id: randomUUID(), name, email, senha });
            return res.writeHead(201).end("User added successfully!");
        },
    }
];