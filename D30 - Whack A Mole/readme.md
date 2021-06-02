# Whack A Mole 打地鼠 🕳🐹

> 油管视频：[Make a Whack A Mole Game with Vanilla JS](https://www.youtube.com/watch?v=toNFfAaWghU&list=PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH&index=30) 📺
>
> 本知识总结参考：[soyainiJavaScript-30 中文练习指南](https://github.com/soyaine/JavaScript30) 、[winar-jin/JavaScript30-Challenge](https://github.com/winar-jin/JavaScript30-Challenge) 🦥



 * [实现效果](#实现效果)
  * [涉及语法](#涉及语法)
  * [总体思路](#总体思路)
  * [过程指南](#过程指南)
  * [延伸思考](#延伸思考)
  * [写在最后](#写在最后)



## 实现效果

<img src="https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210602154022.gif" alt="whack mole" style="zoom:80%;" />

本挑战为收官任务，Wes很贴心地在最后一节给我们呈现一个欢快的童年游戏：**打地鼠** 💛



## 涉及语法

- [Math.random()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
- [window.setTimeout](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout)
- [Event.isTrusted](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/isTrusted)
- [Node.textContent](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent#%E4%B8%8E_innerText_%E7%9A%84%E5%8C%BA%E5%88%AB)



## 总体思路

- 地鼠随机出现，地鼠出现持续的时间随机
- 设置游戏时长，借助定时器，根据布尔值timeUp是否停止游戏
- 点击地鼠后，添加分数，且地鼠消失（但根据实验，若在随机时间范围内打到了地鼠，会等到该时间结束，视觉上有卡顿的现象）
- 设置一个开始函数，清空分数，清空游戏结束倒计时（即初始化timeUp的布尔值）



## 过程指南

1. 获取随机地鼠、地鼠持续出现的随机时间

   ```js
   function randomTime(min, max) {
   	return Math.round(Math.random() * (max - min) + min);
   }
   ```
   `Math.round(Math.random() * (max - min) + min);`：生成某个范围里的随机数，用大值减小值，再加上小值。
   
   ```js
   function randomHole() {
       const index = Math.floor(Math.random() * holes.length);
       const hole = holes[index];
   
       if (hole === lastHole) {
       	return randomHole()
       }
   
       lastHole = hole;
       return hole;
   }
   ```

   中间的`if`判断是防止连续随机出现同样的地鼠，借助`lastHole`保存上一次地鼠出现的洞口，如果连续出现，则重新运行`randomHole()`

2. 设置地鼠出现、消失的动作，借助CSS样式动态添加或移除一个类

   ```css
   .mole {
   	top: 100%;
   }
   
   .hole.up .mole {
     top: 0;
   }
   ```

   地鼠mole绝对定位，一开始top为100%，在底端；当添加up类后，top变为0提升到顶端

   ```js
   function peep() {
       const time = randomTime(200, 800);
       const hole = randomHole();
       hole.classList.add('up')
       //到时间就消失，使用定时器
       setTimeout(() => {
           hole.classList.remove('up');
           if (!timeUp) {
           	peep();
           }
       }, time)
   }
   ```

   设置定时器，控制地鼠出现维持的时间；且在游戏停止之前（`!timeUp`），不断运行peep函数，地鼠就接连不断地探出头。

3. 开始游戏函数，进行一系列初始化工作，此处设置的游戏时间为10s

   ```js
   function startGame() {
       scoreBoard.textContent = 0;
       timeUp = false;
       score = 0;
       peep();
       setTimeout(() => {
       	timeUp = true;
       },10000)
   }
   ```

4. 打到地鼠后的动作

   ```js
   function bonk(e) {
       if(!e.isTrusted) return;
       score++;
       this.classList.remove('up')
       scoreBoard.textContent = score;
   }
   ```

   `e.isTrusted`：返回一个布尔值,表明当前事件是否是由用户点击触发(比如说真实的鼠标点击触发一个click事件), 还是由一个脚本生成的，防止用户作弊。

   一方面累加分数，一方面改变页面上的分数，此外，地鼠也要回到洞中，将up类移除



## 延伸思考

1. 此处设计的定时器存在一个交互bug，当在游戏进行中，用户再次点击开始游戏的按钮，那就会同时存在两个或多个定时器，那会有多处地鼠同时出现。
2. 前文中提到，在打到地鼠后，地鼠回到洞中，只有等到该地鼠持续出现的随机时间运行完才会触发下一个地鼠的出现，在视觉上会有卡顿的现象。



## 写在最后

本节挑战后，JavaScript30挑战正式杀青收官。感谢**Wes Bos**博主提供的优质课程！完结撒花🎉✨

> Hopefully you enjoyed that and I **won't** see you tomorrow. 

明天不会再见，但是下次课堂正式启程！💛💙