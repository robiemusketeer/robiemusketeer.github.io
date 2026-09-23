const progress=document.querySelector('.progress');
function updateProgress(){const span=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${span>0?100*scrollY/span:0}%`;}
addEventListener('scroll',updateProgress,{passive:true});addEventListener('resize',updateProgress);updateProgress();
const links=[...document.querySelectorAll('.contents nav a')];
const headings=[...document.querySelectorAll('article [data-section], article h2')];
function updateNavigation(){let active=headings[0];for(const h of headings){if(h.getBoundingClientRect().top<160)active=h;}links.forEach(a=>{const current=a.hash===`#${active?.id}`;a.classList.toggle('active',current);if(current)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}
addEventListener('scroll',updateNavigation,{passive:true});updateNavigation();
const dialog=document.querySelector('#image-dialog');
for(const a of document.querySelectorAll('a.zoom'))a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();const img=dialog.querySelector('img');img.src=a.href;img.alt=a.querySelector('img').alt;dialog.showModal();});
dialog.querySelector('button').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});

const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const motionVideos=[...document.querySelectorAll('video[data-autoplay]')];
const motionObserver=new IntersectionObserver(entries=>{for(const {target,isIntersecting} of entries){if(isIntersecting&&!reducedMotion.matches&&!target.dataset.userPaused){target.muted=true;target.play().catch(()=>{});}else{target.pause();}}},{threshold:.4});
for(const v of motionVideos){motionObserver.observe(v);v.addEventListener('pause',()=>{if(v.getBoundingClientRect().top>=0&&v.getBoundingClientRect().bottom<=innerHeight)v.dataset.userPaused='true';});v.addEventListener('play',()=>delete v.dataset.userPaused);}
reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches)motionVideos.forEach(v=>v.pause());});
