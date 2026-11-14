const $=s=>document.querySelector(s);
const mx=n=>n.toLocaleString('es-MX',{style:'currency',currency:'MXN'});
const today=()=>new Date().toLocaleDateString('es-MX',{day:'numeric',month:'short'});
const COMM=0.036*1.16; // ejemplo: 3.6% + IVA que cobran terminales (comparativo ilustrativo)
let S={
  biz:{name:'Tacos Doña Rosa',owner:'Rosa Hernández',registered:false,cel:'55 1234 5678',giro:'Alimentos'},
  charges:[
    {id:1,client:'Juan Pérez',phone:'5511112222',concept:'Comida del lunes',amount:180,status:'pagado',date:today()},
    {id:2,client:'María López',phone:'5533334444',concept:'Pedido de fiesta',amount:950,status:'pendiente',date:today()},
    {id:3,client:'Carlos Ruiz',phone:'5555556666',concept:'Comida del lunes',amount:240,status:'pagado',date:today()}
  ],
  rec:[
    {id:1,client:'Oficinas Sol',amount:1200,freq:'mensual',day:5,status:'activo'},
    {id:2,client:'Doña Lupita',amount:350,freq:'semanal',day:1,status:'activo'}
  ],
  step:1,view:'inicio',voice:false,seq:10,qr:null
};
const view=v=>{S.view=v;render()};
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>view(b.dataset.v));
let fs=20;const setFs=d=>{fs=Math.max(16,Math.min(30,fs+d));document.documentElement.style.setProperty('--fs',fs+'px')};
$('#fsm').onclick=()=>setFs(-2);$('#fsp').onclick=()=>setFs(2);

