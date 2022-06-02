var headerProjectUsersTableArray = ['<table width="750 px" border="1">', '<th>Id</th>', '<th>Full Name</th>', '<th>Email</th>', '<th>Active</th>', '<th>Action</th>', '</tr>']
var projectUsersTableArray = ['<tr>',1,2,3,4,5,6,'</tr>']
var headerProjectCompaniesTableArray = ['<table width="750 px" border="1">', '<th>Id</th>', '<th>Company Name</th>', '<th>Status</th>', '<th>Action</th>', '</tr>']
var projectCompaniesTableArray = ['<tr>',,2,,,,,'</tr>']
var headerProjectGroupsTableArray = ['<table width="750 px" border="1">', '<th>Id</th>', '<th>Group Name</th>', '<th>Status</th>', '<th>Action</th>', '</tr>']
var projectGroupsTableArray = ['']
var headerProjectApplicationTableArray = ['<table width="750 px" border="1">', '<th>Id</th>', '<th>Application Name</th>', '<th>Status</th>', '<th>Action</th>', '</tr>']
var projectApplicationTableArray = ['<tr>',,,,,'</tr>']

let insertUsersData = []
let insertCompaniesData = []
let insertAppsData = []

var projectUsersIds = []
var userIdsTemp = []
var projecCompanyIds = []
var companyIdsTemp = []
var projecApplicationIds = []
var applicationIdsTemp = []
var projecGroupIds = []
var groupIdsTemp = []
var appListUrl = 'https://qa-platform.severnyded.tech/api/applications?search=&pageSize&pageNum&onlyDeleted=&includeDeleted=false'
var assignAppUrl = 'https://qa-platform.severnyded.tech/api/applications/projects/'
var assignUserUrl = 'https://qa-platform.severnyded.tech/api/projects/users/'
var assignCompanyUrl = 'https://qa-platform.severnyded.tech/api/companies/projects/'
var projectApplicationUrl = 'https://qa-platform.severnyded.tech/api/applications/projects/'
//var assignGroupUrl = 'https://qa-platform.severnyded.tech/api/groups/users/'

var bodyId = document.querySelector('#bodyId')

var userSectionDiv =document.querySelector('#assUser')
var companySectionDiv =document.querySelector('#assCompany')
var groupSectionDiv =document.querySelector('#assGroup')
var usersDiv = document.querySelector('#projectUsersData')
var companiesDiv = document.querySelector('#projectCompaniesData')
var groupsDiv = document.querySelector('#projectGroupsData')
var lessonsBtn = document.querySelector('#lessons')
var applicationBtn = document.querySelector('#application')


var assignUserBtn = document.querySelector('#userAssign')
var backToUserAssignBtn = document.querySelector('#backToEditP')
var assignComapnyBtn = document.querySelector('#companyAssign')
var backToCompanyAssignBtn = document.querySelector('#backToEditC')
var assignGroupBtn = document.querySelector('#groupAssign')
var backToGroupAssignBtn = document.querySelector('#backToEditG')
var appAssignBtn

var id = document.getElementById('id')
var active = document.getElementById('active')
var description = document.getElementById('description')
var lastSubscribeDate = document.getElementById('subscribeDate')
var priceDiv = document.getElementById('priceDiv')
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
paidId.addEventListener('change', function(){
  // alert('sdfdsa')
   //console.log(userMenu.value)
if (paidId.value != 1){
  priceDiv.innerHTML = ''
  changeProjectObj.item.price = null;
}
else{
  priceDiv.innerHTML = '<h1 class="loginLabel">Price</h1><input type="text" class="input" id="price"><br>'
}
}) 

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
        changeProjectObj.item.name = project.item[key]
        projectName.value = project.item[key]
        break;
      case 'description':
        description.value = project.item[key]
        break;
      case 'price':
        if(project.item[key] != null){
          priceDiv.innerHTML = '<h1 class="loginLabel">Price</h1><input type="text" class="input" id="price"><br>'
          var priceField = document.getElementById('price')
          paidId.value = 1
          priceField.value = project.item[key]
          }
        else{
          priceDiv.innerHTML = ''
          paidId.value = 2
          }
        
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
    var priceF = document.getElementById('price')
    if(priceF != null){
      changeProjectObj.item.price = priceF.value;
    }
    changeProjectObj.item.name = projectName.value;
    changeProjectObj.item.type = parseInt(typeId.value);
    changeProjectObj.item.status = parseInt(statusId.value);
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

lessons.addEventListener('click', function () {

window.location.href = 'projects/lessons.html?projectid=' + projectId;
})

