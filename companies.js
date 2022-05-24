var headerCompaniesTableArray= ['<table width="100%" border="1">', '<th>Id</th>','<th>Company Name</th>', '<th>Users</th>','<th>Projects</th>','<th>Groups</th>','<th>Edit Date</th>','<th>Status</th>','<th>Active</th>','<th>Contract Name</th>','<th>Contract Type</th>','<th>Contract Exp. Date</th>', '<th>Action</th>','</tr>']
var companiesDataTable= ['<tr>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>','</tr>']
const insertCompaniesData = []

var div = document.querySelector('#companiesTable')

var activeCompaniesUrl = 'https://qa-platform.severnyded.tech/api/companies?search=&pageSize=&pageNum=&onlyDeleted=false&includeDeleted=false'
var deleteCompaniesUrl = 'https://qa-platform.severnyded.tech/api/companies?search=&pageSize=&pageNum=&onlyDeleted=true&includeDeleted='

var deleteOrRecoverCompanyUrl = 'https://qa-platform.severnyded.tech/api/companies/'

var isDeleted = false;

const companyUsersUrl = 'https://qa-platform.severnyded.tech/api/users/company/'

var filterDeletedButton = document.querySelector('#filterDeleted')
var filterActiveButton = document.querySelector('#filterActive')
var filterall = document.querySelector('#filterAll')
var createCompanyButton = document.querySelector('#createCompany')

var token = JSON.parse(localStorage.getItem('token'))

getAndShowData(activeCompaniesUrl, isDeleted);

