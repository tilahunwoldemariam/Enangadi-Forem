import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './AnswerPage.module.css';
import axiosBase from '../../Api/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/Context';
import { format, formatDistanceToNow } from 'date-fns';
import { FaArrowLeft, FaPaperPlane, FaEdit, FaTrash } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import Loader from '../../Components/Loader/Loader';
import Shared from '../../Components/Shared/Shared';

const AnswerPage = () => {
  const { questionid } = useParams();
  const [{ user, token }, _] = useContext(AuthContext);

  // State for the question details
  const [question, setQuestion] = useState({});

  // State for the list of answers
  const [answers, setAnswers] = useState([]);

  // State for loading indicators
  const [isLoading, setIsLoading] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  // State for editing the question
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  // State for notifications
  const answerDom = useRef(null);
  const postedNotification = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSingleQuestion() {
      setIsLoading(true);
      try {
        const res = await axiosBase.get(`/questions/${questionid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuestion(res.data.question);
        setEditedQuestion(res.data.question.title); // Initialize edited question
      } catch (error) {
        console.error(error.response.data.msg);
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
          headers: { Authorization: `Bearer ${token}` },
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
        '/answers/postanswer',
        { answer, questionid: question.questionid },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      answerDom.current.value = '';
      postedNotification.current.style.display = 'block';
      setTimeout(() => {
        postedNotification.current.style.display = 'none';
      }, 2000);

      // Refresh answers
      const res = await axiosBase.get(`/answers/${questionid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnswers(res.data.answer);
    } catch (err) {
      console.error(err.response.data.msg);
    } finally {
      setIsPosting(false);
    }
  }

  async function handleEditQuestion() {
    try {
      await axiosBase.put(
        `/questions/edit/${questionid}`,
        { title: editedQuestion, description: editedDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setQuestion((prev) => ({
        ...prev,
        title: editedQuestion,
        content: editedDescription,
      }));
      setIsEditingQuestion(false);
    } catch (error) {
      console.error(error.response.data.msg);
    }
  }

  async function handleDeleteQuestion() {
    try {
      await axiosBase.delete(`/questions/delete/${questionid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/'); // Redirect to home page after deletion
    } catch (error) {
      console.error(error.response.data.msg);
    }
  }

  async function handleDeleteAnswer(answerId) {
  try {
    await axiosBase.delete(`/answers/delete/${answerId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Update the state to remove the deleted answer
    setAnswers((prev) => prev.filter((answer) => answer.answerid !== answerId));
  } catch (error) {
    console.error('Error deleting answer:', error.response?.data?.msg || error.message);
  }
}

 async function handleVoteAnswer(answerId, voteType) {
   try {
     const res = await axiosBase.post(
       `/answers/vote/${answerId}`,
       { voteType },
       {
         headers: { Authorization: `Bearer ${token}` },
       }
     );

     if (res.data.msg === 'Vote removed successfully') {
       // If the vote was removed, decrease the count
       setAnswers((prev) =>
         prev.map((answer) =>
           answer.answerid === answerId
             ? voteType === 'like'
               ? { ...answer, likes: answer.likes - 1 }
               : { ...answer, dislikes: answer.dislikes - 1 }
             : answer
         )
       );
     } else {
       // If the vote was added, increase the count
       setAnswers((prev) =>
         prev.map((answer) =>
           answer.answerid === answerId
             ? voteType === 'like'
               ? { ...answer, likes: answer.likes + 1 }
               : { ...answer, dislikes: answer.dislikes + 1 }
             : answer
         )
       );
     }
   } catch (error) {
     console.error(
       'Error voting on answer:',
       error.response?.data?.msg || error.message
     );
   }
 }

  const formatQuestionDate = (dateString) => {
    const postedTime = new Date(dateString);
    const timeAgo = formatDistanceToNow(postedTime, { addSuffix: true });
    const formattedDate = format(postedTime, 'MMM d');
    return `${timeAgo} • ${formattedDate}`;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Shared>
      <div className={styles.main_wrapper}>
        <div className={styles.container}>
          <button onClick={() => navigate(-1)} className={styles.backButton}>
            <FaArrowLeft /> Back to Questions
          </button>

          {/* Question Section */}
          <div className={styles.questionSection}>
            <div className={styles.questionCard}>
              {isEditingQuestion ? (
                <div className={styles.editQuestionForm}>
                  <input
                    type="text"
                    value={editedQuestion}
                    onChange={(e) => setEditedQuestion(e.target.value)}
                    className={styles.editInput}
                    placeholder="Edit title"
                  />
                  <textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className={styles.editTextarea}
                    placeholder="Edit description"
                    rows={4}
                  />
                  <button
                    onClick={handleEditQuestion}
                    className={styles.saveButton}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditingQuestion(false)}
                    className={styles.cancelButton}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <div className={styles.questionTag}>
                    <span className={styles.tagIcon}>
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                      >
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
                  <div className={styles.questionContent}>
                    {question?.content}
                  </div>
                  <div className={styles.questionMeta}>
                    {question?.created_at && (
                      <span className={styles.time}>
                        {formatQuestionDate(question.created_at)}
                      </span>
                    )}
                  </div>
                  {user?.userid === question?.userid && (
                    <div className={styles.questionActions}>
                      <button
                        onClick={() => {
                          setEditedQuestion(question.title);
                          setEditedDescription(question.content);
                          setIsEditingQuestion(true);
                        }}
                        className={styles.editButton}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={handleDeleteQuestion}
                        className={styles.deleteButton}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  )}
                </>
              )}
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

                    <div className={styles.answerActions}>
                      <button
                        onClick={() =>
                          handleVoteAnswer(answer.answerid, 'like')
                        }
                        className={`${styles.likeButton} ${
                          answer.likes === 1 ? styles.active : ''
                        }`}
                      >
                        👍 Like {answer.likes}
                      </button>
                      <button
                        onClick={() =>
                          handleVoteAnswer(answer.answerid, 'dislike')
                        }
                        className={`${styles.dislikeButton} ${
                          answer.dislikes === 1 ? styles.active : ''
                        }`}
                      >
                        👎 Dislike {answer.dislikes}
                      </button>
                    </div>

                    {answer.created_at && (
                      <span className={styles.time}>
                        {formatQuestionDate(answer.created_at)}
                      </span>
                    )}
                    {user?.userid === answer?.userid && (
                      <div className={styles.answerActions}>
                        <button
                          onClick={() => handleDeleteAnswer(answer.answerid)}
                          className={styles.deleteButton}
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
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
    </Shared>
  );
};

export default AnswerPage;
