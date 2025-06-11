import React, { useState } from "react";
import styles from "./QuestionForm.module.css";
import { useContext } from "react";
import { AuthContext } from "../../../Context/Context";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axiosBase from "../../../api/axiosConfig";

const QuestionForm = () => {
  const [{ token }, _] = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const posted = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosBase.post(
        "/questions/post-questions",
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTitle("");
      setDescription("");

      posted.current.style.display = "block";
      setTimeout(() => {
        navigate("/");
        posted.current.style.display = "none";
      }, 2000);
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

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
        className={styles.descriptionTextarea}
      />

      <div style={{ display: "none", color: "green" }} ref={posted}>
        question posted successfully
      </div>

      <button type="submit" onClick={handleSubmit}>
        Post Your Question
      </button>
    </form>
  );
};

export default QuestionForm;
