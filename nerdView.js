let userID = localStorage.getItem("UserID");
let userRole = localStorage.getItem("UserRole");
let StudentID = userID;
let assignmentsData;
let viewRole;

function renderTable(assignedStudent) {
	assignmentsData.forEach((assignment) => {
		if (assignment.id == StudentID) {
			let elem = document.createElement("tr");
			elem.innerHTML = `<td>${assignment.id}</td> <td>${assignment.fName}</td> <td>${assignment.lName}</td> <td>${assignment.grade}/100</td> <td><form action="/nerdView.html" method="POST"><button name="viewedStudentID" value="${assignment.id}" id="${assignment.id}" onclick="studentView(this.id)"> View </button></form></td>`;
			document.getElementById("assignmentsTable").appendChild(elem);
		}
		if (assignment.assignedNerd == StudentID) {
			if (userRole == "expert") {
				let elem = document.createElement("tr");
				elem.innerHTML = `<td>${assignment.id}</td> <td>${assignment.fName}</td>  <td>${assignment.lName}</td> <td>${assignment.grade}/100</td> <td><button  id="${assignment.id}" type="button" class="btn btn-info" onclick="studentView(this.id)"> View </button></td>`;
				document.getElementById("assignmentsTable").appendChild(elem);
			} else if (userRole == "nerd") {
				let elem = document.createElement("tr");
				elem.innerHTML = `<td>******</td> <td>******</td> <td>******</td> <td>${assignment.grade}/100</td> <td><form action="/nerdView.html" method="POST"><button name="viewedStudentID" value="${assignment.id}" id="${assignment.id}" onclick="studentView(this.id)"> View </button></form></td>`;
				document.getElementById("assignmentsTable").appendChild(elem);
			}
		}
	});
}

function roleCheck(id) {
	let role;

	file.forEach((student) => {
		if (student.id == id) {
			role = student.role;
			return;
		}
	});

	if (userID == id) {
		return "student";
	}

	return role;
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

function renderPoints() {
	let n = document.querySelectorAll("tr").length - 2;
	let k = 60;
	let points = k * n;

	assignmentsData.forEach((assignment) => {
		if (assignment.assignedNerd == StudentID) {
			points -= assignment.grade;
		}
	});

	document.getElementById(
		"Points"
	).textContent = `Available points: ${points}/${k * n}`;
}

async function setup() {
	if (localStorage.getItem("StudentID")) {
		StudentID = localStorage.getItem("StudentID");
	}
	await requestData();
	renderTable();
	renderPoints();
}

setTimeout(setup, 100);
