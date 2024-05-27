function myFunction() {
    var x = document.getElementById("myNavMain");
    if (x.className === "nav_menu_right") {
        x.className += " responsive";
    } else {
        x.className = "nav_menu_right";
    }
}