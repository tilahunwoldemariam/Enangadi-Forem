import { useContext, useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';
import { AuthContext } from '../../Context/Context';
import axiosInstance from '../../Api/axiosConfig';
import { format, formatDistanceToNow } from "date-fns";
import { Link, useNavigate } from 'react-router-dom';
import { useQuestions } from '../../Context/QuestionContext';
import { FaQuestion } from 'react-icons/fa6';
import { IoMdArrowRoundUp } from 'react-icons/io';
import { ClipLoader } from 'react-spinners';

const Home = () => {
  const [
    {
      user: { firstname },
      token,
    },
    _,
  ] = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const { questions, allQuestions, setQuestions, searchQuery, setSearchQuery } =
    useQuestions();
  
  const navigate = useNavigate();
  const searchDom = useRef(null);

  const userFirstName =
    firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase();

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get('/questions/all-questions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuestions(res.data.questions);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [token, setQuestions]);

  const formatQuestionDate = (dateString) => {
    const postedTime = new Date(dateString);
    const timeAgo = formatDistanceToNow(postedTime, { addSuffix: true });
    const formattedDate = format(postedTime, 'MMM d');
    return `${timeAgo} • ${formattedDate}`;
  };

  return (
    <main className={styles.container}>
      {/* Welcome Section */}
      <section className={styles.welcomeSection}>
        <div className={styles.welcomeContent}>
          <h1>
            Welcome back,{' '}
            <span className={styles.userName}>{userFirstName}</span>!
          </h1>
          <p className={styles.subtitle}>
            Ready to dive into today's coding challenges? Ask questions, share
            knowledge, and learn together!
          </p>
          <Link to="/ask" className={styles.askButton}>
            <span className={styles.plusIcon}>+</span> Ask a Question
          </Link>
        </div>
        <div className={styles.knowledgeBubbles}>
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className={styles.bubble}>
              <FaQuestion size={40} className={styles.questionIcon} />
            </div>
          ))}
        </div>
      </section>

      {/* Search Bar */}
      <section className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            ref={searchDom}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions by title..."
            className={styles.searchInput}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className={styles.clearButton}
            >
              ×
            </button>
          )}
        </div>
        {searchQuery && (
          <p className={styles.searchResults}>
            Found {questions.length} of {allQuestions.length} questions
          </p>
        )}
      </section>

      <div className={styles.floatingActions}>
        <button className={styles.mainAction} onClick={() => navigate('/ask')}>
          <span>+</span>
        </button>

        <div className={styles.secondaryActions}>
          <button onClick={() => searchDom.current.focus()}>🔍</button>
          <button onClick={() => window.scrollTo(0, 0)}>
            <IoMdArrowRoundUp size={30} />
          </button>
        </div>
      </div>

      <section className={styles.questionsSection}>
        <div className={styles.sectionHeader}>
          <h2>Latest Questions</h2>
          <p className={styles.helpText}>
            Help your fellow bootcamp students by answering their questions!
          </p>
        </div>

        <div className={styles.questionsList}>
          {isLoading ? (
            <ClipLoader />
          ) : (
            questions?.map((question) => {
              return (
                <Link
                  to={`/questionDetail/${question.question_id}`}
                  key={question.id}
                  className={styles.questionCard}
                >
                  <div className={styles.userColumn}>
                    <div className={styles.avatar}>
                      {question.firstname.charAt(0).toUpperCase()}
                    </div>
                    <span className={styles.username}>{question.username}</span>
                  </div>

                  <div className={styles.contentColumn}>
                    <h3 className={styles.questionTitle}>{question.title}</h3>
                    <div className={styles.questionMeta}>
                      <span className={styles.time}>
                        {formatQuestionDate(question.created_at)}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;