
import express from 'express';

import mongoose from 'mongoose';
import Tasks from './models/Tasks.js';



const app = express()
app.use(express.json())


mongoose.connect('')
.then(() => {
    console.log('Db ok')
}).catch((err) => {
    console.log('err', err)
})


app.get('/tasks/:id', async (req, res) => {
    try {


        let tasks;




  
        if(req.params.id == 'all') {
            tasks = await Tasks.find({}).sort({createdAt: 'desc'}).exec()
        } else {
            tasks = await Tasks.find({important: true}).sort({createdAt: 'desc'}).exec()
        }
        

        res.json(tasks)
    } catch(err) {
        res.status(500).json({
            message: 'done get articles'
        })
    }

})


app.get('/task/:id', async (req, res) => {

    try {
        const tasks = await Tasks.findOne({_id: req.params.id}).sort({createdAt: 'desc'}).exec();

        res.json(tasks)
    } catch(err) {
        res.status(500).json({
            message: 'done get articles'
        })
    }

})


app.post('/add', async (req, res) => {


   let name = req.body.name;
   let description = req.body.description;
   let important = req.body.important;

   if(name.length > 0 && description.length > 0) {
    const doc = new Tasks({
        name,
        description,
        important
    })

    const task = await doc.save();


    res.json({
        status: 'success',
        text: 'Задача добавлена'
    })
   } else {
    res.json({
        status: 'error',
        text: 'Заполните имя и дополнения'
    })
   }


})



app.put('/edit', async (req, res) => {
    let id = req.body.id;
    let done = req.body.done;

 
    
 
 
     const task = await Tasks.findOneAndUpdate({_id: id}, { $set: {done}});;
 
    if(task) {
        res.json({
            status: 'success',
            text: 'Задача добавлена'
        })
    } else {
        res.json({
            status: 'error',
            text: 'Заполните имя и дополнения'
        })
    }
   
  
    
   
})


app.delete('/:id', async (req, res) => {


    console.log(req.params.id)
    
    const task = await Tasks.findOneAndDelete({_id: req.params.id}).exec()

    if(task) {
        res.json({
            status: 'success',
            text: 'Задача удалена'
        })
    } else {
        res.json({
            status: 'error',
            text: 'Задача не удалена'
        })
    }
})

app.listen(3000, function () {
    console.log("Listening on port http://localhost:3000");
});

