import { useEffect, useState } from "react";
import imageOne from "./assets/image.png";

function App() {
  const URL = "https://opentdb.com/api.php?amount=1";
  const [data, setData] = useState();
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const onChangeAnswer = (e) => {
    let value = e.target.value.trim();
    setAnswer(value);
  }

  const fetchData = async () => {
    const res = await fetch(URL).then((result) => result.json()).catch((err) => err.response);
    setData(res.results);
    return;
  }

  useEffect(() => {
    if(data) {
      localStorage.setItem("answer", data[0]?.correct_answer);
        setQuestion(data[0]?.question);
    }
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div className="App">
      <div className="container">
        <div className="left">
          <img src={imageOne} alt="logo" />
        </div>
        <form className="right" onSubmit={handleSubmit}>
          <div className="question">{question}</div>
          <div className="answer">
            <input
              type="text"
              name="answer"
              placeholder="Type answer here"
              onChange={onChangeAnswer}
              value={answer}
            />
          </div>
          <input className="btn" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default App;