//*************************************************************** G E N E R A L ***************************************************
async function getAndShowData(url, isDeleted) {
    const companies = await getData(url, token);
    for(var i=0; i < companies.items.length; i++){
          if(isDeleted) {
            
            await viewDataDeleted(companies.items[i])}
          else{
            //alert('sdfasf')
            await viewData(companies.items[i])}
            const companyDataTempArr = companiesDataTable.join(' ')
            insertCompaniesData.push(companyDataTempArr)
            companiesDataTable= ['<tr>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '</tr>']
          }
        var companyHeader = headerCompaniesTableArray.join('')
        var companiesData = insertCompaniesData.join(' ')
        div.innerHTML = companyHeader + companiesData; 
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

async function viewDataDeleted(company){
  headerCompaniesTableArray.splice(6,1, '<th>Delete Date</th>')
  for(let key in company){
    switch (key) {
      
      case 'id':
        companiesDataTable.splice(1, 1, '<td>' + company[key] + '</td>')
        
        const uUrl = companyUsersUrl + company[key]
        //const cUrl = projectCompaniesUrl + project[key]
        //const gUrl = projectGroupsUrl + project[key]
        //await Promise.all([getUsersProjectCount(uUrl)])
        break;
      case 'name':
        companiesDataTable.splice(2, 1, '<td>' + company[key])
        break;
      case 'typeId':
        if(company[key] == 1){
          companiesDataTable.splice(8, 1, '<td>Private</td>')
          }
        else if(company[key] == 2){
          companiesDataTable.splice(8, 1, '<td>Public</td>')
          }
        else{
          companiesDataTable.splice(8, 1, '<td>Unknown TYPE!!!</td>')
          }
        break; 
      case 'statusId':
        if(company[key] == 0){
          companiesDataTable.splice(5, 1, '<td>Draft</td>')
          }
        else if(company[key] == 1){
          companiesDataTable.splice(5, 1, '<td>Production</td>')
          }
        else{
          companiesDataTable.splice(5, 1, '<td>Unknown STATUS!!!</td>')
          }
        break; 
      case 'price':
        companiesDataTable.splice(7, 1, '<td>' + company[key] + '</td>')
        break;
      case 'deletedAt':
        var deleteDatetrim = company[key];
        let deleteDate = new Date(deleteDatetrim);
        companiesDataTable.splice(6, 1, '<td>' + deleteDate.toLocaleString() + '</td>')
        companiesDataTable.splice(8, 1, '<td>No</td>')
        break;
      default:
        break;
    }
 }
 companiesDataTable.splice(12, 1, '<td>' + '<button onclick="editCompany('+ company.id + ')">' + 'edit' + '<button onclick="recoverCompany('+ company.id + ')">' + 'recover' + '</td></tr>')
}

async function viewData(company){
  headerCompaniesTableArray.splice(6,1, '<th>Edit Date</th>')
  for(let key in company){
    switch (key) {
      case 'id':
        companiesDataTable.splice(1, 1, '<td>' + company[key] + '</td>')
        const uUrl = companyUsersUrl + company[key]
        //const cUrl = projectCompaniesUrl + project[key]
        //const gUrl = projectGroupsUrl + project[key]
        await Promise.all([usersCompanyCount(uUrl)/*, getAndShowUserCompaniesData(cUrl), getAndShowUserGroupsData(gUrl)*/])
        break;
      case 'name':
        companiesDataTable.splice(2, 1, '<td>' + company[key])
        break;
      case 'typeId':
        if(company[key] == 1){
          companiesDataTable.splice(8, 1, '<td>Private</td>')
          }
        else if(company[key] == 2){
          companiesDataTable.splice(8, 1, '<td>Public</td>')
          }
        else{
          companiesDataTable.splice(8, 1, '<td>Unknown TYPE!!!</td>')
          }
        break; 
      case 'statusId':
        if(company[key] == 0){
          companiesDataTable.splice(5, 1, '<td>Draft</td>')
          }
        else if(company[key] == 1){
          companiesDataTable.splice(5, 1, '<td>Production</td>')
          }
        else{
          companiesDataTable.splice(5, 1, '<td>Unknown STATUS!!!</td>')
          }
        break; 
      case 'price':
        companiesDataTable.splice(7, 1, '<td>' + company[key] + '</td>')
        break;
      case 'updatedAt':
        var datetrim = company[key];
        let date = new Date(datetrim);
        companiesDataTable.splice(6, 1, '<td>' + date.toLocaleString() + '</td>')
        companiesDataTable.splice(8, 1, '<td>Yes</td>')
        break;
      default:
        break;
    }
 }
 companiesDataTable.splice(12, 1, '<td>' + '<button onclick="editCompany('+ company.id + ')">' + 'edit' + '<button onclick="deleteCompany('+ company.id + ')">' + 'delete' + '</td></tr>')
}

createCompanyButton.addEventListener('click', function(){
  window.location.href = 'companycreate.html';
})

filterDeletedButton.addEventListener('click', function(){
  insertCompaniesData.splice(0,14)
  companiesDataTable= ['<tr>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>','</tr>']
  getAndShowData(deleteCompaniesUrl, true);
})

filterActiveButton.addEventListener('click', function(){
  insertCompaniesData.splice(0,14)
  companiesDataTable= ['<tr>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>','</tr>']
  getAndShowData(activeCompaniesUrl, false);
})

filterall.addEventListener('click', function(){
  insertCompaniesData.splice(0,14)
  companiesDataTable= ['<tr>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>','</tr>']
  getAndShowData(activeCompaniesUrl, false);
  getAndShowData(deleteCompaniesUrl, true);
})
createCompanyButton.addEventListener('click', function(){
  window.location.href = 'companycreate.html';
})

function editCompany(id){
  window.location.href = `companyedit.html?companyId=${id}`;
}

function deleteCompany(id){
  
  if (confirm("Shure ?")) {
    deleteOrRecoverCompany(deleteOrRecoverCompanyUrl + id, token, 'DELETE')
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

function recoverCompany(id){
  if (true) {
    //alert(recoverUserApiUrl)
    deleteOrRecoverCompany(deleteOrRecoverCompanyUrl + id +'/recover', token, 'PUT')
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

async function usersCompanyCount(url) {
  const companies = await getData(url, token);
  companiesDataTable.splice(3, 1, '<td>' + companies.total + '</td>');

}

async function deleteOrRecoverCompany(url, token, methodType) {
  return fetch(url, {
    method: methodType,
    headers: token ? {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    } : { 'Content-Type': 'application/json' }
  })
}