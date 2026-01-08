
const user = {
  name: "Dhaval",
  skills: [
    "HTML5",
    "CSS3",
    "JavaScript",
    "DOM",
    "Git & GitHub",
    "Basic Node.js"
  ],
  about: "I am a passionate Software Trainee with a strong foundation in web technologies. I enjoy building clean, user-friendly interfaces and learning modern JavaScript concepts like ES6, DOM manipulation, and asynchronous programming. I am eager to grow my skills and contribute to real-world projects."
};

window.addEventListener("load", () => {
    const name = document.getElementById("name")
    const title = document.getElementById("title")
    const about = document.getElementById("about")
    const skillContainer = document.getElementById("skillContainer")
    const menuIcon = document.getElementsByClassName("menuIcon")

    name.innerText = user.name;
    title.innerText = user.name;
    about.innerText = user.about;


    for(let i = 0 ; i < user.skills.length ; i++){
        const li = document.createElement("li")
        li.innerText = user.skills[i]
        li.setAttribute("class", "skillItem")
        skillContainer.appendChild(li)
    }

    
})