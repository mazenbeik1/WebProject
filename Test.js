let LoginData;

async function login()
{

    let promise = new Promise(function(Resolve)
    {
        let req = new XMLHttpRequest();
        req.open("POST","server.js");
        console.log("done");
        req.send("fname=Henry&lname=Ford");
    })
    promise.then(
        function(){
            
        }
    );

    await promise;
    console.log(LoginData.length)
}