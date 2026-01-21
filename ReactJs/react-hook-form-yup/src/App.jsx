
import { Route, Routes } from 'react-router-dom'
import Register from './components/auth/Register'
import Home from './components/Home'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
  )
}

export default App





















// import React from "react";
// import { useForm } from "react-hook-form";

// const App = () => {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const submitHandler = (data) => {
//     console.log(data);
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit(submitHandler)}>
//         <input type="text" {...register("name")} />
//         <input type="email" {...register("email", {required: true})} />
//         <input type="password" {...register("password")} />
        
//         <select name="gender" {...register("gender")}>
//           <option value="male">male</option>
//           <option value="female">female</option>
//           <option value="other">other</option>
//         </select>
//         {/* errors will return when field validation fails  */}
//         {errors.email && <span>This field is required</span>}

//         <input type="submit" />
//       </form>
//     </>
//   );
// };

// export default App;



