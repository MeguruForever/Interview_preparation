import { baseHandler } from "./mutableHandlers"
//变成响应式数据
export function reactive(target) {
    return createReactiveObject(target)
}
const reactiveMap = new Map()
function createReactiveObject(target){
    const existProxy = reactiveMap.get(target)
    if(existProxy)return existProxy
    let proxy = new Proxy(target,baseHandler)
    
    return proxy
}
