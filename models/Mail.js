import mongoose, { Schema } from 'mongoose';

const mailSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true
    },
    letterNumber: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    title: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.models.Mail || mongoose.model('Mail', mailSchema)