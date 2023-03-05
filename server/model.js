const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/bft-db";
mongoose.connect(DB_URL);//链接mongo并且使用testAPP这个数据库（集合）
//监听mongo是否链接成功
mongoose.connection.on("connected",function(){
    console.log("mongodb connect success.")
});

const models = {
    //user表
    user: {
        "tel":{"type":Number,"require":true},//手机号
        "password":{"type":String,"require":true},//密码
        "username":{"type":String},//用户名
        "type":{"type":String,"require":true},//职业类型
        "address":{"type":String},
        "sex":{"type":String},
        "age":{"type":Number},
        "avatar":{"type": String},//头像
        "desc":{"type":String},//个人简介或者职位介绍
        "title":{"type":String},//职位名称
        //牛人
        // "intentionMoney":{"type":String},//意向薪水
        //Boss 补充信息
        "money":{"type":String},//职位薪水
        "company":{"type":String}//公司
    },
    //获取验证码表
    yzm: {
        "tel":{"type":Number,require:true},
        "yzm":{"type":String,require:true},
        // "time":{"type":Number}
    },
    //聊天表
    chat:{
        "chatId":{"type":String,"require":true},//当前聊天的id
        "from":{"type":String,"require":true},//自身
        "to":{"type":String,"require":true},//发送的目标
        "content":{"type":String,"require":true,"default":""},//发送内容
        "read":{"type":Boolean,"default":false},//是否查阅
        "create_time":{"type":Number,"default":new Date().getTime()}//发送时间
    },
    //简历表
    resume:{
        "username":{"type":String,"require":true},//用户名
        "sex":{"type":String},
        "age":{"type":Number},
        "title":{"type":String},//职位名称
        "money":{"type":String},//职位薪水
        "experience":{"type":Number,"require":true},//几年经验
        "education":{"type":String,"require":true},//教育经历，本科/硕士
        "school":{"type":String,"require":true},//毕业院校
        "personalAdvantages":{"type":String,"require":true,"default":""},//个人优势
        "workExperience":{"type":String,"require":true},//工作经历
    }
}

//遍历生成所有表
for (let m in models) {
    mongoose.model(m,new mongoose.Schema(models[m]));
}

module.exports = {
    //获取表的方法
    getModel:function(name){
        return  mongoose.model(name);
    }
}



//创建一个表（数据模型），JSOn为字段
// const User = mongoose.model("user",new mongoose.Schema({
//     name:{type:String,require:true},
//     age:{type:Number,require:true},
//     sex:{type:String,require:true},
//     work:{type:String,require:true}
// }));