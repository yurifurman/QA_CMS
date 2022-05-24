var headerProjectsDataTable= ['<table width="100%" border="1">', '<th>Id</th>','<th>Project Name</th>', '<th>Lessons</th>','<th>Edit Date</th>','<th>Status</th>','<th>Active</th>','<th>Price $</th>','<th>Type</th>','<th>Users</th>','<th>Companies</th>','<th>Groups</th>', '<th>Action</th>','</tr>']
var projectDataTable= ['<tr>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>','</tr>']
const insertProjectsData = []

var div = document.querySelector('#projectsTable')

var activeProjectsUrl = 'https://qa-platform.severnyded.tech/api/projects?search=&pageSize=&pageNum=&onlyDeleted=false&includeDeleted=false'
var deletedProjectsUrl = 'https://qa-platform.severnyded.tech/api/projects?search=&pageSize=&pageNum=&onlyDeleted=true&includeDeleted='

const deleteOrRecoverProjectUrl = 'https://qa-platform.severnyded.tech/api/projects/'

var isDeleted = false;

const projectUsersUrl = 'https://qa-platform.severnyded.tech/api/users/project/'
const projectCompaniesUrl = '?????https://qa-platform.severnyded.tech/api/companies/users/'
const projectGroupsUrl = '??????https://qa-platform.severnyded.tech/api/groups/users/'

var filterDeletedButton = document.querySelector('#filterDeleted')
var filterActiveButton = document.querySelector('#filteractive')
var filterAll = document.querySelector('#filterall')
var createProjectButton = document.querySelector('#createProject')

var token = JSON.parse(localStorage.getItem('token'))

getAndShowData(activeProjectsUrl, isDeleted);

