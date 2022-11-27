let userID = localStorage.getItem("UserID");
let userRole = localStorage.getItem("UserRole");
let StudentID = userID;
let assignmentsData;

function renderTable(assignedStudent) {
	assignmentsData.forEach((assignment) => {
        if (assignment.id == StudentID)
        {
				let elem = document.createElement("tr");
				elem.innerHTML = `<td>${assignment.id}</td> <td>${assignment.fName}</td> <td>${assignment.lName}</td> <td><button  id="${assignment.id}" type="button" class="btn btn-info" onclick="studentView(this.id)"> View </button></td>`;
				document.getElementById("assignmentsTable").appendChild(elem);
        }
		if (assignment.assignedNerd == StudentID) {
			if (userRole == "expert") {
				let elem = document.createElement("tr");
				elem.innerHTML = `<td>${assignment.id}</td> <td>${assignment.fName}</td> <td>${assignment.lName}</td> <td><button  id="${assignment.id}" type="button" class="btn btn-info" onclick="studentView(this.id)"> View </button></td>`;
				document.getElementById("assignmentsTable").appendChild(elem);
			} else if (userRole == "nerd") {
				let elem = document.createElement("tr");
				elem.innerHTML = `<td>******</td> <td>******</td> <td>******</td> <td><button  id="${assignment.id}" onclick="studentView(this.id)"> View </button></td>`;
				document.getElementById("assignmentsTable").appendChild(elem);
			}
		}
	});
}

function studentView(id) {
	id = parseInt(id);
	localStorage.setItem("StudentID", id);
	window.open("studentView.html");
}

async function requestData() {
	let promise = new Promise(function (Resolve) {
		fetch("assignments.json")
			.then((Response) => Response.json())
			.then((data) => {
				Resolve(data);
			});
	});
	promise.then(function (data) {
		assignmentsData = data;
	});
	await promise;
}

async function setup() {
	if (localStorage.getItem("StudentID")) {
		StudentID = localStorage.getItem("StudentID");
	}
	await requestData();
	renderTable();
}

setTimeout(setup, 100);
