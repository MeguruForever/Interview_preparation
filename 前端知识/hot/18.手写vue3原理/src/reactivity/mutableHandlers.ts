import { isObject } from '../shared/index.js';
import {track} from './effect.js'
import { trigger } from './effect.js';
import { reactive } from './reactive.js';
export const baseHandler = 
    {
        get(target,key,receiver){
            let value = Reflect.get(target,key,receiver)
            console.log("获取值",target,key,receiver);
            //记住activeEffect
            track(target,key)
            return isObject(value) ? reactive(value) :value
        },
        set(target,key,newValue,receiver){
            const oldValue = target[key]
            if (oldValue===newValue){
                return false
            }
            let result = Reflect.set(target,key,newValue,receiver)
            console.log("设置值",target,key,newValue,receiver);
            trigger(target,key)
            return result
        }
    }
