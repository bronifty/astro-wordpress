import React, { useState, useEffect } from "react";

const SearchComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/slugs.json");
        const jsonData = await response.json();
        setData(jsonData);
        console.log("Data fetched:", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data]);

  return (
    <div>
      <h1>Search Component</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <p>Title: {item.title}</p>
            <p>Slug: {item.slug}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
