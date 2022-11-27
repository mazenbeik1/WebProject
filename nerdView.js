let userID= localStorage.getItem("UserID");
let userRole = localStorage.getItem("UserRole")
let assignmentsData;

function renderTable(assignedStudent)
{
    
    assignmentsData.forEach(assignment =>{
        if( assignment.assignedNerd == userID)
        {   
            if(userRole == "expert")
            {
                let elem = document.createElement("tr");
                elem.innerHTML = `<td>${assignment.id}</td> <td>${assignment.fName}</td> <td>${assignment.lName}</td> <td><button  id="${assignment.id}" onclick="studentView(this.id)"> View </button></td>`
                document.getElementById("assignmentsTable").appendChild(elem);
            }else if(userRole == "nerd")
            {
                let elem = document.createElement("tr");
                elem.innerHTML = `<td>******</td> <td>******</td> <td>******</td> <td><button  id="${assignment.id}" onclick="studentView(this.id)"> View </button></td>`
                document.getElementById("assignmentsTable").appendChild(elem);
            }
        }
    })
}


function studentView(id)
{
    id = parseInt(id);
    window.location.href="studentView.html";
    
    localStorage.setItem("StudentID",id);
}

async function requestData()
{
    let promise = new Promise(function(Resolve)
    {
        fetch("assignments.json")
        .then(Response => Response.json())
        .then(data => {
            Resolve(data);
        })
    })
    promise.then(
        function(data){
            assignmentsData = data;
        }
    );
    await promise;
}




async function setup()
{
    await requestData();
    renderTable();
}









setTimeout(setup,100);