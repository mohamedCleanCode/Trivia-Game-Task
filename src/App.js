import { ToastContainer } from "react-toastify";
import imageOne from "./assets/image.png";
import useApp from "./hook/useApp";

function App() {
  const [handleSubmit, points, question, onChangeAnswer, answer] = useApp();

  return (
    <div className="App">
      <div className="container">
        <div className="left">
          <img src={imageOne} alt="logo" />
        </div>
        <form className="right" onSubmit={handleSubmit}>
          <div>
            Your Points : <span className="points">{points}</span>
          </div>
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
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
