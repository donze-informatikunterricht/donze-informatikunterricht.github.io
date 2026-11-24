(function(root){
'use strict';
function operationTrace(input,kind,position=0,value=0){
 if(!['append','pop-end','insert','pop-position'].includes(kind))throw Error('Unbekannte Operation.');
 const values=input.slice(),frames=[];let shifts=0;
 if((kind==='pop-end'||kind==='pop-position')&&!values.length)throw Error('Aus einer leeren Liste kann kein Element entfernt werden.');
 if(kind==='insert'&&(!Number.isInteger(position)||position<0||position>values.length))throw Error('Einfügeposition: 0 bis Listenlänge.');
 if(kind==='pop-position'&&(!Number.isInteger(position)||position<0||position>=values.length))throw Error('Entferneposition: 0 bis Listenlänge minus 1.');
 const push=(text,extra={})=>frames.push({values:values.slice(),text,shifts,...extra});
 push('Ausgangsliste.');
 if(kind==='append'){
  values.push(null);push('Hinten wird Platz für den neuen Wert bereitgestellt.',{selected:values.length-1});
  values[values.length-1]=value;push('Der neue Wert wird hinten angehängt. Kein bestehendes Element muss nachrücken.',{selected:values.length-1});
 }else if(kind==='pop-end'){
  const removed=values[values.length-1];push('Das letzte Element wird ausgewählt.',{selected:values.length-1});
  values.pop();push('Das letzte Element ist entfernt und wird zurückgegeben. Die übrigen Positionen bleiben gleich.',{removed});
 }else if(kind==='insert'){
  values.push(null);push('Es entsteht ein freier Platz am Ende.',{selected:position});
  for(let from=input.length-1;from>=position;from--){const moved=values[from];values[from+1]=moved;values[from]=null;shifts++;push('Ein vorhandenes Element rückt eine Position nach rechts.',{move:{from,to:from+1,value:moved},selected:position});}
  values[position]=value;push('Der neue Wert wird am Einfügeplatz eingesetzt.',{selected:position});
 }else{
  const removed=values[position];values[position]=null;push('Das Element wird entfernt und sein Wert wird aufbewahrt.',{removed,selected:position});
  for(let from=position+1;from<values.length;from++){const moved=values[from];values[from-1]=moved;values[from]=null;shifts++;push('Ein nachfolgendes Element rückt eine Position nach links.',{removed,move:{from,to:from-1,value:moved}});}
  values.pop();push('Die Lücke ist geschlossen. Der entfernte Wert wird zurückgegeben.',{removed});
 }
 return frames;
}
root.ListOperations={operationTrace};if(typeof module!=='undefined')module.exports={operationTrace};
if(typeof document==='undefined')return;
const $=id=>document.getElementById(id);let frames=[],index=0,timer=null;
function stop(){if(timer)clearInterval(timer);timer=null;$('operation-play').textContent='Abspielen';}
function render(animate=false){
 const f=frames[index];if(!f)return;const showLabels=$('operation-labels').checked;
 $('operation-stage').replaceChildren();const board=document.createElement('div');board.className='operation-board';const cells=[];
 f.values.forEach((value,i)=>{
  const cell=document.createElement('div');cell.className='operation-cell';
  if(f.selected===i)cell.classList.add('selected');if(f.move?.from===i)cell.classList.add('source');if(f.move?.to===i)cell.classList.add('destination');
  const tile=document.createElement('div');tile.className='operation-tile'+(value===null?' vacancy':'');tile.textContent=value===null?'':String(value);
  const idx=document.createElement('div');idx.className='operation-index';idx.textContent=String(i);idx.hidden=!$('operation-positions').checked;
  const label=document.createElement('div');label.className='operation-marker';label.hidden=!showLabels;label.textContent=f.move?.to===i?'Nachgerückt':value===null?'Freier Platz':f.selected===i?'Aktuelle Stelle':'';
  cell.append(tile,idx,label);board.append(cell);cells.push(cell);
 });
 if(!f.values.length){const empty=document.createElement('p');empty.textContent='[]';board.append(empty);}
 $('operation-stage').append(board);
 if(animate&&f.move&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const source=cells[f.move.from],destination=cells[f.move.to];
  const ghost=document.createElement('div');ghost.className='operation-tile operation-ghost';ghost.textContent=String(f.move.value);ghost.style.left=source.offsetLeft+'px';board.append(ghost);
  const animation=ghost.animate([{transform:'translateX(0)'},{transform:'translateX('+(destination.offsetLeft-source.offsetLeft)+'px)'}],{duration:450,easing:'ease-in-out'});
  animation.finished.then(()=>ghost.remove(),()=>ghost.remove());
 }
 $('operation-count').textContent='Verschobene bestehende Elemente: '+f.shifts;
 $('operation-return').textContent=f.removed===undefined?'':'Rückgabe von pop: '+f.removed;
 $('operation-status').textContent=f.text;$('operation-status').hidden=!($('operation-explanations')?.checked??false);
 $('operation-step').textContent=(index+1)+' / '+frames.length;$('operation-prev').disabled=index===0;$('operation-next').disabled=index===frames.length-1;
 if(index===frames.length-1)stop();
}
function build(){
 stop();const kind=$('operation').value;const needsPosition=kind==='insert'||kind==='pop-position',needsValue=kind==='append'||kind==='insert';
 $('operation-position-label').hidden=!needsPosition;$('operation-value-label').hidden=!needsValue;
 try{
  const raw=$('operation-list').value.trim();const values=raw===''?[]:raw.split(',').map(s=>{if(!s.trim())throw Error('Trennen Sie ganze Zahlen durch Kommas.');return Number(s);});
  if(values.length>8||values.some(v=>!Number.isInteger(v)||v< -99||v>99))throw Error('Bis zu 8 ganze Zahlen von -99 bis 99 eingeben.');
  const position=Number($('operation-position').value),value=Number($('operation-value').value);
  if(needsPosition&&$('operation-position').value.trim()==='')throw Error('Geben Sie eine Position ein.');
  if(needsValue&&($('operation-value').value.trim()===''||!Number.isInteger(value)||value< -99||value>99))throw Error('Neuer Wert: eine ganze Zahl von -99 bis 99.');
  frames=operationTrace(values,kind,position,value);index=0;
  $('operation-position').max=kind==='insert'?values.length:Math.max(0,values.length-1);
  $('operation-code').textContent=kind==='append'?'liste.append('+value+')':kind==='pop-end'?'entferntes_element = liste.pop()':kind==='insert'?'liste.insert('+position+', '+value+')':'entferntes_element = liste.pop('+position+')';
  $('operation-error').textContent='';render();
 }catch(error){frames=[];index=0;$('operation-error').textContent=error.message;$('operation-stage').replaceChildren();$('operation-code').textContent='';$('operation-count').textContent='';$('operation-return').textContent='';$('operation-status').textContent='';$('operation-step').textContent='';$('operation-play').disabled=true;$('operation-next').disabled=true;$('operation-prev').disabled=true;return;}
 $('operation-play').disabled=false;
}
$('operation-apply').onclick=build;$('operation').onchange=build;
$('operation-reset').onclick=()=>{stop();index=0;render();};$('operation-prev').onclick=()=>{stop();if(index>0)index--;render();};$('operation-next').onclick=()=>{stop();if(index<frames.length-1){index++;render(true);}};
$('operation-play').onclick=()=>{if(timer){stop();return;}if(!frames.length)return;if(index===frames.length-1)index=0;render();$('operation-play').textContent='Pause';timer=setInterval(()=>{if(index<frames.length-1){index++;render(true);}else stop();},950);};
for(const id of ['operation-positions','operation-labels','operation-explanations'])if($(id))$(id).onchange=()=>render();
build();
})(typeof globalThis!=='undefined'?globalThis:this);
