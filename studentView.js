let userID= localStorage.getItem("UserID");
let userRole = localStorage.getItem("UserRole");
let studentID = userID;
let assignmentsData;
let studentData;

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

function requestStudentData()
{
    assignmentsData.forEach(element => {
        if(element.id == studentID)
        {
            studentData=element;
        }
    })
}


function render()
{
    if(userRole == "expert" || userRole == "student")
    {
        let fName = document.createElement("div");
        fName.innerHTML=`${studentData.fName} ${studentData.lName}`;
        document.getElementById("studentView").appendChild(fName);

        let id = document.createElement("div");
        id.innerHTML=studentID;
        document.getElementById("studentView").appendChild(id);

        let grade = document.createElement("div");
        grade.innerHTML=`Score: ${studentData.grade}/100`;
        document.getElementById("studentView").appendChild(grade);
    }
    

    if(userRole == "nerd")
    {
        let elem = document.createElement("div");
        elem.innerHTML="YOU ARE A NERD. YOU CAN GRADE ME <button>Grade</button>";
        document.getElementById("studentView").appendChild(elem);
    }
}

async function setup()
{
    if(localStorage.getItem("StudentID")){studentID = localStorage.getItem("StudentID")}
    await requestData();
    requestStudentData();
    render();
}

setTimeout(setup,100);