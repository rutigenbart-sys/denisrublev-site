(function(){
var d=document,$=function(s,c){return(c||d).querySelector(s)},$$=function(s,c){return[].slice.call((c||d).querySelectorAll(s))};
var hd=$('.hd'),lastY=0;
function onScroll(){var y=scrollY;if(hd){hd.classList.toggle('sc',y>30);var big=y>320;hd.classList.toggle('up',big&&y>lastY+4&&!$('.mnav.open'));if(y<lastY-4)hd.classList.remove('up')}lastY=y;
 var vv=$('.hero video');if(vv&&!vv.dataset.stop){if(y>innerHeight*1.15){if(!vv.paused)vv.pause()}else if(vv.paused&&vv.dataset.want==='1')vv.play().catch(function(){})}
}
addEventListener('scroll',onScroll,{passive:true});onScroll();
/* burger */
var bg=$('.burger'),mn=$('.mnav');
if(bg&&mn){bg.addEventListener('click',function(){var o=mn.classList.toggle('open');bg.classList.toggle('x',o);d.body.classList.toggle('lock',o);bg.setAttribute('aria-expanded',o)});
 $$('a',mn).forEach(function(a){a.addEventListener('click',function(){mn.classList.remove('open');bg.classList.remove('x');d.body.classList.remove('lock')})})}
/* reveal */
var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'}):null;
$$('main h2,main .bc,.tl>*,.gal>*,.ct,.st,.row>*,.box,.faq details').forEach(function(el){if(!el.classList.contains('rv')&&!el.closest('.hero')){el.classList.add('rv')}});
$$('.rv').forEach(function(el,i){var p=el.parentElement,k=p?Array.prototype.indexOf.call(p.children,el):0;if(!/\bd\d\b/.test(el.className))el.style.transitionDelay=(k%6)*70+'ms';if(!/^H/.test(el.tagName)&&!el.dataset.v)el.dataset.v=String((k%4));});
$$('.rv').forEach(function(el){io?io.observe(el):el.classList.add('in')});
/* счётчики */
function count(el){var to=parseFloat(el.dataset.to),suf=el.dataset.suf||'',dur=1600,t0=performance.now(),sp=el.dataset.sp==='1';
 (function s(n){var k=Math.min(1,(n-t0)/dur),e=1-Math.pow(1-k,3),v=Math.round(to*e);el.textContent=(sp?v.toLocaleString('ru-RU').replace(/,/g,' '):v)+suf;if(k<1)requestAnimationFrame(s)})(t0)}
var co='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){count(e.target);co.unobserve(e.target)}})},{threshold:.6}):null;
$$('[data-to]').forEach(function(el){co?co.observe(el):el.textContent=el.dataset.to+(el.dataset.suf||'')});
/* видео-фон */
var v=$('.hero video');
if(v){var save=navigator.connection&&(navigator.connection.saveData||/2g/.test(navigator.connection.effectiveType||''));
 var mob=matchMedia('(max-width:760px)').matches||(navigator.connection&&navigator.connection.effectiveType==='3g');
 if(!save&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
  v.src=mob?v.dataset.m:v.dataset.d;v.muted=true;v.playsInline=true;v.dataset.want='1';
  var go=function(){v.play().then(function(){v.classList.add('on')}).catch(function(){})};
  v.addEventListener('canplay',go,{once:true});v.load();
  d.addEventListener('touchstart',function(){if(v.paused&&v.dataset.want==='1')go()},{once:true,passive:true});
  d.addEventListener('visibilitychange',function(){if(d.hidden)v.pause();else if(scrollY<innerHeight)go()})}}
/* галерея */
var gl=$$('.gal a'),lb=$('.lb'),li=0;
function show(i){li=(i+gl.length)%gl.length;$('img',lb).src=gl[li].href}
if(lb&&gl.length){gl.forEach(function(a,i){a.addEventListener('click',function(e){e.preventDefault();show(i);lb.classList.add('open');d.body.classList.add('lock')})});
 var cl=function(){lb.classList.remove('open');d.body.classList.remove('lock')};
 $('.x',lb).onclick=cl;$('.pv',lb).onclick=function(){show(li-1)};$('.nx',lb).onclick=function(){show(li+1)};lb.addEventListener('click',function(e){if(e.target===lb)cl()});
 addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;if(e.key==='Escape')cl();if(e.key==='ArrowLeft')show(li-1);if(e.key==='ArrowRight')show(li+1)});
 var sx=0;lb.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});lb.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>50)show(li+(dx<0?1:-1))})}
/* блог: фильтр + поиск */
var bgr=$('#bgrid');
if(bgr){var cards=$$('.bc',bgr),cur='all',q='',cnt=$('#bcount');
 function ap(){var n=0;cards.forEach(function(c){var ok=(cur==='all'||c.dataset.g===cur)&&(!q||c.dataset.s.indexOf(q)>-1);c.style.display=ok?'':'none';if(ok)n++});if(cnt)cnt.textContent=n}
 $$('[data-f]').forEach(function(b){b.addEventListener('click',function(){cur=b.dataset.f;$$('[data-f]').forEach(function(x){x.classList.toggle('on',x===b)});ap()})});
 var s=$('#bsearch');if(s)s.addEventListener('input',function(){q=s.value.trim().toLowerCase();ap()});
 var h=location.hash.replace('#','');if(h){var hb=$('[data-f="'+h+'"]');if(hb)hb.click()}ap()}
