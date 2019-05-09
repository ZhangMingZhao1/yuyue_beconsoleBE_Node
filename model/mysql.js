//import { create } from 'domain';

var mysql = require('mysql');
var config = require('../config/default.js');
var moment = require('moment');
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


//加盟商基本信息
let findBaseFranInfo = function(value) {
    let _sql = `select id,fran_id,name,type,rank,contact_name,contact_phone,state from be_franinfo`;
    return query(_sql,value);
}



//加盟商详细信息
let findFranDetailInfo = (id)=>{
    let _sql = `SELECT * FROM be_franinfo where id=${id}`;
    return query(_sql);
    
}

//修改加盟商信息
let modifyFranInfo = (value,id)=>{
    console.log(value,id);
    let _sql = `UPDATE be_franinfo SET 
        name=?, 
        rank=?,
        state=?,
        type=?,
        id_type=?,
        id_number=?,
        resginster_address=?,
        commu_address=?,
        legal_person=?,
        legal_person_phone=?,
        legal_person_mailbox=?,
        contact_name=?,
        contact_phone=?,
        contact_mailbox=?,
        account_name=?,
        account_number=?,
        bank=?,
        remark=? where id=${id}
        `;
    return query(_sql,value);
    
}

//新增加盟商信息
let addFranInfo = (value,name)=>{
    //时间戳当id
    // let fran_id = parseInt(new Date().getTime()/1000).toString();
    let fran_id = Date.parse(new Date());

    //时间戳当时间 timestamp和vachar的这里时间字符串带-就报错
    // let founde_time = new Date().toLocaleString().replace(/\s*/g,"");
    let founde_time = Date.parse(new Date());
    console.log(fran_id,founde_time)
    console.log('name',name);
    let _sql = `insert into be_franinfo(
        fran_id,
        name,rank,state, type,id_type,id_number,
        resginster_address,commu_address,legal_person,legal_person_phone,legal_person_mailbox,
        contact_name,contact_phone,contact_mailbox,
        account_name,account_number,bank,remark,founder,founde_time) 
        values(${fran_id},
            ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,
            ${name},${founde_time})`;
    return query(_sql,value);
}

//新增加盟商等级
let addFranRank = (value)=>{
    console.log('value',value);
    let _sql = `insert into be_franrank(
        rank_name,
        discount,
        dividend)
        values(?,?,?)
    `;
    return query(_sql,value);
}

//

//删除加盟商信息
let deleteFranInfo = (id)=>{
    let _sql = `DELETE FROM be_franinfo WHERE id=${id}`;
    return query(_sql);
} 


module.exports = { query,addFranInfo,findBaseFranInfo,findFranDetailInfo,modifyFranInfo,deleteFranInfo,addFranInfo,addFranRank}
