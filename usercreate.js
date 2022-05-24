var headerUsersTableArray = ['<table width="100%" border="1">', '<th>Id</th>', '<th>Role</th>', '<th>Name</th>', '<th>Email</th>', '<th>Edit Date</th>', '<th>Active</th>', '<th>Project</th>', '<th>Company</th>', '<th>Action</th>', '</tr>']
var usersTableArray = ['']
var div = document.querySelector('#userData')
var role = document.getElementById('roleSelect')
var firstName = document.getElementById('firstname')
var lastName = document.getElementById('lastname')
var nick = document.getElementById('nick')
var email = document.getElementById('email')
var pass = document.getElementById('pass')
const createUserUrl = 'https://qa-platform.severnyded.tech/api/users/';
var validation = document.querySelector('#validation')
var token = JSON.parse(localStorage.getItem('token'))


var createUserObj = {
  user: {
    role: '',
    firstName: '',
    lastName: '',
    nickName: '',
    email: '',
    password: '',
  }
}

createUser.addEventListener('click', function () {
  if (true) {
    createUserObj.user.role = role.value;
    console.log(createUserObj.user.role)
    createUserObj.user.firstName = firstName.value;
    createUserObj.user.lastName = lastName.value;
    createUserObj.user.nickName = nick.value;
    createUserObj.user.email = email.value;
    createUserObj.user.password = pass.value;
    postData(createUserUrl, createUserObj.user, 'POST')
      .then((data) => {
        resp = data
        
        if (resp.message) {
          validation.textContent = resp.message
          validation.style.visibility = 'visible';
        }
        else 
        {
          var editUserUrl = 'useredit.html?userId=' + resp.user.id
          window.location.href = editUserUrl
        }
      })
  }
  else {
    validation.style.visibility = 'visible';
  }
})

backToUsers.addEventListener('click', function () {
  if (confirm("Shure ?")) {
    window.location.href = 'users.html';
  }
})


async function postData(url, data, methodType) {
  const response = await fetch(url, {
    method: methodType, 
    headers: token ? {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    } : { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
}