var headerProjectUsersTableArray = ['<table width="750 px" border="1">', '<th>Id</th>', '<th>Full Name</th>', '<th>Email</th>', '<th>Active</th>', '<th>Action</th>', '</tr>']
var projectUsersTableArray = ['<tr>',1,2,3,4,5,6,'</tr>']
var headerProjectCompaniesTableArray = ['<table width="750 px" border="1">', '<th>Id</th>', '<th>Company Name</th>', '<th>Status</th>', '<th>Action</th>', '</tr>']
var projectCompaniesTableArray = ['']
var headerProjectGroupsTableArray = ['<table width="750 px" border="1">', '<th>Id</th>', '<th>Group Name</th>', '<th>Status</th>', '<th>Action</th>', '</tr>']
var projectGroupsTableArray = ['']

let insertUsersData = []
let insertCompaniesData = []

var projectUsersIds = []
var userIdsTemp = []
var projecCompanyIds = []
var companyIdsTemp = []
var projecGroupIds = []
var groupIdsTemp = []

var assignUserUrl = 'https://qa-platform.severnyded.tech/api/projects/users/'
var assignCompanyUrl = 'https://qa-platform.severnyded.tech/api/companies/projects/'
//var assignGroupUrl = 'https://qa-platform.severnyded.tech/api/groups/users/'
var assignUrlPartTwo = '/assign'


var userSectionDiv =document.querySelector('#assUser')
var companySectionDiv =document.querySelector('#assCompany')
var groupSectionDiv =document.querySelector('#assGroup')
var usersDiv = document.querySelector('#projectUsersData')
var companiesDiv = document.querySelector('#projectCompaniesData')
var groupsDiv = document.querySelector('#projectGroupsData')

var assignUserBtn = document.querySelector('#userAssign')
var backToUserAssignBtn = document.querySelector('#backToEditP')
var assignComapnyBtn = document.querySelector('#companyAssign')
var backToCompanyAssignBtn = document.querySelector('#backToEditC')
var assignGroupBtn = document.querySelector('#groupAssign')
var backToGroupAssignBtn = document.querySelector('#backToEditG')

var id = document.getElementById('id')
var active = document.getElementById('active')
var description = document.getElementById('description')
var lastSubscribeDate = document.getElementById('subscribeDate')
var statusId = document.getElementById('statusSelect')
var typeId = document.getElementById('typeSelect')
var paidId = document.getElementById('paidSelect')
var price = document.getElementById('price')
var projectName = document.getElementById('projectName')

const getProjectUrl = 'https://qa-platform.severnyded.tech/api/projects/'
const getProjectUsersUrl = 'https://qa-platform.severnyded.tech/api/users/project/';
const getProjectCompaniesUrl = 'https://qa-platform.severnyded.tech/api/companies/projects/';
const getProjectGroupsUrl = '???https://qa-platform.severnyded.tech/api/groups/users/';

var availForAssUserUrl = 'https://qa-platform.severnyded.tech/api/users?search=&pageSize=&pageNum=&onlyDeleted=&includeDeleted=false'
var availForAssCompUrl = 'https://qa-platform.severnyded.tech/api/companies?search=&pageSize=&pageNum=&onlyDeleted=&includeDeleted=false'
var availForAssGroupUrl = 'https://qa-platform.severnyded.tech/api/groups?search=&pageSize=&pageNum=&onlyDeleted=&includeDeleted=false'

var validation = document.querySelector('#validation')
var labelPage = document.querySelector('#pageTitleWithProjectName')
var token = JSON.parse(localStorage.getItem('token'))

const url = window.location.search
const projectId = url.split('=')[1]


var changeProjectObj = {
    item: {
        active: '',
        status: '',
        type: '',
        price: '',
        name: '',
        description: ''
    }
  } 

getAndShowProjectData();

//************************************************ G E N E R A L ***************************************************

