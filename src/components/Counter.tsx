import React from "react";
import { counter, increment } from "../store/counter";
import { useStore } from "@nanostores/react";

const Counter = () => {
  // const [count, setCount] = React.useState(0);
  const count = useStore(counter);
  return (
    <>
      <h1>Counter: {count}</h1>
      <button id="increment" onClick={() => increment(count)}>
        Increment
      </button>
      {/* <button id="increment" onClick={() => setCount(count + 1)}>
        {count}
      </button> */}
    </>
  );
};

export default Counter;
