const gearItems=[
  {id:"wand",name:"Apprentice Wand",slot:"staff",starter:true,icon:"🪄",description:"Your first trusty wand.",attack:0},
  {id:"robe",name:"Traveler Robe",slot:"robe",starter:true,icon:"🧥",description:"Light robes for a new adventurer.",armor:0},
  {id:"charm",name:"Wooden Charm",slot:"charm",starter:true,icon:"📿",description:"A keepsake from home.",health:0},
  {id:"crystal",name:"Crystal Staff",slot:"staff",level:0,icon:"🔮",description:"A crystal that channels your Python knowledge.",attack:2},
  {id:"runic",name:"Runic Robe",slot:"robe",level:2,icon:"🥋",description:"Woven runes soften enemy attacks.",armor:2},
  {id:"storm",name:"Storm Staff",slot:"staff",level:4,icon:"⚡",description:"Crackling energy. Replaces the Crystal Staff.",attack:5},
  {id:"heart",name:"Heartstone Charm",slot:"charm",level:6,icon:"💎",description:"A warm stone that strengthens your hero.",health:20},
  {id:"dragonplate",name:"Dragonplate Robe",slot:"robe",level:8,icon:"🛡️",description:"Dragon scales protect their new master.",armor:4}
];
const regionNames=["Variable Vale","Conditional Crossroads","Listwood Forest","Looping Marsh","Function Peaks","Dictionary Ruins","Error Caverns","Class Citadel","Builder's Summit"];
const regionColors=["#2a6756","#5b6542","#28624b","#345d69","#4e5680","#736246","#654c76","#415c84","#805252"];
const routePoints=[[1,6],[3,6],[5,6],[5,4],[3,4],[1,4],[1,2],[3,2],[5,2],[7,2],[9,2],[11,2]];
let originalHero="",originalDragon="";
function ownedItems(exclude=-1){return gearItems.filter(i=>i.starter||(i.level!==exclude&&missionCleared(i.level)));}
function equipmentFor(exclude=-1){
  const owned=ownedItems(exclude),equipped={};
  ["staff","robe","charm"].forEach(slot=>{const available=owned.filter(i=>i.slot===slot);const selected=available.find(i=>i.id===(state.equipped||{})[slot]);equipped[slot]=(selected||available[available.length-1]).id;});
  return equipped;
}
function equipNewReward(m){const item=gearItems.find(i=>i.level===m);if(item)state.equipped={...equipmentFor(),[item.slot]:item.id};}
function itemStats(item){return item.attack?"+"+item.attack+" attack":item.armor?"+"+item.armor+" armor":item.health?"+"+item.health+" max HP":"Starter equipment";}
function initAdventure(){
  if(!state.adventureVersion){const old=localStorage.getItem("pythonMemoryQuestState");if(old&&!localStorage.getItem("pythonMemoryQuestVersion1State"))localStorage.setItem("pythonMemoryQuestVersion1State",old);state.adventureVersion=2;}
  state.equipped=equipmentFor();save();
  originalHero=el("battleDock").querySelector(".heroSprite").innerHTML;
  originalDragon=el("battleDock").querySelector(".dragonSprite").innerHTML;
  el("backpackBtn").onclick=()=>{renderBackpack();el("backpackDialog").showModal();};
  el("closeBackpack").onclick=()=>el("backpackDialog").close();
  el("exportSave").onclick=exportProgress;
  el("importSave").onchange=importProgress;
  el("questMap").addEventListener("keydown",event=>{const dirs={ArrowLeft:"left",a:"left",ArrowRight:"right",d:"right",ArrowUp:"up",w:"up",ArrowDown:"down",s:"down"};if(dirs[event.key]){event.preventDefault();moveHero(dirs[event.key]);}});
  document.querySelectorAll("[data-move]").forEach(button=>button.onclick=()=>moveHero(button.dataset.move));
}
function encounterInfo(c,m=currentMission){
  const type=missions[m].challenges[c].type;
  if(c===11)return {name:m===8?"The Code Dragon":"Region Dragon",icon:"🐉",kind:"dragon"};
  if(type==="Predict")return {name:"Rune Chest",icon:"📦",kind:"chest"};
  if(type==="Debug")return {name:"Glitch Trap",icon:"⚠️",kind:"trap"};
  if(type==="Build")return {name:"Stone Sentinel",icon:"🗿",kind:"sentinel"};
  if(type==="Explain")return {name:"Riddle Spirit",icon:"👻",kind:"spirit"};
  return {name:"Code Goblin",icon:"👺",kind:"goblin"};
}
function canEnter(c,m=currentMission){return isMissionUnlocked(m)&&(state.completed[keyOf(m,c)]||missions[m].challenges.slice(0,c).every((_,i)=>state.completed[keyOf(m,i)]));}
function enterEncounter(c){
  if(reviewMode||el("runBtn").disabled||lessonBusy||!canEnter(c))return;
  saveBattleDraft();gameScreen="adventure";currentChallenge=c;state.lastChallenge=c;state.lastMission=currentMission;state.mapPosition={m:currentMission,x:routePoints[c][0],y:routePoints[c][1]};save();render();if(learningActive())el("lessonTitle").scrollIntoView({block:"start"});
}
function renderAdventure(){
  if(!el("questMap"))return;
  const map=el("questMap"),p=position();
  el("adventurePanel").hidden=reviewMode;
  el("regionName").textContent=regionNames[p.m];
  const count=missions[p.m].challenges.filter((_,c)=>state.completed[keyOf(p.m,c)]).length;
  el("mapProgress").textContent=count+" / 12 cleared";
  map.style.setProperty("--region-color",regionColors[p.m]);
  map.replaceChildren();
  const scenery=document.createElement("div");scenery.className="mapScenery";scenery.setAttribute("aria-hidden","true");
  scenery.innerHTML='<span class="mountains">▲ ▲ ▲</span><span class="mapRiver"></span><span class="trees treesOne">♠ ♠ ♠</span><span class="trees treesTwo">♠ ♠</span><span class="mapCamp">⛺</span><span class="mapCastle">♜</span>';
  map.append(scenery);
  const path=document.createElementNS("http://www.w3.org/2000/svg","svg");path.setAttribute("viewBox","0 0 13 8");path.setAttribute("preserveAspectRatio","none");path.classList.add("mapPath");path.setAttribute("aria-hidden","true");
  const line=document.createElementNS("http://www.w3.org/2000/svg","polyline");line.setAttribute("points",routePoints.map(([x,y])=>x+","+y).join(" "));path.append(line);map.append(path);
  routePoints.forEach(([x,y],c)=>{const info=encounterInfo(c,p.m),done=state.completed[keyOf(p.m,c)],unlocked=canEnter(c,p.m);const button=document.createElement("button");button.className="mapNode"+(done?" cleared":"")+(p.c===c?" selected":"")+(c===11?" bossNode":"");button.style.left=(x/13*100)+"%";button.style.top=(y/8*100)+"%";button.disabled=!unlocked;button.setAttribute("aria-label","Encounter "+(c+1)+": "+info.name+(done?", cleared":unlocked?", available":", locked"));button.setAttribute("aria-current",p.c===c?"step":"false");button.innerHTML='<span>'+ (done?"✓":unlocked?info.icon:"🔒")+'</span><small>'+(c+1)+'</small>';button.onclick=()=>enterEncounter(c);map.append(button);});
  let pos=state.mapPosition;if(!pos||pos.m!==p.m)pos={m:p.m,x:routePoints[p.c][0],y:routePoints[p.c][1]};
  const hero=document.createElement("div");hero.className="mapHero";hero.style.left=(pos.x/13*100)+"%";hero.style.top=(pos.y/8*100)+"%";hero.setAttribute("aria-hidden","true");hero.innerHTML=originalHero;map.append(hero);
  el("encounterName").textContent="Encounter "+(p.c+1)+": "+encounterInfo(p.c,p.m).name+" · "+missions[p.m].challenges[p.c].type+(state.completed[keyOf(p.m,p.c)]?" · Cleared":"");
  if(state.completed[keyOf(p.m,p.c)])el("nextBtn").style.display="block";
}
function moveHero(direction){
  if(reviewMode||el("runBtn").disabled||lessonBusy)return;
  const steps={left:[-1,0],right:[1,0],up:[0,-1],down:[0,1]},step=steps[direction];if(!step)return;
  const pos=state.mapPosition&&state.mapPosition.m===currentMission?state.mapPosition:{m:currentMission,x:routePoints[currentChallenge][0],y:routePoints[currentChallenge][1]};
  state.mapPosition={m:currentMission,x:Math.max(1,Math.min(12,pos.x+step[0])),y:Math.max(1,Math.min(7,pos.y+step[1]))};
  const c=routePoints.findIndex(([x,y])=>x===state.mapPosition.x&&y===state.mapPosition.y);
  if(c>=0&&canEnter(c)){enterEncounter(c);return;}
  save();const hero=el("questMap").querySelector(".mapHero");if(hero){hero.style.left=(state.mapPosition.x/13*100)+"%";hero.style.top=(state.mapPosition.y/8*100)+"%";}
  if(c>=0)el("encounterName").textContent="Route locked. Clear earlier encounters first.";
}
function renderEnemy(p){
  const info=encounterInfo(p.c,p.m),sprite=el("battleDock").querySelector(".dragonSprite");
  el("enemyName").textContent=reviewMode?"PRACTICE TARGET":info.name.toUpperCase();
  sprite.classList.toggle("smallEnemy",info.kind!=="dragon");
  const equipped=equipmentFor();el("battleDock").dataset.staff=equipped.staff;el("battleDock").dataset.robe=equipped.robe;
  if(info.kind==="dragon"){sprite.innerHTML=originalDragon;return;}
  const illustrations={
    goblin:'<path d="M55 60L12 37l22 42m81-19 43-23-22 42" fill="#8dd79c"/><path d="M40 123l7-44h76l9 44" fill="#875a43"/><ellipse cx="85" cy="65" rx="43" ry="33" fill="#72c789"/><path d="M52 55l24 6m16 0 24-6" stroke="#192e35" stroke-width="7"/><path d="M64 84l9 10 10-9 9 9 11-10" fill="#fff3b2"/><path d="M45 123l-7 15m87-15 8 15" stroke="#5cb277" stroke-width="14"/>',
    chest:'<rect x="30" y="58" width="112" height="73" rx="9" fill="#a67844" stroke="#f1cf86" stroke-width="5"/><path d="M30 81h112M56 59v71m63-71v71" stroke="#e3bf70" stroke-width="7"/><rect x="77" y="76" width="20" height="25" rx="5" fill="#ffe19b"/><path d="M83 27l5-15 5 15 15 5-15 5-5 15-5-15-15-5z" fill="#b5f4e3"/>',
    trap:'<path d="M26 124l20-50 19 50 21-62 24 62 22-50 20 50z" fill="#93a6be" stroke="#d5e4f8" stroke-width="4"/><path d="M75 24h20l-4 40H80z" fill="#ffce77"/><circle cx="85" cy="76" r="6" fill="#ffce77"/>',
    sentinel:'<path d="M48 71l-15 54h103l-15-54" fill="#657d95" stroke="#a1bacb" stroke-width="5"/><rect x="51" y="25" width="69" height="58" rx="9" fill="#92a5ad"/><path d="M64 50h16m14 0h16" stroke="#a8fbe4" stroke-width="7"/><path d="M73 70h27" stroke="#344c61" stroke-width="5"/><path d="M31 80l-10 36m116-36 14 36" stroke="#71879b" stroke-width="20"/>',
    spirit:'<path d="M40 122V64a44 44 0 0188 0v58l-16-12-13 12-14-12-15 12-15-12z" fill="#bda6ef" stroke="#e7d7ff" stroke-width="4"/><ellipse cx="69" cy="60" rx="6" ry="10" fill="#352653"/><ellipse cx="101" cy="60" rx="6" ry="10" fill="#352653"/><path d="M77 84q9 12 18 0" stroke="#352653" stroke-width="4" fill="none"/>'
  };
  sprite.innerHTML='<svg viewBox="0 0 170 150">'+illustrations[info.kind]+'</svg>';
}
function renderBackpack(){
  const equipped=equipmentFor(),gear=heroGear();el("equipmentHero").innerHTML=originalHero;
  el("equipmentStats").textContent="Attack "+gear.attack+" · Armor "+gear.armor+" · HP "+gear.maxHp;
  el("equipmentSlots").replaceChildren();
  ["staff","robe","charm"].forEach(slot=>{const item=gearItems.find(i=>i.id===equipped[slot]);const div=document.createElement("div");div.className="equipmentSlot";div.innerHTML='<span class="label">'+slot.toUpperCase()+'</span><strong>'+item.icon+' '+item.name+'</strong><small>'+itemStats(item)+'</small>';el("equipmentSlots").append(div);});
  el("inventoryItems").replaceChildren();
  gearItems.forEach(item=>{const owned=ownedItems().includes(item),active=equipped[item.slot]===item.id;const card=document.createElement("div");card.className="inventoryItem"+(!owned?" itemLocked":"");const text=document.createElement("div");text.innerHTML='<strong>'+item.icon+' '+item.name+'</strong><small>'+itemStats(item)+'</small><p>'+(owned?item.description:"Complete region "+(item.level+1)+" to unlock.")+'</p>';card.append(text);const button=document.createElement("button");button.className="button secondary";button.textContent=active?"Equipped":owned?"Equip":"Locked";button.disabled=!owned||active||el("runBtn").disabled||lessonBusy;button.onclick=()=>{if(el("runBtn").disabled||lessonBusy||!ownedItems().includes(item))return;state.equipped={...equipmentFor(),[item.slot]:item.id};Object.values(state.battles||{}).forEach(b=>b.hp=Math.min(b.hp,heroGear().maxHp));save();renderBackpack();renderBattle();el("bagMessage").textContent=item.name+" equipped.";};card.append(button);el("inventoryItems").append(card);});
}
function exportProgress(){const blob=new Blob([JSON.stringify({game:"PythonMemoryQuest",version:5,state},null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const link=document.createElement("a");link.href=url;link.download="PythonMemoryQuest-progress.json";link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);el("bagMessage").textContent="Progress backup downloaded.";}
async function importProgress(event){
  const file=event.target.files[0];event.target.value="";if(!file)return;
  if(el("runBtn").disabled||lessonBusy){el("bagMessage").textContent="Wait for Python to finish before restoring.";return;}
  try{
    if(file.size>1000000)throw new Error("This file is too large for a progress backup.");
    const data=JSON.parse(await file.text()),candidate=data.state;
    if(data.game!=="PythonMemoryQuest"||!candidate||!Number.isFinite(candidate.xp)||candidate.xp<0||!candidate.completed||typeof candidate.completed!=="object"||Array.isArray(candidate.completed)||!Array.isArray(candidate.reviews))throw new Error("Choose a Python Memory Quest progress backup.");
    const completed={};Object.entries(candidate.completed).forEach(([k,v])=>{const [m,c]=k.split(":").map(Number);if(/^\d+:\d+$/.test(k)&&missions[m]?.challenges[c]&&v===true)completed[k]=true;});
    const restored={...defaultState,xp:candidate.xp,completed,attempts:{},streak:Number.isFinite(candidate.streak)?Math.max(0,candidate.streak):0,reviews:candidate.reviews.filter(r=>Number.isInteger(r.m)&&Number.isInteger(r.c)&&missions[r.m]?.challenges[r.c]&&Number.isFinite(r.due)),battles:{},equipped:candidate.equipped&&typeof candidate.equipped==="object"?candidate.equipped:{},skillCharge:Number.isFinite(candidate.skillCharge)?Math.max(0,Math.min(6,candidate.skillCharge)):0,lessonDone:Object.fromEntries(Object.entries(candidate.lessonDone||{}).filter(([k,v])=>/^\d+:\d+$/.test(k)&&missions[Number(k.split(":")[0])]?.challenges[Number(k.split(":")[1])]&&v===true)),capstoneVersion:1,activeSkill:typeof candidate.activeSkill==="string"?candidate.activeSkill:null,adventureVersion:2,drafts:Object.fromEntries(Object.entries(candidate.drafts||{}).filter(([k,v])=>/^\d+:\d+$/.test(k)&&typeof v==="string"&&v.length<100000)),heroColor:candidate.heroColor,roomStyle:candidate.roomStyle,displayTrophy:typeof candidate.displayTrophy==="string"&&/^[0-8]:[0-3]$/.test(candidate.displayTrophy)?candidate.displayTrophy:undefined,creation:candidate.creation&&typeof candidate.creation.pet==="string"&&candidate.creation.pet.length<=24&&Number.isInteger(candidate.creation.coins)&&candidate.creation.coins>=0&&candidate.creation.coins<=12&&typeof candidate.creation.code==="string"&&candidate.creation.code.length<20000?{pet:candidate.creation.pet,coins:candidate.creation.coins,code:candidate.creation.code}:undefined,creationDraft:typeof candidate.creationDraft==="string"&&candidate.creationDraft.length<20000?candidate.creationDraft:undefined};
    if(!confirm("Restore this backup? Your current progress will be saved separately before replacement."))return;
    localStorage.setItem("pythonMemoryQuestBeforeRestore",JSON.stringify(state));state=restored;currentMission=Math.max(0,missions.findIndex((_,m)=>!missionCleared(m)));currentChallenge=Math.max(0,missions[currentMission].challenges.findIndex((_,c)=>!state.completed[keyOf(currentMission,c)]));state.lastMission=currentMission;state.lastChallenge=currentChallenge;state.equipped=equipmentFor();gameScreen="village";reviewMode=false;save();render();renderBackpack();el("bagMessage").textContent="Progress restored. Hero health is refreshed for the adventure.";
  }catch(error){el("bagMessage").textContent=error.message||"Could not read that backup.";}
}
