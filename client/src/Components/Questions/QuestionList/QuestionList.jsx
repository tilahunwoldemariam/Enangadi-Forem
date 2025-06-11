import React from "react";
import QuestionCard from "../QuestionCard/QuestionCard";

const QuestionList = ({ questions }) => {
  return (
    <div>
      {questions.map((q) => (
        <QuestionCard key={q.question_id} question={q} />
      ))}
    </div>
  );
};

export default QuestionList;
