const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const dotenv = require("dotenv");
const { connectDB } = require("./utils/database");
const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");
const bidRoutes = require("./routes/bidRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const { errorHandler } = require("./utils/errorHandler");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/users", authRoutes);
app.use("/items", itemRoutes);
app.use("/bids", bidRoutes);
app.use("/notifications", notificationRoutes);

app.use(errorHandler);

connectDB();

io.on("connection", (socket) => {
  console.log("New client connected");
  // Handle socket events here
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