/* форма → Telegram */
$$('form.f').forEach(function(f){
 var msg=$('.fmsg',f);
 f.addEventListener('submit',function(e){e.preventDefault();
  if($('.hp input',f)&&$('.hp input',f).value)return;
  var fd=new FormData(f),g=function(k){return(fd.get(k)||'').toString().trim()};
  if(!g('name')||!g('contact')){msg.className='fmsg er';msg.textContent='Укажите имя и как с вами связаться.';return}
  if(!$('input[name=agree]',f).checked){msg.className='fmsg er';msg.textContent='Нужно согласие на обработку персональных данных.';return}
  var src=f.dataset.src||location.pathname;
  var text='🎧 Вам написали с вашего сайта denisrublev.ru\n\n👤 Имя: '+g('name')+'\n📞 Связь: '+g('contact')+(g('type')?'\n🎉 Событие: '+g('type'):'')+(g('city')?'\n📍 Город/площадка: '+g('city')+'':'')+(g('date')?'\n📅 Дата: '+g('date'):'')+(g('msg')?'\n💬 '+g('msg'):'')+'\n\n🔗 Страница: '+location.origin+src;
  var C=window.DR||{},btn=$('button[type=submit]',f);
  function ok(t){msg.className='fmsg ok';msg.textContent=t;f.reset()}
  function viaLink(){
   try{navigator.clipboard&&navigator.clipboard.writeText(text)}catch(x){}
   var url=C.tgUser?('https://t.me/'+C.tgUser+'?text='+encodeURIComponent(text)):('https://t.me/+'+(C.phone||'79255857775'));
   window.open(url,'_blank');ok(C.tgUser?'Открываем Telegram — нажмите «Отправить». Текст заявки уже вставлен.':'Открываем Telegram. Текст заявки скопирован — вставьте его в чат и отправьте.')}
  if(C.bot&&C.bot.token&&C.bot.chat){btn.disabled=true;msg.className='fmsg';msg.textContent='Отправляем…';
   fetch('https://api.telegram.org/bot'+C.bot.token+'/sendMessage',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:C.bot.chat,text:text,disable_web_page_preview:true})})
    .then(function(r){return r.json()}).then(function(j){btn.disabled=false;if(j.ok)ok('Заявка отправлена! Денис свяжется с вами в ближайшее время.');else viaLink()}).catch(function(){btn.disabled=false;viaLink()})}
  else viaLink()})});
/* lenis на десктопе */
if(!matchMedia('(pointer:coarse)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches&&innerWidth>1020){
 var sc=d.createElement('script');sc.src='/js/lenis.min.js';sc.onload=function(){try{var L=new Lenis({lerp:.075,wheelMultiplier:.9,smoothWheel:true});window.__L=L;(function r(t){L.raf(t);requestAnimationFrame(r)})(performance.now());
  $$('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var t=$(a.getAttribute('href'));if(t){e.preventDefault();L.scrollTo(t,{offset:-60})}})})}catch(x){}};d.head.appendChild(sc)}
/* tilt */
if(!matchMedia('(pointer:coarse)').matches)$$('.card,.bc').forEach(function(c){c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform='perspective(900px) rotateY('+x*5+'deg) rotateX('+(-y*5)+'deg) translateY(-6px)'});c.addEventListener('mouseleave',function(){c.style.transform=''})});

/* ===== логотип героя: мягкое проявление со световой кромкой ===== */
(function(){var g=$('.hlg');if(!g)return;
 if(matchMedia('(prefers-reduced-motion:reduce)').matches){g.classList.add('done','rev');return}
 var started=false;function run(){if(started)return;started=true;g.classList.add('rev');setTimeout(function(){g.classList.add('done')},1700)}
 var H=d.documentElement;
 if(H.classList.contains('pre-active')&&!H.classList.contains('ready')){
  var mo=new MutationObserver(function(){if(H.classList.contains('opening')||H.classList.contains('ready')){mo.disconnect();setTimeout(run,H.classList.contains('ready')?0:300)}});mo.observe(H,{attributes:true,attributeFilter:['class']});setTimeout(run,9000)}
 else run()})();
/* ===== плавные переходы между страницами ===== */
(function(){var pt=d.createElement('div');pt.id='pt';pt.innerHTML='<img src="/img/logo.webp" alt="">';d.body.appendChild(pt);
 addEventListener('pageshow',function(e){pt.classList.remove('go')});
 d.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button)return;
  var h=a.getAttribute('href');if(!h||h.charAt(0)==='#'||a.target==='_blank'||/^(mailto|tel|javascript):/.test(h)||a.hasAttribute('download'))return;
  var u;try{u=new URL(a.href,location.href)}catch(x){return}
  if(u.origin!==location.origin||/\.(pdf|jpg|png|webp|mp4)$/i.test(u.pathname))return;
  if(u.pathname===location.pathname&&u.search===location.search)return;
  e.preventDefault();pt.classList.add('go');setTimeout(function(){location.href=u.href},560)})})();
})();
