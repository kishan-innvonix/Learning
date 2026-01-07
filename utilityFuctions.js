const formatDuration = (milisecond) => {
    let seconds = Math.floor((milisecond / 1000) % 60).toString().padStart(2,"0");
    let minites = Math.floor(milisecond / (1000 * 60) % 60).toString().padStart(2,"0");
    let hours = Math.floor(milisecond / (1000 * 60 * 60) % 24).toString().padStart(2,"0");
    let days = Math.floor(milisecond / (1000 * 60 * 60 * 24)).toString().padStart(2,"0")    
    return `${days}:${hours}:${minites}:${seconds}`
}

// format time dd:hh:mm:ss from milisecond
let formatedTime = formatDuration(1767761502000)
console.log(formatedTime)