const paid=()=>S.charges.filter(c=>c.status==='pagado');
const total=a=>a.reduce((s,c)=>s+c.amount,0);
const saved=()=>Math.round(total(paid())*COMM*100)/100;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- LUPITA (avatar) E ICONOS ---------- */
function lupita(o={}){
  const {phone=false,crop=false,cls=''}=o;
  const vb=crop?'46 34 108 124':'0 0 200 240';
  const hair='#1d1420',skin='#E3A97C',pink='#E6007E';
  return `<svg class="${cls}" viewBox="${vb}" role="img" aria-label="Lupita, tu asistente" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="52" cy="140" rx="13" ry="17" fill="${hair}"/><ellipse cx="46" cy="168" rx="12" ry="16" fill="${hair}"/><ellipse cx="42" cy="196" rx="11" ry="15" fill="${hair}"/>
  <ellipse cx="148" cy="140" rx="13" ry="17" fill="${hair}"/><ellipse cx="154" cy="168" rx="12" ry="16" fill="${hair}"/><ellipse cx="158" cy="196" rx="11" ry="15" fill="${hair}"/>
  <path d="M30 240C30 186 66 160 100 160s70 26 70 80z" fill="#fff" stroke="#e5ddd0" stroke-width="2"/>
  <path d="M70 168Q100 196 130 168" fill="none" stroke="${pink}" stroke-width="4" stroke-linecap="round"/>
  ${[[78,178],[90,186],[100,189],[110,186],[122,178]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5.5" fill="${pink}"/><circle cx="${x}" cy="${y}" r="2" fill="#FFD6EA"/>`).join('')}
  <ellipse cx="84" cy="190" rx="6" ry="2.6" fill="#2e8b57" transform="rotate(35 84 190)"/><ellipse cx="116" cy="190" rx="6" ry="2.6" fill="#2e8b57" transform="rotate(-35 116 190)"/>
  <rect x="90" y="146" width="20" height="20" rx="8" fill="${skin}"/>
  <ellipse cx="100" cy="88" rx="56" ry="58" fill="${hair}"/>
  <ellipse cx="100" cy="104" rx="46" ry="50" fill="${skin}"/>
  <path d="M52 92C56 54 144 54 148 92 132 74 114 70 100 80 86 70 68 74 52 92z" fill="${hair}"/>
  <g fill="${pink}"><path d="M48 100l-15-9v18z"/><path d="M48 100l15-9v18z"/><path d="M152 100l-15-9v18z"/><path d="M152 100l15-9v18z"/></g>
  <circle cx="48" cy="100" r="4" fill="#B0005F"/><circle cx="152" cy="100" r="4" fill="#B0005F"/>
  <circle cx="56" cy="126" r="5.5" fill="${pink}"/><circle cx="144" cy="126" r="5.5" fill="${pink}"/>
  <path d="M71 93Q82 85 93 91M107 91Q118 85 129 93" stroke="${hair}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <ellipse cx="82" cy="107" rx="8" ry="10" fill="#3a2212"/><ellipse cx="118" cy="107" rx="8" ry="10" fill="#3a2212"/>
  <circle cx="85" cy="103" r="3" fill="#fff"/><circle cx="121" cy="103" r="3" fill="#fff"/>
  <circle cx="72" cy="124" r="7" fill="#F28B82" opacity=".55"/><circle cx="128" cy="124" r="7" fill="#F28B82" opacity=".55"/>
  <path d="M100 113q-3 6 0 8" stroke="#b9805a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M89 128Q100 141 111 128z" fill="#fff" stroke="#9c2b3a" stroke-width="3" stroke-linejoin="round"/>
  ${phone?`<path d="M170 240L153 229" stroke="${skin}" stroke-width="15" stroke-linecap="round"/>
  <g transform="rotate(-8 150 195)"><rect x="128" y="150" width="46" height="78" rx="9" fill="#232323"/><rect x="132" y="156" width="38" height="66" rx="5" fill="#0B6B4F"/><circle cx="151" cy="180" r="11" fill="#fff"/><path d="M145 180l4 4 8-9" stroke="#0B6B4F" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="138" y="198" width="26" height="5" rx="2.5" fill="#fff" opacity=".85"/><rect x="142" y="207" width="18" height="4" rx="2" fill="#fff" opacity=".6"/></g>
  <circle cx="129" cy="206" r="6" fill="${skin}"/>`:''}
  </svg>`;
}
function ico(n,sz=56){
  const d={
   qr:'<rect x="8" y="8" width="18" height="18" rx="3"/><rect x="38" y="8" width="18" height="18" rx="3"/><rect x="8" y="38" width="18" height="18" rx="3"/><path d="M38 38h7v7h-7zM50 38h6M38 52h6M50 46v10h6"/>',
   cal:'<rect x="8" y="12" width="48" height="44" rx="6"/><path d="M8 26h48M20 6v10M44 6v10M22 41l7 7 13-14"/>',
   chat:'<path d="M10 12h44a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H30L18 54V44h-8a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4z"/><path d="M22 28h2M32 28h2M42 28h2"/>',
   clock:'<circle cx="32" cy="32" r="23"/><path d="M32 18v15l10 6"/>',
   store:'<path d="M8 26l4-14h40l4 14zM12 26v6a7 7 0 0 0 13 0 7 7 0 0 0 14 0 7 7 0 0 0 13 0v-6M12 38v18h40V38M26 56V44h12v12"/>',
   info:'<circle cx="32" cy="32" r="23"/><path d="M32 28v16M32 20v2"/>'
  }[n];
  return `<svg width="${sz}" height="${sz}" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
}
function guide(t){return `<div class="guide">${lupita({crop:true,cls:'gav'})}<div class="bubble">${t}</div></div>`}
function celebrate(title,sub){
  const o=document.createElement('div');o.className='ov';o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');o.setAttribute('aria-label',title);
  o.innerHTML=`<div class="ovc"><div class="pop">${lupita({phone:true,cls:'big'})}</div><div class="ok">✔</div><h2>${esc(title)}</h2><p>${esc(sub||'')}</p><button class="btn" id="ovx">Gracias, Lupita</button></div>`;
  document.body.appendChild(o);const b=o.querySelector('#ovx');b.focus();b.onclick=()=>o.remove();
  speak(title);
}


