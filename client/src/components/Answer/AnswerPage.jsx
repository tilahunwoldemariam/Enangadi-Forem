import React, { useEffect, useState } from "react";
import classes from "./Answer.module.css";
import axios from "axios";

const Answer = ({ questionId, questionBody, tag }) => {
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch answers on mount
  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const res = await axios.get(`/api/answers/${questionId}`);
        setAnswers(res.data.answer);
      } catch (err) {
        setAnswers([]);
      }
    };
    fetchAnswers();
  }, [questionId]);

  // Handle answer submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;
    setLoading(true);
    try {
      // You may need to add authentication headers here
      await axios.post("/api/answers", {
        answer: newAnswer,
        questionid: questionId,
      });
      setNewAnswer("");
      // Re-fetch answers
      const res = await axios.get(`/api/answers/${questionId}`);
      setAnswers(res.data.answer);
    } catch (err) {
      alert("Failed to post answer.");
    }
    setLoading(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.questionSection}>
        <h2>QUESTION</h2>
        <div className={classes.questionCard}>
          <div className={classes.questionTag}>
            <span className={classes.tagIcon}>⮞</span>
            <span className={classes.tagTitle}>{tag}</span>
          </div>
          <div className={classes.questionTitle}>{questionBody}</div>
        </div>
      </div>
      <h2 className={classes.communityTitle}>Answer From The Community</h2>
      <div className={classes.answerSection}>
        {answers.length === 0 && <div>No answers yet.</div>}
        {answers.map((ans) => (
          <div key={ans.answer_id} className={classes.userCard}>
            <div className={classes.userAvatar}>👤</div>
            <div>
              <div className={classes.userAnswer}>{ans.content}</div>
              <div className={classes.userName}>{ans.user_name}</div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          className={classes.answerInput}
          placeholder="Your answer ..."
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          required
        />
        <button className={classes.postAnswerBtn} type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post Answer"}
        </button>
      </form>
    </div>
  );
};

export default Answer;


//  import React from "react";
// import classes from "./AnswerPage.module.css";
// <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@700&family=Fira+Mono:wght@400;700&display=swap" rel="stylesheet"></link>
// const AnswerPage = () => {
//   return (
//     <div className={classes.container}>
//       <div className={classes.questionSection}>
//         <h2>QUESTION</h2>
//         <div className={classes.questionCard}>
//           <div className={classes.questionTag}>
//             <span className={classes.tagIcon}><svg width="28" height="28" viewBox="0 0 28 28" fill="none">
//             <circle cx="14" cy="14" r="14" fill="#4F6CFF"/>
//            <path d="M12 9l5 5-5 5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg></span>
//             <span className={classes.tagTitle}>Javascript</span>
//           </div>
//           <div className={classes.questionTitle}>what is javascript</div>
//         </div>
//       </div>
//      <hr style={{ border: "none", borderTop: "2px solid #e0e0e0", margin: "20px 0" }} />
//       <h2 className={classes.communityTitle}>Answer From The Community</h2>
//      <hr style={{ border: "none", borderTop: "2px solid #e0e0e0", margin: "20px 0" }} />

//       <div className={classes.answerSection}>
//         <div className={classes.userCard}>
//           <div className={classes.userAvatar}>👤</div>
//           <div>
//             <div className={classes.userAnswer}>programming language</div>
//             <div className={classes.userName}>Jems j.</div>
//           </div>
//         </div>
//       </div>

//       <form>
//         <textarea
//           className={classes.answerInput}
//           placeholder="Your answer ..."
//         ></textarea>
//         <button className={classes.postAnswerBtn} type="submit">
//           Post Answer
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AnswerPage;
