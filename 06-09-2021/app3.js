var year = 2050;
    var ans;
    if((year%4 == 0 && year%100 != 0) || year%400 == 0){
        ans = "leap year";
    } else {
        ans = "not a leap year";
    }
    console.log("Entered year is "+ans);