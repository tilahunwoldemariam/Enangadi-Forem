import React, { useState } from "react";
import styles from "./QuestionForm.module.css";
import API from "../../../api/axiosConfig";
import { useContext } from "react";
import { AuthContext } from "../../../Context/Context";
import axios from "axios";

const QuestionForm = ({ onPost }) => {
  const [ {token}, _] = useContext(AuthContext)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

console.log(token)
  const handleSubmit = async (e) => {
    e.preventDefault();
  

    try {
      await axios.post("http://localhost:8000/api/questions/post-questions", { title, description, tag },{
        headers:{Authorization:`Bearer ${token}`}
      });
      setTitle("")
      setDescription("")
      setTag("")

      alert("question posted")
      console.log("question posted sucessfully")
     
    } catch (error) {
      alert("Failed to post question.");
    }
  };

  return (
    <form className={styles.form}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Tag"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
        className={styles.descriptionTextarea}
      />

      <button type="submit" onClick={handleSubmit}>
        Post Your Question
      </button>
    </form>
  );
};

export default QuestionForm;
