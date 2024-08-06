const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const path = require("path");
const eventRoutes = require("./router");
const seedDatabase = require("./seed");

const app = express();
const port = 3000;

app.use(express.json());

const mongoServer = new MongoMemoryServer();

async function startServer() {
  try {
    await mongoServer.start();
    const mongoUri = mongoServer.getUri();

    mongoose
      .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(async () => {
        console.log("Connected to MongoDB In-Memory Server");
        await seedDatabase();
      })
      .catch((err) => {
        console.error("Failed to connect to MongoDB In-Memory Server", err);
      });
  } catch (err) {
    console.error("Error starting MongoMemoryServer", err);
  }
}

startServer();

app.use("/api", eventRoutes);

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
