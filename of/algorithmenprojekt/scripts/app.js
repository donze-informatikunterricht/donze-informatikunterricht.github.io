'use strict';
const $=id=>document.getElementById(id);
const project=Number(document.body.dataset.project),direction=document.body.dataset.direction||'hin';
const configs={5:['Vorwärts und rückwärts ordnen','gnome_sort(liste)','Gnome Sort'],7:['Zerlegen und ordnen','quicksort(liste)','Quicksort'],1:['Suchen mit System','binaere_suche(liste, gesuchter_wert)','Binäre Suche'],2:['Werte in Bewegung','bubble_sort(liste)','Bubble Sort'],3:['Schritt für Schritt ordnen','selection_sort(liste)','Selection Sort'],4:['Eine Ordnung wächst','insertion_sort(liste)','Insertion Sort'],6:['Teilen und zusammenführen','merge_sort(liste)','Merge Sort'],8:[direction==='hin'?'Von einer Zahl zu Ziffern':'Von Ziffern zu einer Zahl',direction==='hin'?'dezimal_zu_basis(zahl, basis)':'basis_zu_dezimal(ziffern, basis)',direction==='hin'?'Dezimal → andere Basis':'Andere Basis → Dezimal']};
let frames=[],index=0;
$('number').textContent='Projekt '+project;
$('title').textContent=configs[project][0];document.title='Projekt '+project+' · Algorithmen';

