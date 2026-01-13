

const submitBtn = document.getElementById("submit")

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim()
    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("password").value.trim()
    const phone = document.getElementById("phone").value.trim()
    const gender = document.querySelector("input[name='gender']:checked")

    if(!name || name.length === 0 || 
        !email || email.length === 0 ||
        !password || password.length === 0 ||
        !phone || phone.length === 0 ||
        !gender
    ){
        alert("All field are required!")
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Invalid Email!");
        return;
    }

    const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        alert("Invalid Phone Number!");
        return;
    }
    
    const strongPasswordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(password)){
        alert("Please make strong password!")
        return;
    }

    alert("Data updated Successfully!");
})