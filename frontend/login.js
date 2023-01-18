let login = document.getElementById('login');

login.addEventListener('submit',loginUser);


// // login user

async function loginUser(e){

    try {
        e.preventDefault();
        let email = document.getElementById('l-email').value;
        let password = document.getElementById('l-password').value;
        const obj = {
            email,
            password
        }
       const responce = await axios.post('http://localhost:3000/user/login',obj)
       alert(responce.data.message)
       localStorage.setItem('token',responce.data.token);
    window.location.href='add-expense.html' 

    } catch (error) {
        alert(error)
    }

}

// function forgotpassword() {
//     // e.preventDefault();
//     console.log("wro")
//     window.location.href = "forgotPassword.html"
// }