var headerCalendarTableArray = ['<table width="750 px" border="1">', '<th>Id</th>', '<th>Full Name</th>', '<th>Email</th>', '<th>Active</th>', '<th>Action</th>', '</tr>']
var calendarData = ['<tr>',1,2,3,4,5,6,'</tr>']

let insertCalendarData = []

var saveGroup = document.querySelector('#saveGroup')
var backToGroups = document.querySelector('#backToGroups')

var groupCalendarDiv = document.querySelector('#calendar')

var manageCalendarBtn = document.querySelector('#manageCalendar')
var backToGroupCalendarBtn = document.querySelector('#backToEditcalendar')

var id = document.getElementById('id')
var description = document.getElementById('description')
var statusId = document.getElementById('statusSelect')
var groupName = document.getElementById('groupName')
var hoursPeriod = document.getElementById('hoursPeriod')
var startCourseDate = document.getElementById('startCourseDate')
var typeId = document.getElementById('typeSelect')
var parentProject = document.getElementById('parentProject')
var projectsList = document.getElementById('projectsList')
var projectsDivValue= ['<select id="parentProject" class="input">']

const groupUrl = 'https://qa-platform.severnyded.tech/api/groups/'
const groupUsersUrl = 'https://qa-platform.severnyded.tech/api/users/group/';

var availForAssUserUrl = 'https://qa-platform.severnyded.tech/api/users?search=&pageSize=&pageNum=&onlyDeleted=&includeDeleted=false'
//var availForAssCompUrl = 'https://qa-platform.severnyded.tech/api/companies?search=&pageSize=&pageNum=&onlyDeleted=&includeDeleted=false'
//var availForAssGroupUrl = 'https://qa-platform.severnyded.tech/api/groups?search=&pageSize=&pageNum=&onlyDeleted=&includeDeleted=false'

var validation = document.querySelector('#validation')
var labelPage = document.querySelector('#pageTitleWithGroupName')
var token = JSON.parse(localStorage.getItem('token'))

const url = window.location.search
const groupId = url.split('=')[1]


var changeGroupObj = {
    item: {
        id: '',
        name: '',
        type: '',
        status: '',
        projectId: '',
    }
  } 

  getAndShowGroupData();

//************************************************ G E N E R A L ***************************************************

async function getAndShowGroupData() {
  const group = await getData(groupUrl + groupId, token);
  for(let key in group.item){
    switch(key){
      case 'id':
        id.value = group.item[key]
        break;
      case 'status':
        statusId.value = group.item[key]
        break;  
      case 'type':
        typeId.value = group.item[key]
        break;  
      case 'name':
        labelPage.innerHTML = 'Edit ' + group.item[key] + ' group'
        groupName.value =group.item[key]
        break;
      case 'description':
        description.value =group.item[key]
        break;
      case 'projectId':
        console.log(group.item[key])
        await relationProject(group.item[key])
        var parentProject2 = document.getElementById('parentProject')
        parentProject2.value =group.item[key]
        break;
      case 'deletedAt':
        if(group.item[key] == null){
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
    //getAndShowCompanyUsersData()
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

async function relationProject(projectId){
  const project = await getData('https://qa-platform.severnyded.tech/api/projects?search=&pageSize=&pageNum=&onlyDeleted=&includeDeleted=false', token)
  for(var i=0; i < project.items.length; i++){
    await viewData(project.items[i])
  }
  projectsDivValue.push('</select>')
   var projectData = projectsDivValue.join(' ')
   projectsList.innerHTML = projectData;  
}

async function viewData(project){
  projectsDivValue.push('<option value="'+ project.id +'">' + project.name +'</option>')
} 

saveGroup.addEventListener('click', function () {
  if (true) {
    changeGroupObj.item.name = groupName.value;
    changeGroupObj.item.id = id.value;
    changeGroupObj.item.type = typeId.value;
    changeGroupObj.item.status = statusId.value;
    var parentProject2 = document.getElementById('parentProject')
    changeGroupObj.item.projectId = parentProject2.value;
    editGroupData(groupUrl + groupId, changeGroupObj.item, 'PUT')
      .then((data) => {
        resp = data
        if (resp.message) {
          validation.textContent = resp.message
          validation.style.visibility = 'visible';
        }
        else{
          window.location.href = 'groups.html';
        }
      })
  }
  else {
    validation.style.visibility = 'visible';
  }
})

backToGroups.addEventListener('click', function () {
  if (confirm("Shure ?")) {
    window.location.href = 'groups.html';
  }
})

active.addEventListener('change', function () {

  switch(active.checked){
    case true:
      recoverGroup()
      
      //location.reload();
      break;
    case false:
      //console.log("false")
     deleteGroup()
      //window.location.href = 'users.html';
      
      //location.reload();
      break;
    default:
      break;
}
})

function deleteOrRecoverGroup(url, token, methodType) {
  return fetch(url, {
    method: methodType,
    headers: token ? {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    } : { 'Content-Type': 'application/json' }
  });
}

function recoverGroup() {
  deleteOrRecoverGroup(groupUrl + groupId +'/recover', token, 'PUT')
    .then((data) => {
      resp = data
      if (resp.message) {
        validation.textContent = resp.message
        validation.style.visibility = 'visible';
      }
      //location.reload();
    })
}

async function editGroupData(url, data, methodType) {
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
/*
async function assignOrUnassignRelationsForGroup(url, assignItemId = '', unassignItemId = '', methodType ,userId){
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
*/

//************************************************ U S E R S ***************************************************
/*
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
*/