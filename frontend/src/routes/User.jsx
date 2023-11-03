import { useContext } from "react";
import QuizContext from "../contexts/QuizContext";

const User = () => {
  const { userQuiz } = useContext(QuizContext);
  const score = userQuiz.filter((quiz) => {
    return quiz.userAnswer === quiz.correctAnswer;
  });
  const handleRetakeQuiz = (e) => {
    e.preventDefault();
    localStorage.removeItem("quiz");
    window.location.replace("/");
  };
  return (
    <>
      <div className="">
        <div className="relative">
          <div className="header p-2 shadow-lg sm:px-16 px-4 flex justify-between items-center text-white bg-green-500">
            <h1 className="sm:text-2xl text-lg">
              <span className="font-bold">
                {score.length >= 10 ? "Good Job:" : "Opps! try again:"}
              </span>{" "}
              <span className="text-gray-200">
                You score is {score.length} of {userQuiz.length}
              </span>
            </h1>            
          </div>
          <button
              onClick={handleRetakeQuiz}
              className="fixed bottom-6 right-6 shadow-xl w-24 h-24 text-gray-100 px-4 py-2 bg-red-500 rounded-full flex justify-center items-center"
            >
              Retake Quiz
            </button>
          <div className="py-8 flex flex-col gap-4">
            {userQuiz &&
              userQuiz.map((question, index) => {
                return (
                  <div className="sm:w-[75%] px-4 m-auto" key={index}>
                    <div>
                      <h1 className="sm:text-2xl text-lg font-bold mb-4 text-gray-600 flex">
                        <span className="mr-2">{index + 1}.</span>{" "}
                        <span>{question.question}</span>
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
                                question.attempt === false &&
                                question.correctAnswer === option
                                  ? "bg-yellow-300"
                                  : ""
                              }
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
