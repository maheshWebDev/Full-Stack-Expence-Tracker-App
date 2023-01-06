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





// let form = document.getElementById('form');
// form.addEventListener('submit',postToUser);

// function postToUser(e){
//     e.preventDefault()
// let name = document.getElementById('name').value;
// let email = document.getElementById('email').value;
// let password = document.getElementById('password').value;
// const obj = {
//     name,
//     email,
//     password
// }
// axios.post('http://localhost:3000/user/signup',obj)
// }



// const father = new Promise((resolve,reject)=>{
//     let shop = open
//     setTimeout(()=>{
//         if(shop){
//             resolve("order given");
//         }else{
//             reject("shop is closed");
//         }
//     },1000)
// })

