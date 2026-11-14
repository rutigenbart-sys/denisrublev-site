/* Прелоадер v4: минимализм. Луч света идёт слева направо и «проявляет» хромовый логотип,
   затем второй проход света растворяет его и открывает сайт. */
(function(){
var pre=document.getElementById('pre');if(!pre)return;
if(!document.documentElement.classList.contains('pre-active')){pre.remove();return}
var body=document.body,root=document.documentElement,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
var seen=false;try{seen=sessionStorage.getItem('drpre')==='1'}catch(e){}
body.classList.add('lock');
var pl=pre.querySelector('.pl'),A=pre.querySelector('.pa'),B=pre.querySelector('.pb'),beam=pre.querySelector('.pbeam');
var opened=false,site=false;
function openSite(){if(site)return;site=true;root.classList.add('opening')}
function done(){if(opened)return;opened=true;try{sessionStorage.setItem('drpre','1')}catch(e){}
 openSite();pre.classList.add('out');
 setTimeout(function(){pre.remove();body.classList.remove('lock');root.classList.add('ready');document.dispatchEvent(new Event('pre:done'))},60)}
if(reduce){addEventListener('load',function(){setTimeout(function(){pre.style.transition='opacity .4s';pre.style.opacity='0';openSite();setTimeout(done,420)},250)});setTimeout(done,2500);return}

/* ресурсы */
var res=0,need=3,ready=false;
function tick(){res++;if(res>=need)ready=true}
if(A.complete&&A.naturalWidth)tick();else{A.addEventListener('load',tick);A.addEventListener('error',tick)}
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(tick);else tick();
var pv=document.querySelector('.hero .poster');
if(!pv||(pv.complete&&pv.naturalWidth))tick();else{pv.addEventListener('load',tick);pv.addEventListener('error',tick)}
setTimeout(function(){ready=true},3600);

var K=seen?.72:1;
var T0=260*K,T1=T0+1250*K,HOLD=380*K,OUT=760*K;
var t0=performance.now(),tEx=0,W=innerWidth;
addEventListener('resize',function(){W=innerWidth});
function io(x){return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2}    // easeInOutCubic
function is(x){return -(Math.cos(Math.PI*x)-1)/2}               // easeInOutSine
function set(p,q,h,o,g){
 pre.style.setProperty('--p',p+'%');pre.style.setProperty('--q',q+'%');pre.style.setProperty('--h',h+'%');
 var bw=beam.offsetWidth||200,x=h/100*W-bw/2;
 beam.style.transform='translate3d('+x.toFixed(1)+'px,0,0) skewX(-16deg)';beam.style.opacity=o.toFixed(3);
 pre.style.setProperty('--bx',(h/100*W).toFixed(0)+'px');pre.style.setProperty('--g',g.toFixed(3));
}
set(-30,-30,-30,0,0);
var fin=false;
function frame(now){
 var t=now-t0;
 if(!tEx){
  if(t<T0){set(-30,-30,-30,0,0)}
  else if(t<T1){var u=is((t-T0)/(T1-T0)),p=-30+u*(150);
   var o=Math.min(1,u*5)*Math.min(1,(1-u)*5);
   set(p,-30,p,o,Math.min(1,u*4)*(1-u*.35))}
  else{set(150,-30,150,0,.65);
   if(t>=T1+HOLD&&ready){tEx=now}}
 }
 if(tEx){
  var v=Math.min(1,(now-tEx)/OUT),q=-30+io(v)*(150),h=q+10;
  var o2=Math.min(1,v*5)*Math.min(1,(1-v)*4);
  set(150,q,h,o2,.65*(1-v));
  if(v>.12)openSite();
  if(v>.45&&!pre.classList.contains('go'))pre.classList.add('go');
  if(v>=1&&!fin){fin=true;done();return}
 }
 requestAnimationFrame(frame)}
requestAnimationFrame(frame);
})();
