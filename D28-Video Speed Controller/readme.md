# Video Speed Controller 视频播放速度控制🕹

> 油管视频：[Build a Experimental Video Speed Controller UI](https://www.youtube.com/watch?v=8gYN_EDMg_M&list=PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH&index=29) 📺
> 本知识总结摘自：[soyainiJavaScript-30 中文练习指南](https://github.com/soyaine/JavaScript30) 、[winar-jin/JavaScript30-Challenge](https://github.com/winar-jin/JavaScript30-Challenge) 🦥



 * [实现效果](#实现效果)
  * [涉及语法](#涉及语法)
  * [总体思路](#总体思路)
  * [过程指南](#过程指南)



## 实现效果

<img src="https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210530201705.gif" alt="speed controller" style="zoom:80%;" />

初始文档中提供了一个视频播放区域（使用的是H5原生的控制器）以及一个表示播放速度的滑块区域。当鼠标移动，滑块跟着上下调节，实时改变视频播放的速度。~~又是这只胖兔子🤦‍♂️~~



## 涉及语法
- 获取位置相关
    - [MouseEvent.pageY](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/pageY)
    - [HTMLElement.offsetHeight](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetHeight)
    - [HTMLElement.offsetTop](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetTop)

- 数值处理相关
    -  [Math.round](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/round)
    - [Number.prototype.toFixed()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)



## 总体思路

通过视频右边的拖动条来控制视频的播放速率，因此首先要监听右侧`speedBar`的`mousemove`事件，然后通过计算鼠标当前所在的位置占滚动条的距离的百分比，通过此百分比映射到播放速率的最大值和最小值，最后改变右侧滚动条的高度`height`和video的`playbackRate`属性即可完成对视频播放速率的控制。



## 过程指南

此次挑战设计的代码量偏简单，直接放上

```js
const video = document.querySelector('.video')
const speed = document.querySelector('.speed')
const bar = document.querySelector('.speed-bar')

speed.addEventListener('mousemove', function (e) {
    const y = e.pageY - this.offsetTop;
    const percent = y / this.offsetHeight;
    const height = Math.round(percent * 100) + '%';
    const min = 0.5;
    const max = 5;
    const playbackRate = (max - min) * percent + min;

    bar.style.height = height;
    bar.textContent = playbackRate.toFixed(1) + 'x';
    video.playbackRate = playbackRate;
})
```

1. 添加鼠标移动监听事件`mousemove`
2. 获取移动鼠标的位置，相对speed容器的纵坐标y
3. 计算移动位置相对容器高度的百分比例
4. 根据比例映射到设置的播放速度最小到最大的范围，根据不同的位置计算得到速度大小
5. 设置speedbar的高度和视频的播放速度

<br>

🤡**Tips**:  鼠标移动的回调函数可以分离开来，或者如上述示例给出`function(){}` 。但注意：如果在函数中使用`this`关键字，<u>建议不要使用箭头函数</u>，因为es6的箭头函数会绑定父级作用域，若在这种情况下使用箭头函数会发生意外的错误，this会指向window对象。

