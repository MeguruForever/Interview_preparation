Array.prototype._map = function (callback, objThis) {
	if (typeof callback !== "function") {
		throw new TypeError("callback type error!");
	}
	const res = [];
	for (let i = 0; i < this.length; i++) {
		res.push(callback.call(objThis, this[i], i, this));
	}
	return res;
};

const arr = [1, 2, 3];

const res = arr._map(
    //箭头函数的this是从上下文继承的
	function (e, i) {
		console.log(this);
		return e * i * this.s;
	},
	{ s: 666 }
);

console.log(res);
