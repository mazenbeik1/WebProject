let LoginData;

async function login()
{
    let promise = new Promise(function(Resolve)
    {
        fetch("Login.json")
        .then(Response => Response.json())
        .then(data => {
            Resolve(data);
        })
    })
    promise.then(
        function(data){
            LoginData = data;
        }
    );

    await promise;
    console.log(LoginData.length)
}