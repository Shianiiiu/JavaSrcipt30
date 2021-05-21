# Geolocation 浏览器地理位置获取

> 油管视频：[JavaScript Geolocation based Speedometer and Compass](https://www.youtube.com/watch?v=X7Cbtra0C6I&list=PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH&index=21) 📺
> 本知识总结摘自：[soyainiJavaScript-30 中文练习指南](https://github.com/soyaine/JavaScript30) 、[winar-jin/JavaScript30-Challenge](https://github.com/winar-jin/JavaScript30-Challenge) 🦥



 * [实现效果](#实现效果)
  * [涉及语法](#涉及语法)
  * [相关知识](#相关知识)
  * [过程指南](#过程指南)

## 实现效果

<img src="https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210521143257_D21.png" alt="image-20210521143250151" style="zoom:80%;" />

练习`NavigatorGeolocation.geolocation`这一WebAPI的使用，通过使用此API可以访问到设备的位置信息。由于笔记本电脑一般不带速度及方向传感器，所以结果的返回值中`heading`及`speed`键值均为`null` 。

由于wes bos的视频教程使用到MAC电脑编码，动态实现的模拟效果不能达到，所以就将就着手动输入了。如果装载了browser-sync 的npm包，可以由提供的外网IP在手机端查看（应该是可行的，笔者直接使用Live Server部署网页端，就不在这演示🐱‍🏍~~我懒~~）

## 涉及语法

- transform: rotate()
- DOM.textContent
- [navigator.geolocation](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/geolocation)



## 相关知识

1. 地理位置接口`Geolocation`的说明，查看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation)

2. [getCurrentPosition()](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/getCurrentPosition)方法和[watchPosition()](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/watchPosition)方法 

   `getCurrentPosition()`方法在调用时返回一次相关信息，`watchPosition()`方法调用后将持续返回相关信息。这两个方法都可以接受三个参数，第一个参数为成功时得到位置信息时的回调函数，使用`Position`对象作为唯一的参数。；第二个参数为获取位置信息失败时的回调函数，是一个可选项；第三个参数是一个可选的`PositionOptions`对象。[PositionOptions in MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/PositionOptions)

   - `enableHighAccuracy`参数表示是否高精度可用，为Boolean类型，默认为false。如果开启，导致较慢的响应时间或者增加电量消耗
   - `timeout`参数表示设备必须在多长时间（单位毫秒）内返回一个位置，默认是[Infinity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity)，意思是获取到一个位置之后， `getCurrentPosition()`或者`watchPosition()` 才会返回一个值。
   - `maximumAge`表示可以返回多长时间（即最长年龄，单位毫秒）内的可获取的缓存位置，默认是0，意味着设备不能使用一个缓存位置，每次请求都是立即去获取一个全新的对象内容。如果设置为 `Infinity` ，那么不管设置的最长年龄是多少，设备都必须返回一个缓存位置。



## 过程指南

1. 使用`getCurrentPosition`获取position对象

   ```js
   if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(success, error, options);
   }else{
       console.log('Your broswer does not support the Geolocation API');
   }
   ```

   

2. 实现成功得到位置信息时的回调函数

   ```js
   function success(pos) {
     var crd = pos.coords;
   
     console.log('Your current position is:');
     console.log('Latitude : ' + crd.latitude);
     console.log('Longitude: ' + crd.longitude);
     console.log('More or less ' + crd.accuracy + ' meters.');
   };
   ```