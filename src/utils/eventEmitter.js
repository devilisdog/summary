/**
 * @description   发布订阅 （EventEmitter）
 */

class EventEmitter {
    constructor() {
        this.listenList = {}
        this.instance = null
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new EventEmitter()
        }
        return this.instance
    }

    // 订阅者添加订阅事件
    on(key, fn) {
        if (!this.listenList[key]) {
            this.listenList[key] = []
        }
        this.listenList[key].push(fn)
    }

    // 发布者发布消息，执行订阅者订阅事件
    emit() {
        const key = Array.from(arguments).shift()
        const fns = this.listenList[key]
        if (!fns || fns.length === 0) {
            return false
        }

        fns.forEach((fn) => {
            fn.apply(this, arguments)
        })
    }

    // 移除订阅事件
    remove(key, fn) {
        const fns = this.listenList[key]
        if (!fns || fns.length === 0) return

        if (!fn) {
            this.listenList[key] = []
        } else {
            for (let l = fns.length - 1; l >= 0; l--) {
                if (fn === fns[l]) {
                    fns.splice(l, 1)
                }
            }
        }
    }
}

export default EventEmitter.getInstance()
