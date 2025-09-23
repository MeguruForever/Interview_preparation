const obj = {
    name: 'xiaohei',
    bool: true,
    nul: null,
    undef: undefined,
    show: function () {
        console.log('show function');
    },
    num: 20,
    set: new Set([1, 2, 3]),
    map: new Map(),
    date: new Date(),
    reg: /.xml/g,
    info: {
        msg: 'old msg',
    },
    sym: Symbol('a'),
};
const target = [{
    field1: 1,
    field2: undefined,
    field3: {
      child: "child",
    },
    field4: [2, 4, 8],
  }];
function deepclone(obj){
    let objClone = Array.isArray(obj) ? [] : {}
    for (let key of Object.keys(obj)){
        console.log(key,obj[key])
        if (typeof obj.key == "object") objClone[key] = deepclone(obj[key]);
        else objClone[key] = obj[key]
    }
    return objClone
}

console.log(deepclone(target))