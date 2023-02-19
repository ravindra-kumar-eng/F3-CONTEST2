let container=document.querySelector(".flex-container")
let list=document.querySelector(".list")
async function getMenu(){
    try{
let F= await fetch(" https://free-food-menus-api-production.up.railway.app/burgers");
 let response=await (F.json())
 let data=await response;
//  console.log(data)
 data.map((item,index)=>{
    // console.log(item,index);
container.innerHTML+=`
 <div class="card">
        <div class="image-container">
            <img src="${item.img}" alt="images" class="image" >
        </div> 
        <div class="row">
            <div class="left-row">Name: ${item.name} </div>
            <div class="right-row">Price: ${item.price}</div>
        </div>
        <div class="dsc">DSC: ${item.dsc}</div>
        <div class="rate">Rate: ${item.rate}</div>
        
 </div>
`
 })
}
catch{(e)=>{
        // console.log(e)
    }
}
}
 getMenu();

 async function takeOrder(){
    let F= await fetch(" https://free-food-menus-api-production.up.railway.app/burgers");
 let response=await (F.json())
 let data=await response;
 let randomBurger=[];
 for(let i=0;i<3;i++){
    let random=Math.floor(Math.random()*60);
     randomBurger.push(data[random]);
     list.innerHTML += `
        <li>${data[random].dsc}</li>`
     
}
console.log(randomBurger);
const selectOrder = {
    burgers: randomBurger,
}

return new Promise(resolve => {
    setTimeout(() => {
        resolve(selectOrder);
    },2500);
})

 }
//  takeOrder()

 const paymentDiv = document.querySelector('.payment')
function orderPrep(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const orderStatus = true;
            const paidStatus = false;
            const order = {
                order_status: orderStatus,
                paid: paidStatus,
            }
            paymentDiv.innerHTML = `Payment pending.....`
            resolve(order);
        },1500)
    })
}

// orderPrep()

// Function 4: 
const transaction = document.querySelector('.transaction');
function payOrder(){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            const orderStatus = true;
            const paidStatus = true;
            const order = {
                order_status: orderStatus,
                paid: paidStatus,
            }
            transaction.innerHTML = `Transaction Successful!!`
            resolve(order);
        },1000)
    })
}

// payOrder()

 function thankyouFnc(){
    alert('Thank you for your order!!')
}

const orderContainer = document.querySelector('.order-status');
const button = document.querySelector('.button');
const pay = document.querySelector('.pay');

const func5 = document.querySelector('.func5');
button.addEventListener('click',async ()=>{
    container.classList.add('hide');
    orderContainer.classList.remove('hide');
    
    const order = await takeOrder();
    pay.classList.remove('hide');
    const orderStatus = await orderPrep();
    if(orderStatus.order_status){
        func5.innerHTML = `Processing your payment...`
        const paymentStatus = await payOrder();
        if(paymentStatus.paid){
            thankyouFnc();
        }
    }
})