function render(){
  document.querySelectorAll('nav button').forEach(b=>b.setAttribute('aria-current',b.dataset.v===S.view?'page':'false'));
  $('#biz').textContent=S.biz.registered?S.biz.name:'Cobra sin comisiones';
  $('#hav').innerHTML=lupita({crop:true});
  const m=$('#app');
  m.innerHTML=({inicio:vInicio,cobrar:vCobrar,recurrentes:vRec,asistente:vAsist,proyecto:vProy,registro:vReg})[S.view]();
  const after=({cobrar:bindCobrar,recurrentes:bindRec,asistente:bindAsist,registro:bindReg,inicio:bindInicio})[S.view];
  if(after)after();
  window.scrollTo(0,0);
}

/* ---------- INICIO ---------- */
function tile(c,t,ico_,l,sub,go){return `<button class="tile" style="--tc:${c};--tt:${t}" data-go="${go}">${ico(ico_,60)}<b>${l}</b><span>${sub}</span></button>`}
function vInicio(){
  const pend=S.charges.filter(c=>c.status==='pendiente');
  return `<div class="hero">${lupita({phone:true,cls:'hv'})}<div class="bubble"><b>¡Hola, ${esc(S.biz.owner.split(' ')[0])}!</b><br>Soy Lupita. Te ayudo a cobrar sin pagar comisiones. Toca un botón o háblame.</div></div>
  ${S.biz.registered?'':`<div class="card" style="border-color:var(--g)"><h3>${ico('store',34)} Primero, registra tu negocio</h3><p>Son 3 pasos sencillos. Sin costo y sin comisiones.</p><button class="btn" id="goReg">Registrar mi negocio</button></div>`}
  <div class="card money"><div>Has recibido</div><div class="big">${mx(total(paid()))}</div>
    <p>💚 Comisiones que NO pagaste: <b style="color:var(--g)">${mx(saved())}</b></p>
    <p class="hint">Comparado con una terminal que cobra 3.6% + IVA (ejemplo ilustrativo).</p></div>
  <div class="grid2">
    ${tile('#0B6B4F','#fff','qr','Cobrar','Con QR o WhatsApp','cobrar')}
    ${tile('#1F5FA8','#fff','cal','Cobros mensuales','Tus clientes fijos','recurrentes')}
    ${tile('#B34E0A','#fff','chat','Hablar con Lupita','Por voz o escribiendo','asistente')}
    ${tile('#FFD166','#1B1B1B','clock','¿Quién me debe?',pend.length+' por cobrar ('+mx(total(pend))+')','cobrar')}
  </div>
  <div class="card" style="margin-top:14px"><h3>Próximos cobros mensuales</h3>${S.rec.filter(r=>r.status==='activo').map(r=>`<div class="item"><div><b>${esc(r.client)}</b><br>${r.freq}</div><b>${mx(r.amount)}</b></div>`).join('')||'<p>Aún no tienes cobros programados.</p>'}</div>`;
}
function bindInicio(){
  document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>view(b.dataset.go));
  const g=$('#goReg');if(g)g.onclick=()=>{S.step=1;view('registro')};
}

