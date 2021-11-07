import mongoose from 'mongoose';

/**
 * Feedback Model to store the different fields of each retro.
 */

const feedbackSchema = new mongoose.Schema({
  feedbackTitle: {
    type: String,
    required: [true, 'Please enter a title'],
  },
  feedbackDate: {
    type: Date,
    required: [true, 'Please select a date'],
  },
  feedbackProvidedBy: {
    type: String,
    required: [true, 'Please provide name'],
  },
  feedback: {
    type: String,
    required: [true, 'Please provide feedback'],
  },
  tags: {
    type: [String],
  },
});

mongoose.models = {};
const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
