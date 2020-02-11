
var count = 0;



function incrementCount() {
    count++;
    document.getElementsByClassName('count').innerHTML = count;
}

function decrementCount() {
    count--;
    document.getElementsByClassName('count').innerHTML = count;
}

export default addButtonFunc;


