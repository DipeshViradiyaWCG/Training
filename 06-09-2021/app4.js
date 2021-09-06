var no = process.argv[2];
    var ans;
    if(no == 0){
        ans = "exact zero";
    } else {
        if(no > 0){
            ans = "positive";
        } else {
            ans = "negative";
        }
    }
    console.log("Entered number is "+ans);
