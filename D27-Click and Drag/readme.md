# Click and Drag Slider 点击拖拽滑屏 ↔

> 油管视频：[JavaScript Interface : Click and Drag to Scroll](https://www.youtube.com/watch?v=C9EWifQ5xqA&list=PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH&index=28) 📺
> 本知识总结摘自：[soyainiJavaScript-30 中文练习指南](https://github.com/soyaine/JavaScript30) 、[winar-jin/JavaScript30-Challenge](https://github.com/winar-jin/JavaScript30-Challenge) 🦥



 * [实现效果](#实现效果)
  * [涉及语法](#涉及语法)
  * [过程指南](#过程指南)
  * [延伸阅读](#延伸阅读)



## 实现效果

<img src="https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210529152130_D27.gif" alt="drag scroll" style="zoom:80%;" />

鼠标点击拖动，数字卡片跟着左右方向进行水平移动。



## 涉及语法

- CSS
  - [perspective](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective) （you again😑）
  - overflow-x: scroll
  - [white-space: nowrap](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space)
  - cursor: grabbing ——（鼠标变成小拳拳）
  - display: inline-flex
  - [:nth-child(*an* + *b*)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-child) ——（n从0开始，但是子元素的下标从1开始）
  - transform
    - [scaleX()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/scaleX())
    - [rotateY()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/rotateY())
- JS
  - [鼠标事件 MouseEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent)
  - [Element.srcollLeft](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollLeft)
  - [HTMLElement.offsetLeft](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetLeft)



## 过程指南

1. 在数字卡片的容器上监听鼠标按下、移动、移出、松开等事件；

2. 在slider上面移动触发的事件需要在鼠标按下之后，设置一个标志变量isDown，表明是否鼠标按下；

   ```js
   let isDown = false;
   
   slider.addEventListener('mousedown', (e) => {isDown = true;})
   slider.addEventListener('mouseleave', () => {isDown = false;})
   slider.addEventListener('mouseup', () => {isDown = false;})
   slider.addEventListener('mousemove', (e) => {
   	if(!isDown) return;
   })
   ```

   通过结合鼠标按下和鼠标移动事件，达到鼠标点击拖拽的效果。

3. 鼠标点击后，获取点击的开始位置，这个位置是**相对容器的位置**；鼠标移动，实时动态获得鼠标的位置（同前）；根据开始位置和中间的移动位置，得到移动的距离（末减初）；

   ```js
   //鼠标点击事件
   startX = e.pageX - slider.offsetLeft;
   
   //鼠标移动事件
   const x = e.pageX - slider.offsetLeft;
   const walkX = (x - startX) * 3;   //乘3是为了让移动的步伐更大一些，拖拽时更灵敏
   ```

   - 要得到鼠标当前点相对于容器的左边的水平距离可以用`e.pageX - slider.offsetLeft`来求得，这里`e.pageX`是当前点相对于浏览器左边框的距离， `slider.offsetLeft`是当前容器相对于浏览器左边框的距离，两者相减即可得到鼠标当前点相对于容器的左边的水平距离。

4. 更新容器在水平方向上的滚动距离，从而实现拖动；

   ```js
   //鼠标点击事件
   scrollLeft = slider.scrollLeft;
   
   //鼠标移动事件
   slider.scrollLeft = scrollLeft - walkX;
   ```

   - 鼠标按下后先得到容器的水平滚动距离（可以根据下面的滚动条的位置判断），也就是初始化
   - 鼠标移动，之前已经得到了`walkX`，即鼠标的移动距离（负值就是往左移动，slider的滑动效果也就是往右），更新容器得水平滚动距离（用减法，可以自行体会）
   - 如果没有第一步的初始化，水平滚动距离单单只是鼠标的移动距离，那拖动一次后又点击拖动会从起始部分开始，无法保存上一次拖动后的状态。

   

## 延伸阅读

[CSS3中透视perspective](https://www.cnblogs.com/le220/p/7923210.html)

