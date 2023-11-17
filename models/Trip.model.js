const { Schema, model } = require("mongoose");

// TODO: MEJORAR VALIDACIÓN MODELOS

const tripSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        country: {
            type: String,
            required: [true, 'El país obligatoria']
        },
        city: {
            type: String,
            required: [true, 'La ciudad obligatoria']
        },
        minimumAge: {
            type: Number,
            min: 18,
            required: [true, 'Minimo de edad recomendada obligatoria']
        },
        date: {
            type: Date,
            required: [true, 'Fecha del evento obligatoria']
        },
        namePlace: {
            type: String,
            required: [true, 'Nombre del sitio obligatorio']
        },
        description: {
            type: String,
            max: 100,
            required: [true, 'Una bre descripción obligatoria de solo 100 caracteres']
        },
        comment:[{
            type: String,
        }],
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