import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJoke } from "./jokeSlice";
import './index.css';

function App() {
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [validCategories, setValidCategories] = useState([]);
  const joke = useSelector(function (state) {
    return state.joke.joke;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://api.chucknorris.io/jokes/categories');
        const data = await response.json();
        setValidCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  function handleChangeCategory(e) {
    setCategory(e.target.value);
    setError("");  // Clear error when user changes the category
  }

  function handleFetch() {
    if (category.trim() === "") {
      setError("Category cannot be empty.");
      return;
    }

    // Check if entered category is valid
    if (!validCategories.includes(category.toLowerCase())) {
      setError("No category found. Please enter a valid category.");
      return;
    }

    setError("");  // Clear error if category is valid
    dispatch(fetchJoke(category));
  }

  const filteredCategories = validCategories.filter(cat =>
    cat.toLowerCase().includes(category.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="heading">Fun Jokes Generator</h1>

      <div className="form-container">
        <input
          type="text"
          placeholder="Enter category"
          onChange={handleChangeCategory}
          value={category}
        />
        <button
          onClick={handleFetch}
          disabled={!category.trim()}  // Disable button if category is empty
        >
          {category ? `Get ${category} Joke` : "Enter Category to Get Joke"}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {category && filteredCategories.length > 0 && (
        <div className="category-container">
          <h3>Available categories:</h3>
          <div className="category-tags">
            {filteredCategories.map((cat, index) => (
              <span key={index} className="category-tag">{cat}</span>
            ))}
          </div>
        </div>
      )}

      <h1>
        {category && joke ? (
          <div className="joke-text">
            {joke}
            <span role="img" aria-label="laughing emoji">😂</span>
          </div>
        ) : category && !joke ? (
          "Loading joke..."
        ) : (
          "Please enter a category to get a joke!"
        )}
      </h1>
    </div>
  );
}

export default App;
