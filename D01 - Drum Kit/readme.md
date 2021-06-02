# Drum Kit 击鼓音效点击🥁

> 油管视频：[Make a JavaScript Drum Kit in Vanilla JS!](https://www.youtube.com/watch?v=VuN8qwZoego&list=PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH&index=1) 📺
>
> 本知识总结参考：[soyainiJavaScript-30 的中文练习指南](https://github.com/soyaine/JavaScript30)🦥



* [实现效果](#实现效果)
* [涉及语法](#涉及语法)
* [解决难点](#解决难点)
  * [1、如何将键盘按键与页面按钮对应起来？](#1如何将键盘按键与页面按钮对应起来)
  * [2、如何保证按键被按住不放时，可以马上响起连续鼓点声？](#2如何保证按键被按住不放时可以马上响起连续鼓点声)
  * [3、如何使页面按钮恢复原状？](#3如何使页面按钮恢复原状)



## 实现效果
![界面展示](https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210423102447_js01_drumkit.png)

## 涉及语法

`字符串 ${ 变量、属性名 } `：模板字面量（Template literals）中用于表示模板字符串的标识。特点是字符串首尾用反引号（`），内部的模板部分用 ${ } 括起来表示，具体请看MDN文档。简单例子如下：
```js
var a = 1;
var b = 2;
//不用模板的写法
console.log("三是" + (a + b) + "不是" + (2 * a + b)); //"三是3不是4"
//使用模板字符串的写法
console.log(`三是${a + b}不是${2 * a + b}`); //"三是3不是4"
```
---
`forEach` 与箭头函数
使用 document.querySelector 获取一组符合 CSS 选择符的元素快照，类型为 NodeList（此对象是对于文档的实时运行的动态查询），对其进行遍历时可采用 forEach 方法。

## 解决难点

### 1、如何将键盘按键与页面按钮对应起来？
连接的帮手是 keydown 事件中的 keyCode 属性，keyCode 属性的值和 ASCII 编码值相同（对应小写字母）。在这个网站可以用按键盘来查看对应的键码。

我们能获取到的初始页面中，按钮 div 和音频 audio 标签中都添加了一个属性 data-key 用于存储对应的键码，这样做的目的是，添加键盘事件监听后，触发键盘事件时即可获取事件的 keyCode 属性值，以此为线索，操作对应的按钮及音频。

```js
const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
```

### 2、如何保证按键被按住不放时，可以马上响起连续鼓点声？

**每次播放音频之前，设置播放时间戳为 0：**
```js
var audio = document.getElementById("video"); 
audio.currentTime = 0;
audio.play();
```
### 3、如何使页面按钮恢复原状？
利用一个叫 `transitionend` 的事件，它在 CSS transition 结束后会被触发。我们就可以利用这个事件，在每次打鼓的效果（尺寸变大、颜色变化）完成之后，去除相应样式。

在这个页面中，发生 transition 的样式属性不止一个（box-shadow, transform, border-color），所以需要添加一个判断语句，使每发生一次按键事件时，只去除一次样式。

```js
funciton remove(event) {
  if (event.propertyName !== 'border-left-color') return;
  this.classList.remove('playing');
  // event.target.classList.remove('playing');
}
```
