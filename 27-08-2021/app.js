$().ready(function () {
    $.validator.setDefaults({ ignore: ":hidden:not(select)" });
    
    jQuery.validator.addMethod("noDigit", function (value, element) {
        var re = /^[A-Za-z]+$/;
        if(re.test(value))
            return true;
        else
            return false; 
    });

    $("#commentForm").validate({
        ignore: "input:hidden:not(input:hidden.required)",
        
        rules:{
            name: {
                required: true,
                minlength: 3,
                maxlength: 10,
                noDigit: true,
            },
            email: {
                required: true,
                email: true,
            },
            phone: {
                required: true,
                digits: true,
                minlength: 10,
                maxlength: 10,
            }, 
            city : {
                required: true,
            },
            datepicker : {
                required: true,
            },
            timepicker : {
                required: true,
            },
            address : {
                required: true,
            },
            ckeditorlite : {
                required: true,
            },
            hobby : {
                required: true,
            }
        },
        
        
        messages: {
            name: {
                required: "Please enter your name",
                minlength: "Your name must be at least 3 characters long",
                maxlength: "Your name can not exceed 10 characters",
                noDigit: "Your name should not contain any digits",
            },
            email: "Please enter a valid email address",
            phone: {
                required: "Please enter your phone number",
                minlength: "Your Contact Nummber must be of 10",
                maxlength: "Your Contact Nummber must be of 10",
            },
            city: {
                required: "Please choose city..."
            },
            datepicker : {
                required: "The date is required...",
            },
            timepicker : {
                required: "The time is required...",
            },
            address : {
                required: "Please provide the address...",
            },
            ckeditorlite : {
                required: "About me brief is required...",
            },
            hobby : {
                required: "You chould choose atleast one hobby...",
            }
        },
    }); 
    
    
    $(".chosen-select").chosen({
        width : "267px",
        search_contains : "true",
    });
    
    $( "#datepicker" ).datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '1950:2021',
        dateFormat: 'dd/mm/yy', 
    });
    
    $('#timepicker').timepicker(
        
    );

    ClassicEditor.create(document.querySelector("#ckeditorlite"));
        
    var editor = CKEDITOR.replace("ck");

    editor.on( 'required', function( evt ) {
        $(".introerr").text("Please provide your introduction, it is required");
        evt.cancel();
    });

    // var editorlite = CKEDITOR.replace("ckeditorlite");

    // editorlite.on( 'required', function( evt ) {
    //     $(".abouterr").text("Please provide your introduction, it is required");
    //     evt.cancel();
    // });
    
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'fadeDuration': 2000,
        'maxWidth' : 1000,
    }) 

    $('#myTable').DataTable({
        dom: "Bfrtip",
        buttons: ["copy", "csv", "excel", "pdf", "print"],
    });
        
});



function countChars(element) {
    var len = element.value.length;
    
    if (len >= 160) {
        element.value = element.value.substring(0,160);
        $(".textareachars").html("<span style=\"color : red;\">Address can not exceed 160 charcters...</span>");
    } else {
        $(".textareachars").text("Remaining charcters in your address : " + len + "/" + (160 - len));
    }
}