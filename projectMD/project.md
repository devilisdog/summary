##### [虚拟滚动列表](../src/page/virtuaList/index.js)

 **虚拟列表** 是解决长列表渲染的最佳方案。无论是小程序，或者是`h5` ，随着 `dom`元素越来越多，页面会越来越卡顿,这种情况在小程序更加明显 。

 虚拟列表是按需显示的一种技术，可以根据用户的滚动，不必渲染所有列表项，而只是渲染可视区域内的一部分列表元素的技术。正常的虚拟列表分为 渲染区，缓冲区 ，虚拟列表区。

![虚拟列表示意图](/Users/dean/Desktop/user/project/summary/projectMD/img/virtuaList1.webp)


为了防止大量dom存在影响性能，我们只对，渲染区和缓冲区的数据做渲染，，虚拟列表区 没有真实的dom存在。缓冲区的作用就是防止快速下滑或者上滑过程中，会有空白的现象。


![虚拟列效果意图](/Users/dean/Desktop/user/project/summary/projectMD/img/virtuaList2.gif)

**具体思路**

① 初始化计算容器的高度。截取初始化列表长度。这里我们需要div占位,撑起滚动条。

② 通过监听滚动容器的 `onScroll`事件,根据 `scrollTop` 来计算渲染区域向上偏移量, 我们要注意的是，当我们向下滑动的时候，为了渲染区域，能在可视区域内，可视区域要向上的滚动; 我们向上滑动的时候，可视区域要向下的滚动。

③ 通过重新计算的 `end` 和 `start` 来重新渲染列表。

**性能优化点**

① 对于移动视图区域，我们可以用 `transform` 来代替改变 `top`值。

② 虚拟列表实际情况，是有 `start` 或者 `end` 改变的时候，在重新渲染列表，所以我们可以用之前 `shouldComponentUpdate` 来调优，避免重复渲染。

**备注**

① react-tiny-virtual-list 是一个较为轻量的实现虚拟列表的插件；

② 实现大数据列表另一种方案（时间分片）

   时间分片的概念，就是一次性渲染大量数据，初始化的时候会出现卡顿等现象。我们必须要明白的一个道理，js执行永远要比dom渲染快的多。 ，所以对于大量的数据，一次性渲染，容易造成卡顿，卡死的情况。我们先来看一下例子

```javascript
class Index extends React.Component<any,any>{
    state={
       list: []
    }
    handerClick=()=>{
       let starTime = new Date().getTime()
       this.setState({
           list: new Array(40000).fill(0)
       },()=>{
          const end =  new Date().getTime()
          console.log( (end - starTime ) / 1000 + '秒')
       })
    }
    render(){
        const { list } = this.state
        console.log(list)
        return <div>
            <button onClick={ this.handerClick } >点击</button>
            {
                list.map((item,index)=><li className="list"  key={index} >
                    { item  + '' + index } Item
                </li>)
            }
        </div>
    }
}
```

![效果图](/Users/dean/Desktop/user/project/summary/projectMD/img/virtual3.gif)





我们看到 40000 个 简单列表渲染了，将近5秒的时间。为了解决一次性加载大量数据的问题。我们引出了时间分片的概念，就是用`setTimeout`把任务分割，分成若干次来渲染。一共40000个数据，我们可以每次渲染100个， 分次400渲染。

```javascript
class Index extends React.Component<any,any>{
    state={
       list: []
    }
    handerClick=()=>{
       this.sliceTime(new Array(40000).fill(0), 0)
    }
    sliceTime=(list,times)=>{
        if(times === 400) return 
        setTimeout(() => {
            const newList = list.slice( times , (times + 1) * 100 ) /* 每次截取 100 个 */
            this.setState({
                list: this.state.list.concat(newList)
            })
            this.sliceTime( list ,times + 1 )
        }, 0)
    }
    render(){
        const { list } = this.state
        return <div>
            <button onClick={ this.handerClick } >点击</button>
            {
                list.map((item,index)=><li className="list"  key={index} >
                    { item  + '' + index } Item
                </li>)
            }
        </div>
    }
}
```

![时间分片效果图](/Users/dean/Desktop/user/project/summary/projectMD/img/virtual4.gif)



`setTimeout` 可以用 `window.requestAnimationFrame()` 代替，会有更好的渲染效果。我们`demo`使用列表做的，实际对于列表来说，最佳方案是虚拟列表，而时间分片，更适合**热力图，地图点位比较多的情况**。