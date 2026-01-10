
function* fetchPages(data, pageSize){
    let index = 0;

    while(index < data.length){
        yield data.slice(index, index + pageSize);
        index += pageSize;
    }
}

const data = [1,2,3,4,5,6,7,8,9,10];

const pageData = fetchPages(data, 3);

console.log(pageData);
console.log(pageData.next());
console.log(pageData.next());
console.log(pageData.next());
console.log(pageData.next());

