'use client'
import {useEffect,useRef,useState} from 'react'
import {motion,AnimatePresence,useScroll,useTransform} from 'framer-motion'
import confetti from 'canvas-confetti'
import emailjs from '@emailjs/browser'
import Lenis from 'lenis'
const PR={"name": "Lakku", "full": "Laukeshvari Deshmukh", "img": "/her.jpg", "pos": "top", "snap": "/snap.jpg"},NAME=PR.name,SPECIAL='--nWMSumSIc',BG=['Oo5tqEWm-jM','HexFqifusOk'],COL=['#ffb627','#ff8a00','#ff5d8f','#fff6e3']
const boom=(x,y)=>confetti({particleCount:70,spread:360,startVelocity:22,gravity:.7,ticks:110,scalar:.9,origin:{x:x/innerWidth,y:y/innerHeight},colors:COL,shapes:['circle'],disableForReducedMotion:true})
const send=async p=>{const service=process.env.NEXT_PUBLIC_EJS_SERVICE,template=process.env.NEXT_PUBLIC_EJS_TEMPLATE,publicKey=process.env.NEXT_PUBLIC_EJS_KEY;if(!service||!template||!publicKey){console.error('EmailJS configuration is missing');return {ok:false,error:'Email service configuration missing. Add the EmailJS variables and redeploy.'}}try{await emailjs.send(service,template,{event:'-',answer:'-',memory:'-',wish:'-',date_idea:'-',message:'-',quiz:'-',sent_at:new Date().toLocaleString('en-IN'),...p},{publicKey});return {ok:true}}catch(e){console.error('EmailJS',e);return {ok:false,error:e?.text||e?.message||'Email could not be sent. Check the EmailJS template and service settings.'}}}
const WISH=["Jahan tum hoti ho, wahan diye ki zarurat nahi padti. Roshni khud aa jaati hai.","Is Diwali bas itna maangta hoon: tumhari muskaan kabhi dim na ho.","Kuch log life mein aate nahi, life ban jaate hain. Tum unme se ho.","Laxmi ji aayein ya na aayein, tumhari dosti ka khazana mere paas hai. Wahi kaafi hai.","Aur agar ek wish sach honi ho, to mera dil sirf ek naam leta hai… aage badho."]
const CARDS=[["Tumhari hasi","Bure se bure din ko bhi achha bana deti hai."],["Tumhari baatein","Ghanto nikal jaate hain, pata hi nahi chalta."],["Tumhari fikr","Bina kahe sab samajh jaati ho."],["Tumhara andaaz","Simple sa, par poori mehfil tumhari."],["Tumhari dosti","Ek safe, sukoon wali jagah jaisi."],["Tumhara hona","Mere liye sabse bada tohfa hai."]]
const QZ=[{q:"Diwali ki favourite mithai?",o:["Kaju katli","Gulab jamun","Jalebi","Rasgulla"]},{q:"Diwali ka sabse pasandida hissa?",o:["Diye 🪔","Patakhe 🎆","Mithai 🍬","Sab log saath"]},{q:"Ek perfect shaam kaisi hoti hai?",o:["Chai + baatein","Long drive","Movie night","Sunset walk"]},{q:"Sach batao, main tumhara kya hoon?",o:["Best friend","Pagal dost","Kuch khaas 😳","Bataungi nahi"]}]
const LTR=["Tumse kabhi seedha keh nahi paya, isliye ye sab banaya.","Tum saath ho to din chhota aur yaadein bahut badi lagti hain.","Tumhari hasi meri sabse achhi playlist hai.","Ye dosti bahut khoobsurat hai, aur main use khone se darta hoon…","…par phir laga, jo dil mein hai wo kehna bhi zaroori hai.","Isliye is Diwali, ek diya mere dil ka bhi, tumhare naam."]
const NOTES=["Tumhari ek 'hmm' bhi meri puri baat se zyada khoobsurat lagti hai.", "Jab tum hasti ho, mera din reset ho jaata hai.", "Tum wo ho jise dekh ke 'ghar' jaisa lagta hai.", "Diwali ke diye to bujh jaate hain, par tumhari yaad meri roshni hai.", "Agar main kabhi bhi thak jaun, tumhara ek message kaafi hai.", "Tum jaisi dost milna kismat hai, aur aage kuch ho jaye to meri khushnaseebi.", "Aaj ki raat sabse chamakta diya tum ho, {N}.", "Aur haan, tumse kehne ko bahut kuch hai… bas hasna mat 🙈"]
const DATES=["Chai aur lambi baatein ☕","Long drive 🚗","Candle light dinner 🕯️","Movie aur popcorn 🍿","Surprise me 🎁"]
const NOS=['Nahi','Pakka?','Soch lo 🥺','Arre!','Pakad ke dikhao','Plsss']
const Diya=({on,...p})=><button className={'diya'+(on?' on':'')} {...p}><span className="fl"/><span className="bowl"/></button>
const H=({children,s})=><motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-60px'}} transition={{duration:.8}}><h2>{children}</h2>{s&&<p className="sub">{s}</p>}</motion.div>
function Scratch(){const c=useRef(null),[ok,setOk]=useState(false)
useEffect(()=>{const cv=c.current,x=cv.getContext('2d'),g=x.createLinearGradient(0,0,cv.width,cv.height);g.addColorStop(0,'#ffb627');g.addColorStop(1,'#ff8a00');x.fillStyle=g;x.fillRect(0,0,cv.width,cv.height);x.fillStyle='#2a1200';x.font='700 22px Mukta,sans-serif';x.textAlign='center';x.fillText('Scratch karo 🪙',cv.width/2,cv.height/2+8)},[])
const sc=e=>{if(ok||e.buttons!==1)return;const cv=c.current,r=cv.getBoundingClientRect(),x=cv.getContext('2d');x.globalCompositeOperation='destination-out';x.beginPath();x.arc((e.clientX-r.left)*cv.width/r.width,(e.clientY-r.top)*cv.height/r.height,26,0,7);x.fill()
const d=x.getImageData(0,0,cv.width,cv.height).data;let n=0;for(let i=3;i<d.length;i+=64)if(d[i]==0)n++;if(n>d.length/64*.45){setOk(true);c.current.style.opacity=0;boom(innerWidth/2,innerHeight/2);send({event:'🪙 Scratch card khul gaya'})}}
return(<div style={{position:'relative',width:300,height:150,margin:'auto'}}><div style={{position:'absolute',inset:0,display:'grid',placeItems:'center',textAlign:'center',fontFamily:'Yatra One',fontSize:'1.3rem',lineHeight:1.4,background:'#ffffff14',borderRadius:20}}><span>Tum meri favourite ho 💛<br/>Hamesha se.</span></div><canvas ref={c} width={300} height={150} style={{position:'absolute',inset:0,borderRadius:20,transition:'opacity 1s',touchAction:'none'}} onPointerMove={sc} onPointerDown={sc}/></div>)}
function Rangoli(){const [c,setC]=useState({}),n=Object.keys(c).length,K=['#ffb627','#ff5d8f','#ff8a00','#7bdff2','#b8f2a1','#fff6e3','#f78fb3','#ffd86b']
return(<div style={{textAlign:'center'}}><svg viewBox="-100 -100 200 200" style={{width:'min(78vw,300px)'}}>{K.map((col,k)=><ellipse key={k} cx="0" cy="-48" rx="16" ry="34" transform={`rotate(${k*45})`} fill={c[k]?col:'#ffffff14'} stroke="#ffb62799" strokeWidth="1.5" style={{cursor:'pointer',transition:'fill .5s'}} onClick={()=>{if(c[k])return;setC({...c,[k]:1});if(n==7){boom(innerWidth/2,innerHeight/2);send({event:'🎨 Rangoli poori ho gayi'})}}}/>)}<circle r="12" fill={n==8?'#ffb627':'#ffffff14'} stroke="#ffb62799"/></svg><p className="cnt">{n==8?'Rangoli poori! Bilkul tumhari tarah khoobsurat 🌸':'Petal pe tap karo ('+n+'/8)'}</p></div>)}
const hearts=()=>confetti({particleCount:24,spread:80,origin:{y:.45},scalar:2,shapes:[confetti.shapeFromText({text:'❤️',scalar:2})]})
function Gift(){const [t,setT]=useState(0)
return(<div style={{textAlign:'center'}}><motion.button key={t} animate={t<3?{rotate:[0,-8,8,-8,0]}:{scale:[1,1.4,1]}} style={{background:'none',border:0,fontSize:'5rem',lineHeight:1,cursor:'pointer'}} aria-label="Gift" onClick={()=>{if(t>=3)return;setT(t+1);hearts();if(t==2){boom(innerWidth/2,innerHeight/2);send({event:'🎁 Gift box khul gaya'})}}}>{t<3?'🎁':'💝'}</motion.button>
<p className="cnt">{['Gift pe 3 baar tap karo','Aur do baar…','Bas ek aur!','Surprise! 💝'][t]}</p>
{t==3&&<motion.p className="big" style={{fontSize:'1.4rem'}} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>Is gift mein koi cheez nahi hai,<br/>kyunki sabse badi cheez <em>tum</em> ho. 💛</motion.p>}</div>)}
function Match(){const E=['🪔','🎆','🍬','🪷','🌟','💛'],O=[3,0,5,2,1,4,0,3,2,5,4,1],[o,setO]=useState([]),[m,setM]=useState([]),[mv,setMv]=useState(0)
const tap=i=>{if(o.length==2||o.includes(i)||m.includes(O[i]))return;const n=[...o,i];setO(n);if(n.length==2){setMv(mv+1);if(O[n[0]]==O[n[1]]){const mm=[...m,O[i]];setTimeout(()=>{setM(mm);setO([]);if(mm.length==6){boom(innerWidth/2,innerHeight/2);send({event:'🧩 Match game poora ('+(mv+1)+' moves)'})}},500)}else setTimeout(()=>setO([]),800)}}
return(<div style={{textAlign:'center'}}><div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'.6rem',maxWidth:320,margin:'auto'}}>{O.map((v,i)=>{const show=o.includes(i)||m.includes(v);return <button key={i} className="chip" style={{height:70,fontSize:'1.8rem',padding:0,background:show?'linear-gradient(135deg,#ffb627,#ff8a00)':'#ffffff14'}} onClick={()=>tap(i)}>{show?E[v]:'?'}</button>})}</div><p className="cnt">{m.length==6?'Wah! '+mv+' moves mein poori 🎉':'Jodi milao. Moves: '+mv}</p></div>)}
export default function P(){
const [lit,setLit]=useState(false),[on,setOn]=useState([]),[fl,setFl]=useState({}),[qz,setQz]=useState({i:0,a:[]}),[sp,setSp]=useState(false),[st,setSt]=useState(0),[f,setF]=useState({wish:'',memory:'',date:DATES[0],answer:'',msg:''}),[pos,setPos]=useState({x:0,y:0}),[nt,setNt]=useState(0),[done,setDone]=useState(false),[sending,setSending]=useState(false),[err,setErr]=useState(false),[mute,setMute]=useState(false),[vc,setVc]=useState(false),[egg,setEgg]=useState(0)
const bg=useRef(null),hero=useRef(null),{scrollYProgress}=useScroll({target:hero,offset:['start start','end start']}),py=useTransform(scrollYProgress,[0,1],[0,120])
useEffect(()=>{const l=new Lenis();let r;const raf=t=>{l.raf(t);r=requestAnimationFrame(raf)};r=requestAnimationFrame(raf)
const s=document.createElement('script');s.src='https://www.youtube.com/iframe_api';document.head.append(s)
const d=e=>{if(!e.target.closest('input,textarea,select,button,video,iframe'))boom(e.clientX,e.clientY)};addEventListener('pointerdown',d)
const iv=setInterval(()=>{if(!document.body.classList.contains('lock')&&document.visibilityState=='visible')boom(innerWidth*(.15+Math.random()*.7),innerHeight*(.1+Math.random()*.3))},3200)
return()=>{cancelAnimationFrame(r);l.destroy();clearInterval(iv);removeEventListener('pointerdown',d)}},[])
const open=()=>{setLit(true);document.body.classList.remove('lock');boom(innerWidth/2,innerHeight/2);send({event:'🪔 Usne website khol li!'})
const mk=()=>{bg.current=new window.YT.Player('bgp',{height:'2',width:'2',videoId:BG[0],playerVars:{autoplay:1,loop:1,playlist:BG.join(','),playsinline:1},events:{onReady:e=>e.target.playVideo()}})}
window.YT&&window.YT.Player?mk():(window.onYouTubeIframeAPIReady=mk)}
const light=k=>{if(on.includes(k))return;setOn([...on,k]);const r=document.getElementById('d'+k).getBoundingClientRect();boom(r.left+48,r.top+10)}
const pick=o=>{const a=[...qz.a,o];setQz({i:qz.i+1,a});boom(innerWidth/2,innerHeight*.6);if(a.length==QZ.length)send({event:'🎯 Quiz complete',quiz:QZ.map((q,k)=>q.q+' → '+a[k]).join(' | ')})}
const submit=async()=>{setSending(true);setErr('');const result=await send({event:'💌 PROPOSAL ANSWER',answer:f.answer,wish:f.wish||'-',memory:f.memory||'-',date_idea:f.date,message:f.msg||'-',quiz:qz.a.join(', ')||'-'});setSending(false);if(!result.ok){setErr(result.error);return}
setDone(true);for(let i=0;i<14;i++)setTimeout(()=>boom(innerWidth*Math.random(),innerHeight*Math.random()*.7),i*450);setTimeout(()=>document.getElementById('fin').scrollIntoView({behavior:'smooth',block:'center'}),300)}
const dodge=()=>{setNt(n=>n+1);setPos({x:(Math.random()-.5)*150,y:(Math.random()-.5)*60})}
const T=(s,d=0)=>[...s].map((c,i)=><motion.span key={i} style={{display:'inline-block',whiteSpace:'pre'}} initial={{opacity:0,y:30,filter:'blur(8px)'}} animate={lit?{opacity:1,y:0,filter:'blur(0px)'}:{}} transition={{delay:d+i*.06+1.2,duration:.7}}>{c}</motion.span>)
const {scrollYProgress:pg}=useScroll(),q=QZ[qz.i]
return(<>
<motion.div style={{scaleX:pg,position:'fixed',top:0,left:0,right:0,height:3,transformOrigin:'0 0',background:'linear-gradient(90deg,#ffb627,#ff5d8f)',zIndex:70}}/>
<div className="sky" aria-hidden="true">{Array.from({length:55},(_,i)=><i key={i} className="st" style={{left:(i*37%100)+'%',top:(i*53%100)+'%',animationDelay:(i%7)*.4+'s',width:i%5?2:3,height:i%5?2:3}}/>)}{Array.from({length:8},(_,i)=><i key={'l'+i} className="ln" style={{left:((i*13+7)%92)+'%',animationDuration:(16+i%4*4)+'s',animationDelay:-(i*3)+'s'}}/>)}</div>
<div style={{position:'fixed',width:2,height:2,opacity:.01,pointerEvents:'none',left:0,top:0}}><div id="bgp"/></div>
<AnimatePresence>{!lit&&<motion.div className="gate" exit={{opacity:0}} transition={{duration:1.6,delay:1}}><div style={{transform:'scale(1.9)',margin:'1rem 0 2.2rem'}}><Diya on={false} onClick={open} aria-label="Diya jalao"/></div><p style={{opacity:.85,fontSize:'1.15rem'}}>Ek diya sirf tumhare liye jalaya hai…</p><p><b>Isse jalao 🪔</b><br/><small style={{opacity:.5}}>(sound on rakhna, surprise hai)</small></p></motion.div>}</AnimatePresence>
{lit&&<button className="mini" style={{display:'block',opacity:mute?.5:1}} aria-label="Music" onClick={()=>{bg.current?.[mute?'playVideo':'pauseVideo']?.();setMute(!mute)}}>♪</button>}
<section id="hero" ref={hero} style={{minHeight:'100vh',display:'grid',placeItems:'center',textAlign:'center',gap:'1rem',paddingTop:'3rem'}}>
<motion.div className="arch" onClick={()=>{const n=egg+1;setEgg(n);hearts();if(n==5)send({event:'🥚 Secret photo wala egg mil gaya'})}} style={{y:py,cursor:'pointer'}} initial={{scale:.85,opacity:0}} animate={lit?{scale:1,opacity:1}:{}} transition={{duration:1.4,delay:.8}}><img src={PR.img} alt="Photo" style={{objectPosition:PR.pos}}/></motion.div>
<h1 style={{fontSize:'clamp(1.5rem,5.5vw,2.2rem)',lineHeight:1.2}}>{T('Shubh Deepawali,')}<b style={{display:'block',fontWeight:400,fontSize:'clamp(3rem,15vw,6rem)',color:'var(--gold)',textShadow:'0 0 40px #ff8a00aa'}}>{T(NAME+' ❤',.9)}</b></h1>
{egg>=5&&<motion.p initial={{opacity:0,scale:.8}} animate={{opacity:1,scale:1}} className="ltr" style={{margin:0}}>Tumne chhupa secret dhoondh liya 🙈<br/>Tum meri favourite ho.</motion.p>}
<p className="hint">neeche scroll karo ↓ aur kahin bhi tap karke aatishbaazi dekho</p></section>

<section><H s="Ek-ek karke saare diye jalao.">Paanch diye, paanch baatein</H>
<div className="row">{WISH.map((w,k)=><Diya key={k} id={'d'+k} on={on.includes(k)} onClick={()=>light(k)} aria-label={'Diya '+(k+1)} style={{transform:'scale(.62)',margin:'-10px -14px'}}/>)}</div>
<AnimatePresence mode="wait"><motion.p key={on.length} className="wish" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0}}>{on.length?WISH[on[on.length-1]]:'Pehla diya jalao… 🪔'}</motion.p></AnimatePresence>
<p className="cnt">{on.length} / 5{on.length==5&&' ✨ ab neeche chalo'}</p></section>

