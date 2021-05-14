## Adding Up Times with Reduce 时间累加 ⏱

> 油管视频：[How JavaScript's Array Reduce Works](https://www.youtube.com/watch?v=SadWPo2KZWg&list=PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH&index=19) 📺
> 本知识总结摘自：[soyainiJavaScript-30 中文练习指南](https://github.com/soyaine/JavaScript30) 、[winar-jin/JavaScript30-Challenge](https://github.com/winar-jin/JavaScript30-Challenge) 🦥

* [实现效果](#实现效果)
* [涉及语法](#涉及语法)
* [基本思路](#基本思路)
* [过程指南](#过程指南)

## 实现效果

<img src="https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210514151611_D18.png" alt="image-20210514151611086" style="zoom:80%;" />

考察数组的使用，根据设置了`data-time`属性的元素，得到一个时长数组，算出其中的总时长，为多少小时，分钟，秒。



## 涉及语法

- [Array.prototype.map()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Array.prototype.reduce()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
- 扩展语法[...]
- [解构赋值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)



## 基本思路

1. 取得所有`li`中`data-time`属性的值，将时间换算为秒并累加求得总时间（单位：秒）;
2. 手动计算将总时间转化为新的格式“XX小时XX分XX秒”;
3. 将结果显示在页面上。



## 过程指南

1. 获取所有含有`data-time`属性的元素，此处不只针对于`li`标签，所以不直接通过li标签得到`NodeList`

   ```js
   const timeNodes = [...document.querySelectorAll('[data-time]')];
   ```

   由于NodeList 无法使用map()，reduce()等数组方法，需要**将其转成数组类型**。这里使用到ES6中的**扩展语法**`...`将NodeList中的每一项展开到数组中，或者可以借助`Array.from()` 

2. 计算总时长，单位为秒

   ```js
   const timeSeconds = timeNodes
       .map(node => node.dataset.time)
       .map(timeCode => {
         const [mins, secs] = timeCode.split(':').map(parseFloat)
         return (mins * 60) + secs;
       })
       .reduce((total, vidSeconds) => {
         return total + vidSeconds
       })
   ```

   先根据自定义属性得到时间格式的数组；由时间格式字符串分割得到分钟和秒数，需要转成数据类型进行数学运算，得到每一个视频时长数的数据类型数组；将上一步的数组进行累加得到总时长的秒数。

   `const [mins, secs] = timeCode.split(':').map(parseFloat);`:这段代码的作用是将时间戳（“5:40”）先以`:`分开，得到['5','40']这个数组，但是使用`.split(':')`分开的两项分别都是字符串，然后使用`.map(parseFloat)`将这两个字符串转换为float类型。

   `.map(parseFloat)`等同于以下写法：

   ```js
   .map(function(data,i){
     return parseFloat(data);
   });
   ```

3. 总时间格式转换：小时，分钟，秒

   ```js
   const hour = Math.floor(timeSeconds / 3600);
   const sec = timeSeconds % 60;
   const min = (timeSeconds - hour * 3600 - sec) / 60;
   ```

4. 在页面上打印输出（或者直接控制台打印）

   ```js
   console.log(hour+'h '+min+'m '+sec+'s');
   
   let timeSum = document.createElement('h3');
   timeSum.appendChild(document.createTextNode("总时长：" + `${hour}h ${min}m ${sec}s`))
   document.body.appendChild(timeSum)
   ```



