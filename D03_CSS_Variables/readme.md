# CSS Variables 全局变量 🖐

>  油管视频：[CSS Variables ](https://www.youtube.com/watch?v=AHLNzv13c2I&list=PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH&index=4)📺
> 本知识总结摘自：[soyainiJavaScript-30 的中文练习指南](https://github.com/soyaine/JavaScript30)🦥

[TOC]

 * [实现效果](#实现效果)
    * [解决思路](#解决思路)
    * [过程指南](#过程指南)
      * [CSS 部分准备](#css-部分准备)
      * [JS 实时更新 CSS 值](#js-实时更新-css-值)
    * [关键语法](#关键语法)
        * [1、全局自定义变量 \-\-ex: xxx;](#1全局自定义变量---ex-xxx)
        * [2、filter: blur() CSS滤镜](#2filter-blur-css滤镜)
        * [3、HTML5 中的自定义数据属性 dataset](#3html5-中的自定义数据属性-dataset)
        * [4、监听事件change、mousemove](#4监听事件changemousemove)
        * [5、label标签](#5label标签)
    * [解决难点](#解决难点)
        * [1、如何用 JavaScript 改变CSS变量值？](#1如何用-javascript-改变css变量值)
        * [2、如何处理参数值单位（一个有 px 、另一个没有）](#2如何处理参数值单位一个有-px-另一个没有)

### 实现效果

------



![image-20210424164523047](https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210424164530.png)

**动图演示GIF**

![css var](https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210424164700_D03_CSS_Var.gif)

### 解决思路

---

- 首先先在CSS中定义变量，并在页面样式中对页面变量进行关联。

- 使用JavaScript实时获取变量的值，并更新CSS全局属性的值，实时改变页面的效果。

  

### 过程指南

---

#### CSS 部分准备

1. 声明全局（`:root`）的 CSS 变量
2. 将变量应用到页面中对应元素 `<img>`
3. 处理标题的 CSS 值

#### JS 实时更新 CSS 值

1. 获取页面中 `input` 元素

2. 给每个 `input` 添加监听事件，使其在值变动，触发更新操作

3. 同 2 ，添加鼠标滑过时的事件监听

4. 编写处理更新操作的方法

   + 获取参数值后缀

   - 获取参数名（blur、spacing、color）
   - 获取参数值（12px、#efefef）
   - 赋值给对应的 CSS 变量

### 关键语法

---

##### 1、全局自定义变量 `--ex: xxx;`

在伪类`:root`中声明，即**根元素**`html`中，使用时用`var(--ex)`引用，即变量形式（[CSS Variables](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)）

##### 2、`filter: blur()` CSS滤镜

可以通过使用滤镜达到不同的视觉效果，比较像PS中的滤镜。滤镜通常用于调整图像，背景或边框的绘制。可以一次设置一个滤镜也可以同时设置多个滤镜，常见的滤镜有模糊滤镜`blur()`,透明度滤镜`opacity()`,灰度滤镜`grayscale()`等。（[CSS filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)）

##### 3、HTML5 中的自定义数据属性 `dataset`

HTML5 中可以为元素添加非标准的自定义属性，只需要加上 `data-` 前缀，可以随便添加和命名。添加之后，可以通过元素的 `dataset` 属性来访问这些值，`dataset` 的值是 DOMStringMap 的一个实例化对象，其中包含之前所设定的自定义属性的“名-值”对。

##### 4、监听事件`change`、`mousemove`

有监听元素`change`事件，是因为`color`。当改变了颜色的值时，只监听`mousemove`事件，无法实时的改变颜色。

##### 5、`label`标签

`label`标签为`inpu`t元素服务，用作定义标记，主要和**表单控件**进行绑定，分为显式和隐式。

+ 隐式绑定

  将表单控件作为label的内容，用label标签包裹表单控件：

  ```html
  <lable>Date: <input type="text" name="Date"/></label>
  ```

+ 显式绑定

  为标签下的`for`属性命名一个目标表单的`id`：

  ```html
  <label for="spacing">Spacing:</label>
  <input id="spacing">
  ```

如果在label元素内点击文本，就会触发此控件。就是说，**当用户渲染该标签时，浏览器就会自动将焦点转到和标签相关的表单控件上**。比如“男女”radio的选择上，点击男或女会勾选选框，输入密码时点击密码自动fucous，显示输入光标。

### 解决难点

---

##### 1、如何用 JavaScript 改变CSS变量值？

在 JavaScript 中 `document.documentElement` 即代表文档根元素。所以要改变全局的 CSS 变量如下：[参考文档](https://developer.mozilla.org/en/docs/Web/API/Document/documentElement)

```js
document.documentElement.style.setProperty('--base', '#fff');
```

##### 2、如何处理参数值单位（一个有 px 、另一个没有）

运用 `dataset` 储存后缀，有 px 后缀的标签中设置 `<input data-sizing: px>`：

```html
<input type="range" name="blur" min="0" max="25" value="10" data-sizing="px">
<input type="color" name="base" value="#8aa8af">
```

`--blue`和`--sapcing`变量有属性，而`--base`属性没有，因此设置一变量保存他们的后缀作为单位，若无单位，则设置为空。即`const suffix = this.dataset.sizing || ' ';`，再通过`this.value + suffix`就可以正确的设置CSS属性的值。