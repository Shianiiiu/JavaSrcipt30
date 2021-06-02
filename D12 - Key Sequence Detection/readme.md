# Key Sequence Detection 输入序列验证 🔬

> 油管视频： [JavaScript KONAMI CODE!](https://www.youtube.com/watch?v=_A5eVOIqGLU&list=PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH&index=13) 📺
>
> 本知识总结参考：[soyainiJavaScript-30 中文练习指南](https://github.com/soyaine/JavaScript30) 、[winar-jin/JavaScript30-Challenge](https://github.com/winar-jin/JavaScript30-Challenge) 🦥



 * [实现效果](#实现效果)
  * [解决思路](#解决思路)
  * [涉及语法](#涉及语法)
  * [过程指南](#过程指南)



## 实现效果

<img src="https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210507224930_D12.png" alt="image-20210507224921985" style="zoom:67%;" />

当在此页面完整输入了“暗号”（一串事先定义好的字符串）时，生成新的 Cornify 特效。

我们从 [Cornify.com](https://www.cornify.com/) 加载一个 JS 文件，调用其中的 `cornify_add()` 方法时，会在页面中追加`div`标签，并在 DOM 中插入一个图标。



## 解决思路

1. 指定可激发特效的字符串
2. 监听并获取输入的字符
3. 处理输入，在符合条件时，调用 cornify



## 涉及语法

- `Array.push()`
- `Array.splice()`
- `Array.join()`



## 过程指南

1、声明空数组`pressed`保存输入的字符，同时声明我们自定义的“暗号”

```js
const pressed = []
const secretCode = 'shian'
```

2、添加键盘监听事件`keyup`，获取键盘的值`e.key`，保存至pressed数组

```js
window.addEventListener('keyup', (e) => {
    //console.log(e.key)
    pressed.push(e.key)
}
```

3、验证输入的字符。此处方法是将每一个输入的字符存入 `pressed` 数组，然后处理数组，使其呈现队列的性质，也就是输入一个字符时，会挤出原有的的字符，保证其最大长度始终为 `secretCode` 的长度。这样做的目的是为了便于验证暗号，只有完整无误的输入一次暗号时，才会触发相应的效果。

```js
pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length); //截取数组
  if (pressed.join('').includes(secretCode)) { //判断是否符合暗号
	console.log('DING DING!');
	cornify_add();
```

