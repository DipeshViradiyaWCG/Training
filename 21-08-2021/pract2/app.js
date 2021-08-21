$().ready(function () {
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
            age: {
                required: true,
                min: 12,
                max: 60,
            },
            file: {
                required: true,
                accept: "image/*",
            },
            dob: {
                required: true,
                date: true,
            },
            pass: {
                required: true,
                minlength: 6,
                password: true,
            },
            repass: {
                equalTo: "#pass",
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
            age: {
              required: "Please enter your age",
              min: "you are under age (should be > 12)",
              max: "you are over age (should be < 60)",
            },
            file: {
              required: "Please upload an image",
              accept: "Only image file allowed",
            },
            dob: {
                required: "Please enter your date of birth",
                date: "Your date of birth is not in dd-mm-yyyy format",
            },
            password: {
              required: "Please enter a password",
              minlength: "Your password must be at least 6 characters long",
            },
            repass: {
              equalTo: "#please enter password same as above",
            },
            
          },

   }); 
});