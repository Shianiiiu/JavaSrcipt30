# Follow Along Link Highlighter 🖍

> 油管视频：[Follow Along Links](https://www.youtube.com/watch?v=POP_qri7RA8&list=PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH&index=22) 📺
>
> 本知识总结参考：[soyainiJavaScript-30 中文练习指南](https://github.com/soyaine/JavaScript30) 、[winar-jin/JavaScript30-Challenge](https://github.com/winar-jin/JavaScript30-Challenge) 🦥



* [实现效果](#实现效果)
* [涉及语法](#涉及语法)
* [相关知识](#相关知识)
* [过程指南](#过程指南)
* [问题解决](#问题解决)



## 实现效果

<img src="https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210522095823_D22.gif" alt="link highlight" style="zoom:80%;" />

当鼠标移动至某个对应标签上时，为标签添加一个白色的背景框，高亮表示该标签被选中。当鼠标移动至其他标签后，白色背景框不消失，而是直接跟随鼠标平移至新的标签。



## 涉及语法
- CSS
    - transform: translate(X,Y)
    - background: linear-gradient()
    - hsla色彩模式
- JS
    - document.createElement()
    - body.appendChild()
    - window.scrollX/scrollY
    - 监听事件mouseenter
    - [Element.getBoundingClientRect()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)



## 相关知识

**Element.getBoundingClientRect()**  [MDN参考](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)

返回值是一个 [`DOMRect`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMRect) 对象，这个对象是由该元素的 [`getClientRects()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getClientRects) 方法返回的一组矩形的集合，就是该元素的 CSS 边框大小。返回的结果是包含完整元素的最小矩形，并且拥有`left`, `top`, `right`, `bottom`, `x`, `y`, `width`, 和 `height`这几个以像素为单位的只读属性用于描述整个边框。除了`width` 和 `height` 以外的属性是相对于视图窗口的左上角来计算的。

[DOMRect相关属性](https://developer.mozilla.org/zh-CN/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIDOMClientRect)

| Attribute | Type    | Description                                                  |
| --------- | ------- | ------------------------------------------------------------ |
| `bottom`  | `float` | Y 轴，相对于视口原点（viewport origin）矩形盒子的底部。**只读。** |
| `height`  | `float` | 矩形盒子的高度（等同于 bottom 减 top）。**只读。**           |
| `left`    | `float` | X 轴，相对于视口原点（viewport origin）矩形盒子的左侧。**只读。** |
| `right`   | `float` | X 轴，相对于视口原点（viewport origin）矩形盒子的右侧。**只读。** |
| `top`     | `float` | Y 轴，相对于视口原点（viewport origin）矩形盒子的顶部。**只读。** |
| `width`   | `float` | 矩形盒子的宽度（等同于 right 减 left）。**只读。**           |
| `x`       | `float` | X 轴，相对于视口原点（viewport origin）矩形盒子的左侧。**只读。** |
| `y`       | `float` | Y 轴，相对于视口原点（viewport origin）矩形盒子的顶部。**只读。** |



## 过程指南

1. 需要显示白色动画背景的都是`a`标签，因此首先获取到能够触发事件的DOM元素：

   ```js
   const triggers = document.querySelectorAll('a');
   ```

2. 明确高亮显示的设计——一个`span`标签，相对于文档绝对定位，宽高由被高亮显示的元素决定，所以需要动态监听获取：

   ```js
   const highlight = document.createElement('span');
   highlight.classList.add('highlight');
   document.body.appendChild(highlight);
   ```

3. 使用`Element.getBoundingClientRect()方法`获得对应标签的位置信息：

   ```js
   function highlightlink(){
       // console.log(this)
       const linkCoords = this.getBoundingClientRect();
       // console.log(linkCoords)
   
       const coords = {
       width: linkCoords.width,
       height: linkCoords.height,
   
       //top和left值受滚动条的影响，linkCoords.top/left相对于视口的左上角，而span元素则相对于网页的左上角
       top: linkCoords.top + window.scrollY,
       left: linkCoords.left + window.scrollX
   };
   ```

4. 设置高亮块的样式属性：

   ```js
   highlight.style.width = `${coords.width}px`;
   highlight.style.height = `${coords.height}px`;
   highlight.style.transform = `translate(${coords.left}px,${coords.top}px)`
   ```

5. 将高亮函数与标签的鼠标移入事件绑定，触发监听事件：

   ```js
   triggers.forEach(item => {
   	item.addEventListener('mouseenter',highlightlink);
   });
   ```



## 问题解决

页面进行滚动的时候，span元素是相对网页的左上角，而我们触发a标签获取的位置信息是相对于视口的左上角。

因此我们改变`top`和`left`的值的时候，应该把`window.scrollX`和`window.scrollY`加上。

```js
top: linkCoords.top + window.scrollY,
left: linkCoords.left + window.scrollX
```

