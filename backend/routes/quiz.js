const router = require("express").Router();
const JavaScripQuiz = require("../models/quiz.javascript");
router.get("/", async (req, res) => {
  res.send("hello");
});

router.get("/api/quiz/js", async (req, res) => {
  try {
    const quiz = await JavaScripQuiz.find({})
    res.json(quiz)
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
