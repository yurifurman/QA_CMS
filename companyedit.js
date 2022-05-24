var headerCompanyUsersTableArray = ['<table width="750 px" border="1">', '<th>Id</th>', '<th>Full Name</th>', '<th>Email</th>', '<th>Active</th>', '<th>Action</th>', '</tr>']
var companyUsersTableArray = ['<tr>',1,2,3,4,5,6,'</tr>']
var headerCompanyProjectsTableArray = ['<table width="750 px" border="1">', '<th>Id</th>', '<th>Company Name</th>', '<th>Status</th>', '<th>Action</th>', '</tr>']
var companyProjectsTableArray = ['']
var headerCompanyGroupsTableArray = ['<table width="750 px" border="1">', '<th>Id</th>', '<th>Group Name</th>', '<th>Status</th>', '<th>Action</th>', '</tr>']
var companyGroupsTableArray = ['']

let insertUsersData = []

var companyUsersIds = []
var userIdsTemp = []
var companyProjectsIds = []
var projectIdsTemp = []
var companyGroupsIds = []
var groupIdsTemp = []

var assignUserUrl = 'https://qa-platform.severnyded.tech/api/companies/users/'
//var assignCompanyUrl = 'https://qa-platform.severnyded.tech/api/companies/users/'
//var assignGroupUrl = 'https://qa-platform.severnyded.tech/api/groups/users/'
var assignUrlPartTwo = '/assign'

var saveCompany = document.querySelector('#saveCompany')
var backToCompany = document.querySelector('#backToCompany')

var userSectionDiv = document.querySelector('#assUser')
var projectSectionDiv = document.querySelector('#assProject')
var groupSectionDiv = document.querySelector('#assGroup')

var usersDiv = document.querySelector('#companyUsersData')
var companiesDiv = document.querySelector('#companyProjectsData')
var groupsDiv = document.querySelector('#companyGroupsData')

var assignUserBtn = document.querySelector('#userAssign')
var backToUserAssignBtn = document.querySelector('#backToEditP')
var assignProjectBtn = document.querySelector('#projectAssign')
var backToProjectAssignBtn = document.querySelector('#backToEditC')
var assignGroupBtn = document.querySelector('#groupAssign')
var backToGroupAssignBtn = document.querySelector('#backToEditG')

var id = document.getElementById('id')
var description = document.getElementById('description')
var websiteUrl = document.getElementById('site')
var statusId = document.getElementById('statusSelect')
var companyName = document.getElementById('companyName')

const companyUrl = 'https://qa-platform.severnyded.tech/api/companies/'
const companyUsersUrl = 'https://qa-platform.severnyded.tech/api/users/company/';

var availForAssUserUrl = 'https://qa-platform.severnyded.tech/api/users?search=&pageSize=&pageNum=&onlyDeleted=&includeDeleted=false'
//var availForAssCompUrl = 'https://qa-platform.severnyded.tech/api/companies?search=&pageSize=&pageNum=&onlyDeleted=&includeDeleted=false'
//var availForAssGroupUrl = 'https://qa-platform.severnyded.tech/api/groups?search=&pageSize=&pageNum=&onlyDeleted=&includeDeleted=false'

var validation = document.querySelector('#validation')
var labelPage = document.querySelector('#pageTitleWithCompanyName')
var token = JSON.parse(localStorage.getItem('token'))

const url = window.location.search
const companyId = url.split('=')[1]


var changeCompanyObj = {
    item: {
        name: '',
        websiteUrl: '',
        description: '',
    }
  } 

  getAndShowCompanyData();

//************************************************ G E N E R A L ***************************************************

