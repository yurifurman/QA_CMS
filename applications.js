var headerAppsTableArray= ['<table width="100%" border="1">', '<th>Id</th>','<th>App Name</th>', '<th>Status</th>','<th>Active</th>', '<th>Action</th>','</tr>']
var appsDataTable= ['<tr>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '</tr>']
const insertAppsData = []

var div = document.querySelector('#appTable')

var activeAppsUrl = 'https://qa-platform.severnyded.tech/api/applications?search=&pageSize&pageNum&onlyDeleted=false&includeDeleted=false'
var deleteAppsUrl = 'https://qa-platform.severnyded.tech/api/applications?search=&pageSize&pageNum&onlyDeleted=true&includeDeleted'

var deleteOrRecoverAppsUrl = 'https://qa-platform.severnyded.tech/api/applications/'

var filterDeletedButton = document.querySelector('#filterDeleted')
var filterActiveButton = document.querySelector('#filterActive')
var filterall = document.querySelector('#filterAll')
var createAppButton = document.querySelector('#createApp')

var token = JSON.parse(localStorage.getItem('token'))

getAndShowData(activeAppsUrl, false);

//*************************************************************** G E N E R A L ***************************************************
async function getAndShowData(url, isDeleted) {
    const apps = await getData(url, token);
    for(var i=0; i < apps.items.length; i++){
          if(isDeleted) {
            
            await viewDataDeleted(apps.items[i])}
          else{
            //alert('sdfasf')
            await viewData(apps.items[i])}
            const appDataTempArr = appsDataTable.join(' ')
            insertAppsData.push(appDataTempArr)
            appsDataTable = ['<tr>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '</tr>']
          }
        var appHeader = headerAppsTableArray.join('')
        var appsData = insertAppsData.join(' ')
        div.innerHTML = appHeader + appsData; 
}

async function getData(url = '', token = '') {
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: token ? {
      'Authorization': 'Bearer ' + token}:{},
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
  })
 return await response.json();
}

async function viewDataDeleted(app){
  //headerGroupsTableArray.splice(6,1, '<th>Delete Date</th>')
  for(let key in app){
    switch (key) {
      
      case 'id':
        appsDataTable.splice(1, 1, '<td>' + app[key] + '</td>')
        
        //const cUrl = projectCompaniesUrl + project[key]
        //const gUrl = projectGroupsUrl + project[key]
        //await Promise.all([getUsersProjectCount(uUrl)])
        break;
      case 'name':
        appsDataTable.splice(2, 1, '<td>' + app[key])
        break;
      case 'typeId':
        if(app[key] == 1){
            appsDataTable.splice(8, 1, '<td>Private</td>')
          }
        else if(app[key] == 2){
            appsDataTable.splice(8, 1, '<td>Public</td>')
          }
        else{
            appsDataTable.splice(8, 1, '<td>Unknown TYPE!!!</td>')
          }
        break; 
      case 'statusId':
        if(app[key] == 0){
            appsDataTable.splice(3, 1, '<td>Draft</td>')
          }
        else if(app[key] == 1){
            appsDataTable.splice(3, 1, '<td>Production</td>')
          }
        else{
            appsDataTable.splice(3, 1, '<td>Unknown STATUS!!!</td>')
          }
        break; 
      case 'price':
        appsDataTable.splice(7, 1, '<td>' + app[key] + '</td>')
        break;
      case 'updatedAt':
        var datetrim = app[key];
        let date = new Date(datetrim);
        appsDataTable.splice(4, 1, '<td>' + date.toLocaleString() + '</td>')
        break;
      case 'projectId':
        console.log(app[key])
          await relationProject(app[key])
        break;
      case 'deletedAt':
          if(app[key] == null){
            appsDataTable.splice(4, 1, '<td>Yes</td>')
            }
            else{
                appsDataTable.splice(4, 1, '<td>No</td>')
            }
          break;
      default:
        break;
    }
 }
 appsDataTable.splice(5, 1, '<td>' + '<button onclick="editApp('+ app.id + ')">' + 'edit' + '<button onclick="recoverApp('+ app.id + ')">' + 'recover' + '</td></tr>')
}

async function relationProject(projectId){
  const project = await getData('https://qa-platform.severnyded.tech/api/projects/' + projectId, token)
  console.log(project.item.name )
  appsDataTable.splice(3, 1, '<td>' + project.item.name + '</td>')
}