/* ---------- REGISTRO ---------- */
function vReg(){
  const g={1:'Cuéntame de tu negocio. ¡Yo te voy guiando!',2:'Es para cuidar tu dinero y que nadie se haga pasar por ti. 🔒',3:'Último paso. Aquí te llegará tu dinero, directo y sin comisiones.'};
  return guide(g[S.step])+vReg0();
}
function vReg0(){
  const st=S.step;
  const bar=`<div class="steps" aria-hidden="true">${[1,2,3].map(i=>`<span class="${i<=st?'on':''}"></span>`).join('')}</div><p><b>Paso ${st} de 3</b></p>`;
  if(st===1)return `<h2>Tu negocio</h2>${bar}<div class="card">
   <label for="n">Nombre del negocio</label><input id="n" value="${esc(S.biz.name)}">
   <label for="o">Tu nombre</label><input id="o" value="${esc(S.biz.owner)}">
   <label for="g">¿A qué se dedica?</label><select id="g">${['Alimentos','Tienda de abarrotes','Servicios','Belleza','Comercio en línea','Otro'].map(x=>`<option ${x===S.biz.giro?'selected':''}>${x}</option>`).join('')}</select>
   <label for="c">Celular (el que usas en WhatsApp)</label><input id="c" inputmode="tel" value="${esc(S.biz.cel)}">
   <p class="hint">RFC es opcional para empezar.</p></div><button class="btn" id="nx">Continuar</button>`;
  if(st===2)return `<h2>Verifica que eres tú</h2>${bar}<div class="card">
   <label for="cu">CURP</label><input id="cu" placeholder="18 letras y números" maxlength="18" autocapitalize="characters">
   <p class="hint">La Ley de Economía Digital reconoce la CURP Digital como forma de identificarte. En esta demo no se envía a ningún lado.</p>
   <label for="cd">Código que te mandamos por WhatsApp</label><input id="cd" inputmode="numeric" maxlength="6" placeholder="6 números"></div>
   <div class="row"><button class="btn alt" id="bk">Atrás</button><button class="btn" id="nx">Continuar</button></div>`;
  return `<h2>¿Dónde recibes tu dinero?</h2>${bar}<div class="card">
   <label for="cl">CLABE o cuenta (puede ser cuenta N2 Bis)</label><input id="cl" inputmode="numeric" maxlength="18" placeholder="18 números">
   <p class="hint">El dinero llega directo a tu cuenta por SPEI/CoDi. CobroLibre no lo retiene ni cobra comisión por cobro.</p></div>
   <div class="row"><button class="btn alt" id="bk">Atrás</button><button class="btn" id="fin">Terminar registro</button></div>`;
}
function bindReg(){
  const nx=$('#nx'),bk=$('#bk'),fin=$('#fin');
  if(bk)bk.onclick=()=>{S.step--;render()};
  if(nx)nx.onclick=()=>{
    if(S.step===1){S.biz.name=$('#n').value.trim()||S.biz.name;S.biz.owner=$('#o').value.trim()||S.biz.owner;S.biz.giro=$('#g').value;S.biz.cel=$('#c').value}
    S.step++;render();
  };
  if(fin)fin.onclick=()=>{S.biz.registered=true;view('inicio');celebrate('¡Listo, ya puedes cobrar!','Tu negocio quedó registrado.')};
}

