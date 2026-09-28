const nav=document.getElementById('nav');
const menu=document.querySelector('.menu');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>20));
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)});
document.querySelectorAll('.nav nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const scenes=[...document.querySelectorAll('.scene')].filter(s=>!s.classList.contains('scene-progress'));
const bars=[...document.querySelectorAll('.scene-progress span')];
const pause=document.querySelector('.pause');
let current=0, timer, playing=true;
function showScene(i){scenes.forEach((s,n)=>s.classList.toggle('active',n===i));bars.forEach((b,n)=>b.classList.toggle('active',n===i));current=i}
function start(){clearInterval(timer);timer=setInterval(()=>showScene((current+1)%scenes.length),4800)}
start();
pause?.addEventListener('click',()=>{playing=!playing;if(playing){start();pause.textContent='Ⅱ'}else{clearInterval(timer);pause.textContent='▶'}});

const form=document.getElementById('enquiry');
form?.addEventListener('submit',e=>{
  e.preventDefault();
  const data=new FormData(form);
  const subject=encodeURIComponent('Project enquiry — Aureum Industries');
  const body=encodeURIComponent(`Name: ${data.get('name')}\nCompany: ${data.get('company')||''}\nPhone / Email: ${data.get('contact')}\n\nHow can we help?\n${data.get('message')}`);
  window.location.href=`mailto:prasadsuryawanshi@aureumind.com?subject=${subject}&body=${body}`;
});
document.getElementById('year').textContent=new Date().getFullYear();
