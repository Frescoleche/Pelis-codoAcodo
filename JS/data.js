posicionarMenu();
 
$(window).scroll(function() {    
    posicionarMenu();
});
 
function posicionarMenu() {
    var altura_del_nav_top = $('.nav_top').outerHeight(true);
    var altura_del_nav_main = $('.nav_main').outerHeight(true);
 
    if ($(window).scrollTop() >= altura_del_nav_top){
        $('.nav_main').addClass('fixed');
        $('body').css('margin-top', (altura_del_nav_main) + 'px');
    } else {
        $('.nav_main').removeClass('fixed');
        $('body').css('margin-top', '0');
    }
}


function myFunction() {
    var x = document.getElementById("myNavMain");
    if (x.className === "nav_menu_right") {
        x.className += " responsive";
    } else {
        x.className = "nav_menu_right";
    }
}




