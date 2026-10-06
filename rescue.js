let rescueMoment=false;
function trainingShieldActive(p=position()){return !reviewMode&&p.m===0&&p.c<3&&!questCleared(0,0);}
function openingRescueActive(){const p=position();return gameScreen==='adventure'&&!reviewMode&&!forcedLesson&&p.m===0&&p.c===0&&(!state.completed['0:0']||rescueMoment);}
function initJourney(){
  rescueMoment=!state.completed['0:0'];
  if(!questCleared(0,0)&&battleFor(0).hp<=0){battleFor(0).hp=heroGear().maxHp;save();}
  el('rescueRun').onclick=async()=>{
    if(villageBusy())return;
    el('answerInput').value=el('rescueCode').value;saveBattleDraft();save();
    el('rescueRun').disabled=true;el('rescueRun').textContent='Lighting the lantern…';
    try{await runAnswer();}finally{el('rescueRun').disabled=false;el('rescueRun').textContent='Power the lantern ✨';}
  };
  el('rescueCode').addEventListener('input',()=>{state.drafts['0:0']=el('rescueCode').value;save();});
  el('rescueNext').onclick=()=>{rescueMoment=false;nextChallenge();};
  el('creationRun').onclick=buildCreation;
  el('creationCode').addEventListener('input',()=>{state.creationDraft=el('creationCode').value;save();});
}
function companionName(){return typeof state.creation?.pet==='string'?state.creation.pet:'Pip';}
function renderJourney(result=null){
  const p=position(),opening=openingRescueActive(),rescued=!!state.completed['0:0'];
  el('rescueIntro').hidden=!opening;
  el('battlePip').hidden=!rescued||opening;el('pipHelp').hidden=!rescued||reviewMode;
  el('pipAdvice').textContent=companionName()+': '+lessonFor(p).use;
  const type=current().type;
  el('encounterGoal').textContent=type==='Predict'?'📦 Predict the result to unlock the rune chest.':type==='Debug'?'⚠️ Repair the code to disarm this trap.':type==='Explain'?'🗣️ Explain the move to help the riddle spirit.':type==='Build'?'🛠️ Build working code to power the sentinel.':'✨ Use your Python move to clear the route.';
  if(!opening)return;
  el('lessonPanel').hidden=true;el('battleWorkspace').hidden=true;el('adventurePanel').hidden=true;el('battleDock').hidden=true;
  document.querySelector('.main').classList.add('learningMode');
  const done=!!state.completed['0:0'];
  el('rescueCode').value=state.drafts?.['0:0']||'energy = ';
  const value=result?.world?.energy;
  renderLantern(el('rescueScene'),done?100:typeof value==='number'?value:0,done);
  el('rescueNext').hidden=!done;el('rescueRun').hidden=done;el('rescueCode').disabled=done;
  el('rescueFeedback').textContent=done?'The gate is open! Pip is free. You used a variable to power the lantern. +100 XP':result?.ok===false?'Your shield protected you. '+friendlyError(result.stderr||'')+' Try energy = 100.':typeof value==='number'?'The lantern has '+value+' energy. It needs 100. Change the number after = and try again.':state.attempts['0:0']?'Store the number 100 in energy: energy = 100. Your training shield keeps your HP safe.':'Type 100 after the equals sign, then power the lantern. Mistakes cost no HP.';
}
function renderLantern(scene,energy,open){
  scene.className='rescueScene'+(open?' gateOpen':'');scene.setAttribute('aria-label',open?'Pip is free beside the powered lantern':'Pip waits behind the gate. Lantern energy: '+energy+' out of 100');scene.replaceChildren();
  const glow=document.createElement('div');glow.className='lanternGlow';glow.style.opacity=String(Math.max(.12,Math.min(1,energy/100)));glow.textContent='🏮';
  const gate=document.createElement('div');gate.className='rescueGate';gate.textContent=open?'🔓':'🔒';
  const fox=document.createElement('div');fox.className='rescueFox';fox.textContent='🦊';
  const label=document.createElement('strong');label.className='lanternValue';label.textContent='Energy: '+energy+' / 100';
  scene.append(glow,gate,fox,label);
}
function renderLivePractice(result,world){
  if(!result?.ok||!result.world)return false;
  const scene=el('codeWorldScene'),caption=el('codeWorldCaption'),values=result.world;
  if(typeof values.energy==='number'){
    renderLantern(scene,values.energy,values.energy>=100);caption.textContent='Your energy variable powers this lantern. At 100 or more, this practice gate opens. Battle progress stays safe.';return true;
  }
  const key=world.kind==='hp'&&typeof values.hp==='number'?'hp':typeof values.coins==='number'?'coins':null;
  if(key){
    const value=values[key];scene.className='codeWorldScene liveWorld';scene.replaceChildren();
    const actor=document.createElement('span');actor.className='worldActor';actor.textContent=key==='hp'?'🧙':'🪙';
    const label=document.createElement('strong');label.textContent=key+' = '+value;
    const track=document.createElement('div');track.className='worldHealthTrack';const fill=document.createElement('div');fill.style.width=Math.max(0,Math.min(100,value))+'%';track.append(fill);scene.append(actor,label,track);
    caption.textContent='This scene reads the actual '+key+' variable after your Python runs, even without print(). Battle HP is safe.';return true;
  }
  const inventory=values.inventory??values.tools??values.bag;
  if(Array.isArray(inventory)||inventory&&typeof inventory==='object'){
    scene.className='codeWorldScene inventoryWorld';scene.replaceChildren();const entries=Array.isArray(inventory)?inventory:Object.entries(inventory).map(([k,v])=>k+': '+v);
    entries.slice(0,12).forEach(item=>{const token=document.createElement('span');token.className='inventoryToken';token.textContent='📦 '+String(item);scene.append(token);});
    if(!entries.length)scene.textContent='🎒 Empty backpack';caption.textContent='The backpack shows your actual Python collection (up to 12 items). Change the code to add, remove, or replace an item.';return true;
  }
  const gate=typeof values.gate_open==='boolean'?values.gate_open:typeof values.shield==='boolean'?values.shield:null;
  if(gate!==null){scene.className='codeWorldScene';scene.textContent=typeof values.gate_open==='boolean'?(gate?'🧙 🔓':'🧙 🔒'):(gate?'🧙 🛡️':'🧙');caption.textContent=(typeof values.gate_open==='boolean'?'gate_open':'shield')+' = '+gate+'. Your Boolean changes the scene.';return true;}
  if(typeof values.pet==='string'||typeof values.name==='string'){
    scene.className='codeWorldScene';scene.textContent='🦊 '+(values.pet??values.name);caption.textContent='Your string gives this character a name. Quotes store text; capital letters matter.';return true;
  }
  return false;
}
function renderCreation(){
  const unlocked=!!state.completed['0:0'];el('creationTools').hidden=!unlocked;
  el('creationUnlock').textContent=unlocked?'A little creation made with your own Python. Saved in this browser.':'Rescue Pip to unlock a creation of your own.';
  el('creationCode').value=state.creationDraft||state.creation?.code||'pet = "Pip"\ncoins = 3\nprint(pet)';
  renderCreationScene(state.creation||{pet:'Pip',coins:3});
}
function renderCreationScene(creation){el('creationScene').textContent='🦊 '+creation.pet+' · 🍎 '+creation.coins+' snacks';}
async function buildCreation(){
  if(villageBusy()||!state.completed['0:0'])return;
  const code=el('creationCode').value;state.creationDraft=code;save();lessonBusy=true;el('creationRun').disabled=true;el('creationRun').textContent='Building…';
  try{
    const result=await executePython(code,'','isinstance(pet, str) and 0 < len(pet.strip()) <= 24 and type(coins) is int and 0 <= coins <= 12');
    if(!result.ok||!result.verified){el('creationFeedback').textContent=result.ok?'Use pet = "a name" (1–24 characters) and coins = a whole number from 0 to 12.':'Your last creation is safe. '+friendlyError(result.stderr);return;}
    state.creation={code,pet:result.world.pet,coins:result.world.coins};save();renderCreationScene(state.creation);el('creationFeedback').textContent='Saved! '+state.creation.pet+' has '+state.creation.coins+' snacks. Your companion will use this name on your adventure.';
  }catch(error){el('creationFeedback').textContent=error.message;}
  finally{lessonBusy=false;el('creationRun').disabled=false;el('creationRun').textContent='Build my creation ✨';}
}
