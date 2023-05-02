import React from "react";
import { counter } from "../store/counter";
import { useStore } from "@nanostores/react";

const ShowCounter = () => {
  // const [count, setCount] = React.useState(0);
  const count = useStore(counter);
  return (
    <>
      <h1>Show Count: {count}</h1>
    </>
  );
};

export default ShowCounter;
