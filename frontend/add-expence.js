// const { options } = require("../router/userRouter");

let form = document.getElementById('form');
form.addEventListener('submit',addExpence);

window.addEventListener('DOMContentLoaded',function load(e){
// e.preventDefault();
let token = localStorage.getItem('token')
    axios.get('http://localhost:3000/expence/get-expence',{headers:{'Authorization':token}})
    .then((res)=>{
        res.data.expence.forEach(element => {
            showOnScreen(element)
        });
    }).catch((err)=>{
        console.log(err);
    })
})

// premium button
document.getElementById('p-btn').addEventListener('click',async(e)=>{

    try {
        const token = localStorage.getItem('token');

        const responce = await axios.get('http://localhost:3000/buy/premium-membership',{headers: {'Authorization':token}})

        console.log(responce);
       
        var options = {
            "key":responce.data.key_id,
            "order_id":responce.data.order.id,
            "handler": async function (responce){
                await axios.post('http://localhost:3000/buy/update-status',{
                    order_id:options.order_id,
                    payment_id:responce.razorpay_payment_id
                },
                {headers:{"Authorization":token}})

                alert('you are a premium user now')
            },
        };

       const rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault();

        rzp1.on('payment.failed',(responce)=>{
            console.log(responce);
            alert('something went wrong')
        });



        
    } catch (error) {
        console.log(error);
    }

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
    // console.log(obj)
    let token = localStorage.getItem('token')
    console.log(token)
    axios.post('http://localhost:3000/expence/add-expence',obj, {headers: {'Authorization':token}})
    .then((responce)=>{
        console.log(responce)

    }).catch((err)=>{
        console.log(err)
    })
    
}

function showOnScreen(obj){
    const parent = document.getElementById('tbody')
    // console.log(parent)
    let output = `<tr id="${obj.id}">
    <td >${obj.expenceName}</td>
    <td>${obj.amount}</td>
    <td>${obj.description}</td>
    <td><button onclick='delteExpence(${obj.id})'>Delete</button></td>
  </tr>`
  parent.innerHTML += output

}


async function delteExpence(id){
// e.preventDefault();

    try {
        let token = localStorage.getItem('token')
        const responce = await axios.delete(`http://localhost:3000/expence/delete-expence/${id}`,{headers: {'Authorization':token}});
        if(responce){
        removeFromUi(id)
        }
    } catch (error) {
        console.log(error);
    }
 


}

function removeFromUi(id){
let parent = document.getElementById(`${id}`);
parent.remove();
}