import express from "express";
import users from './users.json' with { type: 'json' };
import fs, { readFileSync } from 'fs'

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`);
});

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello!");
})

app.get("/users", (req, res) => {
    res.send(users);
})
app.post("/getSpecificUser", (req, res) => {
    console.log("request =>", req.body);
    const specificUser = users.filter(({ id }) => id == req.body.id);
    res.send(specificUser);
})
app.post("/addUser", (req, res) => {
    console.log("request =>", req.body);
    users.push({ id: users[users.length - 1].id + 1, ...req.body });
    fs.writeFileSync("./users.json", JSON.stringify(users));
    res.send("User added successfully!");
})
app.delete("/deleteUser/:id", (req, res) => {
    console.log("id =>", req.params.id);
    const userId = Number(req.params.id);
    const userIndex = users.findIndex(({id}) => id == userId);
    users.splice(userIndex, 1);
    fs.writeFileSync("./users.json", JSON.stringify(users));
    res.send(`user with id:${req.params.id} deleted successfully`);
})

