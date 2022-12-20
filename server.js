const fs = require("fs");
const http = require("http");


updateJson= function(type,val){
    console.log(type , val)
}

const server = http.createServer((req,res)=>{
    updateJson(req,req.method);
})

server.listen(3000,'localhost',()=>
{
    console.log('listening for reqs')
});