applicationBtn.addEventListener('click', function () {

  applicationIdsTemp =[]; 
  userSectionDiv.innerHTML = '<h2 class="userProjectslabel">Project Application</h2><button type="button" class="subtitle-assign-buttonAss" id="appAssign" >Assign</button><div id="applicationsProjectData" class="ass-tbl"></div>'
  applicationsProjectData = document.querySelector('#applicationsProjectData')
   appAssign = document.querySelector('#appAssign')
   appAssign.onclick = () =>assign();
   companySectionDiv.innerHTML = ''
   groupSectionDiv.innerHTML = ''
   getAndShowProjectAppData()
 })

function assign(){
 applicationsProjectData = document.querySelector('#applicationsProjectData') 
   appAssign = document.querySelector('#appAssign')
   appAssign.onclick = () =>test();
   companySectionDiv.innerHTML = ''
   groupSectionDiv.innerHTML = ''
   getAndShowProjectAppAvaData()
 }

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

async function assignOrUnassignRelationsForProject(url, assignItemId = '', unassignItemId = '', methodType){
  if (confirm("Shure ?")) {
    var data = {
      "assign": assignItemId!==null? [assignItemId] : [],
      "unassign": unassignItemId!==null? [unassignItemId] : [],
    }
    await postData(url, data, methodType);
    if(assignItemId !== null){
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
  let unassignUser = `<button onclick="assignOrUnassignRelationsForProject('${assignUserUrl}${users.id}/assign/', null, ${projectId}, 'POST')">`;
  projectUsersTableArray.splice(6,1,'<td>'  + unassignUser + 'Unassign' + '</td>')
}
}

assignUserBtn.addEventListener('click', function () {
  assignUserBtn.style.visibility = 'hidden'
  backToUserAssignBtn.style.visibility = 'visible'
  backToUserAssignBtn.onclick = () =>window.location.href = 'projectedit.html?projectid='+ projectId;
  insertUsersData = [];
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
  let assignUser = `<button onclick="assignOrUnassignRelationsForProject('${assignUserUrl}${users.id}/assign/', ${projectId}, null, 'POST')">`;
  projectUsersTableArray.splice(6,1,'<td>'  + assignUser + 'Assign' + '</td></tr>')
}
}

//************************************************ C O M P A N I E S ***************************************************

async function getAndShowProjectCompaniesData() {
  const companies = await getData(getProjectCompaniesUrl + projectId, token);
  for(var i=0; i < companies.items.length; i++){
      getCompaniesData(companies.items[i])
      if(projectCompaniesTableArray[2] == 2){
      }else{
      const companyDataTemp = projectCompaniesTableArray.join(' ')
      insertCompaniesData.push(companyDataTemp)
      projectCompaniesTableArray = ['<tr>',,2,,,,,'</tr>']
      }
   
  }
var tableCompany = headerProjectCompaniesTableArray.join(' ')
var projectCompaniesData = insertCompaniesData.join(' ')
companiesDiv.innerHTML = tableCompany + projectCompaniesData;
insertCompaniesData=[]
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
      break;
  }
 }
 if(user.role === 'ADMIN'){
  projectCompaniesTableArray.push('<td></td><td></td><td></td><td></td><td></td></tr>')
 } else{
  let unassignCompany = `<button onclick="assignOrUnassignRelationsForProject('${assignCompanyUrl}${projectId}/assign/', null, ${company.id}, 'POST')">`;
  projectCompaniesTableArray.splice(4,1,'<td>'  + unassignCompany + 'Unassign' + '</td>')
}
}

assignComapnyBtn.addEventListener('click', function () {

 companyIdsTemp =[];
 userSectionDiv.innerHTML = '<h2 class="userProjectslabel">Project Companies</h2><button type="button" class="subtitle-assign-buttonC1" id="companyAssign" style="visibility:hidden">Assign</button><button type="button" class="subtitle-assign-buttonC" id="backToEditC" visibility="visible">Back</button><div id="userProjectsData"></div>'
  backToCompanyAssignBtn = document.querySelector('#backToEditC')
  backToCompanyAssignBtn.style.visibility = 'visible'
  backToCompanyAssignBtn.onclick = () =>window.location.href = 'projectedit.html?projectid='+ projectId;
  assignComapnyBtn.style.visibility = 'hidden'
  companySectionDiv.innerHTML = ''
  groupSectionDiv.innerHTML = ''
  getAndShowAvailableCompanies()
})