async function getAndShowCompanyData() {
  const company = await getData(companyUrl + companyId, token);
  for(let key in company.item){
    switch(key){
      case 'id':
        id.value = company.item[key]
        break;
      case 'status':
        statusId.value = company.item[key]
        break;  
      case 'name':
        labelPage.innerHTML = 'Edit ' + company.item[key] + ' company'
        companyName.value =company.item[key]
        break;
      case 'websiteUrl':
        websiteUrl.value = company.item[key]
        break;
      case 'description':
        description.value =company.item[key]
        break;
      case 'deletedAt':
        if(company.item[key] == null){
          active.checked = true
          }
        else{
          active.checked = false
          }
        break;
      default:
        break;
    }
    }
    getAndShowCompanyUsersData()
    //getAndShowUserCompaniesData()
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

saveCompany.addEventListener('click', function () {
  if (true) {
    changeCompanyObj.item.name = companyName.value;
    changeCompanyObj.item.websiteUrl = websiteUrl.value;
    changeCompanyObj.item.description = description.value;
    postEditedCompanyData(companyUrl + companyId, changeCompanyObj.item, 'PUT')
      .then((data) => {
        resp = data
        if (resp.message) {
          validation.textContent = resp.message
          validation.style.visibility = 'visible';
        }
        else{
          window.location.href = 'companies.html';
        }
      })
  }
  else {
    validation.style.visibility = 'visible';
  }
})

backToCompany.addEventListener('click', function () {
  if (confirm("Shure ?")) {
    window.location.href = 'companies.html';
  }
})

active.addEventListener('change', function () {

  switch(active.checked){
    case true:
      recoverCompany()
      
      //location.reload();
      break;
    case false:
      //console.log("false")
     deleteCompany()
      //window.location.href = 'users.html';
      
      //location.reload();
      break;
    default:
      break;
}
})

function deleteOrRecoverCompany(url, token, methodType) {
  return fetch(url, {
    method: methodType,
    headers: token ? {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    } : { 'Content-Type': 'application/json' }
  });
}

function recoverCompany() {
  deleteOrRecoverCompany(companyUrl + companyId +'/recover', token, 'PUT')
    .then((data) => {
      resp = data
      if (resp.message) {
        validation.textContent = resp.message
        validation.style.visibility = 'visible';
      }
      //location.reload();
    })
}

async function postEditedCompanyData(url, data, methodType) {
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

async function assignOrUnassignRelationsForCompany(url, assignItemId = '', unassignItemId = '', methodType ,userId){
  if (confirm("Shure ?")) {
    var data = {
      "assign": assignItemId!==null? [assignItemId] : [],
      "unassign": unassignItemId!==null? [unassignItemId] : [],
    }
    await postEditedCompanyData(url + userId + assignUrlPartTwo, data, methodType);
    if(assignItemId !== null){
      companyUsersIds.push(userId)
    }
    else{
    }
    window.location.href = 'companyedit.html?companyid='+ companyId;
  }
}

//************************************************ U S E R S ***************************************************

async function getAndShowCompanyUsersData() {
  const users = await getData(companyUsersUrl + companyId, token);
  for(var i=0; i < users.items.length; i++){
      getUsersData(users.items[i])
      if(companyUsersTableArray[6] == 6){
      }else{
      const userDataTemp = companyUsersTableArray.join(' ')
      insertUsersData.push(userDataTemp)
      companyUsersTableArray = ['<tr>',1,2,3,4,5,6,'</tr>']
      }
   
  }
var tableUser = headerCompanyUsersTableArray.join(' ')
var companyUsersData = insertUsersData.join(' ')
usersDiv.innerHTML = tableUser + companyUsersData;
}

function getUsersData(users){
  //projectUsersTableArray.splice(0, 0, '<tr>')
  for(let key in users){
  switch(key){
    case 'id':
      companyUsersIds.push(users[key])
      companyUsersTableArray.splice(1, 1,'<td>' + users[key] + '</td>')
      break;
    case 'firstName':
      companyUsersTableArray.splice(2, 1, '<td>' + users[key])
      break;
    case 'lastName':
      companyUsersTableArray.splice(3, 1, users[key] + '</td>')
      break;
    case 'email':
      companyUsersTableArray.splice(4, 1,'<td>' + users[key] + '</td>')
      break;
    case 'deletedAt':
      if(users[key] == null){
        companyUsersTableArray.splice(5,1,'<td>Yse</td>')
        }
      else{
        companyUsersTableArray.splice(5,1,'<td>No</td>')
        }
      break;
    default:
      break;
  }
 }
 if(user.role === 'ADMIN'){
  companyUsersTableArray.push('<td></td><td></td><td></td><td></td><td></td></tr>')
 } else{
  let unassignUser = `<button onclick="assignOrUnassignRelationsForCompany('${assignUserUrl}', null, ${companyId}, 'POST', ${users.id})">`;
  companyUsersTableArray.splice(6,1,'<td>'  + unassignUser + 'Unassign' + '</td>')
}
}

assignUserBtn.addEventListener('click', function () {
  assignUserBtn.style.visibility = 'hidden'
  backToUserAssignBtn.style.visibility = 'visible'
  backToUserAssignBtn.onclick = () =>window.location.href = 'companyedit.html?companyid='+ companyId;
  userDataTemp=[];
  insertUsersData = userDataTemp;
  projectSectionDiv.innerHTML = ''
  groupSectionDiv.innerHTML = ''
  getAndShowAvailableUsers()
})

async function getAndShowAvailableUsers() {
  const users = await getData(availForAssUserUrl, token);
  for(var i=0; i < users.items.length; i++){
    getAvailableForAssignUsers(users.items[i])
    if(companyUsersTableArray[6] == 6){
    }else{
    const userDataTemp = companyUsersTableArray.join(' ')
    insertUsersData.push(userDataTemp)
    companyUsersTableArray = ['<tr>',1,2,3,4,5,6,'</tr>']
    }
 
  }
var tableUser = headerCompanyUsersTableArray.join(' ')
var avUserData = insertUsersData.join(' ')
usersDiv.innerHTML = tableUser + avUserData;
}

function getAvailableForAssignUsers(users){

  for(let key in users){
    if(companyUsersIds.includes(users.id)){
      var checkIdOrNot = false
    }
    else{
      var checkIdOrNot = true
    }
    if(checkIdOrNot){
      //var checkIdOrNot = true
      switch(key){
      case 'id':
        companyUsersTableArray.splice(1, 1,'<td>' + users[key] + '</td>')
        break;
      case 'firstName':
        companyUsersTableArray.splice(2, 1, '<td>' + users[key])
        break;
      case 'lastName':
        companyUsersTableArray.splice(3, 1, users[key] + '</td>')
        break;
      case 'email':
        companyUsersTableArray.splice(4, 1,'<td>' + users[key] + '</td>')
        break;
      case 'deletedAt':
        if(user[key] == null){
          companyUsersTableArray.splice(5,1,'<td>Yse</td>')
          }
        else{
          companyUsersTableArray.splice(5,1,'<td>No</td>')
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
  let assignUser = `<button onclick="assignOrUnassignRelationsForCompany('${assignUserUrl}', ${companyId}, null, 'POST', ${users.id})">`;
  companyUsersTableArray.splice(6,1,'<td>'  + assignUser + 'Assign' + '</td></tr>')
}
}