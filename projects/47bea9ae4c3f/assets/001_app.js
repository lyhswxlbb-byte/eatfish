const $ = (selector) => document.querySelector(selector);
const esc = (value = "") => String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
let DATA = null;

const followerOrder = ["500W+", "100-500W", "50-100W", "30-50W", "10-30W", "<10W"];

function statCard(icon, value, label, accent) {
  return `<article class="stat-card" style="--accent:${accent}"><div class="icon"><span class="material-symbols-outlined">${icon}</span></div><strong>${esc(value)}</strong><p>${esc(label)}</p></article>`;
}

function renderStats() {
  const summary = DATA.summary;
  $("#stats").innerHTML = [
    statCard("verified", summary.selected_count, "高消耗优质素材", "#8f3154"),
    statCard("play_circle", `${summary.page_read_count}/${summary.selected_count}`, "已逐条打开并阅读页面", "#597665"),
    statCard("group", summary.creator_count, "匿名达人覆盖", "#c26d52"),
    statCard("calendar_month", `${summary.date_start.slice(5)} — ${summary.date_end.slice(5)}`, "内容发布时间覆盖", "#7d668f")
  ].join("");
  $("#heroCount").textContent = summary.selected_count;
  $("#dateStart").textContent = summary.date_start;
  $("#dateEnd").textContent = summary.date_end;
  $("#verifiedCount").textContent = summary.page_read_count;
  $("#verifiedTotal").textContent = summary.selected_count;
  $("#heroReadCount").textContent = summary.page_read_count;
  $("#heroReadTotal").textContent = summary.selected_count;
}

