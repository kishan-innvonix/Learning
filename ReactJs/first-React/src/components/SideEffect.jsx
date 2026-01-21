import React, { useEffect, useState } from "react";

const SideEffect = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((pre) => pre + 1);
    }, 1000);
    return () => clearInterval(id )
  }, []);

  return (
    <>
      <div>{count}</div>
    </>
  );
};

export default SideEffect;
