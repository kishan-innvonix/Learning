import React, { useState } from "react";
import styles from "./form.module.css";
import Modal from "./Modal";

const Form = () => {
  const [isOpen, setIsOpen] = useState(false);

  const fn = (hi) => {
    alert(hi);
  };

  const arr = [1, 2, 3, 4, 5, 6, 7, 8];

  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    education: [],
    // or
    // ssc: false,
    // hsc: false,
    branch: "",
    about: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(form));
    console.log(form);
  };

  const handleData = (e) => {
    console.log(e.target.value);
    setform({
      ...form,
      [e.target.name]: e.target.value,
    }); /*<-- note the [] around key in object */
  };

  const handleCheck = (e) => {
    const value = e.target.value;

    setform({
      ...form,
      education: form.education.includes(value)
        ? form.education.filter((ele) => ele != value)
        : [...form.education, value],
    });
  };

  return (
/*  
  // <button onClick={() => fn("hi")}>click me</button>
  // <ul>
  //     {arr.map((ele, index) => (
  //         <li key={index}>{ele}</li>
  //     ))}
  // </ul>
*/
    <>
      <button
        style={{ margin: "auto", display: "block", marginTop: "25%" }}
        onClick={() => setIsOpen(true)}
      >
        Open
      </button>
      <Modal
        style={{ color: "red" }}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="name"
            value={form.name}
            onChange={handleData}
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            value={form.email}
            onChange={handleData}
          />
          <input
            type="password"
            name="password"
            placeholder="Pass"
            value={form.password}
            onChange={handleData}
          />

          <textarea
            name="about"
            rows={3}
            value={form.about}
            onChange={handleData}
          />

          {/* Radio */}
          <div className={styles.radiogroup}>
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              onChange={handleData}
            />
            <label htmlFor="female">Female</label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              onChange={handleData}
            />
          </div>

          {/* check box */}
          <div className={styles.checkBoxGroup}>
            <label htmlFor="ssc">SSC</label>
            <input
              type="checkbox"
              name="education"
              id="ssc"
              value="ssc"
              checked={form.education.includes("ssc")}
              onChange={(e) => handleCheck(e)}
            />
            <label htmlFor="hsc">HSC</label>
            <input
              type="checkbox"
              name="education"
              id="hsc"
              value="hsc"
              checked={form.education.includes("hsc")}
              onChange={(e) => handleCheck(e)}
            />
          </div>

          {/* Select */}
          <select name="branch" value={form.branch} onChange={handleData}>
            <option value="">Select</option>
            <option value="IT">IT</option>
            <option value="CSE">CSE</option>
          </select>

          <button type="submit">Submit</button>
        </form>
      </Modal>
    </>
  );
};

export default Form;
