let tittle=document.getElementById('tittle');
let price=document.getElementById('price');
let taxs=document.getElementById('taxs');
let discount=document.getElementById('discount');
let ads=document.getElementById('ads');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
console.log(tittle,price,taxs,discount,ads,total,count,category,submit);
let mode='create';
let tmp;
//get total
function gettotal(){
    if (price.value!=''){
    let ruslt=(+price.value+ +taxs.value+ +ads.value)- +discount.value;
    total.innerHTML=ruslt;
    total.style.background='green';
}
else{
    total.innerHTML='';
    total.style.background='rgb(119, 4, 4)';
}} 
//creat 

if(localStorage.product!=null){
    datapro=JSON.parse( localStorage.product)
}
else{
    datapro=[];
}
submit.onclick=function(){
let pro={
    tittle:tittle.value.toLowerCase(),
    price:price.value,
    taxs:taxs.value,
   discount:discount.value,
   ads:ads.value,
   total:total.innerHTML,//small not input
   count:count.value,
 category:category.value.toLowerCase(),
 
}
//save local storage
if(tittle.value !="" && price.value !='' && category.value!='' && pro.count<100){
    if(mode==='create')

{
    if(pro.count>1){
    for(let i=0;i<pro.count;i++)
{datapro.push(pro);}}
else{
    datapro.push(pro);
}

}
else{
    
    datapro[tmp]=pro
    mode='create';
    count.style.display='block';
submit.innerHTML="create";

}
cleardata()
}

//save local storage
localStorage.setItem('product',JSON.stringify(datapro));

showdata()
}
//clear inputs
function cleardata(){
tittle.value='';
  price.value='';
  taxs.value='';
   discount.value='';
   ads.value='';
  total.innerHTML=''; //small not input
  count.value='';
category.value='';}
//read
function showdata(){
    let table='';
    for(let i=0;i<datapro.length;i++){
        table+=` <tr>
        <td>${i+1}</td>
        <td>${datapro[i].tittle}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxs}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td>
            <button id="update" onclick='updatepro(${i})'>update</button>
        </td>
        <td>
            <button id="delete" onclick='deletepro(${i})'>delete</button>
        </td>
    </tr>`
        
}
document.getElementById('tbody').innerHTML=table
let deleteall=document.getElementById('deleteAll')
if(datapro.length>0){
    deleteall.innerHTML=` <button onclick='deletall()' >delete All (${datapro.length})</button>` 
}else{
    deleteall.innerHTML=`` ;

}

gettotal();
}showdata()
//count
//delete
function deletepro(i){
datapro.splice(i,1);
localStorage.product=JSON.stringify(datapro);
showdata()
}
function deletall()

  {
      datapro.splice(0);
    localStorage.clear();
showdata();
}
//update
function updatepro(i){
    window.scroll({
        top:0,
        behavior:'smooth'
    });
    tittle.value=datapro[i].tittle;
  price.value=datapro[i].price;
  taxs.value=datapro[i].taxs;
   discount.value=datapro[i].discount;
   ads.value=datapro[i].ads;
  total.innerHTML=datapro[i].total; //small not input
category.value=datapro[i].category;
gettotal();
count.style.display='none';
submit.innerHTML="update";
mode='update';
tmp=i;
}

//search
let searchmode='title';
function getsearchmode(id){
    let search=document.getElementById('search');
if(id=='searchtittle'){
    searchmode='title';
   
}else{
    searchmode='category'; 
 
}
search.placeholder='search by  ' +searchmode;
search.focus();
search.value='';
showdata();
}
function searchdata(value){
    let table='';
    for(i=0;i<datapro.length;i++)
  {  if(searchmode=='title'){
       
           if(datapro[i].tittle.includes(value.toLowerCase())){
            table+=` <tr>
            <td>${i}</td>
            <td>${datapro[i].tittle}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxs}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td>
                <button id="update" onclick='updatepro(${i})'>update</button>
            </td>
            <td>
                <button id="delete" onclick='deletepro(${i})'>delete</button>
            </td>
        </tr>`
           }
       
        
    }
    else{
       
            if(datapro[i].category.includes(value.toLowerCase())){
             table+=` <tr>
             <td>${i}</td>
             <td>${datapro[i].tittle}</td>
             <td>${datapro[i].price}</td>
             <td>${datapro[i].taxs}</td>
             <td>${datapro[i].ads}</td>
             <td>${datapro[i].discount}</td>
             <td>${datapro[i].total}</td>
             <td>${datapro[i].category}</td>
             <td>
                 <button id="update" onclick='updatepro(${i})'>update</button>
             </td>
             <td>
                 <button id="delete" onclick='deletepro(${i})'>delete</button>
             </td>
         </tr>`
            }
    }}
    document.getElementById('tbody').innerHTML=table
}
//cleandata