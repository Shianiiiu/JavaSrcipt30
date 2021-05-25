# Speech Synthesis 浏览器文本朗读 📢

> 油管视频：[JavaScript Text-To-Speech](https://www.youtube.com/watch?v=saCpKH_xdgs&list=PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH&index=23) 📺
> 本知识总结摘自：[soyainiJavaScript-30 中文练习指南](https://github.com/soyaine/JavaScript30) 、[winar-jin/JavaScript30-Challenge](https://github.com/winar-jin/JavaScript30-Challenge) 🦥



 * [实现效果](#实现效果)
  * [涉及语法](#涉及语法)
  * [相关知识](#相关知识)
  * [过程指南](#过程指南)
  * [问题解决](#问题解决)
  * [延伸阅读](#延伸阅读)



## 实现效果

<img src="https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210524133408_D23.png" alt="image-20210524133358794" style="zoom:80%;" />

输入文字，选择语言进行文本朗读，可以改变rate语速，pitch音调。



## 涉及语法

- CSS
  - background-image: radial-gradient() 
- JS
  - [Array.prototype.find()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
  - [Function.prototype.bind()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
- Web Speech API
  - [SpeechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)
  - [SpeechSynthesisUtterance](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance)



## 相关知识

1. `SpeechSynthesisUtterance`接口

   设置阅读器阅读的配置参数，包括语言，阅读速度，语调等，实例化`SpeechSynthesisUtterance`后，可以通过为其属性赋值来完成参数配置。

2. `SpeechSynthesis`接口

   控制阅读器行为，包括获取浏览器支持的朗读语言，文本朗读，暂停，停止等，接口属性中定义有paused,speaking等只读属性来表明当前的状态。

   - `SpeechSynthesis.getVoices()`：获取所有的语言列表，代表在当前语音对象上所有可用的语言；
   - `SpeechSynthesis.cancel()`：结束，结束当前的语音状态，并将当前语音内容清空；
   - `SpeechSynthesis.pause()`：暂停，暂停当前的语音状态，当不清空语音内容，可以继续播放；
   - `SpeechSynthesis.speak()`：播放，将文字内容加入到播放序列中并开始播放语音；
   - `SpeechSynthesis.resume()`：继续，当语音处于暂停状态的时候，继续播放该语音；

   
   
   ```js
   let utterance = new SpeechSynthesisUtterance("Hello world!");
   var synth = window.speechSynthesis;
   
   speechSynthesis.speak(utterance);
   ```



## 过程指南

1. 取得`speechSynthesis`对象，并取得浏览器支持的朗读语言，将所有支持的选项动态添加至下拉列表

   ```js
   //全局对象speechSynthesis
   const synth =  window.speechSynthesis;
   
   function getSupportVoices(){
       voices = synth.getVoices(); //获取支持的语言
       // console.log(voices);
       voicesDropdown.innerHTML = voices
       .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
       .join('');
   }
   
   //设置监听事件，在页面加载后执行回调函数，从而获取语言
   synth.addEventListener('voiceschanged', getSupportVoice);
   ```

2. 语音的播放/关闭切换

   ```js
   function toggle(startover=true){
       //将上一次的语音清除
       speechSynthesis.cancel();
       
       if(startover){
         speechSynthesis.speak(msg);
       }
   } 
   ```

3. 将所选择的语言设置为语音的语言

   ```js
   function setVoice(){
       //this指向被选择的option
       // console.log(this.value)
       msg.voice = voices.find(voice => voice.name === this.value)
       //切换语言后播放
       toggle();
   }
   
   voicesDropdown.addEventListener('change',setVoice)
   ```

4. 设置语音的语调和语速，改变朗读的文字内容

   ```js
   function setOption(){
       msg[this.name] = this.value;
       toggle();
   }
   
   options.forEach(option => option.addEventListener('change',setOption));
   ```

5. 监听开始和暂停按钮，切换语音的播放状态

   ```js
   //监听按钮
   
   speakButton.addEventListener('click',toggle);
   //不可以直接传入参数false
   stopButton.addEventListener('click',toggle.bind(null,false));
   ```



## 问题解决

在监听按钮时，回调函数为已定义的toggle方法，默认参数`startover = true`，即播放语音。当点击停止按钮stop时，按照逻辑传参应该为`startover = false`，回调函数需要传入false。

如果直接写成toggle(false)在页面onload时才会触发一次，这里介绍**事件监听绑定函数**需要**参数**的时候的几种做法：

1. 匿名函数包裹

   ```js
   node.onclick = function(){
     callback(args);
   }
   ```

2. 使用绑定函数bind() [MDN参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

   ```js
   node.onclick = callback.bind(null,args);
   ```

3. 方法1改良，使用箭头函数

   ```js
   node.onclick = () => callback(args);
   ```

## 延伸阅读

[阮一峰JS教程  —— Function.prototype.bind()](https://wangdoc.com/javascript/oop/this.html#functionprototypebind)