async function viewData(app){
  //headerCopaniesTableArray.splice(6,1, '<th>Edit Date</th>')
  for(let key in app){
    switch (key) {
      case 'id':
        appsDataTable.splice(1, 1, '<td>' + app[key] + '</td>')
       // const uUrl = groupUsersUrl + app[key]
        //const cUrl = projectCompaniesUrl + project[key]
        //const gUrl = projectGroupsUrl + project[key]
        //await Promise.all([usersGroupCount(uUrl)/*, getAndShowUserCompaniesData(cUrl), getAndShowUserGroupsData(gUrl)*/])
        break;
      case 'name':
        appsDataTable.splice(2, 1, '<td>' + app[key])
        break;
      case 'type':
        if(app[key] == 1){
            appsDataTable.splice(9, 1, '<td>Private</td>')
          }
        else if(app[key] == 2){
            appsDataTable.splice(9, 1, '<td>Public</td>')
          }
        else{
            appsDataTable.splice(9, 1, '<td>Unknown TYPE!!!</td>')
          }
        break; 
      case 'status':
        if(app[key] == 1){
            appsDataTable.splice(3, 1, '<td>Draft</td>')
          }
        else if(app[key] == 2){
            appsDataTable.splice(3, 1, '<td>Production</td>')
          }
        else{
            appsDataTable.splice(3, 1, '<td>Unknown STATUS!!!</td>')
          }
        break; 
      case 'updatedAt':
        var datetrim = app[key];
        let date = new Date(datetrim);
        appsDataTable.splice(4, 1, '<td>' + date.toLocaleString() + '</td>')
        break;
      case 'projectId':
        console.log(app[key])
          await relationProject(app[key])
        break;
    case 'deletedAt':
        //var deleteDatetrim = app[key];
        //let deleteDate = new Date(deleteDatetrim);
        //appsDataTable.splice(6, 1, '<td>' + deleteDate.toLocaleString() + '</td>')
            if(app[key] == null){
            appsDataTable.splice(4, 1, '<td>Yes</td>')
            }
            else{
                appsDataTable.splice(4, 1, '<td>No</td>')
            }
      default:
        break;
    }
 }
 appsDataTable.splice(5, 1, '<td>' + '<button onclick="editApp('+ app.id + ')">' + 'edit' + '<button onclick="deleteApp('+ app.id + ')">' + 'delete' + '</td></tr>')
}

createAppButton.addEventListener('click', function(){
  window.location.href = 'applicationcreate.html';
})

filterDeletedButton.addEventListener('click', function(){
    insertAppsData.splice(0,13)
  appsDataTable = ['<tr>',  '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>','</tr>']
  getAndShowData(deleteAppsUrl, true);
})

filterActiveButton.addEventListener('click', function(){
    insertAppsData.splice(0,13)
  appsDataTable = ['<tr>',  '<td></td>', '<td></td>',  '<td></td>', '<td></td>', '<td></td>','</tr>']
  getAndShowData(activeAppsUrl, false);
})

filterall.addEventListener('click', function(){
    insertAppsData.splice(0,7)
  appsDataTable = ['<tr>',  '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>','</tr>']
  getAndShowData(activeAppsUrl, false);
  getAndShowData(deleteAppsUrl, true);
})

function editApp(id){
  window.location.href = `applicationedit.html?appId=${id}`;
}

function deleteApp(id){
  
  if (confirm("Shure ?")) {
    deleteOrRecoverApp(deleteOrRecoverAppsUrl + id, token, 'DELETE')
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

function recoverApp(id){
  if (true) {
    //alert(recoverUserApiUrl)
    deleteOrRecoverApp(deleteOrRecoverAppsUrl + id +'/recover', token, 'PUT')
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
    validation.style.visibility = 'visible';
  }
  //location.reload();
}
/*
async function usersGroupCount(url) {
  const groups = await getData(url, token);
  groupsDataTable.splice(4, 1, '<td>' + groups.total + '</td>');

}*/

async function deleteOrRecoverApp(url, token, methodType) {
  return fetch(url, {
    method: methodType,
    headers: token ? {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    } : { 'Content-Type': 'application/json' }
  })
}