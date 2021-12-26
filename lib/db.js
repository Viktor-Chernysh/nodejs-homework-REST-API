import pkg from "mongoose";
const { connect, connection } = pkg;

const uri = process.env.DB_URI;

const db = connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.on("connected", () => {
  console.log("Mongoose connected to DB successful");
});

connection.on("err", (err) => {
  console.log(`Mongoose error connection ${err.message}`);
});

connection.on("disconnected", () => {
  console.log("Mongoose disconnected from DB");
});

process.on("SIGINT", async () => {
  connection.close();
  console.log("Connect DB closed");
  process.exit(1);
});

export default db;
