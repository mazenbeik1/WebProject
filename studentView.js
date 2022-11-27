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
		if (element.id == studentID) {
			studentData = element;
		}
	});
}

function render() {
	if (userRole == "expert" || userRole == "student") {
		let fName = document.createElement("div");
		fName.innerHTML = `${studentData.fName} ${studentData.lName}`;
		document.getElementById("studentView").appendChild(fName);

		let id = document.createElement("div");
		id.innerHTML = studentID;
		document.getElementById("studentView").appendChild(id);
	}

        let assignment = document.createElement("div");
		assignment.innerHTML = `here should show assignment data`;
		document.getElementById("studentView").appendChild(assignment);

        let grade = document.createElement("div");
		grade.innerHTML = `Score: ${studentData.grade}/100`;
        grade.id ="studentGrade";
		document.getElementById("studentView").appendChild(grade);

	if (userRole == "nerd") {
		let elem = document.createElement("div");
		elem.innerHTML = `<input id="studentGradeInput" type="text"><button id="gradeButton" onclick="gradeStudent()">Grade</button>`;

		document.getElementById("studentView").appendChild(elem);
	}
}

function gradeStudent() {
	let Score = parseInt(document.getElementById("studentGradeInput").value);
    if(Score > 100 || Score < 0 ){alert("WHAT THE FUCK BRO")}
    else
    {
        document.getElementById("studentGrade").innerHTML = `Score: ${Score}/100`;
        //change score in jason file
    }
}

async function setup() {
	if (localStorage.getItem("StudentID")) {
		studentID = localStorage.getItem("StudentID");
	}
	await requestData();
	requestStudentData();
	render();
}

setTimeout(setup, 100);