async function getAndShowData(url, isDeleted) {
  const project =await getData(url, token);
  for(var i=0; i < project.items.length; i++){
    if(isDeleted) {
      await viewDataDeleted(project.items[i])}
    else{
      await viewData(project.items[i])
        }
    const projectDataTempArr = projectDataTable.join(' ')
    insertProjectsData.push(projectDataTempArr)
    projectDataTable= ['<tr>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '</tr>']
    }
     var projectHeader = headerProjectsDataTable.join(' ')
     var projectsData = insertProjectsData.join(' ')
        div.innerHTML = projectHeader + projectsData;  
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

async function viewData(project){
  headerProjectsDataTable.splice(4,1, '<th>Edit Date</th>')
  for(let key in project){
    switch (key) {
      case 'id':
        projectDataTable.splice(1, 1, '<td>' + project[key] + '</td>')
        const uUrl = projectUsersUrl + project[key]
        //const cUrl = projectCompaniesUrl + project[key]
        //const gUrl = projectGroupsUrl + project[key]
        await Promise.all([getUsersProjectCount(uUrl)/*, getAndShowUserCompaniesData(cUrl), getAndShowUserGroupsData(gUrl)*/])
        break;
      case 'name':
        projectDataTable.splice(2, 1, '<td>' + project[key])
        break;
      case 'type':
        if(project[key] == '1'){
          projectDataTable.splice(8, 1, '<td>Private</td>')
          }
        else if(project[key] == '2'){
            projectDataTable.splice(8, 1, '<td>Public</td>')
          }
        else{
            projectDataTable.splice(8, 1, '<td>Unknown TYPE!!!</td>')
          }
        break; 
      case 'status':
        if(project[key] == '1'){
          projectDataTable.splice(5, 1, '<td>Draft</td>')
          }
        else if(project[key] == '2'){
            projectDataTable.splice(5, 1, '<td>Production</td>')
          }
        else{
            projectDataTable.splice(5, 1, '<td>Unknown STATUS!!!</td>')
          }
        break; 
      case 'price':
        projectDataTable.splice(7, 1, '<td>' + project[key] + '</td>')
        break;
      case 'updatedAt':
        var datetrim = project[key];
        let date = new Date(datetrim);
        projectDataTable.splice(4, 1, '<td>' + date.toLocaleString() + '</td>')
        projectDataTable.splice(6, 1, '<td>Yes</td>')
        break;
      default:
        break;
    }
 }
  projectDataTable.splice(12, 1, '<td>' + '<button onclick="editProject('+ project.id + ')">' + 'edit' + '<button onclick="deleteProject('+ project.id + ')">' + 'delete' + '</td></tr>')
}

 async function viewDataDeleted(project){
  headerProjectsDataTable.splice(4,1, '<th>Delete Date</th>')
  for(let key in project){
    switch (key) {
      case 'id':
        projectDataTable.splice(1, 1, '<td>' + project[key] + '</td>')
        const uUrl = projectUsersUrl + project[key]
        //const cUrl = projectCompaniesUrl + project[key]
        //const gUrl = projectGroupsUrl + project[key]
       // await Promise.all([getUsersProjectCount(uUrl)/*, getAndShowUserCompaniesData(cUrl), getAndShowUserGroupsData(gUrl)*/])
        break;
      case 'name':
        projectDataTable.splice(2, 1, '<td>' + project[key])
        break;
      case 'typeId':
        if(project[key] == 1){
          projectDataTable.splice(8, 1, '<td>Private</td>')
          }
        else if(project[key] == 2){
            projectDataTable.splice(8, 1, '<td>Public</td>')
          }
        else{
            projectDataTable.splice(8, 1, '<td>Unknown TYPE!!!</td>')
          }
        break; 
      case 'statusId':
        if(project[key] == 0){
          projectDataTable.splice(5, 1, '<td>Draft</td>')
          }
        else if(project[key] == 1){
            projectDataTable.splice(5, 1, '<td>Production</td>')
          }
        else{
            projectDataTable.splice(5, 1, '<td>Unknown STATUS!!!</td>')
          }
        break; 
      case 'price':
        projectDataTable.splice(7, 1, '<td>' + project[key] + '</td>')
        break;
      case 'deletedAt':
        var deleteDatetrim = project[key];
        let deleteDate = new Date(deleteDatetrim);
        projectDataTable.splice(4, 1, '<td>' + deleteDate.toLocaleString() + '</td>')
          if(project[key] == null){
            projectDataTable.splice(6, 1, '<td>Yes</td>')
            }
            else{
              projectDataTable.splice(6, 1, '<td>No</td>')
            }
          break;
      default:
        break;
    }
 }
  projectDataTable.splice(12, 1, '<td>' + '<button onclick="editProject('+ project.id + ')">' + 'edit' + '<button onclick="recoverProject('+ project.id + ')">' + 'recover' + '</td></tr>')
}

function editProject(id) {
  window.location.href = `projectedit.html?projectId=${id}`;
}

function deleteProject(id){
  
  if (confirm("Shure ?")) {
    deleteOrRecoverProjet(deleteOrRecoverProjectUrl + id, token, 'DELETE')
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

function recoverProject(id){
  if (true) {
    //alert(recoverUserApiUrl)
    deleteOrRecoverProjet(deleteOrRecoverProjectUrl + id +'/recover', token, 'PUT')
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

async function getUsersProjectCount(url) {
  const projects = await getData(url, token);
      projectDataTable.splice(9, 1, '<td>' + projects.total + '</td>');
}

createProjectButton.addEventListener('click', function(){
  window.location.href = 'projectcreate.html';
})

filterDeletedButton.addEventListener('click', function(){
  insertProjectsData.splice(0,14)
  projectDataTable= ['<tr>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>','</tr>']
  isDeleted = false;
  getAndShowData(deletedProjectsUrl, true);
})

filterActiveButton.addEventListener('click', function(){
  insertProjectsData.splice(0,14)
  projectDataTable= ['<tr>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>','</tr>']
  isDeleted = true;
  getAndShowData(activeProjectsUrl, false);
})

filterAll.addEventListener('click', function(){
  insertProjectsData.splice(0,14)
  projectDataTable= ['<tr>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>','</tr>']
  getAndShowData(activeProjectsUrl, false);
  getAndShowData(deletedProjectsUrl, true);
})

async function deleteOrRecoverProjet(url, token, methodType) {
  return fetch(url, {
    method: methodType,
    headers: token ? {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    } : { 'Content-Type': 'application/json' }
  });
  
  //return response; // parses JSON response into native JavaScript objects
}

