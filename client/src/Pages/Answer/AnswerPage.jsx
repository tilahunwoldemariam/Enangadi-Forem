import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./AnswerPage.module.css";
import axiosBase from "../../Api/axiosConfig";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/Context";
import { format, formatDistanceToNow } from "date-fns";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

const AnswerPage = () => {
  const { questionid } = useParams();
  const [{ token }, _] = useContext(AuthContext);
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const answerDom = useRef(null);
  const postedNotification = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSingleQuestion() {
      setIsLoading(true);
      try {
        const res = await axiosBase.get(`/questions/${questionid}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setQuestion(res.data.question);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSingleQuestion();
  }, [questionid, token]);

  useEffect(() => {
    async function fetchAnswer() {
      try {
        const res = await axiosBase.get(`/answers/${questionid}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAnswers(res.data.answer);
      } catch (error) {
        console.error(error.response?.data?.msg);
      }
    }
    fetchAnswer();
  }, [question, questionid, token]);

  async function handlePostAnswer(e) {
    e.preventDefault();
    const answer = answerDom.current.value;
    if (!answer.trim()) return;

    setIsPosting(true);
    try {
      await axiosBase.post(
        "/answers/postanswer",
        { answer, questionid: question.questionid },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      answerDom.current.value = "";
      postedNotification.current.style.display = "block";
      setTimeout(() => {
        postedNotification.current.style.display = "none";
      }, 2000);

      // Refresh answers
      const res = await axiosBase.get(`/answers/${questionid}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAnswers(res.data.answer);
    } catch (err) {
      console.error(err);
    } finally {
      setIsPosting(false);
    }
  }

  const formatQuestionDate = (dateString) => {
    const postedTime = new Date(dateString);
    const timeAgo = formatDistanceToNow(postedTime, { addSuffix: true });
    const formattedDate = format(postedTime, "MMM d");
    return `${timeAgo} • ${formattedDate}`;
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <ClipLoader color="#516cf0" size={50} />
      </div>
    );
  }

  return (
    <div className={styles.main_wrapper}>
      <div className={styles.container}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          <FaArrowLeft /> Back to Questions
        </button>

        {/* Question Section */}
        <div className={styles.questionSection}>
          <div className={styles.questionCard}>
            <div className={styles.questionTag}>
              <span className={styles.tagIcon}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="14" fill="#4F6CFF" />
                  <path
                    d="M12 9l5 5-5 5"
                    stroke="#fff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className={styles.tagTitle}>{question?.title}</span>
            </div>
            <div className={styles.questionContent}>{question?.content}</div>
            <div className={styles.questionMeta}>
              {question?.created_at && (
                <span className={styles.time}>
                  {formatQuestionDate(question.created_at)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Answers Section */}
        <div className={styles.answersSection}>
          <h2 className={styles.sectionTitle}>Answers ({answers.length})</h2>

          {answers.length === 0 ? (
            <div className={styles.noAnswers}>
              No answers yet. Be the first to share your knowledge!
            </div>
          ) : (
            answers.map((answer, i) => (
              <div className={styles.answerCard} key={i}>
                <div className={styles.answerContent}>{answer.content}</div>
                <div className={styles.answerFooter}>
                  <div className={styles.userInfo}>
                    <div className={styles.avatar}>
                      {answer.username?.charAt(0).toUpperCase()}
                    </div>
                    <span className={styles.username}>{answer.username}</span>
                  </div>
                  {answer.created_at && (
                    <span className={styles.time}>
                      {formatQuestionDate(answer.created_at)}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Answer Form */}
        <div className={styles.answerFormSection}>
          <h2 className={styles.formTitle}>Your Answer</h2>
          <form onSubmit={handlePostAnswer}>
            <textarea
              className={styles.answerInput}
              ref={answerDom}
              placeholder="Write your answer here..."
              required
              rows={8}
            />
            <div ref={postedNotification} className={styles.successMessage}>
              ✓ Your answer was posted successfully!
            </div>
            <button
              type="submit"
              className={styles.postAnswerBtn}
              disabled={isPosting}
            >
              {isPosting ? (
                <ClipLoader color="#fff" size={18} />
              ) : (
                <>
                  <FaPaperPlane /> Post Answer
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AnswerPage;