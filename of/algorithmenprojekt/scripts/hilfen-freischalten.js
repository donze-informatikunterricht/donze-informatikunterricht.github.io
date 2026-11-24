/* Ein Stichwort öffnet die vier Hilfekarten. Die Animation bleibt unabhängig bedienbar. */
(function(){
'use strict';
const codes={1:'eingrenzen',2:'nachbarn',3:'minimum',4:'einschieben',5:'zurückgehen',6:'zusammenführen',7:'aufteilen','8-hin':'stellenwert','8-zurueck':'stellenwert'};
const form=document.getElementById('hint-unlock-form');if(!form)return;
const input=document.getElementById('hint-code'),cards=document.getElementById('hint-cards'),message=document.getElementById('hint-unlock-message');
const project=document.body.dataset.project,key=project==='8'?project+'-'+document.body.dataset.direction:project;
const normalize=value=>value.trim().toLocaleLowerCase('de-CH').replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss');
form.addEventListener('submit',event=>{
 event.preventDefault();
 if(!codes[key]||normalize(input.value)!==normalize(codes[key])){
  input.setAttribute('aria-invalid','true');message.textContent='Dieses Stichwort passt noch nicht. Prüfen Sie die Eingabe oder fragen Sie die Lehrperson.';return;
 }
 cards.hidden=false;form.hidden=true;message.textContent='Die vier Tipps sind freigeschaltet. Öffnen Sie nur so viel Hilfe, wie Sie gerade brauchen.';
 const first=cards.querySelector('summary');if(first)first.focus();
});
input.addEventListener('input',()=>{input.removeAttribute('aria-invalid');message.textContent='';});
})();
