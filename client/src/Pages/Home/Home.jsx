import { useContext, useEffect } from 'react';
import styles from './Home.module.css';
import { AuthContext } from '../../Context/Context';
import axiosInstance from '../../Api/axiosConfig';
import { useState } from 'react';
import { format, formatDistanceToNow } from "date-fns";
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [
    {
      user: { firstname },
      token,
    },
    _,
  ] = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  // At the top of your Home component
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const res = await axiosInstance.get(
        `/questions/search?q=${encodeURIComponent(searchQuery)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSearchResults(res.data.questions);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const userFirstName =
    firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase();

  useEffect(() => {
    async function fetchQuestions() {
      const res = await axiosInstance.get('/questions/all-questions', {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      });
      console.log(res);
      setQuestions(res.data.questions);
    }
    fetchQuestions();
  }, [questions, token]);

  return (
    <main className={styles.container}>
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

          <Link to="/ask">
            <button className={styles.askButton}>
              <span className={styles.plusIcon}>+</span> Ask a Question
            </button>
          </Link>
        </div>
      </section>

      {/* Search bar */}
      <section className={styles.searchSection}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              className={styles.searchInput}
            />
            <button
              type="submit"
              className={styles.searchButton}
              disabled={isSearching}
            >
              {isSearching ? (
                <span className={styles.searchSpinner}></span>
              ) : (
                <svg className={styles.searchIcon} viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              )}
            </button>
          </div>
        </form>
      </section>

      <div className={styles.floatingActions}>
        <button className={styles.mainAction} onClick={() => navigate('/ask')}>
          <span>+</span>
        </button>

        <div className={styles.secondaryActions}>
          <button onClick={() => navigate('/search')}>🔍</button>
          <button onClick={() => window.scrollTo(0, 0)}>↑</button>
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
          {(isSearching ? [] : searchQuery ? searchResults : questions)?.map(
            (question) => {
              const postedTime = new Date(question.created_at);
              const timeAgo = formatDistanceToNow(postedTime, {
                addSuffix: true,
              });

              const formattedDate = format(postedTime, 'MMM d'); // "Jun 11"

              const fullText = `${timeAgo} • ${formattedDate}`;

              return (
                <article key={question.id} className={styles.questionCard}>
                  <div className={styles.userColumn}>
                    <div className={styles.avatar}>
                      {question.firstname.charAt(0).toUpperCase()}
                    </div>
                    <span className={styles.username}>{question.username}</span>
                  </div>

                  <div className={styles.contentColumn}>
                    <h3 className={styles.questionTitle}>{question.title}</h3>
                    <div className={styles.questionMeta}>
                      <span className={styles.time}>{fullText}</span>
                    </div>
                  </div>
                </article>
              );
            }
          )}
          {searchQuery && searchResults.length === 0 && !isSearching && (
            <div className={styles.noResults}>
              <p>No questions found for "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className={styles.clearSearch}
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;