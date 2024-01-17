import mongoose, { Schema } from 'mongoose';

const mailSchema = new Schema(
  {
    registerNumber: {
      type: Number,
      required: true,
    },
    letterNumber: {
      type: String,
      required: true,
    },
    letterDate: {
      type: Date,
      required: true,
    },
    year: {
      type: Number,
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
    timestamps: true,
  }
)

mailSchema.index({ registerNumber: 1, year: 1 }, { unique: true });


export default mongoose.models.Mail || mongoose.model('Mail', mailSchema)