async function getAndShowAvailableCompanies() {
  const companies = await getData(availForAssCompUrl, token);
  for(var i=0; i < companies.items.length; i++){
    getAvailableForAssignCompanies(companies.items[i])
    if(projectCompaniesTableArray[2] == 2){
    }else{
    const companyDataTemp = projectCompaniesTableArray.join(' ')
    insertCompaniesData.push(companyDataTemp)
    projectCompaniesTableArray = ['<tr>',,2,,,,]
    }
 
}
var tableCompany = headerProjectCompaniesTableArray.join(' ')
var projectCompaniesData = insertCompaniesData.join(' ')
var usersDiv28 = document.querySelector('#userProjectsData')
usersDiv28.innerHTML = tableCompany + projectCompaniesData;
insertCompaniesData=[]

function getAvailableForAssignCompanies(company){

  for(let key in company){
    if(projecCompanyIds.includes(company.id)){
      break;
    }
    else{
      switch(key){
        case 'id':
          projectCompaniesTableArray.splice(1, 1,'<td>' + company[key] + '</td>')
          let assignCompany = `<button onclick="assignOrUnassignRelationsForProject('${assignCompanyUrl}${projectId}/assign/', ${company.id}, null, 'POST')">`;
          projectCompaniesTableArray.splice(4,1,'<td>'  + assignCompany + 'Assign' + '</td></tr>')
          break;
        case 'name':
          projectCompaniesTableArray.splice(2, 1, '<td>' + company[key])
          break;
        case 'status':
          if(company[key] == '1'){
            projectCompaniesTableArray.splice(3, 1, '<td> Draft </td>')
            }
          else{
            projectCompaniesTableArray.splice(3, 1, '<td> Ready </td>')
            }
          break;
        default:
          break;
        }
      }
    }
  }
}

//***************************************************** A P P L I C A T I O N S ******************************************************

async function getAndShowProjectAppData() {
  const apps = await getData(assignAppUrl + projectId, token);
  for(var i=0; i < apps.items.length; i++){
      getAppData(apps.items[i])
      if(projectApplicationTableArray[6] == 6){
      }else{
      const userDataTemp = projectApplicationTableArray.join(' ')
      insertAppsData.push(userDataTemp)
      projectApplicationTableArray = ['<tr>',,,,,'</tr>']
      }
   
  }
var tableApp = headerProjectApplicationTableArray.join(' ')
var projectAppsData = insertAppsData.join(' ')
applicationsProjectData.innerHTML = tableApp + projectAppsData;
insertAppsData = []
}

function getAppData(app){
  for(let key in app){
  switch(key){
    case 'id':
      projecApplicationIds.push(app[key])
      projectApplicationTableArray.splice(1, 1,'<td>' + app[key] + '</td>')
      break;
    case 'name':
      projectApplicationTableArray.splice(2, 1, '<td>' + app[key])
      break;
    case 'status':
      if(app[key] == '1'){
        projectApplicationTableArray.splice(3, 1, '<td> Draft </td>')
        }
      else{
        projectApplicationTableArray.splice(3, 1, '<td> Production </td>')
        }
      
      break;
    default:
      break;
  }
 }
 if(user.role === 'ADMIN'){
  projectApplicationTableArray.push('<td></td><td></td><td></td><td></td><td></td></tr>')
 } else{
  let unassignApp = `<button onclick="assignOrUnassignRelationsForProject('${assignAppUrl}${projectId}/assign/', null, ${app.id}, 'POST')">`;
  projectApplicationTableArray.splice(4,1,'<td>'  + unassignApp + 'Unassign' + '</td>')
}
}
async function getAndShowProjectAppAvaData() {
  const apps = await getData(appListUrl, token);
  for(var i=0; i < apps.items.length; i++){
    getAndShowAvailableProjectAppData(apps.items[i])
      if(projectApplicationTableArray[6] == 6){
      }else{
      const userDataTemp = projectApplicationTableArray.join(' ')
      insertAppsData.push(userDataTemp)
      projectApplicationTableArray = ['<tr>',,,,,'</tr>']
      }
   
  }
var tableApp = headerProjectApplicationTableArray.join(' ')
var projectAppsData = insertAppsData.join(' ')
applicationsProjectData.innerHTML = tableApp + projectAppsData;
insertAppsData = []
}

async function getAndShowAvailableProjectAppData(app) {
    for(let key in app){
      if(projecApplicationIds.includes(app.id)){
        var checkIdOrNot = false
      }
      else{
        var checkIdOrNot = true
      }
      if(checkIdOrNot){
  
        //var checkIdOrNot = true
        switch(key){
          case 'id':
            projectApplicationTableArray.splice(1, 1,'<td>' + app[key] + '</td>')
            break;
          case 'name':
            projectApplicationTableArray.splice(2, 1, '<td>' + app[key])
            break;
          case 'status':
            if(app[key] == '1'){
              projectApplicationTableArray.splice(3, 1, '<td> Draft </td>')
              }
            else{
              projectApplicationTableArray.splice(3, 1, '<td> Production </td>')
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
    let assignUser = `<button onclick="assignOrUnassignRelationsForProject('${assignAppUrl}${projectId}/assign/', ${app.id}, null, 'POST')">`;
    projectApplicationTableArray.splice(4,1,'<td>'  + assignUser + 'Assign' + '</td></tr>')
  }
  }

