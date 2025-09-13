const arr = [1, [2, [3, [4, [5, [6, [7, [8, [9], 10], 11], 12], 13], 14], 15], 16]]
Array.prototype._flat = function (deep = Infinity) {
    let ans = []
    deep--
    for (const p of this) {
        if (Array.isArray(p) && deep >= 0) {
            ans=ans.concat(p._flat(deep))
        } else {
            ans.push(p)
        }
    }
    return ans
}

console.log(arr._flat());

Array.prototype._falt = function (deep = Infinity) {
    deep--
    return this.reduce((pre, cur) => {
        cur instanceof Array ? pre.push(...cur._falt()) : pre.push(cur)
        return pre
    },[])
}

console.log(arr._falt())