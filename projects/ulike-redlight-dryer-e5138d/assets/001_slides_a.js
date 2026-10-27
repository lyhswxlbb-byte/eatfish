(function(){
const slides = [
  // SLIDE 01: COVER
  {
    type: 'cover',
    chap: '',
    html: `
      <div class="slide cover active" data-chap="INTRODUCTION">
        <div class="glow-ring"></div>
        <div class="cv-inner">
          <p class="kicker">ULIKE BRAND STRATEGY 2026</p>
          <h1>Ulike <span class="gold">红光</span><span class="redglow">防脱</span><br/>高速吹风机整合提案</h1>
          <p class="cv-sub">在红海竞争中开辟「头皮健康」差异化赛道，<br/>以光学护理心智实现 1100 元中高端位点突围。</p>
          <div class="cv-meta">
            <div><p class="k">PROPOSAL TYPE</p><p class="v">新品上市 + 商品打法</p></div>
            <div><p class="k">LAUNCH DATE</p><p class="v">2026年12月（EST.）</p></div>
            <div><p class="k">PRICE POINT</p><p class="v">CNY 1,100</p></div>
          </div>
        </div>
        <div class="cv-foot">CONFIDENTIAL &amp; PROPRIETARY | T2T STRATEGY GROUP</div>
      </div>
    `
  },
  // SLIDE 02: EXECUTIVE SUMMARY
  {
    type: 'summary',
    chap: 'EXECUTIVE SUMMARY',
    html: `
      <div class="slide" data-chap="EXECUTIVE SUMMARY">
        <p class="chap-no">01 / SUMMARY</p>
        <h2 class="st">核心命题：从“吹干头发”转向<br/><span class="em">“科技养头皮”</span></h2>
        <hr class="head-rule">
        <div class="two-l">
          <div class="vstack">
            <div class="card teal fill">
              <h3>策略立场：以「光学专家」降维打击「家电组装」</h3>
              <p>利用 Ulike 在脱毛仪赛道建立的“光学护理+冰点安全+女性护理”核心资产，将吹风机重新定义为“可手持的头皮红光护理仪”。避开单纯风速/转速的红海参数战，主攻“呵护头皮微生态”的蓝海心智。</p>
            </div>
            <div class="three">
              <div class="card">
                <span class="tag gold">新品定义</span>
                <p style="margin-top:.5vw"><b>1.1k 客单</b>，红光防脱+高速速干，定位中高端护理。</p>
              </div>
              <div class="card">
                <span class="tag teal">核心人群</span>
                <p style="margin-top:.5vw"><b>精致妈妈 & 资深中产</b>，伴随产后脱发或发缝焦虑。</p>
              </div>
              <div class="card">
                <span class="tag red">目标效果</span>
                <p style="margin-top:.5vw"><b>星推搜直联动</b>，实现 A3 人群大规模拉新与进店收割。</p>
              </div>
            </div>
          </div>
          <div class="card dark fill">
             <h3>证据账本与验证状态</h3>
             <ul class="mini-list" style="margin-top:.8vw">
               <li><span class="light g"></span><b>知识库证据</b>：字节营销参谋 26H1 显示 300-1000 元段增速 64%。</li>
               <li><span class="light g"></span><b>公开调研</b>：2025 年高速份额达 85%，参数战已入残局。</li>
               <li><span class="light y"></span><b>待验证假设</b>：Ulike 品牌心智向吹风机的迁移效率（需首轮测试）。</li>
               <li><span class="light r"></span><b>Blocked</b>：云图 SSO 拦截，当前品牌心智数据缺失。</li>
             </ul>
          </div>
        </div>
      </div>
    `
  },
  // SLIDE 03: MARKET DIAGNOSIS - INDUSTRY
  {
    type: 'data',
    chap: 'DIAGNOSIS',
    html: `
      <div class="slide" data-chap="DIAGNOSIS">
        <p class="chap-no">02 / DIAGNOSIS</p>
        <h2 class="st">大盘红海：参数红利见顶，<br/><span class="em">“高速”</span>已成入场券而非溢价源</h2>
        <hr class="head-rule">
        <div class="two">
          <div class="vstack">
            <div class="chart-wrap fill">
              <div class="ct">2026 618 高速电吹风销额份额</div>
              <div id="chart_highspeed" class="chart"></div>
              <div class="cn">数据来源：奥维云网线上监测复盘 (2026.06)</div>
            </div>
            <div class="grid" style="grid-template-columns:1fr 1.2fr">
               <div class="card">
                 <p class="kicker">PRICE SEGMENT</p>
                 <div class="big-num">64<small>%</small></div>
                 <div class="unit">300-1000元段 GMV 增速 (26H1)</div>
               </div>
               <div class="card">
                 <p class="kicker">PENETRATION</p>
                 <div class="big-num">85<small>%</small></div>
                 <div class="unit">2025年中国高速电吹风销售额比重</div>
               </div>
            </div>
          </div>
          <div class="vstack">
            <div class="card fill">
              <h3>诊断：从参数战转向“吹护合一”</h3>
              <p>1. <b>渗透见顶</b>：高速马达普及率已达 85%+，单纯卷 11 万转/13 万转已无法支撑 1000+ 溢价。</p>
              <p style="margin-top:.8vw">2. <b>结构分化</b>：26 618 护发精华类份额 +8pct，吹护机份额 +5.9pct。用户需求正从“吹干”转向“养护”。</p>
              <p style="margin-top:.8vw">3. <b>Ulike位点</b>：1100 元处在国产高配(500-900)与戴森(3000+)的夹层，必须以“光学养护”建立独立锚点。</p>
            </div>
            <div class="card redcard">
              <h3><span class="dot-gold"></span>合规预警</h3>
              <p>知识库警示：家电禁止宣称“生发、毛发再生、止脱、治疗脱发”。建议转向“呵护头皮环境”、“减少日常掉发感”等可验证体验。</p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  // SLIDE 04: MARKET DIAGNOSIS - COMPETITION
  {
    type: 'data',
    chap: 'DIAGNOSIS',
    html: `
      <div class="slide" data-chap="DIAGNOSIS">
        <p class="chap-no">03 / DIAGNOSIS</p>
        <h2 class="st">竞品态势：前三占 <span class="em">46%</span> 份额，<br/>“护理科技”成为突围关键词</h2>
        <hr class="head-rule">
        <div class="two">
          <div class="vstack">
            <div class="chart-wrap fill">
              <div class="ct">2026 抖音吹风机主要品牌生意占比</div>
              <div id="chart_brandshare" class="chart"></div>
              <div class="cn">数据来源：Ulike新品洞察/字节营销参谋 (2026 H1)</div>
            </div>
          </div>
          <div class="vstack">
            <table class="tb">
              <thead><tr><th>品牌</th><th>定位</th><th>关键打法</th></tr></thead>
              <tbody>
                <tr><td><b>徕芬 (20.7%)</b></td><td>高配普及</td><td>极致性价比 + 创始人IP + 直播/达人全域闭环</td></tr>
                <tr><td><b>追觅 (13.7%)</b></td><td>技术旗舰</td><td>品效合一 + <b>头皮养护(Miracle/X20)</b> + 红光精华</td></tr>
                <tr><td><b>戴森 (12.1%)</b></td><td>高端标杆</td><td>专业造型 + 智能温控 + 高端心智自然流</td></tr>
              </tbody>
            </table>
            <div class="card teal fill">
              <h3>Ulike 的反击：切入「头皮健康」内容蓝海</h3>
              <p>知识库证据显示：竞品内容多聚焦“速干/造型/氛围”，几乎无人系统讲解“头皮健康”。Ulike 应利用光学专利，建立“头皮好，发质才好”的根源叙事，抢占心智空白。</p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  // SLIDE 05: YUNTU BLOCKED (TRANSPARENT STATUS)
  {
    type: 'status',
    chap: 'DIAGNOSIS',
    html: `
      <div class="slide" data-chap="DIAGNOSIS">
        <p class="chap-no">04 / DIAGNOSIS</p>
        <h2 class="st">品牌心智数据：<span class="red">受限中</span></h2>
        <hr class="head-rule">
        <div class="two">
          <div class="blocked">
            <h3><span class="dot-warn"></span>SSO 登录拦截</h3>
            <p>由于当前云图系统存在 SSO 登录校验，Agent 无法直接拉取 Ulike 品牌心智、A1-A5 人群分布及关系流转数据。</p>
            <p style="margin-top:.8vw"><b>已尝试动作：</b><br/>1. 访问 yuntu-admin.bytedance.net/internal 命中拦截页。<br/>2. 记录截图并提交补采申请。</p>
            <p style="margin-top:.8vw"><b>后续补采路径：</b><br/>请在本地浏览器登录云图并确认 Ulike 品牌权限，我将立即更新该模块。</p>
          </div>
          <div class="card dark fill">
            <h3>基于知识库的 Ulike 脱毛仪资产推演</h3>
            <p>虽然吹风机心智缺失，但脱毛仪案例证明 Ulike 已具备：</p>
            <ul class="mini-list" style="margin-top:.8vw">
              <li><b>科技感</b>：618 期间「智能」心智飙升 175%。</li>
              <li><b>拉新力</b>：通过红果+种草通，A3 人群新增 4200w+。</li>
              <li><b>场景能力</b>：AI 场景识别驱动的泛进店成本降低 600%。</li>
            </ul>
            <p style="margin-top:1vw;font-size:.75vw;color:var(--gold)">这套成熟的“光学护理”增长引擎，是电吹风起号的底牌。</p>
          </div>
        </div>
      </div>
    `
  }
];
window.SLIDES_A = slides;
})();
