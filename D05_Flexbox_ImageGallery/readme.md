# Flexbox Image Gallery 可伸缩图片墙🖼

> 油管视频：[Flexbox + JavaScript Image Gallery ](https://www.youtube.com/watch?v=9eif30i26jg&list=PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH&index=6)📺
> 本知识总结摘自：[soyainiJavaScript-30 中文练习指南](https://github.com/soyaine/JavaScript30) 、[winar-jin/JavaScript30-Challenge](https://github.com/winar-jin/JavaScript30-Challenge) 🦥



* [实现效果](#实现效果)

* [相关语法](#相关语法)
  * [<a href="https://developer\.mozilla\.org/zh\-CN/docs/Web/CSS/CSS\_Flexible\_Box\_Layout/Using\_CSS\_flexible\_boxes" rel="nofollow">Flexbox</a>](#flexbox)
    * [针对 Flex items 的特性（Children）](#针对-flex-items-的特性children)
    * [针对 Flex container 的特性（Parent）](#针对-flex-container-的特性parent)
  * [Flex指南教程](#flex指南教程)
* [延伸思考](#延伸思考)
  * [1、双击点击图片出现bug](#1双击点击图片出现bug)
  * [2、防止同时多张图片点击放大](#2防止同时多张图片点击放大)

### 实现效果

---

![image-20210426120409438](https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210426120417.png)

**动图GIF：**

![flex panel ](https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210426120545.gif)



### 相关语法

---

- display: flex
  - flex-direction
  - justify-content
  - align-items
- transform: translateX/translateY
- element.classList.toggle()
- transitionend 事件

<br>

#### [Flexbox](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)

这一个挑战的关键部分就在于理解如何使用 Flexbox，挑战的文档里嵌套了**三个 flex 容器**，作为弹性盒子，它们各自的作用是：

- `.panels`：使其中的 `.panel` 按横向的 flex 等分排布（此处为五等分）
- `.panel`：使其中的 `<p>` 按纵向的 flex 等分排布（此处为三等分）
- `p` ：借用 flex 相对于主轴及侧轴的对齐方式，使其中的文字垂直水平居中

##### 针对 Flex items 的特性（Children）

- `flex-growth`：伸展值
- `flex-shrink`：可接受的压缩值
- `flex-basis`：元素默认的尺寸值
- `flex`：以上三个值按顺序的缩写

##### 针对 Flex container 的特性（Parent）

- `display: flex`：将这个元素设置成弹性盒子
- `flex-direction`：主轴方向
  - `row`：横向
  - `column`：纵向
- `justify-content`：沿主轴的的对齐方式
- `align-items`：沿侧轴的对齐方式
- `align-content`：子元素中文本沿侧轴的对齐方式（只有一行时无效）

<br>

#### Flex指南教程🥽

+ [阮一峰Flex教程](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

+ [CSS-TRICKS Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

下面几个地方试一下 Flex 的各种特性：

- http://demo.agektmr.com/flexbox/
- http://the-echoplex.net/flexyboxes/
- http://codepen.io/justd/pen/yydezN

<br>

### 延伸思考

---

#### 1、双击点击图片出现bug

在 Wes Bos的解决方案中，用了两种 `class` 值来分别控制 `div` 元素和 `p` 元素的动画，这就会造成一个问题，当快速点击两下时，会出现相反的组合（图片缩小 + 上下文字出现）。

那为什么还要将文字的移动动画用 `.open-actived` 这个类来控制，同时还多加上了一个 `transitionend` 的事件监听，而不是直接用 `.open` 控制文字的移动，并且只采用一个 `click` 事件监听呢？

我试了一下，发现如果将要触发的文字移动（`transform`）用 `.open` 来控制，那么会出现有点不协调的状况。

为何要多添加一个 [`transitioned` 的事件监听](https://developer.mozilla.org/zh-CN/docs/Web/Events/transitionend)，这个事件会在 `transition` 结束之后被触发，所以目的是先让图片的压缩拉伸完成，再移动文字。

**解决方法：**

```css
.panel > * {
	/* ... */
	transition:transform 0.5s 0.7s;
}

/* 修改 .open-actived -> .open*/
.panel.open p:first-child {
	transform: translateY(0);
}

.panel.open p:last-child {
	transform: translateY(0);
}
```

```js
const panels = document.querySelectorAll('.panel');

function toggleOpen(e) {
    this.classList.toggle('open');
}

panels.forEach( panel => panel.addEventListener('click', toggleOpen, false));
// 去掉对于 transitionend 的事件监听
```

解决思路是让 `p` 标签的文字动画效果延迟一下，添加 `transition` 属性的 `delay` 值

#### 2、防止同时多张图片点击放大

在每一次点击，放大图片之前，先清除每一个div的`.open`类，在进行`.open`的toggle，便可达到此效果。

```js
const panels = document.querySelectorAll('.panel');
function clearOpenClass(){
    panels.forEach(panel => panel.classList.remove('open'));
}
function toggleOpen() {
if(this.classList.contains('open')){
    clearOpenClass();
    this.classList.remove('open');
}else{
    clearOpenClass();
    this.classList.add('open');
}
// this.classList.toggle('open');
}
function toggleActive(e) {
//   console.log(e.propertyName);
if (e.propertyName.includes('flex')) {
    this.classList.toggle('open-active');
}
}
panels.forEach(panel => panel.addEventListener('click', toggleOpen));
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));
```

