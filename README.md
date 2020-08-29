# React workshop笔记

> 本项目仅用作本人记录学习笔记，代码备份，严禁下载和转载

## 01 组件化

组件化技术通常使用context和HOC的方式

**context**

* 创建context

  React.createContext

* 使用context

  * ctx.provider, ctx.consumer
  * 类静态方法Class.contextType = context
  * useContext (函数组件中)

**HOC** high order component

高阶组件，高阶函数，柯里化？，工厂函数？

接收组件作为参数，对组件进行包裹为其添加新的特性，返回包装后的组件，可使用decorator写法



**手写表单组件** （TODO）

**antd4版本，需求：**

* 实现form model，保存form的状态，注册/注销field，设置和获取field value，校验
  * getFieldValues
  * getFieldValue
  * setFieldValues
  * setFieldValue
  * validateFields
  * registerField
  * unregisterField
  * Form.
* 实现form
  * onreset
  * 提交
    * onfinished
    * onfinishedFailed
* field组件
  * 向form注册 -- 利用context的注册函数，name+rules
  * 将input改为受控组件



**antd3版本，需求：（作业-贝宁，validate）**

* createForm方法，会导致全渲染性能低

  * form注入form （form model）
* getFieldDecorator注册，组件注册，受控
  * setFieldValues
* getFieldValues
  * validateFields

**手写弹框组件** （TODO）

* 使用createPortal(jsx, dom)，实现跨dom层级
* beforeUnmount销毁dom



## 02 React全家桶 - redux 01

**多箭头函数的理解**

简单的话相当于一堆参数分开传，传参从fn(a,b,c) => fn(a)(b)(c)，工厂思想，最内层core函数拥有逐层封装的所有特性和上下文，对于fn(a,b,c)这种耦合性低，变与重新利用和扩展

**compose函数**

多函数组合执行，上一函数的执行结果返回给下一函数，可以用于实现`插件机制`

compose = funcs => funcs.reduce((a, b) => (...args) => a(b(...args)))

```javascript
function compose (funcs=[]) {
    // 返回一个tricky函数，传啥返回啥
    if(funcs.length == 0) return arg => arg
    // 只有一个不用处理
    if(funcs.length == 1) return funcs[1]
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
    // 列如：foo, bar, baz, tua reduce计算结果：
    // 有些难以理解，多了一层包装函数 a(b(c())), a(fn(b(fn(c())))), fn毛都没干
    // 包装函数作用：执行当前的函数，将结果传给下一个包装函数
    // 所以结果是：最后一个函数接收初始参数并执行，结果传给包装函数做参数
    // 包装函数执行下个函数，并将结果传递给下一个包装函数

    function result(...arg) {
       return 
        (function (tuaRes) {
            return (function (bazRes) {
                return foo(bar(bazRes))
            }) (baz(tuaRes))
        }) (tua(arg))
    }
}
```

**Redux**

* state：状态

* reducer：可靠的修改state值，因为是纯函数

* action：相当于调用reducer

  为什么不直接调用方法呢？异步操作提高效率？所以同步的dispatch，state可能不可靠

* subscribe：订阅store变化



**Redux中间件机制**

本质是劫持store的dispatch方法，添加一些effect，feature，多中间件使用compose的形式安装

* appyMiddleWare([]) 插件安装工厂函数，接收插件列表，返回中间件安装函数install(接收createStore, reducer)

* createStore, 执行安装函数 install(createStore)(reducer)

* 开始安装

  * 执行createStore得到store

  * 执行中间件-工厂 middleware(getStore, dispatch)，（effect）得到真正的中间件

    ！因为需要dispatch等context，来个工厂给提供这些

    中间件的context有：`getStore，dispatch`（工厂参数），next下一个插件的dispatch

  * compose所有中间件，得到新的dispatch

    compose从后向前reduce middleware，执行后得到增强版本的dispatch传递给下一个middleware，最后得到一个最终版本的dispatch，像一个洋葱解构

    执行时第一个middleware的dispatch先执行，然后脱壳调用第二个，第三个.....原始的dispatch

    vue得封装逻辑类似：compilerWebVue => webVue => global vue => core vue...

  * 返回store用composed dispatch代替原dispatch



**常用中间件**

* redux-thunk, payload可以为function
* redux-logger, 打印log，带颜色
* redux-promise, playload为promise，resovle之后再dispatch



**TODO** - 手写redux

* createStore(reducer)
* dispatch
* subscribe & unsubscribe
* 中间件机制applyMiddleware
  * thunk
  * promise
  * logger
* combineReducers(作业 - 多哥)





## 翻车

* 使用jsx需要React 在scope中
* （TODO）HOC的时候需要返回React.cloneElement(FCmp, controlled)而不是createElement（FComp）什么原因
* 工厂函数，高阶函数为了传递context





This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
