const questStories=[
  [['Light the first lantern','Pip is trapped behind a dark gate. Your first line of Python can light the way.','Bring Pip home · unlock violet robes'],['Repair the treasure counter','The village shop lost track of its coins. Help the shopkeeper name, count, and update values.','Open the workshop · unlock a book nook'],['Power the watchtower','Collect energy and work out the right numbers to bring the village lights back.','Grow the garden · unlock sunset robes'],['Drive back the Vale dragon','Put your new variable skills to work and face the dragon guarding the road.','Restore the fountain · unlock a plant-filled room']],
  [['Choose the safe road','Help the scout decide when to fight and when to heal.','Light another village lantern'],['Open the market gates','Use comparisons to decide who has enough coins and who needs help.','Bring traders back to the village'],['Send the right signal','Combine conditions to guide the village guards.','Restore the market square'],['Outsmart the crossroads dragon','Choose the right path through the dragon’s defenses.','Unlock starry room decorations']],
  [['Pack for the expedition','Build an inventory and find the items the explorer needs.','Welcome the explorer home'],['Sort the supply wagon','Count and add supplies for the next adventure.','Restock the village shelves'],['Fix the enchanted backpack','Replace broken items and collect a useful section of your supplies.','Rebuild the library'],['Recover the dragon’s treasure','Find and total the items hidden beyond the forest.','Add a library lantern']],
  [['Practice a spell volley','Use loops to repeat your hero’s moves.','Restore the training grounds'],['Count the incoming hits','Build totals and countdowns to prepare the village defenses.','Welcome the village trainer'],['Find the strongest allies','Stop, skip, and choose what belongs in your team.','Build a lookout post'],['Break the marsh dragon’s cycle','Use repeated instructions to clear the last stretch of the marsh.','Light the lookout beacon']],
  [['Learn reusable moves','Turn familiar instructions into functions your hero can use again.','Teach the village a new move'],['Combine your spells','Send values into functions and use the results.','Upgrade the training grounds'],['Prepare a default plan','Give your moves sensible defaults and understand local names.','Add a workshop lantern'],['Defeat the mountain dragon','Bring your reusable moves to the summit.','Build the observatory']],
  [['Record the village heroes','Connect names and stats with dictionary keys.','Start the village record book'],['Update the supply records','Keep hero stats current and handle missing information.','Organize the storeroom'],['Read the treasure ledger','Work with keys, values, and helpful defaults.','Decorate the market'],['Restore the ruin’s records','Combine dictionary skills to recover the lost treasure.','Add an observatory lantern']],
  [['Prepare a rescue plan','Handle errors so a small problem does not stop the adventure.','Set up a village rescue station'],['Recover from broken paths','Match errors to the right recovery plan.','Train the rescue team'],['Handle unexpected inputs','Keep going when numbers or dictionary keys are missing.','Strengthen the village defenses'],['Escape the cavern dragon','Use safe recovery and cleanup to complete the cavern route.','Restore the castle gate']],
  [['Create a hero blueprint','Build objects with their own names and stats.','Welcome the hero builders'],['Teach objects new moves','Use methods to protect and change your heroes.','Upgrade the workshop'],['Build helpful companions','Give counters, potions, and heroes useful behavior.','Add a companion shelter'],['Defend the citadel','Combine object data and methods against the citadel dragon.','Raise the village banners']],
  [['Plan the final expedition','Combine earlier skills and keep game values within safe limits.','Prepare the whole village'],['Gather the final supplies','Choose allies and total the treasure for the final journey.','Complete the village supply wagon'],['Practice the battle rules','Handle damage, healing, and invalid input before the final fight.','Light the final lantern'],['Rescue the Python Kingdom','Build the battle engine and face the Code Dragon with everything you learned.','Rescue the kingdom · earn the dragon banner']]
];
const villageBuildings=[
 {name:'Mentor’s cottage',icon:'🧙',need:0,x:12,y:58,story:'Professor Py teaches every new move.'},
 {name:'Fox den',icon:'🦊',need:1,x:29,y:73,story:'Pip is safe at home because you cleared the first quest.'},
 {name:'Workshop',icon:'🔨',need:2,x:48,y:58,story:'The shopkeeper has reopened the workshop.'},
 {name:'Garden',icon:'🌻',need:3,x:66,y:76,story:'Fresh plants bring color back to the village.'},
 {name:'Fountain',icon:'⛲',need:4,x:79,y:60,story:'Clean water flows through the village again.'},
 {name:'Market',icon:'🏪',need:7,x:14,y:30,story:'Traders have returned with new supplies.'},
 {name:'Library',icon:'📚',need:11,x:36,y:30,story:'A place to keep the Python knowledge you earned.'},
 {name:'Observatory',icon:'🔭',need:20,x:59,y:29,story:'The village can see all the way to the summit.'},
 {name:'Castle',icon:'🏰',need:28,x:82,y:29,story:'The castle gates are open for the final expedition.'}
];
const heroPalettes=[{id:'mint',name:'Mint',color:'#53d5d7',hat:'#4252a4',need:0},{id:'violet',name:'Violet',color:'#bc92ed',hat:'#66529c',need:1},{id:'sunset',name:'Sunset',color:'#efb676',hat:'#b76b69',need:3}];
const roomThemes=[{id:'cozy',name:'Cozy camp',need:0,decor:'🕯️ 🧺 🪵'},{id:'books',name:'Book nook',need:2,decor:'📚 🕯️ 📖'},{id:'plants',name:'Greenhouse',need:4,decor:'🪴 🌻 🌿'},{id:'stars',name:'Star room',need:8,decor:'🌙 ✨ 🔭'}];
let gameScreen='village';
function questCleared(m,q){return [0,1,2].every(i=>state.completed[keyOf(m,q*3+i)]);}
function questCount(){return missions.reduce((count,_,m)=>count+[0,1,2,3].filter(q=>questCleared(m,q)).length,0);}
function nextQuestPosition(){for(let m=0;m<missions.length;m++)for(let c=0;c<12;c++)if(!state.completed[keyOf(m,c)])return {m,c};return {m:8,c:11};}
function questInfo(m,c){const q=Math.floor(c/3),story=questStories[m][q];return {m,q,title:story[0],story:story[1],reward:story[2],done:[0,1,2].filter(i=>state.completed[keyOf(m,q*3+i)]).length};}
function villageBusy(){return lessonBusy||el('runBtn').disabled;}
function initVillage(){
  if(!state.drafts||typeof state.drafts!=='object')state.drafts={};
  gameScreen=state.campfire?'campfire':'village';
  el('villageBtn').onclick=showVillage;el('gameHomeBtn').onclick=showVillage;el('campfireHome').onclick=showVillage;
  el('continueQuest').onclick=startVillageQuest;el('campfireContinue').onclick=startVillageQuest;
  el('villageBag').onclick=()=>{renderBackpack();el('backpackDialog').showModal();};
  el('answerInput').addEventListener('input',()=>{if(!reviewMode){state.drafts[keyOf(position().m,position().c)]=el('answerInput').value;save();}});
  document.querySelector('.brand').onclick=e=>{e.preventDefault();showVillage();};
  applyHeroLook();
}
function saveBattleDraft(){if(!reviewMode&&gameScreen==='adventure'){state.drafts=state.drafts||{};state.drafts[keyOf(position().m,position().c)]=el('answerInput').value;}}
function showVillage(){if(villageBusy())return;saveBattleDraft();gameScreen='village';reviewMode=false;state.campfire=null;save();render();window.scrollTo({top:0,behavior:'instant'});}
function startVillageQuest(){
  if(villageBusy())return;const p=nextQuestPosition();currentMission=p.m;currentChallenge=p.c;state.lastMission=p.m;state.lastChallenge=p.c;state.mapPosition=null;state.campfire=null;reviewMode=false;gameScreen='adventure';save();render();el(openingRescueActive()?'rescueIntro':learningActive()?'lessonPanel':'battleWorkspace').scrollIntoView({block:'start'});
}
function enterCampfire(m,c){
  battleFor(m).hp=heroGear().maxHp;state.campfire={m,q:Math.floor(c/3)};gameScreen='campfire';reviewMode=false;save();renderVillageShell();window.scrollTo({top:0,behavior:'instant'});
}
function renderVillageShell(){
  if(!el('villageView'))return;
  el('villageView').hidden=gameScreen!=='village';el('campfireView').hidden=gameScreen!=='campfire';el('gameView').hidden=gameScreen!=='adventure';
  if(gameScreen!=='adventure'){el('battleDock').hidden=true;el('celebrationLayer').hidden=true;document.querySelector('.main').classList.add('learningMode');}
  document.documentElement.classList.toggle('homeScreen',gameScreen!=='adventure'||openingRescueActive());
  applyHeroLook();
  const p=position(),quest=questInfo(p.m,p.c);el('questRibbonTitle').textContent=reviewMode?'Village request · practice familiar moves':quest.title;el('questRibbonProgress').textContent=reviewMode?'Safe review · no HP cost':quest.done+' / 3 encounters cleared';
  if(gameScreen==='village')renderVillage();
  if(gameScreen==='campfire')renderCampfire();
}
function renderVillage(){
  const count=questCount(),p=nextQuestPosition(),quest=questInfo(p.m,p.c),finished=completedCount()===totalChallenges();
  el('villageTitle').textContent=completedCount()?'Ready for your next adventure?':'Your adventure starts here';
  el('homeGuide').innerHTML=originalHero;el('homeQuestLabel').textContent=completedCount()?'YOUR NEXT STEP':'YOUR FIRST QUEST';
  el('villageGreeting').textContent=completedCount()?'Continue where you left off. Professor Py will guide you.':'Press Start. Professor Py will show you what to do.';
  el('villageGrowth').textContent=count+' / 36 quests completed · '+state.xp+' XP';
  const nextBuilding=villageBuildings.find(b=>b.need>count);el('villageNextUnlock').textContent=nextBuilding?'Next village change: '+nextBuilding.name+' at '+nextBuilding.need+' quests':finished?'Kingdom rescued. Your village is thriving!':'Your village is ready for the final showdown.';
  el('homeQuestTitle').textContent=finished?'The kingdom is safe!':quest.title;el('homeQuestStory').textContent=finished?'Visit your favorite regions or help villagers keep their Python skills sharp.':quest.story;
  el('homeQuestReward').textContent=finished?'Dragon banner earned':quest.reward;el('continueQuest').textContent=finished?'Revisit the final adventure →':completedCount()?'Continue playing →':'Start playing →';
  el('homeQuestSteps').replaceChildren();[0,1,2].forEach(i=>{const c=quest.q*3+i,ch=missions[p.m].challenges[c],step=document.createElement('span');step.textContent=(state.completed[keyOf(p.m,c)]?'✓ ':'○ ')+lessonFor({m:p.m,c}).title;el('homeQuestSteps').append(step);});
  renderVillageScene(count);renderCosmetics(count);renderVillageJobs();renderCreation();
}
function renderVillageScene(count){
  const scene=el('villageScene');scene.replaceChildren();
  const landscape=document.createElement('div');landscape.className='villageLandscape';landscape.setAttribute('aria-hidden','true');
  landscape.innerHTML='<svg viewBox="0 0 900 310" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="vSky" x2="0" y2="1"><stop stop-color="#243d69"/><stop offset="1" stop-color="#598f8d"/></linearGradient></defs><rect width="900" height="310" fill="url(#vSky)"/><circle cx="752" cy="53" r="28" fill="#ffe8ae"/><path d="M0 177L130 58l92 104 86-60 99 100L550 70l139 132 126-90 85 76v122H0" fill="#34516a"/><path d="M0 210Q160 151 303 201T603 195T900 192v118H0" fill="#467567"/><path d="M0 254Q225 170 420 245T900 232v78H0" fill="#315f51"/><path d="M415 310Q365 260 501 220T731 153" stroke="#cab68a" stroke-width="21" fill="none" stroke-linecap="round"/><path d="M0 285Q185 262 221 310" stroke="#84ccd0" stroke-width="25" fill="none"/><g fill="#ffeec6"><circle cx="62" cy="42" r="2"/><circle cx="258" cy="29" r="2"/><circle cx="420" cy="57" r="2"/><circle cx="608" cy="33" r="2"/></g></svg>';
  scene.append(landscape);
  villageBuildings.forEach(b=>{const built=count>=b.need||(b.name==='Fox den'&&state.completed['0:0']);const spot=document.createElement('button');spot.className='villageBuilding'+(built?' built':'');spot.style.left=b.x+'%';spot.style.top=b.y+'%';spot.setAttribute('aria-label',b.name+(built?', restored':', unlocks at '+b.need+' completed quests'));spot.innerHTML='<span class="buildingRoof"></span><span class="buildingBody"><span>'+ (built?b.icon:'🪵')+'</span><i></i></span><small>'+b.name+'</small>';spot.onclick=()=>modal(b.name,built?b.story:'Complete '+b.need+' quests to restore this part of the village. Every three encounters make one quest.');scene.append(spot);});
  if(state.completed['0:0']){const fox=document.createElement('div');fox.className='villageFox';fox.textContent='🦊';fox.setAttribute('aria-label','Pip the rescued fox');scene.append(fox);}
  if(count===36){const flag=document.createElement('div');flag.className='dragonBanner';flag.textContent='🐉 ⚑';scene.append(flag);}
}
function applyHeroLook(){
  const count=questCount(),palette=heroPalettes.find(p=>p.id===state.heroColor&&count>=p.need)||heroPalettes[0];
  document.documentElement.style.setProperty('--hero-cloth',palette.color);document.documentElement.style.setProperty('--hero-hat',palette.hat);
}
function renderCosmetics(count){
  el('villageAvatar').innerHTML=originalHero;
  const room=roomThemes.find(r=>r.id===state.roomStyle&&count>=r.need)||roomThemes[0];el('roomPreview').dataset.theme=room.id;el('roomDecor').textContent=room.decor;
  [['heroColors',heroPalettes,'heroColor'],['roomStyles',roomThemes,'roomStyle']].forEach(([id,choices,key])=>{el(id).replaceChildren();choices.forEach(choice=>{const button=document.createElement('button');button.className='cosmeticButton';button.textContent=choice.name+(count<choice.need?' 🔒':'');button.disabled=count<choice.need;button.setAttribute('aria-pressed',(state[key]||choices[0].id)===choice.id?'true':'false');button.title=count<choice.need?'Unlock after '+choice.need+' quests':choice.name;button.onclick=()=>{state[key]=choice.id;save();applyHeroLook();renderCosmetics(count);el('cosmeticMessage').textContent=choice.name+' selected. Saved for your next visit.';};el(id).append(button);});});
}
function renderVillageJobs(){
  el('villageJobs').replaceChildren();const jobs=[{name:'Professor Py’s refresher',icon:'🧙',text:'Practice up to three familiar moves. Your hero keeps all their HP.',need:0},{name:'Pip’s memory trail',icon:'🦊',text:'Help Pip remember the moves you have learned on your journey.',need:1}];
  jobs.forEach(job=>{const card=document.createElement('div');card.className='villageJob';const title=document.createElement('strong');title.textContent=job.icon+' '+job.name;const text=document.createElement('p');text.textContent=job.text;const button=document.createElement('button');button.className='button secondary';button.textContent=questCount()<job.need?'Rescue Pip first':completedCount()?'Help with a request':'Complete an encounter first';button.disabled=!completedCount()||questCount()<job.need;button.onclick=()=>{if(villageBusy())return;startReview();if(reviewMode){reviewQueue=reviewQueue.slice(0,3);gameScreen='adventure';render();window.scrollTo({top:0,behavior:'instant'});}};card.append(title,text,button);el('villageJobs').append(card);});
}
function renderCampfire(){
  const saved=state.campfire;if(!saved){showVillage();return;}const quest=questInfo(saved.m,saved.q*3);
  el('campfireTitle').textContent=quest.title+' — complete!';el('campfireStory').textContent='Three encounters cleared. '+(saved.m===0&&saved.q===0?'Pip the fox followed your lantern home. Look for him in the village!':'Your new Python skills made the village stronger.');el('campfireReward').textContent='✦ '+quest.reward;
  el('campfireContinue').textContent=completedCount()===totalChallenges()?'Explore your rescued village →':'Continue your adventure →';el('campfireContinue').onclick=completedCount()===totalChallenges()?showVillage:startVillageQuest;
}
function capturePracticeWorld(){
  const id=lessonRoutes[position().m][position().c];
  const hp=['update','aug','clamp','parameters','method','class','finale'].includes(id),loop=['for','range','accumulate','while','loopcontrol','filter'].includes(id),gate=['if','else','compare','logic','elif','membership'].includes(id),bag=['list','index','append','listchange','slice','sum','dict','dictchange','get','dictvalues'].includes(id);
  return hp?{kind:'hp'}:loop?{kind:'loop'}:gate?{kind:'gate'}:bag?{kind:'bag'}:{kind:'coins'};
}
function renderCodeWorld(result=null){
  const scene=el('codeWorldScene'),caption=el('codeWorldCaption');if(!scene)return;
  const world=capturePracticeWorld();
  if(renderLivePractice(result,world))return;scene.className='codeWorldScene world-'+world.kind;scene.replaceChildren();
  if(!result){scene.textContent=world.kind==='hp'?'🧙 ♥':world.kind==='loop'?'🧙 ✦ ✦ ✦':world.kind==='gate'?'🧙 🚪':world.kind==='bag'?'🎒 📦':'🧙 🪙';caption.textContent='Change the example and run it to see your code affect this scene.';return;}
  if(!result.ok){scene.textContent='🧙 🛠️';caption.textContent='The scene is waiting while you fix the code. No HP lost.';return;}
  const text=(result.stdout||'').trim(),numbers=text.match(/^-?\d+(?:\.\d+)?$/gm)||[],number=numbers.length?Number(numbers[numbers.length-1]):null;
  if(world.kind==='hp'&&number!==null){const label=document.createElement('strong');label.textContent='Hero stat: '+number;const bar=document.createElement('div');bar.className='worldHealthTrack';const fill=document.createElement('div');fill.style.width=Math.max(0,Math.min(100,number))+'%';bar.append(fill);scene.append(label,bar);caption.textContent='Your printed number changes this practice meter. Battle HP is safe.';}
  else if(world.kind==='loop'){const lines=text?text.split('\n'):[],count=Math.min(12,lines.length);for(let i=0;i<count;i++){const bolt=document.createElement('span');bolt.className='worldSpell';bolt.style.animationDelay=i*.13+'s';bolt.textContent='✦';scene.append(bolt);}caption.textContent=lines.length+' printed lines → '+count+' visible spell pulses'+(lines.length>12?' (preview capped at 12)':'')+'. One print per loop turn gives one pulse.';}
  else if(world.kind==='gate'){const first=text.split('\n')[0],boolean=first==='True'||first==='False';scene.textContent=boolean?(first==='True'?'🧙 🔓 ✨':'🧙 🚪'):'🧙 🛤️';caption.textContent=boolean?'The first printed condition is '+first+'. The practice gate '+(first==='True'?'opened.':'stayed closed.')+' Change the values and try again.':'Your code chose: '+(text||'(nothing printed)')+'. Change the condition to explore another path.';}
  else if(world.kind==='bag'){scene.textContent='🎒 '+(text||'Your code ran');caption.textContent='Your program’s printed inventory or result appears in the backpack display.';}
  else {scene.textContent='🧙 '+(number!==null?'🪙 '+number:text||'✨');caption.textContent=number!==null?'Your printed number updates the practice coin counter.':'Your code’s result appears in the scene. Experiment again!';}
}
