var headerGroupsTableArray= ['<table width="100%" border="1">', '<th>Id</th>','<th>Group Name</th>', '<th>Project Name</th>','<th>Users</th>','<th>Companies</th>','<th>Start Course Date</th>','<th>Status</th>','<th>Active</th>','<th>Type</th>','<th>End Course Date</th>', '<th>Action</th>','</tr>']
var groupsDataTable= ['<tr>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>','</tr>']
const insertGroupsData = []

var div = document.querySelector('#groupsTable')

var activeGroupsUrl = 'https://qa-platform.severnyded.tech/api/groups?search=&pageSize=&pageNum=&onlyDeleted=false&includeDeleted=false'
var deleteGroupsUrl = 'https://qa-platform.severnyded.tech/api/groups?search=&pageSize=&pageNum=&onlyDeleted=true&includeDeleted='

var deleteOrRecoverGroupUrl = 'https://qa-platform.severnyded.tech/api/groups/'

const groupUsersUrl = 'https://qa-platform.severnyded.tech/api/users/group/'

var filterDeletedButton = document.querySelector('#filterDeleted')
var filterActiveButton = document.querySelector('#filterActive')
var filterall = document.querySelector('#filterAll')
var createGroupButton = document.querySelector('#createGroup')

var token = JSON.parse(localStorage.getItem('token'))

getAndShowData(activeGroupsUrl, false);

//*************************************************************** G E N E R A L ***************************************************
async function getAndShowData(url, isDeleted) {
    const groups = await getData(url, token);
    for(var i=0; i < groups.items.length; i++){
          if(isDeleted) {
            
            await viewDataDeleted(groups.items[i])}
          else{
            //alert('sdfasf')
            await viewData(groups.items[i])}
            const groupDataTempArr = groupsDataTable.join(' ')
            insertGroupsData.push(groupDataTempArr)
            groupsDataTable= ['<tr>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '</tr>']
          }
        var groupHeader = headerGroupsTableArray.join('')
        var groupsData = insertGroupsData.join(' ')
        div.innerHTML = groupHeader + groupsData; 
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

async function viewData(group){
  //headerCopaniesTableArray.splice(6,1, '<th>Edit Date</th>')
  for(let key in group){
    switch (key) {
      case 'id':
        groupsDataTable.splice(1, 1, '<td>' + group[key] + '</td>')
        const uUrl = groupUsersUrl + group[key]
        //const cUrl = projectCompaniesUrl + project[key]
        //const gUrl = projectGroupsUrl + project[key]
        await Promise.all([usersGroupCount(uUrl)/*, getAndShowUserCompaniesData(cUrl), getAndShowUserGroupsData(gUrl)*/])
        break;
      case 'name':
        groupsDataTable.splice(2, 1, '<td>' + group[key])
        groupsDataTable.splice(8, 1, '<td>Yes</td>')
        break;
      case 'type':
        if(group[key] == 1){
          groupsDataTable.splice(9, 1, '<td>Private</td>')
          }
        else if(group[key] == 2){
          groupsDataTable.splice(9, 1, '<td>Public</td>')
          }
        else{
          groupsDataTable.splice(9, 1, '<td>Unknown TYPE!!!</td>')
          }
        break; 
      case 'status':
        if(group[key] == 1){
          groupsDataTable.splice(7, 1, '<td>Draft</td>')
          }
        else if(group[key] == 2){
          groupsDataTable.splice(7, 1, '<td>Production</td>')
          }
        else{
          groupsDataTable.splice(7, 1, '<td>Unknown STATUS!!!</td>')
          }
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
      default:
        break;
    }
 }
 groupsDataTable.splice(11, 1, '<td>' + '<button onclick="editGroup('+ group.id + ')">' + 'edit' + '<button onclick="deleteGroup('+ group.id + ')">' + 'delete' + '</td></tr>')
}

createGroupButton.addEventListener('click', function(){
  window.location.href = 'groupcreate.html';
})

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

async function deleteOrRecoverGroup(url, token, methodType) {
  return fetch(url, {
    method: methodType,
    headers: token ? {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    } : { 'Content-Type': 'application/json' }
  })
}