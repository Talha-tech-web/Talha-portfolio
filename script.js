/* scroll progress */
window.addEventListener('scroll',()=>{
  const p=window.scrollY/(document.body.scrollHeight-window.innerHeight);
  document.getElementById('prog').style.width=(p*100)+'%';
  document.getElementById('nb').classList.toggle('scrolled',window.scrollY>60);
});

/* humburger */
const ham=document.getElementById('ham'),mn=document.getElementById('mobnav');
ham.addEventListener('click',()=>{ham.classList.toggle('open');mn.classList.toggle('open');});
function closeM(){ham.classList.remove('open');mn.classList.remove('open');}

/* Animation */
const roles=['Data Analyst','Power BI Developer','Python Analyst','BI Dashboard Designer','Data Manipulator'];
let ri=0,ci=0,del=false;
function type(){
  const w=roles[ri],el=document.getElementById('typed');
  if(!del){el.textContent=w.slice(0,++ci);if(ci===w.length){del=true;setTimeout(type,1900);return;}setTimeout(type,80);}
  else{el.textContent=w.slice(0,--ci);if(ci===0){del=false;ri=(ri+1)%roles.length;setTimeout(type,300);return;}setTimeout(type,42);}
}
type();

/* skill bar */
const ro=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in');
      e.target.querySelectorAll('.sk-fill').forEach(b=>{b.style.width=b.dataset.w+'%';});
    }
  });
},{threshold:.1});
document.querySelectorAll('.reveal').forEach(r=>ro.observe(r));

/* form fill */
document.getElementById('cform').addEventListener('submit',async function(e){
  e.preventDefault();
  const name   =document.getElementById('fn').value.trim();
  const email  =document.getElementById('fe').value.trim();
  const subject=document.getElementById('fs').value.trim()||'Portfolio Contact';
  const message=document.getElementById('fm').value.trim();
  const st=document.getElementById('fst');
  const btn=document.getElementById('sbtn');
  const tx=document.getElementById('btnTxt');
  const ic=document.getElementById('btnIco');

  if(!name||!email||!message){
    st.className='fstatus err';
    st.textContent='⚠️ Please fill in Name, Email, and Message.';
    return;
  }

  btn.disabled=true;tx.textContent='Sending…';ic.textContent='⏳';
  st.className='fstatus';st.textContent='';

  let sent=false;

  try{
    const r=await fetch('https://formsubmit.co/ajax/muhammadtalhajameel419@gmail.com',{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify({
        name,email,
        _subject:`[Portfolio] ${subject} — from ${name}`,
        message,
        _captcha:'false',
        _template:'table'
      })
    });
    const d=await r.json();
    if(d.success==='true'||d.success===true) sent=true;
  }catch(_){}

  if(sent){
    st.className='fstatus ok';
    st.textContent='✅ Message sent successfully! I will get back to you within 24 hours.';
    this.reset();
    tx.textContent='Sent!';ic.textContent='✓';
    setTimeout(()=>{tx.textContent='Send Message';ic.textContent='→';btn.disabled=false;},4000);
    return;
  }

  const body=`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
  const mailtoUrl=`mailto:muhammadtalhajameel419@gmail.com`
    +`?subject=${encodeURIComponent('[Portfolio] '+subject+' — from '+name)}`
    +`&body=${encodeURIComponent(body)}`;

  window.open(mailtoUrl,'_blank');

  st.className='fstatus warn';
  st.innerHTML='📧 Your email app has opened with the message pre-filled. Just hit <b>Send</b> in your email client to deliver it.';
  tx.textContent='Email App Opened';ic.textContent='📧';
  setTimeout(()=>{tx.textContent='Send Message';ic.textContent='→';btn.disabled=false;st.className='fstatus';},6000);
});
