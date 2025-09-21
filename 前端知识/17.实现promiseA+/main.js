const Promise = require('./promise.js')

let p = new Promise((resolve,reject)=>{
    // setTimeout(()=>{
    //     // resolve(100)
    //     reject("失败")
    // },10000)
    // throw("错误")
    resolve(100)
    //reject('失败')
}).then(
    data=> {
        console.log('第一个promise data',data);
        //return p
        return m
    }
    ,reason=>{
        console.log("第一个promise reason",reason)
        throw('错误错误')
    }
    
)
.then(
    data=> {
    console.log('第二个promise data',data);
    },reason=>{
        console.log("第二个promise reason",reason)
    }
)