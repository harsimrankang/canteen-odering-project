var count;
if (!count) {
  count = 0;
}

function incrementCount(key) {
  count++;
  document.getElementById(key).value = count;
}

function decrementCount(key) {
  count--;
  document.getElementById(key).value = count;
}

export { incrementCount, decrementCount };
