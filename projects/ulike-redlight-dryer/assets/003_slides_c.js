(function(){
const slides = [
  // SLIDE 17: PROPOSITION
  {
    type: 'proposition', chap: 'STRATEGY',
    html: `
      <div class="slide" data-chap="STRATEGY">
        <p class="chap-no">16 / STRATEGY</p>
        <h2 class="st">核心命题：<span class="em">会养头皮的吹风机</span></h2>
        <hr class="head-rule">
        <div style="height:calc(100% - 8.5vw);display:flex;flex-direction:column;justify-content:center;gap:1.6vw">
          <p class="quote" style="font-size:1.85vw;text-align:center;line-height:1.55">“别人在卖<span class="teal">风速</span>，我们卖吹干头发那 3 分钟里，<br/>给头皮的一次<span class="red">红光护理</span>。”</p>
          <div class="three">
            <div class="card teal" style="text-align:center;padding:1.6vw 1.4vw">
              <h3>理由一｜身份正当</h3>
              <p>Ulike 是光学护理品牌，红光吹风是技术亲缘延伸；家电品牌讲红光是加分项，我们讲红光是本职。</p>
            </div>
            <div class="card teal" style="text-align:center;padding:1.6vw 1.4vw">
              <h3>理由二｜心智空白</h3>
              <p>竞品内容集中在速干/造型，系统讲头皮健康的供给近乎空白，搜索词与内容词均未被占领。</p>
            </div>
            <div class="card teal" style="text-align:center;padding:1.6vw 1.4vw">
              <h3>理由三｜人群现成</h3>
              <p>25-35 岁发缝焦虑女性与脱毛仪存量人群高度重合，已有 5A 拉新与进店方法论可直接复用。</p>
            </div>
          </div>
          <p class="foot-note" style="text-align:center">一句话销售口径：Ulike 红光吹风机——把每天吹头发，变成给头皮的护理时间（功效表述以检测报告为准）。</p>
        </div>
      </div>
    `
  },
  // SLIDE 18: PAIN-SELLING MATRIX
  {
    type: 'matrix', chap: 'STRATEGY',
    html: `
      <div class="slide" data-chap="STRATEGY">
        <p class="chap-no">17 / MESSAGE SYSTEM</p>
        <h2 class="st">痛点 → 卖点 → 证据 → 话术 体系</h2>
        <hr class="head-rule">
        <table class="tb" style="margin-top:.4vw">
          <thead><tr><th style="width:15%">人群/场景痛点</th><th style="width:21%">卖点承接</th><th style="width:25%">证据表达（内容素材）</th><th>合规话术示范</th></tr></thead>
          <tbody>
            <tr><td><b>产后发缝变宽</b><br/>一梳一把头发</td><td>红光温感+头皮护理模式；恒温减少高温拉扯断发</td><td>头皮镜实拍、28天梳发掉发量记录（自测，非疗效）、宝妈真实vlog</td><td>“吹完头皮暖暖的，梳头时手上的头发变少了”</td></tr>
            <tr><td><b>频繁烫染</b><br/>干枯毛躁易断</td><td>高速速干+恒温护发+负离子，低温大风量</td><td>毛鳞片显微对比、含水率检测、湿发3分钟吹干计时</td><td>“温度不烤头皮，吹干快，摸起来是顺的”</td></tr>
            <tr><td><b>熬夜头皮油/痒/敏感</b></td><td>头皮舒适护理、温和风感</td><td>水油测试纸对比、专家科普头皮环境与高温损伤</td><td>“给头皮一个舒服的吹干环境”</td></tr>
            <tr><td><b>担心红光智商税</b></td><td>波长/光功率透明、CMA/CNAS 报告、光电专利</td><td>实验室探访、参数卡、检测报告页特写、品牌脱毛仪光电资产背书</td><td>“参数和报告都摆出来，能不能护理你自己看”</td></tr>
            <tr><td><b>送礼怕出错</b></td><td>高端礼盒+品牌口碑+礼赠场景</td><td>开箱美学、圣诞/春节/情人节场景、代写贺卡服务</td><td>“给在意发量的她，一份每天用得到的关心”</td></tr>
          </tbody>
        </table>
        <p class="foot-note" style="margin-top:.8vw">排序原则：先“头皮/掉发焦虑”建立差异，再用“速干/恒温性能”打消电器顾虑；避免只讲风速掉回比价逻辑。所有功效表达以检测结论为准。</p>
      </div>
    `
  },
  // SLIDE 19: XING - CONTENT & CREATORS
  {
    type: 'xing', chap: 'XING-TUI-SOU-ZHI',
    html: `
      <div class="slide" data-chap="XING-TUI-SOU-ZHI">
        <p class="chap-no">18 / ① 星 — 内容与达人</p>
        <h2 class="st">三条内容母题，三层达人池：<span class="em">AI剧情测情绪，垂类建信任，头部做引爆</span></h2>
        <hr class="head-rule">
        <div class="two" style="grid-template-columns:.92fr 1.08fr">
          <div class="vstack">
            <div class="card"><h3>母题A｜头皮可视化（建信任）</h3><p>头皮镜/掉发量实测+红光参数与检测报告；专家、美垂、健康类达人承担，决定 A3 深度。</p></div>
            <div class="card"><h3>母题B｜掉发情绪故事（拉新）</h3><p>产后/熬夜/约会前三分钟：女频AI短剧、家庭Vlog自然植入；产品词与场景词固定，控变量测脚本。</p></div>
            <div class="card"><h3>母题C｜光电科技+礼赠（立调性）</h3><p>实验室/发布会/开年礼：头部审美达人、明星进播；承接品牌搜索与高客单礼赠。</p></div>
          </div>
          <div class="vstack">
            <div class="chart-wrap" style="flex:1.1">
              <div class="ct">建议达人预算结构（知识库方法论：拉量40%/引爆20%/转化40%）</div>
              <div id="chart_creator" class="chart"></div>
            </div>
            <div class="card fill" style="padding:.9vw 1.1vw">
              <h3 style="font-size:1vw">真实候选（源自 AI创作者供给刊例/单元剧表，报价为刊例参考，下单前实时复核）</h3>
              <table class="tb" style="font-size:.66vw;margin-top:.3vw">
                <thead><tr><th>分层</th><th>达人（粉丝·女性占比·核心人群）</th><th>刊例参考</th><th>任务</th></tr></thead>
                <tbody>
                  <tr><td><span class="tag teal">首轮测试</span></td><td>熊猫MBTI(117.9w)、Aoini(6.3w)、她们的故事绘(1.3w)</td><td>0.8w–6w</td><td>低成本测掉发情绪/宝妈场景脚本，跑 CPA3</td></tr>
                  <tr><td><span class="tag gold">人群校准</span></td><td>白昼与茄(137.9w/女88%/Z世代50%)、晚晚(20.5w/女89%/精致妈妈25%)、Eva小妞片场(12.7w/女87%)</td><td>2.1w–30w</td><td>校准年轻女性与精致妈妈表达，素材包沉淀</td></tr>
                  <tr><td><span class="tag red">规模扩量</span></td><td>编导李让(82.9w)、雾恩(30+成熟女性50%，参考4w)、头部美垂/专家号</td><td>5w起</td><td>过线后大故事片+功效背书+进播；中腰部CPE最低是跑量主力</td></tr>
                </tbody>
              </table>
              <p class="foot-note" style="margin-top:.3vw">门槛：以 A3 新增率、看后搜率、商品访问决定晋级；品星图书馆达人库本次无权限，美垂/科技/健康垂类名单待权限恢复后补全。</p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  // SLIDE 20: TUI
  {
    type: 'tui', chap: 'XING-TUI-SOU-ZHI',
    html: `
      <div class="slide" data-chap="XING-TUI-SOU-ZHI">
        <p class="chap-no">19 / ② 推 — 种草通双开与加热</p>
        <h2 class="st">合约买<span class="em">确定性资产</span>，竞价追<span class="em">过线爆文</span>，便宜流量放前面</h2>
        <hr class="head-rule">
        <div class="two" style="grid-template-columns:.95fr 1.05fr">
          <div class="chart-wrap fill">
            <div class="ct">5A 触点预算分配（家电行业方法论区间）</div>
            <div id="chart_5a" class="chart"></div>
            <div class="cn">来源：Ulike新品洞察 7.2 触点协同；区间中值示意，需按品牌实际测算</div>
          </div>
          <div class="vstack">
            <div class="card fill">
              <h3>投放分工</h3>
              <ul class="mini-list">
                <li><b>红果剧可点/中插GD + AI剧情</b>：低成本 O-A2 拉新（参照：CPM较内容热推低50%+、新客成交86%+、CPA3 低至0.02-0.09）；</li>
                <li><b>种草通合约</b>：锁定中腰部确定内容资产、规模积累 A3（参照自由点 CPA3 -28%、回搜率&gt;3%）；</li>
                <li><b>种草通竞价</b>：追投自然跑出来的爆文，A3 冲量与泛进店（全棉时代心智爆文率90%、直接ROI 3.3）；</li>
                <li><b>星推泛进店</b>：星图内容向商品页/直播间导流（Ulike自家验证成本-600%、GMV+180%）；</li>
                <li><b>千川/竞价</b>：仅对已验证素材与直播间收割放量。</li>
              </ul>
            </div>
            <div class="card redcard">
              <h3>启动与停投线</h3>
              <p>每母题先 8-12 条小样；A3新增率、看后搜率、3秒完播达到品牌同口径基线再热推；连续两轮低于基线即停素材、不停赛道。高客单不套低价 ROI，首轮看 A3 成本与回搜而非即时ROI。</p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  // SLIDE 21: SOU
  {
    type: 'sou', chap: 'XING-TUI-SOU-ZHI',
    html: `
      <div class="slide" data-chap="XING-TUI-SOU-ZHI">
        <p class="chap-no">20 / ③ 搜 — 四层词包承接</p>
        <h2 class="st">内容激发的每一次搜索，<span class="em">都要有同一命题的页面接住</span></h2>
        <hr class="head-rule">
        <table class="tb">
          <thead><tr><th style="width:13%">词层</th><th style="width:34%">关键词示例（上线前过审）</th><th>承接动作</th></tr></thead>
          <tbody>
            <tr><td><b>品牌词</b></td><td>Ulike吹风机、Ulike红光吹风机、Ulike新品</td><td>品牌专区+官方店铺首屏锁定；发布会后即上品专，防截流</td></tr>
            <tr><td><b>品类词</b></td><td>高速吹风机、吹风机推荐、高端吹风机、吹风机礼盒</td><td>搜索种草通+商品卡优化，详情页讲“养头皮的高速吹风机”</td></tr>
            <tr><td><b>场景/需求词</b></td><td>头皮护理吹风机、护发吹风机、产后掉发怎么办、发缝宽、烫染受损吹发、减少掉发</td><td>小蓝词/话题词挂载星图爆文；评论区置顶搜索引导；落地页用同一套痛点语言（“防脱/生发”需合规替代）</td></tr>
            <tr><td><b>竞品拦截词</b></td><td>追觅X20 Pro、徕芬Salon、戴森吹风机对比、红光吹风机哪个好</td><td>客观参数对比内容（波长/温控/重量/检测），不贬低；搜索种草通竞价承接</td></tr>
          </tbody>
        </table>
        <div class="two" style="margin-top:1vw;height:calc(100% - 17.5vw)">
          <div class="card teal fill">
            <h3>机制参考</h3>
            <p>极萌以四层选词+搜索种草通做到美容仪品牌搜索 SOV TOP1，搜索曝光归因 ROI 55+、CTR +75%；徕芬发布会后“品专+竞价拦截+混剪续发”收割。Ulike 需在 11 月预热前完成词包审核与品专锁定。</p>
          </div>
          <div class="card fill">
            <h3>一致性校验</h3>
            <p>星图脚本里的产品词必须能搜到对应承接页；搜索页、商品页、直播间使用同一卖点排序与证据；素材评论区高频异议每周回收进直播 FAQ 与搜索问答。</p>
          </div>
        </div>
      </div>
    `
  },
  // SLIDE 22: ZHI
  {
    type: 'zhi', chap: 'XING-TUI-SOU-ZHI',
    html: `
      <div class="slide" data-chap="XING-TUI-SOU-ZHI">
        <p class="chap-no">21 / ④ 直 — 直播矩阵与大场</p>
        <h2 class="st">双号分工：<span class="em">头皮护理号讲信任，品牌自播做收割</span></h2>
        <hr class="head-rule">
        <div class="two">
          <div class="vstack">
            <div class="card">
              <h3>账号矩阵</h3>
              <p><b>品牌自播间</b>：承接转化，货组/权益/比价模块齐全；<b>“Ulike头皮实验室”内容号</b>（参考海飞丝头皮号 GMV 2.4倍、清扬头皮号机制）：检测科普、专家访谈、真人28天记录，降低主号硬广压力；<b>达播</b>：头部美垂/明星进播打大场（参考滋源总经理进播 ROI +300%、海飞丝单场250万+）。</p>
            </div>
            <div class="card fill">
              <h3>大场七段节奏</h3>
              <p>预热蓄水（预约抽奖）→ 开场立论（为什么吹风机要讲头皮）→ 证据演示（头皮镜/检测报告/红光参数）→ 场景共鸣（宝妈/烫染/礼赠）→ 权益释放（首发礼盒/赠品）→ 异议处理（智商税/防脱边界/与竞品差异）→ 返场追单。过线星图素材用于进播与直播间加热。</p>
            </div>
          </div>
          <div class="card dark fill">
            <h3>页面六模块与 FAQ</h3>
            <ul class="mini-list">
              <li><b>首屏</b>：会养头皮的红光吹风机 + 1100价位价值锚</li>
              <li><b>证据</b>：波长光功率卡、CMA/CNAS报告、专利墙</li>
              <li><b>对比</b>：与普通高速机的头皮关怀差异（参数化）</li>
              <li><b>演示</b>：速干计时/恒温/噪音/重量实测</li>
              <li><b>货组</b>：首发主机+精华/风嘴+延保+礼盒</li>
              <li><b>FAQ</b>：真能防脱吗？（合规口径：减少日常掉发感/护理体验，非治疗）、红光安全吗、和追觅/戴森区别、售后质保</li>
            </ul>
            <p style="margin-top:.6vw;font-size:.72vw;color:var(--gold)">所有主播话术过法务/审核，“防脱”一词按页面统一口径，禁止医疗化延展。</p>
          </div>
        </div>
      </div>
    `
  },
  // SLIDE 23: ASSORTMENT
  {
    type: 'goods', chap: 'STRATEGY',
    html: `
      <div class="slide" data-chap="STRATEGY">
        <p class="chap-no">22 / ASSORTMENT</p>
        <h2 class="st">货盘与套组：一个旗舰立心智，三类套组做转化</h2>
        <hr class="head-rule">
        <div class="four" style="height:calc(100% - 9vw)">
          <div class="card" style="border-top:4px solid var(--teal)">
            <span class="tag teal">形象款</span>
            <h3 style="margin-top:.6vw">红光旗舰主机</h3>
            <p>约1100元，红光护理+高速+恒温全配；承担心智与搜索锚点，不做深折。</p>
          </div>
          <div class="card" style="border-top:4px solid var(--gold)">
            <span class="tag gold">利润款</span>
            <h3 style="margin-top:.6vw">护理套组</h3>
            <p>主机+头皮精华/护发精油+护理风嘴，客单上探；呼应“边吹边养”体系（参考追觅精华叙事）。</p>
          </div>
          <div class="card" style="border-top:4px solid var(--red)">
            <span class="tag red">礼赠款</span>
            <h3 style="margin-top:.6vw">节日限定礼盒</h3>
            <p>圣诞/年货节/情人节/3.8 限定包装+贺卡+延保，主攻12月首发与高客单悦己/送礼。</p>
          </div>
          <div class="card" style="border-top:4px solid #8A8F7A">
            <span class="tag grey">拉新款</span>
            <h3 style="margin-top:.6vw">首发预约权益</h3>
            <p>非低价SKU，而是“预约锁赠品+30天无忧+头皮护理服务”，保价盘、攒首批口碑与素材。</p>
          </div>
        </div>
        <p class="foot-note" style="margin-top:1vw">原则：1000+ 价位订单占比仅 1%，首年货盘不做低价支线稀释心智；套组用来提客单与礼赠，不用主机降价换量。精华等耗材为后续复购入口（若上精华，须按对应品类合规要求备案宣传）。</p>
      </div>
    `
  },
  // SLIDE 24: ROADMAP
  {
    type: 'roadmap', chap: 'ROADMAP',
    html: `
      <div class="slide" data-chap="STRATEGY">
        <p class="chap-no">23 / ROADMAP</p>
        <h2 class="st">上市节奏：<span class="em">T-40 已开始</span>，教育→引爆→礼赠→3.8爆发</h2>
        <hr class="head-rule">
        <div class="timeline" style="grid-template-columns:repeat(6,1fr)">
          <div class="tl-node hot"><div class="m">10底–11月</div><div class="t">T-40 教育预热</div><div class="d">检测报告/资质备齐；3母题小样测试；脱毛仪存量人群预约；搜索词包过审；品专锁定</div></div>
          <div class="tl-node hot"><div class="m">12月</div><div class="t">发布会+首发</div><div class="d">光学护理发布会/头皮实验室事件；自播大场+头部进播；双12首发；红果+种草通A3蓄水</div></div>
          <div class="tl-node"><div class="m">1月</div><div class="t">年货节</div><div class="d">礼赠场景+礼盒套组；达播小场脉冲；爆文竞价追投</div></div>
          <div class="tl-node"><div class="m">2月</div><div class="t">情人节蓄水</div><div class="d">悦己/送礼内容；3.8素材与货盘定稿；人群包沉淀</div></div>
          <div class="tl-node hot"><div class="m">3月</div><div class="t">3.8 首场大爆发</div><div class="d">三节点峰值之一：全量达人+搜索拦截+直播大场，验证全年模型</div></div>
          <div class="tl-node hot"><div class="m">4–6月</div><div class="t">618 放量</div><div class="d">过线素材规模扩量；明星/IP资源BUFF；按3.8验证的人群与ROI分配预算</div></div>
        </div>
        <div class="three" style="margin-top:1.4vw;height:calc(100% - 20vw)">
          <div class="card fill"><h3>内容脉冲</h3><p>预热期低成本高频测款；发布会集中大曝光；节后混剪+达人切片续燃，保持每周小场。</p></div>
          <div class="card fill"><h3>资源 BUFF</h3><p>科技/美业榜单或奖项背书（参考 Ulike 科技晚：智能心智+175%、品专成交+65%）；行业展会与专家资源前置锁定。</p></div>
          <div class="card fill"><h3>风险预案</h3><p>功效质疑→证据物料前置；硬件差评→首发批次质量管控与无忧退换；竞品先发→抢占“头皮健康吹风机”品类词绑定。</p></div>
        </div>
      </div>
    `
  },
  // SLIDE 25: KPI
  {
    type: 'kpi', chap: 'KPI',
    html: `
      <div class="slide" data-chap="KPI">
        <p class="chap-no">24 / KPI & VALIDATION</p>
        <h2 class="st">验证体系：<span class="em">先校准基线，再谈放量</span></h2>
        <hr class="head-rule">
        <table class="tb">
          <thead><tr><th style="width:14%">阶段</th><th>核心指标</th><th style="width:26%">判定/停投线</th><th style="width:20%">数据依赖</th></tr></thead>
          <tbody>
            <tr><td><b>预热期<br/>10底–11月</b></td><td>分母题 CPA3、3秒完播、看后搜率；预约人数；品牌词搜索环比</td><td>以 Ulike 脱毛仪同口径基线校准；连续2轮低于基线的母题停投</td><td>云图5A/算数/星图（待登录补）</td></tr>
            <tr><td><b>首发期<br/>12月</b></td><td>发布会曝光与预约转化、首销GMV、新品 A3 新增、泛进店成本、退货率</td><td>首月目标为“模型成立”非销量冲榜；退货/差评超阈值即暂停放量回查产品</td><td>星图/种草通/电商后台</td></tr>
            <tr><td><b>大促期<br/>3.8 / 618</b></td><td>品类词与场景词 SOV、搜索归因 ROI、直播GMV占比、A3-A4流转率、新客占比</td><td>参照极萌搜索ROI 55+、Ulike自家泛进店成本基准设内部目标；不达标收缩竞价保合约</td><td>云图/搜索广告/千川</td></tr>
            <tr><td><b>资产沉淀</b></td><td>“红光/头皮护理吹风机”心智联想份额、5A总量与结构、会员复购（耗材）</td><td>月度复盘；心智未随内容增长则调整命题表达</td><td>云图心智模块（待补采）</td></tr>
          </tbody>
        </table>
        <div class="card teal" style="margin-top:1vw">
          <h3>关键待验证假设（不作为既成结论）</h3>
          <p>① 脱毛仪存量人群对吹风机的跨品类接受度；② “减少日常掉发感”内容能否显著提升1100元转化；③ 红光参数透明化对信任的贡献；④ 礼赠场景在12月的占比。均通过首轮小样与首发数据验证，不以其他品牌均值替代本品牌基线。</p>
        </div>
      </div>
    `
  },
  // SLIDE 26: EVIDENCE BOUNDARY
  {
    type: 'evidence', chap: 'APPENDIX',
    html: `
      <div class="slide" data-chap="APPENDIX">
        <p class="chap-no">25 / EVIDENCE BOUNDARY</p>
        <h2 class="st">证据边界：哪些是事实，哪些待补</h2>
        <hr class="head-rule">
        <div class="two" style="grid-template-columns:1fr 1fr">
          <div class="card fill">
            <h3>已采用的真实证据</h3>
            <ul class="mini-list">
              <li><span class="tag teal">知识库</span> Ulike新品洞察（字节营销参谋 26H1：价格带、竞品份额/渠道、内容空白、触点预算、发布会案例）</li>
              <li><span class="tag teal">知识库</span> 案例库：Ulike科技晚/AI场景618、极萌、海飞丝、滋源、雅萌、花间颂等真实战报</li>
              <li><span class="tag teal">知识库</span> AI创作者供给刊例（达人粉丝/女性占比/刊例）</li>
              <li><span class="tag gold">公开</span> NIQ/协会112亿、奥维云网618复盘、GfK、久谦天猫月数、品牌官网价、监管文件</li>
            </ul>
          </div>
          <div class="vstack">
            <div class="blocked fill">
              <h3><span class="dot-warn"></span>Blocked / Missing</h3>
              <ul class="mini-list">
                <li><b>云图</b>：SSO 拦截，Ulike 心智词/5A/八大人群/流转/触点/内容未取到（已截图留证，需本地浏览器登录后补采刷新）；</li>
                <li><b>品星图书馆主库</b>：当前账号 91403 无权限，主方法论表与全量达人库未读取；</li>
                <li><b>逐月全网 GMV、竞品单品审计级 GMV</b>：公开渠道无权威序列，战报数字仅作打法参考；</li>
                <li><b>产品参数/检测报告</b>：新品未上市，红光参数与 CMA/CNAS 报告需品牌方提供。</li>
              </ul>
            </div>
            <div class="card">
              <h3>对外使用前</h3>
              <p>本材料含内部案例与未过 PR 案例，对外前请完成 <b>PR 审核与数据合规检查</b>，脱敏内部链接/账号信息，并以最新平台数据复核。</p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  // SLIDE 27: CLOSING
  {
    type: 'closing', chap: '',
    html: `
      <div class="slide cover" data-chap="CLOSING">
        <div class="glow-ring" style="animation-duration:6s"></div>
        <div class="cv-inner" style="justify-content:center">
          <p class="kicker">WHY NOW</p>
          <h1 style="max-width:72%">吹风机的下一战，<br/>不在<span class="gold">风速</span>，在<span class="redglow">头皮</span>。</h1>
          <p class="cv-sub" style="max-width:62%">高速是门票，护理是溢价；红光概念已被教育，心智归属尚未落定。<br/>12 月卡位礼赠、3.8 完成爆发——窗口就在这个冬天。</p>
          <div class="cv-meta" style="margin-top:2.6vw">
            <div><p class="k">NEXT STEP 01</p><p class="v">本地浏览器登录云图，补采心智/人群数据</p></div>
            <div><p class="k">NEXT STEP 02</p><p class="v">备齐红光参数与 CMA/CNAS 检测报告</p></div>
            <div><p class="k">NEXT STEP 03</p><p class="v">启动三母题小样与预约蓄水</p></div>
          </div>
        </div>
        <div class="cv-foot">ULIKE × 品星整合提案 ｜ 数据周期 2026.01–2026.10 ｜ 待云图登录后刷新</div>
      </div>
    `
  }
];
window.SLIDES_C = slides;
})();
