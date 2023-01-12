class Request {
    constructor(id, requestedOn, acccessFor, team, status) {
        this.id = id;
        this.ticketId = `UP-${this.id}`;
        this.requestedOn = requestedOn;
        this.acccessFor = acccessFor;
        this.team = team;
        this.status = status
    }
}

let requests = [];

const request_data = "request_data";
function init() {
    if (localStorage.getItem(request_data) == null) {
        requests = [
            new Request(10, '2022-12-12', 'khoa.nguyen@codegy.vn', "Ad Sale", "Pending"),
            new Request(11, '2022-09-12', 'nhu@gmail.com', "Marketing", "Approved"),
            new Request(12, '2022-11-12', 'nhat@gmail.com', "Human Resources", "Reject"),
            new Request(13, '2022-07-23', 'luc@gmail.com', "Creative & Design", "Pending"),
            new Request(14, '2022-05-24', 'bao@gmail.com', "Marketing", "Reject"),
            new Request(15, '2022-06-18', 'ai@gmail.com', "Ad Sale", "Approved")
        ]
        localStorage.setItem(request_data, JSON.stringify(requests));
    }
    else{
        requests = JSON.parse(localStorage.getItem(request_data));
    }
}

function renderRequest() {
    console.log('a');
    let tbRequest = document.getElementById('tbRequest');
    tbRequest.innerHTML = "";
    for (let i = 0; i < requests.length; i++) {
        let status = "";
        if (requests[i].status == 'Pending') {
            status = `<button class="btn btn-success" onclick="approved(${requests[i].id})">Approved</button>
                        <button class="btn btn-danger" onclick="reject(${requests[i].id})">Reject</button>`
        }
        tbRequest.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${requests[i].ticketId}</td>
                <td>${requests[i].requestedOn}</td>
                <td>${requests[i].acccessFor}</td>
                <td>${requests[i].team}</td>
                <td>${requests[i].status}</td>
                <td>
                    ${status}
                </td>
            </tr>
        `;
    }
}

function createRequest() {
    let requestedOn = document.getElementById('requestedOn').value;
    let accessFor = document.getElementById('accessFor').value;
    let team = document.getElementById('team').value;
    if (requestedOn == "" || accessFor == "" || team == "") {
        alert("You need provide data.")
    }
    else {
        let id = findMaxId() + 1;
        let request = new Request(id, requestedOn, accessFor, team, "Pending");
        requests.push(request);
        localStorage.setItem(request_data, JSON.stringify(requests));
        renderRequest();
        clearForm();
    }
}

function findMaxId() {
    let max = 0;
    for (let i = 0; i < requests.length; i++) {
        if (requests[i].id > max) {
            max = requests[i].id
        }
    }
    return max;
}

function clearForm() {
    document.getElementById('requestedOn').value = "";
    document.getElementById('accessFor').value = "";
    document.getElementById('team').value = "";
}


function approved(requestId) {
    let confirm = window.confirm("Are you sure to approve this request?");
    if (confirm == true) {
        let request = findRequestById(requestId);
        request.status = "Approved";
        localStorage.setItem(request_data, JSON.stringify(requests));
        renderRequest();
    }
}

function reject(requestId) {
    let confirm = window.confirm("Are you sure to reject this request?");
    if (confirm == true) {
        let request = findRequestById(requestId);
        request.status = "Reject";
        localStorage.setItem(request_data, JSON.stringify(requests));
        renderRequest();
    }
}

function findRequestById(requestId) {
    for (let i = 0; i < requests.length; i++) {
        if (requests[i].id == requestId) {
            return requests[i];
        }
    }
    return null;
}

init();
renderRequest()