<section><H s="4 chhote sawaal. Koi sahi galat nahi.">Thoda tumhare baare mein 🎯</H>
<div className="bar"><i style={{width:Math.min(qz.i/QZ.length,1)*100+'%'}}/></div>
<AnimatePresence mode="wait">{q?<motion.div key={qz.i} initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}}><p className="big" style={{fontSize:'1.5rem'}}>{q.q}</p><div className="chips">{q.o.map(o=><button key={o} className="chip" onClick={()=>pick(o)}>{o}</button>)}</div></motion.div>:<motion.p key="r" className="big" initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}}>Result: tum 100% meri <em>favourite insaan</em> ho 😌</motion.p>}</AnimatePresence></section>

<section><H s="Card pe tap karo, palat ke dekho.">Tumhare baare mein 6 sach</H>
<div className="grid">{CARDS.map((c,k)=><motion.button key={k} className={'card'+(fl[k]?' fl2':'')} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:k*.08}} onClick={()=>setFl({...fl,[k]:!fl[k]})}><i className="f">{c[0]}</i><i className="b">{c[1]}</i></motion.button>)}</div>
{PR.snap&&<motion.div className="polaroid" initial={{rotate:-12,opacity:0}} whileInView={{rotate:-4,opacity:1}} viewport={{once:true}} transition={{duration:1}}><img src={PR.snap} alt="Yaadgaar pal"/><span>ye pal mera favourite hai ✨</span></motion.div>}</section>

