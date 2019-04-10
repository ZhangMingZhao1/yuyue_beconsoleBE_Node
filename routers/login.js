const router = require('koa-router')();
const {
    query
} = require('../model/mysql')

router.post('/yuyue/login', async (ctx, next) => {
    console.log("login进来了")
    ctx.cookies.set('name', 'tobi');
    ctx.body = {
        "message": "",
        "data": {
            "uid": 1,
            "userName": "admin",
            "telephone": "13077038359",
            "status": 1,
            "password": null,
            "beDepartment": {
                "id": 1,
                "name": "运营部"
            },
            "beInstitution": {
                "id": 3,
                "lever": 3,
                "name": "123街道",
                "beInstitutions": null
            },
            "role": "超级管理员",
            "permissions": ["all"],
            "roleType": 10
        },
        "fetching": false
    };
    
})

module.exports = router;