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
    toJSON: { virtuals: true },
  }
)

mailSchema.virtual('year').get(function() {
  return this.letterDate.getFullYear();
});

mailSchema.set('toObject', { virtuals: true });
mailSchema.set('toJSON', { virtuals: true });

mailSchema.index({ registerNumber: 1, year: 1 }, { unique: true, partialFilterExpression: { year: { $exists: true } } });


export default mongoose.models.Mail || mongoose.model('Mail', mailSchema)