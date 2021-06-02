# Dev Tools Domination 浏览器console调试 🛠

> 油管视频： [14 Must Know Chrome Dev Tools Tricks ](https://www.youtube.com/watch?v=xkzDaKwinA8) 📺
>
> 本知识总结参考：[soyainiJavaScript-30 中文练习指南](https://github.com/soyaine/JavaScript30) 、[winar-jin/JavaScript30-Challenge](https://github.com/winar-jin/JavaScript30-Challenge) 🦥

 * [实现效果](#实现效果)
  * [过程指南](#过程指南)
      * [给页面节点添加断点](#给页面节点添加断点)
      * [\.log 的更多用法](#log-的更多用法)
      * [不同样式输出](#不同样式输出)
      * [打印输出 DOM 元素](#打印输出-dom-元素)
      * [清空 console 面板输出内容](#清空-console-面板输出内容)
      * [console\.asset 方法进行测试](#consoleasset-方法进行测试)
      * [打印表格](#打印表格)
      * [分组打印](#分组打印)
      * [count 计数](#count-计数)
      * [time 计时](#time-计时)
  * [延伸阅读](#延伸阅读)



## 实现效果

![image-20210503101001003](https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210503101001_D09_CONSOLE.png)

## 过程指南

#### 给页面节点添加断点

在按 F12 出现的 Chrome 开发工具中，在 Elements 选项卡之中，选择页面的某个标签（以

为例），右键 → Break on → Attributes modifications。即可为该元素添加断点，当它的属性发生改变时，会自动定位到页面代码中的对应行。

此时点击页面上的`p`元素就可以看到效果。

通过定位到代码中相应的行就可以很方便的对页面进行调试。

#### `.log` 的更多用法

这个是最常用的，但它还有一些更多功能：比如参数支持类似 C 语言的字符串替换模式。

- `%s` 字符串
- `%d` 整数
- `%f` 浮点值
- `%o` Object
- `%c` 设定输出的样式，在之后的文字将按照第二个参数里的值进行显示

```js
console.log("输出一个字符串 %s ", "log");
console.log("输出一个整数是 %d ", 1.23); //1
console.log("输出一个小数是 %f ", 1.23); //1.23
console.log("%c不同样式的输出效果", "color: #00fdff; font-size: 2em;");
```

#### 不同样式输出

```js
// warning!
console.warn("三角感叹号图标，淡黄色背景")
// Error :|
console.error("红叉图标，红字红色背景");
// Info
console.info("蓝色圆形感叹号图标");
```

- `console.warn(String)` 输出警告信息，Console面板上面在文字前面显示黄色警告图标：⚠️，点击该警告消息会出现当前的程序栈的状态。
- `console.error(String)` 输出错误信息，Console面板上面在文字前面显示红色错误图标：❌，点击该错误消息会出现当前的程序栈的状态。
- `console.info(String)` 输出常规信息，Console面板上面在文字前面显示蓝色图标：ℹ，点击该蓝色消息会出现当前的程序栈的状态。

#### 打印输出 DOM 元素

获取 DOM 元素之后，也可以打印输出。

```js
const p = document.querySelector('p');
console.log(p);
console.dir(p);
```

`log` 输出这个 DOM 的 HTML 标签，而 `dir` 则会输出这个 DOM 元素的属性列表。

#### 清空 console 面板输出内容

清空已经打印输出的内容，有两种方式，一种是 JavaScript 语句： `console.clear()`。另一个是快捷键 `Ctrl ＋ L`。

#### console.asset 方法进行测试

`console.asset(arg1,arg2)`方法接受一个表达式作为参数，如果参数返回值是 false，则会输出第二个参数中的内容。

#### 打印表格

`console.table()`方法，可以将数组、对象以表格的形式打印输出，如果只输出其中的某一列，可以加上第二个参数

```js
console.table(dogs);
console.table(dogs, ["age"]);
```

![image-20210503101722470](https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210503101722.png)

#### 分组打印

```js
const dogs = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 }];
dogs.forEach(dog => {
	console.group();		
//	console.groupCollapsed();  // 收起列表
	console.log(`${dog.name}`);
	console.log(`${dog.age}`);
	console.log(`${dog.name} 有 ${dog.age} 岁了`);
	console.groupEnd();
});
```

`group()`/`groupCollapsed()` 与 `groupEnd()` 之间的内容会自动分组，区别在于是否自动展开

#### `count` 计数

通过`console.count()`可以对输出的对象进行计数。但需要注意的是这里的计数对象仅限于由 count() 输出的内容，并非所有 console 中的输出。

#### `time` 计时

用 `time("name")` 和 `timeEnd("name")` 分别控制开始点和结束点，它们两的参数表示当前计时的名称，可以自定义但需要保持相同

```js
console.time('fetch my data');
fetch("https://api.github.com/users/shianiiiu")
  .then(data => data.json())
  .then(data => {
  console.timeEnd('fetch my data');
  console.log(data);
});
```

打印输出`fetch my data: *ms`标签

如果 `timeEnd` 中的名称如果和上面不一样，得到的数据是系统当前时间换算后的毫秒值。

## 延伸阅读

[console 对象于控制台](https://wangdoc.com/javascript/features/console.html)

