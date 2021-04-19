[toc]

### javaScript

###### 1.const 定义的 Array 中间元素能否被修改? 如果可以, 那 const 修饰对象有什么意义?

- 其中的值可以被修改. 意义上, 主要保护引用不被修改 (如用 [Map](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Map) 等接口对引用的变化很敏感, 使用 const 保护引用始终如一是有意义的), 也适合用在 immutable 的场景

###### 2.结合`{}` 的使用与缺点来谈 `Set, Map` 等. 比如私有化的问题与 `symbol` 等等

ßΩ

###### 3.`闭包是什么?` 什么应用场景更加合理？比如说, 如果回答者通常使用闭包实现数据的私有, 那么可以接着问 es6 的一些新特性 (例如 `class`, `symbol`) 能否实现私有, 如果能的话那为什么要用闭包? 亦或者是什么闭包中的数据/私有化的数据的内存什么时候释放?

### node.js

### css

###### 1.设置根元素

```javascript
//rem布局设置根元素字体
var htmlWidth =
  document.documentElement.clientWidth || document.body.clientWidth;
//获取HTML的Dom元素
var htmlDom = document.getElementsByTagName("html")[0];
//设置根元素字体
htmlDom.style.fontSize = htmlWidth / 20 + "px";
```

### 框架
