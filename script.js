var modal = document.getElementById("contactModal");
var btn = document.getElementById("hireMeBtn");
var span = document.getElementsByClassName("close")[0];

console.log("Modal:", modal);
console.log("Button:", btn);
console.log("Span:", span);

btn.onclick = function() {
    console.log("Hire Me button clicked");
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
