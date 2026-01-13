const user = {
    name: "Kishan",
    email: "kishan@gmail.com",
}

// Validator function 
const validateUser = (user) => {
    if(user){
        if(user.email && user.email === "admin@gmail.com"){
            console.log("Access granted")
        }
        else{
            console.log("Only admin can access!!!")
        }
    }
    else{
        console.log("You need to login first!!!")
    }
}


// Note: used nested to show customised messages