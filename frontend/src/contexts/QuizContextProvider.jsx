import  { useState } from 'react'
import QuizContext from './QuizContext'

const QuizContextProvider = ({children}) => {
  const [userQuiz, setUserQuiz] = useState(JSON.parse(localStorage.getItem('quiz')))
  let [score, setScore] = useState(0)
  return (
    <QuizContext.Provider value={{userQuiz, setUserQuiz, score, setScore}}>
      {children}
    </QuizContext.Provider>
  )
}

export default QuizContextProvider
