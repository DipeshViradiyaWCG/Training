var no = process.argv[2];
    var ans = 0;
    for (let index = 1; index <= no; index++) {
        ans = ans + index;
    } 
    console.log("Answer is "+ans);