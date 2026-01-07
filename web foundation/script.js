
const user = {
    name: "User",
    skills: ["HTML", "CSS", "JS"],
    about: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam optio iste fugiat sint necessitatibus sit quae quam fuga adipisci neque facere nemo commodi, at eum. Quasi iste quam laudantium laborum?"
}

window.addEventListener("load", () => {
    const name = document.getElementById("name")
    const title = document.getElementById("title")
    const about = document.getElementById("about")
    const skillContainer = document.getElementById("skillContainer")

    name.innerText = user.name;
    title.innerText = user.name;
    about.innerText = user.about;


    for(let i = 0 ; i < user.skills.length ; i++){
        const li = document.createElement("li")
        li.innerText = user.skills[i]
        li.setAttribute("class", "skillItem")
        skillContainer.appendChild(li)
    }

    skillContainer.appendChild(ul)
})