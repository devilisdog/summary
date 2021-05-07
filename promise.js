function Promise(executor) {
    //添加属性defaultValue
    this.PromiseState = 'pending'
    this.PromiseResult = null

    //保存多个异步回调方法
    this.callbacks = []

    const _this = this

    //实现构造函数resolve方法（形参）
    function successFun(data) {
        //判断状态只能更改一次
        if (_this.PromiseState !== 'pending') return

        //1.修改对象的状态（promiseState）
        _this.PromiseState = 'fulfilled'

        //2.设置对象结果值（promiseResult）
        _this.PromiseResult = data

        //调用异步成功回调的函数
        _this.callbacks.forEach((element) => {
            element.onResolved(data)
        })
    }
    //实现构造函数reject方法
    function errFun(data) {
        if (_this.PromiseState !== 'pending') return
        _this.PromiseState = 'rejected'
        _this.PromiseResult = data

        //调用异步失败回调的函数
        _this.callbacks.forEach((element) => {
            element.onRejected(data)
        })
    }

    //同步调用【执行器函数】
    // executor(successFun, errFun)

    //实现throw方法
    try {
        executor(successFun, errFun)
    } catch (error) {
        errFun(error)
    }
}

//promise添加then方法，then方法返回的是promise对象
Promise.prototype.then = function (onResolved, onRejected) {
    const that = this

    //异常穿透（实际加了一个默认值onRejected）
    if (typeof onRejected !== 'function') {
        onRejected = (reason) => {
            throw reason
        }
    }

    return new Promise((resolve, reject) => {
        function callback(type) {
            // try...catch 捕获then方法中throw抛出的错误
            try {
                let result = type(that.PromiseResult)

                //then中是promise方法与普通方法
                if (result instanceof Promise) {
                    result.then(
                        (v) => resolve(v),
                        (r) => reject(r),
                    )
                } else {
                    resolve(result)
                }
            } catch (error) {
                reject(error)
            }
        }

        //调用成功与失败的回调函数(同步方法)
        // this指向构造函数实例P
        if (this.PromiseState === 'fulfilled') {
            callback(onResolved)
        }
        if (this.PromiseState === 'rejected') {
            callback(onRejected)
        }

        //异步函数执行时 状态时pending
        if (this.PromiseState === 'pending') {
            this.callbacks.push({
                onResolved: function () {
                    callback(onResolved)
                },
                onRejected: function () {
                    callback(onRejected)
                },
            })
        }
    })
}

Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected)
}
