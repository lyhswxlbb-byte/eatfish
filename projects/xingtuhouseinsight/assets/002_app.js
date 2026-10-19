const DATA = window.XINGTU_DATA;
const state = { week: DATA.defaultWeek || DATA.weeks?.[0]?.id || 'default', track: '全部' };
const metricLabel = { spend:'消耗', cpa3:'CPA3', cpe:'CPE', search_rate:'看后搜率', search_cost:'看后搜成本', boost_ratio:'星推比' };
const metricTip = { spend:'金额区间', cpa3:'转化成本区间', cpe:'互动成本区间', search_rate:'搜索意愿区间', search_cost:'搜索成本区间', boost_ratio:'加热比例区间' };
function esc(s){ return String(s ?? '—').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
function emphasis(s){
  let text=esc(s);
  text=text.replace(/(做得好的核心是：|关键画面证据：|视频具体讲了什么|画面具体是什么|素材亮点|怎么复刻|商品怎么接)/g,'<mark class="hl-core">$1</mark>');
  text=text.replace(/(\d+(?:\.\d+)?%?|\d{2}:\d{2}|Top\s*\d+)/g,'<mark class="hl-data">$1</mark>');
  text=text.replace(/([“「][^”」]{2,30}[”」])/g,'<mark class="hl-quote">$1</mark>');
  return text;
}
function weeks(){ return DATA.weeks || [{ id:'default', label:'上一周｜2026-10-05 至 2026-10-11', items:DATA.items || [], source:DATA.source || '' }]; }
function currentWeek(){ return weeks().find(w=>w.id===state.week) || weeks()[0]; }
function currentTracks(){ return DATA.tracks || Array.from(new Set((currentWeek().items||[]).map(i=>i.industry4).filter(Boolean))); }
function renderWeeks(){
  const select=document.getElementById('weekSelect');
  if(!select) return;
  select.innerHTML=weeks().map(w=>`<option value="${esc(w.id)}" ${state.week===w.id?'selected':''}>${esc(w.label)}</option>`).join('');
  select.onchange=()=>{state.week=select.value;state.track='全部';renderChips();renderCards();};
}
function renderChips(){
  const chips = ['全部', ...currentTracks()];
  document.getElementById('trackChips').innerHTML = chips.map(t=>`<button class="chip ${state.track===t?'active':''}" data-track="${esc(t)}">${esc(t)}</button>`).join('');
  document.querySelectorAll('.chip').forEach(btn=>btn.addEventListener('click',()=>{state.track=btn.dataset.track;renderCards();}));
}
function currentItems(){let list=[...(currentWeek().items||[])]; if(state.track!=='全部') list=list.filter(i=>i.industry4===state.track); return list.sort((a,b)=>(a.industry4||'').localeCompare(b.industry4||'','zh')||(a.rank_in_track||999)-(b.rank_in_track||999));}
function metrics(item){return ['spend','cpa3','cpe','search_rate','search_cost','boost_ratio'].map((k,idx)=>`<div class="metric m${idx}"><label>${metricLabel[k]}</label><strong>${esc(item.ranges?.[k])}</strong><span>${metricTip[k]}</span></div>`).join('')}
function chips(item){return (item.analysis2?.chips||[]).map((c,i)=>`<span class="insight-chip c${i}">${esc(c)}</span>`).join('')}
function rows(item){const a=item.analysis2||{}; const list=a.breakdownRows||[['内容定位',a.why_good,''],['首屏钩子',a.hook,''],['产品承接',a.structure,''],['画面动作',a.visual,''],['转化动作',a.conversion,'']].map(([module,detail,evidence])=>({module,detail,evidence})); return list.map((r,i)=>`<div class="analysis-row c${i}"><b>${emphasis(r.module)}</b><span>${emphasis(r.detail)}${r.evidence?`<em>${emphasis(r.evidence)}</em>`:''}</span></div>`).join('')}
function timeline(item){return (item.timeline2||[]).map(t=>`<div class="timeline-step"><span class="time">${esc(t.time)}</span><span class="stage">${emphasis(t.stage)}</span>${t.speech?`<p><b>话术/字幕</b>${emphasis(t.speech)}</p>`:''}${t.visual?`<p><b>画面</b>${emphasis(t.visual)}</p>`:''}${t.why?`<p><b>作用</b>${emphasis(t.why)}</p>`:''}</div>`).join('')}
function visual(item){return `<img src="${esc(item.cover)}" alt="真实视频截图" loading="lazy"><div class="phone-badge">真实视频</div>`}
function renderCards(){
 const list=currentItems(); const week=currentWeek(); document.getElementById('resultCount').textContent=`${week.label}｜${list.length} 条素材`;
 document.getElementById('cardList').innerHTML=list.map(item=>{
  const title=item.page_title||item.video_title;
  return `<article class="material-card">
    <aside class="visual-rail"><div class="visual-title"><span class="rank">${esc(item.industry4)}｜Top ${esc(item.rank_in_track)}</span><h3>${esc(title)}</h3><div class="meta-tags"><span>达人 ${esc(item.creator)}</span><span>粉丝 ${esc(item.fan_level)}</span><span>标签 ${esc(item.content_tag)}</span><span>发布 ${esc(item.publish_date)}</span></div></div><div class="phone-frame">${visual(item)}</div></aside>
    <section class="content-panel"><div class="card-top"><div><span class="status">${esc(item.status)}</span><div class="insight-chips">${chips(item)}</div></div><a class="open-btn" href="${esc(item.canonical_url||item.video_url)}" target="_blank" rel="noreferrer">打开原视频</a></div><div class="metrics">${metrics(item)}</div><div class="focus-box"><b>重点结论</b><span>${emphasis(item.analysis2?.summary)}</span></div><details class="analysis-fold"><summary>素材关键拆解</summary><div class="analysis-list">${rows(item)}</div></details><details class="timeline-fold"><summary>按秒拆解</summary><div class="timeline-grid">${timeline(item)}</div></details></section>
  </article>`}).join('');
}
renderWeeks();renderChips();renderCards();
