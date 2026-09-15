#!/usr/bin/env python3
"""Integrity check: every artifact upstream lists for the scraped models must exist locally
(models-real/<slug>/, models/<slug>/ or models/) with the exact upstream byte size — or the
served size the scraper recorded — and a sane file header.

Usage: python3 verify-downloads.py <details.json> [ModelA,ModelB]   (exit 1 on any mismatch)"""
import json, os, re, sys, hashlib
ROOT=os.path.dirname(os.path.abspath(__file__))
details_path=sys.argv[1] if len(sys.argv)>1 else ROOT+'/api_all_details.json'
only=set(sys.argv[2].split(',')) if len(sys.argv)>2 else None
def slug(n):
    import unicodedata
    s=unicodedata.normalize('NFKD',n); s=re.sub(r'[^\w\s-]','',s).strip(); s=re.sub(r'[\s_]+','-',s); s=re.sub(r'-+','-',s); return s.lower()
def find(name, sl, size=0):
    # Prefer the copy whose length matches upstream: models/ is flat and a same-named file
    # from another model may sit there, while the model's own snapshot dir holds the right one.
    paths=[p for p in (f'{ROOT}/models-real-20260713/{sl}/{name}', f'{ROOT}/models/{sl}/{name}', f'{ROOT}/models/{name}') if os.path.isfile(p)]
    for p in paths:
        if size and os.path.getsize(p)==size: return p
    return paths[0] if paths else None
def header_ok(path):
    with open(path,'rb') as f: h=f.read(16)
    ext=os.path.splitext(path)[1].lower()
    name=os.path.basename(path)
    if ext=='.om':
        # NNN (dlite) vs SVP_NNN (PICO) offline models; upstream also ships zip bundles
        # named .om ("改后缀为zip解压后使用" = rename to .zip and extract).
        ok = h[:4] in (b'IMOD', b'PICO') or (h[:2]==b'PK' and 'zip' in name.lower())
        return ok, h[:4]
    if ext=='.onnx': return h[:1] in (b'\x08',b'\x0a',b'\x12') , h[:4]   # protobuf field tags
    if ext=='.zip': return h[:2]==b'PK', h[:4]
    # torch checkpoints: zip (>=1.6), pickle, or the legacy tar container ("././@..." / ustar)
    if ext in ('.pth','.pt'): return h[:2]==b'PK' or h[:2]==b'\x80\x02' or h[:2]==b'./' or h[:4]==b'\x80\x02\x8a\n', h[:4]
    return True, h[:4]
d=json.load(open(details_path))
tot=ok=bad=0
for r in d:
    if only and r['name'] not in only: continue
    ad=r.get('apiDetail') or {}
    want=[]
    for om in ad.get('originModel') or []: want.append(('origin', om['name'], int(om.get('size') or 0), om.get('id')))
    for a in ad.get('modelAdaptor') or []:
        for q in a.get('supportQuantify') or []:
            for om in q.get('omOfflineModel') or []: want.append((f"om/{a['name']}/{q['name']}", om['name'], int(om.get('size') or 0), om.get('id')))
    print(f"== {r['name']} ({r['id']}) ==")
    # Scraped rows carry fileId + the canonical local name (aliased when two variants share
    # the upstream filename); look the file up by that name, falling back to the API name.
    id_to_local={}; served={}
    for row in r.get('downloadUrls') or []:
        if row.get('fileId') and row.get('name') and str(row.get('source','')).startswith(('om-','source-')):
            id_to_local.setdefault(str(row['fileId']), row['name'])
            # served-size policy: a completed download whose length differs from upstream's
            # declaration is kept; the served byte count is the truth for the mirror.
            if row.get('declaredSize') and row.get('size') and int(row['size'])!=int(row['declaredSize']):
                served[str(row['fileId'])]=int(row['size'])
    for kind,name,size,fid in want:
        if size and size < 1024:
            print(f"   PLACEHDR {kind:30s} {name}  ({size} B upstream placeholder, not mirrored)"); continue
        tot+=1
        declared=size
        if str(fid) in served:
            size=served[str(fid)]
        local_name=id_to_local.get(str(fid), name)
        sl=slug(r['name']); p=find(local_name, sl, size)
        if not p:
            print(f"   MISSING  {kind:30s} {name}  (upstream {size} B)"); bad+=1; continue
        actual=os.path.getsize(p)
        hok,magic=header_ok(p)
        status='OK' if (actual==size and hok) else 'BAD'
        if status=='OK': ok+=1
        else: bad+=1
        where='models-real/' if '/models-real-20260713/' in p else ('models/'+sl+'/' if p.startswith(ROOT+'/models/'+sl+'/') else 'models/')
        served_note = f' (served; upstream metadata declares {declared})' if declared!=size else ''
        print(f"   {status:7s}  {kind:30s} {name}{'' if local_name==name else ' -> '+local_name}  size={actual}{'' if actual==size else f' != upstream {size}'}{served_note} magic={magic!r} in {where}")
print(f"\nTOTAL {tot}  ok={ok}  bad/missing={bad}")
sys.exit(1 if bad else 0)
