import React from "react";
import Button from "./Button";

function App() {
  const [jokes, setJokes] = React.useState(null);
  const [answers, setAnswers] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch("https://v2.jokeapi.dev/joke/Programming");
      if (!response.ok) {
        throw new Error("API Response Error");
      }
      const datas = await response.json();
      setJokes(datas);
      setAnswers(null);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching the joke:", error);
      setLoading(false);
    }
  }

  function learnAnswer() {
    if (jokes && jokes.type === "twopart") {
      setAnswers(jokes.delivery);
    } else {
      setAnswers(null);
    }
  }

  function changeJoke() {
    setJokes(null);
    setAnswers(null);
    setLoading(true);
    fetchData();
  }

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!jokes) {
    return <p>No joke available.</p>;
  }

  return (
    <div className="joke">
      <h1>JOKE GENERATOR</h1>
      <p>{jokes.setup}</p>
      <button className="button-answer" onClick={learnAnswer}>
        Click answer
      </button>
      {answers && <p>{answers}</p>}
      <Button changeJoke={changeJoke} />
    </div>
  );
}

export default App;
