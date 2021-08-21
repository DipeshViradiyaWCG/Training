$().ready(function() {
    $("#commentForm").validate({
        rules:{
            name: {
                required: true,
                minlength: 2,
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
        },
        messages: {
            name: {
              required: "Please enter your name",
              minlength: "Your name must be at least 2 characters long",
            },
            email: "Please enter a valid email address",
            phone: {
              required: "Please enter your phone number",
              minlength: "Your Contact Nummber must be of 10",
              maxlength: "Your Contact Nummber must be of 10",
            },
        },
    }); 
});

