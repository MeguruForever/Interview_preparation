Function.prototype._call = function(context, ...args){
    if (!context) context = global
    context._fn = this
    const result = context._fn(...args)
    delete context._fn
    return result
}

Function.prototype._apply = function(context,args){
    if (!context) context = global
    context._fn = this
    const result = context._fn(...args)
    delete context._fn
    return result
}
Function.prototype._bind = function(context,...args1){
    if (!context || typeof context !== "object") {
        context = Object(context); // 将原始值包装为对象
    }
    const _this = this
    return function A(...args2){
        const args = [...args1].concat(...args2)
        if (Object.getPrototypeOf(this)===A.prototype) {
            var obj = {}
            Object.setPrototypeOf(obj,_this.prototype)
            _this._apply(obj,args)
            return obj
        }
        else     
        return _this._apply(context,args)
    }
}

function fn(a,b,c,d){
    console.log(a,b,c,d)
    console.log(this)
    return 123
}

const newFn = fn._bind("ctx",1,2)
const a = new newFn(3,4)
console.log(a)

