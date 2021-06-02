## Sort Without Articles 数组去前缀排序 🎢

> 油管视频：[Sorting Band Names without articles](https://www.youtube.com/watch?v=PEEo-2mRQ7A&list=PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH&index=18) 📺
>
> 本知识总结参考：[soyainiJavaScript-30 中文练习指南](https://github.com/soyaine/JavaScript30) 、[winar-jin/JavaScript30-Challenge](https://github.com/winar-jin/JavaScript30-Challenge) 🦥



* [实现效果](#实现效果)
* [涉及语法](#涉及语法)
* [基本思路](#基本思路)
* [过程指南](#过程指南)
* [知识积累](#知识积累)

## 实现效果

<img src="https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210514133813_D17.png" alt="image-20210514133805515" style="zoom:50%;" />

为字符串数组排序，要求去除字符串中的`The`，`A`以及`An`的前缀后再进行排序，并把排序后的结果作为列表项展示在无序列表中。



## 涉及语法

- [Array.prototype.sort()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [String.prototype.replace()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)



## 基本思路

1. 基本的编程任务有两个要点，即排序和展示;
2. 数组排序部分最外层即为`Array.sort(arr)`函数，内层实现具体排序规则;
3. 展示部分即将排列好的新数组拼接成带有标签的HTML元素，然后一次性插入到列表中。



## 过程指南

1. 声明去前缀函数，使用`String.replace()`函数实现，第一参数使用字面量正则表达式。

   ```js
   function strip(bandname) {
       return bandname.replace(/^(a |the |an )/i, '').trim();
   }
   ```

   replace可以接受两个参数，第一个参数可以是一个**正则表达式**或者**待替换子串**，第二个参数为**新字符串**或者**函数（调用它能够产生新的子串）**。返回替换之后的**新字符串**。

2. 使用`Array.sort()`对数组进行排序，将数组中逐项使用`strip()`去掉前缀后再进行对比。

   ```js
   const sortedBands = bands.sort(function(a, b){
       return strip(a) > strip(b) ? 1 : -1
   });
   ```

   虽然是strip()函数作用之后再进行排序比较，但是原数组中的元素并不会被去掉前缀。

3. 使用选择器选中无序列表`#bands`，将排序后的数组作为列表项插入其中。



## 知识积累

1. `Array.prototype.sort(*param*)`方法虽然有返回值，但排序结果**也影响原数组**，在非ES6版本的代码中，我们使用了指向原数组的变量`bands`,而在ES6版本的代码中将排序后的结果赋值给了新的变量sortedbands，从结果可以看出，两者达到了相同的目的。

2. 在ES6版本的代码结尾处，我们修改原数组`bands`中的第一项，并在控制台打印出排序后的数组`sortedbands`，从结果可以看出`sortedbands`也受到了影响，由此可以看出`Array.prototype.sort()`函数**只是返回了一个指向原数组的引用，而并没有生成新的数组**。