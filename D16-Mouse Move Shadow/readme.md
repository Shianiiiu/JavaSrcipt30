# Mouse Shadow 文字阴影的鼠标随动效果 🖱

> 油管视频：[CSS Text Shadow on Mouse Move Effect](https://www.youtube.com/watch?v=zaz9gLI-Xac&list=PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH&index=16) 📺
> 本知识总结摘自：[soyainiJavaScript-30 中文练习指南](https://github.com/soyaine/JavaScript30) 、[winar-jin/JavaScript30-Challenge](https://github.com/winar-jin/JavaScript30-Challenge) 🦥



* [实现效果](#实现效果)
* [涉及语法](#涉及语法)
* [过程指南](#过程指南)
* [知识详解](#知识详解)
  * [1、鼠标事件的几个属性实例](#1鼠标事件的几个属性实例)
  * [2、页面元素offset的几个属性示例](#2页面元素offset的几个属性示例)
* [延伸阅读](#延伸阅读)

## 实现效果

![mouse shadow](https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210512152951_D16.gif)

鼠标移动时，元素的字体阴影随着鼠标移动的方向发生改变，根据用户当前的鼠标位置来操纵文字阴影的位置。

## 涉及语法

- [MouseEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent)

  - [offsetX (实验性)](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/offsetX)
  - [offsetY(实验性)](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/offsetY)

- HTMLElement

  - [offsetHeight](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetHeight)

  - [offsetWidth](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetWidth)

- CSS3

  - [text-shadow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-shadow)

- ES6

  - [Destructuring assignment 解构赋值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)



## 过程指南

1. 在`hero`元素上监听鼠标移动事件`mousemove`，并添加事件处理的回调函数`shadowMove`.

   ```js
   hero.addEventListener('mousemove', shadow);
   ```

2. 从事件发生的event对象中获取需要的值: （这里使用ES6中的语法**解构赋值**，代码更佳简洁）

   ```js
   const {offsetWidth: width, offsetHeight: height} = hero;
   let {offsetX: x, offsetY: y} = e;
   ```

3. 分别获取到鼠标所在位置相对于页面左侧和顶端的距离，将这两个距离映射为自己想要移动的距离上（`walk`）：

   ```js
   const walk = 100;
   const xWalk = Math.round( (x / width) * walk - (walk / 2) );
   const yWalk = Math.round( (x / height) * walk - (walk / 2) );
   ```

4. 其中当鼠标移动中间的文字上的时候，由于`e.target`变化了，所以造成x的值不连续，因此**需要监测`e.target`的值**，判断是否指在了文字上；

   ```js
   if (this !== e.target) {
       x += e.target.offsetLeft;
       y += e.target.offsetTop;
   }
   ```

5. 为元素设置字体阴影，text-shadow样式：

   ```js
   text.style.textShadow = `
       ${xWalk}px ${yWalk * -1}px 0 rgba(255,0,255,0.7),
       ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
       ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,0.7),
       ${yWalk * -1}px ${xWalk}px 0 rgba(188,188,188,0.7)`;
   ```



## 知识详解

### 1、鼠标事件的几个属性实例

- event.clientX、event.clientY:鼠标相对于浏览器窗口可视区域的X，Y坐标（窗口坐标），可视区域不包括工具栏和滚动条。IE事件和标准事件都定义了这2个属性.
- event.pageX、event.pageY:类似于event.clientX、event.clientY，但它们使用的是__文档坐标__而非窗口坐标。这2个属性不是标准属性，但得到了广泛支持。IE事件中没有这2个属性。
- event.offsetX、event.offsetY:鼠标相对于事件源元素（srcElement）(鼠标点击的元素)的X,Y坐标，只有IE事件有这2个属性，标准事件没有对应的属性。
- event.screenX、event.screenY:鼠标相对于用户显示器屏幕左上角的X,Y坐标。标准事件和IE事件都定义了这2个属性。



### 2、页面元素offset的几个属性示例

- [HTMLElement.offsetParent](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetParent)：是一个只读属性，指向最近的包含该元素的__定位__元素.如果没有定位的元素，则 offsetParent 为最近的 table 元素对象或根元素（标准模式下为 html；quirks 模式下为 body）。当元素的 style.display 设置为 "none" 时，offsetParent 返回 null。 offsetParent 很有用，因为 *offsetTop* 和 *offsetLeft* 都是相对于其**内边距边界**的。
- `HTMLElement.offsetTop`：指的是当前元素到其offsetParent指向元素的__上边距__的距离。
- `HTMLElement.offsetLeft`：指的是当前元素到其offsetParent指向元素的__左边距__的距离。
- `HTMLElement.offsetHeight`：指的是当前元素的__高度__，包含__content，padding，border__的高度值，但不包括__margin__的值。
- `HTMLElement.offsetWidth`：指的是当前元素的__宽度__，包含__content，padding，border__的高度值，但不包括__margin__的值。



## 延伸阅读

[js鼠标事件 clientX、clientY、offsetX、offsetY、layerX、layerY、pageX、 pageY、screenX、screenY](https://blog.csdn.net/Charissa2017/article/details/103863588)