/* ---------- COBRAR ---------- */
function vCobrar(){
  return guide('Dime a quién le cobras y cuánto. Yo hago el QR.')+`<h2>Cobrar</h2><div class="card">
   <label for="cn">Nombre del cliente</label><input id="cn" placeholder="Ej. Juan Pérez">
   <label for="cp">Celular del cliente</label><input id="cp" inputmode="tel" placeholder="10 dígitos">
   <label for="cm">Monto en pesos</label><input id="cm" inputmode="decimal" placeholder="Ej. 250">
   <label for="cc">¿Por qué es el cobro?</label><input id="cc" placeholder="Ej. Pedido de pastel">
   <div style="margin-top:14px"><button class="btn" id="mk">Crear cobro y QR</button></div></div>
   <div id="res">${S.qr?qrCard(S.qr):''}</div>
   <div class="card"><h3>Mis cobros</h3>${S.charges.slice().reverse().map(c=>`<div class="item"><div><b>${esc(c.client)}</b> · ${mx(c.amount)}<br><span class="hint">${esc(c.concept)} · ${c.date}</span></div><div><span class="tag ${c.status==='pagado'?'t-ok':'t-pe'}">${c.status==='pagado'?'Pagado':'Pendiente'}</span></div></div>`).join('')}</div>`;
}
function qrCard(c){
  const msg=encodeURIComponent(`Hola ${c.client}, te comparto tu cobro de ${mx(c.amount)} por "${c.concept}" de ${S.biz.name}. Paga con tu app del banco escaneando el QR o por SPEI. Sin comisiones. Ref: CL-${c.id}`);
  return `<div class="card" style="border-color:var(--g)"><h3>Cobro listo: ${mx(c.amount)}</h3>
  <canvas id="qr" width="260" height="260" aria-label="Código QR de demostración"></canvas>
  <p class="hint">QR de demostración. En producción será un QR CoDi/DiMo real emitido por una institución autorizada.</p>
  <div class="row"><a class="btn wa" target="_blank" rel="noopener" href="https://wa.me/52${c.phone.replace(/\D/g,'')}?text=${msg}">📲 Enviar por WhatsApp</a>
  <button class="btn alt" id="sim">Simular: el cliente ya pagó</button></div></div>`;
}
function drawQR(txt){
  const cv=$('#qr');if(!cv)return;const ctx=cv.getContext('2d'),N=25,z=cv.width/N;
  let h=2166136261;for(const ch of txt){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}
  const rnd=()=>{h^=h<<13;h^=h>>>17;h^=h<<5;return (h>>>0)/4294967296};
  ctx.fillStyle='#fff';ctx.fillRect(0,0,cv.width,cv.height);ctx.fillStyle='#000';
  const fin=(x,y)=>{ctx.fillRect(x*z,y*z,7*z,7*z);ctx.fillStyle='#fff';ctx.fillRect((x+1)*z,(y+1)*z,5*z,5*z);ctx.fillStyle='#000';ctx.fillRect((x+2)*z,(y+2)*z,3*z,3*z)};
  for(let y=0;y<N;y++)for(let x=0;x<N;x++){
    const inF=(x<8&&y<8)||(x>N-9&&y<8)||(x<8&&y>N-9);if(inF)continue;
    if(rnd()>.5)ctx.fillRect(x*z,y*z,z,z)}
  fin(0,0);fin(N-7,0);fin(0,N-7);
}
function bindCobrar(){
  if(S.qr)drawQR('CL'+S.qr.id+S.qr.amount);
  $('#mk').onclick=()=>{
    const amount=parseFloat(String($('#cm').value).replace(',','.'));
    const client=$('#cn').value.trim();
    if(!client||!(amount>0)){speak('Escribe el nombre y el monto del cliente');alert2('Falta el nombre o el monto.');return}
    const c={id:S.seq++,client,phone:$('#cp').value||'5500000000',concept:$('#cc').value.trim()||'Cobro',amount,status:'pendiente',date:today()};
    S.charges.push(c);S.qr=c;render();
  };
  const s=$('#sim');if(s)s.onclick=()=>{const c=S.qr;c.status='pagado';S.qr=null;render();celebrate('¡Pago recibido!',c.client+' te pagó '+mx(c.amount)+'. Sin comisiones.')};
}
function alert2(t){const d=document.createElement('div');d.className='notice';d.setAttribute('role','alert');d.textContent=t;$('#app').prepend(d);setTimeout(()=>d.remove(),4000)}