function renderCoreSummary() {
  const content = DATA.core_summary;
  const cards = [
    ["01", "样本与范围", content.sample],
    ["02", "三阶段演进", content.evolution],
    ["03", "高效组合", content.effective_combo],
    ["04", "可复用方法", content.playbook]
  ];
  $("#summaryGrid").innerHTML = cards.map(([num, title, text]) => `<article class="summary-card"><span>${num}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join("");
  $("#evidenceBoundary").innerHTML = `<b>风险与证据边界</b><p>${esc(content.boundary)}</p>`;
}

function phaseDateRange(name) {
  const items = DATA.items.filter((item) => item.phase === name).sort((a, b) => a.publish_time.localeCompare(b.publish_time));
  return items.length ? `${items[0].publish_time.slice(5, 10)} — ${items.at(-1).publish_time.slice(5, 10)}` : "—";
}

function renderTimeline() {
  const labels = { "预热蓄水期": "前置种草与人群教育", "集中爆发期": "密集触达与转化放大", "收尾长尾期": "节点冲刺与口碑承接" };
  const colors = ["#b65f7d", "#e87961", "#597665"];
  const max = Math.max(...DATA.phases.map((phase) => phase.count), 1);
  $("#timelineVisual").innerHTML = `<div class="timeline-axis"><span>${esc(DATA.summary.date_start)}</span><span>双十一内容节奏</span><span>${esc(DATA.summary.date_end)}</span></div><div class="timeline-columns">${DATA.phases.map((phase, index) => `<button class="timeline-column ${index === 0 ? "active" : ""}" data-phase="${esc(phase.name)}" style="--phase-color:${colors[index]};--bar-height:${Math.max(22, phase.count / max * 100)}%"><div class="volume-area"><strong>${phase.count}</strong><div class="volume-bar"></div></div><div class="column-copy"><small>${phaseDateRange(phase.name)}</small><h3>${esc(phase.name)}</h3><p>${labels[phase.name]}</p></div></button>`).join("")}</div>`;
  $("#timelineTrack").innerHTML = DATA.phases.map((phase, index) => `<button class="phase-tab ${index === 0 ? "active" : ""}" data-phase="${esc(phase.name)}"><div class="phase-node" style="--phase-color:${colors[index]}"></div><small>${phaseDateRange(phase.name)}</small><h3>${esc(phase.name)}</h3><p>${labels[phase.name]} · ${phase.count} 条</p></button>`).join("");
  const activate = (name) => {
    document.querySelectorAll("[data-phase]").forEach((node) => node.classList.toggle("active", node.dataset.phase === name));
    renderPhaseStory(name);
  };
  [$("#timelineVisual"), $("#timelineTrack")].forEach((container) => container.addEventListener("click", (event) => {
    const button = event.target.closest("[data-phase]");
    if (button) activate(button.dataset.phase);
  }));
  renderPhaseStory(DATA.phases[0].name);
}

function renderPhaseStory(name) {
  const phase = DATA.phases.find((item) => item.name === name);
  const top = (key, fallback = "—") => phase[key]?.[0]?.[0] || fallback;
  const narratives = {
    "预热蓄水期": "以解释产品、建立可信度为主，适合用痛点教育与完整体验路径降低美容仪理解门槛。",
    "集中爆发期": "内容密度与达人覆盖同步抬升，效果前置、强场景和清晰卖点更利于节点内快速决策。",
    "收尾长尾期": "更强调明确购买理由与口碑收口，用真实体验、稀缺节点和细分人群诉求承接余量。"
  };
  $("#phaseStory").innerHTML = `<div><div class="phase-big-number"><strong>${phase.count}</strong><span>条高消耗优质素材</span></div><p class="phase-narrative">${narratives[name]}</p></div><div class="phase-points"><div class="phase-point"><b>主力达人标签</b><p>${esc(top("top_tags"))}，体现该阶段最集中的内容语境。</p></div><div class="phase-point"><b>主力粉丝量级</b><p>${esc(top("top_followers"))}，兼顾覆盖效率与表达稳定性。</p></div><div class="phase-point"><b>高频开头方向</b><p>${esc(top("hook_patterns", "内容体验切入"))}，先把观看理由前置。</p></div><div class="phase-point"><b>匿名品牌覆盖</b><p>${esc(top("top_brands"))} 为该阶段入选素材最多的匿名品牌。</p></div></div>`;
}

function renderBars(id, entries, order) {
  let values = Array.isArray(entries) ? entries.slice() : Object.entries(entries);
  if (order) values.sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]));
  else values = values.slice(0, 8);
  const max = Math.max(...values.map((entry) => Number(entry[1])), 1);
  $(id).innerHTML = values.map(([key, value]) => `<div class="bar-row"><span class="bar-label" title="${esc(key)}">${esc(key)}</span><div class="bar-track"><div class="bar-fill" style="width:${Math.max(5, Number(value) / max * 100)}%"></div></div><span class="bar-value">${value}</span></div>`).join("");
}

function renderInsights() {
  renderBars("#followerChart", DATA.summary.follower_distribution, followerOrder);
  renderBars("#tagChart", DATA.summary.tag_top.slice(0, 8));
  const phases = DATA.phases;
  const top = (phase, key) => phase[key]?.[0]?.[0] || "—";
  $("#strategySummary").innerHTML = `<div class="strategy-grid"><div class="strategy-item"><span class="num">01 · PREHEAT</span><h4>预热：解释价值</h4><p>以 ${esc(top(phases[0], "top_tags"))} 类达人为高频语境，使用 ${esc(top(phases[0], "hook_patterns"))} 建立第一观看理由，优先讲清“为何需要”。</p></div><div class="strategy-item"><span class="num">02 · PEAK</span><h4>爆发：放大确定性</h4><p>${esc(top(phases[1], "top_followers"))} 达人贡献最集中，内容要把效果、场景和产品动作压缩到前段，减少理解成本。</p></div><div class="strategy-item"><span class="num">03 · TAIL</span><h4>收尾：承接细分需求</h4><p>围绕 ${esc(top(phases[2], "top_tags"))} 人群语境做可信体验与节点收口，复用已验证的开头结构而非重新教育。</p></div></div>`;
}

function fillSelect(id, values) {
  const element = $(id);
  [...new Set(values)].filter(Boolean).sort().forEach((value) => element.insertAdjacentHTML("beforeend", `<option value="${esc(value)}">${esc(value)}</option>`));
}

function initFilters() {
  fillSelect("#phaseFilter", DATA.phases.map((phase) => phase.name));
  fillSelect("#followerFilter", DATA.items.map((item) => item.creator_follower_range));
  fillSelect("#tagFilter", DATA.items.map((item) => item.creator_tag));
  ["#searchInput", "#phaseFilter", "#followerFilter", "#tagFilter", "#statusFilter"].forEach((id) => $(id).addEventListener(id === "#searchInput" ? "input" : "change", renderMaterials));
  $("#resetBtn").addEventListener("click", () => {
    $("#searchInput").value = "";
    ["#phaseFilter", "#followerFilter", "#tagFilter", "#statusFilter"].forEach((id) => { $(id).value = "all"; });
    renderMaterials();
  });
}

function matches(item) {
  const query = $("#searchInput").value.trim().toLowerCase();
  const fields = [item.material_id, item.brand_alias, item.creator_alias, item.creator_tag, item.creator_follower_range, item.quality_type, item.video_summary, item.evidence_summary, item.opening_hook, item.spoken_message, item.emotional_appeal, item.core_selling_points].flat().join(" ").toLowerCase();
  return (!query || fields.includes(query)) &&
    ($("#phaseFilter").value === "all" || item.phase === $("#phaseFilter").value) &&
    ($("#followerFilter").value === "all" || item.creator_follower_range === $("#followerFilter").value) &&
    ($("#tagFilter").value === "all" || item.creator_tag === $("#tagFilter").value) &&
    ($("#statusFilter").value === "all" || item.verification_status === $("#statusFilter").value);
}

function materialCard(item) {
  return `<article class="material-card"><div class="card-top"><span class="material-id">${esc(item.material_id)} · ${esc(item.publish_time.slice(5, 16))}</span><span class="status">已逐条阅读</span></div><h3>${esc(item.phase)}｜${esc(item.creator_tag)}达人</h3><div class="meta-tags"><span class="tag">${esc(item.creator_follower_range)}</span><span class="tag">${esc(item.quality_type)}</span><span class="tag">${esc(item.brand_alias)}</span><span class="tag">${esc(item.creator_alias)}</span></div><div class="card-brief"><div><b>内容概述</b><p>${esc(item.video_summary)}</p></div><div><b>证据 / 章节摘要</b><p>${esc(item.evidence_summary)}</p></div><div><b>开场钩子</b><p>${esc(item.opening_hook)}</p></div></div><div class="metric-strip"><div class="mini-metric"><small>订单应收金额</small><b>${esc(item.amount_band)}</b></div><div class="mini-metric"><small>CPA3</small><b>${esc(item.cpa3_band)}</b></div><div class="mini-metric"><small>A3 新增率</small><b>${esc(item.a3_rate_band)}</b></div><div class="mini-metric"><small>达人标签</small><b>${esc(item.creator_tag)}</b></div></div><div class="card-actions"><button data-detail="${esc(item.video_id)}">查看完整拆解</button><a href="${esc(item.video_url)}" target="_blank" rel="noopener noreferrer">打开原视频</a></div></article>`;
}

function renderMaterials() {
  const items = DATA.items.filter(matches);
  $("#resultCount").textContent = `当前展示 ${items.length} / ${DATA.items.length} 条`;
  $("#materialGrid").innerHTML = items.map(materialCard).join("");
  $("#emptyState").style.display = items.length ? "none" : "block";
}

function detailRow(title, content) {
  if (content === null || content === undefined || content === "" || (Array.isArray(content) && !content.length)) return "";
  const body = Array.isArray(content)
    ? `<ol>${content.map((entry) => `<li>${esc(entry)}</li>`).join("")}</ol>`
    : `<p>${esc(content)}</p>`;
  return `<section class="detail-section"><h3>${esc(title)}</h3>${body}</section>`;
}

function openDrawer(id) {
  const item = DATA.items.find((entry) => entry.video_id === id);
  if (!item) return;
  $("#drawerContent").innerHTML = `<div class="drawer-hero"><span class="material-id">${esc(item.material_id)} · ${esc(item.phase)}</span><h2>${esc(item.creator_tag)}达人高消耗优质素材</h2><div class="meta-tags"><span class="tag">${esc(item.publish_time)}</span><span class="tag">${esc(item.creator_follower_range)}</span><span class="tag">${esc(item.amount_band)}</span></div><p><strong>已逐条打开并阅读页面。</strong> 以下拆解依据页面可见标题、描述或章节信息；证据不足处单独标明。</p></div>${detailRow("内容概述", item.video_summary)}${detailRow("证据 / 章节摘要", item.evidence_summary)}${detailRow("开场钩子", item.opening_hook)}${detailRow("顺序场景节点", item.scene_sequence)}${detailRow("口播信息", item.spoken_message)}${detailRow("产品植入", item.product_placement)}${detailRow("人物与场景", item.scene_persona)}${detailRow("剪辑方式", item.editing_style)}${detailRow("情绪抓手", item.emotional_appeal)}${detailRow("核心卖点", item.core_selling_points)}${detailRow("高价值原因", item.why_high_value)}${detailRow("复用模板", item.reusable_template)}${detailRow("时间轴角色", item.timeline_role)}${detailRow("证据边界", item.evidence_limit)}<a class="drawer-link" href="${esc(item.video_url)}" target="_blank" rel="noopener noreferrer"><span class="material-symbols-outlined">open_in_new</span>打开原视频</a>`;
  $("#drawer").classList.add("open");
  $("#drawer").setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeDrawer() {
  $("#drawer").classList.remove("open");
  $("#drawer").setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function renderMethod() {
  const method = DATA.methodology;
  const items = [["01", "优质筛选", method.quality_rule], ["02", "高消耗口径", method.high_value_rule], ["03", "时间轴拆分", method.timeline_rule], ["04", "隐私保护", method.privacy_rule], ["05", "页面阅读与证据", method.evidence_rule]];
  $("#methodGrid").innerHTML = items.map(([number, title, text]) => `<article class="method-card"><span>${number}</span><h4>${esc(title)}</h4><p>${esc(text)}</p></article>`).join("");
}

function wire() {
  $("#materialGrid").addEventListener("click", (event) => {
    const button = event.target.closest("[data-detail]");
    if (button) openDrawer(button.dataset.detail);
  });
  document.querySelectorAll("[data-close]").forEach((node) => node.addEventListener("click", closeDrawer));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeDrawer(); });
  $("#methodBtn").addEventListener("click", () => $("#methodology").scrollIntoView({ behavior: "smooth" }));
}

async function boot() {
  try {
    const response = await fetch("./data.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    DATA = await response.json();
    renderStats();
    renderCoreSummary();
    renderTimeline();
    renderInsights();
    initFilters();
    renderMaterials();
    renderMethod();
    wire();
  } catch (error) {
    console.error("数据加载失败", error);
    document.body.innerHTML = `<div style="padding:60px;font-family:sans-serif"><h1>数据加载失败</h1><p>请刷新页面后重试。</p></div>`;
  }
}

boot();
