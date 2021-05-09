# Fun HTML5 Canvas 彩虹笔绘画板 🎨

> 油管视频：[fun with HTML5 Canva](https://www.youtube.com/watch?v=8ZGAzJ0drl0) 📺
> 本知识总结摘自：[soyainiJavaScript-30 中文练习指南](https://github.com/soyaine/JavaScript30) 、[winar-jin/JavaScript30-Challenge](https://github.com/winar-jin/JavaScript30-Challenge) 🦥



* [实现效果](#实现效果)
* [涉及语法](#涉及语法)
* [过程指南](#过程指南)
* [知识积累](#知识积累)
  * [<a href="https://developer\.mozilla\.org/zh\-CN/docs/Web/API/Canvas\_API" rel="nofollow">Canvas</a>](#canvas)
  * [设置彩虹笔绘——HSL](#设置彩虹笔绘hsl)
* [解决疑难](#解决疑难)
  * [1、按下鼠标作画，松开可以随意移动？](#1按下鼠标作画松开可以随意移动)
  * [2、作画的线条保持线性连续？](#2作画的线条保持线性连续)
  * [3、每次作画的起点从点击之处开始？](#3每次作画的起点从点击之处开始)
  * [4、线条粗细的渐变？](#4线条粗细的渐变)
* [延伸思考](#延伸思考)
  * [1、触摸操作的事件处理](#1触摸操作的事件处理)

### 实现效果

---

![image-20210501171651324](https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210501171651.png)



### 涉及语法

---

Canvas：

- 基本属性
  - `getContext()`
  - `strokeStyle`
  - `fillStyle`
  - `lineCap`
  - `lineJoin`
- 路径绘制
  - `beginPath()`
  - `lineTo()`
  - `moveTo()`

鼠标事件处理：

- `mousemove`
- `mousedown`
- `mouseup`
- `mouseout`



### 过程指南

---

1. 获取 HTML 中的 `<canvas>` 元素，并设定宽度和高度
2. `.getContext('2d')` 获取上下文，下面以 ctx 表示
3. 设定 ctx 基本属性
   - 描边和线条颜色
   - 线条宽度
   - 线条末端形状
4. 绘画效果
   1. 设定一个用于标记绘画状态的变量
   2. 鼠标事件监听，不同类型的事件将标记变量设为不同值
   3. 编写发生绘制时触发的函数，设定绘制路径起点、终点
5. 线条彩虹渐变效果（运用 hsl 的 `h` 值的变化，累加）
6. 线条粗细渐变效果（设定一个范围，当超出这个范围时，线条粗细进行逆向改变



### 知识积累

---

#### [Canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)

创建一个可以绘画的环境，由对某个元素获取其用于渲染的上下文开始：

```js
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
```

**绘制的样式**：

- `lineCap`：笔触的形状，有 round | butt | square 圆、平、方三种。
- `lineJoin`：线条相较的方式，有 round | bevel | miter 圆交、斜交、斜接三种。
- `lineWidth`：线条的宽度
- `strokeStyle`：线条描边的颜色
- `fillStyle`：填充的颜色

**路径绘制**：

- `beginPath()`：新建一条路径
- `stroke()`：绘制轮廓
- `moveTo()`：（此次）绘制操作的起点
- `lineTo()`：路径的终点

[MDN 路径绘制方法](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#%E7%BB%98%E5%88%B6%E8%B7%AF%E5%BE%84)



<hr>

#### 设置彩虹笔绘——HSL

[**HSL 色彩模式**](https://baike.baidu.com/item/HSL/1443144)：`hue`（色相）、`saturation`（饱和度）、`lightness`（亮度）

这个网站 [http://mothereffinghsl.com](http://mothereffinghsl.com/) 感受一下 HSL 不同色彩值对应的效果。

- H(hue) 代表色调，取值为 0~360，专业术语叫色相
- S 是饱和度，可以理解为掺杂进去的灰度值，取值为 0~1
- L 则是亮度，取值也是 0~1，或者百分比。

```js
let hue = 0;

ctx.strokeStyle = `hsl(${ hue }, 100%, 50%)`;	
if(hue >= 360) hue = 0;
hue++;
```



### 解决疑难

---

#### 1、按下鼠标作画，松开可以随意移动？

添加鼠标移动的监听事件 `mousemove`，但只有在按下鼠标后移动鼠标才能显示画笔，所以再添加事件 `mousedown`。在这里借助一个变量，进行判断是否作画，即callback `draw()`函数：

```js
let isDrawing = false;

canvas.addEventListener('mousedown', isDrawing = true);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false); // 鼠标移出画布范围时
```

#### 2、作画的线条保持线性连续？

引入两个变量：`lastX`, `lastY` 保存上一次鼠标的移动到的位置：

`[lastX, lastY] = [e.offsetX, e.offsetY]`

```js
let lastX = 0;
let lastY = 0;

function draw() {
    ctx.beginPath();
    // 起点
    ctx.moveTo(lastX, lastY);
    // 终点
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];	
}
```

#### 3、每次作画的起点从点击之处开始？

由于回调draw函数是在mousemove事件监听过程中，最后一次更新`lastX`, `lastY` 在每一次鼠标移动的最后坐标点。重新移动鼠标开始绘制时，会从上一次的结束处引出一条线段，产生bug。

所以要实现每次绘制时从当前的起点开始：**鼠标点击事件先于鼠标移动**，**在点击的监听事件中更新`lastX`, `lastY` 为当前的坐标点。**

```js
canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        lastX = e.offsetX;
        lastY = e.offsetY;
        // [lastX, lastY] = [e.offsetX, e.offsetY]
 })
```

#### 4、线条粗细的渐变？

和画笔的颜色变化一样，只要对`lineWidth`属性进行累加，设置标记变量决定是变粗还是变细：

```js
let direction = true;
ctx.lineWidth = 80;

// 控制笔触大小
if(ctx.lineWidth > 100 || ctx.lineWidth < 1) {
	direction = !direction;
} 
if (direction) {
	ctx.lineWidth++;
} else {
	ctx.lineWidth--;
}
```

### 延伸思考

---

#### 1、触摸操作的事件处理

触摸事件中可以获取到的坐标属性名，与鼠标事件不相同，如果要同时支持触摸绘图，需要判断事件类型

```js
// 处理鼠标点击操作
if(e.type == "mousemove"){
	x = e.offsetX;
	y = e.offsetY;
} else  {
// 处理触摸屏操作
	x = e.changedTouches[0].clientX;
	y = e.changedTouches[0].clientY;
}
```

