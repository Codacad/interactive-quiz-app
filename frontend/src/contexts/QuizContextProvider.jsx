import  { useState } from 'react'
import QuizContext from './QuizContext'

const QuizContextProvider = ({children}) => {
  const [jsQuiz, setJsQuiz] = useState([])
  return (
    <QuizContext.Provider value={{jsQuiz, setJsQuiz}}>
      {children}
    </QuizContext.Provider>
  )
}

export default QuizContextProvider
