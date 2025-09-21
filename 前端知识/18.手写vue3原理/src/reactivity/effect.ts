export function effect(fn){
    const effect = createReactiveEffect(fn)
    effect()
}
// effect(()=>{
//     app.innerHTML = state.name
`//     effect(()=>{
//         app.innerHTML = '---' + state.age
//         app.innerHTML = state.name + ' 666 ' + state.age
//     })`
//     app.innerHTML = state.age + '888'
// })

let activeEffect;
let effectStack:Function[] = []

function createReactiveEffect(fn: Function) {
    const effect: Function = function reactiveEffect() {
        if (!effectStack.includes(effect)) {
            effectStack.push(effect);
            activeEffect = effect;
            try {
                fn();
            } finally {
                effectStack.pop();
                activeEffect = effectStack[effectStack.length - 1] || null; // 恢复上一个 activeEffect
            }
        }
    };
    return effect;
}
const targetMap = new WeakMap() //key只能是对象

// key对象 值是map
// {
//     state: {
//         name: Set[fn,fn,fn]
//         age: Set[]
//     }
// }

export function track(target,key){
    if (!activeEffect) return; // 如果没有激活的副作用函数，直接返回
    //key用来记住activeEffect
    let dependencesMap = targetMap.get(target)
    if(!dependencesMap){
        targetMap.set(target,(dependencesMap = new Map()))
    }
    let dep = dependencesMap.get(key) //Set[fn,fn,fn]
    if (!dep){
        dependencesMap.set(key,(dep = new Set()))
    }
    // 确保 activeEffect 不为 undefined，并且未重复添加
    if (activeEffect && !dep.has(activeEffect)) {
        dep.add(activeEffect);
    }
    console.log(targetMap);
}

export function trigger(target,key){
    let dependencesMap = targetMap.get(target);
    if (!dependencesMap) return;

    let dep = dependencesMap.get(key);
    if (!dep) return;

    // 避免重复触发
    const effectsToRun = new Set(dep);
    effectsToRun.forEach(effect => {
        if (typeof effect === 'function') effect(); // 确保副作用函数有效
    });
}