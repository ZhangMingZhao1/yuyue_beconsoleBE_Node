const router = require('koa-router')();
const { query } = require('../model/mysql')
const sql = require('../model/mysql.js');

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

router.post('/yuyue/addfraninfo',async(ctx,next)=>{
    console.log('addfraninfo进来了');
    let sql = 'SELECT * FROM be_franrank ';
    let dataList = await query( sql );
    // console.log(dataList);
    ctx.body = dataList;
    // console.log('ctx.sessionID',ctx.sessionID)
})

module.exports = router; 