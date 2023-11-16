const { Schema, model } = require("mongoose");
const User = require("./User.model");

const tripSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        country: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true
        },
        minimumAge: {
            type: Number,
            min: 18,
            require: true,
        },
        date: {
            type: Date,
        },
        namePlace: {
            type: String,
        },
        description: {
            type: String,
            max: 100
        },
        location: {
            type: {
                type: String
            },
            coordinates: {
                type: [Number]
            }
        },
        attendees: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]


    },
    {
        timestamps: true
    }
);

tripSchema.index({ location: '2dsphere' })

const Trip = model("Trip", tripSchema);

module.exports = Trip;