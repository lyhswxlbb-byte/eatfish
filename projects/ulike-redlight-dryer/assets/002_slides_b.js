(function(){
const slides = [
  // SLIDE 06: ANNUAL RHYTHM
  {
    type: 'data', chap: 'DIAGNOSIS',
    html: `
      <div class="slide" data-chap="DIAGNOSIS">
        <p class="chap-no">05 / MARKET RHYTHM</p>
        <h2 class="st">全年节奏：三大 GMV 峰值，<br/>12 月上市＝<span class="em">礼赠卡位 + 3.8 大爆发</span></h2>
        <hr class="head-rule">
        <div class="two-l">
          <div class="chart-wrap fill">
            <div class="ct">抖音电吹风全年营销热度节奏（定性示意）</div>
            <div id="chart_rhythm" class="chart"></div>
            <div class="cn">节点定性基于知识库「双11/女神节/618 三峰值」事实，非逐月 GMV 实测；9 月天猫量 -20%、均价 +25%（申万/久谦，2026.09）</div>
          </div>
          <div class="vstack">
            <div class="card">
              <h3>三个确定性峰值</h3>
              <p>抖音吹风机消耗与 GMV 高度正相关：<b>3.8 女神节、618、双11</b>。25-26 支付 GMV 总量 45-50 亿、广告消耗 7-8 亿、整体 ROI 约 6 倍。</p>
            </div>
            <div class="card teal fill">
              <h3>Ulike 12 月上市的节奏账</h3>
              <ul class="mini-list">
                <li>错过双11，但避开与巨头正面抢量，首发成本更低；</li>
                <li>12 月卡位 <b>双12 + 圣诞/元旦/春节礼赠</b>，高客单礼赠成立；</li>
                <li>12 月—2 月是 1-2 个月心智预埋期，承接 <b>3.8 女神节首场大爆发</b>；</li>
                <li>618 为第二峰值，3.8 验证模型后放量。</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  },
  // SLIDE 07: PRICE BAND
  {
    type: 'data', chap: 'DIAGNOSIS',
    html: `
      <div class="slide" data-chap="DIAGNOSIS">
        <p class="chap-no">06 / PRICE POSITION</p>
        <h2 class="st">1100 元夹层：<span class="red">订单仅占 1%</span>，<br/>但护理升级需求增速最快</h2>
        <hr class="head-rule">
        <div class="two-l">
          <div class="chart-wrap fill">
            <div class="ct">抖音电吹风分价格带 GMV / 订单结构（2026 H1）</div>
            <div id="chart_price" class="chart"></div>
            <div class="cn">数据来源：字节营销参谋，引自 Ulike 新品洞察知识库文档（2026 H1）</div>
          </div>
          <div class="vstack">
            <div class="card">
              <p class="kicker">300–1000 元</p>
              <div class="big-num gold">+64<small>%</small></div>
              <div class="unit">支付 GMV 同比增速，全价位段最高；GMV 占比 28% / 订单占比 8%</div>
            </div>
            <div class="card dark fill">
              <h3>1100 元怎么站住</h3>
              <p>0-300 元吃下 91% 订单（58% GMV），低价红海不可入；1000+ 仅 1% 订单，说明高客单<b>不能按走量逻辑起号</b>：首发必须靠“红光+头皮护理”的强证据，把客单从电器比价切换为护理投资。预期管理：首年打标杆、不打销量。</p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  // SLIDE 08: VERDICT
  {
    type: 'verdict', chap: 'VERDICT',
    html: `
      <div class="slide" data-chap="VERDICT">
        <p class="chap-no">07 / COMPETITIVE VERDICT</p>
        <h2 class="st">竞争力裁决：能打，但不是参数战，<br/>是一场<span class="em">侧翼心智战</span></h2>
        <hr class="head-rule">
        <div class="verdict fill" style="height:calc(100% - 8.5vw)">
          <div class="v-main">
            <p class="lead">「高速」已是<span class="gold">门票</span>，<br/>「会养头皮」才是<br/>Ulike 的<span class="red">溢价权</span>。</p>
            <p class="note">上压：戴森 3799 元高端心智；下挤：徕芬/追觅 500-900 元高配；正面对手：追觅 X20 Pro（双重纳米红光+头皮屏障+精华）。红光概念已被教育但未被占领，系统讲“头皮健康”的内容仍是空白。</p>
          </div>
          <div class="v-side">
            <div class="card teal" style="flex:1">
              <h3><span class="dot-gold"></span>Ulike 的三张底牌</h3>
              <ul class="mini-list">
                <li>光学个护专家心智（脱毛仪光电技术亲缘、专利/认证资产）</li>
                <li>已验证的高消费女性人群与 5A 拉新方法论（AI场景+红果+种草通+星推泛进店）</li>
                <li>“头皮健康”内容蓝海 + 12月礼赠时间窗</li>
              </ul>
            </div>
            <div class="card" style="flex:1;border-left:4px solid var(--red)">
              <h3><span class="dot-gold"></span>三个必须赢下的考验</h3>
              <ul class="mini-list">
                <li>吹风硬性能（风速/噪音/重量/温控）必须过线，否则红光沦为贴牌噱头</li>
                <li>防脱宣称合规：无资质禁讲生发止脱，检测报告 CMA/CNAS 前置</li>
                <li>抢在追觅前把“红光=头皮护理”认知与 Ulike 绑定</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  },
  // SLIDE 09: COMPETITOR MAP
  {
    type: 'map', chap: 'PLAYBOOK',
    html: `
      <div class="slide" data-chap="PLAYBOOK">
        <p class="chap-no">08 / COMPETITOR MAP</p>
        <h2 class="st">竞品对象地图：<span class="em">和追觅抢心智，和戴森抢礼赠，向徕芬学起号</span></h2>
        <hr class="head-rule">
        <div class="two" style="grid-template-columns:1.25fr .75fr">
          <div class="card fill" style="padding:1.1vw 1.4vw;position:relative">
            <div style="position:relative;height:100%;">
              <div style="position:absolute;left:50%;top:0;bottom:2.2vw;width:1px;background:var(--line)"></div>
              <div style="position:absolute;left:0;right:0;top:50%;height:1px;background:var(--line)"></div>
              <div style="position:absolute;left:.4vw;top:.3vw;font-size:.66vw;color:var(--ink3);letter-spacing:.1em">高客单 / 品牌溢价 ↑</div>
              <div style="position:absolute;right:.4vw;bottom:2.5vw;font-size:.66vw;color:var(--ink3);letter-spacing:.1em">↓ 走量 / 性价比</div>
              <div style="position:absolute;left:.4vw;bottom:2.5vw;font-size:.66vw;color:var(--ink3)">← 造型/速干心智</div>
              <div style="position:absolute;right:.4vw;top:.3vw;font-size:.66vw;color:var(--ink3)">头皮/护理心智 →</div>
              <div class="matrix-dot" style="left:72%;top:24%;width:5.4vw;height:5.4vw;background:linear-gradient(135deg,#C0472F,#E08A6A);font-size:.78vw;box-shadow:0 .5vw 1.4vw rgba(192,71,47,.35)">Ulike<br/>目标位</div>
              <div class="matrix-dot" style="left:64%;top:38%;width:4.6vw;height:4.6vw;background:var(--teal2)">追觅<br/>X20 Pro</div>
              <div class="matrix-dot" style="left:20%;top:16%;width:4.8vw;height:4.8vw;background:#4A5B55">戴森</div>
              <div class="matrix-dot" style="left:30%;top:64%;width:4.4vw;height:4.4vw;background:#8A8F7A">徕芬</div>
              <div class="matrix-dot" style="left:42%;top:58%;width:3.4vw;height:3.4vw;background:#B6AA90;font-size:.6vw">直白/科西</div>
              <div class="matrix-dot" style="left:70%;top:66%;width:3.4vw;height:3.4vw;background:#C9A87A;font-size:.58vw">白牌<br/>红光机</div>
              <div class="matrix-dot" style="left:82%;top:52%;width:3.4vw;height:3.4vw;background:#A86A55;font-size:.58vw">红光<br/>生发帽</div>
            </div>
          </div>
          <div class="vstack">
            <div class="card" style="border-left:4px solid var(--red)">
              <h3>直接竞品｜追觅 X20 Pro</h3>
              <p>双重纳米红光、28天改善头皮屏障、3D雾化精华、13万转/70m/s。叙事框架最值得拆解与反制。</p>
            </div>
            <div class="card">
              <h3>价位上压｜戴森 Supersonic</h3>
              <p>3799 元，专业造型+风嘴生态+礼赠仪式感；商品卡贡献 79% GMV。</p>
            </div>
            <div class="card">
              <h3>起号老师｜徕芬</h3>
              <p>直播贡献 77% GMV，高频迭代+创始人IP+发布会脉冲。</p>
            </div>
            <div class="card">
              <h3>跨品类参照｜红光生发帽/头皮护理</h3>
              <p>讲法、信任状与人群可借鉴，但医疗宣称边界更要小心。</p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  // SLIDE 10: LAIFEN TEARDOWN
  {
    type: 'table', chap: 'PLAYBOOK',
    html: `
      <div class="slide" data-chap="PLAYBOOK">
        <p class="chap-no">09 / PLAYBOOK — 大几百档标杆</p>
        <h2 class="st">徕芬：大几百到千元档的<span class="em">效果型起号八段拆解</span></h2>
        <hr class="head-rule">
        <div class="vstack" style="height:calc(100% - 8vw)">
          <table class="tb fill">
            <thead><tr><th style="width:8%">维度</th><th>已验证打法（知识库 + 公开战报）</th></tr></thead>
            <tbody>
              <tr><td><b>货盘</b></td><td>Swift/SE 走量 + Salon（约1299元）立品牌；颜色、礼盒、风嘴、质保拉宽价格带</td></tr>
              <tr><td><b>套组</b></td><td>主机+风嘴+支架+礼盒的礼赠套组；大促专属权益与赠品分层</td></tr>
              <tr><td><b>素材</b></td><td>高速干发实测、护发顺滑对比、颜值/礼赠场景；混剪短视频矩阵+发布会切片持续发</td></tr>
              <tr><td><b>痛点</b></td><td>吹得慢、伤发、噪音大、颜值差、送礼没面子</td></tr>
              <tr><td><b>卖点</b></td><td>高速马达、风温控制、负离子、检测报告、质保——参数可视化</td></tr>
              <tr><td><b>话术</b></td><td>“戴森平替”式性能对比 + 创始人技术人设；全域战报刷屏建立“行业第一”心智</td></tr>
              <tr><td><b>运营</b></td><td>直播贡献 <b>77% GMV</b>；自播大场 + 达人联合直播（双11达人联合直播 9100万+）；高频迭代</td></tr>
              <tr><td><b>投流</b></td><td>闭环消耗占 77%；发布会后品专+竞价搜索拦截精准流量；转化资源 80%+ 集中收割期</td></tr>
            </tbody>
          </table>
          <p class="foot-note">数据来源：Ulike新品洞察竞品洞察（2025-01—2026-06，字节口径）、徕芬2025双11战报媒体转述（全域7.1亿/全系200万台/高速164万台/直播引导成交2.7亿，未经第三方审计，仅供打法参考）</p>
        </div>
      </div>
    `
  },
  // SLIDE 11: LAIFEN LAUNCH
  {
    type: 'timeline', chap: 'PLAYBOOK',
    html: `
      <div class="slide" data-chap="DIAGNOSIS">
        <p class="chap-no">10 / PLAYBOOK — 市场教育型新品节奏</p>
        <h2 class="st">徕芬新品发布会打法：<span class="em">提前 1–2 个月预埋，脉冲式引爆收割</span></h2>
        <hr class="head-rule">
        <div class="vstack">
          <div class="timeline">
            <div class="tl-node"><div class="m">T-30~60</div><div class="t">心智预埋</div><div class="d">市场教育型新品在大促前1-2个月发布，测试内容与产品表现</div></div>
            <div class="tl-node"><div class="m">T-7</div><div class="t">预约预热</div><div class="d">整体曝光 5900万+；直播间预约 &gt;5.6万人</div></div>
            <div class="tl-node hot"><div class="m">T 日</div><div class="t">发布会引爆</div><div class="d">曝光3200万+、最高在线12万+；大曝光资源占比60%+；当日品牌曝光&gt;8000万</div></div>
            <div class="tl-node hot"><div class="m">T+1</div><div class="t">预售收割</div><div class="d">首日预售 GMV &gt;260万；转化资源80%+，品专+竞价拦截</div></div>
            <div class="tl-node"><div class="m">长尾</div><div class="t">内容续燃</div><div class="d">混剪+达人+发布会剪辑持续发布，达播自播小场脉冲</div></div>
            <div class="tl-node hot"><div class="m">双11</div><div class="t">大促爆发</div><div class="d">新品双11 GMV 1500万+、销售 5.3万支+</div></div>
          </div>
          <div class="two">
            <div class="card teal fill">
              <h3>给 Ulike 的迁移</h3>
              <p>新品 12 月上市 → <b>10月底-11月即刻启动</b>概念教育与预约蓄水；12月以“光学护理科技发布会/线下头皮实验室”事件引爆；双12、年货节承接；3.8 完成首场大促验证。倒推今天（10/27）已在 T-40 天窗口内，素材测试与检测背书必须并行。</p>
            </div>
            <div class="card fill">
              <h3>不能照搬的部分</h3>
              <p>徕芬有既有吹风机心智与创始人 IP，Ulike 跨品类首发缺“默认信任”；需要用光电专利、第三方检测、头皮可视化证据和专家/垂类达人先补信任，再上大曝光，否则高曝光会放大质疑。</p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  // SLIDE 12: DREAME
  {
    type: 'data', chap: 'PLAYBOOK',
    html: `
      <div class="slide" data-chap="PLAYBOOK">
        <p class="chap-no">11 / PLAYBOOK — 千元档头号对手</p>
        <h2 class="st">追觅：千元档<span class="em">品效双投</span>，已抢先讲“红光头皮”</h2>
        <hr class="head-rule">
        <div class="two">
          <div class="vstack">
            <div class="kpi-row">
              <div class="card"><div class="big-num">13.7<small>%</small></div><div class="unit">2026 抖音生意占比，行业第2（一年上升4位）</div></div>
              <div class="card"><div class="big-num gold">+100<small>%</small></div><div class="unit">2025 吹风机收入同比（AWE2026发布会口径）</div></div>
              <div class="card"><div class="big-num">1000<small>万台</small></div><div class="unit">全球累计销量（品牌发布会口径）</div></div>
              <div class="card"><div class="big-num red">70<small>%</small></div><div class="unit">直播 GMV 占比；品牌+星图消耗 37%</div></div>
            </div>
            <div class="card redcard fill">
              <h3>X20 Pro —— 必须逐条拆解的正面竞品</h3>
              <p>核心话术：<b>“双重纳米红光 · 28天改善头皮屏障 · 3D超临界雾化精华 · 13万转/70m/s”</b>。把红光放进“头皮屏障+精华护发+高速”的组合叙事，并用 AWE/新华网高权威曝光做技术背书；另有 P10 Ultra（180°折叠/300g/70m/s/精华护发）占便携心智、Miracle Pro 头皮养护系列延伸。</p>
            </div>
          </div>
          <div class="vstack">
            <div class="card teal fill">
              <h3>Ulike 的反制点</h3>
              <ul class="mini-list">
                <li><b>身份差异</b>：追觅是“家电品牌做护理”，Ulike 是“光学护理品牌做吹风”——红光专业度的叙事权可争；</li>
                <li><b>人群差异</b>：追觅偏泛科技家庭人群，Ulike 深耕女性悦己/防脱焦虑场景；</li>
                <li><b>证据差异</b>：把红光参数（波长/光功率/照射时长）与头皮检测做成可视化实验，对冲“28天屏障”口号；</li>
                <li><b>内容差异</b>：抢“头皮健康吹风机”品类词与场景词的搜索和心智。</li>
              </ul>
            </div>
            <div class="card">
              <h3>警惕</h3>
              <p>追觅家电供应链与风机性能积累深，Ulike 若硬件体验不达标，“红光再好吹不干”会被评论区反噬。</p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  // SLIDE 13: DYSON + PEERS
  {
    type: 'cards', chap: 'PLAYBOOK',
    html: `
      <div class="slide" data-chap="PLAYBOOK">
        <p class="chap-no">12 / PLAYBOOK — 高端与个护同行</p>
        <h2 class="st">戴森学<span class="em">溢价表达</span>，美容仪/洗护同行学<span class="em">起号机制</span></h2>
        <hr class="head-rule">
        <div class="three" style="grid-template-rows:1fr 1fr;height:calc(100% - 8vw)">
          <div class="card">
            <h3>戴森｜货架品牌法</h3>
            <p>商品卡贡献 <b>79% GMV</b>、直播仅 20%；专业造型+智能温控+风嘴生态+礼赠仪式感。Ulike 学：技术可视化、配件生态、礼盒表达；不照搬：无戴森品牌自然流，早期必须内容蓄水。</p>
          </div>
          <div class="card">
            <h3>极萌｜达人矩阵+搜索四层词</h3>
            <p>618 铺设 200+ 达人（明星+专家+泛生活），全矩阵透传“央视推荐”；搜索种草通选词四层（场景品类/需求推荐/竞品拦截/品牌品类），曝光归因 ROI 55+、CTR +75%，5A拉新5000w+。</p>
          </div>
          <div class="card">
            <h3>雅萌｜双IP+明星进播</h3>
            <p>双IP主话题曝光250亿+，5A新增近2000万，行业联想心智 +94.68%、搜索量 +90%。教训：素材必须把“产品=某心智”讲透，避免用户只记住明星。</p>
          </div>
          <div class="card">
            <h3>海飞丝｜头皮可视化信任</h3>
            <p>线下快闪+头皮检测联动 GMV 220万+、5A新增近200万；达播单场250万+。可迁移：“头皮检测/头皮实验室”内容资产，但需防医疗化表达。</p>
          </div>
          <div class="card">
            <h3>滋源｜护肤级概念+活人感</h3>
            <p>“一瓶洗头水半瓶精华液”，明星同款套组20400套售罄；总经理进播场观2万+、ROI +300%。可迁移：把红光讲成日常护理链路，品牌高管/研发负责人进播建信任。</p>
          </div>
          <div class="card teal">
            <h3>Ulike 自家案例｜增长引擎已验证</h3>
            <p>618 AI场景渗透：红果剧可点新客成交 86%+、种草通合约新客成交率 +85%、星推泛进店成本 -600%+；5A拉新1.2亿+、A3拉新4200w+、GMV +50%、ROI +30%。</p>
          </div>
        </div>
      </div>
    `
  },
  // SLIDE 14: AUDIENCE
  {
    type: 'audience', chap: 'AUDIENCE',
    html: `
      <div class="slide" data-chap="AUDIENCE">
        <p class="chap-no">13 / TARGET AUDIENCE</p>
        <h2 class="st">打谁：<span class="em">有发缝焦虑的高消费女性</span>，<br/>先用 Ulike 存量光电人群冷启</h2>
        <hr class="head-rule">
        <div class="two" style="grid-template-columns:.9fr 1.1fr">
          <div class="vstack">
            <div class="blocked fill">
              <h3><span class="dot-warn"></span>云图八大人群真实结构待补</h3>
              <p>云图 SSO 拦截，Ulike 品牌 A1-A5 快照、八大人群占比、关系流转未取到（见第4页）。</p>
              <p style="margin-top:.5vw"><b>补采后需验证：</b>脱毛仪存量 A3/A4 人群跨品类流转率、精致妈妈占比、防脱兴趣 TGI。</p>
            </div>
            <div class="card">
              <h3>公开+知识库画像（可先行假设）</h3>
              <p>青眼/天猫：25-34 岁为核心防脱消费人群，痛点从“发量焦虑”转向“发缝焦虑”；护发精华/吹护机/智能温控份额上升印证护理需求。</p>
            </div>
          </div>
          <div class="persona fill" style="grid-template-rows:1fr 1fr">
            <div class="card teal">
              <span class="tag gold" style="background:rgba(255,255,255,.2);color:#F6E7C6">核心人群 A</span>
              <h3 style="margin-top:.6vw">精致妈妈 · 产后掉发</h3>
              <p>28-38岁，一二线，产后3-12个月发缝变宽、熬夜带娃；为“安全、温和、有效证据”付费，客单不敏感、决策看测评与同款。</p>
            </div>
            <div class="card teal">
              <span class="tag gold" style="background:rgba(255,255,255,.2);color:#F6E7C6">核心人群 B</span>
              <h3 style="margin-top:.6vw">新锐白领 · 烫染熬夜损伤</h3>
              <p>25-32岁，高频烫染/熬夜加班，头皮敏感、梳头掉发；要“吹干+护理一步完成”的效率与悦己仪式感，礼赠/自购双场景。</p>
            </div>
            <div class="card">
              <span class="tag teal">机会人群 C</span>
              <h3 style="margin-top:.6vw">资深中产 · 高客单悦己</h3>
              <p>33-40岁，戴森潜在换购人群，重品牌、专利与科技感；用“红光护理科技+高端礼盒”争取，从戴森/美发沙龙预算中切分。</p>
            </div>
            <div class="card">
              <span class="tag red">种子人群 D</span>
              <h3 style="margin-top:.6vw">Ulike 脱毛仪存量人群</h3>
              <p>18-35岁、已信任光电个护的女性，A3/A4 跨品类定向成本最低，是冷启动首批种草与老客首发权益对象（存量规模待云图补数）。</p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  // SLIDE 15: RED LIGHT MARKETING
  {
    type: 'topic', chap: 'RED-LIGHT',
    html: `
      <div class="slide" data-chap="RED-LIGHT">
        <p class="chap-no">14 / RED-LIGHT PLAYBOOK</p>
        <h2 class="st">红光个护怎么讲：<span class="red">红光已被教育，</span><span class="em">“边吹边养”尚未被占领</span></h2>
        <hr class="head-rule">
        <div class="two">
          <div class="vstack">
            <div class="card fill">
              <h3>跨品类的红光叙事资产</h3>
              <ul class="mini-list">
                <li><b>生发帽/生发仪</b>：650-670nm LLLT、NMPA 二类医疗器械、雄激素性脱发适用——信任状靠“资质+波长+临床”；</li>
                <li><b>美容仪/面罩</b>：红光=胶原/抗老/居家院线，靠科技外观与“解放双手的一键护理”；</li>
                <li><b>脱毛仪（Ulike 本行）</b>：光电安全、冰点、认证体系最完整；</li>
                <li><b>追觅 X20 Pro</b>：双重纳米红光+28天头皮屏障——把红光包进“头皮护理体系”而非单点功能。</li>
              </ul>
            </div>
            <div class="card">
              <h3>叙事空白</h3>
              <p>现有红光吹风内容多为参数堆砌或 SEO 软文；没人把<b>“每天吹干头发的3分钟=头皮红光护理时间”</b>这一高频习惯讲成生活方式。这正是 Ulike 的内容母题。</p>
            </div>
          </div>
          <div class="vstack">
            <div class="card dark fill">
              <h3>红光信任状四件套（上市前备齐）</h3>
              <ul class="mini-list">
                <li><b>参数透明</b>：红光波长区间、光功率密度、有效照射距离与时长，标注检测机构；</li>
                <li><b>第三方报告</b>：温升、头皮水油/发丝含水率/梳理断发量对比实验，CMA 或 CNAS 盖章，宣传与结论一致；</li>
                <li><b>专家背书</b>：皮肤科/毛发研究专家科普“红光与头皮”的技术背景（不承诺疗效）；</li>
                <li><b>可视化内容</b>：头皮镜前后对比、红光工作特写、第三方实验室探访。</li>
              </ul>
            </div>
            <div class="card redcard">
              <h3>边界</h3>
              <p>LLLT 医学文献只能作为“技术背景”，不能外推为吹风机疗效；光电类个护监管整体趋严（2026.10 北京药监消费提示）。</p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  // SLIDE 16: COMPLIANCE
  {
    type: 'compliance', chap: 'RED-LIGHT',
    html: `
      <div class="slide" data-chap="RED-LIGHT">
        <p class="chap-no">15 / COMPLIANCE</p>
        <h2 class="st">功效话术红绿灯：<span class="red">医疗化宣称是最高风险</span></h2>
        <hr class="head-rule">
        <div class="three" style="height:calc(100% - 8.5vw);grid-template-rows:1fr">
          <div class="card" style="border-top:5px solid var(--red)">
              <h3 style="color:var(--red)"><span class="light r" style="margin-right:.5em"></span>禁用（无对应资质）</h3>
            <ul class="mini-list">
              <li>生发、育发、毛发再生、止脱</li>
              <li>治疗脱发 / 改善脂溢性、雄激素性脱发</li>
              <li>医学级养发、激活毛囊、修复头皮屏障（医疗化口径）</li>
              <li>医院同款、医生推荐、替代米诺地尔/植发</li>
            </ul>
            <p class="foot-note" style="margin-top:.8vw">依据：北京市化妆品广告发布指引、广州市监局问答、2026.01 育发类监管调整报道；家电非化妆品但医疗化宣称同样有广告法风险。</p>
          </div>
          <div class="card" style="border-top:5px solid var(--gold)">
              <h3 style="color:var(--gold2)"><span class="light y" style="margin-right:.5em"></span>慎用（需证据+审核前置）</h3>
            <ul class="mini-list">
              <li>“防脱”：暗示预防脱发，中风险；建议表述为“减少因高温/拉扯/断发带来的掉发感”</li>
              <li>“改善头皮屏障/抗炎/控油”：需检测结论逐字对应</li>
              <li>竞品词、对比词：用客观可核验指标，不贬低</li>
              <li>达人口播与直播话术统一过审，避免临场发挥越界</li>
            </ul>
          </div>
          <div class="card teal" style="border-top:5px solid #7FC4B4">
              <h3><span class="light" style="background:#E9F3EE;margin-right:.5em"></span>可用（建议主张）</h3>
            <ul class="mini-list">
              <li>呵护头皮微生态、平衡头皮环境、温和养护头皮</li>
              <li>给头皮舒适体验、红光温感护理</li>
              <li>减少日常掉发感、强韧发根、稳固发丝、减少梳理时掉发</li>
              <li>恒温护发、减少高温损伤、柔顺减少毛躁、快速吹干</li>
            </ul>
            <p class="foot-note" style="margin-top:.8vw;color:rgba(255,255,255,.75)">所有“减少/强韧”类表述均需 CMA/CNAS 报告支撑，素材与结论一致，留档备查。</p>
          </div>
        </div>
      </div>
    `
  }
];
window.SLIDES_B = slides;
})();
