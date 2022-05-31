var userButton = document.querySelector('#user')
var projectButton = document.querySelector('#project')
var companyButton = document.querySelector('#company')
var groupsButton = document.querySelector('#group')
var applicationButton = document.querySelector('#applicationHeader')
var searchInput = document.querySelector('#search')
var myAccount = document.getElementById('myAccount')
var menuDisplaying = false;


userButton.addEventListener('mouseenter', function(){
    userButton.style.background = "#aac5d3"; 
    userButton.style.border = '1px solid #000000';
})
         
userButton.addEventListener('mouseleave', function(){
    userButton.style.background = "#f4a837";
    userButton.style.border = '1px solid #000000';
}) 

projectButton.addEventListener('mouseenter', function(){
    projectButton.style.background = "#aac5d3"; 
    projectButton.style.border = '1px solid #000000';
})
         
projectButton.addEventListener('mouseleave', function(){
    projectButton.style.background = "#f4a837";
    projectButton.style.border = '1px solid #000000';
}) 

companyButton.addEventListener('mouseenter', function(){
    companyButton.style.background = "#aac5d3"; 
    companyButton.style.border = '1px solid #000000';
})
         
companyButton.addEventListener('mouseleave', function(){
    companyButton.style.background = "#f4a837";
    companyButton.style.border = '1px solid #000000';
}) 

groupsButton.addEventListener('mouseenter', function(){
    groupsButton.style.background = "#aac5d3"; 
    groupsButton.style.border = '1px solid #000000';
})
         
groupsButton.addEventListener('mouseleave', function(){
    groupsButton.style.background = "#f4a837";
    groupsButton.style.border = '1px solid #000000';
}) 

searchInput.addEventListener('mouseenter', function(){
    searchInput.style.background = "#fff"; 
})
         
searchInput.addEventListener('mouseleave', function(){
    searchInput.style.background = "#f3f1f1";
}) 

userButton.addEventListener('click', function(){
    window.location.href = '../users.html';
    userButton.style.background = "#aac5d3";
    userButton.style.border = '1px solid #000000';
}) 

companyButton.addEventListener('click', function(){
    window.location.href = '../companies.html';
    userButton.style.background = "#aac5d3";
    userButton.style.border = '1px solid #000000';
}) 

applicationButton.addEventListener('click', function(){
    window.location.href = '../applications.html';
    applicationButton.style.background = "#aac5d3";
    applicationButton.style.border = '1px solid #000000';
}) 

projectButton.addEventListener('click', function(){
    window.location.href = '../projects.html';
    userButton.style.background = "#aac5d3";
    userButton.style.border = '1px solid #000000';
}) 

groupsButton.addEventListener('click', function(){
    window.location.href = '../groups.html';
    groupsButton.style.background = "#aac5d3";
    groupsButton.style.border = '1px solid #000000';
}) 

userClick.addEventListener('click', function(){
    if(menuDisplaying){
        menuDisplaying = false;
        myAccount.innerHTML = '';
    }
    else{
        menuDisplaying = true;
        myAccount.innerHTML = '<select id="userMenu" class="input"> <option value="">MENU</option><option value="0" >User Settings</option><option value="1">Log Out</option></select> '; 

            }
})


myAccount.addEventListener('change', function(){
   // alert('sdfdsa')
    //console.log(userMenu.value)
    switch(userMenu.value){
        case '0':
            console.log('0')
            menuDisplaying = false;
            myAccount.innerHTML = '';
            window.location.href = '../account.html';
          break;
        case '1':
            console.log('1')
            menuDisplaying = false;
            myAccount.innerHTML = '';
            window.location.href = '../login.html';
          break;  
        default:
          break;
}
})