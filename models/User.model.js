const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: [5, 'El nombre de usuario debe tener 5 caracteres'],
      required: [true, 'El nombre es obligatorio'],
    },

    username: {
      type: String,
      trim: true,
      required: [true, 'El nombre de usuario es obligatorio'],
      unique: true
    },

    email: {
      type: String,
      required: [true, 'El email es obligartorio'],
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria']
    },

    age: {
      type: Date,
      require: [true, 'La edad es obligatoria'],

    },

    cover: {
      type: String,
      required: false
    },

    role: {
      type: String,
      enum: ['USER', 'ADMIN', 'EDITOR'],
      default: 'USER'
    }
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema)

module.exports = User