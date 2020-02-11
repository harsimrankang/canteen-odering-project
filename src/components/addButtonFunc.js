
var count;
if (!count) {
    count = 0;
}


function incrementCount() {
    count++;
    document.getElementsByClassName('count').innerHTML = count;
}

function decrementCount() {
    count--;
    document.getElementsByClassName('count').innerHTML = count;
}




