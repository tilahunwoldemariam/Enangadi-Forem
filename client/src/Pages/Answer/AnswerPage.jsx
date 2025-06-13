// import React, { useEffect, useState } from "react";
// import classes from "./AnswerPage.module.css";
// import axios from "axios";


//   const [answers, setAnswers] = useState([]);
//   const [newAnswer, setNewAnswer] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Fetch answers on mount
//   // useEffect(() => {
//   //   const fetchAnswers = async () => {
//   //     try {
//   //       const res = await axios.get(`/api/answers/${questionId}`);
//   //       setAnswers(res.data.answer);
//   //     } catch (err) {
//   //       setAnswers([]);
//   //     }
//   //   };
//   //   fetchAnswers();
//   // }, [questionId]);

//   // // Handle answer submission
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (!newAnswer.trim()) return;
//   //   setLoading(true);
//   //   try {
//   //     // You may need to add authentication headers here
//   //     await axios.post("/api/answers", {
//   //       answer: newAnswer,
//   //       questionid: questionId,
//   //     });
//   //     setNewAnswer("");
//   //     // Re-fetch answers
//   //     const res = await axios.get(`/api/answers/${questionId}`);
//   //     setAnswers(res.data.answer);
//   //   } catch (err) {
//   //     alert("Failed to post answer.");
//   //   }
//   //   setLoading(false);
//   // };




 import React, { useContext, useEffect, useRef, useState } from "react";
import classes from "./AnswerPage.module.css";
import axiosBase from "../../Api/axiosConfig";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/Context";

const AnswerPage = () => {
  const {questionid} = useParams()
  const [{token}, _] = useContext(AuthContext)
  const [question, setQuestion] = useState({});
  const AnswerDom = useRef(null)
console.log(question)
console.log(questionid)
  useEffect(()=>{
     async function fetchSingleQuestion() {
     const res =await axiosBase.get(`/questions/${questionid}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }

      })
      setQuestion(res.data.question)
     }
     fetchSingleQuestion()
  }, [])
  async function handlePostAnswer(e) {
    e.preventDefault()

const answer = AnswerDom.current.value;
console.log(answer)
 try {
   await axiosBase.post("/answers/postanswer",{answer,questionid:question.questionid},{
        headers:{
          Authorization: `Bearer ${token}`
        }

      })
      alert ("Successfully Submitted")
 } catch(err){
  alert ("Error on submission")
  console.error(err)
 }
 

  }

  return (
    <div className={classes.container}>
      <div className={classes.questionSection}>
        <h2>QUESTION</h2>
        <div className={classes.questionCard}>
          <div className={classes.questionTag}>
            <span className={classes.tagIcon}><svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="14" fill="#4F6CFF"/>
           <path d="M12 9l5 5-5 5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg></span>
            <span className={classes.tagTitle}>{question?.title}</span>
          </div>
          <div className={classes.questionTitle}>{question?.content}</div>
        </div>
      </div>
     <hr style={{ border: "none", borderTop: "2px solid #e0e0e0", margin: "20px 0" }} />
      <h2 className={classes.communityTitle}>Answer From The Community</h2>
     <hr style={{ border: "none", borderTop: "2px solid #e0e0e0", margin: "20px 0" }} />

      <div className={classes.answerSection}>
        <div className={classes.userCard}>
          <div className={classes.userAvatar}>👤</div>
          <div>
            <div className={classes.userAnswer}>programming language</div>
            <div className={classes.userName}>{question.username}</div>
          </div>
        </div>
      </div>

      <form onSubmit={handlePostAnswer}>
        <textarea
          className={classes.answerInput}
          ref={AnswerDom}
          placeholder="Your answer ..."
        ></textarea>
        <button className={classes.postAnswerBtn} type="submit">
          Post Answer
        </button>
      </form>
    </div>
  );
};

export default AnswerPage;
