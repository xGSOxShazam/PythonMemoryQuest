import json, re
from pathlib import Path
source=Path('python-worker.js').read_text(encoding='utf-8-sig')
runner=re.search(r'runPythonAsync\(`(.*?)`\)',source,re.S).group(1)
statements,result=runner.rsplit('json.dumps(',1)
def run(code,verify=''):
    ns={'_pmq_user_code':code,'_pmq_verify':verify,'_pmq_display':''}
    exec(statements,ns)
    return json.loads(eval('json.dumps('+result,ns))
r=run('energy = 75\nhp = 100 - 8\npet = "Nova"\ncoins = 5\ntools = ["wand", "book"]\ngate_open = False','energy == 100')
assert r['ok'] and not r['verified'] and r['stdout']==''
assert r['world']=={'energy':75,'hp':92,'coins':5,'pet':'Nova','tools':['wand','book'],'gate_open':False},r
r=run('pet = "x" * 300\ncoins = 10 ** 101\nenergy = float("nan")\nbag = list(range(20))\nshield = object()\ninventory = {"wand": 2}')
assert len(r['world']['pet'])==200 and len(r['world']['bag'])==12,r
assert r['world']['coins'] is None and r['world']['energy'] is None and r['world']['shield'] is None,r
assert r['world']['inventory']=={'wand':2},r
assert run('energy =')['world']=={}
assert run('print(energy)')['world']=={}
assert run('energy = 100','energy == 100')['world']['energy']==100
print('PASS actual Python snapshots, wrong values, isolation, errors, and bounded JSON')
