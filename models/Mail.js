import mongoose, { Schema } from 'mongoose';

const mailSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true
    },
    letterNumber: {
      type: String,
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
    },
    pdfUrl: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.models.Mail || mongoose.model('Mail', mailSchema)