$('list-inputs').hidden=project===8;$('conversion-inputs').hidden=project!==8;$('target-label').hidden=project!==1;
$('list').value=project===1?'2, 4, 6, 8, 10, 12, 14':project===6?'4, 2, 1, 7, 6, 3, 5, 8':'7, 3, 9, 2, 5';
$('target').value='10';
if(project===1)$('task').textContent='Finden Sie in der aufsteigend geordneten Liste die erste Fundposition des gesuchten Werts oder stellen Sie fest, dass er fehlt. Entdecken Sie, wie sich der Suchbereich verändert.';
else if(project===8)$('task').textContent='Finden Sie heraus, wie sich die Zahl und die Ziffernfolge entsprechen. Die Schreibweise und die Reihenfolge der Ziffern sind wichtig.';
else $('task').textContent='Eine Liste soll aufsteigend geordnet werden; alle Werte müssen erhalten bleiben. Entdecken Sie die Regeln der gezeigten Schritte und sagen Sie den nächsten Schritt voraus.';
$('direction-hint').textContent=direction==='hin'?'Die Eingabe ist eine Dezimalzahl. Die entstehende Ziffernfolge gehört zur gewählten Basis.':'Die Eingabe ist eine Dezimalzahl, aus der wir eine Ziffernfolge für die gewählte Basis vorbereiten. Die Animation beginnt mit dieser Ziffernfolge und wandelt sie zurück ins Dezimalsystem.';
let mergeLayout=new Map();
function renderGroupedFrame(f,showLabels){
 const groups=f.groups??(f.values.length?[f.values]:[]);
 if(showLabels&&(f.mergePhase||f.quickPhase)){const phase=document.createElement('p');phase.className='merge-phase';phase.textContent=((f.mergePhase||f.quickPhase)==='divide'?'Aufteilen':'Zusammenführen')+' · '+groups.length+(groups.length===1?' Teilliste':' Teillisten');$('stage').append(phase);}const diagram=document.createElement('div');diagram.className='merge-diagram';
 const gap=f.values.length>1?8+28*(groups.length-1)/(f.values.length-1):8;
 diagram.style.gap=gap+'px';
 const barsToAnimate=[],occurrences=new Map();let position=0;
 groups.forEach((group,groupIndex)=>{
  const container=document.createElement('div');container.className='merge-group';
  if(f.quickRoles?.[groupIndex]==='Pivot')container.classList.add('quick-pivot-group');const cells=document.createElement('div');cells.className='merge-group-bars';
  group.forEach((value,localIndex)=>{
   const wrap=document.createElement('div');wrap.className='bar-wrap';
   const bar=document.createElement('div');bar.className='bar';bar.style.height=(45+value*9)+'px';bar.textContent=value;
   if((f.active||[]).includes(position))bar.classList.add('active');
   if((f.done||[]).includes(position))bar.classList.add('done');
   if(f.merge&&((groupIndex===f.merge.leftGroup&&localIndex<f.merge.leftUsed)||(groupIndex===f.merge.rightGroup&&localIndex<f.merge.rightUsed)))bar.classList.add('merge-consumed');
   const idx=document.createElement('div');idx.className='idx';idx.textContent=String(position);idx.hidden=!$('show-positions')?.checked;
   wrap.append(bar,idx);cells.append(wrap);
   const occurrence=occurrences.get(value)||0;occurrences.set(value,occurrence+1);
   barsToAnimate.push({node:wrap,key:value+':'+occurrence});position++;
  });
  container.append(cells);
  if(showLabels){const label=document.createElement('div');label.className='merge-group-label';label.textContent=f.quickRoles?.[groupIndex]??(f.merge&&groupIndex===f.merge.leftGroup?'Linke Teilliste':f.merge&&groupIndex===f.merge.rightGroup?'Rechte Teilliste':'Teilliste');container.append(label);}
  diagram.append(container);
 });
 if(!groups.length){const empty=document.createElement('p');empty.textContent='Die Liste ist leer.';diagram.append(empty);}
 $('stage').append(diagram);
 if(f.merge){
  const result=document.createElement('div');result.className='merge-output';
  const label=document.createElement('strong');label.textContent='Zusammengeführte Werte';label.hidden=!showLabels;result.append(label);
  const chips=document.createElement('div');chips.className='merge-output-values';
  f.merge.result.forEach(value=>{const chip=document.createElement('span');chip.textContent=value;chips.append(chip);});result.append(chips);$('stage').append(result);
 }
 if(showLabels){const notation=document.createElement('p');notation.className='fine';notation.textContent='['+groups.map(group=>'['+group.join(', ')+']').join(', ')+']';$('stage').append(notation);}
 const nextLayout=new Map();
 for(const {node,key} of barsToAnimate){
  const rect=node.getBoundingClientRect();const old=mergeLayout.get(key);
  if(old&&typeof node.animate==='function'&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
   node.animate([{transform:'translate('+(old.left-rect.left)+'px, '+(old.top-rect.top)+'px)'},{transform:'translate(0, 0)'}],{duration:350,easing:'ease-out'});
  }
  nextLayout.set(key,{left:rect.left,top:rect.top});
 }
 mergeLayout=nextLayout;
}
// Only a manual forward step starts a value transfer; no next step is automatic.
let transferNodes=new Map(),valueMotion=null;
const transferKey=endpoint=>endpoint.kind+':'+endpoint.position;
function cancelValueMotion(){
 if(!valueMotion)return;
 const running=valueMotion;
 running.animation.cancel();running.finish();
}
function animateValueTransfer(transfer,sourceRect){
 if(!transfer||!sourceRect||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const destination=transferNodes.get(transferKey(transfer.to));
 if(!destination||typeof destination.animate!=='function')return;
 const targetRect=destination.getBoundingClientRect();
 const source=transferNodes.get(transferKey(transfer.from));
 const ghost=document.createElement('div');ghost.className='value-transfer';ghost.textContent=String(transfer.value);ghost.setAttribute('aria-hidden','true');
 ghost.style.left=(sourceRect.left+sourceRect.width/2-20)+'px';ghost.style.top=(sourceRect.top+sourceRect.height/2-17)+'px';
 const dx=targetRect.left+targetRect.width/2-sourceRect.left-sourceRect.width/2;
 const dy=targetRect.top+targetRect.height/2-sourceRect.top-sourceRect.height/2;
 const hidden=[...new Set([source,destination].filter(Boolean))];
 const previousVisibility=hidden.map(node=>node.style.visibility);
 hidden.forEach(node=>{node.style.visibility='hidden';});document.body.append(ghost);
 const animation=ghost.animate([
  {transform:'translate(0, 0)'},
  {transform:'translate('+(dx/2)+'px, '+(dy/2-22)+'px)',offset:0.5},
  {transform:'translate('+dx+'px, '+dy+'px)'}
 ],{duration:950,easing:'ease-in-out',fill:'forwards'});
 const running={animation,finish:null};let finished=false;
 running.finish=()=>{
  if(finished)return;finished=true;
  hidden.forEach((node,i)=>{node.style.visibility=previousVisibility[i];});ghost.remove();
  if(valueMotion===running){valueMotion=null;$('prev').disabled=index===0;$('next').disabled=index===frames.length-1;}
 };
 valueMotion=running;$('prev').disabled=true;$('next').disabled=true;
 animation.finished.then(running.finish,running.finish);
}
function render(animateTransfer=false){const f=frames[index];if(!f)return;cancelValueMotion();const source=animateTransfer&&f.transfer?transferNodes.get(transferKey(f.transfer.from)):null;const sourceRect=source?.getBoundingClientRect();transferNodes=new Map();const showLabels=$('show-labels')?.checked??true;$('stage').dataset.labels=String(showLabels);if($('animation-legend'))$('animation-legend').hidden=!showLabels;$('stage').replaceChildren();if(project===1){$('stage').classList.add('search-stage');const sought=document.createElement('p');sought.className='search-value';sought.textContent='Gesucht: '+f.searchValue;$('stage').append(sought);}if(project===6||project===7){renderGroupedFrame(f,showLabels);}else if(f.values){if(project===7&&f.partition){const box=document.createElement('div');box.className='partition-lists';for(const [label,values] of [['Kleiner als Pivot',f.partition.smaller],['Pivot',[f.partition.pivot]],['Grösser oder gleich',f.partition.greater],['Noch zu prüfen',f.partition.remaining]]){const block=document.createElement('div');const heading=document.createElement('strong');heading.textContent=label;heading.hidden=!showLabels;const contents=document.createElement('p');contents.textContent='['+values.join(', ')+']';block.append(heading,contents);box.append(block);}$('stage').append(box);}const bars=document.createElement('div');bars.className='bars';f.values.forEach((v,i)=>{const wrap=document.createElement('div');wrap.className='bar-wrap';const b=document.createElement('div');b.className='bar'+((f.active||[]).includes(i)?' active':'')+((f.done||[]).includes(i)?' done':'')+((f.muted||[]).includes(i)?' muted':'')+(f.target===i?' swap-target':'');if(project===5&&i===f.cursor)b.classList.add('gnome-current');if(project===3&&i===f.minimum)b.classList.add('selection-minimum');if(project===1&&i===f.previousMiddle)b.classList.add('previous-middle');if(project===1&&i===f.newBoundary)b.classList.add('new-boundary');if(project===7&&i===f.pivot)b.classList.add('pivot-value');if(project===7&&f.range&&(i<f.range[0]||i>=f.range[1]))b.classList.add('outside-range');if(project===4&&i===f.hole)b.classList.add('insertion-hole');b.style.height=(45+v*9)+'px';const valueLabel=document.createElement('span');valueLabel.className='bar-value';valueLabel.textContent=String(v);b.append(valueLabel);transferNodes.set('list:'+i,valueLabel);const idx=document.createElement('div');idx.className='idx';idx.textContent=String(i);idx.hidden=!$('show-positions')?.checked;wrap.append(b,idx);if(project===5){const marker=document.createElement('div');marker.className='target-marker';if(i===f.cursor)marker.textContent='Aktuelle Position';wrap.append(marker);}if(project===4){const marker=document.createElement('div');marker.className='target-marker';if(i===f.hole)marker.textContent='Einfügeplatz';wrap.append(marker);}if(project===3){const marker=document.createElement('div');marker.className='target-marker selection-markers';if(f.target===i){const label=document.createElement('span');label.textContent='Zielposition';marker.append(label);}if(f.minimum===i){const label=document.createElement('span');label.className='minimum-label';label.textContent='Bisheriges Minimum';marker.append(label);}wrap.append(marker);}if(project===1){const markers=document.createElement('div');markers.className='bound-markers';if(i===f.lower){const label=document.createElement('span');label.className='bound-label';label.textContent=f.boundarySide==='lower'?'Neue untere Grenze':'Untere Grenze';markers.append(label);}if(i===f.upper){const label=document.createElement('span');label.className='bound-label';label.textContent=f.boundarySide==='upper'?'Neue obere Grenze':'Obere Grenze';markers.append(label);}if(i===f.previousMiddle){const label=document.createElement('span');label.className='previous-middle-label';label.textContent=f.boundarySide==='lower'?'Geprüfte Mitte →':'← Geprüfte Mitte';markers.append(label);}if(i===f.middle){const label=document.createElement('span');label.className='middle-label';label.textContent='Mitte';markers.append(label);}wrap.append(markers);}bars.append(wrap);});if(!f.values.length){bars.className='empty';bars.textContent='Die Liste ist leer.';}$('stage').append(bars);if(project===4||$('show-swap-steps')?.checked){const row=document.createElement('div');row.className='insertion-held-row';for(let i=0;i<f.values.length;i++){const slot=document.createElement('div');slot.className='insertion-held-slot';if(f.held!==undefined&&f.held!==null&&i===f.heldPosition){const held=document.createElement('div');held.className='held-value insertion-held-value';held.textContent=String(f.held);slot.append(held);transferNodes.set('held:'+i,held);if(showLabels){const label=document.createElement('div');label.className='insertion-held-label';label.textContent=project===4?'Zwischengespeichert':'Hilfsvariable';slot.append(label);}}row.append(slot);}$('stage').append(row);}}else{
 const lists=document.createElement('table');lists.className='calc place-lists';
 const caption=document.createElement('caption');caption.textContent='Zwei Listen – dieselbe Position gehört zusammen';lists.append(caption);
 const body=document.createElement('tbody');
 const addList=(name,values,kind)=>{const row=document.createElement('tr');const label=document.createElement('th');label.scope='row';label.textContent=name;row.append(label);values.forEach((value,i)=>{const cell=document.createElement('td');cell.textContent=value;if(i===f.active)cell.className='list-current';else if(kind==='digits'&&direction==='hin'&&i>=f.processed)cell.className='list-pending';row.append(cell);});body.append(row);};
 if($('show-positions')?.checked)addList('Position',f.weights.map((_,i)=>i));
 addList('Stellenwerte',f.weights);addList('Ziffern',f.digits,'digits');addList('Erlaubte Werte',f.weights.map(()=> '0–'+(f.base-1)));lists.append(body);$('stage').append(lists);
 const summary=document.createElement('p');summary.className='trace-summary';summary.textContent=direction==='hin'?'Noch umzuwandeln: '+f.remaining+' · Blasse Nullen sind noch nicht bearbeitet.':'Bisherige Summe: '+f.total;$('stage').append(summary);
 const table=document.createElement('table');table.className='calc';const headings=direction==='hin'?['Stellenwert','Ziffer','Restzahl']:['Stellenwert','Ziffer','Beitrag','Summe'];const head=document.createElement('tr');headings.forEach(h=>{const th=document.createElement('th');th.scope='col';th.textContent=h;head.append(th);});const thead=document.createElement('thead');thead.append(head);table.append(thead);const tbody=document.createElement('tbody');f.rows.forEach(row=>{const tr=document.createElement('tr');row.forEach(v=>{const td=document.createElement('td');td.textContent=v;tr.append(td);});tbody.append(tr);});table.append(tbody);$('stage').append(table);}

$('status').hidden=!($('show-explanations')?.checked??false);$('status').textContent=f.text;$('step').textContent=(index+1)+' / '+frames.length;$('prev').disabled=index===0;$('next').disabled=index===frames.length-1;if(animateTransfer)animateValueTransfer(f.transfer,sourceRect);}
function build(){cancelValueMotion();mergeLayout=new Map();try{if(project===8){const number=Number($('decimal').value),base=Number($('base').value);if(!Number.isInteger(number)||number<0||number>999999)throw Error('Bitte eine ganze Zahl von 0 bis 999999 eingeben.');frames=AlgoTraces.conversionTrace(number,base,direction);}else{const raw=$('list').value.trim();let a=raw===''?[]:raw.split(',').map(x=>{if(!x.trim())throw Error('Bitte Werte durch Kommas trennen.');return Number(x);});if(a.length>10||a.some(v=>!Number.isInteger(v)||v<0||v>20))throw Error('Bis zu 10 ganze Zahlen von 0 bis 20 eingeben.');if(project===1){if(a.some((v,i)=>i&&a[i-1]>v))throw Error('Für dieses Projekt muss die Liste aufsteigend geordnet sein.');const target=Number($('target').value);if(!Number.isInteger(target)||target<0||target>20)throw Error('Gesuchten Wert von 0 bis 20 eingeben.');frames=AlgoTraces.searchTrace(a,target);}else frames=AlgoTraces.sortTrace(a,project,$('show-swap-steps')?.checked??false);}$('error').textContent='';index=0;render();}catch(e){frames=[];index=0;transferNodes.clear();$('stage').replaceChildren();$('step').textContent='';$('prev').disabled=true;$('next').disabled=true;$('error').textContent=e.message;}}
$('apply').onclick=build;$('reset').onclick=()=>{index=0;render();};$('prev').onclick=()=>{if(index>0){index--;render();}};$('next').onclick=()=>{if(index<frames.length-1){index++;render(true);}};
$('new').onclick=()=>{if(project===8)$('decimal').value=String(Math.floor(Math.random()*100));else{let a=Array.from({length:5},()=>1+Math.floor(Math.random()*15));if(project===1)a.sort((a,b)=>a-b);$('list').value=a.join(', ');if(project===1)$('target').value=String(a[2]);}build();};
if($('notes') && $('download') && $('saved')){
const key='algorithmus-notizen-'+project+'-'+direction;try{$('notes').value=localStorage.getItem(key)||'';}catch(e){}$('notes').oninput=()=>{try{localStorage.setItem(key,$('notes').value);$('saved').textContent='Auf diesem Gerät gespeichert.';}catch(e){$('saved').textContent='Speichern ist hier nicht verfügbar. Bitte ins Dossier übertragen.';}};
$('download').onclick=()=>{const blob=new Blob(['Projekt '+project+'\n\n'+$('notes').value],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='projekt-'+project+'-notizen.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
}
for(const id of ['show-positions','show-labels','show-explanations'])if($(id))$(id).onchange=()=>render();
build();

if($('show-swap-steps'))$('show-swap-steps').onchange=build;