async function getAndShowProjectData() {
  const project = await getData(getProjectUrl + projectId, token);
  for(let key in project.item){
    switch(key){
      case 'id':
        id.value = project.item[key]
        break;
      case 'type':
        changeProjectObj.item.type = project.item[key]
        typeId.value = project.item[key]
        break;
      case 'status':
        statusId.value = project.item[key]
        break;  
      case 'lastAssignedAt':
        datetrim = project.item[key];
        let subDate = new Date(datetrim);
        lastSubscribeDate.value = subDate.toLocaleString();
        break;
      case 'lastActivityAt':
        /*changeUserObj.user.activity = user.user[key]
        datetrim = user.user[key];
        let date = new Date(datetrim);
        activity.value = date.toLocaleString();*/
        break;
      case 'name': 
        labelPage.innerHTML = 'Edit ' + project.item[key] + ' project'
        projectName.value = project.item[key]
        break;
      case 'description':
        description.value = project.item[key]
        break;
      case 'price':
        price.value = project.item[key]
        break;
      case 'deletedAt':
        if(project.item[key] == null){
          changeProjectObj.item.active = 1
          active.checked = true
          }
        else{
          changeProjectObj.item.active = 0
          active.checked = false
          }
        break;
      default:
        break;
    }
    }
    getAndShowProjectUsersData()
    getAndShowProjectCompaniesData()
    //getAndShowUserGroupsData()
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

saveProject.addEventListener('click', function () {
  if (true) {
    changeProjectObj.item.name = projectName.value;
    changeProjectObj.item.type = parseInt(typeId.value);
    changeProjectObj.item.status = parseInt(statusId.value);
    console.log(changeProjectObj.item.type)
    changeProjectObj.item.price = parseInt(price.value);
    changeProjectObj.item.description = description.value;
    postEditedProjectData(getProjectUrl + projectId, changeProjectObj.item, 'PUT')
      .then((data) => {
        resp = data
        if (resp.message) {
          validation.textContent = resp.message
          validation.style.visibility = 'visible';
        }
        else{
          window.location.href = 'projects.html';
        }
      })
  }
  else {
    validation.style.visibility = 'visible';
  }
})

backToProjects.addEventListener('click', function () {
  if (confirm("Shure ?")) {
    window.location.href = 'projects.html';
  }
})

active.addEventListener('change', function () {

  switch(active.checked){
    case true:
      recoverProject()
      
      //location.reload();
      break;
    case false:
      //console.log("false")
     deleteProject()
      //window.location.href = 'users.html';
      
      //location.reload();
      break;
    default:
      break;
}
})

function deleteOrRecoverProject(url, token, methodType) {
  return fetch(url, {
    method: methodType,
    headers: token ? {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    } : { 'Content-Type': 'application/json' }
  });
}

function recoverProject() {
  deleteOrRecoverProject(getProjectUrl + projectId +'/recover', token, 'PUT')
    .then((data) => {
      resp = data
      if (resp.message) {
        validation.textContent = resp.message
        validation.style.visibility = 'visible';
      }
      //location.reload();
    })
}

function deleteProject() {
  deleteOrRecoverProject(getProjectUrl + projectId, token, 'DELETE')
      .then((data) => {
        resp = data
        if (resp.message) {
          validation.textContent = resp.message
          validation.style.visibility = 'visible';
        }
        //location.reload();
      })
} 

async function postData(url, data, methodType) {
  const response = await fetch(url, {
    method: methodType,
    headers: token ? {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    } : { 'Content-Type': 'application/json' },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

async function postEditedProjectData(url, data, methodType) {
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

async function assignOrUnassignRelationsForProject(url, assignItemId = '', unassignItemId = '', methodType ,userId){
  console.log(userId)
  if (confirm("Shure ?")) {
    var data = {
      "assign": assignItemId!==null? [assignItemId] : [],
      "unassign": unassignItemId!==null? [unassignItemId] : [],
    }
    await postData(url + userId + assignUrlPartTwo, data, methodType);
    if(assignItemId !== null){
      projectUsersIds.push(userId)
    }
    else{

    }
    
    window.location.href = 'projectedit.html?projectid='+ projectId;
  }
}

//************************************************ U S E R S ***************************************************

async function getAndShowProjectUsersData() {
  const users = await getData(getProjectUsersUrl + projectId, token);
  for(var i=0; i < users.items.length; i++){
      getUsersData(users.items[i])
      if(projectUsersTableArray[6] == 6){
      }else{
      const userDataTemp = projectUsersTableArray.join(' ')
      insertUsersData.push(userDataTemp)
      projectUsersTableArray = ['<tr>',1,2,3,4,5,6,'</tr>']
      }
   
  }
var tableUser = headerProjectUsersTableArray.join(' ')
var projectUsersData = insertUsersData.join(' ')
usersDiv.innerHTML = tableUser + projectUsersData;
}

function getUsersData(users){
  //projectUsersTableArray.splice(0, 0, '<tr>')
  for(let key in users){
  switch(key){
    case 'id':
      projectUsersIds.push(users[key])
      projectUsersTableArray.splice(1, 1,'<td>' + users[key] + '</td>')
      break;
    case 'firstName':
      projectUsersTableArray.splice(2, 1, '<td>' + users[key])
      break;
    case 'lastName':
      projectUsersTableArray.splice(3, 1, users[key] + '</td>')
      break;
    case 'email':
      projectUsersTableArray.splice(4, 1,'<td>' + users[key] + '</td>')
      break;
    case 'deletedAt':
      if(users[key] == null){
        projectUsersTableArray.splice(5,1,'<td>Yse</td>')
        }
      else{
        projectUsersTableArray.splice(5,1,'<td>No</td>')
        }
      break;
    default:
     // projectUsersTableArray.push('<td>' + users[key] + '</td>')
      break;
  }
 }
 if(user.role === 'ADMIN'){
  projectUsersTableArray.push('<td></td><td></td><td></td><td></td><td></td></tr>')
 } else{
  let unassignUser = `<button onclick="assignOrUnassignRelationsForProject('${assignUserUrl}', null, ${projectId}, 'POST', ${users.id})">`;
  projectUsersTableArray.splice(6,1,'<td>'  + unassignUser + 'Unassign' + '</td>')
}
}

assignUserBtn.addEventListener('click', function () {
  assignUserBtn.style.visibility = 'hidden'
  backToUserAssignBtn.style.visibility = 'visible'
  backToUserAssignBtn.onclick = () =>window.location.href = 'projectedit.html?projectid='+ projectId;
  userDataTemp=[];
  insertUsersData = userDataTemp;
  companySectionDiv.innerHTML = ''
  groupSectionDiv.innerHTML = ''
  getAndShowAvailableUsers()
})

async function getAndShowAvailableUsers() {
  const users = await getData(availForAssUserUrl, token);
  for(var i=0; i < users.items.length; i++){
    getAvailableForAssignUsers(users.items[i])
    if(projectUsersTableArray[6] == 6){
    }else{
    const userDataTemp = projectUsersTableArray.join(' ')
    insertUsersData.push(userDataTemp)
    projectUsersTableArray = ['<tr>',1,2,3,4,5,6,'</tr>']
    }
 
  }
var tableUser = headerProjectUsersTableArray.join(' ')
var avUserData = insertUsersData.join(' ')
usersDiv.innerHTML = tableUser + avUserData;
}

function getAvailableForAssignUsers(users){

  for(let key in users){
    if(projectUsersIds.includes(users.id)){
      var checkIdOrNot = false
      
    }
    else{
      var checkIdOrNot = true

    }
    if(checkIdOrNot){

      //var checkIdOrNot = true
      switch(key){
      case 'id':
        projectUsersTableArray.splice(1, 1,'<td>' + users[key] + '</td>')
        break;
      case 'firstName':
        projectUsersTableArray.splice(2, 1, '<td>' + users[key])
        break;
      case 'lastName':
        projectUsersTableArray.splice(3, 1, users[key] + '</td>')
        break;
      case 'email':
        projectUsersTableArray.splice(4, 1,'<td>' + users[key] + '</td>')
        break;
      case 'deletedAt':
        if(user[key] == null){
          projectUsersTableArray.splice(5,1,'<td>Yse</td>')
          }
        else{
          projectUsersTableArray.splice(5,1,'<td>No</td>')
          }
        break;
      default:
        break;
      }
    }
      else{
        break;
      }

    }
  

if(checkIdOrNot){
  let assignUser = `<button onclick="assignOrUnassignRelationsForProject('${assignUserUrl}', ${projectId}, null, 'POST', ${users.id})">`;
  projectUsersTableArray.splice(6,1,'<td>'  + assignUser + 'Assign' + '</td></tr>')
}
}

//************************************************ C O M P A N I E S ***************************************************

async function getAndShowProjectCompaniesData() {
  const companies = await getData(getProjectCompaniesUrl + projectId, token);
  for(var i=0; i < companies.items.length; i++){
      getCompaniesData(companies.items[i])
      if(projectCompaniesTableArray[6] == 6){
      }else{
      const companyDataTemp = projectCompaniesTableArray.join(' ')
      insertCompaniesData.push(companyDataTemp)
      projectCompaniesTableArray = ['<tr>',1,2,3,4,5,6,'</tr>']
      }
   
  }
var tableCompany = headerProjectCompaniesTableArray.join(' ')
var projectCompaniesData = insertCompaniesData.join(' ')
companiesDiv.innerHTML = tableCompany + projectCompaniesData;
}

function getCompaniesData(company){
  for(let key in company){
  switch(key){
    case 'id':
      projecCompanyIds.push(company[key])
      projectCompaniesTableArray.splice(1, 1,'<td>' + company[key] + '</td>')
      break;
    case 'name':
      projectCompaniesTableArray.splice(2, 1, '<td>' + company[key])
      break;
    case 'status':
      if(company[key] == '1'){
        projectCompaniesTableArray.splice(3, 1, '<td> Draft </td>')
        }
      else{
        projectCompaniesTableArray.splice(3, 1, '<td> ??? </td>')
        }
      
      break;
    default:
     // projectUsersTableArray.push('<td>' + users[key] + '</td>')
      break;
  }
 }
 if(user.role === 'ADMIN'){
  projectCompaniesTableArray.push('<td></td><td></td><td></td><td></td><td></td></tr>')
 } else{
  let unassignUser = `<button onclick="assignOrUnassignRelationsForProject('${assignCompanyUrl} + /assign/', null, ${projectId}, 'POST', ${company.id})">`;
  projectUsersTableArray.splice(4,1,'<td>'  + unassignUser + 'Unassign' + '</td>')
}
}

assignUserBtn.addEventListener('click', function () {
  assignUserBtn.style.visibility = 'hidden'
  backToUserAssignBtn.style.visibility = 'visible'
  backToUserAssignBtn.onclick = () =>window.location.href = 'projectedit.html?projectid='+ projectId;
  userDataTemp=[];
  insertUsersData = userDataTemp;
  companySectionDiv.innerHTML = ''
  groupSectionDiv.innerHTML = ''
  getAndShowAvailableUsers()
})

async function getAndShowAvailableUsers() {
  const users = await getData(availForAssUserUrl, token);
  for(var i=0; i < users.items.length; i++){
    getAvailableForAssignUsers(users.items[i])
    if(projectUsersTableArray[6] == 6){
    }else{
    const userDataTemp = projectUsersTableArray.join(' ')
    insertUsersData.push(userDataTemp)
    projectUsersTableArray = ['<tr>',1,2,3,4,5,6,'</tr>']
    }
 
  }
var tableUser = headerProjectUsersTableArray.join(' ')
var avUserData = insertUsersData.join(' ')
usersDiv.innerHTML = tableUser + avUserData;
}

function getAvailableForAssignUsers(users){

  for(let key in users){
    if(projectUsersIds.includes(users.id)){
      var checkIdOrNot = false
      
    }
    else{
      var checkIdOrNot = true

    }
    if(checkIdOrNot){

      //var checkIdOrNot = true
      switch(key){
      case 'id':
        projectUsersTableArray.splice(1, 1,'<td>' + users[key] + '</td>')
        break;
      case 'firstName':
        projectUsersTableArray.splice(2, 1, '<td>' + users[key])
        break;
      case 'lastName':
        projectUsersTableArray.splice(3, 1, users[key] + '</td>')
        break;
      case 'email':
        projectUsersTableArray.splice(4, 1,'<td>' + users[key] + '</td>')
        break;
      case 'deletedAt':
        if(user[key] == null){
          projectUsersTableArray.splice(5,1,'<td>Yse</td>')
          }
        else{
          projectUsersTableArray.splice(5,1,'<td>No</td>')
          }
        break;
      default:
        break;
      }
    }
      else{
        break;
      }

    }
  

if(checkIdOrNot){
  let assignUser = `<button onclick="assignOrUnassignRelationsForProject('${assignUserUrl}', ${projectId}, null, 'POST', ${users.id})">`;
  projectUsersTableArray.splice(6,1,'<td>'  + assignUser + 'Assign' + '</td></tr>')
}
}















