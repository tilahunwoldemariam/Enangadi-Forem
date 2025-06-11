import React, { useEffect, useState } from "react";
import styles from "./Questionpage.module.css";
import { Link } from "react-router-dom";
import QuestionForm from '../../Components/Questions/QuestionForm/QuestionForm'

const QuestionsPage = () => {
 
  
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
      <Link to='/'>
      Go to Question Page
      </Link>
      <QuestionForm  />
    
    </div>
  );
};

export default QuestionsPage;
