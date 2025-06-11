import { useContext, useEffect } from 'react';
import styles from './Home.module.css';
import { AuthContext } from '../../Context/Context';
import axiosInstance from '../../Api/axiosConfig';
import { useState } from 'react';
import { format, formatDistanceToNow } from "date-fns";
import { Link } from 'react-router-dom';

const Home = () => {
  const [{ user:{firstname}, token }, _] = useContext(AuthContext);
  const [questions, setQuestions]= useState([]);

  

  const userFirstName = firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase();

  // const questions = [
  //   {
  //     id: 1,
  //     title: 'How do I divide most worlds back over in my community',
  //     author: 'Jamie Chen',
  //     time: '2 hours ago',
  //   },
  //   {
  //     id: 2,
  //     title: 'Best way to handle async operations in React?',
  //     author: 'Taylor Smith',
  //     time: '5 hours ago',
  //   },
  //   {
  //     id: 3,
  //     title: 'CSS Grid not working as expected',
  //     author: 'Morgan Lee',
  //     time: '1 day ago',
  //   },
  // ];

  useEffect(() => { 
    async function fetchQuestions() {
      const res = await axiosInstance.get("/questions/all-questions", {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      });
      console.log(res);
      setQuestions(res.data.questions)
    }
    fetchQuestions();
  }, [questions]);

  return (
    <main className={styles.container}>
      <section className={styles.welcomeSection}>
        <div className={styles.welcomeContent}>
          <h1>
            Welcome back,{" "}
            <span className={styles.userName}>{userFirstName}</span>!
          </h1>
          <p className={styles.subtitle}>
            Ready to dive into today's coding challenges? Ask questions, share
            knowledge, and learn together!
          </p>

          <Link to='/ask'>
            <button className={styles.askButton}>
              <span className={styles.plusIcon}>+</span> Ask a Question
            </button>
          </Link>
        </div>
      </section>

      <section className={styles.questionsSection}>
        <div className={styles.sectionHeader}>
          <h2>Latest Questions</h2>
          <p className={styles.helpText}>
            Help your fellow bootcamp students by answering their questions!
          </p>
        </div>

        <div className={styles.questionsList}>
          {questions?.map((question) => {
            const postedTime = new Date(question.created_at);
            const timeAgo = formatDistanceToNow(postedTime, {
              addSuffix: true,
            });

            const formattedDate = format(postedTime, "MMM d"); // "Jun 11"

            const fullText = `${timeAgo} • ${formattedDate}`;

            return (
              <article key={question.id} className={styles.questionCard}>
                <h3 className={styles.questionTitle}>{question.title}</h3>
                <div className={styles.questionMeta}>
                  <div className={styles.authorInfo}>
                    <div className={styles.avatar}>
                      {question.firstname.charAt(0).toUpperCase()}
                    </div>
                    <span>{question.username}</span>
                  </div>
                  <span className={styles.time}>{fullText}</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Home;