//基础版
function debunce_base(fun, wait) {
    let timer

    return function () {
        clearTimeout(timer)
        timer = setTimeout(fun, wait)
    }
}

//改变this,event指向版
function debunce_e(fun, wait) {
    let timer
    return function () {
        let args = arguments //改变event指向

        let _this = this
        //console.log(this) // <div id='container'></div>  this指向当前对象的执行者
        clearTimeout(timer)
        timer = setTimeout(() => {
            fun.call(_this, ...args)
        }, wait)
    }
}

//立即执行版
function debunce(fun, wait, immediate) {
    let timer
    return function () {
        let args = arguments
        let _this = this
        clearTimeout(timer)
        if (immediate) {
            //wait时间内，持续滑动鼠标，callNow=false 不执行 fun.call(_this, ...args)
            let callNow = !timer
            timer = setTimeout(() => {
                timer = null
            }, wait)

            //立即执行
            if (callNow) {
                fun.call(_this, ...args)
            }
        } else {
            timer = setTimeout(() => {
                fun.call(_this, ...args)
            }, wait)
        }
    }
}
