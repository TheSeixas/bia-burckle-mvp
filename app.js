const KEY='bdk-bia-cart-v2';
const PRODUCTS=[
 ['Aurora Cortininha',164.90,'produto/aurora.html'],
 ['Maré Fio Regulável',219.90,'produto/mare.html'],
 ['Serena Cortininha Fio',149.90,'produto/serena.html'],
 ['Luna Asa Delta',189.90,'produto/luna.html'],
 ['Cortininha e Calcinha Laço',99.90,'biquinis.html'],
 ['Maiô Decote Profundo',194.90,'maios.html']
];
function cart(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return[]}}
function setCart(c){localStorage.setItem(KEY,JSON.stringify(c));count()}
function count(){const n=cart().reduce((a,x)=>a+(+x.qty||1),0);document.querySelectorAll('[data-cart-count]').forEach(e=>e.textContent=n)}
function search(){const panel=document.getElementById('searchPanel');if(!panel)return;document.getElementById('searchBtn')?.addEventListener('click',()=>{panel.classList.add('open');setTimeout(()=>document.getElementById('searchInput')?.focus(),200)});document.getElementById('closeSearch')?.addEventListener('click',()=>panel.classList.remove('open'));const input=document.getElementById('searchInput'),out=document.getElementById('searchResults');input?.addEventListener('input',()=>{const q=input.value.trim().toLowerCase();const r=PRODUCTS.filter(p=>p[0].toLowerCase().includes(q));out.innerHTML=q?r.map(p=>`<a class="search-result" href="${p[2]}"><span>${p[0]}</span><small>R$ ${p[1].toFixed(2).replace('.',',')}</small></a>`).join('')||'<p style="color:#746f69">Nenhum resultado. Tente “cortininha”, “fio” ou “maiô”.</p>':''})}
function init(){count();search();document.querySelectorAll('[data-buy]').forEach(btn=>btn.addEventListener('click',()=>{const d=btn.closest('[data-card]')?.dataset;if(!d)return;const c=cart();c.push({id:d.id,name:d.name,price:+d.price,qty:1,size:'M',image:d.image});setCart(c);btn.textContent='Adicionado ✓';setTimeout(()=>btn.textContent='Comprar agora',1100)}))}
document.addEventListener('DOMContentLoaded',init);
