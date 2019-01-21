const router = require('koa-router')();
const { query } = require('../model/mysql')

router.get('/xinxiguanli', async(ctx,next)=>{
    let sql = 'SELECT * FROM bs_userinfo';
    let dataList = await query( sql );
    
    // console.log(dataList);
    ctx.body = dataList;
})

module.exports = router; 