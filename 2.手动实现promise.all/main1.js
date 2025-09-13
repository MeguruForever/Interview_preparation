Promise._all = function (promsies) {
    return new Promise((resolve, reject) => {
        // Check if it is an iterator object
        if (promsies == null || typeof promsies[Symbol.iterator] !== "function") {
            throw new TypeError(`${promsies} is not a iterator`)
        }

        promsies = [...promsies]

        if (promsies.length == 0) {
            resolve([])
        }
        var count =0
        var value = []
        promsies.forEach((element,index) => {
            Promise.resolve(element).then((res) => {
                value[index] = res
                if (++count == promsies.length) {
                    resolve(value)
                }
            }).catch(reject)
        });
    })
}

// 测试用例1：全部成功
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise._all([p1, p2, p3]).then(res => {
  console.log('全部成功:', res); // 预期输出: [1, 2, 3]
}).catch(err => {
  console.error('失败:', err);
});

// 测试用例2：有一个失败
const p4 = Promise.resolve(4);
const p5 = Promise.reject('出错了');
const p6 = Promise.resolve(6);

Promise._all([p4, p5, p6]).then(res => {
  console.log('全部成功:', res);
}).catch(err => {
  console.error('有失败:', err); // 预期输出: 有失败: 出错了
});

// 测试用例3：空数组
Promise._all([]).then(res => {
  console.log('空数组:', res); // 预期输出: []
});

Promise.all