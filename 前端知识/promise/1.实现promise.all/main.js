
Promise._all = function(arr){
    return new Promise((resolve,reject) => {
        try {
            const result = []
            let count = 0
            let fulfilledCount = 0
            for(const p of arr){
                let i = count
                count ++

                Promise.resolve(p).then((data) => {
                    fulfilledCount++
                    result[i] = data
                    if (fulfilledCount===count){
                        resolve(result)
                    }
                },reject)
            }
            if (count==0){
                resolve(result)
            }
        }catch(err){
            reject(err)
        }
    })
}

Promise._all([
	Promise.reject(1),
	Promise.resolve(2),
	Promise.resolve(3),
	4,
]).then(
	(data) => {
		// data:[1,2,3,4]
		// 传递[pro1,pro2,pro3,4]的话:内部默认处理Promise.resolve(4)
		console.log("成功", data);
	},
	(reason) => {
		// reason:reason2
		console.log("失败", reason);
	}
);
