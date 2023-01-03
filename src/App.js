import React, { useState, useEffect } from "react";
import people from "./data";
import { FaQuoteRight, FaAngleLeft, FaAngleRight } from "react-icons/fa";

function App() {
  const [persons, setPersons] = useState(people);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < 0) {
      setIndex(persons.length - 1);
    }
    if (index === persons.length) {
      setIndex(0);
    }
  }, [index, people]);

  useEffect(() => {
    const slide = setInterval(() => {
      setIndex(index + 1);
    }, 2000);
    return () => clearInterval(slide);
  }, [index]);

  return (
    <div className="App">
      <main className="container">
        <header>
          <h1>
            <span>/</span>Reviews
          </h1>
        </header>
        <section className="reviews-section">
          {persons.map((person, personIndex) => {
            const { id, image, name, quote, title } = person;
            let position = "nextSlide";
            if (personIndex === index) {
              position = "activeSlide";
            }
            if (
              personIndex === index - 1 ||
              (index === 0 && personIndex === persons.length - 1)
            ) {
              position = "lastSlide";
            }
            return (
              <article key={id} className={position}>
                <img src={image} alt="" />
                <h4>{name}</h4>
                <p>{title}</p>
                <p className="quote">{quote}</p>
                <FaQuoteRight className="quote-icon" />
              </article>
            );
          })}
          <button onClick={() => setIndex(index - 1)}>
            <FaAngleLeft />
          </button>
          <button onClick={() => setIndex(index + 1)}>
            <FaAngleRight />
          </button>
        </section>
      </main>
    </div>
  );
}

export default App;
