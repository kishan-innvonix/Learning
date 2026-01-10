new Promise(function(resolve, reject){
    let error = false;
    setTimeout(()=>{
        if(error){
            reject("Error msj")
        }
        else{
            resolve({
                name: "xyz",
                email: "ex@"
            });
        }
    },2000)
})
    .then((data) => {
        console.log("Promise resolved");    
        return data.name;
    })
    .then((username) => {
        console.log("User: " + username)
    }).catch((err) => {
        console.error("Error: " + err);
    })