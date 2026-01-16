
let repeat = true;

let username = prompt("Enter your name!!!")?.trim()

if(!username) {
    repeat = false;
}

let user = localStorage.getItem(username)

while(!user && repeat){
    let age = Number(prompt("How old are you?"))
    if(isNaN(age)) {
        alert("Invalid Age (Expected only numbers)")
        continue;
    }
    
    let math = Number(prompt("What is your Math marks?"));
    if(isNaN(math)) {
        alert("Invalid Marks (Expected only numbers)")
        continue ;
    }

    let science = Number(prompt("What is your Science marks?"));
    if(isNaN(science)) {
        alert("Invalid Marks (Expected only numbers)")
        continue;
    }

    let english = Number(prompt("What is your English marks?"));
    if(isNaN(english)) {
        alert("Invalid Marks (Expected only numbers)")
        continue;
    }

    const userData = {
        username,
        age,
        math,
        science,
        english
    }
 
    localStorage.setItem(username, JSON.stringify(userData))
    user = localStorage.getItem(username)
}

user = JSON.parse(user)

while(repeat){
    const menuSelection = prompt(`What do you like to do today 
         1.Check for result.
         2.Check for aligibility.
         3.Check for Scholership aligibility. 
         4.Exit`
        )?.trim()

    if(!menuSelection) {
        break;
    }

    switch(menuSelection){
        case "1":
            user?.percentage ? showResult(user) : calculateAverageScore(user);
            break;
        case "2":
            isEligibleForCourse(user.percentage);
            break;
        case "3":
            isEligibleForScholarship(user);
            break;
        case "4":
            repeat = false;
            break;
        default:
            alert("Invalid Option")
            break;
    }
}

function calculateAverageScore({math, science, english}) {
    const percentage = ((math + english + science) / 3).toFixed(2) ;
    user.percentage = Number(percentage);
    localStorage.setItem(username, JSON.stringify(user))
    showResult(user.percentage)
}

function showResult(user) {
    const { math, science, english, percentage } = user;
    
    if (math < 35 || science < 35 || english < 35) {
        alert("Fail (One or more subjects failed)");
        return;
    }
   
    let result;
    if (percentage >= 95) {
        result = "A+";
    } else if (percentage >= 85) {
        result = "A";
    } else if (percentage >= 65) {
        result = "B";
    } else if (percentage >= 55) {
        result = "C";
    } else {
        result = "D";
    }

    alert(`${percentage}% - Grade: ${result}`);
}


function isEligibleForCourse(percentage) {
    const message = percentage >= 80 ? "Your fit for Science!" : 
        percentage >= 70 ? "Your fit for Commerce!" : 
        "Your fit for Arts!"
    alert(message)
}

function isEligibleForScholarship(percentage) {
    let category = prompt(`Which category you belong to?
        1. First.
        2. Second 
        3. Third`)?.trim();
    
    if(category === '1'){
        alert("100% Scholarship!");
    }
    else if(category === '2'){
        let anulaIncome = Number(prompt("What is your anual income?"))
        if(!anulaIncome){
            alert("Invalid Input!");
            return;
        }
        let message = anulaIncome < 200000 ? "50% Scholarship" : "0% Scholarship";
        alert(message);
    }
    else if(category === '3'){
        let message = percentage >= 85 ? "20% Scholarship" : "0% Scholarship";
        alert(message);
    }
    else {
        alert("Invalid Input!")
    }
}