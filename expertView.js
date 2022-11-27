let LoginData;

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
    //change role in json file
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

async function requestData()
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
}

function getRole(id)
{
    let role;

    LoginData.forEach(data =>
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
        window.location.href=`${role}View.html`;
        
        localStorage.setItem("StudentID",id);
    }
}

function renderData()
{
    LoginData.forEach(data =>{
        let card = document.createElement("div");
        card.innerText=data.id;
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
    await requestData();
    renderData()
    
}


setTimeout(setup,100);
