import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useRef } from "react";
import Home from "./components/Home";
import SideEffect from "./components/SideEffect";
import { UserContext } from "./context/userContext";
const Form = lazy(() => import("./components/Form"));

const App = () => {

  const user = useContext(UserContext)
  const count = useRef(0)

  useEffect(()=>{
    console.log(count)
    count.current = count.current + 1;
  })

  return (
    <>
      <h1>{count.current}</h1>
      <input type="text" />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<Home/>} >
            <Route path="/temp1" element={<h1>Temp1</h1>}/>
            <Route path="/temp2" element={<h1>Temp2 {user}</h1>}/>
          </Route>
          <Route path="/form" element={<Form />} />
          <Route path="/effect" element={<SideEffect />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
