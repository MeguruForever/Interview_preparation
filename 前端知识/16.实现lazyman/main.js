class LazyMan {
    constructor (name) {
        this.taskQueue = []
        this.name = name
        this.sayHi(name)
        Promise.resolve().then(() => {
            this._run();
        })
    }
    sayHi (name) {
        this.taskQueue.push(()=>{
            console.log(`Hi! This is ${name}!`)
        })
    }

    eat(something){
        this.taskQueue.push(()=>{
            console.log(`Eat ${something}~`)
        })
        return this
    }

    sleep(time){
        this.taskQueue.push(()=>{
            this._sleep(time)
        })
        return this
    }

    sleepFirst(time){
        this.taskQueue.unshift(()=>this._sleep(time));
        return this;
    }

    _sleep(time) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Wake up after ${time}s`);
                resolve();
            }, time * 1000);
        });
    }

    async _run(){ 
        for (const task of this.taskQueue) {
            await task();
        }
    }
}





new LazyMan("Hank1").sleep(10).eat("dinner");
new LazyMan("Hank2").eat("dinner").eat("supper");
new LazyMan("Hank3").sleepFirst(5).eat("supper");