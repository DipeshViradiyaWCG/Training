let arr1 = [1,2,3,4,5];
// [ 1, 2, 3, 4, 5 ]

console.log(arr1);
console.log("indexOf 2", arr1.indexOf(2));
// indexOf 2 1

console.log("includes 5", arr1.includes(5));
// includes 5 true

console.log("map on array => returns new array", arr1.map(x => x*2), arr1);
//map on array => returns new array [ 2, 4, 6, 8, 10 ] [ 1, 2, 3, 4, 5 ]

console.log("map on array => returns new array", arr1.map(x => x**2), arr1);
//map on array => returns new array [ 1, 4, 9, 16, 25 ] [ 1, 2, 3, 4, 5 ]

console.log("splice - modify existing array", arr1.splice(arr1.indexOf(2), 1, 6), arr1);
// splice - modify existing array [ 2 ] [ 1, 6, 3, 4, 5 ]

console.log("slice - return new array", arr1.slice(2), arr1);
// slice - return new array [ 3, 4, 5 ] [ 1, 6, 3, 4, 5 ]

console.log("filter - return new array", arr1.filter(x => x%2 == 0 ? true : false), arr1);
// filter - return new array [ 6, 4 ] [ 1, 6, 3, 4, 5 ]

console.log("for...of = values");
for(let val of arr1){
    console.log(val);
}
// for...of = values
// 1
// 6
// 3
// 4
// 5

console.log("for...in = keys");
for(let key in arr1){
    console.log(key);
}
// for...in = keys
// 0
// 1
// 2
// 3
// 4


console.log("foreach = values");
arr1.forEach(x => console.log(x*x));
// foreach = values
// 1
// 36
// 9
// 16
// 25


console.log("concat - return new array", arr1.concat(["new", "values"]), arr1);
// concat - return new array [ 1, 6, 3, 4, 5, 'new', 'values' ] [ 1, 6, 3, 4, 5 ]

console.log("join - return new string", arr1.join("="), arr1);
// join - return new string 1=6=3=4=5 [ 1, 6, 3, 4, 5 ]

console.log("split - return array", "1@2@3@4@5".split("@") );
// split - return array [ '1', '2', '3', '4', '5' ]

let str1 = "demo string is always fun...";
console.log("replace - return new string", str1.replace("demo", "replaced demo"), str1)
// replace - return new string replaced demo string is always fun... demo string is always fun...

console.log("tolowercase - return new string", str1.toLowerCase(), str1);
// tolowercase - return new string demo string is always fun... demo string is always fun...

console.log("touppercase - return new string", str1.toUpperCase(), str1);
// touppercase - return new string DEMO STRING IS ALWAYS FUN... demo string is always fun...

console.log("substr - return new string", str1.substr(5,15), str1);
// substr - return new string string is alway demo string is always fun...

console.log("push -  modify existing array - returns length", arr1.push("new", "values", "pushed"), arr1);
// push -  modify existing array - returns length 8 [ 1, 6, 3, 4, 5, 'new', 'values', 'pushed' ]

console.log("pop -  modify existing array - returns length", arr1.pop(), arr1);
console.log("pop -  modify existing array - returns length", arr1.pop(), arr1);
console.log("pop -  modify existing array - returns length", arr1.pop(), arr1);
// pop -  modify existing array - returns length pushed [ 1, 6, 3, 4, 5, 'new', 'values' ]
// pop -  modify existing array - returns length values [ 1, 6, 3, 4, 5, 'new' ]
// pop -  modify existing array - returns length new [ 1, 6, 3, 4, 5 ]

console.log("shift -  modify existing array - returns element", arr1.shift(), arr1);
// shift -  modify existing array - returns element 1 [ 6, 3, 4, 5 ]

console.log("unshift -  modify existing array - returns length", arr1.unshift(1), arr1);
// unshift -  modify existing array - returns length 5 [ 1, 6, 3, 4, 5 ]

console.log("sort - sorts existing array", arr1.sort());
// sort - sorts existing array [ 1, 3, 4, 5, 6 ]

console.log("sort - sorts existing array - customization - { >0 } for swap", arr1.sort((a,b) => a>b ? -1 : 1), arr1);
// sort - sorts existing array - customization - { >0 } for swap [ 6, 5, 4, 3, 1 ] [ 6, 5, 4, 3, 1 ]


let obj1 = {
    a : 1,
    b : 2,
    name : "name",
    age : 45,
    arr : [12,23,45,56,78,89]
}
console.log(obj1);
// { a: 1, b: 2, name: 'name', age: 45, arr: [ 12, 23, 45, 56, 78, 89 ] }

console.log("Object.keys - return array", Object.keys(obj1));
// Object.keys - return array [ 'a', 'b', 'name', 'age', 'arr' ]

console.log("Object.values - return array", Object.values(obj1));
// Object.values - return array [ 1, 2, 'name', 45, [ 12, 23, 45, 56, 78, 89 ] ]

obj1["demokey"] = "demo value";
console.log("add prop : val", obj1);
// add prop : val {
//     a: 1,
//     b: 2,
//     name: 'name',
//     age: 45,
//     arr: [ 12, 23, 45, 56, 78, 89 ],
//     demokey: 'demo value'
//   }
  
delete obj1["demokey"];
console.log("delete obj1[\"demokey\"] - return obj", obj1);
// delete obj1["demokey"] - return obj { a: 1, b: 2, name: 'name', age: 45, arr: [ 12, 23, 45, 56, 78, 89 ] }


console.log("Access to all keys and vals =>");
for(let key in obj1){
    console.log(key , "===>" , obj1[key]);
}
// Access to all keys and vals =>
// a ===> 1
// b ===> 2
// name ===> name
// age ===> 45
// arr ===> [ 12, 23, 45, 56, 78, 89 ]


console.log("math methods");
// math methods

console.log("math.ceil(15.1, 15.5, 15.9, -15.1, -15.5, -15.9) ", Math.ceil(15.1), Math.ceil(15.5), Math.ceil(15.9), Math.ceil(-15.1), Math.ceil(-15.5), Math.ceil(-15.9));
// math.ceil(15.1, 15.5, 15.9, -15.1, -15.5, -15.9)  16 16 16 -15 -15 -15

console.log("math.floor(15.1, 15.5, 15.9, -15.1, -15.5, -15.9) ", Math.floor(15.1), Math.floor(15.5), Math.floor(15.9), Math.floor(-15.1), Math.floor(-15.5), Math.floor(-15.9));
// math.floor(15.1, 15.5, 15.9, -15.1, -15.5, -15.9)  15 15 15 -16 -16 -16

console.log("math.round(15.1, 15.5, 15.9, -15.1, -15.5, -15.9) ", Math.round(15.1), Math.round(15.5), Math.round(15.9), Math.round(-15.1), Math.round(-15.5), Math.round(-15.9));
// math.round(15.1, 15.5, 15.9, -15.1, -15.5, -15.9)  15 16 16 -15 -15 -16

console.log("Date");
console.log(new Date().toString());
console.log(new Date().getDate());
console.log(new Date().getMonth() + 1);
console.log(new Date().getFullYear());
console.log(new Date().getHours() + 1);
console.log(new Date().getMinutes() + 1);
console.log(new Date().getSeconds() + 1);

console.log(new Date().getDay() + 1, "1 - SUNDAY, 2 - MONDAY ...");

