import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";

const APIContext = createContext();

function APIContextProvider({ children }) {
  // Initialize state
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch posts
  useEffect(() => {
    let url = "https://api.realworld.io/api/articles?limit=20&offset=0";
    axios
      .get(url)
      .then(function ({ data }) {
        if (data?.articles) setPosts(data?.articles);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <APIContext.Provider value={{ posts, isLoading }} >
      {children}
    </APIContext.Provider>
  );
}

export default APIContextProvider;

// Create a hook to use the APIContext, this is a Kent C. Dodds pattern
export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
