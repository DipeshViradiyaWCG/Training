//var flag = false;
/*
function validate() {
    var inputname = document.getElementById("name").value.toString();
    if (inputname.length == 0 || inputname.length > 25) {
        document.getElementById("sname").innerHTML = "Enter valid length name please...";  
    //    flag = true;  
    } else {
        document.getElementById("sname").innerHTML = "";
    }

    var inputemail = document.getElementById("email").value.toString();
    if((!validateEmail(inputemail)) || inputemail.length == 0 || inputemail == null){
        document.getElementById("semail").innerHTML = "Enter valid email...";
    //    flag = true;
    } else {
        document.getElementById("semail").innerHTML = "";
    }  

    var inputphone = document.getElementsByName("phone")[0].value.toString();
    if(inputphone.length != 10 || inputphone == null){
        document.getElementById("sphone").innerHTML = "Enter valid phone number with 10 digits...";
    //    flag = true;
    } else {
        document.getElementById("sphone").innerHTML = "";
    }
    
    var inputpass = document.getElementById("pass").value.toString();
    var inputrepass = document.getElementById("repass").value.toString();
    if(inputpass !== inputrepass){
        document.getElementById("srepass").innerHTML = "Enter the valid password...";
    //    flag = true;
    } else {
        document.getElementById("semail").innerHTML = "";
    } 

    //return flag;
}
*/

function validatename() {
    var inputname = document.getElementById("name").value.toString();
    if (inputname.length == 0 || inputname.length > 25) {
        document.getElementById("sname").innerHTML = "Enter valid length name please...";  
        document.getElementById("name").focus();
    //    flag = true;  
    } else {
        document.getElementById("sname").innerHTML = "";
    }
}

function validateemail() {
    var inputemail = document.getElementById("email").value.toString();
    if((!validateEmail(inputemail)) || inputemail.length == 0 || inputemail == null){
        document.getElementById("semail").innerHTML = "Enter valid email...";
    //    flag = true;
        document.getElementById("email").focus();
    } else {
        document.getElementById("semail").innerHTML = "";
    }  
}

function validatephone() {
    var inputphone = document.getElementsByName("phone")[0].value.toString();
    if(inputphone.length != 10 || inputphone == null){
        document.getElementById("sphone").innerHTML = "Enter valid phone number with 10 digits...";
        document.getElementsByName("phone")[0].focus();
        //    flag = true;
    } else {
        document.getElementById("sphone").innerHTML = "";
    }
}

function validatepass() {
    var inputpass = document.getElementById("pass").value.toString();
    if(inputpass.length < 6){
        document.getElementById("spass").innerHTML = "Enter the valid password (Minimum length 6)...";
        document.getElementById("pass").focus();
    }
    
}

function validaterepass() {
    var inputpass = document.getElementById("pass").value.toString();
    var inputrepass = document.getElementById("repass").value.toString();
    if(inputpass !== inputrepass){
        document.getElementById("srepass").innerHTML = "Enter the valid password (As above)...";
        document.getElementById("repass").focus();
    //    flag = true;
    } else {
        document.getElementById("semail").innerHTML = "";
    } 
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

