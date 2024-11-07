const mongoose = require('mongoose')
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const model = require('./model')
app.use(express.json())
app.use(cors())

app.use('/songs', express.static(path.join('C:', 'player', 'songs')));
mongoose.connect("mongodb+srv://pujan:pujan%40123@songstore.jig4u.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    app.listen(3000,()=>{
        console.log("listening on 3000 sorolace")
    })

    app.get('/songs',async (req,res)=>{
        const data = await model.find();
        res.send(data)
    })

    app.get('/songs/:id',async (req,res)=>{
        const data = await model.findOne({id:req.params.id});
        res.send(data)
    })

      app.post('/songs',async (req,res)=>{
          const {path,name,id} = req.body
          const data = new model({path,name,id})
          await data.save()
          res.send('song added')
      })

    app.delete('/songsD/:id',async(req,res)=>{
        await model.deleteOne({id:req.params.id});
        res.send(`deleted song with the id ${id}`)
    })

    
    app.patch('/songs/:id', async (req, res) => {
        const { path, name } = req.body;
      
        const updatedSong = await model.findOneAndUpdate(
          { id: req.params.id },
          { path, name },
          { new: true }
        );
      
        if (updatedSong) {
          res.send(`Updated song with id ${req.params.id}`);
        } else {
          res.status(404).send("Song not found");
        }
      });
      
})