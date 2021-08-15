// Create the required custom methods at the bottom of this file

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workOutSchema = new Schema({
    day: {
        type: Date,
        default: new Date(),
        trim: true,
    },
    exercises: [{
        type: {
            type: String
        },
        duration: {

            type: Number
        },
        name: {
            type: String
        },
        weight: {
            type: Number
        },
        reps: {
            type: Number
        },
        sets: {
            type: Number
        }
    }]
});

// setFullName: sets the current user's `fullName` property to their lastName appended to their `firstName`

// lastUpdatedDate: sets the current user's `lastUpdated` property to Date.now()

// This creates our model from the above schema, using mongoose's model method
const workOut = mongoose.model("workout", workOutSchema);

// Export the User model
module.exports = workOut;