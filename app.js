// 1. 首先引入express库：
const express = require("express");
const routes = require("./routes");
const mysql = require('mysql'); // 引入mysql模块

// 2. 创建 express 的实例，代表服务器
const app = express();


// 3. 设置监听端口
const port = 3000;

/**
 * 为了让 Express 能够解析 JSON 格式的请求体，我们需要添加 express.json()中间件到 app 中。
 * 中间件是自定义的，用来扩展 express 功能，它可以在处理请求前，或者发送响应前做一些特定的操作，比如 log。
 */
app.use(express.json());
routes(app);

// 1. 调用 app 中的 get 方法
// 第一个参数是请求的路径，这里处理根路径的请求，
// 第二个参数是处理请求的回调函数，参数分别为请求和响应对象
app.get("/", (req, res) => {
    // 在回调函数里，调用响应对象的 send 方法，发送响应给客户端
    res.send("Hello World!");

});

app.post("/", (req, res) => {

    console.log("收到请求体：", req.body);

    res.status(201).send();

});

// 路径后面的:id 的意思是，根路径后边的值都会作为请求的参数
// 并且赋给名为 id 的变量，（如：http://localhost:3000/3, id 的值就为3）
app.put("/:id", (req, res) => {
    // 打印一下请求参数的值，req.params.id
    console.log("收到请求参数，id 为：", req.params.id);
    // 再打印一下请求体
    console.log("收到请求体：", req.body);

    // 返回响应，默认是200
    res.send();

});



// 4. 调用 app.listen 来启动 server 并监听指定端口，启动成功后打印出 log
app.listen(port, () =>
    console.log(`Express server listening at http://localhost:${port}`)
);