/* ---------- RECURRENTES ---------- */
function vRec(){
  return guide('Para clientes que pagan cada mes. Ellos te autorizan y pueden cancelar cuando quieran.')+`<h2>Cobros mensuales</h2>
  <div class="notice">Cada cliente debe <b>autorizar</b> el cobro recurrente (domiciliación) desde su banco. Se lo pedimos por WhatsApp y puede cancelarlo cuando quiera.</div>
  <div class="card"><h3>Programar un cobro</h3>
   <label for="rc">Cliente</label><input id="rc" placeholder="Nombre">
   <label for="rm">Monto</label><input id="rm" inputmode="decimal" placeholder="Ej. 500">
   <label for="rf">Cada cuánto</label><select id="rf"><option>mensual</option><option>quincenal</option><option>semanal</option></select>
   <label for="rd">Día del cobro (1 a 28)</label><input id="rd" inputmode="numeric" value="1">
   <div style="margin-top:14px"><button class="btn" id="ra">Pedir autorización por WhatsApp</button></div></div>
  <div class="card"><h3>Mis cobros programados</h3>${S.rec.map(r=>`<div class="item"><div><b>${esc(r.client)}</b> · ${mx(r.amount)}<br><span class="hint">${r.freq}, día ${r.day}</span><br><span class="tag ${r.status==='activo'?'t-ok':r.status==='pausado'?'t-pa':'t-pe'}">${r.status==='activo'?'Activo':r.status==='pausado'?'Pausado':'Esperando autorización'}</span></div>
   <div class="row" style="flex:0 1 240px">${r.status==='pendiente de autorización'?`<button class="btn sm" data-a="ok" data-i="${r.id}">Simular: autorizó</button>`:''}${r.status==='activo'?`<button class="btn sm" data-a="run" data-i="${r.id}">Cobrar hoy</button><button class="btn sm alt" data-a="pause" data-i="${r.id}">Pausar</button>`:''}${r.status==='pausado'?`<button class="btn sm alt" data-a="resume" data-i="${r.id}">Reanudar</button>`:''}</div></div>`).join('')||'<p>Todavía no hay cobros programados.</p>'}</div>`;
}
function bindRec(){
  $('#ra').onclick=()=>{
    const amount=parseFloat(String($('#rm').value).replace(',','.')),client=$('#rc').value.trim(),day=Math.min(28,Math.max(1,parseInt($('#rd').value)||1));
    if(!client||!(amount>0)){alert2('Falta el nombre o el monto.');return}
    S.rec.push({id:S.seq++,client,amount,freq:$('#rf').value,day,status:'pendiente de autorización'});render();
  };
  document.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{
    const r=S.rec.find(x=>x.id==b.dataset.i),a=b.dataset.a;
    if(a==='ok'||a==='resume')r.status='activo';
    if(a==='pause')r.status='pausado';
    if(a==='run')S.charges.push({id:S.seq++,client:r.client,phone:'',concept:'Cobro '+r.freq,amount:r.amount,status:'pagado',date:today()});
    render();
  });
}

