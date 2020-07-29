const express = require('express');
let app = express();
let { verifyToken, verifyAdmin_Role } = require('../middlewares/authentication');
let Task = require('../models/task');

//========================
 //Show all the task
 //=======================
 app.get('/task', verifyToken ,(req,res) =>{
    Task.find({})
    .exec((err, tasks) =>{
        
        if (err) {
            return res.status(500).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            task: task
        });


    })
 });

//=====================
//Show a task by id
//=====================
app.get('/task/:id', verifyToken,(req,res) =>{


    let id = req.params.id;

    Task.findById(id,(err, taskDB) => {
        
        if (err) {
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if (!taskDB) {
            return res.status(500).json({
                ok:false,
                err:{
                    message: 'ID not found'
                }
            });
        }

        res.json({
            ok:true,
            task: taskDB
        });


    })

});

//=====================
//create a task
//=====================
app.post('/task', verifyToken ,(req,res) =>{


    let body = req.body;
    let task = new Task({
        description: body.description,
        user: req.user._id
    });

    task.save((err,taskDB) =>{
        if (err) {
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if (!taskDB) {
            return res.status(400).json({
                ok:false,
                err
            })
        }

        res.json({
            ok: true,
            task: taskDB
        });

    });

});

//=====================
//Update a Task
//=====================
app.put('/task/:id', verifyToken ,(req,res) =>{
    let id = req.params.id;
    let body = req.body;

    
    let completedTask = {
        completed : body.completedtask
    };

    Task.findByIdAndUpdate(id,completedTask,{ new: true, runValidators: true, useFindAndModify:false },(err, taskDB) => {
        if (err) {
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if (!taskDB) {
            return res.status(400).json({
                ok:false,
                err
            })
        }

        res.json({
            ok: true,
            task: taskDB
        });

    });
});

//=====================
//Delete a task
//=====================
app.delete('/task/:id', verifyToken ,(req,res) =>{
    
    let id = req.params.id;

    Category.findByIdAndRemove(id, {useFindAndModify : false}, (err,categoryDB) => {
        
        if (err) {
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if (!taskDB) {
            return res.status(400).json({
                ok:false,
                err:{
                    message: 'The ID does´t exists'
                }
            });
        }

        res.json({
            ok:true,
            message: 'Task Removed'
        })

    })

});

module.exports = app;
 
