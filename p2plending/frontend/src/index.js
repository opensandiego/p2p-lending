


var c = 1000;
function books() {
    var b = ['📖','📕','📙','📗','📘','📀']
    if(c <= 0){ return; }else{ c--; }
    const element = document.createElement('div');
    element.innerHTML = b[Math.floor(Math.random() * b.length)];
    element.style.position = "absolute";
    element.style.fontSize = (Math.random() * 32 + 33).toFixed(0) + "pt";
    element.style.top = Math.random() * window.innerHeight + "px";
    element.style.left = Math.random() * window.innerWidth + "px";
    document.body.appendChild(element);
    setTimeout(books,20);
}

books();