<section><H s="Saari pankhudiyan bhar do.">Rangoli banao 🎨</H><Rangoli/></section>

<section><H s="Jodiyan milao, ek-ek karke.">Diwali memory game 🧩</H><Match/></section>

<section><H s="Chhote chhote notes, bas tumhare liye.">Mere dil ke notes 💌</H><div className="notes">{NOTES.map((n,k)=><motion.div key={k} className="note" style={{rotate:(k%2?2.5:-2.5)}} initial={{opacity:0,y:40,scale:.9}} whileInView={{opacity:1,y:0,scale:1}} viewport={{once:true,margin:'-40px'}} transition={{delay:(k%2)*.1,duration:.7}} whileHover={{rotate:0,scale:1.04}}>{n.replace('{N}',NAME)}</motion.div>)}</div></section>

<section><div className="song"><H s="Kabhi kehna mushkil ho, to gaane kaam aa jaate hain. Headphones laga lo.">Ye gaana sirf tumhare liye 🎧</H>
<div className="box">{sp?<iframe allow="autoplay;encrypted-media" allowFullScreen src={`https://www.youtube.com/embed/${SPECIAL}?autoplay=1&rel=0&playsinline=1`}/>:<button className="btn" onClick={()=>{bg.current?.pauseVideo?.();setMute(true);setSp(true)}}>▶ Play karo</button>}</div>
<a className="lnk" target="_blank" rel="noopener noreferrer" href="https://youtu.be/--nWMSumSIc">YouTube pe kholo ↗</a></div></section>

