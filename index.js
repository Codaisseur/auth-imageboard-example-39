const express = require("express");
const cors = require("cors");
const userRouter = require("./routers/user");
const imageRouter = require("./routers/image");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/images", imageRouter);

app.listen(PORT, () => console.log("server started!"));
