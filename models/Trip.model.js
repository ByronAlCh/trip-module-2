const { Schema, model } = require("mongoose");

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
        }

    },
    {
        timestamps: true
    }
);

tripSchema.index({ location: '2dsphere' })

const Trip = model("Trip", tripSchema);

module.exports = Trip;