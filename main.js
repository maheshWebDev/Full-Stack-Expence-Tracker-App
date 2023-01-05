
let form = document.getElementById('form');
form.addEventListener('submit',postToUser);

function postToUser(e){
    e.preventDefault()
let name = document.getElementById('name').value;
let email = document.getElementById('email').value;
let password = document.getElementById('password').value;
const obj = {
    name,
    email,
    password
}
axios.post('http://localhost:3000/user/signup',obj)
}

