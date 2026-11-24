/* Period structure analysis: existing evidence only, sixteen pages. */
(() => {
  const copy={
    cover:['电脑椅整体趋势分析','2026年1月1日—11月11日 · 本周期货品、卖点、价格与人群结构','中低价订单承接与高价价值层并存；办公功能和价格档内人群构成呈现分层。'],
    summary:['本周期结构：走量与高价并存，办公是主要场景','商品与卖点：32款名称合格样本 · 价格与人群：完整类目','人体工学覆盖30款；201–300档订单集中；高价档白领构成突出。'],
    leaders:['头部样本同时出现走量款与高价款','名称合格样本前4款 · 平台顺序与成交区间保留','精域GMV 7,250万–7,500万；卡勒维订单20万–25万；清闲单均价2500–4000。'],
    products:['32款样本呈现不同价位、场景与成交渠道','名称含“人体工学椅”或“电脑椅” · 电脑椅26款 / 其他椅子6款 · 非全量','样本包含办公、家用、学习等场景；同类功能方向下，单均价和渠道并不一致。'],
    tags:['人体工学与办公高频，家用及学习场景并存','32款样本 · 原始标签频次 · 非成交份额','人体工学30款、办公22款、家用13款；调节与透气是具体功能标签。'],
    selling:['卖点结构：办公与调节组合突出，长尾标签分散','32款名称合格样本 · 71个归并标签 · 非全类目规模','关联GMV与订单保留区间；标签覆盖商品重叠，不可跨标签加总。'],
    prices:['201–300档承接订单，高价档贡献成交价值','完整类目 · 30个订单价格档 · 非32款样本份额','201–250 / 251–300订单占比13.48% / 12.31%；1001–2000 GMV占比10.81%。'],
    population:['白领、GenZ与小镇青年构成主要订单人群','完整类目 · 支付订单占比 · 非商品人群标签份额','新锐白领27.53%、GenZ20.51%、小镇青年19.01%，前三合计67.05%。'],
    heat:['同档人群结构：高价档白领构成较突出','完整类目 · 价格档内订单人群构成（列内占比）','3001–4000档内白领50.42%；251–300档内GenZ29.84%，不是个人跨档选择。'],
    'core-0':['走量层例证：较低单均价与直播订单规模并存','精域与卡勒维 · 本周期货品结构例证','精域单均400–450、订单15万–20万；卡勒维单均200–250、订单20万–25万。'],
    'core-1':['分层例证：A16多渠道并存，清闲处于高价层','上岛佳A16与清闲Pro · 本周期货品结构例证','A16单均250–300；清闲2500–4000。价位差异与渠道、退货结构同时存在。'],
    'core-2':['渠道例证：办公功能相近，成交重心仍有差异','西昊B100pro与创思克 · 本周期货品结构例证','B100pro商品卡GMV明确领先；创思克以直播为重，不能将功能标签等同成交路径。'],
    'core-3':['组合例证：高价支撑标签与家用学习场景并存','黑白调E3Ultra与西昊M59pro · 本周期货品结构例证','E3Ultra单均2500–4000，M59pro为600–650；场景标签不等于付款人群。'],
    'core-matrix':['货品分层同时体现在单均价、渠道与退货','8款趋势例证 · 角色为分析判断 · 成交区间不精确化','直播型、商品卡型与高价型并存；高价不等于低退货，ROI不等于利润率。'],
    'core-strategy':['组合结构：基础调节、办公功能与高价支撑并存','8款货品作为卖点与价格分层的例证 · 非商品导购','办公调节覆盖走量款；相近功能有不同渠道；高价层的标签表达也不相同。'],
    actions:['整体结论：量与值分层，功能与人群按价位呈现差异','本周期结构趋势 · 不代表已证实的跨期增长或人群迁移','订单集中于201–300档；高价档贡献GMV并呈现较高白领构成。']
  };
  const panel=k=>document.querySelector(`.slide[data-key="${k}"]`);
  const cleanText=root=>{
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;
    while((n=walker.nextNode()))n.textContent=n.textContent.replace(/genz/gi,'GenZ').replace(/周期支付 GMV \/ 原文区间/g,'周期支付GMV区间').replace(/GMV 原文区间/g,'GMV区间').replace(/订单原文区间/g,'订单区间').replace(/单均价原文区间/g,'周期单均价区间').replace(/原文区间/g,'区间').replace(/售卖价原文/g,'售卖价').replace(/周期 GMV 原文/g,'周期GMV区间').replace(/订单原文/g,'周期订单').replace(/退货率原文/g,'退货率').replace(/ROI 原文/g,'ROI').replace(/真实标签原文/g,'商品标签').replace(/观测事实｜渠道 GMV/g,'成交事实｜渠道GMV');
  };
  document.querySelectorAll('.slide').forEach((s,i)=>{
    const c=copy[s.dataset.key],h=s.querySelector('.header');
    h.querySelector('h2').textContent=c[0];h.querySelector('.subtitle').textContent=c[1];s.setAttribute('aria-label',c[0]);
    h.querySelector('.eyebrow').textContent=`BOARD ${String(i+1).padStart(2,'0')} · 电脑椅整体趋势分析`;
    h.insertAdjacentHTML('beforeend',`<aside class="board-summary"><b>结论速览</b>${c[2]}</aside><span class="board-date">2026.01.01 — 11.11</span>`);
    const key=s.dataset.key,background=['prices','population','heat'].includes(key),type=key==='prices'?'prices':background?'population':'products';
    const scope=key==='heat'?'完整类目 · 价格档内构成，非个人跨档选择':background?'完整类目 · 非名称关键词样本':'32款名称合格样本，非全量 · 成交保留区间';
    s.querySelector('.footer span:first-child').innerHTML=`2026.01.01—11.11 · ${scope} · 来源：<a href="${sources[type]}" target="_blank" rel="noopener">${type==='products'?'商品推荐':type==='prices'?'价格带分析':'类目人群偏好'}</a>`;
    if(['cover','summary','core-strategy','actions'].includes(key))s.querySelector('.footer span:first-child').innerHTML=`2026.01.01—11.11 · 商品32款非全量；价格与人群为完整类目 · 来源：<a href="${sources.products}" target="_blank" rel="noopener">商品</a> / <a href="${sources.prices}" target="_blank" rel="noopener">价格</a> / <a href="${sources.population}" target="_blank" rel="noopener">人群</a>`;
    s.querySelector('.footer span:last-child').textContent=`${String(i+1).padStart(2,'0')} / 16`;
    cleanText(s);
  });
  const cover=panel('cover');cover.querySelector('h1').innerHTML='走量与高价<br>呈现<span>分层结构</span>';
  cover.querySelector('.cover>div>p').innerHTML='从货品与卖点组合，<br>看本周期价格承接与人群结构。';
  cover.querySelector('.cover>div>p:last-child').remove();
  cover.querySelector('.cover .warning').textContent='名称样本：两类目合并前40条中筛出32款。仅讨论本周期结构，不据此推断全市场规模或跨期增速。';
  cover.querySelector('.cover-visual .eyebrow').textContent='名称合格样本';cover.querySelector('.cover-visual .tint h3').textContent='货品分层 × 价格人群结构';
  cover.querySelector('.cover-visual .tint .note').innerHTML='26款电脑椅 / 6款其他椅子<br>71个归并卖点 · 非全量商品';
  panel('summary').querySelectorAll('h3')[2].innerHTML='高价档白领构成突出，<br>251–300档GenZ较集中';
  panel('leaders').querySelector('.warning').textContent='单均价200–450的走量款与2500–4000的高价款共存。售卖价不同于周期单均价，不据此推断折扣。';
  panel('products').querySelector('.body>div>.note').textContent='Top3人群为商品标签，非支付订单占比；当前售卖价不等于周期单均价。';panel('products').querySelector('#scope32').textContent='全部32款';
  const tags=panel('tags').querySelector('.stack');tags.querySelector('.card .note').textContent='人体工学、调节高度与透气分别对应功能方向；标签不独立证明参数与体验效果。';tags.querySelectorAll('.card')[1].querySelector('.note').textContent='办公之外，家用、书房、学习与宿舍共同出现；场景分布不等于付款人群分布。';tags.lastElementChild.innerHTML='<h3>组合结构</h3><p class="note">基础层：高度调节与办公、家用组合。<br>场景层：学习、宿舍与书房并存。<br>具体支撑层：部分高价货品出现动态支撑、追腰标签。</p>';
  panel('population').querySelector('.stack>.card:last-child').innerHTML='<h3>人群结构集中，但口径不同</h3><div class="rule"><b>类目结构</b><br>电脑椅前三人群合计67.05%；其他椅子前三为48.03%，结构更分散。</div><div class="rule"><b>货品标签</b><br>Top3标签只说明关联人群，不提供对应成交份额。</div><p class="note">上述为本周期分布，未证明人群跨期迁移。</p>';
  panel('core-matrix').querySelector('.warning').textContent='单均价与渠道同时分层；渠道领先仅在其下限高于其他渠道上限时成立。售卖价差异不代表折扣，ROI不等于利润率。';
  panel('core-strategy').querySelector('.body').innerHTML=`<div class="strategy-grid"><div class="card tint"><div class="phase">01 / 办公 × 高度调节</div><h3>基础功能与走量层共同出现</h3><div class="chain"><b>货品例证</b><p>精域 / 卡勒维 / 上岛佳A16</p><b>单均价分层</b><p>400–450 / 200–250 / 250–300</p><b>场景组合</b><p>精域与卡勒维含办公、家用；A16含学习、宿舍与书房。</p><b>渠道结构</b><p>精域、卡勒维直播明确领先；A16直播与商品卡区间相接。</p><b>结构判断</b><p>相近基础功能对应不同单均价与渠道，并非单一走量模式。</p></div></div><div class="card"><div class="phase">02 / 办公 × 人体工学</div><h3>功能相近，渠道重心不同</h3><div class="chain"><b>货品例证</b><p>西昊B100pro / 创思克</p><b>单均价分层</b><p>450–500 / 350–400</p><b>卖点组合</b><p>B100pro标签集中于办公、人体工学；创思克叠加可躺、高度调节与书房。</p><b>渠道结构</b><p>B100pro商品卡明确领先；创思克直播明确领先。</p><b>结构判断</b><p>办公功能是共同方向，不能用标签相似推断成交渠道相同。</p></div></div><div class="card"><div class="phase">03 / 高价 × 支撑标签</div><h3>高价层表达不同，退货区间较高</h3><div class="chain"><b>货品例证</b><p>清闲Pro / 黑白调E3Ultra</p><b>单均价分层</b><p>两款均为2500–4000</p><b>卖点组合</b><p>清闲标签为品牌、新品与办公；E3Ultra含人体工学、动态支撑与追腰。</p><b>退货区间</b><p>55%–60% / 50%–55%</p><b>结构判断</b><p>高价与具体支撑表达并非一一对应，也不能据此认定高价体验更好。</p></div></div></div><p class="note" style="margin-top:13px">补充例证：M59pro含家用、学生标签，单均价600–650；人群字段仅都市银发，使用场景不等于付款画像。</p>`;
  panel('actions').querySelector('.body').innerHTML=`<div class="grid3 trend-conclusions" style="height:100%"><div class="card stack"><div class="phase">01 / 货品与卖点</div><h3>走量与高价共存，办公功能是共同底色</h3><div class="num">30<span style="font-size:24px"> / 32</span></div><p class="label">人体工学标签覆盖款数</p><div class="rule">办公22款、家用13款；高度调节、透气与场景词共同出现。</div><p class="note">精域、卡勒维、A16代表走量层；清闲与E3Ultra体现高价层。相同功能方向仍有渠道差异。</p><div class="warning">标签频次非成交份额；71标签关联GMV重叠，不可加总。</div></div><div class="card stack"><div class="phase">02 / 价格结构</div><h3>201–300档承接订单，高价档贡献GMV</h3><div class="num">25.79<span style="font-size:24px">%</span></div><p class="label">201–250与251–300档订单占比合计</p><div class="rule">两档分别13.48%、12.31%；1001–2000档GMV占比10.81%。</div><p class="note">本周期呈现“量”与“值”分层。货品单均价例证与类目价格结构方向相符，但不是同一统计范围。</p><div class="warning">订单价格档不等于当前报价；其他椅子混合椅型，不直接映射电脑椅定价。</div></div><div class="card stack"><div class="phase">03 / 人群结构</div><h3>前三人群集中，高价档白领构成较高</h3><div class="num">67.05<span style="font-size:24px">%</span></div><p class="label">电脑椅前三人群订单占比合计</p><div class="rule">新锐白领27.53%、GenZ20.51%、小镇青年19.01%。</div><p class="note">3001–4000档内白领50.42%；251–300档内GenZ29.84%。不同价格档内受众构成存在差异。</p><div class="warning">列内构成非个人跨档选择；无跨期对照，不认定人群变化或增长已发生。</div></div></div>`;
  const host=document.querySelector('.agg-bubble-card');host.insertAdjacentHTML('afterbegin','<div class="selling-modes" id="sellingModes"><button data-mode="all" class="active">全部卖点 · 71</button><button data-mode="potential">样本潜力</button><button data-mode="upward">飙升卖点</button></div>');
  host.insertAdjacentHTML('beforeend','<div id="upwardPanel" style="display:none"><div class="upward-empty"><h3>联合增长待核验，暂不排序</h3></div></div><div id="potentialRule" class="agg-label-key" style="display:none">潜力为样本分析判断，非平台评分或未来增长预测。</div>');
  let mode=['all','upward','potential'].includes(new URLSearchParams(location.search).get('sellingMode'))?new URLSearchParams(location.search).get('sellingMode'):'all';
  function apply(){const upward=mode==='upward';['aggBubble','aggNamePages','aggEvidence'].forEach(id=>{const e=document.getElementById(id);if(e)e.style.display=upward?'none':'';});host.querySelector('.chart-head').style.display=upward?'none':'';host.querySelector(':scope>.note').style.display=upward?'none':'';document.getElementById('upwardPanel').style.display=upward?'block':'none';document.getElementById('potentialRule').style.display=mode==='potential'?'block':'none';document.querySelectorAll('#sellingModes button').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));}
  const safeBackground=c=>{
    const instance=echarts.getInstanceByDom(document.getElementById('bubbleChart'));if(!instance)return;const rows=D.selling.filter(r=>r.category===c),den=Math.max(...rows.map(r=>r.orders));
    instance.setOption({animation:false,grid:{left:65,right:25,top:20,bottom:45},xAxis:{type:'value',min:0,max:110,name:'支付GMV相对指数',nameLocation:'middle',nameGap:28,splitLine:{lineStyle:{type:'dashed',color:'#e1e7eb'}}},yAxis:{type:'value',min:0,max:110,name:'订单相对指数',splitLine:{lineStyle:{type:'dashed',color:'#e1e7eb'}}},tooltip:{confine:true,formatter:p=>`${p.name}<br>GMV相对指数 ${p.data.r.index}<br>订单 ${p.data.r.orders}；商品数 ${p.data.r.products}<br>完整类目背景，非32款样本规模。`},series:[{type:'scatter',data:rows.map(r=>({name:r.name,r,value:[r.index,r.orders/den*100,r.products]})),symbolSize:v=>Math.sqrt(v[2]/Math.max(...rows.map(r=>r.products)))*35,itemStyle:{color:'#81aabc'},label:{show:true,formatter:'{b}',fontSize:10},labelLayout:{hideOverlap:true}}]},true);
    document.querySelector('#backgroundSelling .quadrants').style.display='none';document.querySelector('#backgroundSelling .bubble-card>.note').textContent='X：GMV相对指数；Y：订单相对指数；面积：商品数。';document.querySelector('#backgroundSelling .bubble-key').textContent='完整类目背景 · 标签重叠，不加总';document.querySelector('#backgroundSelling .bubble-warning').textContent='电脑椅类目功能与办公居前；其他椅子混合椅型。背景GMV单位及环比单位、基期未核验，不推算联合增长。';
  };
  const oldSelling=renders.selling;renders.selling=function(c){oldSelling(c);safeBackground(c);const background=document.getElementById('sampleSelling').style.display==='none',s=panel('selling');s.querySelector('h2').textContent=background?'类目背景：电脑椅重功能与办公，其他椅子混合多椅型':copy.selling[0];s.querySelector('.subtitle').textContent=background?'完整类目背景 · 每类目30卖点 · 非32款样本份额':copy.selling[1];document.querySelector('.aggregate-views>.status').textContent=background?'完整类目背景':'32款样本 · 71标签';s.querySelector('.footer span:first-child').innerHTML=background?`2026.01.01—11.11 · 完整类目背景，非名称关键词样本 · GMV与环比口径未核验 · 来源：<a href="${sources.selling}" target="_blank" rel="noopener">卖点洞察</a>`:`2026.01.01—11.11 · 32款名称合格样本，非全量 · 关联成交保留区间 · 来源：<a href="${sources.products}" target="_blank" rel="noopener">商品推荐</a>`;cleanText(s);apply();};
  document.getElementById('sellingModes').onclick=e=>{const b=e.target.closest('button');if(b){mode=b.dataset.mode;apply();}};
  document.getElementById('sampleView').textContent='32款样本卖点';document.getElementById('backgroundView').textContent='类目背景';document.querySelector('.aggregate-views>.status').textContent='32款样本 · 71标签';
  document.querySelector('.agg-rank-card>.note').textContent='71个标签完整保留';document.querySelector('.agg-boundary').textContent='关联成交区间逐端累加；标签间商品重叠，GMV不可加总。GMV环比单位与基期未核验，不算联合增长。';document.querySelector('.agg-rules').textContent='升降 / 可升降 / 调节高度→高度调节；办公室→办公；舒服→舒适。同商品同标签计一次，其余原样保留。';
  // Keep body copy descriptive when charts refresh after navigation or category changes.
  const categoryHeading=(key,c)=>{const s=panel(key),other=c==='其他椅子';s.querySelector('h2').textContent=other?({prices:'背景对照：其他椅子含低价订单与高价成交',population:'背景对照：其他椅子受众结构更分散',heat:'背景对照：其他椅子不同价档的人群构成'})[key]:copy[key][0];s.querySelector('.board-summary').innerHTML='<b>结论速览</b>'+(other?({prices:'0–50档订单25.96%；1001–2000档GMV21.15%。混合椅型背景，非电脑椅样本份额。',population:'小镇青年17.68%、新锐白领17.62%、资深中产12.73%，前三合计48.03%。',heat:'1001–2000档内白领26.79%；3001–4000档内白领33.39%、资深中产17.91%。'})[key]:copy[key][2]);};
  const oldPrices=renders.prices;renders.prices=function(c){oldPrices(c);categoryHeading('prices',c);document.getElementById('priceInsight').innerHTML=c==='电脑椅'?'<h3>量与值分层</h3><p class="note">201–250 / 251–300档订单占比13.48% / 12.31%；1001–2000 / 3001–4000档GMV占比10.81% / 10.00%。中低价订单与高价成交价值并存。</p>':'<h3>混合椅型背景</h3><p class="note">0–50档订单占比25.96%；1001–2000档GMV占比21.15%。其他椅子包含非电脑椅，不作为目标货品价格份额。</p>';cleanText(panel('prices'));};
  const oldPopulation=renders.population;renders.population=function(c){oldPopulation(c);categoryHeading('population',c);document.querySelector('#populationInsight>.note').textContent=c==='电脑椅'?'白领、GenZ与小镇青年形成主要订单结构；只说明本周期分布，非已证实的跨期变化。':'前三合计48.03%，较电脑椅更分散；混合椅型背景不直接映射目标货品。';cleanText(panel('population'));};
  const oldHeat=renders.heat;renders.heat=function(c){oldHeat(c);categoryHeading('heat',c);document.getElementById('heatInsight').innerHTML=c==='电脑椅'?'<b>档内构成：</b>251–300档GenZ29.84%；1001–2000 / 3001–4000档新锐白领42.84% / 50.42%。<br><b>结构判断：</b>不同价格档受众构成有差异；列内合计约100%，非个人跨档选择，未证明人群迁移。':'<b>档内构成：</b>1001–2000档新锐白领26.79%；3001–4000档白领33.39%、资深中产17.91%。<br>完整其他椅子背景；列内构成非个人跨档选择，--为未提供，非0。';cleanText(panel('heat'));};
  document.querySelectorAll('.slide .body .source').forEach(e=>e.remove());
  document.querySelector('.tocbox>.note').textContent='16页 · 电脑椅整体趋势分析';document.getElementById('tocgrid').innerHTML=[...document.querySelectorAll('.slide')].map((s,i)=>`<button data-page="${i}"><em>${String(i+1).padStart(2,'0')}</em>${esc(s.querySelector('h2').textContent)}</button>`).join('');
  document.body.insertAdjacentHTML('beforeend',`<div class="image-preflight" aria-hidden="true">${D.products.map(p=>productImage(p,'preflight-photo')).join('')}</div>`);
  const oldGo=go;go=function(n){oldGo(n);cleanText(document.querySelector('.slide.current'));};
  window.addEventListener('beforeprint',()=>{renders.selling(states.selling);document.querySelectorAll('.slide').forEach(cleanText);});
  go((window.initialPageRequested||1)-1);
})();
