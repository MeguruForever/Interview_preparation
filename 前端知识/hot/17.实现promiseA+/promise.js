const PENDING = "pending"
const RESOLVED = "resolved"
const REJECTED = "rejected"

class Promise {
    constructor(execute){
        //console.log("my promise");
        this.status = PENDING
        this.value = null
        this.reason = null
        this.resolveCallbacks = []
        this.rejectCallbacks = []
        try {
            execute(this.resolve.bind(this),this.rejcet.bind(this))
        } catch(error) {
            this.rejcet(error)
        }
    }

    resolve(value){
        if (this.status === PENDING){
            this.value = value
            this.status = RESOLVED
            this.resolveCallbacks.forEach(onFulfilled=>{
                onFulfilled()
            })
        }
    }

    rejcet(reason){
        if (this.status === PENDING){
            this.reason = reason
            this.status = REJECTED
            this.rejectCallbacks.forEach((onRejected) => {
                onRejected()
            })
        }
    }

    then(onFulfilled,onRejected){
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled:data=>data;
        onRejected = typeof onRejected === 'function'? onRejected:err=>{throw(err)};
        //console.log(this.status);
        let promise2 = new Promise((resolve,rejcet)=>{
            if (this.status === PENDING){
                this.resolveCallbacks.push(
                    ()=>{
                    setTimeout(() => {
                        try{
                            let x = onFulfilled(this.value)
                            resolvePromise(x,promise2,resolve,rejcet)
                        }catch(error){
                            rejcet(error)
                        }
                    }, 0);
                    }
                )
                this.rejectCallbacks.push(
                    ()=>{
                        setTimeout(() => {
                            try{
                                let x = onRejected(this.reason)
                                resolvePromise(x,promise2,resolve,rejcet)
                            }catch(error){
                                rejcet(error)
                            }
                        }, 0);
                    }
                )
            }
            if (this.status === RESOLVED){
                setTimeout(() => {
                    try{
                        let x = onFulfilled(this.value)
                        resolvePromise(x,promise2,resolve,rejcet)
                    }catch(error){
                        rejcet(error)
                    }
                }, 0);
                
            }
            if (this.status===REJECTED){
                setTimeout(() => {
                    try{
                        let x = onRejected(this.reason)
                        resolvePromise(x,promise2,resolve,rejcet)
                    }catch(error){
                        rejcet(error)
                    }
                }, 0);
            }
        })
        return promise2
    }

}

function resolvePromise(x,promise2,resolve,reject){
    //console.log(x,promise2);
    
    if (x===promise2){
        return reject(new TypeError('链式调用'))
    }
    //console.log("没有递归自己");
    
    if (x && (typeof x ==='object'||typeof x === 'function')){
        let called;
        try {
            let then = x.then
            if (typeof then === 'function'){
                //console.log("then被调用了");
                
                then.call(x,data=>{
                    if (called)return;
                    called=true
                    resolvePromise(data,promise2,resolve,reject)
                },reason=>{
                    if (called)return;
                    called=true
                    reject(reason)
                })
            }else {
                resolve(x)
            }
        }catch(error) {
            if (called)return;
            called=true
            reject(error)
        }
    }else {
        resolve(x)
    }
}
Promise.deferred = function(){
    let deferred = {}
    deferred.promise = new Promise((resolve,reject)=>{
        deferred.resolve = resolve
        deferred.reject = reject
    })
    return deferred
}
var promisesAplusTests = require("promises-aplus-tests")

promisesAplusTests(Promise, function (err) {
    if (err)console.log("测试失败",err);
    // All done; output is in the console. Or check `err` for number of failures.
});
module.exports = Promise

