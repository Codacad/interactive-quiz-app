import { useContext } from "react";
import QuizContext from "../contexts/QuizContext";
import { useNavigate } from "react-router-dom";

const User = () => {
  const { userQuiz, setUserQuiz } = useContext(QuizContext);
  const score = userQuiz.filter((quiz) => {
    return quiz.userAnswer === quiz.correctAnswer;
  });
  const navigate = useNavigate();
  const handleRetakeQuiz = (e) => {
    e.preventDefault();
    localStorage.removeItem("quiz");    
    window.location.replace('/')
  };
  return (
    <>
      <div className="">
        <div className="">
          <div className="header p-4 shadow-lg px-16 flex justify-between text-white bg-green-500">
            <h1 className="text-2xl font-bold">
              Good Job: You score is {score.length} of {userQuiz.length}
            </h1>
            <button
              onClick={handleRetakeQuiz}
              className="text-gray-500 px-4 py-2 bg-gray-100 rounded-md flex justify-center items-center"
            >
              Retake Quiz
            </button>
          </div>
          <div className="py-8 flex flex-col gap-4">
            {userQuiz &&
              userQuiz.map((question, index) => {
                return (
                  <div className="w-[75%] m-auto" key={index}>
                    <div>
                      <h1 className="text-2xl font-bold mb-4 text-gray-600">
                        {index + 1}. {question.question}
                      </h1>
                    </div>
                    <div className="options">
                      {question.options.map((option, index) => {
                        return (
                          <div
                            className="option flex gap-2 my-2 items-center"
                            key={index}
                          >
                            <div className="p-2 bg-green-50 text-gray-600 border-2 font-bold border-green-100 w-10 flex justify-center items-center rounded-full h-10">
                              {index + 1}
                            </div>
                            <div
                              className={`option w-full relative z-10 py-2 border-2 border-gray-100 rounded-md                              
                              ${
                                question.correctAnswer == option
                                  ? "bg-green-200"
                                  : "bg-gray-50"
                              } ${
                                question.userAnswer != question.correctAnswer &&
                                question.userAnswer == option
                                  ? "bg-red-200"
                                  : "bg-gray-50"
                              }`}
                            >
                              <span className="relative -z-10 pl-4">
                                {option}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
