const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const router = require('./router/')
var session = require('express-session')
var cookieParser = require('cookie-parser')
const rememberMe = require('./middleware/remember-me')
const questionRouter = require('./router/question')

// 处理相对时间
const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
require('dayjs/locale/zh-cn') // 按需加载
dayjs.locale('zh-cn') // 全局使用西班牙语




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



const env = nunjucks.configure(path.join(__dirname, './view/'), {
    autoescape: true,
    express: app,
    watch: true  //模板   禁用缓存
});


env.addFilter('relativeTime', function(time) {
    return dayjs().from(dayjs(time))
})

// 配置
app.use(rememberMe)

app.use(( req, res, next) => {
    // 挂载到 app.locals 中的数据可以直接在模板页中访问
    app.locals.sessionUser = req.session.user
    next()
})



app.use(router)
app.use(questionRouter)

app.listen('3000', () => {
    console.log('http://localhost:3000')
})