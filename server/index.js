require("dotenv").config();
const express = require("express");
const session = require("express-session")
const checkForSession = require("./middlewares/checkForSession")
const swagController = require("./controllers/swagController")
const authController = require("./controllers/authController")
const cartController = require("./controllers/cartController")
const searchController = require("./controllers/searchController")

const app = express();

let{ SERVER_PORT, SESSION_SECRET } = process.env;

//middleware
app.use(express.json());
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
);

app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`))

//endpoints
//swag endpoints
app.get("/api/swag", swagController.read)
//auth endpoints
app.post("/api/register", authController.register);
app.post("/api/login", authController.login);
app.post("/api/signout", authController.getUser)
//cart
app.post("/api/cart/checkout", cartController.checkout)
app.post("/api/cart/:id", cartController.add)
app.delete("/api/cart/:id", cartController.delete);
//search
app.get("/api/search", searchController.search)


app.listen(SERVER_PORT, ()=> {
    console.log(`LISTENING ON ${SERVER_PORT}`)
})