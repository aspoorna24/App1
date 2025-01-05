const express = require('express');
const mongoose = require("mongoose");
const TodoTask = require("./models/TodoModel");
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');

dotenv.config();
const DB = process.env.DB_CONNECT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

mongoose.connect(DB)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.get("/api", (req, res) => {
    res.send({ message: "ToDo List" });
  });

//read all
app.get('/', async(req, res) => {
    try{
        const tasks = await TodoTask.find({});
        res.json(tasks);
    }
    catch(err){
      console.log(err)
    }
});

//add task
app.post('/',async (req, res) => {
    const todoTask = new TodoTask({
    task: req.body.task
    });
    try {
    await todoTask.save();
    console.log("Created task")
    res.json(todoTask)
    } catch (err) {
    console.log(err);
    res.json(err)
    }
    });

app.put('/update/:id', async(req,res)=>{
   
        const id = req.params.id;
        try{
           TodoTask.findByIdAndUpdate({_id:id},{done:true})
           .then(result=>res.json(result))
           .catch(err=>console.log(err))
        }
        catch(err)
        {
           console.log(err)
        }
       })

//delete
app.delete('/delete/:id', async(req,res)=>{
    
   try{
    const result = await TodoTask.findByIdAndDelete(req.params.id);
    if(result){
        res.json(result)
    }
    else{
        res.send('No data found with this ID')
    }
   }
   catch (err){
    console.log(err);
    res.send('Server error')
   }
})

