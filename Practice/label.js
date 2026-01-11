
label:for(let i = 0 ; i < 6 ; i++){
    for(let j = 0 ; j <= i ; j++){
        if(i == 3){
            break label;
        }
        console.log(i,j)
    }
}