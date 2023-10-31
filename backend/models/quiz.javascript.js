const mongoose = require('mongoose');

const javascriptQuizSchema = new mongoose.Schema({
  question: String,
  options: Array,
  correctAnswer: String,
}, {timestamps:true});

const JavaScripQuiz = mongoose.model('JavaScripQuiz', javascriptQuizSchema, 'javascript');

module.exports = JavaScripQuiz;
