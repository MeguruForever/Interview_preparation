class Scheduler {
    constructor(max) {
        this.max = max; // 最大并发数
        this.count = 0; // 当前正在执行的任务数
        this.queue = []; // 任务队列
    }

    add(fn) {
        return new Promise((resolve, reject) => {
            // 将任务加入队列
            this.queue.push(async () => {
                try {
                    // 确保 fn 的执行结果是一个 Promise，并等待其完成
                    await Promise.resolve(fn());
                    resolve(); // 在 fn 内部的异步操作完成后调用 resolve
                } catch (err) {
                    reject(err); // 如果 fn 抛出错误，调用 reject
                }
            });
            this.run(); // 尝试运行任务
        });
    }

    async run() {
        if (this.count >= this.max || this.queue.length === 0) {
            return; // 如果达到最大并发数或队列为空，直接返回
        }

        this.count++; // 增加当前正在执行的任务数
        const task = this.queue.shift(); // 从队列中取出一个任务
        try {
            await task(); // 执行任务，并等待其完成
        } finally {
            this.count--; // 任务完成后减少当前正在执行的任务数
            this.run(); // 尝试运行下一个任务
        }
    }
}

// 延迟函数
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

// 同时进行的任务最多 2 个
const scheduler = new Scheduler(2);

// 添加异步任务
const addTask = (time, val) => {
    scheduler
        .add(() => {sleep(time)}) // 确保传递的是一个返回 Promise 的函数
        .then(() => console.log(val));
};

addTask(1000, 1); // 1 秒后输出
addTask(500, 2);  // 0.5 秒后输出
addTask(300, 3);  // 0.3 秒后输出
addTask(400, 4);  // 0.4 秒后输出