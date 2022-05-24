var headerUsersTableArray = ['<table width="100%" border="1">', '<th>Id</th>', '<th>Full Name</th>', '<th>Role</th>', '<th>Email</th>', '<th>Edit Date</th>', '<th>Status</th>', '<th>Active</th>', '<th>Projects</th>', '<th>Companies</th>', '<th>Groups</th>', '<th>Action</th>', '</tr>']
var usersTableArray = ['<tr>', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, '</tr>']
const insertUsersData = []
var div = document.querySelector('#usersTable')
var activeUsersUrl = 'https://qa-platform.severnyded.tech/api/users?search=&pageSize=&pageNum&onlyDeleted=false&includeDeleted=false'
var deletedUsersUrl = 'https://qa-platform.severnyded.tech/api/users?search=&pageSize=&pageNum&onlyDeleted=true&includeDeleted='
var deleteOrRecoverUserUrl = 'https://qa-platform.severnyded.tech/api/users/'

const userProjectsUrl = 'https://qa-platform.severnyded.tech/api/projects/users/'
const userCompaniesUrl = 'https://qa-platform.severnyded.tech/api/companies/users/'
const userGroupsUrl = 'https://qa-platform.severnyded.tech/api/groups/users/'

var method = 'GET'
var isDeleted = false;
var token = JSON.parse(localStorage.getItem('token'))
var filterActiveButton = document.querySelector('#filteractive')
var filterDeletedButton = document.querySelector('#filterDeleted')
var filterAll = document.querySelector('#filterall')
var createUserButton = document.querySelector('#createUser')
var userButton = document.querySelector('#user')

filterActiveButton.style.background = "#aac5d3";
userButton.style.background = "#aac5d3"; 

filterActiveButton.addEventListener('mouseenter', function () {
  filterActiveButton.style.background = "#fff";
})

filterActiveButton.addEventListener('mouseleave', function () {
  filterActiveButton.style.background = "#f3f1f1";
})

getAndShowData(activeUsersUrl, isDeleted);
async function getAndShowData(url, isDeleted) {
  const user = await getData(url, token);
  for (var i = 0; i < user.items.length; i++) {
    if (isDeleted) {
      await viewDataDeleted(user.items[i])
    }
    else {
      await viewData(user.items[i])
    }
    const userDataTemp = usersTableArray.join(' ')
    insertUsersData.push(userDataTemp)
    usersTableArray = ['<tr>', , 2, 3, 4, 5, 6, 7, , , , , ,'</tr>']
  }
  var table = headerUsersTableArray.join(' ')
  var userDataTable = insertUsersData.join(' ')
  div.innerHTML = table + userDataTable;
}

async function getData(url = '', token = '') {
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: token ? {
      'Authorization': 'Bearer ' + token
    } : {},
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
  })
  return await response.json();
}

async function viewData(user) {
  headerUsersTableArray.splice(5,1, '<th>Edit Date</th>')
  for (let key in user) {
    switch (key) {
      case 'id':
        usersTableArray.splice(1, 1, '<td>' + user[key] + '</td>')
        const pUrl = userProjectsUrl + user[key]
        const cUrl = userCompaniesUrl + user[key]
        const gUrl = userGroupsUrl + user[key]
        await Promise.all([getAndShowUserProjectsData(pUrl), getAndShowUserCompaniesData(cUrl), getAndShowUserGroupsData(gUrl)])
        break;
      case 'firstName':
        usersTableArray.splice(2, 1, '<td>' + user[key])
        break;
      case 'lastName':
        usersTableArray.splice(3, 1, user[key] + '</td>')
        break;
      case 'role':
        if(user[key] == '2'){
          usersTableArray.splice(4, 1, '<td>User</td>')
          }
          else if(user[key] == '1'){
          usersTableArray.splice(4, 1, '<td>Admin</td>')
          }
          else{
          usersTableArray.splice(4, 1, '<td>Unknown ROLE!!!</td>')
          }
          break; 
      case 'email':
        usersTableArray.splice(5, 1, '<td>' + user[key] + '</td>')
        break;
      case 'updatedAt':
        var datetrim = user[key];
        let date = new Date(datetrim);
        usersTableArray.splice(6, 1, '<td>' + date.toLocaleString() + '</td>')
        break;
      case 'status':
        if (user[key] == 0) {
          usersTableArray.splice(7, 1, '<td> Need Email Confirmation</td>')
        } else if (user[key] == 1){
          usersTableArray.splice(7, 1, '<td> Active</td>')
        }else{
          usersTableArray.splice(7, 1, '<td> Unknown user status</td>')
        }
        break;
      case 'deletedAt':
        if(user[key] == null){
          usersTableArray.splice(8, 1, '<td>Yes</td>')
          }
          else{
          usersTableArray.splice(8, 1, '<td>No</td>')
          }
          break; 
      default:
        break;
    }
  }
  if (user.role === 'ADMIN') {
    usersTableArray.splice(12, 1, '<td></td>')
  } else {
    usersTableArray.splice(12, 1, '<td>' + '<button onclick="editUser(' + user.id + ')">' + 'edit' + '<button onclick="deleteUser(' + user.id + ')">' + 'delete' + '</td></tr>')
  }
}

