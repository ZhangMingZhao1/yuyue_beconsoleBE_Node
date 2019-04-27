const router = require('koa-router')();
const { query } = require('../model/mysql')
const sql = require('../model/mysql.js');
const redis = require("../model/redis");

//加盟商等级
router.get('/yuyue/franrank', async(ctx,next)=>{
    console.log('franrank进来了');
    let sql = 'SELECT * FROM be_franrank ';
    let dataList = await query( sql );
    // console.log(dataList);
    ctx.body = dataList;
    console.log('ctx.session ',ctx.session);
    console.log('ctx.cookies',ctx.cookies.get('name'));
    console.log('ctx.request ',ctx.request);
    // console.log('ctx.sessionID',ctx.sessionID)
})

router.get('/yuyue/franinfo',async(ctx,next)=>{
    console.log('franinfo进来了');
    let result = await sql.findBaseFranInfo();
    ctx.body = result;
})

//加盟商详细信息
router.get('/yuyue/frandetail/:id',async(ctx,next)=>{
    console.log('frandetail进来了');
    let id = ctx.params.id;
    await sql.findFranDetailInfo(id)
        .then(data=>{
            if(data.length>0) {
                ctx.body = data;
            }else {
                ctx.body = {message:"没有找到相关数据",code:0}
            }
        })
})

//修改加盟商信息
router.post('/yuyue/modifyfran/:id',async(ctx,next)=>{
    console.log('modifyfran进来了');
    let id = ctx.params.id;
    let res = ctx.request.body;  
    await sql.modifyFranInfo([
        res.name, res.rank, res.state, res.type, res.id_type,
        res.id_number,
        res.resginster_address, res.commu_address,
        res.legal_person, res.legal_person_phone, res.legal_person_mailbox,
        res.contact_name, res.contact_phone, res.contact_mailbox,
        res.account_name, res.account_number, res.bank, res.remark,
    ],id)
        .then(res=>{  
                console.log("修改成功");
                ctx.body = true;})
        .catch((err=>{
            console.log(err);
        }))
               
        
})

router.get('/redis',async(ctx, next)=>{
    redis.getKey("dd").then((res)=>{
        console.log("redis：", res);
    })
    
})

// router.post('/yuyue/addfraninfo',async(ctx,next)=>{
//     console.log('addfraninfo进来了');
//     let sql = 'SELECT * FROM be_franrank ';
//     let dataList = await query( sql );
//     // console.log(dataList);
//     ctx.body = dataList;
//     // console.log('ctx.sessionID',ctx.sessionID)
// })


module.exports = router; 