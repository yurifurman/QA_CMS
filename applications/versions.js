var headerVersions= ['<table width="100%" border="1">', '<th>Id</th>', '<th>Version Name</th>', '<th>Active</th>','<th>Status</th>','<th>Last Edit</th>','<th>Action</th>','</tr>']
var versionsDataTable= ['<tr>', '<td></td>', '<td></td>', '<td></td>','<td></td>', '<td></td>', '<td></td>', '</tr>']
const insertVersionsData = []

var div = document.querySelector('#verTable')

var activeVersionsUrl = 'https://qa-platform.severnyded.tech/api/versions/applications/'
//var deleteLessonsUrl = 'https://qa-platform.severnyded.tech/api/groups?search=&pageSize=&pageNum=&onlyDeleted=true&includeDeleted='

var deleteOrRecoverVersionUrl = 'https://qa-platform.severnyded.tech/api/versions/'

//const groupUsersUrl = 'https://qa-platform.severnyded.tech/api/users/group/'

var filterDeletedButton = document.querySelector('#filterDeleted')
var filterActiveButton = document.querySelector('#filterActive')
var filterall = document.querySelector('#filterAll')
var createVersionButton = document.querySelector('#createVersion')
var backToProjectEdit = document.querySelector('#backToAppEdit')

const urlAdd = window.location.search
const appId = urlAdd.split('=')[1]

var token = JSON.parse(localStorage.getItem('token'))

getAndShowData(activeVersionsUrl + appId + '?search=&onlyDeleted&pageSize&pageNum', false);

