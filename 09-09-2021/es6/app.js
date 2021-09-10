console.log("hello");

//let and var

let name = "Sara";
const nameconst = "Sara const"
{
    let name = "Sara inner";
    console.log(name);
    console.log(nameconst);
}
console.log(name);

//string literal

let str1 = "String 1";
console.log(`the string is "${str1}" the value of 45 + 35 is ${45+35} `);
console.log("ternary operator : ");
console.log(`${45>35 ? "45 > 35" : "45 < 35"}`);

//tag

function tag(strings, name1, name2) {
    let str0 = strings[0];
    let str1 = strings[1];
    let str2 = strings[2];
    return `str0 : ${str0} str1 : ${str1} str2 : ${str2} name1 : ${name1} name2 : ${name2}`;
}
let name1 = "Dipesh name 1";
let name2 = "Dipesh name 2";
console.log(tag`Hello,${name1},How are you...${name2},Hiiii`);

//default params

function sum(x = 10, y = 20) {
    return x + y;
}
console.log(sum(15,25));
console.log(sum(15));
console.log(sum(undefined,20));

//Aero
let func = (x,y) => x*y;
console.log(func(100,200));

//destructure

const person = {
    name3 : "Dipesh",
    age : "21"
}
let {name3 , age} = person;
console.log(`name : ${name3} age : ${age} `);

//spread

var myarray = ["My","name","is","WCG"];
console.log(myarray);
console.log(...myarray);

//args

let func1 = function(){
    console.log(arguments);
}
func1(4,5,6,7,8,9,10);
