const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const ScoreSchema = new Schema({
  scores: {
    type: Number,
    required: [true, 'Numbers are required']
  }
})

//create model for todo
const Score = mongoose.model('scores', ScoreSchema);

module.exports = Score;