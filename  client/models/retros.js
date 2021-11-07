import mongoose from 'mongoose';

/**
 * Retro Model to store the different fields of each retro.
 */
const retroSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter email'],
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  date: {
    type: Date,
    required: [true, 'Please select a date'],
  },
  overview: {
    type: String,
    required: [true, 'Please provide an overview'],
  },
  technicalContributions: {
    type: String,
  },
  teamContributions: {
    type: String,
  },
  widerContributions: {
    type: String,
  },
  improvementAndReflections: {
    type: String,
  },
  tags: {
    type: [String],
  },
  overallFeeling: {
    type: String,
    required: [true, 'Please provide your overall feeling'],
  }
});

mongoose.models = {};
const Retro = mongoose.model('Retros', retroSchema);

export default Retro;
