// Add code to userModel.js to complete the model

const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path")

const PORT = process.env.PORT || 3000;

const workoutModel = require("./models/workout")
// const User = require("./userModel.js");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || 
   // 'mongodb://localhost/workout'
    'mongodb+srv://Texas9:Texas9@cluster0.exnkd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    , { useNewUrlParser: true });

// Routes

app.get("/exercise", ({ body }, res) => {
    // Create a new user using req.body

    // Update this route to run the `setFullName` and `lastUpdatedDate` methods before creating a new User
    // You must create these methods in the model.
    res.sendFile(path.join(__dirname, './public', 'exercise.html'))
});

app.get("/stats", ({ body }, res) => {
    // Create a new user using req.body

    // Update this route to run the `setFullName` and `lastUpdatedDate` methods before creating a new User
    // You must create these methods in the model.
    res.sendFile(path.join(__dirname, './public', 'stats.html'))
});
app.get("/api/workouts/", ({ body }, res) => {
    console.log('WE HI THE ROUTE!!!')
    workoutModel.aggregate([
        {
        $addFields: {
        totalDuration: {
            $sum: '$exercises.duration'
        }
        }
    }
    ]).then(data => {
        res.json(data)
    })
});
app.get("/api/workouts/range", ({ body }, res) => {
    console.log('WE HI THE range!!!')
    workoutModel.aggregate([
        {
        $addFields: {
        totalDuration: {
            $sum: '$exercises.duration'
        }
        }
    }
    ]).then(data => {
        res.json(data)
    })
});

app.post("/api/workouts", ({ body }, res) => {
    console.log('post ')
    workoutModel.create({}).then(data => {
        res.json(data)
    })
});
app.put("/api/workouts/:id/", (req , res) => {
    console.log('put $$$$$$$$$$$$$$$$$$$$$$$$$', req.params)
    console.log('Body thing to update!', req.body)
    workoutModel.findOneAndUpdate(
        { _id: req.params.id }, 
        { $push: {
            exercises: req.body
        }}, function(err, updatedWorkout){

            res.json(updatedWorkout)
        });
});
// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});