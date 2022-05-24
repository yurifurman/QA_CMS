var headerUserProjectsTableArray = ['<table width="750 px" border="1">', '<th>Id</th>', '<th>Project Name</th>', '<th>Type</th>', '<th>Status</th>', '<th>Action</th>', '</tr>']
var userProjectsTableArray = ['<tr>',1,2,,,,'</tr>']
var headerUserCompaniesTableArray = ['<table width="750 px" border="1">', '<th>Id</th>', '<th>Company Name</th>', '<th>Status</th>', '<th>Action</th>', '</tr>']
var userCompaniesTableArray = ['<tr>',1,2,,,]
var headerUserGroupsTableArray = ['<table width="750 px" border="1">', '<th>Id</th>', '<th>Group Name</th>', '<th>Status</th>', '<th>Action</th>', '</tr>']
var userGroupsTableArray = ['<tr>',1,2,,,]

var userProjectIds = []
var projectIdsTemp = []
var userCompanyIds = []
var companyIdsTemp = []
var userGroupIds = []
var groupIdsTemp = []

var assignProjectUrl = 'https://qa-platform.severnyded.tech/api/projects/users/'
var assignCompanyUrl = 'https://qa-platform.severnyded.tech/api/companies/users/'
var assignGroupUrl = 'https://qa-platform.severnyded.tech/api/groups/users/'
var assignUrlPartTwo = '/assign'

var projectSectionDiv =document.querySelector('#assProject')
var companySectionDiv =document.querySelector('#assCompany')
var groupSectionDiv =document.querySelector('#assGroup')
var projectsDiv = document.querySelector('#userProjectsData')
var companiesDiv = document.querySelector('#userCompaniesData')
var groupsDiv = document.querySelector('#userGroupsData')

var assignProjectBtn = document.querySelector('#projectAssign')
var backToEditUserProjectBtn = document.querySelector('#backToEditP')
var assignComapnyBtn = document.querySelector('#companyAssign')
var backToEditUserCompanyBtn = document.querySelector('#backToEditC')
var assignGroupBtn = document.querySelector('#groupAssign')
var backToEditUserGroupBtn = document.querySelector('#backToEditG')

let insertProjectsData = []
let insertCompaniesData = []
let insertGroupsData = []

var id = document.getElementById('id')
var active = document.getElementById('active')
var activity = document.getElementById('activitydate')
var role = document.getElementById('selectRole')
var statusId = document.getElementById('selectStatus')
var firstName = document.getElementById('firstname')
var lastName = document.getElementById('lastname')
var nick = document.getElementById('nick')
var email = document.getElementById('email')

const getUserUrl = 'https://qa-platform.severnyded.tech/api/users/'
const getUserProjectsUrl = 'https://qa-platform.severnyded.tech/api/projects/users/';
const getUserCompaniesUrl = 'https://qa-platform.severnyded.tech/api/companies/users/';
const getUserGroupsUrl = 'https://qa-platform.severnyded.tech/api/groups/users/';

var availForAssProjUrl = 'https://qa-platform.severnyded.tech/api/projects?search=&pageSize=&pageNum=&onlyDeleted=&includeDeleted=false'
var availForAssCompUrl = 'https://qa-platform.severnyded.tech/api/companies?search=&pageSize=&pageNum=&onlyDeleted=&includeDeleted=false'
var availForAssGroupUrl = 'https://qa-platform.severnyded.tech/api/groups?search=&pageSize=&pageNum=&onlyDeleted=&includeDeleted=false'

var validation = document.querySelector('#validation')
var labelPage = document.querySelector('#pageTitleWithUserName')
var token = JSON.parse(localStorage.getItem('token'))

const url = window.location.search
const userId = url.split('=')[1]

var changeUserObj = {
  user: {
    id: 1,
    active: 1,
    statusId:1,
    role: 1,
    firstName: '',
    lastName: '',
    nickName: '',
    email: '',
  }
}

getAndShowUserData();

// *********************************************************** G E N E R A L *********************************************************

