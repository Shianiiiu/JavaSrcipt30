# CSS Clock 时钟⏰

>  油管视频：[CSS + JS Clock in Vanilla JS ](https://www.youtube.com/watch?v=xu87YWbr4X0)📺
>  本知识总结摘自：[soyainiJavaScript-30 的中文练习指南](https://github.com/soyaine/JavaScript30)🦥

[TOC]

### 实现效果

------

![](https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210423100808.gif)

### 解决思路

------

+ 分别获取到当前时间的时、分、秒。

- 通过时分秒对一圈360度，进行映射，确定每一个指针所需旋转的角度。
- 通过CSS的`transform：rotate(deg)`，来实时的调整指针在键盘中的位置。

### 关键语法

------

+ `transform: rotate()` 指针的旋转，旋转角度由获取的时间映射

+ `transform-origin: x-axis y-axis z-axis;` 确定**旋转基点**的位置，默认是中心点，即绕中心旋转。本实例中指针的旋转为右边的端点(`transform-origin: right | 100%`)
+  `setInterval(callback, time)` 利用定时器自动更新时间，每隔一段固定的时间将操作放入执行队列。加入页面后每秒更新一次时间，以实现秒针转动的效果。`time`的单位为毫秒`ms`，所以本实例中取`1000`。

### 解决难点

------

#### 1、自定义指针

+ 指针的长度分别自定义样式，但是右端点要在同一位置

```css
.hand {
	right: 50%;
}
```

+ 指针要保持中心对齐，指针旋转轴与表盘中心要保持重合：给指针设置 `margin-top: -height/2` ，由于每个指针高度不同，所以需要给每个指针指定。

  <img src = 'https://gitee.com/shianiiiu/picgo_bed/raw/master/img/20210423083808.png' width = '400px'/>

#### 2、计算指针的角度

```js
const second = now.getSeconds();
const secondDegree = ((second / 60) * 360) + 90;
secondHand.style.transform = `rotate(${secondDegree}deg)`

const mins = now.getMinutes();
const minDegree = ((mins / 60) * 360) + ((second / 60) * 6) + 90;
minHand.style.transform = `rotate(${minDegree}deg`

const hour = now.getHours();
const hourDegree = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
hourHand.style.transform = `rotate(${hourDegree}deg`
```

由于此页面初始状态中秒针为水平的，所以零点时（时间起始位置）应用到元素上的 `rotate` 旋转角度值应该为 90°。

秒针在转动的过程中，分针会有相应的移动；同理，时阵移动一格30°的过程也是渐进性的。为了模拟更准确的效果，需要加上动态的角度数。

```js
const minDegree = ((mins / 60) * 360) + ((second / 60) * 6) + 90;
const hourDegree = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
```

#### 3、指针跳针问题

当秒针旋转一圈之后回到初始位置，开始第二圈旋转，角度值的变化时 444° → 90° → 96° 由于秒针变换时间只有 0.05s，所以呈现的效果就是秒针闪了一下。解决办法：

##### 方法一

在这个特殊点将指针的 `transition` 属性去掉，由于距离短、时间短，将逆时针回旋的过程瞬间完成。

```js
if (secondDeg === 90) secHand.style.transition = 'all 0s';
else secHand.style.transition = 'all 0.05s';

if (minDeg === 90) minHand.style.transition = 'all 0s';
else minHand.style.transition = 'all 0.1s';
```

##### 方法二

既然引发问题的是角度的大小变化，那就可以对这个值进行处理。此前的代码中，每秒都会重新 new 一个 Date 对象，用来计算角度值，但如果让这个角度值一直保持增长，也就不会出现逆时针回旋的问题了。因此，只在页面第一次加载时 new 一次 Date 对象，此后每秒直接更新角度值。

```js
let secondDeg = 0,
minDeg = 0,
hourDeg = 0;

function initDate() {
	const date = new Date();
	const second = date.getSeconds();
	secondDeg = 90 + (second / 60) * 360;
	const min = date.getMinutes();
	minDeg = 90 + (min / 60) * 360 + ((second / 60) / 60) * 360;
	const hour = date.getHours();
	hourDeg = 90 + (hour / 12) * 360 + ((min / 60) / 12) * 360 + (((second / 60) / 60) / 12) * 360;
}

function updateDate() {
	secondDeg += (1 / 60) * 360;
	minDeg += ((1 / 60) / 60) * 360;
	hourDeg += (((1 / 60) / 60) / 12);
	
	secHand.style.transform = `rotate(${ secondDeg}deg)`;
	minHand.style.transform = `rotate(${ minDeg }deg)`;
	hourHand.style.transform = `rotate(${ hourDeg }deg)`;
}

initDate();
setInterval(updateDate, 1000);
```

### 参考阅读

------

[CSS文档](http://www.ayqy.net/doc/css2-1/cover.html)

[CSS Animation制作时钟教程](https://cssanimation.rocks/clocks/)