/* ---------- ASISTENTE ---------- */
let chat=[{w:'bot',t:'Hola 👋 Soy Lupita, tu asistente de CobroLibre. Puedes escribirme o hablarme. Por ejemplo: "cobra 300 a Juan" o "¿cuánto vendí hoy?".'}];
function vAsist(){
  return `<h2>Mi asistente</h2><p class="hint">Así se ve dentro de WhatsApp. Habla con el micrófono o escribe.</p>
  <div class="wa-box"><div class="wa-head"><span class="wh">${lupita({crop:true,cls:'hav2'})}<span>Lupita · CobroLibre<small>en línea</small></span></span></div><div id="chat" role="log" aria-live="polite">${chat.map(m=>m.w==='bot'?`<div class="brow">${lupita({crop:true,cls:'cav'})}<div class="msg bot">${esc(m.t)}</div></div>`:`<div class="msg me">${esc(m.t)}</div>`).join('')}</div>
  <div class="wa-in"><input id="q" placeholder="Escribe aquí…" aria-label="Mensaje"><button id="mic" aria-label="Hablar">🎤</button><button id="snd" aria-label="Enviar">➤</button></div></div>
  <div class="chips"><button>¿Cuánto vendí hoy?</button><button>¿Quién me debe?</button><button>Cobra 300 a Juan</button><button>Cobro mensual de 500 a Rosa</button><button>Ayuda</button></div>
  <label style="display:flex;gap:10px;align-items:center"><input type="checkbox" id="vz" style="width:30px;min-height:30px" ${S.voice?'checked':''}> Leer las respuestas en voz alta</label>`;
}
function bindAsist(){
  const c=$('#chat');c.scrollTop=c.scrollHeight;
  const send=t=>{t=(t||$('#q').value).trim();if(!t)return;chat.push({w:'me',t});const r=reply(t);chat.push({w:'bot',t:r});speak(r);render()};
  $('#snd').onclick=()=>send();
  $('#q').onkeydown=e=>{if(e.key==='Enter')send()};
  document.querySelectorAll('.chips button').forEach(b=>b.onclick=()=>send(b.textContent));
  $('#vz').onchange=e=>{S.voice=e.target.checked;if(S.voice)speak('Voz activada')};
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  $('#mic').onclick=()=>{
    if(!SR){alert2('Tu navegador no permite dictado por voz aquí. Escribe tu mensaje.');return}
    try{const r=new SR();r.lang='es-MX';const m=$('#mic');m.classList.add('listening');
      r.onresult=e=>{send(e.results[0][0].transcript)};r.onend=()=>m.classList.remove('listening');r.onerror=()=>{m.classList.remove('listening');alert2('No pude escucharte. Intenta de nuevo o escribe.')};r.start()}
    catch(e){alert2('El micrófono no está disponible. Escribe tu mensaje.')}
  };
}
function speak(t){if(!S.voice||!window.speechSynthesis)return;try{const u=new SpeechSynthesisUtterance(t);u.lang='es-MX';u.rate=.9;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}}
function reply(t){
  const q=t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
  const num=(q.match(/(\d+(?:[.,]\d+)?)/)||[])[1];const amount=num?parseFloat(num.replace(',','.')):0;
  const nm=(t.match(/\b(?:a|para)\s+([A-ZÁÉÍÓÚÑ][\wáéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][\wáéíóúñ]+)?)/)||[])[1];
  if(/mensual|semanal|quincenal|recurrente|suscripcion/.test(q)&&amount&&nm){
    const freq=/semanal/.test(q)?'semanal':/quincenal/.test(q)?'quincenal':'mensual';
    S.rec.push({id:S.seq++,client:nm,amount,freq,day:1,status:'pendiente de autorización'});
    return `Listo. Le mandé a ${nm} una solicitud por WhatsApp para autorizar ${mx(amount)} ${freq}. Cuando acepte, el cobro quedará activo.`}
  if(/cobra|cobrar|cobrale|cargale/.test(q)&&amount&&nm){
    S.charges.push({id:S.seq++,client:nm,phone:'',concept:'Cobro por asistente',amount,status:'pendiente',date:today()});
    return `Listo. Creé el cobro de ${mx(amount)} para ${nm} y le envié el QR por WhatsApp. Sin comisiones.`}
  if(/mensual|recurrente|programad/.test(q)){const a=S.rec.filter(r=>r.status==='activo');return a.length?'Tus cobros programados:\n'+a.map(r=>`• ${r.client}: ${mx(r.amount)} ${r.freq}`).join('\n'):'No tienes cobros programados activos.'}
  if(/debe|pendiente|falta/.test(q)){const p=S.charges.filter(c=>c.status==='pendiente');return p.length?`Tienes ${p.length} cobros pendientes por ${mx(total(p))}:\n`+p.map(c=>`• ${c.client}: ${mx(c.amount)}`).join('\n'):'Nadie te debe nada por ahora.'}
  if(/vend|cobr|recib|gane|dinero|cuanto/.test(q))return `Has recibido ${mx(total(paid()))} en ${paid().length} pagos. Te ahorraste ${mx(saved())} en comisiones.`;
  if(/ayuda|que puedes|como/.test(q))return 'Puedo:\n• Crear cobros: "cobra 300 a Juan"\n• Programar cobros: "cobro mensual de 500 a Rosa"\n• Decirte cuánto has recibido\n• Decirte quién te debe';
  return 'No entendí bien. Puedes decir, por ejemplo: "cobra 300 a Juan" o "¿cuánto vendí hoy?". Escribe "ayuda" para ver más.';
}

