(function(){
'use strict';
const $=id=>document.getElementById(id);
let correct=false,index=0,timer=null;
function trace(){
 const lines=correct?['a = 1','b = 2','c = a','a = b','b = c']:['a = 1','b = 2','a = b','b = a'];
 const values={a:null,b:null};if(correct)values.c=null;
 const frames=[{values:{...values},text:'Beginnen Sie mit der ersten Zuweisung.'}];
 lines.forEach(line=>{const [destination,source]=line.split(' = ');const variable=Object.hasOwn(values,source);values[destination]=variable?values[source]:Number(source);let text=variable?'Der Wert '+values[destination]+' aus '+source+' wird nach '+destination+' kopiert. '+source+' behält seinen Wert.':destination+' erhält den Wert '+values[destination]+'.';if(line==='a = b')text+=' Der bisherige Wert von a wird überschrieben.';frames.push({values:{...values},destination,source:variable?source:null,text});});
 frames.at(-1).text+=correct?' Getauscht: a ist 2 und b ist 1. c hat den ursprünglichen Wert von a aufbewahrt.':' Kein Tausch: a und b sind beide 2. Der ursprüngliche Wert 1 ist verloren.';
 return {lines,frames};
}
function stop(){if(timer!==null)clearInterval(timer);timer=null;$('swap-play').textContent='Abspielen';}
function render(animate=false){
 const {lines,frames}=trace(),frame=frames[index];
 $('swap-code').replaceChildren();lines.forEach((line,i)=>{const span=document.createElement('span');span.textContent=line;span.className=i===index-1?'swap-code-active':'';$('swap-code').append(span,document.createTextNode('\n'));});
 const stage=$('swap-stage');stage.replaceChildren();const cells={};
 Object.entries(frame.values).forEach(([name,value])=>{const cell=document.createElement('div');cell.className='swap-variable'+(name===frame.destination?' destination':'')+(name===frame.source?' source':'');const label=document.createElement('strong');label.textContent=name;const box=document.createElement('div');box.className='swap-value'+(value===null?' unset':'');box.textContent=value===null?'–':String(value);cell.append(label,box);stage.append(cell);cells[name]=box;});
 if(animate&&frame.source&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){const source=cells[frame.source],target=cells[frame.destination],bounds=stage.getBoundingClientRect(),from=source.getBoundingClientRect(),to=target.getBoundingClientRect();const copy=document.createElement('div');copy.className='swap-value swap-copy';copy.textContent=String(frame.values[frame.source]);copy.style.left=(from.left-bounds.left)+'px';copy.style.top=(from.top-bounds.top)+'px';stage.append(copy);copy.animate([{transform:'translateX(0)'},{transform:'translateX('+(to.left-from.left)+'px)'}],{duration:550,easing:'ease-in-out'}).finished.then(()=>copy.remove(),()=>copy.remove());}
 $('swap-status').textContent=frame.text;$('swap-step').textContent=index+' / '+lines.length;$('swap-prev').disabled=index===0;$('swap-next').disabled=index===frames.length-1;
 $('swap-wrong').setAttribute('aria-pressed',String(!correct));$('swap-correct').setAttribute('aria-pressed',String(correct));if(index===frames.length-1)stop();
}
function select(value){stop();correct=value;index=0;render();}
$('swap-wrong').onclick=()=>select(false);$('swap-correct').onclick=()=>select(true);$('swap-reset').onclick=()=>select(correct);
$('swap-prev').onclick=()=>{stop();if(index>0)index--;render();};$('swap-next').onclick=()=>{stop();if(index<trace().frames.length-1){index++;render(true);}};
$('swap-play').onclick=()=>{if(timer!==null){stop();return;}if(index===trace().frames.length-1)index=0;render();$('swap-play').textContent='Pause';timer=setInterval(()=>{if(index<trace().frames.length-1){index++;render(true);}else stop();},1100);};
render();
})();
