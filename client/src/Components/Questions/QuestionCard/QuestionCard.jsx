import React from "react";
import styles from "./QuestionCard.module.css";

const QuestionCard = ({ question }) => {
  return (
    <div className={styles.card}>
      <h3>{question.title}</h3>
      <p>{question.content}</p>
      <small>
        👤 {question.user_name} | 🏷 {question.tag}
      </small>
    </div>
  );
};

export default QuestionCard;
