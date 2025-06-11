import React, { useState } from "react";
import styles from "./QuestionForm.module.css";
import API from "../../../api/Api";

const QuestionForm = ({ onPost }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/question/post-questions", { title, description, tag });
      onPost();
      setTitle("");
      setDescription("");
      setTag("");
    } catch (error) {
      alert("Failed to post question.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
        className={styles.descriptionTextarea}
      />
      <input
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Tag"
        required
      />
      <button type="submit">Post Your Question</button>
    </form>
  );
};

export default QuestionForm;
