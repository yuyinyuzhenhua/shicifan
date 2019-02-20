const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const router = require('./router/')
var session = require('express-session')
var cookieParser = require('cookie-parser')
const rememberMe = require('./middleware/remember-me')

const app = express()

// 开放 public 目录资源
app.use('/public/', express.static(path.join(__dirname, './public/')))
// 开放第三方包
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

// 接收解析客户端提交的json格式数据
app.use(express.json())    //application/json  {key: value, key: value...}
app.use(express.urlencoded(
    {extended:true}
))   //application/x-www-form-urlencoded key=value&key=value...    jquery默认提交这种


// 配置cookie中间件
app.use(cookieParser())

// 配置 session中间件    在挂在路由之前
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))



nunjucks.configure(path.join(__dirname, './view/'), {
    autoescape: true,
    express: app,
    watch: true  //模板   禁用缓存
});

// 配置
app.use(rememberMe)



app.use(router)

app.listen('3000', () => {
    console.log('http://localhost:3000')
})