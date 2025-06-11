import React, { useEffect, useState } from "react";
import API from "../../api/Api";
import QuestionForm from "../../Components/Questions/QuestionForm/QuestionForm";
import QuestionList from "../../Components/Questions/QuestionList/QuestionList";
import styles from "./Questionpage.module.css";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    try {
      const res = await API.get("/question/all-questions");
      setQuestions(res.data.questions || []);
    } catch (err) {
      console.error("Error fetching questions", err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.steps}>
        <h1>Steps to write a good question</h1>
        <lu>
          <li>summerize your problem in a one-line title</li>
          <li>Describe your problem in more details</li>
          <li>Describe what you tried and what you expected to happen</li>
          <li>Reviw ypur question and post it to the site</li>
        </lu>
      </div>
      <h3>📋 Ask a public question </h3>
      <QuestionForm onPost={fetchQuestions} />
      <hr />
      <QuestionList questions={questions} />
    </div>
  );
};

export default QuestionsPage;
