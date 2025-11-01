$(document).ready(function() {
    $("nav a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800);
        }
    });
    $(".project-card").hover(
        function() {
            $(this).css("transform", "scale(1.05)").css("box-shadow", "0 4px 20px rgba(0,0,0,0.3)");
        },
        function() {
            $(this).css("transform", "scale(1)").css("box-shadow", "none");
        }
    );
    $(window).scroll(function(){
        if($(this).scrollTop() > 200) {
            $("#backToTop").fadeIn();
        }else {
            $("#backToTop").fadeOut();
        }
    });
    $("#backTop").click(function(){
        $("html, body").animate({scrollTop: 0}, 600);
        return false;
    });
    
});