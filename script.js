const formspreeEndpoint = "https://formspree.io/f/xbggbpjv";
const pricing = {
  "Fall Cleanup": {items:[["Leaf removal",125],["Full yard cleanup",175],["Garden bed cleanup",85],["Branch and debris removal",65]],addons:[["Bag and haul debris",35],["Gutter debris cleanup",50],["Extra-large property",75]]},
  "Lawn Care": {items:[["Small lawn mowing",45],["Medium lawn mowing",60],["Large lawn mowing",85],["Lawn edging and trimming",25]],addons:[["Leaf blowing",15],["Weed trimming",20],["Garden bed touch-up",35]]},
  "Car Detailing": {items:[["Basic detail",60],["Standard detail",75],["Full detail",90]],addons:[["SUV",20],["Minivan",30],["Pickup truck",25],["Van",35],["Full-size truck",35]]},
  "Snow Removal": {items:[["Driveway clearing",50],["Walkway clearing",25],["Driveway and walkways",65],["Larger property clearing",95]],addons:[["Ice melt application",20],["Additional walkway",15],["Corner lot / extra area",25]]},
  "Winter Prep": {items:[["Outdoor furniture preparation",65],["General winter preparation",100],["Final yard cleanup",125],["Garden and plant preparation",75]],addons:[["Leaf and debris removal",35],["Outdoor item storage",30],["Extra-large property",75]]}
};
const $ = id => document.getElementById(id);
const category = $("category"), option = $("option"), addons = $("addons");
let quantity = 1;
function money(n){return "$"+n.toFixed(2)}
function selectedItem(){return pricing[category.value].items.find(x=>x[0]===option.value)||pricing[category.value].items[0]}
function total(){return (selectedItem()[1]+[...addons.querySelectorAll("input:checked")].reduce((s,input)=>s+Number(input.value),0))*quantity}
function updateTotal(){
  const amount=total();
  $("total").textContent=money(amount);
  $("quantity").textContent=quantity;
  $("quantity-input").value=quantity;
  $("addons-input").value=[...addons.querySelectorAll("input:checked")].map(x=>x.dataset.name).join(", ")||"None";
  $("total-input").value=money(amount);
}
function renderOptions(){
  option.innerHTML=pricing[category.value].items.map(([name,price])=>`<option value="${name}">${name} · $${price}</option>`).join("");
  addons.innerHTML=pricing[category.value].addons.map(([name,price])=>`<label class="addon"><input type="checkbox" value="${price}" data-name="${name}"><span>${name}</span><strong>+$${price}</strong></label>`).join("");
  addons.querySelectorAll("input").forEach(x=>x.addEventListener("change",updateTotal));
  updateTotal();
}
category.innerHTML=Object.keys(pricing).map(name=>`<option>${name}</option>`).join("");
category.addEventListener("change",renderOptions);
option.addEventListener("change",updateTotal);
$("minus").addEventListener("click",()=>{quantity=Math.max(1,quantity-1);updateTotal()});
$("plus").addEventListener("click",()=>{quantity=Math.min(10,quantity+1);updateTotal()});
document.querySelectorAll("[data-service]").forEach(link=>link.addEventListener("click",()=>{category.value=link.dataset.service;renderOptions()}));
renderOptions();
$("quote-form").addEventListener("submit",async event=>{
  event.preventDefault();
  const feedback=$("feedback"),button=$("submit");
  feedback.className="feedback";feedback.textContent="";
  $("replyto").value=$("email").value.trim();
  updateTotal();
  button.disabled=true;button.textContent="Sending...";
  try{
    const response=await fetch(formspreeEndpoint,{method:"POST",body:new FormData(event.currentTarget),headers:{Accept:"application/json"}});
    const result=await response.json().catch(()=>({}));
    if(!response.ok)throw new Error((result.errors||[]).map(x=>x.message).join(" ")||"We could not send your request. Please try again.");
    feedback.textContent="Your quote request was sent. We’ll be in touch soon.";
    event.currentTarget.reset();category.selectedIndex=0;quantity=1;renderOptions();
  }catch(error){
    feedback.className="feedback error";
    feedback.textContent=error instanceof Error?error.message:"Something went wrong. Please email us directly.";
  }finally{button.disabled=false;button.innerHTML='Send quote request <span>↗</span>'}
});
