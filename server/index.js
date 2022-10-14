import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routers/user.js";
import teacherRouter from "./routers/teacher.js";
import courseRouter from "./routers/course.js";
import practiceRouter from "./routers/practice.js";
import conversationRouter from "./routers/conversations.js";
import messageRouter from "./routers/messages.js";
import openconversationRouter from "./routers/openConversations.js";
import commentRouter from "./routers/comment.js";
// import http from "http";
// import { Server } from "socket.io";

const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// io.on("connection", () => {
//   console.log("connected to websocket");
// });
app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({
    limit: "10mb",
    extended: true,
    parameterLimit: 50000000,
  })
);
// app.use(bodyParser.json({ limit: "10mb" }));
// app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// app.use("/posts", postRoutes);
app.use(userRouter);
app.use(teacherRouter);
app.use(courseRouter);
app.use(practiceRouter);
app.use(conversationRouter);
app.use(messageRouter);
app.use(openconversationRouter);
app.use(commentRouter);
const CONNECTION_URL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.vae8tj1.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT;
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port : ${PORT}`))
  )
  .catch((error) => console.log(error));

// mongoose.set("useFindAndModify", false);
