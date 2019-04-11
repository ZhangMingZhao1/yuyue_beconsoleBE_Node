//import { create } from 'domain';

var mysql = require('mysql');
var config = require('../config/default.js')
//建立数据库连接池
var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

let query = function(sql, values) {
    return new Promise((resolve, reject)=>{
        pool.getConnection(function (err,connection) {
            if(err){
                reject(err);
            }else{
                connection.query(sql,values,(err,rows)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(rows);
                    }
                    connection.release(); //为每一个请求都建立一个connection使用完后调用connection.release(); 直接释放资源。
                                          //query用来操作数据库表
                })
            }
         
    })
    })
}

//新增加盟商信息
let addFranInfo = (value)=>{
    let _sql = `insert into be_franinfo(fran_id)`;
    return query(_sql,value);
}


//加盟商基本信息
let findBaseFranInfo = function(value) {
    let _sql = `select id,fran_id,name,type,rank,contact,phone,state from be_franinfo`;
    return query(_sql,value);
}



//加盟商详细信息
let findFranDetailInfo = (value)=>{
    let _sql = `select * from be_franinfo`;
    return query(_sql,value);
    
}

module.exports = { query,addFranInfo,findBaseFranInfo,findFranDetailInfo}
