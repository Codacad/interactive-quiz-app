import "./App.css";
import Quiz from "./components/Quiz/Quiz";
import { Routes, Route, Navigate } from "react-router-dom";
import User from "./routes/User";
import { useContext } from "react";
import QuizContext from "./contexts/QuizContext";
function App() {
  const { userQuiz } = useContext(QuizContext)
  console.log(userQuiz)
  return (
    <>
      <div className="app font-montserrat">
        <Routes>
          <Route path="/" element={userQuiz ? <Navigate to="/user" /> : <Quiz />} />
          <Route path="/user" element={userQuiz === null ? <Navigate to="/" /> : <User />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
