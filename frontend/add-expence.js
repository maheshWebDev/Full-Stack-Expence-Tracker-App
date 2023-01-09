
let form = document.getElementById('form');
form.addEventListener('submit',addExpence);

window.addEventListener('DOMContentLoaded',(e)=>{
    axios.get('http://localhost:3000/expence/get')
    .then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })
})

function addExpence(e){
    e.preventDefault();
    let expenceName = document.getElementById('exp-name').value;
    let amount = document.getElementById('exp-amt').value;
    let description= document.getElementById('exp-des').value;
    let obj = {
        expenceName,
        amount,
        description
    }
    console.log(obj)
    axios.post('http://localhost:3000/expence/add-expence',obj)
    .then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err)
    })
    
}