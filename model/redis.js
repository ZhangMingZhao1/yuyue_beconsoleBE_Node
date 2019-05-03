const redis = require("redis");
const config = require('../config/redis_config.js')
const {promisify} = require('util');



var host = config.ip,
port = config.port,
password = config.password;

var client  = redis.createClient(port, host, {detect_buffers: true});
client.auth(password)
// Redis连接错误
client.on("error", function(error) {
    console.log('err',error); 
});
const getAsync = promisify(client.get).bind(client);

let getKey = (key)=>{
    return getAsync('dd').then(function(res) {
        console.log(res); // => 'bar'
        if(res) return true;
        else return false;
    });
    
}

module.exports = { getKey }