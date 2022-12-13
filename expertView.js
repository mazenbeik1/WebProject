let assignmentsData;
let UserID= localStorage.getItem("UserID");

const dragStart = (target) => {
    target.classList.add("dragging");
};

const dragEnd = (target) => {
    target.classList.remove("dragging");
};

const dragEnter = (event) => {
    event.currentTarget.classList.add("drop");
};

const dragLeave = (event) => {
    event.currentTarget.classList.remove("drop");
};

const drag = (event) => {
    event.dataTransfer.setData("text/html", event.currentTarget.outerHTML);
    event.dataTransfer.setData("text/plain", event.currentTarget.dataset.id);
};

function UpdateRole(newRole)
{
    console.log(newRole);
    //Update JSON
}

const drop = (event) => {
    document
    .querySelectorAll(".column")
    .forEach((column) => column.classList.remove("drop"));
    document
    .querySelector(`[data-id="${event.dataTransfer.getData("text/plain")}"]`)
    .remove();

    event.preventDefault();
    event.currentTarget.innerHTML =
    event.currentTarget.innerHTML + event.dataTransfer.getData("text/html");
    UpdateRole(event.currentTarget.id.replace('sColumn',''));
};

const allowDrop = (event) => {
    event.preventDefault();
};

document.querySelectorAll(".column").forEach((column) => {
    column.addEventListener("dragenter", dragEnter);
    column.addEventListener("dragleave", dragLeave);
});

document.addEventListener("dragstart", (e) => {
    if (e.target.className.includes("card")) {
        dragStart(e.target);
    }
});

document.addEventListener("dragend", (e) => {
    if (e.target.className.includes("card")) {
    dragEnd(e.target);
    }
});

async function requestAssignments()
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

function getRole(id)
{
    let role;

    assignmentsData.forEach(data =>
        {
            if(data.id == id)
            {
                role = data.role;
            }
        })
    return role;
}

function changeView(id)
{
    if(getRole(id)=="nerd" || getRole(id)=="student")
    {
        id = parseInt(id);
        let role = getRole(id);
        localStorage.setItem("StudentID",id);
        window.location.href=`${role}View.html`;
        
    }else if(id ==  UserID)
    {
        localStorage.setItem("StudentID",id);
        window.location.href=`studentView.html`;
    }
}

function renderData()
{
    assignmentsData.forEach(data =>{
        let card = document.createElement("div");
        card.innerText=`${data.id}\n${data.fName}\n${data.lName}`;
        card.className="card";
        card.draggable="true";
        card.setAttribute("ondragstart","drag(event)");
        card.setAttribute("data-id",`${data.id}`);
        card.setAttribute("ondblclick","changeView(this.id)");
        card.id=data.id;
        document.getElementById(`${data.role}sColumn`).appendChild(card);
    })
}

async function setup()
{
    await requestAssignments();
    renderData();
}


setTimeout(setup,100);
