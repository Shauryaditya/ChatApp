const express = require("express");
const dotenv= require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const { notFound, errorHandler} = require("./middleware/errorMiddleware")


dotenv.config();
connectDB();
const app = express();

app.use(express.json()) // to accept JSON data


app.get("/", (req,res) => {
    res.send("API is running")
})

app.use("/api/user",userRoutes)
app.use('/api/chat',chatRoutes);

app.use(notFound)
app.use(errorHandler)

app.get("/api/chat/:id", (req,res) => {
    // console.log(req.params.id)
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat);
})

const PORT = process.env.PORT || 5000

app.listen(5000, console.log(`Server started on PORT ${PORT}`)) 