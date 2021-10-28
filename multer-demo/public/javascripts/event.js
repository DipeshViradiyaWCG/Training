$(document).ready(function () {
    let count = 0;

    let flag = false;
    let interval;
    $("#start").on("click", function(){
        window.addEventListener('beforeunload', handleBeforeUnload);
        flag = true;
        interval = setInterval(() => {
            $("#counter").html(count++); 
        }, 1000);
    });

    $("#stop").on("click", function(){
        window.removeEventListener('beforeunload', handleBeforeUnload);
        flag = false;
        clearInterval(interval);
    });

    window.addEventListener("unload", async function () {
        alert("OK")
        $.ajax({
            url: "/display",
            type: "get",
            async: true,
            success: function (res) {
                
            }
        });

    });

    handleBeforeUnload=  function(event){
        event.returnValue = '\o/';
    }

    
    // $(window).on('beforeunload',function(e){
    //     if(!flag){
    //         // (e || window.event).returnValue = "still there?";
    //         // let res = confirm("oyyyy");
    //         // console.log(res);
    //     } else {
    //         e.preventDefault(); 
    //     }
    // });
    
});

