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
