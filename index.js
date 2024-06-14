const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
require("dotenv").config();
const app = express()
const port = 3000

app.use(cors({
  origin: '*'
}));
app.use(express.json())

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error('Missing MONGODB_URI environment variable');
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    
    const productDB = client.db("productDB");
    const userDB = client.db("userDB");
    const shoesCollection = productDB.collection("shoes");
    const usersCollection = userDB.collection("users");

    const projectDB = client.db("projectDB");
    const blogDB = client.db("blogDB");
    const skillDB = client.db("skillDB");
    const projectCollection = projectDB.collection('projects')
    const blogCollection = blogDB.collection('blogs')
    const skillCollection = skillDB.collection('skills')

    // skills router
    app.post('/skill', async(req, res) => {
      const skills = req.body;
      const result = await skillCollection.insertOne(skills)
      res.send(result)
      console.log(result)
    })
    app.get('/skill', async(req, res)=>{
      const skillData = skillCollection.find();
      const result = await skillData.toArray()
      res.send(result)
      console.log(result)
    })

    // add project
    app.post('/project', async(req, res) => {
      const project = req.body;
      const result = await projectCollection.insertOne(project)
      res.send(result)
      console.log(result)
    })

    app.get('/project', async(req, res)=>{
      const projectData = projectCollection.find();
      const result = await projectData.toArray()
      res.send(result)
      console.log(result)
    })

    app.get('/project/:id', async(req, res)=>{
      const id = req.params.id
      const projectData = await projectCollection.findOne({_id: new ObjectId(id)});
      res.send(projectData)
      console.log(projectData)
    })

    // add blog
    app.post('/blogs', async(req, res) => {
      const blog = req.body;
      const result = await blogCollection.insertOne(blog)
      res.send(result)
      console.log(result)
    })

    app.get('/blogs', async(req, res)=>{
      const blogData = blogCollection.find();
      const result = await blogData.toArray()
      res.send(result)
      console.log(result)
    })

    app.get('/blogs/:id', async(req, res)=>{
      const id = req.params.id
      const blogData = await blogCollection.findOne({_id: new ObjectId(id)});
      res.send(blogData)
      console.log(blogData)
    })

    // app.patch('/shoes/:id', async(req, res)=>{
    //   const id = req.params.id
    //   const updateData = req.body;
    //   const shoesData = await shoesCollection.updateOne(
    //     {_id: new ObjectId(id)},
    //     {$set: updateData}
    //   );
    //   res.send(shoesData)
    //   console.log(shoesData)
    // })

    // app.delete('/shoes/:id', async(req, res)=>{
    //   const id = req.params.id
    //   const shoesData = await shoesCollection.deleteOne({id: new ObjectId(id)})
    //   res.send(shoesData)
    //   console.log(shoesData)
    // } )
    
    console.log("Database mongodb Connected!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.get('/users', (req, res) => {
//     const user = {
//         id:1,
//         name: "Md.Tufael Khan",
//         contact: "01601107807",
//         address: "Kasem bazar",
//         email: "tufaelkhan247@gmail.com"
//     }
//   res.send(user)
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// first-server
// jVZlDxBTYBTqS4Zn