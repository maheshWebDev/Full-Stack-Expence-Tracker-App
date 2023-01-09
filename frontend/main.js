let x= document.getElementById('sign-in');
let y= document.getElementById('sign-up');
let z = document.getElementById('btn');
function signup(){
    x.style.left = "-400px";
    y.style.left = "50px";
    z.style.left = "110px";
}
function signin(){
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0";
}



//  sign up 

let signupform = document.getElementById('sign-up');
let signinform = document.getElementById('sign-in');

signupform.addEventListener('submit',registerUser);
signinform.addEventListener('submit',loginUser);

function registerUser(e){
    e.preventDefault();
let name = document.getElementById('up-name').value;
let email = document.getElementById('up-email').value;
let password = document.getElementById('up-password').value;
const obj = {
    name,
    email,
    password
}
axios.post('http://localhost:3000/user/signup',obj).then((res)=>{
    console.log(res)
})
// console.log(obj)
}


// sign in
function loginUser(e){
    e.preventDefault();
let email = document.getElementById('in-email').value;
let password = document.getElementById('in-password').value;
const obj = {
    email,
    password
}
axios.post('http://localhost:3000/user/login',obj).then((res)=>{
    // console.log();
    alert(res.data.message)
    window.location.href="add-expence.html"; 
}).catch((err)=>{
    console.log(err)
})
}