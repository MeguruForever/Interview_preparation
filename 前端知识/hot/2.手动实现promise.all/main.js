Promise._all = function (promises) {
    return new Promise((resolve, reject) => {
        if (promises == null || typeof promises[Symbol.iterator] !== "function") {
            throw new TypeError(`${promises} is not a iterable`)
        }
        promises = [...promises]

        if (promises.length == 0) {
            resolve([])
        }

        let count = 0
        const values = []
        promises.forEach((promise,index) => {
            Promise.resolve(promise).then((res) => {
                values[index] = res
                if (++count === promises.length) {
                    resolve(values)
                }
            }).catch(reject)
        });
    })
}