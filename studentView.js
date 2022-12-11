let userID = localStorage.getItem("UserID");
let userRole = localStorage.getItem("UserRole");
let studentID = userID;
let assignmentsData;
let studentData;

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

function requestStudentData() {
	assignmentsData.forEach((element) => {
		if (element.StudentId == studentID) {
			studentData = element;
		}
	});
}

function render(studentAssignment) {
	console.log(studentAssignment);

	if (userRole == "expert" || userRole == "student" || studentID == userID) {
		let fName = document.createElement("div");
		fName.innerHTML = `${studentData.fName} ${studentData.lName}`;
		document.getElementById("card-text").appendChild(fName);

		let id = document.createElement("div");
		id.innerHTML = studentID;
		document.getElementById("card-text").appendChild(id);
	}

	let assignmentID = document.createElement("div");
	assignmentID.innerHTML = `Assignment ID ${studentAssignment.assignmentId}`;
	document.getElementById("card-title").appendChild(assignmentID);

	let assignment = document.createElement("div");
	assignment.innerHTML = `here should show assignment data`;
	document.getElementById("card-text").appendChild(assignment);

	let grade = document.createElement("div");
	grade.innerHTML = `Score: ${studentAssignment.grade}/100`;
	grade.id = "studentGrade";
	document.getElementById("card-text").appendChild(grade);

	if (userRole == "nerd" && !(studentID == userID)) {
		let elem = document.createElement("div");
		elem.innerHTML = `<input id="studentGradeInput" type="text"><button id="gradeButton" onclick="gradeStudent()">Grade</button>`;

		document.getElementById("card-text").appendChild(elem);
	}
}

function gradeStudent() {
	let Score = parseInt(document.getElementById("studentGradeInput").value);
	if (Score > 100 || Score < 0) {
		alert("WHAT THE FUCK BRO");
	} else {
		document.getElementById(
			"studentGrade"
		).innerHTML = `Score: ${Score}/100`;
		//change score in jason file
	}
}

async function setup() {
	if (localStorage.getItem("StudentID")) {
		studentID = localStorage.getItem("StudentID");
	}
	await requestData();
	requestStudentData();
	studentData.assignments.forEach((studentAssignment) => {
		render(studentAssignment);
	});
}

setTimeout(setup, 100);
