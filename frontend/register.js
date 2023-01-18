

let register = document.getElementById('register');


register.addEventListener('submit',registerUser);


// register user

async function registerUser(e){

    try {
         e.preventDefault();
let name = document.getElementById('r-name').value;
let email = document.getElementById('r-email').value;
let password = document.getElementById('r-password').value;
const obj = {
    name,
    email,
    password
    
}
  const responce = await axios.post('http://localhost:3000/user/signup',obj)
  alert(responce.data.message)
        
    } catch (error) {
        alert(error)
    }

}


