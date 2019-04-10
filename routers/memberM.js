const router = require('koa-router')();
const { query } = require('../model/mysql')

router.get('/yuyue/listUser', async(ctx,next)=>{
    let sql = 'SELECT * FROM be_user ';
    let dataList = await query( sql );
    // console.log(dataList);
    ctx.body = dataList;
})

module.exports = router; 