/* ---------- PROYECTO ---------- */
function vProy(){
  return `<h2>Sobre el proyecto</h2>
  <div class="card"><h3>Propuesta de valor</h3><p><b>Cobra con QR y WhatsApp, el dinero llega directo a tu cuenta, sin pagar comisión por cobro.</b> Montado sobre los rieles públicos de Banxico (SPEI/CoDi), que no cobran comisión al comprador ni al comercio, según la ATDT.</p></div>
  <div class="card"><h3>¿Para quién?</h3><p>Micro y pequeños negocios que hoy cobran en efectivo: fondas, tiendas, estéticas, profesores, servicios a domicilio, y quienes cobran mensualidades. Con interfaz pensada para personas mayores, ya sean dueñas del negocio o clientes.</p></div>
  <div class="card"><h3>Canal</h3><p><b>WhatsApp primero</b>: el negocio crea cobros y el cliente paga desde el chat con su app del banco. Alianzas con cámaras de comercio, mercados públicos y contadores.</p></div>
  <div class="card"><h3>N2 Bis y la Ley</h3><p>Las cuentas Nivel 2 Bis de Banxico permiten a micro negocios recibir hasta 15,000 UDIs al mes (aprox. $130,000) sin constancia fiscal. La Ley de Economía Digital para Pagos Digitales y Electrónicos se publicó el 4 de noviembre de 2026 e incluye la domiciliación entre los medios cubiertos.</p></div>
  <div class="card"><h3>Competidores</h3><table><tr><th>Quién</th><th>Cobro</th></tr>
   <tr><td>Clip, Mercado Pago, terminales bancarias</td><td>Comisión por transacción; 41% de los que aceptan tarjeta reportó más de 3.6% + IVA</td></tr>
   <tr><td>CoDi / DiMo (directo del banco)</td><td>Sin comisión, pero poca adopción y sin seguimiento ni recordatorios</td></tr>
   <tr><td><b>CobroLibre</b></td><td>Sin comisión por cobro + WhatsApp + cobros recurrentes + asistente accesible</td></tr></table></div>
  <div class="card"><h3>Psicología del color</h3><p class="hint">Pensado para personas mayores: pocos colores, siempre con el mismo significado.</p>
   <div class="item"><span class="sw" style="background:#0B6B4F"></span><div style="flex:1"><b>Verde</b> · dinero, confianza, "adelante" (cobrar, pago recibido)</div></div>
   <div class="item"><span class="sw" style="background:#1F5FA8"></span><div style="flex:1"><b>Azul</b> · seguridad y estabilidad (cobros mensuales)</div></div>
   <div class="item"><span class="sw" style="background:#B34E0A"></span><div style="flex:1"><b>Naranja cálido</b> · cercanía y amabilidad (Lupita, ayuda)</div></div>
   <div class="item"><span class="sw" style="background:#FFD166"></span><div style="flex:1"><b>Amarillo</b> · atención suave (pendientes), sin alarmar</div></div>
   <div class="item"><span class="sw" style="background:#E6007E"></span><div style="flex:1"><b>Rosa mexicano</b> · identidad y calidez (Lupita y su bordado)</div></div>
   <p class="hint">Evitamos el rojo intenso para no asustar y usamos fondo crema para cansar menos la vista.</p></div>
  <div class="notice"><b>Esto es un prototipo.</b> Los pagos, el QR y las autorizaciones son simulados. Para operar de verdad se necesita una institución autorizada (banco, IFPE) como proveedor de cobro, la API de WhatsApp Business y cumplimiento con CNBV/Banxico.</div>`;
}
render();
