var validation = document.querySelector('#validation')
var signin = document.getElementById('signin')
var login = document.getElementById('login')
var password = document.getElementById('pass')
var image = document.getElementById('eye')
var authUrl ='https://qa-platform.severnyded.tech/api/auth/login'
var meUrl = 'https://qa-platform.severnyded.tech/api/auth/me'
var auten ={
    email: '',
    password: ''

}
var resp ={}



signin.addEventListener('mouseenter', function(){
    this.style.fontSize = '22px'
})
        
signin.addEventListener('mouseleave', function(){
    this.style.fontSize = '18px'
}) 

login.addEventListener('mouseenter', function(){
    this.style.background = '#ffffff'
})
        
login.addEventListener('mouseleave', function(){
    if(login.value && login.value.trim()){
    this.style.background = '#ffffff'
   } else{
    this.style.background = '#f1eeee'
   }
}) 

login.addEventListener('change', function(e){
    if(login.value && login.value.trim()){
        auten.email = login.value.trim()}
 //   getData('https://qa-platform.severnyded.tech/api/auth/me', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBzZXZlcm55ZGVkLnRlY2giLCJpYXQiOjE2NDk5MzYwMzEsImV4cCI6MTY1MTI1MDAzMX0.-EU5t8Q_p-JAs8uMT_sCpHK5QS55oN8U9V-z23gyKRQ')
console.log(e.target.value)

}) 

password.addEventListener('change', function(e){
    if(password.value && password.value.trim()){
        auten.password = password.value.trim()}
 //   getData('https://qa-platform.severnyded.tech/api/auth/me', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBzZXZlcm55ZGVkLnRlY2giLCJpYXQiOjE2NDk5MzYwMzEsImV4cCI6MTY1MTI1MDAzMX0.-EU5t8Q_p-JAs8uMT_sCpHK5QS55oN8U9V-z23gyKRQ')
console.log(e.target.value)
}) 

pass.addEventListener('mouseenter', function(){
    this.style.background = '#ffffff'
})
        
pass.addEventListener('mouseleave', function(){
    if(password.value && password.value.trim()){
        this.style.background = '#ffffff'
    } else{
    this.style.background = '#f1eeee'
    }
}) 

signin.addEventListener('click', function(){
    if(password.value && login.value && login.value.trim() && password.value.trim()){
        
        postData(authUrl, auten)
    .then((data) => {
       resp = data 
      console.log(resp); // JSON data parsed by `response.json()` call
      if(resp.message)
        {
            validation.textContent = resp.message
            validation.style.visibility = 'visible';
            login.style.border = '1px solid red';
            password.style.border = '1px solid red';
            image.style.display = 'block';
        }else{
            localStorage.setItem('token', JSON.stringify(resp.token))
            if(localStorage.getItem('token')){
                var token = JSON.parse(localStorage.getItem('token'))
                getData(meUrl, token)
                window.location.href = 'dashboard.html';
            }
        }
        
    });

    }
    else{
        image.style.display = 'none';
    }
    
})

/*
const input = (elementId, onClick, onChange) => {
    const element = document.getElementById(elementId);
    element.addEventListener('click', onClick);
    element.addEventListener('change', onChange);
}


//input('login', (e) => {console.log(e.target.value)}, () => {});
*/
async function postData(url = '', data = {}, token = '') {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: token ? {
        'Content-Type': 'application/json',
        'autorization': 'bearer ' + token}:{'Content-Type': 'application/json'},
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  }
  

  async function getData(url = '', token = '') {
    // Default options are marked with *
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
   // return await response.json();
}
  
  
   