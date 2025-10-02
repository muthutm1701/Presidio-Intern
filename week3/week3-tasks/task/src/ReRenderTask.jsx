import React, { useState } from "react";

function Child({ message }) {
  console.log("Child rerendered!");
  return <p>{message}</p>;
}

function Parent() {
  const [text, setText] = useState("Hello");

  return (
    <div>
      <Child message={text} />
      <button onClick={() => setText("Hi")}>HI</button>
    </div>
  );
}

export default Parent;
