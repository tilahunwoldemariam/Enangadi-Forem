import { createContext, useContext, useState, useMemo } from "react";

const QuestionContext = createContext();

function QuestionProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter questions based on title search
  const searchedQuestions = useMemo(() => {
    return searchQuery.length > 0
      ? questions.filter(question =>
        question.title.toLowerCase().includes(searchQuery.toLowerCase()))
      : questions;
  }, [questions, searchQuery]);

  const value = useMemo(() => {
    return {
      questions: searchedQuestions,
      allQuestions: questions,
      setQuestions,
      searchQuery,
      setSearchQuery,
    };
  }, [searchedQuestions, questions, searchQuery]);

  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
}

function useQuestions() {
  const context = useContext(QuestionContext);
  if (context === undefined)
    throw new Error("QuestionContext was used outside of QuestionProvider");
  return context;
}

export { QuestionProvider, useQuestions };