async function getAndShowUserData() {
  const user = await getData(getUserUrl + userId, token);
  for(let key in user.user){
    switch(key){
      case 'id':
        id.value = user.user[key]
        break;
      case 'role':
        changeUserObj.user.role = parseInt(user.user[key])
        role.value = user.user[key]
        break;
      case 'status':
        changeUserObj.user.statusId = parseInt(user.user[key])
          statusId.value = user.user[key]
        break;
      case 'lastActivityAt':
        datetrim = user.user[key];
        let date = new Date(datetrim);
        activity.value = date.toLocaleString();
        break;
      case 'firstName':
        firstName.value = user.user[key]
        break;
      case 'lastName':
        labelPage.innerHTML = 'Edit ' + firstName.value + ' ' + user.user[key] + ' user'
        lastName.value = user.user[key]
        break;
      case 'nickName':
        nick.value = user.user[key]
        changeUserObj.user.nickName = user.user[key]
        break;
      case 'email':
        email.value = user.user[key]
        break
      case 'deletedAt':
        if(user.user[key] == null){
          changeUserObj.user.active = 1
          active.checked = true
          }
        else{
          changeUserObj.user.active = 2
          active.checked = false
          }
        break
      default:
        break;
    }
    }
    getAndShowUserProjectsData()
    getAndShowUserCompaniesData()
    getAndShowUserGroupsData()
    
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

saveUser.addEventListener('click', function () {
  if (true) {
    changeUserObj.user.id = parseInt(id.value)
    changeUserObj.user.role = parseInt(role.value)
    changeUserObj.user.statusId = parseInt(statusId.value)
    changeUserObj.user.firstName = firstName.value
    changeUserObj.user.lastName  = lastName.value
    changeUserObj.user.nickName = nick.value
    changeUserObj.user.email = email.value
    console.log(changeUserObj.user)
    postData(getUserUrl + userId, changeUserObj.user, 'PUT')
      .then((data) => {
        resp = data
        if (resp.message) {
          validation.textContent = resp.message
          validation.style.visibility = 'visible';
        }
        else{
          window.location.href = 'users.html';
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

active.addEventListener('change', function () {

    switch(active.checked){
      case true:
        recoverUser()
        
        //location.reload();
        break;
      case false:
        //console.log("false")
       deleteUser()
        //window.location.href = 'users.html';
        
        //location.reload();
        break;
      default:
        break;
}
})

async function deleteOrRecoverUser(url, token, methodType) {
  return fetch(url, {
    method: methodType,
    headers: token ? {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    } : { 'Content-Type': 'application/json' }
  });
}

async function recoverUser() {
  await deleteOrRecoverUser(getUserUrl + userId +'/recover', token, 'PUT')
    .then((data) => {
      resp = data
      if (resp.message) {
        validation.textContent = resp.message
        validation.style.visibility = 'visible';
      }
      location.reload();
    })
}

async function deleteUser() {
    await deleteOrRecoverUser(getUserUrl + userId, token, 'DELETE')
      .then((data) => {
        resp = data
        if (resp.message) {
          validation.textContent = resp.message
          validation.style.visibility = 'visible';
        }
        location.reload();
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

async function assignOrUnassignRelationsForUser(url, assignItemId = '', unassignItemId = '', methodType){
  if (confirm("Shure ?")) {
    var data = {
      "assign": assignItemId!==null? [assignItemId] : [],
      "unassign": unassignItemId!==null? [unassignItemId] : [],
    }
    await postData(url + userId + assignUrlPartTwo, data, methodType);
    window.location.href = 'useredit.html?userId='+ userId;
  }
}

// *********************************************************** P R O J E C T S *********************************************************

async function getAndShowUserProjectsData() {

  const projects = await getData(getUserProjectsUrl + userId, token);
  for(var i=0; i < projects.items.length; i++){
      getProjectsData(projects.items[i])
      if(userProjectsTableArray[2] == 2){

      }else{
      var projectDataTemp = userProjectsTableArray.join(' ')
      insertProjectsData.push(projectDataTemp)
      userProjectsTableArray = ['<tr>',1,2,,,'</tr>']
      }
  }
var tableProject = headerUserProjectsTableArray.join(' ')
var userProjectsData = insertProjectsData.join(' ')
projectsDiv.innerHTML = tableProject + userProjectsData;
insertProjectsData = []

}

function getProjectsData(projects){
  for(let key in projects){
  switch(key){
    case 'id':
      userProjectIds.push(projects[key])
      userProjectsTableArray.splice(1, 1, '<td>' + projects[key] + '</td>')
      break;
    case 'name':
      userProjectsTableArray.splice(2, 1, '<td>' + projects[key] + '</td>')
      break;
    case 'type':
      if(projects[key] == '1'){
      userProjectsTableArray.splice(3, 1, '<td> Private </td>')
      } else{
      userProjectsTableArray.splice(3, 1, '<td> Public </td>')  
      }
    break;
    case 'status':
      if(projects[key] == '1'){
      userProjectsTableArray.splice(4, 1, '<td> Draft </td>')
      } else{
      userProjectsTableArray.splice(4, 1, '<td> Production </td>')  
      }
    break;
    default:
     
      break;
  }
 }
 if(user.role === 'ADMIN'){
  userProjectsTableArray.push('<td></td><td></td><td></td><td></td><td></td></tr>')
 } else{
  let unassignProject = `<button onclick="assignOrUnassignRelationsForUser('${assignProjectUrl}', null, ${projects.id}, 'POST')">`;
  userProjectsTableArray.splice(5,1,'<td>'  + unassignProject + 'Unassign' + '</td></tr>')
}
}

assignProjectBtn.addEventListener('click', function () {
  assignProjectBtn.style.visibility = 'hidden'
  backToEditUserProjectBtn.style.visibility = 'visible'
  backToEditUserProjectBtn.onclick = () =>window.location.href = 'useredit.html?userId='+ userId;
  projectIdsTemp=[];
  companySectionDiv.innerHTML = ''
  groupSectionDiv.innerHTML = ''
  getAndShowAvailableProjects()
})

async function getAndShowAvailableProjects() {
  const projects = await getData(availForAssProjUrl, token);
  for(var i=0; i < projects.items.length; i++){
    getAvailableForAssignProjects(projects.items[i])
      if(userProjectsTableArray[2] == 2){

      }else{
      var projectDataTemp = userProjectsTableArray.join(' ')
      insertProjectsData.push(projectDataTemp)
      userProjectsTableArray = ['<tr>',1,2,,,'</tr>']
      }
  }
var tableProject = headerUserProjectsTableArray.join(' ')
var userProjectsData = insertProjectsData.join(' ')
projectsDiv.innerHTML = tableProject + userProjectsData;
insertProjectsData = []

}

function getAvailableForAssignProjects(projects){
  for(let key in projects){
    if(userProjectIds.includes(projects.id))
    {
      var checkIdOrNot = false
      break;
    }else{
      var checkIdOrNot = true
      switch(key){
      case 'id':
        userProjectsTableArray.splice(1, 1, '<td>' + projects[key] + '</td>')
        break;
      case 'name':
        userProjectsTableArray.splice(2, 1, '<td>' + projects[key] + '</td>')
        break;
      case 'type':
        if(projects[key] == '1'){
        userProjectsTableArray.splice(3, 1, '<td> Private </td>')
        } else{
        userProjectsTableArray.splice(3, 1, '<td> Public </td>')  
        }
        break;
      case 'status':
        if(projects[key] == '1'){
        userProjectsTableArray.splice(4, 1, '<td> Draft </td>')
        } else{
        userProjectsTableArray.splice(4, 1, '<td> Production </td>')  
        }
        break;
      default:
        break;
      
    }
  }
 }
 if(checkIdOrNot){
  let assignProject = `<button onclick="assignOrUnassignRelationsForUser('${assignProjectUrl}', ${projects.id}, null, 'POST')">`;
  userProjectsTableArray.splice(5,1,'<td>'  + assignProject + 'Assign' + '</td></tr>')
  console.log(projectIdsTemp)
}
}

// *********************************************************** C O M P A N I E S *********************************************************

async function getAndShowUserCompaniesData() {
  const companies = await getData(getUserCompaniesUrl + userId, token);
  for(var i=0; i < companies.items.length; i++){
      getCompaniesData(companies.items[i])
      if(userCompaniesTableArray[2] == 2){

      }else{
      var companyDataTemp = userCompaniesTableArray.join(' ')
      insertCompaniesData.push(companyDataTemp)
      userCompaniesTableArray = ['<tr>',1,2,,,]
      }
  }
var tableCompany = headerUserCompaniesTableArray.join(' ')
var userCompaniesData = insertCompaniesData.join(' ')
companiesDiv.innerHTML = tableCompany + userCompaniesData;
insertCompaniesData = []
}

function getCompaniesData(companies){
  for(let key in companies){
    switch(key){
      case 'id':
        //alert("id")
        userCompanyIds.push(companies[key])
        userCompaniesTableArray.splice(1, 1, '<td>' + companies[key] + '</td>')
        break;
      case 'name':
        //alert("name")
        userCompaniesTableArray.splice(2, 1, '<td>' + companies[key] + '</td>')
        break;
      case 'status':
        if(companies[key] == '1'){
          userCompaniesTableArray.splice(3, 1, '<td> Draft </td>')
        } else{
          userCompaniesTableArray.splice(3, 1, '<td> Production </td>')  
        }
      break;
      default:
       
        break;
    }
   }
 if(user.role === 'ADMIN'){
  userCompaniesTableArray.push('<td></td><td></td></tr>')
 } else{
  let unassignCompany = `<button onclick="assignOrUnassignRelationsForUser('${assignCompanyUrl}', null, ${companies.id}, 'POST')">`;
  userCompaniesTableArray.splice(4,1,'<td></td><td>'  + unassignCompany + 'Unassign' + '</td></tr>') 
}
}

assignComapnyBtn.addEventListener('click', function () {
 companyIdsTemp=[];
  projectSectionDiv.innerHTML = '<h2 class="userProjectslabel">User Companies</h2><button type="button" class="subtitle-assign-buttonC1" id="companyAssign" style="visibility:hidden">Assign</button><button type="button" class="subtitle-assign-buttonC" id="backToEditC" visibility="visible">Back</button><div id="userProjectsData"></div>'
  backToEditUserCompanyBtn = document.querySelector('#backToEditC')
  backToEditUserCompanyBtn.onclick = () =>window.location.href = 'useredit.html?userId='+ userId;
  assignProjectBtn.style.visibility = 'hidden'
  companySectionDiv.innerHTML = ''
  groupSectionDiv.innerHTML = ''
  getAndShowAvailableCompanies()
})

async function getAndShowAvailableCompanies(){
  const companies = await getData(availForAssCompUrl, token);
  for(var i=0; i < companies.items.length; i++){
    getAvailableForAssignCompanies(companies.items[i])
    if(userCompaniesTableArray[2] == 2){

    }else{
      console.log(userCompaniesTableArray)
    var companyDataTemp = userCompaniesTableArray.join(' ')
    insertCompaniesData.push(companyDataTemp)
    userCompaniesTableArray = ['<tr>',1,2,,,]
    }
}
var tableCompany = headerUserCompaniesTableArray.join(' ')
var userCompaniesData = insertCompaniesData.join(' ')
var projectsDiv2 = document.querySelector('#userProjectsData')
projectsDiv2.innerHTML = tableCompany + userCompaniesData;
insertCompaniesData = []
}

async function getAvailableForAssignCompanies(companies){
  for(let key in companies){
    if(userCompanyIds.includes(companies.id))
    {
      var checkIdOrNot = false
      break;
    }else{
      var checkIdOrNot = true
      switch(key){
        case 'id':
          //userCompanyIds.push(companies[key])
          let assignCompany = `<button onclick="assignOrUnassignRelationsForUser('${assignCompanyUrl}', ${companies.id}, null, 'POST')">`;
          userCompaniesTableArray.splice(4, 1, '<td></td><td>'  + assignCompany + 'Assign' + '</td></tr>') 
          userCompaniesTableArray.splice(1, 1, '<td>' + companies[key] + '</td>')
          break;
        case 'name':
          userCompaniesTableArray.splice(2, 1, '<td>' + companies[key] + '</td>')
          break;
        case 'status':
          if(companies[key] == '1'){
            userCompaniesTableArray.splice(3, 1, '<td> Draft </td>')
          } else{
            userCompaniesTableArray.splice(3, 1, '<td> Production </td>')  
          }
        break;
        default:
         
          break;
      
    }
  }
 }
}

// *********************************************************** G R O U P S *********************************************************

async function getAndShowUserGroupsData() {

  const groups = await getData(getUserGroupsUrl + userId, token);
  for(var i=0; i < groups.items.length; i++){
      getGroupsData(groups.items[i])
      if(userGroupsTableArray[2] == 2){

      }else{
      var groupDataTemp = userGroupsTableArray.join(' ')
      insertGroupsData.push(groupDataTemp)
      userGroupsTableArray = ['<tr>',1,2,,,]
      }
  }
var tableGroup = headerUserGroupsTableArray.join(' ')
var userGroupsData = insertGroupsData.join(' ')
groupsDiv.innerHTML = tableGroup + userGroupsData;
insertGroupsData = []
}

function getGroupsData(groups){
  userGroupsTableArray.splice(0, 0, '<tr>')
  for(let key in groups){
    switch(key){
      case 'id':
        //alert("id")
        userGroupIds.push(groups[key])
        userGroupsTableArray.splice(1, 1, '<td>' + groups[key] + '</td>')
        break;
      case 'name':
        //alert("name")
        userGroupsTableArray.splice(2, 1, '<td>' + groups[key] + '</td>')
        break;
      case 'status':
        if(groups[key] == '1'){
          userGroupsTableArray.splice(3, 1, '<td> Draft </td>')
        } else{
          userGroupsTableArray.splice(3, 1, '<td> Production </td>')  
        }
        break;
      default:
        break;
    }
   }
 if(user.role === 'ADMIN'){
  userGroupsTableArray.push('<td></td><td></td></tr>')
 } else{
    let unassignGroup = `<button onclick="assignOrUnassignRelationsForUser('${assignGroupUrl}', null, ${groups.id}, 'POST')">`;
    userGroupsTableArray.splice(4, 1,'<td>'  + unassignGroup + 'Unassign' + '</td></tr>')
  }
}

assignGroupBtn.addEventListener('click', function () {
  groupIdsTemp=[];
  projectSectionDiv.innerHTML = '<h2 class="userProjectslabel">User Groups</h2><button type="button" class="subtitle-assign-buttonC1" id="groupAssign" style="visibility:hidden">Assign</button><button type="button" class="subtitle-assign-buttonC" id="backToEditG" visibility="visible">Back</button><div id="userProjectsData"></div>'
  backToEditUserGroupBtn = document.querySelector('#backToEditG')
  backToEditUserGroupBtn.onclick = () =>window.location.href = 'useredit.html?userId='+ userId;
  companySectionDiv.innerHTML = ''
  groupSectionDiv.innerHTML = ''
  getAndShowAvailableGroups()
})

async function getAndShowAvailableGroups(){
  const groups = await getData(availForAssGroupUrl, token);

  for(var i=0; i < groups.items.length; i++){
    getAvailableForAssignGroups(groups.items[i])
    if(userGroupsTableArray[2] == 2){

    }else{
    var groupDataTemp = userGroupsTableArray.join(' ')
    insertGroupsData.push(groupDataTemp)
    userGroupsTableArray = ['<tr>',1,2,,,]
    }
}
var tableGroup = headerUserGroupsTableArray.join(' ')
var userGroupsData = insertGroupsData.join(' ')
var projectsDiv3 = document.querySelector('#userProjectsData')
projectsDiv3.innerHTML = tableGroup + userGroupsData;
insertGroupsData = []
}

async function getAvailableForAssignGroups(groups){
  for(let key in groups){
    if(userGroupIds.includes(groups.id))
    {
      break;
    }else{
      switch(key){
        case 'id':
          let assignGroup = `<button onclick="assignOrUnassignRelationsForUser('${assignGroupUrl}', ${groups.id}, null, 'POST')">`;
          userGroupsTableArray.splice(4,1,'<td>'  + assignGroup + 'Assign' + '</td></tr>')
          userGroupsTableArray.splice(1, 1, '<td>' + groups[key] + '</td>')
          break;
        case 'name':
          userGroupsTableArray.splice(2, 1, '<td>' + groups[key] + '</td>')
          break;
        case 'status':
          if(groups[key] == '1'){
            userGroupsTableArray.splice(3, 1, '<td> Draft </td>')
          } else{
            userGroupsTableArray.splice(3, 1, '<td> Production </td>')  
          }
        break;
        default:
         
          break;
      
    }
  }
 }
}

