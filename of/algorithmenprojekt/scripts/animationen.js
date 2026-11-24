/* Reine Schrittfolgen: unabhängig von Darstellung und Bedienelementen. */
(function(root){
'use strict';
function sortTrace(input,kind,showSwapSteps=false){
 // Public project numbers: 5 Gnome, 6 Merge. Keep the established traces intact.
 kind=kind===5?6:kind===6?5:kind;
 const a=input.slice(),out=[];
 const push=(text,active=[],done=[],target=null,extra={})=>out.push({values:a.slice(),active:active.slice(),done:done.slice(),target,text,...extra});
 const swap=(left,right,done=[],target=null,extra={},finishedExtra={})=>{
  const temporary=a[left];
  if(showSwapSteps)push('Der erste Wert wird in einer Hilfsvariablen zwischengespeichert.',[left],done,target,{...extra,held:temporary,heldPosition:left,swapPhase:'save',transfer:{from:{kind:'list',position:left},to:{kind:'held',position:left},value:temporary}});
  a[left]=a[right];
  if(showSwapSteps)push('Der zweite Wert wird an die erste Position kopiert. Der ursprüngliche erste Wert bleibt in der Hilfsvariablen.',[left,right],done,target,{...extra,held:temporary,heldPosition:left,swapPhase:'copy',transfer:{from:{kind:'list',position:right},to:{kind:'list',position:left},value:a[right]}});
  a[right]=temporary;
  push(showSwapSteps?'Der gespeicherte Wert wird an die zweite Position eingesetzt. Die Werte sind getauscht.':'Die beiden Werte haben ihre Position gewechselt.',[left,right],done,target,{...extra,...finishedExtra,held:null,heldPosition:left,swapPhase:'complete',transfer:showSwapSteps?{from:{kind:'held',position:left},to:{kind:'list',position:right},value:temporary}:null});
 };
 push('Ausgangslage. Beobachten Sie die Werte und ihre Positionen.');
 if(kind===2){for(let end=a.length-1;end>0;end--){for(let i=0;i<end;i++){push('Diese beiden Werte werden betrachtet.',[i,i+1]);if(a[i]>a[i+1]){swap(i,i+1);}}push('Ein Durchgang ist abgeschlossen.',[],Array.from({length:a.length-end},(_,i)=>end+i));}}
 if(kind===3){
  for(let i=0;i<a.length-1;i++){
   let m=i;const done=Array.from({length:i},(_,k)=>k);
   push('Die markierte Zielposition wird als Nächstes besetzt.',[m],done,i,{minimum:m});
   for(let j=i+1;j<a.length;j++){
    push('Diese Positionen werden betrachtet. Die Zielposition bleibt fest.',[m,j],done,i,{minimum:m});
    if(a[j]<a[m]){m=j;push('Dieser Wert ist bisher der kleinste im noch ungeordneten Bereich.',[m],done,i,{minimum:m});}
   }
   if(m!==i){
    push('Der kleinste gefundene Wert wird mit dem Wert an der Zielposition getauscht.',[i,m],done,i,{minimum:m});
    swap(i,m,done,i,{minimum:m},{minimum:i});
   }
   push('Die Zielposition ist fertig. Danach rückt sie eine Stelle weiter.',[],Array.from({length:i+1},(_,k)=>k),i,{minimum:i});
  }
 }
 if(kind===4){
  for(let i=1;i<a.length;i++){
   const held=a[i];let hole=i;
   const mark=(text,active=[],transfer=null)=>push(text,active,Array.from({length:i},(_,k)=>k),null,{held,hole,heldPosition:i,transfer});
   mark('Dieser Wert wird zwischengespeichert. Seine Position wird zum Einfügeplatz.',[i],{from:{kind:'list',position:i},to:{kind:'held',position:i},value:held});
   while(hole>0){
    mark('Der linke Nachbar wird mit dem zwischengespeicherten Wert verglichen.',[hole-1]);
    if(a[hole-1]<=held)break;
    a[hole]=a[hole-1];hole--;
    mark('Der grössere Wert wurde eine Stelle nach rechts kopiert. Der Einfügeplatz wandert nach links.',[hole+1],{from:{kind:'list',position:hole},to:{kind:'list',position:hole+1},value:a[hole]});
   }
   a[hole]=held;
   push('Der zwischengespeicherte Wert wird am Einfügeplatz eingesetzt.',[hole],Array.from({length:i+1},(_,k)=>k),null,{held:null,hole:null,heldPosition:i,transfer:{from:{kind:'held',position:i},to:{kind:'list',position:hole},value:held}});
  }
 }
 if(kind===5){
  const clone=parts=>parts.map(part=>part.slice());
  let groups=a.length?[a.slice()]:[];
  out[0].groups=clone(groups);out[0].mergePhase='divide';
  while(groups.some(group=>group.length>1)){
   const divided=[];
   for(const group of groups){
    if(group.length<=1){divided.push(group.slice());continue;}
    const middle=Math.floor(group.length/2);
    divided.push(group.slice(0,middle),group.slice(middle));
   }
   groups=divided;
   push('Jede Teilliste mit mehreren Werten wird in zwei Teile geteilt.',[],[],null,{groups:clone(groups),mergePhase:'divide'});
  }
  push('Jetzt bestehen alle Teillisten aus einem Wert. Das Zusammenführen beginnt.',[],[],null,{groups:clone(groups),mergePhase:'merge'});
  while(groups.length>1){
   const next=[];let offset=0;
   for(let k=0;k<groups.length;k+=2){
    const left=groups[k],right=groups[k+1];
    if(!right){next.push(left.slice());push('Eine Teilliste hat keinen Nachbarn. Sie wird unverändert übernommen.',[],[],null,{groups:clone(next)});continue;}
    const result=[];let i=0,j=0;
    const emit=(text,phase,active=[])=>push(text,active,[],null,{
     groups:clone([...next,...groups.slice(k)]),
     merge:{left:left.slice(i),right:right.slice(j),result:result.slice(),phase,leftGroup:next.length,rightGroup:next.length+1,leftUsed:i,rightUsed:j}
    });
    emit('Die nächsten beiden benachbarten Teillisten werden zusammengeführt.','start');
    while(i<left.length&&j<right.length){
     emit('Vergleichen Sie die ersten noch übrigen Werte der beiden Teillisten.','compare',[offset+i,offset+left.length+j]);
     if(left[i]<=right[j])result.push(left[i++]);else result.push(right[j++]);
     emit('Der kleinere Wert wird an die Ergebnisliste angehängt.','take');
    }
    result.push(...left.slice(i),...right.slice(j));
    i=left.length;j=right.length;
    emit('Eine Teilliste ist leer. Die übrigen Werte werden angehängt.','rest');
    next.push(result.slice());
    a.splice(offset,left.length+right.length,...result);
    offset+=result.length;
    push('Aus zwei geordneten Teillisten ist eine geordnete Teilliste entstanden.',[],[],null,{groups:clone([...next,...groups.slice(k+2)])});
   }
   groups=next;
   push('Die Runde ist abgeschlossen. In der nächsten Runde werden wieder Nachbarn zusammengeführt.',[],[],null,{groups:clone(groups)});
  }
  push(groups.length?'Es bleibt eine Liste in der Liste. Diese wird ausgepackt.':'Die Eingabeliste ist leer. Das Ergebnis ist [].',[],[],null,{groups:clone(groups)});
 }
 if(kind===6){
  let position=0;
  const mark=(text,action,active=[])=>push(text,active,[],null,{cursor:position,gnomeAction:action});
  mark('Die aktuelle Position beginnt am Listenanfang.','start',a.length?[0]:[]);
  while(position<a.length){
   if(position===0){position++;mark('Am Listenanfang geht die Position eine Stelle nach rechts.','forward');continue;}
   mark('Die beiden benachbarten Werte werden verglichen.','compare',[position-1,position]);
   if(a[position-1]<=a[position]){
    position++;mark('Die Reihenfolge stimmt. Die aktuelle Position geht nach rechts.','forward');
   }else{
    swap(position-1,position,[],null,{cursor:position,gnomeAction:'swap'});
    position--;mark('Die aktuelle Position geht eine Stelle zurück.','back');
   }
  }
 }
 if(kind===7){
  const settled=new Set();
  let segments=a.length?[{start:0,end:a.length,role:'Noch zu sortieren'}]:[];
  const state=()=>({groups:segments.map(s=>a.slice(s.start,s.end)),quickRoles:segments.map(s=>s.role)});
  Object.assign(out[0],state());
  const quick=(start,end)=>{
   if(end-start<=1){
    if(end>start){settled.add(start);const s=segments.find(s=>s.start===start&&s.end===end);if(s)s.role='Sortiert';}
    return;
   }
   const part=a.slice(start,end),pivot=part[0],smaller=[],greater=[];
   const segmentIndex=segments.findIndex(s=>s.start===start&&s.end===end);
   const capture=(text,remaining,lastGroup=null)=>{
    const pieces=[{values:smaller.slice(),role:'Kleiner als Pivot'},{values:[pivot],role:'Pivot'},{values:greater.slice(),role:'Grösser oder gleich'},{values:remaining.slice(),role:'Noch zu prüfen'}].filter(s=>s.values.length);
    const before=segments.slice(0,segmentIndex).map(s=>({values:a.slice(s.start,s.end),role:s.role}));
    const after=segments.slice(segmentIndex+1).map(s=>({values:a.slice(s.start,s.end),role:s.role}));
    const all=[...before,...pieces,...after],groups=all.map(s=>s.values),values=groups.flat();
    let active=[];
    if(lastGroup){let offset=0;for(const s of all){if(pieces.includes(s)&&s.role===lastGroup)active=[offset+s.values.length-1];offset+=s.values.length;}}
    push(text,active,[...settled],null,{values,groups,quickRoles:all.map(s=>s.role),quickPhase:'divide'});
   };
   capture('Das erste Element dieses Bereichs wird als Pivot herausgestellt.',part.slice(1));
   for(let i=1;i<part.length;i++){
    const smallerThanPivot=part[i]<pivot;
    if(smallerThanPivot)smaller.push(part[i]);else greater.push(part[i]);
    capture('Ein Wert wird mit dem Pivot verglichen und räumlich seiner Teilliste zugeordnet.',part.slice(i+1),smallerThanPivot?'Kleiner als Pivot':'Grösser oder gleich');
   }
   a.splice(start,end-start,...smaller,pivot,...greater);
   const pivotIndex=start+smaller.length;settled.add(pivotIndex);
   const replacement=[];
   if(smaller.length)replacement.push({start,end:pivotIndex,role:'Kleiner als Pivot'});
   replacement.push({start:pivotIndex,end:pivotIndex+1,role:'Pivot'});
   if(greater.length)replacement.push({start:pivotIndex+1,end,role:'Grösser oder gleich'});
   segments.splice(segmentIndex,1,...replacement);
   push('Das Pivot steht endgültig. Die beiden Teillisten werden weiter aufgeteilt.',[],[...settled],null,{...state(),quickPhase:'divide'});
   quick(start,pivotIndex);quick(pivotIndex+1,end);
   const first=segments.findIndex(s=>s.start===start);
   let count=0;while(first+count<segments.length&&segments[first+count].end<=end)count++;
   segments.splice(first,count,{start,end,role:'Sortiert'});
   push('Die sortierten Teilbereiche und das Pivot rücken wieder zusammen.',[],[...settled],null,{...state(),quickPhase:'combine'});
  };
  quick(0,a.length);
 }
 push('Die Folge ist vollständig geordnet.',[],a.map((_,i)=>i),null,(kind===5||kind===7)?{groups:a.length?[a.slice()]:[],...(kind===7?{quickRoles:a.length?['Sortiert']:[]}: {})}:{});return out;
}
function searchTrace(a,target){
 let l=0,r=a.length-1,first=-1,out=[];
 const push=(text,active=[],extra={})=>out.push({
  values:a.slice(),active,done:first<0?[]:[first],searchValue:target,
  lower:l,upper:r,middle:l<=r?Math.floor((l+r)/2):null,
  muted:a.map((_,i)=>i).filter(i=>(i<l||i>r)&&i!==first),text,...extra
 });
 push('Zunächst gehört die ganze Liste zum Suchbereich.');
 while(l<=r){
  const m=Math.floor((l+r)/2);
  push('Eine Position wird geprüft.',[m]);
  let side;
  if(a[m]===target){
   first=m;push('Ein Treffer. Gibt es noch einen früheren?',[m]);
   r=m-1;side='upper';
  }else if(a[m]<target){l=m+1;side='lower';}
  else{r=m-1;side='upper';}
  const text=side==='lower'?'Die neue untere Grenze liegt direkt rechts neben der geprüften Mitte.':'Die neue obere Grenze liegt direkt links neben der geprüften Mitte.';
  push(text+' Die geprüfte Mitte gehört nicht mehr zum Suchbereich.'+(l>r?' Der Suchbereich ist jetzt leer.':''),[],{middle:null,previousMiddle:m,boundarySide:side,newBoundary:side==='lower'?l:r});
 }
 push(first<0?'Kein Treffer: Der Suchbereich ist leer.':'Erster Treffer an Position '+first+'.');
 return out;
}
function conversionTrace(number,base,direction){
 const out=[],weights=[1],rows=[];
 while(weights[0]*base<=number)weights.unshift(weights[0]*base);
 const digits=direction==='hin'?weights.map(()=>0):number.toString(base).split('').map(Number);
 let rest=number,value=0;
 const push=(text,active=-1,processed=0)=>out.push({
  weights:weights.slice(),digits:digits.slice(),rows:rows.map(r=>r.slice()),
  active,processed,base,remaining:rest,total:value,text
 });
 push(direction==='hin'?'Die Stellenwerte sind vorbereitet. Die Ziffernliste beginnt mit Nullen.':'Stellenwerte und Ziffern stehen an denselben Listenpositionen.');
 for(let position=0;position<weights.length;position++){
  const weight=weights[position];
  if(direction==='hin'){
   const digit=Math.floor(rest/weight);
   digits[position]=digit;rest=rest-digit*weight;
   rows.push([weight,digit,rest]);
   push('Position '+position+': '+digit+' · '+weight+' wird berücksichtigt. Es bleiben '+rest+'.',position,position+1);
  }else{
   const part=digits[position]*weight;value+=part;
   rows.push([weight,digits[position],part,value]);
   push('Position '+position+': '+digits[position]+' · '+weight+' = '+part+'. Die Summe ist '+value+'.',position,position+1);
  }
 }
 out[out.length-1].text=direction==='hin'?'Die Ziffernliste ist vollständig: ['+digits.join(', ')+'].':'Der Wert im Dezimalsystem beträgt '+value+'.';
 return out;
}
const api={sortTrace,searchTrace,conversionTrace};root.AlgoTraces=api;if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
