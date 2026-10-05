const missions = [
  {title:"Variables",subtitle:"Store information using names you can reuse.",challenges:[
    {type:"Recall",prompt:"Create a variable named energy and give it the integer value 100.",clue:"A variable uses: name = value",placeholder:"# Type the line from memory",why:"Typing syntax from memory builds stronger recall than simply recognizing the answer.",reward:100,test:a=>/^\s*energy\s*=\s*100\s*$/m.test(a),output:"energy stored as 100",success:"Exactly right. The name is energy, the equals sign assigns the value, and 100 is an integer."},
    {type:"Predict",prompt:"What will this code print?\n\nscore = 7\nscore = score + 3\nprint(score)",clue:"Read assignments from top to bottom. The second assignment replaces score.",placeholder:"Type only the output",why:"Prediction makes you mentally execute code before you see the result.",reward:90,test:a=>a.trim()==="10",output:"10",success:"Correct. score starts at 7, then becomes 10."},
    {type:"Debug",prompt:"Fix this code so the player's name is stored as text:\n\nplayer = Alex",clue:"Text values need quotation marks.",placeholder:"Rewrite the corrected line",why:"Debugging helps you recognize the difference between a variable name and a string value.",reward:110,test:a=>/^\s*player\s*=\s*["']Alex["']\s*$/m.test(a),output:"player stored as Alex",success:"Correct. Quotation marks make Alex a string."},
    {type:"Explain",prompt:"In your own words, what does the = symbol do in a Python assignment?",clue:"Think assign rather than compare.",placeholder:"Explain it in one or two sentences.",why:"Explaining a concept reveals whether you understand it or only remember its shape.",reward:120,test:a=>{const s=a.toLowerCase();return s.length>18&&(s.includes("assign")||s.includes("store")||s.includes("value"))&&(s.includes("variable")||s.includes("name"));},output:"Concept explanation accepted",success:"Good. In an assignment, = puts a value into a variable name."}
  ]},
  {title:"Conditionals",subtitle:"Make programs choose what happens next.",challenges:[
    {type:"Recall",prompt:"Write an if statement that prints \"Go\" when speed is greater than 30.",clue:"if condition:\n    indented_action",placeholder:"# Write the complete if statement",why:"You need to remember the colon and indentation, not just recognize them.",reward:120,test:a=>/if\s+speed\s*>\s*30\s*:\s*\n\s+print\s*\(\s*["']Go["']\s*\)/m.test(a),output:"Go   # when speed > 30",success:"Correct. Python uses a colon after the condition and indentation for the controlled block."},
    {type:"Predict",prompt:"What prints when temperature is 45?\n\ntemperature = 45\nif temperature > 50:\n    print(\"hot\")\nelse:\n    print(\"cool\")",clue:"45 > 50 is false, so the else block runs.",placeholder:"Type only the output",why:"Prediction builds the habit of evaluating a condition as True or False.",reward:100,test:a=>a.trim().toLowerCase()==="cool",output:"cool",success:"Correct. The condition is False, so else runs."},
    {type:"Debug",prompt:"Fix the syntax error:\n\nif lives > 0\n    print(\"keep playing\")",clue:"An if condition must end with a colon.",placeholder:"Rewrite the corrected code",why:"Syntax repair turns error messages into useful clues.",reward:110,test:a=>/if\s+lives\s*>\s*0\s*:\s*\n\s+print\s*\(\s*["']keep playing["']\s*\)/m.test(a),output:"keep playing",success:"Correct. The missing colon was the problem."}
  ]},
  {title:"Lists",subtitle:"Keep multiple values together and access them by position.",challenges:[
    {type:"Recall",prompt:"Create a list named tools containing \"hammer\", \"wrench\", and \"pliers\".",clue:"Lists use square brackets and commas.",placeholder:"# Build the list from memory",why:"You are recalling container syntax and string syntax at the same time.",reward:120,test:a=>/tools\s*=\s*\[\s*["']hammer["']\s*,\s*["']wrench["']\s*,\s*["']pliers["']\s*\]/m.test(a),output:"['hammer', 'wrench', 'pliers']",success:"Correct. Square brackets create a list."},
    {type:"Predict",prompt:"What prints?\n\nparts = [\"bolt\", \"nut\", \"washer\"]\nprint(parts[1])",clue:"Python starts counting list indexes at 0.",placeholder:"Type only the output",why:"Zero based indexing is easy to understand and easy to forget unless you retrieve it repeatedly.",reward:100,test:a=>a.trim().toLowerCase()==="nut",output:"nut",success:"Correct. Index 0 is bolt, index 1 is nut."},
    {type:"Build",prompt:"Create a list named parts with three part numbers, then print the first item.",clue:"Use list[index]. The first index is 0.",placeholder:"# Use any three part numbers",why:"Building with your own values makes the syntax more flexible in memory.",reward:150,test:a=>/parts\s*=\s*\[[^\]]*,[^\]]*,[^\]]*\]/m.test(a)&&/print\s*\(\s*parts\s*\[\s*0\s*\]\s*\)/m.test(a),output:"first part printed",success:"Correct. You created a list and retrieved its first item with index 0."}
  ]},
  {title:"Loops",subtitle:"Repeat work without repeating your code.",challenges:[
    {type:"Recall",prompt:"Loop through a list named parts and print each part.",clue:"for item in collection:",placeholder:"# Write the two line loop",why:"Loop syntax becomes automatic only after you repeatedly produce it yourself.",reward:130,test:a=>/for\s+part\s+in\s+parts\s*:\s*\n\s+print\s*\(\s*part\s*\)/m.test(a),output:"each part prints once",success:"Correct. part is the temporary loop variable and parts is the collection."},
    {type:"Predict",prompt:"How many times does this print \"build\"?\n\nfor i in range(4):\n    print(\"build\")",clue:"range(4) produces 0, 1, 2, 3.",placeholder:"Type only the number",why:"Predicting loop count prevents common off by one mistakes.",reward:100,test:a=>a.trim()==="4",output:"4",success:"Correct. range(4) repeats four times."},
    {type:"Build",prompt:"Use a loop to print the numbers 0 through 4 with range().",clue:"range(5) gives five values starting at 0.",placeholder:"# Write the loop",why:"This combines iteration, range, indentation, and printing.",reward:150,test:a=>/for\s+(\w+)\s+in\s+range\s*\(\s*5\s*\)\s*:\s*\n\s+print\s*\(\s*\1\s*\)/m.test(a),output:"0\n1\n2\n3\n4",success:"Correct. range(5) gives 0 through 4."}
  ]},
  {title:"Functions",subtitle:"Package reusable behavior into named blocks.",challenges:[
    {type:"Recall",prompt:"Write a function named double that takes number and returns number * 2.",clue:"def name(parameter):\n    return ...",placeholder:"# Write the whole function",why:"Functions require you to remember definition syntax, parameters, indentation, and return.",reward:160,test:a=>/def\s+double\s*\(\s*number\s*\)\s*:\s*\n\s+return\s+number\s*\*\s*2/m.test(a),output:"double(5) -> 10",success:"Correct. The parameter receives a value and return sends a result back."},
    {type:"Predict",prompt:"What prints?\n\ndef add(a, b):\n    return a + b\n\nprint(add(4, 6))",clue:"4 becomes a and 6 becomes b.",placeholder:"Type only the output",why:"Tracing arguments into parameters is essential for reading unfamiliar functions.",reward:110,test:a=>a.trim()==="10",output:"10",success:"Correct. add returns 4 + 6."},
    {type:"Debug",prompt:"Fix this function so it gives its result back:\n\ndef square(x):\n    x * x",clue:"Calculating a value is not the same as returning it.",placeholder:"Rewrite the corrected function",why:"This separates computing something from returning the result.",reward:140,test:a=>/def\s+square\s*\(\s*x\s*\)\s*:\s*\n\s+return\s+x\s*\*\s*x/m.test(a),output:"square(5) -> 25",success:"Correct. return makes the function result available to the caller."}
  ]},
  {title:"Dictionaries",subtitle:"Store values by meaningful keys instead of numeric positions.",challenges:[
    {type:"Recall",prompt:"Create a dictionary named part with keys \"number\" and \"qty\" set to \"A100\" and 4.",clue:'Dictionary shape: {"key": value}',placeholder:"# Build the dictionary",why:"This trains key and value syntax while mixing strings and integers.",reward:150,test:a=>{const s=a.replace(/\s+/g,"");return /part=\{/.test(s)&&/["']number["']:["']A100["']/.test(s)&&/["']qty["']:4/.test(s);},output:"{'number': 'A100', 'qty': 4}",success:"Correct. Dictionaries map keys to values."},
    {type:"Predict",prompt:"What prints?\n\njob = {\"id\": \"R2001\", \"qty\": 12}\nprint(job[\"id\"])",clue:"Use the key inside square brackets to retrieve its value.",placeholder:"Type only the output",why:"This reinforces the difference between list indexes and dictionary keys.",reward:100,test:a=>a.trim()==="R2001",output:"R2001",success:"Correct. The key id maps to the value R2001."}
  ]},
  {title:"Errors",subtitle:"Handle failure without crashing the whole program.",challenges:[
    {type:"Recall",prompt:"Write a try and except block that attempts x = int(value) and prints \"bad input\" if a ValueError happens.",clue:"try:\n    ...\nexcept ValueError:\n    ...",placeholder:"# Write the error handling block",why:"Error handling sticks when you practice the exact structure.",reward:170,test:a=>/try\s*:\s*\n\s+x\s*=\s*int\s*\(\s*value\s*\)\s*\n\s*except\s+ValueError\s*:\s*\n\s+print\s*\(\s*["']bad input["']\s*\)/m.test(a),output:"bad input   # only when conversion fails",success:"Correct. A ValueError is caught instead of stopping the program."}
  ]},
  {title:"Classes",subtitle:"Bundle data and behavior into reusable objects.",challenges:[
    {type:"Recall",prompt:"Start a class named Part and give it an __init__ method that receives number and stores it on self.",clue:"class Name:\n    def __init__(self, ...):",placeholder:"# Write the class",why:"Classes combine several Python conventions, so retrieval practice matters.",reward:190,test:a=>/class\s+Part\s*:\s*\n\s+def\s+__init__\s*\(\s*self\s*,\s*number\s*\)\s*:\s*\n\s+self\.number\s*=\s*number/m.test(a),output:"Part object can now store its own number",success:"Correct. self.number belongs to each Part object."}
  ]},
  {title:"Mini Project",subtitle:"Combine the fundamentals into something useful.",challenges:[
    {type:"Build",prompt:"Build a function named missing_qty(required, available). Return 0 when available is enough. Otherwise return required - available.",clue:"Use def, if, return, and subtraction.",placeholder:"# Build it from memory",why:"Real skill comes from combining ideas without being told each exact line.",reward:250,test:a=>/def\s+missing_qty\s*\(\s*required\s*,\s*available\s*\)\s*:/m.test(a)&&/if\s+available\s*>=\s*required\s*:\s*\n\s+return\s+0/m.test(a)&&/return\s+required\s*-\s*available/m.test(a),output:"missing_qty(10, 4) -> 6\nmissing_qty(10, 12) -> 0",success:"Excellent. You combined a function, parameters, a condition, and return values."},
    {type:"Explain",prompt:"Explain why returning 0 when available >= required is useful in this function.",clue:"Think about what a negative missing quantity would mean.",placeholder:"Explain it in your own words.",why:"Explaining the design proves you understand the logic, not only the syntax.",reward:180,test:a=>{const s=a.toLowerCase();return s.length>25&&(s.includes("negative")||s.includes("enough")||s.includes("missing"))&&(s.includes("0")||s.includes("zero"));},output:"logic explanation accepted",success:"Right. If you already have enough parts, the missing quantity should be zero, not negative."}
  ]}
];

missions.forEach((mission,index)=>{
  const additions=extraChallenges[index].map(spec=>({
    ...spec,reward:spec.type==="Predict"?100:150,
    placeholder:spec.type==="Predict"?"Type the output, with each line on a new line":"# Write your Python solution",
    why:spec.type==="Predict"?"Trace the code before running it. Every correct prediction lands a hit.":"Build working code from memory to clear this encounter.",
    success:spec.type==="Predict"?"Correct. You traced the code successfully.":"Correct. Your Python passed the challenge checks.",
    output:spec.expected||"Python checks passed",
    runtime:{setup:spec.setup||"",verify:spec.verify||"",expectedStdout:spec.expectedStdout},
    test:spec.type==="Predict"?(answer=>answer.trim().replace(/\r\n/g,"\n")===spec.expected):(answer=>Boolean(answer.trim()))
  }));
  mission.challenges.push(...additions);
});

const defaultState={xp:0,completed:{},attempts:{},streak:0,lastMission:0,lastChallenge:0,reviews:[],battles:{}};
let state=loadState();
let currentMission=Math.min(state.lastMission||0,missions.length-1);
const firstUnfinished=missions.findIndex((m,i)=>!m.challenges.every((_,c)=>state.completed[keyOfInitial(i,c)]));
function keyOfInitial(m,c){return m+":"+c;}
if(firstUnfinished>=0 && currentMission>firstUnfinished){currentMission=firstUnfinished;state.lastMission=currentMission;state.lastChallenge=missions[currentMission].challenges.findIndex((_,c)=>!state.completed[keyOfInitial(currentMission,c)]);}
let currentChallenge=Math.min(state.lastChallenge||0,missions[currentMission].challenges.length-1);
let reviewMode=false,reviewQueue=[],hintLevel=0;
let celebrationTimer=null;
let battleAnimationTimer=null;
const el=id=>document.getElementById(id);
const keyOf=(m,c)=>m+":"+c;

function loadState(){try{return Object.assign({},defaultState,JSON.parse(localStorage.getItem("pythonMemoryQuestState")||"{}"));}catch(e){return Object.assign({},defaultState);}}
function save(){localStorage.setItem("pythonMemoryQuestState",JSON.stringify(state));}
function totalChallenges(){return missions.reduce((n,m)=>n+m.challenges.length,0);}
function completedCount(){return Object.keys(state.completed).filter(k=>state.completed[k]).length;}
function currentLevel(){const next=missions.findIndex((m,i)=>!m.challenges.every((_,c)=>state.completed[keyOf(i,c)]));return next<0?missions.length:next+1;}
function rank(){const l=Math.floor(state.xp/500)+1;if(l>=7)return "Python Builder";if(l>=5)return "Python Explorer";if(l>=3)return "Python Apprentice";return "Python Rookie";}
function updateStats(){el("xpStat").textContent=state.xp;el("levelStat").textContent=currentLevel();el("rankLabel").textContent=rank();el("streakStat").textContent=state.streak||0;const pct=Math.round(completedCount()/totalChallenges()*100);el("progressText").textContent=pct+"%";el("progressFill").style.width=pct+"%";el("dueCount").textContent=state.reviews.filter(r=>r.due<=Date.now()).length;renderBattle();}
function isMissionUnlocked(i){if(i===0)return true;return missions[i-1].challenges.every((_,c)=>state.completed[keyOf(i-1,c)]);}
function renderMissionList(){el("missionList").innerHTML="";missions.forEach((m,i)=>{const b=document.createElement("button");const done=m.challenges.every((_,c)=>state.completed[keyOf(i,c)]);b.className="missionBtn"+(i===currentMission&&!reviewMode?" active":"")+(isMissionUnlocked(i)?"":" locked")+(done?" done":"");b.innerHTML='<span class="missionNum">'+(done?"✓":String(i+1).padStart(2,"0"))+'</span><span>'+m.title+'</span>';b.onclick=()=>{if(el("runBtn").disabled||lessonBusy||!isMissionUnlocked(i))return;saveBattleDraft();gameScreen="adventure";state.campfire=null;reviewMode=false;state.mapPosition=null;currentMission=i;currentChallenge=Math.max(0,m.challenges.findIndex((_,c)=>!state.completed[keyOf(i,c)]));state.lastMission=i;state.lastChallenge=currentChallenge;save();render();if(learningActive())el("lessonTitle").scrollIntoView({block:"start"});};el("missionList").appendChild(b);});}
function position(){return reviewMode&&reviewQueue.length?reviewQueue[0]:{m:currentMission,c:currentChallenge};}
function current(){const p=position();return missions[p.m].challenges[p.c];}
function render(){renderAdventure();el("runBtn").textContent="Run answer";renderMissionList();updateStats();const p=position(),m=missions[p.m],ch=current();hintLevel=0;el("missionMode").textContent=reviewMode?"SPACED REVIEW":"RETRIEVAL PRACTICE";el("missionTitle").textContent=reviewMode?"Review Arena: "+m.title:m.title;el("missionSubtitle").textContent=reviewMode?"An older skill is back. Try it before looking at the clue.":m.subtitle;el("challengeType").textContent=ch.type.toUpperCase()+" · CHALLENGE "+(p.c+1)+" / "+m.challenges.length;el("prompt").textContent=ch.prompt;el("whyText").textContent=ch.why;el("reward").textContent=reviewMode?Math.round(ch.reward*1.25):ch.reward;el("clueText").textContent="Hidden until you ask for it.";el("clueBox").style.opacity=".58";el("answerInput").value=reviewMode?"":state.drafts?.[keyOf(p.m,p.c)]||"";el("answerInput").placeholder=ch.placeholder||"";el("feedback").className="feedback";el("feedback").innerHTML='<div class="feedbackIcon">⌁</div><div><strong>Ready.</strong><p>Use the move you learned. If you get stuck, your guide can help.</p></div>';el("terminal").innerHTML='<div><span class="promptSign">$</span> python main.py</div><div class="muted">Waiting for your answer...</div>';el("nextBtn").style.display=state.completed[keyOf(p.m,p.c)]?"block":"none";document.querySelectorAll(".methodChip").forEach(c=>c.classList.toggle("current",c.textContent.toLowerCase()===ch.type.toLowerCase()));renderTeaching();}
function celebrate(gain,levelBefore){
  const layer=el("celebrationLayer");
  if(!layer)return;
  clearTimeout(celebrationTimer);
  layer.replaceChildren();
  const leveledUp=currentLevel()>levelBefore;
  const toast=document.createElement("div");
  toast.className="questToast"+(leveledUp?" levelUp":"");
  const emblem=document.createElement("span");
  emblem.className="questEmblem";
  emblem.setAttribute("aria-hidden","true");
  emblem.textContent=leveledUp?"★":"✦";
  const text=document.createElement("div");
  const title=document.createElement("strong");
  title.textContent=leveledUp?"LEVEL "+currentLevel()+" UNLOCKED!":gain?"ENCOUNTER CLEARED!":"SKILL REFRESHED!";
  const detail=document.createElement("span");
  detail.textContent=(gain?"+"+gain+" XP":"Already mastered")+(state.streak>=3?" · "+state.streak+" answer combo!":" · Nice work, adventurer!");
  text.append(title,detail);
  toast.append(emblem,text);
  layer.append(toast);
  el("celebrationStatus").textContent=title.textContent+" "+detail.textContent;
  if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    const rect=el("runBtn").getBoundingClientRect();
    const x=rect.left+rect.width/2,y=rect.top+rect.height/2;
    for(let i=0;i<24;i++){
      const spark=document.createElement("span");
      spark.className="xpSpark";
      const angle=(Math.PI*2*i)/24;
      const distance=65+Math.random()*100;
      spark.style.left=x+"px";spark.style.top=y+"px";
      spark.style.setProperty("--dx",Math.cos(angle)*distance+"px");
      spark.style.setProperty("--dy",Math.sin(angle)*distance-65+"px");
      spark.style.setProperty("--spin",(Math.random()*540)+"deg");
      spark.style.setProperty("--spark-color",["var(--cyan)","var(--yellow)","var(--green)","var(--purple)"][i%4]);
      spark.setAttribute("aria-hidden","true");
      layer.append(spark);
    }
    el("xpStat").animate([{transform:"scale(1)"},{transform:"scale(1.45)",color:"#ffd43b"},{transform:"scale(1)"}],{duration:600});
    document.querySelector(".avatar").animate([{transform:"translateY(0) rotate(0)"},{transform:"translateY(-9px) rotate(-12deg)"},{transform:"translateY(0) rotate(0)"}],{duration:500});
  }
  celebrationTimer=setTimeout(()=>layer.replaceChildren(),3200);
}
function scheduleReview(m,c,hard){state.reviews=state.reviews.filter(r=>!(r.m===m&&r.c===c));const delay=hard?15*60*1000:24*60*60*1000;state.reviews.push({m:m,c:c,due:Date.now()+delay});}
function showHint(){const ch=current();hintLevel++;el("clueBox").style.opacity="1";el("clueText").textContent=ch.clue+(hintLevel>1?"\n\nWrite the smallest correct answer first. Do not make it fancy.":"");}
function escapeHtml(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>");}

let pythonWorker=null;
let workerReady=false;
let workerError=null;
let workerSequence=0;
const pendingRuns=new Map();

function setRuntimeStatus(text,ok=false){
  const node=el("runtimeStatus");
  if(!node)return;
  node.textContent=(ok?"● ":"◌ ")+text;
  node.style.color=ok?"var(--green)":"var(--yellow)";
}
function createPythonWorker(){
  try{
    if(pythonWorker) pythonWorker.terminate();
    workerReady=false;
    workerError=null;
    setRuntimeStatus("LOADING PYTHON");
    pythonWorker=new Worker("python-worker.js?v=4",{type:"module"});
    pythonWorker.onmessage=(event)=>{
      const msg=event.data||{};
      if(msg.type==="ready"){
        workerReady=true;
        setRuntimeStatus("PYTHON READY",true);
        return;
      }
      if(msg.type==="runtime-error" && !msg.id){
        workerReady=false;
        workerError=new Error(msg.error||"Python runtime could not start in this browser.");
        setRuntimeStatus("PYTHON UNAVAILABLE");
        return;
      }
      if(msg.id && pendingRuns.has(msg.id)){
        const pending=pendingRuns.get(msg.id);
        pendingRuns.delete(msg.id);
        clearTimeout(pending.timer);
        if(msg.type==="result") pending.resolve(msg.result);
        else pending.reject(new Error(msg.error||"Python runtime error"));
      }
    };
    pythonWorker.onerror=()=>{
      workerReady=false;
      workerError=new Error("Python runtime could not start in this browser.");
      setRuntimeStatus("PYTHON UNAVAILABLE");
      for(const pending of pendingRuns.values()){
        clearTimeout(pending.timer);
        pending.reject(new Error("Python runtime could not start in this browser."));
      }
      pendingRuns.clear();
    };
    return true;
  }catch(error){
    pythonWorker=null;
    workerReady=false;
    workerError=error;
    setRuntimeStatus("PYTHON UNAVAILABLE");
    return false;
  }
}
function waitForWorkerReady(){
  if(workerReady)return Promise.resolve();
  if(!pythonWorker && !createPythonWorker()){
    return Promise.reject(new Error("Python runtime could not start in this browser."));
  }
  return new Promise((resolve,reject)=>{
    const started=Date.now();
    const check=()=>{
      if(workerReady)return resolve();
      if(workerError)return reject(workerError);
      if(Date.now()-started>90000)return reject(new Error("Python took too long to load. Check your connection and refresh the page."));
      setTimeout(check,100);
    };
    check();
  });
}
async function executePython(code,setup="",verify="",display=""){
  await waitForWorkerReady();
  const id="run-"+(++workerSequence);
  return new Promise((resolve,reject)=>{
    const timer=setTimeout(()=>{
      pendingRuns.delete(id);
      createPythonWorker();
      reject(new Error("Your code ran too long and was stopped. Check for an infinite loop."));
    },4000);
    pendingRuns.set(id,{resolve,reject,timer});
    pythonWorker.postMessage({id,type:"run",code,setup,verify,display});
  });
}
function runtimeConfigFor(p){
  const configs={
    "0:0":{verify:'energy == 100 and isinstance(energy, int)',display:'print("energy =", energy)'},
    "0:2":{verify:'player == "Alex"',display:'print("player =", player)'},
    "1:0":{setup:"speed = 31",display:'print("condition executed successfully")'},
    "1:2":{setup:"lives = 1",display:'print("keep playing")'},
    "2:0":{verify:'tools == ["hammer", "wrench", "pliers"]',display:'print(tools)'},
    "3:0":{setup:"parts = ['A100', 'B200', 'C300']"},
    "4:0":{verify:'double(5) == 10',display:'print("double(5) =", double(5))'},
    "4:2":{verify:'square(5) == 25',display:'print("square(5) =", square(5))'},
    "5:0":{verify:'part.get("number") == "A100" and part.get("qty") == 4',display:'print(part)'},
    "6:0":{setup:"value = 'not-a-number'"},
    "7:0":{verify:'Part("A100").number == "A100"',display:'print("Part object created successfully")'},
    "8:0":{verify:'missing_qty(10, 4) == 6 and missing_qty(10, 12) == 0',display:'print("missing_qty(10, 4) =", missing_qty(10, 4)); print("missing_qty(10, 12) =", missing_qty(10, 12))'}
  };
  return missions[p.m].challenges[p.c].runtime||configs[keyOf(p.m,p.c)]||{};
}
function isCodeChallenge(ch){
  return ch.type!=="Predict" && ch.type!=="Explain";
}
async function runAnswer(){if(gameScreen!=="adventure"||el("runBtn").disabled||lessonBusy||learningActive())return;el("nextBtn").style.display="none";const ch=current(),answer=el("answerInput").value,p=position(),k=keyOf(p.m,p.c);if(!answer.trim()){el("feedback").textContent="Write an answer first. Your hero keeps their HP.";return;}if(!reviewMode&&battleFor(p.m).hp<=0){el("battleMessage").textContent="Your hero needs a rest. Click Revive hero to continue.";el("reviveBtn").focus();return;}state.attempts[k]=(state.attempts[k]||0)+1;let ok=false;let runtimeResult=null;try{ok=!!ch.test(answer);}catch(e){ok=false;}
if(ok&&isCodeChallenge(ch)){
  el("runBtn").disabled=true;
  el("runBtn").textContent="Running Python...";
  el("useSkillBtn").disabled=true;
  el("terminal").innerHTML='<div><span class="promptSign">$</span> python main.py</div><div class="muted">Executing real Python...</div>';
  try{
    const runtimeConfig=runtimeConfigFor(p);
    runtimeResult=await executePython(
      answer,
      runtimeConfig.setup||"",
      runtimeConfig.verify||"",
      runtimeConfig.display||""
    );
    if(runtimeConfig.expectedStdout!==undefined && (runtimeResult.stdout||"").trim()!==runtimeConfig.expectedStdout)runtimeResult.verified=false;
    if(!runtimeResult.ok || runtimeResult.verified===false)ok=false;
  }catch(error){
    ok=false;
    runtimeResult={ok:false,stdout:"",stderr:error.message||String(error)};
  }finally{
    el("runBtn").disabled=false;
    el("runBtn").textContent="Run answer";
  }
}
if(ok){el("mistakeCoach").hidden=true;el("coachAdvice").hidden=true;el("runBtn").textContent="Run answer";const levelBefore=currentLevel();const first=!state.completed[k],gain=Math.round((reviewMode?ch.reward*1.25:ch.reward)*(hintLevel?.8:1));const awarded=first||reviewMode?gain:0;state.xp+=awarded;state.completed[k]=true;battleOutcome(true,first,p);state.streak=(state.streak||0)+1;scheduleReview(p.m,p.c,hintLevel||state.attempts[k]>1);save();el("feedback").className="feedback good";el("feedback").innerHTML='<div class="feedbackIcon">✓</div><div><strong>Correct. '+(awarded?"+"+awarded+" XP":"Already mastered.")+'</strong><p>'+ch.success+'</p></div>';if(runtimeResult){
  const printed=(runtimeResult.stdout||"").trim();
  el("terminal").innerHTML='<div><span class="promptSign">$</span> python main.py</div><div class="success">'+(printed?escapeHtml(printed):'Program completed successfully.<br><span class="muted">No printed output.</span>')+'</div>';
}else{
  el("terminal").innerHTML='<div><span class="promptSign">$</span> python main.py</div><div class="success">'+escapeHtml(ch.output)+'</div>';
}el("nextBtn").style.display="block";updateStats();renderMissionList();renderAdventure();renderVillageShell();celebrate(awarded,levelBefore);announceReward(p.m);}else{el("runBtn").disabled=false;el("runBtn").textContent="Try again";state.streak=0;battleOutcome(false,false,p);save();updateStats();el("feedback").className="feedback bad";el("feedback").innerHTML='<div class="feedbackIcon">!</div><div><strong>Attempt '+state.attempts[k]+': try again.</strong><p>'+(k==="0:2"?"Put the name Alex in quotation marks, with a capital A. Python text is case-sensitive.":"Edit your answer, then click Try again. Check names, punctuation, and indentation; Use hint can help.")+'</p></div>';const detail=runtimeResult&&runtimeResult.stderr?runtimeResult.stderr:(runtimeResult&&runtimeResult.verified===false?"Your Python ran, but the result did not match the challenge yet.":"Answer checked. Edit your answer and try again.");teachingFeedback(p,runtimeResult);el("terminal").innerHTML='<div><span class="promptSign">$</span> python main.py</div><div class="error">'+escapeHtml(detail)+'</div>';}}
const levelRewards=[
  {name:"Crystal Staff",kind:"Equipment upgrade",description:"Normal attacks gain +2 damage.",attack:2},
  {name:"Arcane Bolt",kind:"Skill unlocked",description:"Charge with 6 new challenges, then deal 25 bonus damage.",skill:{id:"arcane",name:"Arcane Bolt",damage:25}},
  {name:"Runic Robe",kind:"Equipment upgrade",description:"Wrong answers cost 2 less HP.",armor:2},
  {name:"Frost Nova",kind:"Skill unlocked",description:"Charge with 6 new challenges, then deal 40 bonus damage.",skill:{id:"frost",name:"Frost Nova",damage:40}},
  {name:"Storm Staff",kind:"Equipment upgrade",description:"Normal attacks gain another +3 damage.",attack:3},
  {name:"Phoenix Flame",kind:"Skill unlocked",description:"Charge with 6 new challenges, then deal 55 bonus damage.",skill:{id:"phoenix",name:"Phoenix Flame",damage:55}},
  {name:"Heartstone Charm",kind:"Equipment upgrade",description:"Maximum hero HP increases by 20.",health:20},
  {name:"Dragonbreaker",kind:"Skill unlocked",description:"Charge with 6 new challenges, then deal 70 bonus damage.",skill:{id:"breaker",name:"Dragonbreaker",damage:70}},
  {name:"Dragonplate Robe",kind:"Equipment upgrade",description:"Wrong answers cost another 2 less HP.",armor:2}
];
function missionCleared(m){return missions[m].challenges.every((_,c)=>state.completed[keyOf(m,c)]);}
function heroGear(exclude=-1){
  const gear={attack:10,armor:0,maxHp:100,skills:[],items:[]};
  const equipment=equipmentFor(exclude);
  Object.values(equipment).forEach(id=>{const item=gearItems.find(i=>i.id===id);if(!item)return;gear.attack+=item.attack||0;gear.armor+=item.armor||0;gear.maxHp+=item.health||0;if(!item.starter)gear.items.push(item.name);});
  levelRewards.forEach((reward,m)=>{if(m!==exclude&&missionCleared(m)&&reward.skill)gear.skills.push(reward.skill);});
  return gear;
}
function battleFor(m){
  if(!state.battles||typeof state.battles!=="object")state.battles={};
  if(!state.battles[m]||!Number.isFinite(state.battles[m].hp))state.battles[m]={hp:heroGear().maxHp};
  const battle=state.battles[m];
  if(!Number.isFinite(battle.damageDealt))battle.damageDealt=missions[m].challenges.filter((_,c)=>state.completed[keyOf(m,c)]).length*10;
  if(!Number.isFinite(state.skillCharge))state.skillCharge=0;
  return battle;
}
function encounterMax(c,m=position().m){return c===11?(m===8?150:30):10;}
function encounterBattle(p){const battle=battleFor(p.m);if(!battle.encounters)battle.encounters={};if(!battle.encounters[p.c])battle.encounters[p.c]={damage:0};return battle.encounters[p.c];}
function bossHealth(m,c=position().c){return state.completed[keyOf(m,c)]?0:Math.max(0,encounterMax(c,m)-encounterBattle({m,c}).damage);}
function renderBattle(){
  if(!el("battleDock"))return;
  const p=position(),mission=missions[p.m],battle=battleFor(p.m),gear=heroGear();
  el('battleDock').classList.toggle('hasCombatSkill',gear.skills.length>0);
  const hits=mission.challenges.filter((_,c)=>state.completed[keyOf(p.m,c)]).length;
  const hp=Math.max(0,Math.min(gear.maxHp,battle.hp)),bossHp=bossHealth(p.m,p.c);const enemyMax=encounterMax(p.c);renderEnemy(p);
  el("battleLabel").textContent=reviewMode?"REVIEW TRAINING":"LEVEL "+(p.m+1)+" · "+mission.title.toUpperCase();
  el("heroHpText").textContent=hp+" / "+gear.maxHp+" HP";
  el("bossHpText").textContent=bossHp+" / "+enemyMax+" HP";
  el("heroHpFill").style.width=(100*hp/gear.maxHp)+"%";
  el("bossHpFill").style.width=(100*bossHp/enemyMax)+"%";
  el("heroHpBar").setAttribute("aria-valuenow",String(hp));
  el("heroHpBar").setAttribute("aria-valuemax",String(gear.maxHp));
  el("bossHpBar").setAttribute("aria-valuenow",String(bossHp));
  el("bossHpBar").setAttribute("aria-valuemax",String(enemyMax));
  el("battleProgress").textContent=hits+" / "+mission.challenges.length+" challenges cleared";
  el("reviveBtn").hidden=hp>0||reviewMode;
  el("battleDock").classList.toggle("bossDefeated",bossHp===0);
  el("battleDock").classList.toggle("heroDown",hp===0&&!reviewMode);
  el("battleDock").classList.toggle("upgradedHero",gear.items.length>0);
  const gearText=gear.items.length?gear.items.join(" · "):"Starter wand and robe";
  el("gearSummary").textContent=gearText+" · Attack "+gear.attack+" · Armor "+gear.armor;
  el("nextReward").textContent=missionCleared(p.m)?"Earned: "+levelRewards[p.m].name:"Level reward: "+levelRewards[p.m].name;
  const select=el("skillSelect");select.replaceChildren();
  gear.skills.forEach(skill=>{const option=document.createElement("option");option.value=skill.id;option.textContent=skill.name+" ("+skill.damage+" damage)";select.append(option);});
  if(!gear.skills.length){const option=document.createElement("option");option.value="";option.textContent="First skill unlocks after level 2";select.append(option);}
  if(!gear.skills.some(skill=>skill.id===state.activeSkill))state.activeSkill=gear.skills.length?gear.skills[gear.skills.length-1].id:null;
  select.value=state.activeSkill||"";select.disabled=gear.skills.length<2;
  const skill=gear.skills.find(skill=>skill.id===state.activeSkill);
  el("skillChargeText").textContent=skill?(state.skillCharge>=6?"READY TO CAST":"Charge "+state.skillCharge+" / 6 new challenges"):"Complete level 2 to learn Arcane Bolt";
  el("skillChargeFill").style.width=(100*Math.min(6,state.skillCharge)/6)+"%";
  const usable=!!skill&&state.skillCharge>=6&&hp>0&&bossHp>0&&!reviewMode&&!el("runBtn").disabled&&!lessonBusy&&!learningActive();
  el("useSkillBtn").disabled=!usable;
  el("useSkillBtn").textContent=skill?"Cast "+skill.name:"Skill locked";
  el("skillControls").classList.toggle("skillReady",usable);
  if(hp===0&&!reviewMode)el("battleMessage").textContent="Hero down! Revive to full HP. Your progress is safe.";
  else if(missionCleared(p.m))el("battleMessage").textContent="Level cleared! "+levelRewards[p.m].name+" earned.";
  else if(bossHp===0)el("battleMessage").textContent=state.completed[keyOf(p.m,p.c)]?"Encounter cleared! Continue along the map.":"Enemy defeated! Solve the challenge to open the route.";
  else if(reviewMode)el("battleMessage").textContent="Practice arena · Review answers do not cost HP or charge skills.";
  else el("battleMessage").textContent="Correct: enemy −"+(p.c===11?gear.attack*(p.m===8?10:3):gear.attack)+" HP · Wrong: hero −"+Math.max(1,8-gear.armor)+" HP";
}
function animateBattle(kind,damage){
  const dock=el("battleDock");clearTimeout(battleAnimationTimer);
  dock.classList.remove("heroAttacks","dragonAttacks","skillAttacks");void dock.offsetWidth;
  dock.classList.add(kind);el("battleHit").textContent=damage;
  battleAnimationTimer=setTimeout(()=>dock.classList.remove("heroAttacks","dragonAttacks","skillAttacks"),1400);
}
function battleOutcome(ok,first,p){
  if(reviewMode)return;
  const battle=battleFor(p.m),gear=heroGear(first&&missionCleared(p.m)?p.m:-1);const damage=gear.attack*(p.c===11?(p.m===8?10:3):1);
  if(ok&&first){encounterBattle(p).damage+=damage;battle.damageDealt+=damage;if(gear.skills.length)state.skillCharge=Math.min(6,state.skillCharge+1);}
  if(!ok&&!state.completed[keyOf(p.m,p.c)])battle.hp=Math.max(0,battle.hp-Math.max(1,8-gear.armor));
  animateBattle(ok?"heroAttacks":"dragonAttacks",ok?(first?"−"+damage:"PRACTICE"):"−"+Math.max(1,8-gear.armor));
}
function useSkill(){
  const p=position(),battle=battleFor(p.m),skill=heroGear().skills.find(s=>s.id===state.activeSkill);
  if(gameScreen!=="adventure"||!skill||state.skillCharge<6||battle.hp<=0||bossHealth(p.m)<=0||reviewMode||el("runBtn").disabled||lessonBusy||learningActive())return;
  encounterBattle(p).damage+=skill.damage;battle.damageDealt+=skill.damage;state.skillCharge=0;
  save();renderBattle();animateBattle("skillAttacks","−"+skill.damage);
  el("battleMessage").textContent=skill.name+" hits for "+skill.damage+" bonus damage!"+(bossHealth(p.m)===0?" Solve this encounter to open the route.":" Recharge with 6 new challenges.");
}
function reviveHero(){
  if(el("runBtn").disabled||lessonBusy)return;
  battleFor(position().m).hp=heroGear().maxHp;
  save();renderBattle();el("battleMessage").textContent="Back in the fight! Edit your answer and try again.";el("answerInput").focus();
}
function announceReward(m){
  if(reviewMode||!missionCleared(m))return;
  if(!state.rewardNotices)state.rewardNotices={};
  if(state.rewardNotices[m])return;
  state.rewardNotices[m]=true;equipNewReward(m);save();
  const reward=levelRewards[m];
  modal(reward.kind+": "+reward.name,reward.description+" All 12 challenges are complete. Your equipment is in the Backpack. Click Next challenge to enter the next region.");
}
function modal(title,text){el("modalTitle").textContent=title;el("modalText").textContent=text;el("modalWrap").style.display="flex";}
function nextChallenge(){
  if(gameScreen!=="adventure"||el("runBtn").disabled||lessonBusy)return;
  if(!state.completed[keyOf(position().m,position().c)])return;
  saveBattleDraft();
  if(reviewMode){reviewQueue.shift();if(!reviewQueue.length){reviewMode=false;showVillage();modal("Request complete!","You helped your neighbors remember their Python moves. Come back for another adventure whenever you are ready.");}else render();return;}
  const finished={m:currentMission,c:currentChallenge},m=missions[currentMission];
  if(currentChallenge<m.challenges.length-1)currentChallenge++;
  else if(currentMission<missions.length-1&&missionCleared(currentMission)){currentMission++;currentChallenge=0;}
  state.lastMission=currentMission;state.lastChallenge=currentChallenge;state.mapPosition=null;save();
  if(finished.c%3===2&&questCleared(finished.m,Math.floor(finished.c/3))){enterCampfire(finished.m,finished.c);return;}
  render();if(learningActive())el("lessonTitle").scrollIntoView({block:"start"});
}
function startReview(){if(el("runBtn").disabled||lessonBusy)return;const due=state.reviews.filter(r=>r.due<=Date.now());if(!due.length){const completed=Object.keys(state.completed).filter(k=>state.completed[k]);if(!completed.length){modal("Nothing to review yet","Complete at least one challenge first. Review Arena will bring learned skills back later.");return;}reviewQueue=completed.slice(-Math.min(5,completed.length)).map(k=>{const p=k.split(":").map(Number);return{m:p[0],c:p[1]};});}else reviewQueue=due.slice(0,6);gameScreen="adventure";reviewMode=true;render();}

el("reviveBtn").onclick=reviveHero;
el("useSkillBtn").onclick=useSkill;
el("skillSelect").onchange=()=>{state.activeSkill=el("skillSelect").value;save();renderBattle();};
el("hintBtn").onclick=showHint;
el("runBtn").onclick=runAnswer;
el("nextBtn").onclick=nextChallenge;
el("reviewBtn").onclick=startReview;
el("modalClose").onclick=()=>el("modalWrap").style.display="none";
el("resetBtn").onclick=()=>{if(el("runBtn").disabled||lessonBusy)return;if(confirm("Reset all Python Memory Quest progress?")){localStorage.removeItem("pythonMemoryQuestState");location.reload();}};
el("answerInput").addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key==="Enter")runAnswer();if(e.key==="Tab"){e.preventDefault();const t=e.target,s=t.selectionStart,en=t.selectionEnd;t.value=t.value.substring(0,s)+"    "+t.value.substring(en);t.selectionStart=t.selectionEnd=s+4;}});
if(typeof ResizeObserver!=="undefined"){
  const battleResizeObserver=new ResizeObserver(()=>{
    const spacing=Math.ceil(el("battleDock").getBoundingClientRect().height)+36;
    document.querySelector(".main").style.paddingBottom=spacing+"px";
    document.documentElement.style.scrollPaddingBottom=spacing+"px";
  });
  battleResizeObserver.observe(el("battleDock"));
}
initAdventure();
initTeaching();
initVillage();
render();
setTimeout(()=>createPythonWorker(),0);
