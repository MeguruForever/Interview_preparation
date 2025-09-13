function _instanceof(left, right) {
    Object.getPrototypeOf(left)
}




//test
function Person() { };
var p = new Person();
console.log(_instanceof(p, Object));