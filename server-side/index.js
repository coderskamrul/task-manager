const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = "mongodb+srv://hmdkamrul:hmdkamrul@cluster0.bvll5ro.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Collaborative Task Manager Server Side');
});

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the MongoDB server
        await client.connect();
        console.log("Successfully connected to MongoDB!");

        // Select the database and collection
        const db = client.db("TaskManagerDB");
        const taskCollection = db.collection("tasks");
        const userCollection = db.collection("users");

        // POST route to add task data
        app.post('/tasks', async (req, res) => {
            const task = req.body;
            const result = await taskCollection.insertOne(task);
            res.send(result);
        });

        // POST route to add user data
        app.post('/users', async (req, res) => {
            const users = req.body;
            const result = await userCollection.insertOne(users);
            res.send(result);
        });

       // GET route to fetch all user data
      app.get('/tasks', async (req, res) => {
         try {
             const users = await taskCollection.find({}).toArray(); // Fetch all task
             res.send(users);
         } catch (error) {
             console.error("Error fetching users", error);
             res.status(500).send({ error: "Failed to fetch users" });
         }
      });
      app.get('/users', async (req, res) => {
         try {
             const users = await userCollection.find({}).toArray(); // Fetch all users
             res.send(users);
         } catch (error) {
             console.error("Error fetching users", error);
             res.status(500).send({ error: "Failed to fetch users" });
         }
      });

      app.get('/assign/:id', async (req, res) => {
        const id  = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await taskCollection.findOne(query);
        res.send(result);
  
      })

      app.put('/tasks/:id', async (req, res) => {
        const id  = req.params.id;
        const task = req.body;
        const query = { _id: new ObjectId(id) };
        const options = {upsert : true};
        const updatedUser = {
          $set: {
            taskTitle : task.taskTitle,
            taskDesc : task.taskDesc,
            taskUser : task.taskUser
          },
        };
        const result = await taskCollection.updateOne( query, updatedUser, options );

        res.send(result);
  
      })

    app.delete('/tasks/:id', async (req, res) => {
      const id  = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await taskCollection.deleteOne(query);
      res.send(result);

    })
        // Any other routes or database operations can be added here
    } catch (error) {
        console.error("Error occurred during database operations", error);
    }
}

// Run the MongoDB connection and API server
run().catch(console.log);

// Start the server without closing the MongoDB connection
app.listen(PORT, () => {
    console.log(`Server is running on ports - ${PORT}`);
});
