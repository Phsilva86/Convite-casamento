const pages = Array.from(document.querySelectorAll('.page'));
const dotsWrap = document.getElementById('dots');
const pagenum = document.getElementById('pagenum');
let current = 0;
const total = pages.length;

function renderDots(){
  dotsWrap.innerHTML = '';
  for(let i=0;i<total;i++){
    const d = document.createElement('button');
    d.className = 'dot';
    d.textContent = '●';
    d.style.opacity = i===current? '1' : '0.35';
    d.onclick = ()=> showPage(i);
    dotsWrap.appendChild(d);
  }
}

function showPage(i){
  if(i<0) i=0;
  if(i>total-1) i=total-1;
  pages.forEach(p=>p.classList.remove('active'));
  pages[i].classList.add('active');
  current = i;
  pagenum.textContent = (current+1) + ' / ' + total;
  renderDots();
  // soft focus for accessibility
  pages[i].querySelector('button, a, input')?.focus();
}

function nextPage(){
  showPage(current+1);
}
function prevPage(){
  showPage(current-1);
}

// keyboard navigation
document.addEventListener('keydown', (e)=>{
  if(e.key==='ArrowRight') nextPage();
  if(e.key==='ArrowLeft') prevPage();
});

// initialize
showPage(0);

// Optional: Swipe support for mobile
let startX = 0;
document.getElementById('pages').addEventListener('touchstart', (e)=>{ startX = e.touches[0].clientX; });
document.getElementById('pages').addEventListener('touchend', (e)=>{ 
  const dx = e.changedTouches[0].clientX - startX;
  if(dx < -40) nextPage();
  if(dx > 40) prevPage();
});