//*************************************************************** G E N E R A L ***************************************************
async function getAndShowData(url, isDeleted) {
    const versions = await getData(url, token);
    for(var i=0; i < versions.items.length; i++){
          if(isDeleted) {
            
            await viewDataDeleted(versions.items[i])}
          else{
            //alert('sdfasf')
            await viewData(versions.items[i])}
            const lessonDataTemp = versionsDataTable.join(' ')
            insertVersionsData.push(lessonDataTemp)
            versionsDataTable= ['<tr>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '</tr>']
          }
        var versionHeader = headerVersions.join('')
        var versionData = insertVersionsData.join(' ')
        div.innerHTML = versionHeader + versionData; 
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
/*
async function viewDataDeleted(group){
  //headerGroupsTableArray.splice(6,1, '<th>Delete Date</th>')
  for(let key in group){
    switch (key) {
      
      case 'id':
        groupsDataTable.splice(1, 1, '<td>' + group[key] + '</td>')
        
        const uUrl = groupUsersUrl + group[key]
        //const cUrl = projectCompaniesUrl + project[key]
        //const gUrl = projectGroupsUrl + project[key]
        //await Promise.all([getUsersProjectCount(uUrl)])
        break;
      case 'name':
        groupsDataTable.splice(2, 1, '<td>' + group[key])
        alert('dsafasd')
        break;
      case 'typeId':
        if(group[key] == 1){
          groupsDataTable.splice(8, 1, '<td>Private</td>')
          }
        else if(group[key] == 2){
          groupsDataTable.splice(8, 1, '<td>Public</td>')
          }
        else{
          groupsDataTable.splice(8, 1, '<td>Unknown TYPE!!!</td>')
          }
        break; 
      case 'statusId':
        if(group[key] == 0){
          groupsDataTable.splice(5, 1, '<td>Draft</td>')
          }
        else if(group[key] == 1){
          groupsDataTable.splice(5, 1, '<td>Production</td>')
          }
        else{
          groupsDataTable.splice(5, 1, '<td>Unknown STATUS!!!</td>')
          }
        break; 
      case 'price':
        groupsDataTable.splice(7, 1, '<td>' + group[key] + '</td>')
        break;
      case 'updatedAt':
        var datetrim = group[key];
        let date = new Date(datetrim);
        groupsDataTable.splice(4, 1, '<td>' + date.toLocaleString() + '</td>')
        break;
      case 'projectId':
        console.log(group[key])
          await relationProject(group[key])
        break;
      case 'deletedAt':
        var deleteDatetrim = group[key];
        let deleteDate = new Date(deleteDatetrim);
        groupsDataTable.splice(6, 1, '<td>' + deleteDate.toLocaleString() + '</td>')
          if(group[key] == null){
            groupsDataTable.splice(8, 1, '<td>Yes</td>')
            }
            else{
              groupsDataTable.splice(8, 1, '<td>No</td>')
            }
          break;
      default:
        break;
    }
 }
 groupsDataTable.splice(11, 1, '<td>' + '<button onclick="editGroup('+ group.id + ')">' + 'edit' + '<button onclick="recoverGroup('+ group.id + ')">' + 'recover' + '</td></tr>')
}

async function relationProject(projectId){
  const project = await getData('https://qa-platform.severnyded.tech/api/projects/' + projectId, token)
  console.log(project.item.name )
  groupsDataTable.splice(3, 1, '<td>' + project.item.name + '</td>')
}
*/
async function viewData(version){
  //headerCopaniesTableArray.splice(6,1, '<th>Edit Date</th>')
  for(let key in version){
    switch (key) {
      case 'id':
        versionsDataTable.splice(1, 1, '<td>' + version[key] + '</td>')
        //const uUrl = groupUsersUrl + group[key]
        //const cUrl = projectCompaniesUrl + project[key]
        //const gUrl = projectGroupsUrl + project[key]*/
        //await Promise.all([usersGroupCount(uUrl)/*, getAndShowUserCompaniesData(cUrl), getAndShowUserGroupsData(gUrl)*/])
        break;
      case 'name':
        versionsDataTable.splice(2, 1, '<td>' + version[key])
        versionsDataTable.splice(3, 1, '<td>Yes</td>')
        break;
      case 'duration':
        versionsDataTable.splice(4, 1, '<td>' + version[key])
        break;
    case 'order':
        versionsDataTable.splice(2, 1, '<td>' + version[key])
        break;
      case 'type':
        if(version[key] == 1){
            versionsDataTable.splice(6, 1, '<td>Private</td>')
          }
        else if(version[key] == 2){
            versionsDataTable.splice(6, 1, '<td>Public</td>')
          }
        else{
            versionsDataTable.splice(6, 1, '<td>Unknown TYPE!!!</td>')
          }
        break; 
      case 'status':
        if(version[key] == 1){
            versionsDataTable.splice(4, 1, '<td>Draft</td>')
          }
        else if(version[key] == 2){
            versionsDataTable.splice(4, 1, '<td>Ready</td>')
          }
        else{
            versionsDataTable.splice(4, 1, '<td>Unknown STATUS!!!</td>')
          }
        break; 
      case 'updatedAt':
        var datetrim = version[key];
        let date = new Date(datetrim);
        versionsDataTable.splice(5, 1, '<td>' + date.toLocaleString() + '</td>')
        break;
      case 'applicarionId':
        console.log(version[key])
         // await relationProject(lesson[key])
        break;
      default:
        break;
    }
 }
 versionsDataTable.splice(6, 1, '<td>' + '<button onclick="editVersion('+ version.id + ')">' + 'edit' + '<button onclick="deleteVersion('+ version.id + ')">' + 'delete' + '</td></tr>')
}

function editVersion(versionId){
  window.location.href = 'versionedit.html?versionid=' + versionId + '?appid=' + appId;
}

createVersionButton.addEventListener('click', function(){
  window.location.href = 'versioncreate.html?appid=' + appId;
})


backToProjectEdit.addEventListener('click', function(){
  window.location.href = '../applicationedit.html?appid=' + appId;
})


function deleteVersion(id){
  
    if (confirm("Shure ?")) {
      deleteOrRecoverVersion(deleteOrRecoverVersionUrl + id, token, 'DELETE')
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

  async function deleteOrRecoverVersion(url, token, methodType) {
    return fetch(url, {
      method: methodType,
      headers: token ? {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      } : { 'Content-Type': 'application/json' }
    })
  }
/*
filterDeletedButton.addEventListener('click', function(){
  insertGroupsData.splice(0,13)
  groupsDataTable = ['<tr>',  '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>','</tr>']
  getAndShowData(deleteGroupsUrl, true);
})

filterActiveButton.addEventListener('click', function(){
  insertGroupsData.splice(0,13)
  groupsDataTable = ['<tr>',  '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>','</tr>']
  getAndShowData(activeGroupsUrl, false);
})

filterall.addEventListener('click', function(){
  insertGroupsData.splice(0,13)
  groupsDataTable = ['<tr>',  '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>','</tr>']
  getAndShowData(activeGroupsUrl, false);
  getAndShowData(deleteGroupsUrl, true);
})

function editGroup(id){
  window.location.href = `groupedit.html?groupId=${id}`;
}

function deleteGroup(id){
  
  if (confirm("Shure ?")) {
    deleteOrRecoverGroup(deleteOrRecoverGroupUrl + id, token, 'DELETE')
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

function recoverGroup(id){
  if (true) {
    //alert(recoverUserApiUrl)
    deleteOrRecoverGroup(deleteOrRecoverGroupUrl + id +'/recover', token, 'PUT')
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

async function usersGroupCount(url) {
  const groups = await getData(url, token);
  groupsDataTable.splice(4, 1, '<td>' + groups.total + '</td>');

}

*/