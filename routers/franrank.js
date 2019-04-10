const router = require('koa-router')();
const { query } = require('../model/mysql')

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
    let sql = 'SELECT * FROM franinfo ';
    let dataList = await query( sql );
    // console.log(dataList);
    ctx.body = dataList;
})

router.post('/yuyue/addfraninfo',async(ctx,next)=>{
    console.log('addfraninfo进来了');
    let sql = 'SELECT * FROM be_franrank ';
    let dataList = await query( sql );
    // console.log(dataList);
    ctx.body = dataList;
    console.log('ctx.session ',ctx.session);
    console.log('ctx.cookies',ctx.cookies.get('name'));
    console.log('ctx.request ',ctx.request);
    // console.log('ctx.sessionID',ctx.sessionID)
})

module.exports = router; 