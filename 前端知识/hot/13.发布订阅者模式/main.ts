class EventEmiter {
	cache: { [key: string]: Function[] } = {};
    on(name:string,fn:Function){
		if(this.cache[name]){
			this.cache[name].push(fn)
		}else {
			this.cache[name] = [fn]
		}
	}
	off(name:string,fn:Function){
		let tasks = this.cache[name]
		if (tasks) {
			const index = tasks.findIndex(e => e == fn)
			if (index>=0){
				tasks.splice(index, 1)
			}
		}
	}
	emit (name:string,once:boolean=false,...args:any[]){
		if (this.cache[name]){
			for (let fn of this.cache[name]){
				fn(...args)
			}
		}
		if (once) {
			delete(this.cache[name])
		}
	}
}

//test
let eventsBus = new EventEmiter();
let fn1 = function (name:string, age:number) {
	console.log(name, age);
};
let fn2 = function (name:string, age:number) {
	console.log("fn", name, age);
};
eventsBus.on("test", fn1);
eventsBus.on("test", fn2);
eventsBus.emit("test", false, "Jason", 18);
