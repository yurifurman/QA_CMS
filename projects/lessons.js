var headerLessons= ['<table width="100%" border="1">', '<th>Id</th>','<th>Order</th>', '<th>Lesson Name</th>','<th>Duration</th>', '<th>Active</th>', '<th>Type</th>','<th>Status</th>','<th>Last Edit</th>','<th>Action</th>','</tr>']
var lessonsDataTable= ['<tr>', , , , , , , , , '</tr>']
const insertLessonsData = []

var div = document.querySelector('#lessonsTable')

var activeLessonsUrl = 'https://qa-platform.severnyded.tech/api/lessons/projects/'

var deleteOrRecoverLessonUrl = 'https://qa-platform.severnyded.tech/api/lessons/'

var filterDeletedButton = document.querySelector('#filterDeleted')
var filterActiveButton = document.querySelector('#filterActive')
var filterall = document.querySelector('#filterAll')
var createLessonButton = document.querySelector('#createLesson')
var backToProjectEdit = document.querySelector('#backToProjectEdit')

const url = window.location.search
const projectId = url.split('=')[1] 

var token = JSON.parse(localStorage.getItem('token'))

getAndShowData(activeLessonsUrl + projectId, false);

//*************************************************************** G E N E R A L ***************************************************
async function getAndShowData(url, isDeleted) {
    const lessons = await getData(url, token);
    for(var i=0; i < lessons.items.length; i++){
          if(isDeleted) {
            
            await viewDataDeleted(lessons.items[i])}
          else{
            //alert('sdfasf')
            await viewData(lessons.items[i])}
            const lessonDataTemp = lessonsDataTable.join(' ')
            insertLessonsData.push(lessonDataTemp)
            lessonsDataTable= ['<tr>', , , , , , , , , '</tr>']
          }
        var lessonHeader = headerLessons.join('')
        var lessonData = insertLessonsData.join(' ')
        div.innerHTML = lessonHeader + lessonData; 
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
async function viewData(lesson){
  //headerCopaniesTableArray.splice(6,1, '<th>Edit Date</th>')
  if(lesson.deletedAt == null){
  for(let key in lesson){
    switch (key) {
      case 'id':
        lessonsDataTable.splice(1, 1, '<td>' + lesson[key] + '</td>')
        //const uUrl = groupUsersUrl + group[key]
        //const cUrl = projectCompaniesUrl + project[key]
        //const gUrl = projectGroupsUrl + project[key]*/
        //await Promise.all([usersGroupCount(uUrl)/*, getAndShowUserCompaniesData(cUrl), getAndShowUserGroupsData(gUrl)*/])
        break;
      case 'name':
        lessonsDataTable.splice(3, 1, '<td>' + lesson[key])

        break;
      case 'duration':
        lessonsDataTable.splice(4, 1, '<td>' + lesson[key])
        break;
    case 'order':
        lessonsDataTable.splice(2, 1, '<td>' + lesson[key])
        break;
      case 'type':
        if(lesson[key] == 1){
            lessonsDataTable.splice(6, 1, '<td>Private</td>')
          }
        else if(lesson[key] == 2){
            lessonsDataTable.splice(6, 1, '<td>Public</td>')
          }
        else{
            lessonsDataTable.splice(6, 1, '<td>Unknown TYPE!!!</td>')
          }
        break; 
      case 'status':
        if(lesson[key] == 1){
            lessonsDataTable.splice(7, 1, '<td>Draft</td>')
          }
        else if(lesson[key] == 2){
            lessonsDataTable.splice(7, 1, '<td>Production</td>')
          }
        else{
            lessonsDataTable.splice(7, 1, '<td>Unknown STATUS!!!</td>')
          }
        break; 
      case 'updatedAt':
        var datetrim = lesson[key];
        let date = new Date(datetrim);
        lessonsDataTable.splice(8, 1, '<td>' + date.toLocaleString() + '</td>')
        break;
      case 'deletedAt':
            if(lesson[key] == null){
              lessonsDataTable.splice(5, 1, '<td>Yes</td>')
              }
              else{
                lessonsDataTable.splice(5, 1, '<td>No</td>')
              }
            break;
      case 'projectId':
        console.log(lesson[key])
         // await relationProject(lesson[key])
        break;
      default:
        break;
            }
    }
    lessonsDataTable.splice(9, 1, '<td>' + '<button onclick="editLesson('+ lesson.id + ')">' + 'edit' + '<button onclick="deleteLesson('+ lesson.id + ')">' + 'delete' + '</td></tr>')
 }
 else{
      
}
}

function editLesson(lessonId){
  window.location.href = 'lessonedit.html?lessonid=' + lessonId + '?projectid=' + projectId;
}

createLessonButton.addEventListener('click', function(){
  window.location.href = 'lessoncreate.html?projectid=' + projectId;
})


backToProjectEdit.addEventListener('click', function(){
  window.location.href = '../projectedit.html?projectid=' + projectId;
})


function deleteLesson(id){
  
  if (confirm("Shure ?")) {
    deleteOrRecoverLesson(deleteOrRecoverLessonUrl + id, token, 'DELETE')
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

async function deleteOrRecoverLesson(url, token, methodType) {
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

async function deleteOrRecoverGroup(url, token, methodType) {
  return fetch(url, {
    method: methodType,
    headers: token ? {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    } : { 'Content-Type': 'application/json' }
  })
}*/