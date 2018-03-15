# promise
> promise是一种异步解决的方案，相比传统的 <strong>回调函数+事件</strong> 更加合理和强大，es6原生提供了Promise对象。

Promise是一个容器，保存着未来才会结束的事件（一般是一个异步的操作），从语法角度说，Promise是一个独享，从他可以获取异步操作的信息。但是它也提供了一个统一的API，各种异步操作都可以统一的进行处理。
Promise在翻译中是“誓言，承诺”的意思，意思是我为你Promise一个东西之后，就一定会去做（你提前定义的回调函数），无论什么情况都无法改变。
## 特点：
    1. 对象的状态不收到外界影响，Promise对象代表一个异步操作，有三种状态[pending，fulfilled，rejected]，这三种状态只有异步操作的结果可以决定，其他操作都无法改变。
    2. Promise的状态一旦改变，就不会变为其他状态了（即使是异步操作的结果），而且在任何时间都可以获得这个结果。
        1. pending -> fulfilled 已成功
        2. pending -> rejected  已失败
    3. 当出现了2种两种状态变化时，状态已经凝固，不会改变。此时叫做<strong>resolved</strong>，若改变已经发生了，你再去对Promise对象添加回调函数，也会立即得到这个结果。
    4. Promise对象把异步操作以同步操作的流程和规范表达出来，避免了层层嵌套的问题。
## 缺点
    1. 无法取消Promise
    2. 如果不设置回调函数，Promise内部抛出的错误不会返回到外部
    3. 处于Pending状态，无法得知 当前异步方法的进展（是刚开始，还是即将完成）
##基本用法
> ES6中，Promise是一个构造函数，用来生成Promise实例
```ecmascript 6
    const promise = new Promise(function(resolve,reject) {
      // some code
      if(true){
        // resolve方法的作用是 Promise状态的pendding未完成-->resolved成功，在异步操作成功时调用，并将异步操作的结果，作为参数返回
        resolve(value)
      }else{
        // reject方法的作用 Promise状态的pendding未完成-->rejected失败，在异步操作失败时调用，错误，作为参数返回
        reject(error)
      }
    }
    )
    // promise对象创建之后，可以分别赋予 resolved rejected
    promise.then(function(value) {
      
    },function(error) {
      
    })
```
### Promise.prototype.finally()
> 无论最后promise对象的状态如何，都会执行的方法
```ecmascript 6
const promise = new Promise((resolve => {
  
}),reject=>{
  
}).then((value)=>{
  
}).catch(error =>{
  
}).finally(()=>{
  //finally无法接受参数，这也意味着最终无法知道，是否已经执行完毕的状态。
  //所以 finally应当是与状态无关的行为
})
```
### Promise.prototype.all()
```ecmascript 6
const p1 = new Promise((resolve => {
  setTimeout(resolve('p1'),3000)
}),reject=>{
  
})
const p2 = new Promise((resolve => {
  setTimeout(resolve('p2'),3000)
}),reject=>{
  
})
const p3 = new Promise((resolve => {
  setTimeout(resolve('p3'),3000)
}),reject=>{
  
})

```

## ajax异步的例子
```ecmascript 6
/**
* @return promise {Promise}
*/
const getJSON = function(url) {
  // 通用的promise创建过程
  const promise = new Promise(function(resolve, reject){
    const handler = function() {
      // readyState 0-4发生变化
      //0: 请求未初始化
      //1: 服务器连接已建立
      //2: 请求已接收
      //3: 请求处理中
      //4: 请求已完成，且响应已就绪
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

  });

  return promise;
};

// getJSON返回对应的promise对象，并且为该对象定义了then（回调方法+错误时的回调）
getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
```
## 回调函数的参数
> 回调函数设置的时候，一般都是resolve()传递参数，第二个是reject()传递错误

> 但是如果 resolve()传递的是一个Promise对象的实例，那么当前的promise的状态就会被传递的promise实例所控制。

```ecmascript 6
    const p1 = new Promise(function(resolve,reject) {
      // 3000毫秒后 状态会变成rejected
      setTimeout(() => reject(new Error('fail'),3000))      
    })
    const p2 = new Promise(function(resolve, reject) {
      setTimeout(() => resolve(p1),1000)
    })
    p2.then(function(result) {
      console.log(result)
    },function(error) {
      console.log(error)
    }).catch(function(error) {
      console.log('catch'+ error)
    })
    
```