async function viewDataDeleted(user) {
  headerUsersTableArray.splice(5,1, '<th>Delete Date</th>')
  for (let key in user) {
    switch (key) {
      case 'id':
        usersTableArray.splice(1, 1, '<td>' + user[key] + '</td>')
        const pUrl = userProjectsUrl + user[key]
        const cUrl = userCompaniesUrl + user[key]
        const gUrl = userGroupsUrl + user[key]
        case 'firstName':
          usersTableArray.splice(2, 1, '<td>' + user[key])
          break;
        case 'lastName':
          usersTableArray.splice(3, 1, user[key] + '</td>')
          break;
        case 'role':
          if(user[key] == '2'){
            usersTableArray.splice(4, 1, '<td>User</td>')
            }
            else if(user[key] == '1'){
            usersTableArray.splice(4, 1, '<td>Admin</td>')
            }
            else{
            usersTableArray.splice(4, 1, '<td>Unknown ROLE!!!</td>')
            }
          break;  
        case 'email':
          usersTableArray.splice(5, 1, '<td>' + user[key] + '</td>')
          break;
        case 'deletedAt':
          var datetrim = user[key];
          let date = new Date(datetrim);
          usersTableArray.splice(6, 1, '<td>' + date.toLocaleString() + '</td>')
          if(user[key] == null){
            usersTableArray.splice(8, 1, '<td>Yes</td>')
            }
            else{
            usersTableArray.splice(8, 1, '<td>No</td>')
            }
          break;
        case 'status':
          if (user[key] == 0) {
            usersTableArray.splice(7, 1, '<td> Need Email Confirmation</td>')
          } else if (user[key] == 1){
            usersTableArray.splice(7, 1, '<td> Active</td>')
          }else{
            usersTableArray.splice(7, 1, '<td> Unknown user status</td>')
          }
          break; 
        default:
          break;
    }
  }
  if (user.role === 'ADMIN') {
    usersTableArray.splice(12, 1, '<td></td><td></td><td></td><td></td>')
  } else {
    usersTableArray.splice(12, 1, '<td></td><td></td><td></td><td>' + '<button onclick="editUser(' + user.id + ')">' + 'edit' + '<button onclick="recoverUser(' + user.id + ')">' + 'recover' + '</td>')
  }
}

filterActiveButton.addEventListener('click', function () {
  insertUsersData.splice(0,13)
  usersTableArray = ['<tr>', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, '</tr>']
  getAndShowData(activeUsersUrl, false);
})

filterDeletedButton.addEventListener('click', function () {
  insertUsersData.splice(0,13)
  usersTableArray = ['<tr>', 1, 2, 3, 4, 5, 6, 7,,,,,  '</tr>']
  getAndShowData(deletedUsersUrl, true);
})

filterAll.addEventListener('click', function () {
  insertUsersData.splice(0,13)
  usersTableArray = ['<tr>', 1, 2, 3, 4, 5, 6, 7, , , , , '</tr>']
  getAndShowData(activeUsersUrl, false);
  getAndShowData(deletedUsersUrl, true);
})

createUserButton.addEventListener('click', function () {
  window.location.href = 'usercreate.html';
})

function editUser(id) {
  window.location.href = `useredit.html?userId=${id}`;
}

function deleteUser(id) {
  if (confirm("Shure ?")) {
    deleteOrRecoverUser(deleteOrRecoverUserUrl + id, token, 'DELETE')
      .then((data) => {
        resp = data
        if (resp.message) {
          validation.textContent = resp.message
          validation.style.visibility = 'visible';
        }
        location.reload();
      })
  }
  else {
  }
}

async function getUserData(url = '', token = '') {
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: token ? {
      'Authorization': 'Bearer ' + token
    } : {},
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
  })
  return await response.json();
}

async function getAndShowUserProjectsData(url) {
  const projects = await getUserData(url, token);
  usersTableArray.splice(9, 1, '<td>' + projects.items.length + '</td>');
}

async function getAndShowUserCompaniesData(url) {
  const companies = await getUserData(url, token);
  usersTableArray.splice(10, 1, '<td>' + companies.items.length + '</td>');
}

async function getAndShowUserGroupsData(url) {
  const groups = await getUserData(url, token);
  usersTableArray.splice(11, 1, '<td>' + groups.items.length + '</td>');
}

async function deleteOrRecoverUser(url, token, methodType) {
  return fetch(url, {
    method: methodType,
    headers: token ? {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    } : { 'Content-Type': 'application/json' }
  });
}

function recoverUser(id) {
  deleteOrRecoverUser(deleteOrRecoverUserUrl + id +'/recover', token, 'PUT')
    .then((data) => {
      resp = data
      if (resp.message) {
        validation.textContent = resp.message
        validation.style.visibility = 'visible';
      }
      location.reload();
    })
}