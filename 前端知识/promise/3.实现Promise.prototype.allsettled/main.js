Promise.prototype.mySettled = function(promises) {
    return new Promise((resolve,reject)=>{
		const result = []
		const count = 0
		for (let p of promises){
			Promise.resolve(p).then(
				res => {
					count++
					result[i] = {status:"fulfilled",value:res}
				}
				,
				(error) =>{
					count++
					result[i] = {status:"rejected",reason:error}
				}
			).finally(
				()=>{
					if (count==promises.length){
						resolve(result)
					}
				}
			)
		}
	})
}



const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) =>
	setTimeout(reject, 100, "foo")
);
const promises = [promise2, promise1];
Promise.allSettled(promises).then((results) =>
	results.forEach((result) => console.log(result))
);
