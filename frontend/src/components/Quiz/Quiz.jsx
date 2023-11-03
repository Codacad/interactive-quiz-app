import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../../css/Quiz.css";
import { motion } from "framer-motion";
import Img from "../../assets/quiz-pic.jpg";
import QuizContext from "../../contexts/QuizContext";
import Spiner from "../Spiner";

const Quiz = () => {
  let { score, setScore } = useContext(QuizContext);
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  let [currentQuestion, setCurrentQuestion] = useState(0);
  let [isSelected, setIsSelected] = useState(false);
  let [selectedOption, setSelectedOption] = useState(null);
  let [option, setOption] = useState("");
  let [label] = useState(["A", "B", "C", "D"]);
  let [progressBarWidth, setProgressBarWidth] = useState(0);
  const [saveQuiz] = useState([]);
  useEffect(() => {
    const getQuestions = async () => {
      try {
        const data = await axios.get(
          import.meta.env.VITE_REACT_LOCAL_API_URL ||
            import.meta.env.VITE_REACT_REMOTE_API_URL
        );
        let quizShuffle = data.data
          .sort(() => 0.5 - Math.random())
          .slice(0, 20);
        setQuestions(quizShuffle);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getQuestions();
  }, [setQuestions]);

  const handleSubmitQuiz = async () => {
    handleNextQuestion(questions[currentQuestion]);
    try {
      localStorage.setItem("quiz", JSON.stringify(saveQuiz));
    } catch (error) {
      console.log(error);
    }
  };

  let [numberProgressComp] = useState([
    {
      component: (
        <>
          <span className={`connector block w-4 h-0 bg-green-500`}></span>
          <span
            className={`number bg-green-500 text-sm text-gray-200 h-6 flex justify-center items-center rounded-full w-6`}
          >
            {currentQuestion + 1}
          </span>
        </>
      ),
    },
  ]);
  const handleOption = (index, option, question, e) => {
    setIsSelected(!isSelected);
    setSelectedOption(option.option);
    if (e.target === e.currentTarget) {
      if (!isSelected) {
        e.target.classList.remove("shadow-option");
      } else {
        e.target.classList.add("shadow-option");
      }
    }
    setOption(option.option);
  };
  const handleNextQuestion = (question) => {
    setCurrentQuestion(currentQuestion + 1);
    setProgressBarWidth(progressBarWidth + 5);
    numberProgressComp.push({
      component: (
        <>
          <span className={`connector block w-4 h-[1px] bg-green-500`}></span>
          <span
            className={`number bg-green-500 text-sm text-gray-200 h-6 flex justify-center items-center rounded-full w-6`}
          >
            {numberProgressComp.length + 1}
          </span>
        </>
      ),
    });

    if (option === question.correctAnswer) {
      setScore(score + 1);
    }
    if (isSelected) {
      setIsSelected(false);
    }

    if (!option) {
      saveQuiz.push({
        ...question,
        userAnswer: false,
        selected: false,
        attempt: false,
      });
    } else {
      saveQuiz.push({
        ...question,
        userAnswer: option,
        selected: true,
        attempt: true,
      });
    }
    setOption("");
  };

  return (
    <>
      <div className="quiz-wrapper w-full min-h-[100vh] md:grid grid-cols-3">
        <div className="md:block hidden">
          <img src={Img} alt="" className="h-[100%] opacity-[.5]" />
        </div>
        <div className="md:relative quiz-content h-full col-span-2">
          {isLoading ? (
            <Spiner />
          ) : (
            <div className="py-6">
              {currentQuestion > 19 ? (
                window.location.replace("/user")
              ) : (
                <div className="quiz h-full md:px-16 px-8 flex gap-4 flex-col justify-center">
                  <div className="score flex justify-center mb-8">
                    <button className="bg-green-100 border-2 border-green-700 py-2 px-8 flex items-center gap-4 text-2xl rounded-lg text-green-800">
                      <span>Score: </span>
                      <span className="">{score}</span>
                      <span>of</span>
                      <span>{questions.length}</span>
                    </button>
                  </div>
                  <div className="max-md:flex hidden">
                    <div className="bar shadow-inner w-full bg-gray-100 flex border rounded-3xl">
                      <div
                        className={`progress w-[${progressBarWidth}%] shadow-sm rounded-3xl bg-green-500`}
                      ></div>
                    </div>
                    <span className="text-gray-500 ml-1">
                      {progressBarWidth}%
                    </span>
                  </div>
                  <div className="relative question-number md:flex hidden mb-8">
                    {questions.map((question, index) => {
                      return (
                        <div
                          className={`disabled flex items-center q-${
                            index + 1
                          }`}
                          key={index}
                        >
                          <span
                            className={`connector block w-4 h-[1px] bg-gray-200`}
                          ></span>
                          <span
                            className={`number bg-gray-200 text-sm text-gray-500 h-6 flex justify-center items-center rounded-full w-6`}
                          >
                            {index + 1}
                          </span>
                        </div>
                      );
                    })}
                    <div className={`flex items-center absolute left-0`}>
                      {numberProgressComp.map((comp) => {
                        return comp.component;
                      })}
                    </div>
                  </div>
                  <div className="question">
                    <h1 className="md:text-3xl flex text-gray-500 font-bold leading-[1.6] mb-4">
                      <span className="">Q. </span>{" "}
                      {questions[currentQuestion].question}
                    </h1>
                  </div>
                  <div className="options flex flex-col gap-4">
                    {questions[currentQuestion].options.map((option, index) => {
                      return (
                        <div
                          className="option flex gap-4 items-center"
                          key={index}
                        >
                          <div className="p-2 bg-green-50 text-gray-600 border-2 font-bold border-green-100 w-10 flex justify-center items-center rounded-full h-10">
                            {label[index]}
                          </div>
                          <div
                            className={`option w-full relative z-10 py-2 cursor-pointer border-2 border-gray-100 rounded-md bg-gray-50 ${
                              option === selectedOption
                                ? "shadow-option after:content-['✓'] after:text-white after:absolute after:right-6 after:top-[50%] after:-translate-y-[50%] after:w-6 after:h-6 after:rounded-full after:flex after:justify-center after:items-center after:bg-green-500"
                                : ""
                            }`}
                            onClick={(e) =>
                              handleOption(
                                index,
                                { option, selected: true },
                                questions[currentQuestion],
                                e
                              )
                            }
                          >
                            <span className="relative -z-10 pl-4">
                              {option}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="footer">
                    <div className="progress">
                      <div className="progress-bar"></div>
                    </div>
                    <div className="buttons flex justify-end gap-2">
                      {currentQuestion >= 19 ? (
                        <button
                          onClick={handleSubmitQuiz}
                          className="bg-red-500 shadow-lg uppercase w-40 text-white rounded-sm px-4 py-2"
                        >
                          Submit Test
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleNextQuestion(questions[currentQuestion])
                          }
                          className="bg-green-500 shadow-lg uppercase w-24 text-white rounded-sm px-4 py-2"
                        >
                          Next
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Quiz;
