

let form = document.getElementById('form');
form.addEventListener('submit',addExpence);


// // parsing jwt token 

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


window.addEventListener('DOMContentLoaded',function (e){
// e.preventDefault();
let token = localStorage.getItem('token')

let decodedToken = parseJwt(token);
let isPremium = decodedToken.ispremiumuser
if(isPremium){
    document.getElementById('p-btn').style.visibility="hidden";
    document.getElementById('head-message').innerHTML = `<h1>You Are A Premium User</h1>
    <button type="button" id="l-btn" class="pre-btn" Onclick="showLeaderboard()">Show ladarbord</button>`
}
console.log(decodedToken)
    axios.get('http://localhost:3000/expence/get-expence',{headers:{'Authorization':token}})
    .then((res)=>{
        res.data.expence.forEach(element => {
            showOnScreen(element)
        });
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


// // premium button
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
                document.getElementById('p-btn').style.visibility="hidden";
                document.getElementById('head-message').innerHTML = `<h1>You Are A Premium User</h1>
                <button type="button" id="l-btn" class="pre-btn" Onclick="showLeaderboard ()">Show Leaderboard </button>`
                // localStorage.setItem('token',responce.data.token);
                // console.log(responce)
            
                
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
       alert("API key expired");
    }

})




// leaderbord 

function showLeaderboard (){
   document.getElementById('ladar').style.visibility ='visible';
let token = localStorage.getItem('token');
   axios.get('http://localhost:3000/premium/show-leaderboard',{headers: {'Authorization':token}})
   .then((responce)=>{
    console.log(responce.data.userLeaderboardDetails)
    
    responce.data.userLeaderboardDetails.forEach((obj)=>{
        showLeaderboardOnScreen(obj)
    })
   
   
   }).catch((err)=>{
    console.log(err);
   })
}

function showLeaderboardOnScreen(obj){
    let parent = document.getElementById('tbody2');
    let output = `<tr>
    <td>${obj.name}</td>
    <td>${obj.totalSpent}</td>
  </tr>`
  parent.innerHTML += output
}