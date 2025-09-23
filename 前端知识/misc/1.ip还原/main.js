function ipToNum(str){
    const arr = str.split('.')
    let num = 0
    for(let i = 0; i < arr.length; i++){
        num += parseInt(arr[i]) * 10 **(3*(3-i))
    }
    return num
}
function numToIp(num){
    let arr = []
    for(let i = 3; i >= 0; i--){
        let n = Math.floor(num / (10 ** (3*i)))
        arr.push(n)
        num = num - n * (10 ** (3*i))
    }
    return arr.join('.')

}
console.log(ipToNum('0'))
console.log(numToIp(0))




