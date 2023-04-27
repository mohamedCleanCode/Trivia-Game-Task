import { useEffect, useState } from "react";
import notify from "./useNotification";

const useApp = () => {
  const URL = "https://opentdb.com/api.php?amount=1";
  const [data, setData] = useState();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [points, setPoints] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer === "") {
      return notify("Please Type Your Answer", "warn");
    }
    if (answer.toLowerCase() === localStorage.getItem("answer").toLowerCase()) {
      notify("Correct Answer", "success");
      setAnswer("");
      setPoints(points + 1);
      setTimeout(() => {
        notify("Next Question", "success");
      }, 1000);
      setTimeout(() => {
        fetchData();
      }, 2000);
    } else {
      notify("Incorrect Answer", "error");
    }
  };

  const onChangeAnswer = (e) => {
    let value = e.target.value.trim();
    setAnswer(value);
  };

  const fetchData = async () => {
    const res = await fetch(URL)
      .then((result) => result.json())
      .catch((err) => err.response);
    setData(res.results);
    return;
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem("answer", data[0]?.correct_answer);
      setQuestion(data[0]?.question);
    }
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []);

  return [handleSubmit, points, question, onChangeAnswer, answer];
};

export default useApp;
