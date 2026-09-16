const target = new Date("2026-09-20T09:00:00+00:00").getTime();
function tick(){
  const diff = Math.max(0, target - Date.now());
  const d = Math.floor(diff/86400000);
  const h = Math.floor(diff/3600000)%24;
  const m = Math.floor(diff/60000)%60;
  const s = Math.floor(diff/1000)%60;
  document.getElementById("days").textContent=d;
  document.getElementById("hours").textContent=String(h).padStart(2,"0");
  document.getElementById("mins").textContent=String(m).padStart(2,"0");
  document.getElementById("secs").textContent=String(s).padStart(2,"0");
}
tick(); setInterval(tick,1000);

document.getElementById("copyBtn").addEventListener("click", async ()=>{
  const number = document.getElementById("momoNumber").textContent.trim();
  try{
    await navigator.clipboard.writeText(number);
  }catch(e){
    const ta=document.createElement("textarea"); ta.value=number;
    document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove();
  }
  const status=document.getElementById("copyStatus");
  status.textContent="MoMo number copied!";
  setTimeout(()=>status.textContent="",2200);
});

const slides=document.querySelectorAll(".slider .slide");
const dotsWrap=document.getElementById("slideDots");
let current=0, timer;
const dots=[];
slides.forEach((_,i)=>{
  const dot=document.createElement("button");
  dot.setAttribute("aria-label","Go to slide "+(i+1));
  dot.addEventListener("click",()=>goTo(i));
  dotsWrap.appendChild(dot); dots.push(dot);
});
function show(){
  slides.forEach((s,i)=>s.classList.toggle("active",i===current));
  dots.forEach((d,i)=>d.classList.toggle("active",i===current));
}
function restart(){clearInterval(timer);timer=setInterval(()=>goTo(current+1),4000);}
function goTo(i){
  current=(i+slides.length)%slides.length;
  show(); restart();
}
document.getElementById("slideNext").addEventListener("click",()=>goTo(current+1));
document.getElementById("slidePrev").addEventListener("click",()=>goTo(current-1));
show(); restart();
