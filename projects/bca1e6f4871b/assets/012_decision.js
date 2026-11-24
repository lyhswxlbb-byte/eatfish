/* Conclusions are part of the report, with evidence kept on the existing pages. */
(() => {
  const section=k=>document.querySelector(`.slide[data-key="${k}"]`);
  const total='用办公久坐抓需求，用调节与适配讲差异，用分层货品承接不同人群';
  const jump=(n,label)=>`<button class="evidence-jump" onclick="go(${n-1})">${label} → 第${n}页</button>`;
  const metric=(value,label)=>`<div class="decision-metric">${value}<span>${label}</span></div>`;
  const badge='<span class="test-badge">建议测试</span>';
  const setHeading=(key,title,sub,summary)=>{
    const s=section(key);s.querySelector('h2').textContent=title;s.setAttribute('aria-label',title);
    if(sub)s.querySelector('.subtitle').textContent=sub;
    if(summary)s.querySelector('.board-summary').innerHTML='<b>结论速览</b>'+summary;
  };
  function mini(rank,label){const p=D.products.find(p=>+p['原类目排序']===rank);return `<div class="decision-product">${productImage(p,'decision-photo')}<div><strong>${label}</strong><span>${rank===2?'周期订单20万–25万':'周期GMV7,250万–7,500万'}</span></div></div>`;}
  setHeading('cover','电脑椅整体趋势分析｜先明确卖点、人群与货品','2026.01.01—11.11 · 本周期结构分析 · 后续方向为建议测试',total);
  section('cover').querySelector('.body').innerHTML=`<div class="decision-cover"><div class="decision-lead"><span class="decision-kicker">后续优先方向</span><h1>办公久坐抓需求，<br><em>调节与适配</em>讲差异。</h1><p>主卖点优先测试：办公久坐场景下的可调节人体工学椅。<br>泛词难差异化是分析判断；具体功能与适配体验需要货品证据。</p></div><div class="decision-cover-grid"><article class="card decision-cover-card"><div class="phase">01 / 什么卖点更值得做</div><h3>优先组合功能与场景<br>不只讲“人体工学”</h3>${metric('30 / 32','人体工学覆盖款数')}<p class="note">办公22/32。${badge}<br>调节＋办公适配；久坐＋透气；办公学习两用＋空间适配。</p>${jump(6,'看卖点与货品证据')}</article><article class="card decision-cover-card tint"><div class="phase">02 / 先面向什么人群</div><h3>白领为核心<br>GenZ与小镇青年为第二层</h3>${metric('27.53%','新锐白领支付订单占比')}<p class="note">GenZ20.51%、小镇青年19.01%，前三合计67.05%。内容方向为假设，非已验证功能偏好。</p>${jump(8,'看人群结构')}</article><article class="card decision-cover-card"><div class="phase">03 / 大家倾向什么货品</div><h3>走量实用款＋价值升级款<br>分层承接，不押单一价位</h3>${metric('25.79%','201–300两档订单占比合计')}<p class="note">1001–2000档GMV10.81%。高价款少而精测试，功能、体验与退货核查后再考虑放量。</p>${jump(7,'看价格结构')}</article></div></div>`;
  setHeading('summary','三个先行结论：测试卖点、目标人群、分层货品','结论前置 · 数字为本周期事实，后续组合为建议测试',total);
  section('summary').querySelector('.body').innerHTML=`<div class="decision-grid"><article class="card decision-card"><div class="phase">01 / 主卖点优先级</div><h3>办公久坐场景下的<br>可调节人体工学椅</h3>${metric('30 / 32','人体工学覆盖；办公22/32')}<div class="decision-list"><p><b>P1</b>人体工学＋高度调节＋办公适配</p><p><b>P2</b>久坐场景＋透气体验</p><p><b>P3</b>办公学习两用＋空间适配</p></div><p class="note">${badge} 泛词难差异化属判断。精域有久坐、透气、调节标签；A16有办公、学习、升降标签。适配尺寸与体验待实测。</p><div class="decision-evidence">${jump(5,'标签证据')}${jump(6,'71卖点全图')}</div><p class="decision-scope">32款名称合格样本，非全量；标签频次非成交份额。</p></article><article class="card decision-card tint"><div class="phase">02 / 人群测试顺序</div><h3>核心：新锐白领<br>第二层：GenZ、小镇青年</h3>${metric('67.05%','前三人群支付订单占比合计')}<div class="decision-list"><p><b>核心</b>新锐白领27.53%：适配体验证明</p><p><b>第二层</b>GenZ20.51%：办公学习兼用</p><p><b>第二层</b>小镇青年19.01%：实用调节与性价比</p></div><p class="note">${badge} 内容切口为假设，未证明功能偏好。3001–4000档内白领占50.42%，仅为该档订单构成。</p><div class="decision-evidence">${jump(8,'人群排行')}${jump(9,'档内人群')}</div><p class="decision-scope">完整电脑椅类目；非32款商品标签份额，非个人跨档选择。</p></article><article class="card decision-card"><div class="phase">03 / 货品承接方式</div><h3>实用走量＋价值升级<br>高价不自动等于高效</h3>${metric('25.79%','201–250 / 251–300订单13.48% / 12.31%')}<p class="note">1001–2000档GMV10.81%，支持量与值分层；不等于低价主导全部市场。</p><div class="decision-examples">${mini(2,'卡勒维｜走量例证')}${mini(1,'精域M7｜成交例证')}</div><p class="note">${badge} 高价清闲、黑白调先核功能体验和退货，不简单认定值得放量。报价与周期单均价不同，不推断折扣。</p><div class="decision-evidence">${jump(7,'价格结构')}${jump(14,'8款例证')}</div><p class="decision-scope">价格为完整类目；热卖例证为32款样本，不造全行业规模。</p></article></div>`;
  setHeading('leaders','热卖例证支持实用走量，高价款先看体验与退货','样本前4款 · 成交区间保留 · 建议测试不等于推荐放量','卡勒维订单20万–25万；精域M7 GMV7,250万–7,500万。清闲高价成交不代表高效。');
  section('leaders').querySelector('.warning').textContent='建议测试：走量款先验证调节、办公学习适配；高价清闲先核实际功能体验与退货。售卖价与周期单均价不同，不推断折扣。';
  setHeading('products','选货方向：实用走量＋价值升级，高价谨慎测试','32款名称合格样本，非全量 · 商品图与成交区间保留','先按真实标签匹配调节、透气与办公学习场景；不凭品牌或名称编造配置。');
  section('products').querySelector('.body>div>.note').textContent='建议测试：走量款关注调节与实用场景；升级款核适配体验；高价款核溢价证据和退货。Top3标签非成交占比；报价非周期单均价。';
  setHeading('tags','主卖点优先测试：办公久坐下的调节与适配','样本人体工学30/32、办公22/32 · 高频不等于增长或差异化','泛词难差异化属判断；建议把真实功能标签与使用场景组合，而非只讲“人体工学”。');
  const tagCards=section('tags').querySelectorAll('.stack>.card');
  tagCards[0].innerHTML='<div class="phase">P1 / 建议测试</div><h3>人体工学＋高度调节＋办公适配</h3><p class="note">精域、卡勒维均有相关功能与办公标签。调节范围、桌高与坐姿适配待实测，不补造参数。</p>';
  tagCards[1].innerHTML='<div class="phase">P2 / 建议测试</div><h3>久坐场景＋透气体验</h3><p class="note">精域M7同时有久坐、透气标签；只在有标签证据的货品上测试材料与体感，不写医疗功效。</p>';
  tagCards[2].innerHTML='<div class="phase">P3 / 建议测试</div><h3>办公学习两用＋空间适配</h3><p class="note">A16有办公、学习、宿舍与升降标签；空间适配是待验证内容切口，尺寸与实际占地待核。</p>';
  const sellingTitle='优先测试调节与办公适配，透气和两用场景作第二层';
  const sellingSummary='P1 人体工学＋高度调节＋办公适配；P2 久坐＋透气；P3 办公学习＋空间适配。均为建议测试。';
  const oldSelling=renders.selling;renders.selling=function(c){oldSelling(c);if(document.getElementById('sampleSelling').style.display!=='none')setHeading('selling',sellingTitle,null,sellingSummary);};
  setHeading('selling',sellingTitle,null,sellingSummary);
  document.querySelector('.agg-rules').textContent='建议测试：调节＋办公适配；久坐＋透气体验；办公学习两用＋空间适配。功能依商品标签，适配待实测；不代表联合增长。';
  document.querySelector('.agg-rank-card>.note').textContent='71标签完整保留；测试优先级见上方结论';
  const oldPrices=renders.prices;renders.prices=function(c){oldPrices(c);if(c==='电脑椅'){
    setHeading('prices','货品建议测试：实用走量＋价值升级，价格分层承接',null,'201–300两档订单25.79%；1001–2000档GMV10.81%。支持分层测试，不等于高价更高效。');
    document.getElementById('priceInsight').innerHTML='<h3>实用走量＋价值升级｜建议测试</h3><p class="note">201–250 / 251–300档订单13.48% / 12.31%，合计25.79%；1001–2000档GMV10.81%。走量款测试调节与性价比，升级款强调适配体验证明；高价款先核溢价与退货。</p>';
  }};
  const oldPopulation=renders.population;renders.population=function(c){oldPopulation(c);section('population').querySelector('.stack>.card:last-child h3').textContent=c==='电脑椅'?'内容方向｜建议测试':'电脑椅测试方向｜非本背景类目结论';if(c==='电脑椅'){
    setHeading('population','人群建议测试：白领为核心，GenZ与小镇青年为第二层',null,'新锐白领27.53%；GenZ20.51%；小镇青年19.01%，合计67.05%。功能偏好尚未验证。');
    document.querySelector('#populationInsight>.note').textContent='建议测试：白领看适配体验证明；GenZ与小镇青年看办公学习兼用、实用调节与性价比。内容切口为假设，非已验证功能偏好。';
  }};
  section('population').querySelector('.stack>.card:last-child').innerHTML='<h3>内容方向｜建议测试</h3><div class="rule"><b>核心：新锐白领</b><br>调节过程、桌高与坐姿适配的实际证明。</div><div class="rule"><b>第二层：GenZ / 小镇青年</b><br>办公学习兼用、空间适配与实用价值。</div><p class="note">功能与体验需货品标签及实测支撑；类目占比不证明具体功能偏好，Top3商品标签非成交份额。</p>';
  const heatInsight='<b>档内事实：</b>3001–4000档内白领50.42%；251–300档内GenZ29.84%。列内构成，非个人跨档选择。<br><b>建议测试：</b>高价对白领证明适配与溢价；功能体验、退货核查后再考虑放量，未验证具体功能偏好。';
  const oldHeat=renders.heat;renders.heat=function(c){oldHeat(c);if(c==='电脑椅'){
    setHeading('heat','高价人群线索：白领构成突出，少而精验证适配价值',null,'3001–4000档内白领50.42%；仅为该价格档的订单构成，不是白领个人跨档选择。');
    document.getElementById('heatInsight').innerHTML=heatInsight;
  }};
  const coreAdvice={
    'core-0':'建议测试：精域匹配久坐、透气与调节；卡勒维匹配办公调节。两款成交事实支持走量例证，不证明功能效果。',
    'core-1':'建议测试：A16匹配办公学习兼用与空间适配；清闲先核功能体验、溢价与退货，不由名称补造机制。',
    'core-2':'建议测试：B100pro匹配办公人体工学；创思克匹配办公书房与调节标签。适配体验待实测，不把配置套到两款。',
    'core-3':'建议测试：E3Ultra先核追腰支撑实际体验与退货；M59pro匹配家用学习场景，不凭名称证明功效。',
    'core-matrix':'建议测试：实用走量＋价值升级分层承接；高价清闲、黑白调先核功能体验、溢价与退货，不能直接认定值得放量。'
  };
  Object.entries(coreAdvice).forEach(([key,text])=>{section(key).querySelector('.board-summary').innerHTML='<b>结论速览</b>'+text;});
  setHeading('core-strategy','后续组合建议测试：走量、升级、高价各有承接重点','8款货品仍为趋势例证 · 人群内容切口为假设，非已验证偏好',total);
  section('core-strategy').querySelector('.body').innerHTML=`<div class="strategy-grid decision-tier-grid"><article class="card tint"><div class="phase">01 / 走量款 · 建议测试</div><h3>GenZ / 小镇青年<br>实用调节与办公学习兼用</h3><div class="chain"><b>卖点组合</b><p>人体工学＋调节＋办公学习场景；性价比为内容假设，不认定全市场偏好。</p><b>货品例证</b><p>卡勒维、精域M7、A16：分别匹配真实标签，不把同一配置套到全部货品。</p><b>成交证据</b><p>卡勒维订单20万–25万；精域GMV7,250万–7,500万；A16单均250–300。</p><b>验证重点</b><p>调节范围、办公学习两用与空间适配实测；不凭名称补写尺寸、材料或功效。</p></div>${jump(10,'走量例证')}</article><article class="card"><div class="phase">02 / 升级款 · 建议测试</div><h3>新锐白领<br>用适配体验证明价值</h3><div class="chain"><b>卖点组合</b><p>办公久坐＋适配体验；有透气标签的货品再测试透气体验。</p><b>货品例证</b><p>B100pro为办公人体工学例证；M59pro为家用场景例证，不自动归入某类目价档。</p><b>类目证据</b><p>白领订单27.53%；1001–2000档GMV10.81%。两指标来自完整电脑椅类目。</p><b>验证重点</b><p>真实调节、桌面适配与体验差异；不把人体工学泛词当已证实的溢价原因。</p></div>${jump(8,'目标人群')}</article><article class="card"><div class="phase">03 / 高价款 · 少而精测试</div><h3>溢价证据与退货核查<br>优先于简单放量</h3><div class="chain"><b>卖点组合</b><p>只使用货品实际标签与功能证明。清闲名称不独立证明机制；E3Ultra追腰标签不独立证明效果。</p><b>货品例证</b><p>清闲Pro / 黑白调E3Ultra，周期单均价均为2500–4000。</p><b>风险证据</b><p>退货55%–60% / 50%–55%；高价不代表高效，ROI不等于利润。</p><b>验证重点</b><p>少而精测试，核实际体验、溢价理由与退货后再考虑放量；报价差异不代表折扣。</p></div>${jump(14,'渠道与退货')}</article></div><p class="decision-scope">上述为后续测试方向；商品32款样本非全量，价格与人群为完整类目，未验证跨期增长或功能偏好。</p>`;
  setHeading('actions','后续主判断：办公久坐抓需求，分层货品承接人群','结论与测试优先级 · 本周期结构有证据，后续效果待验证',total);
  section('actions').querySelector('.body').innerHTML=`<div class="decision-grid decision-final"><article class="card decision-card"><div class="phase">01 / 先做什么卖点</div><h3>办公久坐场景下的<br>可调节人体工学椅</h3>${metric('30 / 32','人体工学覆盖；办公22/32')}<div class="decision-list"><p><b>P1</b>人体工学＋高度调节＋办公适配</p><p><b>P2</b>久坐场景＋透气体验</p><p><b>P3</b>办公学习两用＋空间适配</p></div><p class="note">${badge} 用组合讲差异，泛词难差异化属判断；功能以真实标签为依据，适配与体验待实测。</p>${jump(6,'卖点依据')}<p class="decision-scope">标签GMV重叠不可加总；联合增长待核验。</p></article><article class="card decision-card tint"><div class="phase">02 / 先做什么人群</div><h3>核心白领<br>第二层GenZ与小镇青年</h3>${metric('67.05%','前三人群支付订单占比合计')}<div class="decision-list"><p><b>白领</b>27.53%：适配体验证明</p><p><b>GenZ</b>20.51%：办公学习兼用</p><p><b>小镇青年</b>19.01%：实用调节与性价比</p></div><p class="note">${badge} 这是内容假设，非已验证功能偏好；高价档内白领50.42%，仅作档内受众线索。</p>${jump(8,'人群依据')}<p class="decision-scope">完整类目订单结构，非商品标签份额或个人跨档选择。</p></article><article class="card decision-card"><div class="phase">03 / 用什么货品承接</div><h3>实用走量＋价值升级<br>高价款少而精测试</h3>${metric('25.79%','201–300两档订单占比合计')}<div class="decision-list"><p><b>走量款</b>GenZ / 小镇青年；实用调节与两用场景</p><p><b>升级款</b>白领；适配体验与实际价值证明</p><p><b>高价款</b>核溢价、功能体验与退货后再放量</p></div><p class="note">卡勒维订单20万–25万、精域GMV7,250万–7,500万是热卖例证；清闲、黑白调高价案例不直接推荐放量。</p>${jump(15,'组合与验证重点')}<p class="decision-scope">报价非周期单均价，不推断折扣；不新增跨期增速结论。</p></article></div>`;
  // Retain the sixteen-page navigation; chart refreshes must not erase recommendations.
  document.getElementById('tocgrid').innerHTML=[...document.querySelectorAll('.slide')].map((s,i)=>`<button data-page="${i}"><em>${String(i+1).padStart(2,'0')}</em>${esc(s.querySelector('h2').textContent)}</button>`).join('');
  window.decisionSnapshot={pages:16,conclusionPages:[1,2,3,4,5,6,7,8,9,15,16],evidence:'existing snapshot',advice:'test hypotheses'};
  window.addEventListener('beforeprint',()=>{renders.selling(states.selling);renders.prices(states.prices);renders.population(states.population);if(states.heat==='电脑椅')document.getElementById('heatInsight').innerHTML=heatInsight;});
  go((window.initialPageRequested||1)-1);
})();
