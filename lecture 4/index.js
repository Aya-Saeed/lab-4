require("express-async-errors");
require("dotenv").config({ path: "./.env" })
const express = require("express");
const mongoose = require("mongoose");
const userRouter=require("./routes/authuser");
const planRouter=require("./routes/plan");
const subRouter=require("./routes/sub");
const app = express();

//middleware
app.use(express.json());
app.use("/api/user",userRouter);
app.use("/api/plan",planRouter)
app.use("/api/planin", subRouter);

// const errorHandler = (func) => {
//     return (req, res, next) => {
//         try {
//             func(req, res, next)
//         } catch (error) {
//             next(error)
//         }
//     }
// }

// app.get("/", errorHandler((req, res) => {
//     // throw new Error("un-expected-error")
//     console.log(req.user);
//     if (req.user.isAdmin)
//         return res.json({ message: "hello-world" })
//     res.status(401).json({ message: "must be admin" })
// }))

//Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message })
})

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("successfully connected to database");
    app.listen(3001, () => {
        console.log("listening on port 3000");
    })
}).catch(e => console.log(e.message))