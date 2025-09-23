Promise.prototype.myfinally = function (onSettled) {
	return this.then(
		(data) => {
            console.log('我被调用了');
            
			onSettled();
			return data;
		},
		(reason) => {
			onSettled();
			throw reason;
		}
	);
};

/******test finally*******/
// 无论什么结果，都会运行
Promise.resolve(123)
	.then((res) => {
		console.log(res); //123
		return Promise.reject(456);
	})
	.myfinally(() => {
		console.log("finally1");
		return "finally本身不返回值";
	})
	.then(
		() => {},
		(err) => {
			console.log(err); //456
			return 789;
		}
	)
	.myfinally(() => console.log("finally2"))
	.then((res) => console.log(res)); //789
