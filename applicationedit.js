var headerCalendarTableArray = ['<table width="750 px" border="1">', '<th>Id</th>', '<th>Full Name</th>', '<th>Email</th>', '<th>Active</th>', '<th>Action</th>', '</tr>']
var calendarData = ['<tr>',1,2,3,4,5,6,'</tr>']

let insertCalendarData = []

var saveApp = document.querySelector('#saveApp')
var backToApps = document.querySelector('#backToApp')


var versionsBtn = document.querySelector('#versions')

var id = document.getElementById('id')
var description = document.getElementById('description')
var statusId = document.getElementById('statusSelect')
var groupName = document.getElementById('appName')
var description = document.getElementById('description')

const appUrl = 'https://qa-platform.severnyded.tech/api/applications/'

//var availForAssUserUrl = 'https://qa-platform.severnyded.tech/api/users?search=&pageSize=&pageNum=&onlyDeleted=&includeDeleted=false'
//var availForAssCompUrl = 'https://qa-platform.severnyded.tech/api/companies?search=&pageSize=&pageNum=&onlyDeleted=&includeDeleted=false'
//var availForAssGroupUrl = 'https://qa-platform.severnyded.tech/api/groups?search=&pageSize=&pageNum=&onlyDeleted=&includeDeleted=false'

var validation = document.querySelector('#validation')
var labelPage = document.querySelector('#pageTitleWithAppName')
var token = JSON.parse(localStorage.getItem('token'))

const url = window.location.search
const appId = url.split('=')[1]


var changeAppObj = {
    item: {
        id: '',
        name: '',
        description: '',
        status: '',
    }
  } 

  getAndShowAppData();

//************************************************ G E N E R A L ***************************************************

async function getAndShowAppData() {
  const app = await getData(appUrl + appId, token);
  for(let key in app.item){
    switch(key){
      case 'id':
        id.value = app.item[key]
        break;
      case 'status':
        statusId.value = app.item[key] 
        break;  
      case 'name':
        labelPage.innerHTML = 'Edit ' + app.item[key] + ' application'
        appName.value =app.item[key]
        break;
      case 'description':
        description.value =app.item[key]
        break;
      case 'projectId':
        console.log(app.item[key])
        await relationProject(app.item[key])
        var parentProject2 = document.getElementById('parentProject')
        parentProject2.value =app.item[key]
        break;
      case 'deletedAt':
        if(app.item[key] == null){
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

saveApp.addEventListener('click', function () {
  if (true) {
    changeAppObj.item.name = appName.value;
    changeAppObj.item.description = description.value;
    changeAppObj.item.id = id.value;
    changeAppObj.item.status = statusId.value;
    editAppData(appUrl + appId, changeAppObj.item, 'PUT')
      .then((data) => {
        resp = data
        if (resp.message) {
          validation.textContent = resp.message
          validation.style.visibility = 'visible';
        }
        else{
          window.location.href = 'applications.html';
        }
      })
  }
  else {
    validation.style.visibility = 'visible';
  }
})

backToApps.addEventListener('click', function () {
  if (confirm("Shure ?")) {
    window.location.href = 'applications.html';
  }
})

versions.addEventListener('click', function () {

    window.location.href = 'applications/versions.html?appid=' + appId;
    })
    
active.addEventListener('change', function () {

  switch(active.checked){
    case true:
      recoverApp()
      
      //location.reload();
      break;
    case false:
      //console.log("false")
     deleteApp()
      //window.location.href = 'users.html';
      
      //location.reload();
      break;
    default:
      break;
}
})

function deleteOrRecoverApp(url, token, methodType) {
  return fetch(url, {
    method: methodType,
    headers: token ? {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    } : { 'Content-Type': 'application/json' }
  });
}

function recoverApp() {
  deleteOrRecoverApp(appUrl + appId +'/recover', token, 'PUT')
    .then((data) => {
      resp = data
      if (resp.message) {
        validation.textContent = resp.message
        validation.style.visibility = 'visible';
      }
      //location.reload();
    })
}

async function editAppData(url, data, methodType) {
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