<section><H s="Bas 20 second. Sound on karke dekhna.">Ek chhoti si jhalak 🎬</H><video src="/clip.mp4" controls playsInline preload="metadata" onPlay={()=>{bg.current?.pauseVideo?.();setMute(true)}}/></section>

<section><H s="Ungli se ghisko, kuch chhupa hai.">Ek chhota sa scratch card 🪙</H><Scratch/></section>

<section><H s="Ek gift, tumhare liye.">Ek chhota sa tohfa 🎁</H><Gift/></section>

<section><H>Dil ki kuch baatein</H>{LTR.map((l,k)=><motion.p key={k} className="ltr" initial={{opacity:0,y:24,filter:'blur(6px)'}} whileInView={{opacity:1,y:0,filter:'blur(0px)'}} viewport={{once:true,margin:'-80px'}} transition={{duration:.9}}>{l}</motion.p>)}</section>

<section id="ask"><H>Ab ek sawaal…</H><p className="big">Is Diwali pe tum meri <em>roshni</em> banogi?<br/>Poori zindagi ke liye? 🪔❤️</p>
{!done&&<form onSubmit={e=>e.preventDefault()}><div className="bar" style={{margin:0,maxWidth:'none'}}><i style={{width:(st+1)*25+'%'}}/></div>
<AnimatePresence mode="wait"><motion.div key={st} initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}} style={{display:'grid',gap:'1rem'}}>
{st==0&&<><div><label>Diwali ki ek wish likho (sach hogi 😉)</label><textarea value={f.wish} onChange={e=>setF({...f,wish:e.target.value})}/></div><div><label>Is Diwali ka sabse pyara pal?</label><textarea value={f.memory} onChange={e=>setF({...f,memory:e.target.value})}/></div></>}
{st==1&&<div><span className="q">Meri taraf se ek treat, tumhari choice:</span><div className="chips">{DATES.map(d=><button type="button" key={d} className={'chip'+(f.date==d?' s':'')} onClick={()=>setF({...f,date:d})}>{d}</button>)}</div></div>}
{st==2&&<div><span className="q" style={{textAlign:'center'}}>Kya tum meri life ka diya banogi?</span><div className="ans">{['HAAN ❤️ (Yes!)','Mujhe thoda time chahiye 🥹'].map((a,k)=><button type="button" key={a} className={'chip'+(f.answer==a?' s':'')} onClick={()=>{setF({...f,answer:a});boom(innerWidth/2,innerHeight/2)}}>{k?'Thoda time 🥹':'Haan ❤️'}</button>)}<motion.button type="button" className="btn ghost" animate={pos} onPointerEnter={dodge} onClick={dodge}>{NOS[Math.min(nt,5)]}</motion.button></div></div>}
{st==3&&<div><label>Dil ki baat, jo bhi kehni ho:</label><textarea value={f.msg} onChange={e=>setF({...f,msg:e.target.value})} placeholder="Yahan likho…"/>{err&&<p role="alert" style={{color:'var(--rose)',marginTop:'.6rem'}}>{err}</p>}</div>}
</motion.div></AnimatePresence>
<div style={{display:'flex',gap:'.7rem',justifyContent:'center'}}>{st>0&&<button type="button" className="btn ghost" onClick={()=>setSt(st-1)}>Peeche</button>}
{st<3?<button type="button" className="btn" disabled={st==2&&!f.answer} style={{opacity:st==2&&!f.answer?.5:1}} onClick={()=>setSt(st+1)}>Aage</button>:<button type="button" className="btn" disabled={sending} onClick={submit}>{sending?'Bhej raha hoon…':'Mera jawab bhejo 💌'}</button>}</div></form>}
{done&&<motion.div id="fin" initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} style={{textAlign:'center'}}><p className="big">{f.answer.startsWith('HAAN')?<>Tumne meri Diwali<br/>sabse roshan kar di ❤️</>:<>Koi baat nahi,<br/>main intezaar karunga 🥹</>}</p><p className="sub">Tumhara jawab mujhe mil gaya. Shubh Deepawali, meri roshni!</p>
{!vc?<button className="btn" onClick={()=>{setVc(true);boom(innerWidth/2,innerHeight/2)}}>Ek aakhri surprise 🎁</button>:<motion.div className="vc" initial={{rotate:-6,scale:.7,opacity:0}} animate={{rotate:-2,scale:1,opacity:1}}>🎟️ 1 treat + 1 lambi walk<br/><small>sirf tumhare liye, valid forever</small></motion.div>}</motion.div>}
</section>
<footer>{PR.full} ke liye, bahut saare pyaar se 🪔<br/>Shubh Deepawali!<br/><button className="btn ghost" style={{marginTop:'1.4rem'}} onClick={()=>scrollTo({top:0,behavior:'smooth'})}>Phir se shuru ↑</button></footer></>)}
