$( document ).ready(function() {
    
    $("#namebtn-click").on( "click", function(){
        var username = $(".input-content").find('.username').val();
        if(username == "komalix01@outlook.com") {
            $(".first-page").find(".first-card").hide();
            $(".first-page").find(".second-card").show();
        } else {
            $(".card-content").find('.error-name').show();
        }
    } );

    $("#pwdbtn-click").on( "click", function(){
        var password = $(".input-content").find('#password').val();
        if(password == "admin-alix123.") {
            window.location.href = './pasera/index.php';
        } else {
            $(".card-content").find('.error-password').show();
        }
    } );
    
});