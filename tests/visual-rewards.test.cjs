const fs=require('fs'),vm=require('vm'),assert=require('assert');
const nodes=new Map();let serial=0,saved;
function node(id){if(!nodes.has(id))nodes.set(id,{textContent:'',value:'',hidden:false,disabled:false,innerHTML:'',dataset:{},style:{setProperty(){}},classList:{add(){},remove(){},toggle(){}},setAttribute(k,v){this[k]=v},focus(){},getBoundingClientRect(){return {left:0,top:0,width:100,height:40}},animate(){},scrollIntoView(){},addEventListener(){},replaceChildren(){this.children=[]},append(...items){this.children=(this.children||[]).concat(items)},appendChild(item){this.append(item)},querySelector(selector){return node(selector)}});return nodes.get(id)}
const stored={xp:516,completed:{'0:0':true,'0:1':true,'0:2':true,'0:3':true},attempts:{},streak:0,lastMission:0,lastChallenge:4,reviews:[]};
const ctx=vm.createContext({document:{documentElement:node("root"),getElementById:node,createElement:()=>node('g'+serial++),createElementNS:()=>node('svg'+serial++),querySelectorAll:()=>[],querySelector:()=>node('avatar')},localStorage:{getItem:()=>JSON.stringify(stored),setItem:(_,v)=>saved=v},window:{scrollTo(){},matchMedia:()=>({matches:true})},setTimeout:()=>1,clearTimeout(){},Map,console,Date});
vm.runInContext(fs.readFileSync('challenges.js','utf8')+'\n'+fs.readFileSync('adventure.js','utf8')+'\n'+fs.readFileSync('lessons.js','utf8')+'\n'+fs.readFileSync('village.js','utf8')+'\n'+fs.readFileSync('rescue.js','utf8')+'\n'+fs.readFileSync('app.js','utf8').split('el("reviveBtn").onclick=')[0],ctx);
const run=s=>vm.runInContext(s,ctx);
run('state.completed={};state.xp=200;state.drafts={};state.attempts={};gameScreen="village";state.displayTrophy=undefined;');
assert.equal(run('allQuestTrophies().length'),36);
assert.equal(new Set(run('allQuestTrophies().map(t=>t.id)')).size,36);
run('state.completed["0:0"]=true;state.completed["0:1"]=true;renderTrophyShelf()');
assert.equal(run('questTrophy(0,0).earned'),false);assert.equal(run('displayTrophy(questTrophy(0,0))'),false);
assert.equal(node('trophyShelf').children.length,1);assert.equal(node('trophyShelf').children[0].disabled,true);
run('state.completed["0:2"]=true;renderTrophyShelf();renderRoomTrophy();renderQuestPrize(0,0)');
assert.equal(run('questTrophy(0,0).earned'),true);assert.equal(node('trophyCount').textContent,'1 / 36');assert.equal(node('questPrize').hidden,false);assert.match(node('prizeName').textContent,/Variable Lantern/);assert.equal(node('roomTrophy').hidden,false);
assert.equal(run('displayTrophy(questTrophy(0,0))'),true);assert.equal(JSON.parse(saved).displayTrophy,'0:0');assert.equal(run('state.xp'),200);
run('renderQuestPrize(0,0)');node('displayPrize').onclick();assert.equal(run('state.xp'),200);assert.equal(run('allQuestTrophies().filter(t=>t.earned).length'),1);
run('state.displayTrophy="8:3";renderRoomTrophy()');assert.equal(run('displayedTrophy().id'),'0:0');
run('state.completed={};for(let c=0;c<12;c++)state.completed["0:"+c]=true;renderTrophyShelf()');
assert.equal(node('trophyCount').textContent,'4 / 36');assert.equal(run('questTrophy(0,3).name'),'Variable Dragon Crest');
run('renderQuestPrize(0,3)');assert.match(node('prizeDetail').textContent,/every encounter/);
run('state.completed={};for(let m=0;m<9;m++)for(let c=0;c<12;c++)state.completed[m+":"+c]=true;renderTrophyShelf();renderVillageLanterns(el("lanternTest"),36)');
assert.equal(node('trophyShelf').children.length,36);assert.equal(node('lanternTest').children[0].children.length,12);
run('state.completed={};renderQuestPrize(8,3);renderRoomTrophy()');assert.equal(node('questPrize').hidden,true);assert.equal(node('roomTrophy').hidden,true);
console.log('PASS 36 unique trophies, quest eligibility, locked rewards, saved room choice, no replay XP, old progress, region crests and bounded lantern trail');

ctx.confirm=()=>true;
(async()=>{
  const completion={'0:0':true,'0:1':true,'0:2':true};
  ctx.importEvent={target:{value:'backup.json',files:[{size:100,text:async()=>JSON.stringify({game:'PythonMemoryQuest',version:5,state:{xp:300,completed:completion,reviews:[],displayTrophy:'0:0'}})}]}};
  await run('importProgress(importEvent)');assert.equal(run('state.displayTrophy'),'0:0');assert.equal(run('displayedTrophy().id'),'0:0');
  ctx.importEvent={target:{value:'backup.json',files:[{size:100,text:async()=>JSON.stringify({game:'PythonMemoryQuest',version:5,state:{xp:300,completed:completion,reviews:[],displayTrophy:'8:3'}})}]}};
  await run('importProgress(importEvent)');assert.equal(run('displayedTrophy().id'),'0:0');
  ctx.importEvent={target:{value:'backup.json',files:[{size:100,text:async()=>JSON.stringify({game:'PythonMemoryQuest',version:5,state:{xp:300,completed:completion,reviews:[],displayTrophy:'99:99'}})}]}};
  await run('importProgress(importEvent)');assert.equal(run('state.displayTrophy'),undefined);
  console.log('PASS progress backup restores earned display choice and blocks unearned or invalid trophy display');
})().catch(e=>{console.error(e);process.exitCode=1});
