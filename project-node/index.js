const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const ObjectId = require("mongodb").ObjectId;

const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://dbuser1:w3w2dgINdd88u8am@cluster0.apqen.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// client.connect((err) => {
//   const collection = client.db("foodExpress").collection("users");
//   console.log("db connected");
//   // perform actions on the collection object
//   client.close();
// });
const run = async () => {
  try {
    await client.connect();
    const userCollection = client.db("foodExpress").collection("users");

    // GET user
    app.get("/user", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    // GET single user
    app.get("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.findOne(query);
      res.send(result);
    });

    // POST add a new user
    app.post("/user", async (req, res) => {
      const newUser = req.body;
      console.log("adding new user", newUser);
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    // PUT upadte a user
    app.put("/user/:id", async (req, res) => {
      const id = req.params.id;
      const updatedUser = req.body;
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          name: updatedUser.name,
          email: updatedUser.email,
        },
      };
      const result = await userCollection.updateOne(query, updatedDoc, options);
      res.send(result);
    });

    // DELETE user
    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
    // await client.close();
  }
};
run().catch(console.dir);

app.listen(port, () => {
  console.log("Listening to port", port);
});

/////////////////////
//// last lesson

// app.get("/", (req, res) => {
//   res.send("hello node jssss");
// });

// app.listen(port, () => {
//   console.log("Listening to port", port);
// });

// const users = [
//   {
//     id: 1,
//     name: "Thibo Courtois",
//     phone: 123456789,
//     email: "thibo@madrid.com",
//   },
//   { id: 2, name: "Karim Benzema", phone: 123478789, email: "karim@madrid.com" },
//   {
//     id: 3,
//     name: "Vinicius Junior",
//     phone: 543478789,
//     email: "vini@madrid.com",
//   },
//   { id: 4, name: "Luca Modric", phone: 596478789, email: "luca@madrid.com" },
//   { id: 5, name: "Toni Kroos", phone: 596421789, email: "toni@madrid.com" },
//   {
//     id: 6,
//     name: "Carlos Casemiro",
//     phone: 532421789,
//     email: "case@madrid.com",
//   },
// ];

// app.get("/users", (req, res) => {
//   res.send(users);
// });

// app.get("/users/:id", (req, res) => {
//   const id = +req.params.id;
//   const user = users.find((user) => user.id === id);
//   res.send(user);
// });

// app.post("/user", (req, res) => {
//   console.log(req.body);
//   const user = req.body;
//   user.id = users.length + 1;
//   users.push(user);
//   res.send(user);
// });
