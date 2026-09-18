/* 星图种草洞察 · 女性经期用品 & 私处护理（2026 Q3）
 * 自动生成，请勿手改。重跑：python3 female/xingtu/aggregate_seed.py
 * 口径：直客（品牌直营）× 美妆日化行业星图订单（风神 3739467, p_date=2026-08-31，发布日 2026-07-01~09-01）
 * 非全量星图、非抖音大盘、非女性消费全貌；抽样非普查，互动率/播放量不可外推为总体。
 * 所有展示数字已在脚本内算好，前端不做任何统计运算。
 */
window.SEEDING = {
 "meta": {
  "module": "seeding",
  "tab": "品牌动作雷达",
  "title": "星图种草洞察 · 女性经期用品 & 私处护理",
  "subtitle": "2026 Q3 直客星图订单｜这个赛道怎么开口说「那件事」、怎么讲产品、怎么说服她",
  "scope_warning": "本模块口径 = **直客（品牌直营）× 美妆日化行业**的星图订单，只覆盖「女性经期用品 & 私处护理赛道」。**不是全量星图、不是抖音大盘、不是女性消费全貌**，也不代表这些品牌在其他渠道的内容策略。",
  "redlines": [
   "数据源：风神数据集 3739467《【官方】直客星图订单数据集_每日全量》，分区锁定 p_date=2026-08-31。该数据集只保留近 7 天分区，**过期后不可复现**，本次明细已固化落盘在 female/xingtu/raw/orders_q3.json。",
   "时间窗：视频发布日 2026-07-01 ~ 2026-09-01（按视频发布日，不是订单日/结算日）。",
   "口径是**直客 × 美妆日化行业**的星图订单：非直客投放、其他行业归属的投放都不在内，因此本模块任何数字都不能表述为「该品牌的抖音种草全貌」。",
   "看板 31 个女卫女护品牌中，本口径下只有 23 个有星图订单，8 个为 0 单（0 单名单：草本伊、uutri/由趣、PETAL STORY、由意、小N、舒芙茵、夏娃之吻、洁尔阴）。",
   "audience_gender（受众性别）由多模态模型**逐条看完视频**判定（画面里谁在用、口播称呼、字幕、包装性别标识、使用场景），**不是**用标题关键词或品牌名推断；prompt 中明确禁止用品牌名倒推受众。",
   "抽样非普查：160 条抽样 / 2903 条总体视频，按「每品牌订单应收金额 TOP20」抽取（刻意偏头部投放），**互动率与播放量水平不可外推为总体**，只可用于比较内容结构。",
   "「电商商品GMV」非空率仅 42.3%，0 与 NULL 无法区分「真没卖」与「没回传」，本模块不用它下任何结论；抽样排序主键用 100% 非空的「订单应收金额」。",
   "所有 p 值统一做 BH-FDR 多重比较校正，**q≥0.05 一律标注「未达显著」且不写入结论**；任何跨品牌/跨子赛道比较都并列给出分层稳健性结果；分组样本 <12 只报 n、不给结论。",
   "合规部分基于抽样命中原词，属内容分析、非法律意见，且**尚需人工逐条复核**（见 F 块 verdict 字段）。"
  ],
  "dataset": {
   "id": 3739467,
   "name": "【官方】直客星图订单数据集_每日全量",
   "partition": "p_date=2026-08-31",
   "partition_note": "数据集仅保留近 7 天分区，该分区过期不可复现，明细已固化落盘。",
   "window": "2026-07-01 ~ 2026-09-01（视频发布日）",
   "scope": "抖音电商直客（品牌直营）× 美妆日化行业 · 星图订单（非全量星图、非抖音大盘）",
   "hit_fields": [
    "商品okr品牌名称",
    "云图主品牌名称",
    "cdp品牌名称",
    "品牌名称"
   ],
   "universe_orders": 2904,
   "universe_videos": 2903,
   "universe_brands": 23
  },
  "brands": {
   "board_total": 31,
   "hit_n": 23,
   "zero_order_n": 8,
   "zero_order_brands": [
    "草本伊",
    "uutri/由趣",
    "PETAL STORY",
    "由意",
    "小N",
    "舒芙茵",
    "夏娃之吻",
    "洁尔阴"
   ],
   "zero_order_note": "以上品牌在 p_date=2026-08-31 分区、视频发布日期 2026-07-01~09-01 的直客星图订单中 0 条命中，已用别名 LIKE（babycare/恩威/全棉时代/天娇/uutri 等 15 组）交叉验证；其中「小N」母品牌 Babycare 本窗口亦为 0 单，「奈丝公主」母品牌 Purcotton/全棉时代 另有 344 单但覆盖全品类、无法拆分，未计入。",
   "hit_list": [
    {
     "brand": "朵薇",
     "seg": "经期用品",
     "orders": 39,
     "videos": 39,
     "amount": 13742675.7
    },
    {
     "brand": "Herlab/她研社",
     "seg": "经期用品",
     "orders": 851,
     "videos": 851,
     "amount": 13160351.55
    },
    {
     "brand": "whisper/护舒宝",
     "seg": "经期用品",
     "orders": 109,
     "videos": 109,
     "amount": 11202758.7
    },
    {
     "brand": "FREEMORE/自由点",
     "seg": "经期用品",
     "orders": 493,
     "videos": 493,
     "amount": 4407679.5
    },
    {
     "brand": "SOFY/苏菲",
     "seg": "经期用品",
     "orders": 109,
     "videos": 109,
     "amount": 3650461.5
    },
    {
     "brand": "淘淘氧棉",
     "seg": "经期用品",
     "orders": 65,
     "videos": 65,
     "amount": 2692785.05
    },
    {
     "brand": "LAURIER/乐而雅",
     "seg": "经期用品",
     "orders": 50,
     "videos": 50,
     "amount": 2422560.0
    },
    {
     "brand": "VIA/薇尔",
     "seg": "经期用品",
     "orders": 107,
     "videos": 107,
     "amount": 2193433.2
    },
    {
     "brand": "Nice Princess/奈丝公主",
     "seg": "经期用品",
     "orders": 98,
     "videos": 98,
     "amount": 1635104.1
    },
    {
     "brand": "凸凸棉",
     "seg": "经期用品",
     "orders": 179,
     "videos": 179,
     "amount": 1265302.5
    },
    {
     "brand": "INTIMA/茵缇玛",
     "seg": "私处护理",
     "orders": 29,
     "videos": 29,
     "amount": 1079332.8
    },
    {
     "brand": "棉妮佳",
     "seg": "经期用品",
     "orders": 19,
     "videos": 19,
     "amount": 997605.0
    },
    {
     "brand": "Kotex/高洁丝",
     "seg": "经期用品",
     "orders": 63,
     "videos": 63,
     "amount": 974085.0
    },
    {
     "brand": "妇炎洁",
     "seg": "私处护理",
     "orders": 440,
     "videos": 440,
     "amount": 636279.0
    },
    {
     "brand": "V-GIRL/未可",
     "seg": "经期用品",
     "orders": 22,
     "videos": 22,
     "amount": 568680.0
    },
    {
     "brand": "ABC",
     "seg": "经期用品",
     "orders": 14,
     "videos": 14,
     "amount": 542929.8
    },
    {
     "brand": "Ladycare/洁婷",
     "seg": "经期用品",
     "orders": 7,
     "videos": 7,
     "amount": 144585.0
    },
    {
     "brand": "倍舒特",
     "seg": "经期用品",
     "orders": 51,
     "videos": 51,
     "amount": 124477.5
    },
    {
     "brand": "SPACE7/七度空间",
     "seg": "经期用品",
     "orders": 54,
     "videos": 54,
     "amount": 53550.0
    },
    {
     "brand": "洛蕾诗",
     "seg": "私处护理",
     "orders": 100,
     "videos": 100,
     "amount": 41370.0
    },
    {
     "brand": "Repad/瑞皮兒",
     "seg": "经期用品",
     "orders": 2,
     "videos": 2,
     "amount": 21315.0
    },
    {
     "brand": "Anerle/安尔乐",
     "seg": "经期用品",
     "orders": 1,
     "videos": 1,
     "amount": 13240.5
    },
    {
     "brand": "舒莱",
     "seg": "经期用品",
     "orders": 2,
     "videos": 2,
     "amount": 1680.0
    }
   ]
  },
  "segments": [
   {
    "seg": "私处护理",
    "sampled_brands": [
     "妇炎洁",
     "洛蕾诗",
     "INTIMA/茵缇玛"
    ],
    "n_brands_sampled": 3,
    "brands_with_orders": 3,
    "not_picked": [],
    "pick_note": "该子赛道仅 3 个品牌有星图订单，少于 TOP5 门槛，全部取入，未向下凑数"
   },
   {
    "seg": "经期用品",
    "sampled_brands": [
     "Herlab/她研社",
     "whisper/护舒宝",
     "朵薇",
     "FREEMORE/自由点",
     "SOFY/苏菲"
    ],
    "n_brands_sampled": 5,
    "brands_with_orders": 20,
    "not_picked": [
     "淘淘氧棉",
     "乐而雅",
     "薇尔",
     "奈丝公主",
     "凸凸棉",
     "棉妮佳",
     "高洁丝",
     "未可",
     "ABC",
     "洁婷",
     "倍舒特",
     "七度空间",
     "瑞皮兒",
     "安尔乐",
     "舒莱"
    ],
    "pick_note": "按订单应收金额取 TOP5"
   }
  ],
  "samples": {
   "hit_brands": 23,
   "sampled_brands": 8,
   "per_brand": [
    {
     "brand": "妇炎洁",
     "n": 20,
     "seg": "私处护理"
    },
    {
     "brand": "洛蕾诗",
     "n": 20,
     "seg": "私处护理"
    },
    {
     "brand": "INTIMA/茵缇玛",
     "n": 20,
     "seg": "私处护理"
    },
    {
     "brand": "Herlab/她研社",
     "n": 20,
     "seg": "经期用品"
    },
    {
     "brand": "whisper/护舒宝",
     "n": 20,
     "seg": "经期用品"
    },
    {
     "brand": "朵薇",
     "n": 20,
     "seg": "经期用品"
    },
    {
     "brand": "FREEMORE/自由点",
     "n": 20,
     "seg": "经期用品"
    },
    {
     "brand": "SOFY/苏菲",
     "n": 20,
     "seg": "经期用品"
    }
   ],
   "manifest": 160,
   "downloaded": 136,
   "downloaded_pct": 85.0,
   "annotated": 136,
   "annotated_pct": 85.0,
   "annotated_note": "抽样清单 160 条，已成功下载 136 条、已完成多模态标注 136 条（85.0%）。未取到的 24 条：22 条抖音接口返回 status_self_see（作品已删除或仅作者可见，匿名态拿不到播放地址）、2 条服务端返回的 mp4 文件本身残缺（demux 级扫描发现，ffprobe 仍报完整时长，已剔除不做标注）。其中「朵薇」20 条里有 15 条不可取，因此该品牌只有 5 条标注、不做品牌画像。以上数字均由脚本按实际文件数动态统计。",
   "audience_gender": [
    {
     "code": "female",
     "label": "女性向",
     "n": 136,
     "pct": 100.0
    }
   ],
   "female_n": 136,
   "non_female_n": 0,
   "ruling_field": "audience_gender 是本模块的裁决器：内容画像（A 块）只用 female 的 136 条；本赛道几乎不做男性受众，因此 B 块改做「经期用品 vs 私处护理」两个子赛道的内容对照，而非男女对照。",
   "sampling_rule": "每个入选品牌取「订单应收金额」TOP20 视频（不足则全取）；经期用品按金额取 TOP5 品牌，私处护理仅 3 个品牌有订单、全部取入。"
  },
  "reliability": {
   "status": "done",
   "method": "同一批视频、同 prompt 独立双跑（多模态模型采样带随机性），统计一致率与 Cohen κ。",
   "fields": [
    {
     "field": "tone_primary",
     "label": "主语气",
     "agree": 0.77,
     "kappa": 0.47,
     "n": 30,
     "n_agree": 23,
     "usable": "✅ 可做主结论"
    },
    {
     "field": "audience_gender",
     "label": "受众性别",
     "agree": 1.0,
     "kappa": 1.0,
     "n": 30,
     "n_agree": 30,
     "usable": "✅ 可做主结论"
    },
    {
     "field": "hook_type",
     "label": "钩子类型",
     "agree": 0.83,
     "kappa": 0.76,
     "n": 30,
     "n_agree": 25,
     "usable": "✅ 可做主结论"
    },
    {
     "field": "content_format",
     "label": "内容体裁",
     "agree": 1.0,
     "kappa": 1.0,
     "n": 30,
     "n_agree": 30,
     "usable": "✅ 可做主结论"
    }
   ],
   "multi_fields": [
    {
     "field": "pain_points",
     "label": "痛点",
     "jaccard": 0.7,
     "exact": 0.17
    },
    {
     "field": "product_explain_methods",
     "label": "产品讲解方式",
     "jaccard": 0.81,
     "exact": 0.33
    },
    {
     "field": "persuasion_logic",
     "label": "说服逻辑",
     "jaccard": 0.72,
     "exact": 0.2
    }
   ],
   "note": "全部四个主字段一致率均≥70%，可做主结论。",
   "source": "female/xingtu/RELIABILITY.md"
  },
  "metric_defs": {
   "engagement_rate": "互动率 =（点赞+评论+转发）/播放量；仅统计播放量≥500 的视频。",
   "gmv_per_kvv": "每千次播放 GMV = 电商商品GMV / 播放量 × 1000（因非空率过低，仅描述、不下结论）。",
   "significance": "q = BH-FDR 多重比较校正后的 p 值；本模块统一以 q<0.05 判显著，未达者一律标注「未达显著」。",
   "taboo_direct": "是否直接使用医学/直白词汇谈私处或月经（对应 H 块）。",
   "euphemism_terms": "视频中指代私处/月经/经血的原词，按脚本内置词表归并为「委婉代称 / 直白医学词 / 未归类」。"
  },
  "generated_at": "2026-09-07 21:57",
  "generated_by": "林灿欣",
  "script": "female/xingtu/aggregate_seed.py",
  "sources": [
   "female/xingtu/seeds/*.json",
   "female/xingtu/manifest.json",
   "female/xingtu/raw/orders_q3.json",
   "female/xingtu/raw/brand_hit.json",
   "female/xingtu/raw/sampling_stats.json",
   "female/xingtu/SAMPLING.md",
   "female/xingtu/RELIABILITY.md",
   "female/xingtu/review_compliance.json"
  ],
  "principle": "所有展示数字都在脚本里算好写进 JSON，前端不做任何统计运算。"
 },
 "overall": {
  "n_videos": 2903,
  "n_orders": 2904,
  "n_brands": 23,
  "n_authors": 2185,
  "amount_total": 61572241.4,
  "amount_note": "「订单应收金额」合计 6157 万元，是本模块唯一完整的投放金额口径（2904 单 100% 非空），抽样排序主键即用它。",
  "vv": {
   "n": 2860,
   "median": 63810,
   "mean": 1135558,
   "p90": 2953332,
   "max": 72231605,
   "sum": 3247695941,
   "missing": 43,
   "missing_pct": 1.48
  },
  "duration_sec": {
   "n": 2770,
   "median": 74.68,
   "mean": 131.22,
   "missing_pct": 4.58
  },
  "er": {
   "n_usable": 2149,
   "usable_pct": 74.03,
   "median": 0.0107,
   "p25": 0.0039,
   "p75": 0.0264,
   "p90": 0.0537,
   "note": "仅纳入播放量≥500 的视频，避免极小分母制造伪高互动率。"
  },
  "gmv_fill": {
   "not_null": 1228,
   "not_null_pct": 42.3,
   "positive": 686,
   "positive_pct": 23.63,
   "verdict": "「电商商品GMV」仅 42.3% 的视频非空、23.6% 为正值，且 0 与 NULL 都无法区分「真的没卖」与「没回传」，因此本模块**不用 GMV 做任何主结论**，抽样排序主键改用 100% 非空的「订单应收金额」。"
  },
  "top_brands": [
   {
    "brand": "Herlab/她研社",
    "n": 850,
    "pct": 29.28,
    "seg": "经期用品",
    "amount": 13160351.55
   },
   {
    "brand": "FREEMORE/自由点",
    "n": 493,
    "pct": 16.98,
    "seg": "经期用品",
    "amount": 4407679.5
   },
   {
    "brand": "妇炎洁",
    "n": 440,
    "pct": 15.16,
    "seg": "私处护理",
    "amount": 636279.0
   },
   {
    "brand": "凸凸棉",
    "n": 179,
    "pct": 6.17,
    "seg": "经期用品",
    "amount": 1265302.5
   },
   {
    "brand": "SOFY/苏菲",
    "n": 109,
    "pct": 3.75,
    "seg": "经期用品",
    "amount": 3650461.5
   },
   {
    "brand": "whisper/护舒宝",
    "n": 109,
    "pct": 3.75,
    "seg": "经期用品",
    "amount": 11202758.7
   },
   {
    "brand": "VIA/薇尔",
    "n": 107,
    "pct": 3.69,
    "seg": "经期用品",
    "amount": 2193433.2
   },
   {
    "brand": "洛蕾诗",
    "n": 100,
    "pct": 3.44,
    "seg": "私处护理",
    "amount": 41370.0
   },
   {
    "brand": "Nice Princess/奈丝公主",
    "n": 98,
    "pct": 3.38,
    "seg": "经期用品",
    "amount": 1635104.1
   },
   {
    "brand": "淘淘氧棉",
    "n": 65,
    "pct": 2.24,
    "seg": "经期用品",
    "amount": 2692785.05
   },
   {
    "brand": "Kotex/高洁丝",
    "n": 63,
    "pct": 2.17,
    "seg": "经期用品",
    "amount": 974085.0
   },
   {
    "brand": "SPACE7/七度空间",
    "n": 54,
    "pct": 1.86,
    "seg": "经期用品",
    "amount": 53550.0
   },
   {
    "brand": "倍舒特",
    "n": 51,
    "pct": 1.76,
    "seg": "经期用品",
    "amount": 124477.5
   },
   {
    "brand": "LAURIER/乐而雅",
    "n": 50,
    "pct": 1.72,
    "seg": "经期用品",
    "amount": 2422560.0
   },
   {
    "brand": "朵薇",
    "n": 39,
    "pct": 1.34,
    "seg": "经期用品",
    "amount": 13742675.7
   }
  ],
  "by_seg": [
   {
    "seg": "经期用品",
    "n_videos": 2334,
    "pct": 80.4,
    "amount": 59815259.6
   },
   {
    "seg": "私处护理",
    "n_videos": 569,
    "pct": 19.6,
    "amount": 1756981.8
   }
  ],
  "is_hot": [
   {
    "code": "爆文",
    "n": 2426,
    "pct": 83.57
   },
   {
    "code": "非爆文",
    "n": 247,
    "pct": 8.51
   },
   {
    "code": "未开通云图",
    "n": 230,
    "pct": 7.92
   }
  ],
  "is_hot_note": "「是否爆文」全量 爆文 占 83.6%，几乎没有区分度，本模块不用它做任何分组。",
  "zero_fields": [],
  "null_fields": [],
  "zero_fields_note": "本次取数共 31 个字段，其中数值字段全库 SUM 为 0 的有 0 个、整列全空的有 0 个（见 zero_fields / null_fields）。完播 50%/80%、组件展示/点击 等字段**本次 SQL 未取**（男版同数据集验证其全库 SUM=0 不可用），因此效果侧只用互动率；GMV 因非空率过低只做描述。",
  "partition_note": "数据集仅保留近 7 天分区，p_date=2026-08-31 过期后不可复现；明细已固化在 female/xingtu/raw/orders_q3.json。",
  "source_meta": {
   "dataset": "3739467",
   "table": "【官方】直客星图订单数据集_每日全量",
   "p_date": "2026-08-31",
   "pub_date_window": "2026-07-01~2026-09-01",
   "scope": "抖音电商直客（品牌直营）× 美妆日化行业 · 星图订单（非全量星图、非抖音大盘）",
   "hit_fields": [
    "商品okr品牌名称",
    "云图主品牌名称",
    "cdp品牌名称",
    "品牌名称"
   ],
   "value_whitelist_n": 34,
   "orders": 2904,
   "videos": 2903
  }
 },
 "headlines": [
  {
   "title": "开口第一难：这个赛道到底怎么称呼「那件事」",
   "body": "95.59% 的女性向样本出现了指代私处/月经的原词，平均每条 3.46 个；按词次「委婉代称」占 40.21%、「直白医学词」占 44.89%。TOP 原词是「小花园」54 条、「经期」31 条、「私处」29 条。委婉代称命中率：经期用品 51.85% vs 私处护理 92.73%，q=0.0000 → **显著**",
   "tag": "赛道特有"
  },
  {
   "title": "「直说」的比例：57.35% 的视频用医学词直接谈私处或月经",
   "body": "子赛道差异：经期用品 62.96% vs 私处护理 49.09%，q=0.1577 → **未达显著** 与互动率的关系：命中组互动率中位 0.0253 vs 未命中组 0.0129（n=71/50），q=0.2182 → **未达显著**",
   "tag": "赛道特有"
  },
  {
   "title": "经期用品 vs 私处护理：真正拉开差距的是这几条",
   "body": "痛点 · 清洁方式不对（4.94% vs 65.45%，q=0.0000，留一品牌+粉丝量级分层后仍稳）；内容体裁 · 口播测评（19.75% vs 85.45%，q=0.0000，留一品牌+粉丝量级分层后仍稳）；痛点 · 异味（18.52% vs 72.73%，q=0.0000，留一品牌+粉丝量级分层后仍稳）。共 64 项检验、38 项经 FDR 校正后显著。",
   "tag": "显著"
  },
  {
   "title": "几个「想当然」在数据上不成立",
   "body": "直白谈私处/月经（62.96% vs 49.09%，q=0.16）；便捷性主张（37.04% vs 34.55%，q=0.82）；出现女性称呼语（82.72% vs 92.73%，q=0.14）；出现直白医学词（74.07% vs 69.09%，q=0.60）（前者为经期用品、后者为私处护理）—— 以上差异经多重比较校正后**均未达显著**，不要拿来做投放建议。",
   "tag": "未达显著"
  },
  {
   "title": "内容技巧解释不了互动率",
   "body": "在 n=121 条互动率可用的女性向样本上做了 50 项检验，BH-FDR 校正后 20 项显著；再按品牌分层（van Elteren）后剩 3 项、同时按子赛道分层后只剩 3 项稳健。仅有的稳健项也只能当作「值得 A/B 验证的假设」，不能读成因果。",
   "tag": "诚实结论"
  },
  {
   "title": "7 个品牌的打法画像：结构差异远大于「讲得好不好」",
   "body": "例如 INTIMA/茵缇玛（n=20）：私处洗液 占 100.0%；开场多用「场景代入」（65.0%）；主语气「姐妹平视」（75.0%）；讲解主打「肤感气味描述」（90.0%）；说服锚在「安全温和放心」（90.0%）。直白谈私处/月经 75.0%　CTA 覆盖 50.0%　首次出品中位 33.0s。 全部 7 个品牌画像见 E 块；每品牌仅 20 条头部投放样本，只可比结构、不可比条数与互动率绝对水平。",
   "tag": "品牌"
  },
  {
   "title": "合规：69 条视频命中需核查原词，其中抑菌类单列 62 条",
   "body": "136 条标注样本中 69 条（50.74%）命中合规/资质相关原词，共 94 个词次：疑似违规 17 词次 / 15 条视频，需资质核查（抑菌·杀菌·械字号）77 词次 / 62 条视频。已读取人工复核结论并覆盖到明细行（94/94 条明细已有结论）。",
   "tag": "合规"
  }
 ],
 "A_female_profile": {
  "n": 136,
  "n_all_annotated": 136,
  "single": {
   "hook_type": [
    {
     "code": "scene",
     "label": "场景代入",
     "n": 88,
     "pct": 64.71
    },
    {
     "code": "pain_point",
     "label": "痛点直击",
     "n": 15,
     "pct": 11.03
    },
    {
     "code": "contrast",
     "label": "对比反差",
     "n": 9,
     "pct": 6.62
    },
    {
     "code": "taboo_break",
     "label": "打破羞耻",
     "n": 7,
     "pct": 5.15
    },
    {
     "code": "identity",
     "label": "身份认同",
     "n": 7,
     "pct": 5.15
    },
    {
     "code": "male_voice",
     "label": "男性视角切入",
     "n": 4,
     "pct": 2.94
    },
    {
     "code": "suspense",
     "label": "悬念设问",
     "n": 3,
     "pct": 2.21
    },
    {
     "code": "demo_shock",
     "label": "实测冲击",
     "n": 2,
     "pct": 1.47
    },
    {
     "code": "authority",
     "label": "权威开场",
     "n": 1,
     "pct": 0.74
    }
   ],
   "tone_primary": [
    {
     "code": "peer_sister",
     "label": "姐妹平视",
     "n": 98,
     "pct": 72.06
    },
    {
     "code": "teaching",
     "label": "教学讲解",
     "n": 17,
     "pct": 12.5
    },
    {
     "code": "emotional",
     "label": "情绪共鸣",
     "n": 14,
     "pct": 10.29
    },
    {
     "code": "male_perspective",
     "label": "男性视角",
     "n": 3,
     "pct": 2.21
    },
    {
     "code": "self_deprecating",
     "label": "自嘲",
     "n": 3,
     "pct": 2.21
    },
    {
     "code": "professional",
     "label": "专业克制",
     "n": 1,
     "pct": 0.74
    }
   ],
   "tone_secondary": [
    {
     "code": "teaching",
     "label": "教学讲解",
     "n": 49,
     "pct": 36.03
    },
    {
     "code": "emotional",
     "label": "情绪共鸣",
     "n": 43,
     "pct": 31.62
    },
    {
     "code": "peer_sister",
     "label": "姐妹平视",
     "n": 25,
     "pct": 18.38
    },
    {
     "code": "male_perspective",
     "label": "男性视角",
     "n": 9,
     "pct": 6.62
    },
    {
     "code": null,
     "label": "无次要语气",
     "n": 6,
     "pct": 4.41
    },
    {
     "code": "self_deprecating",
     "label": "自嘲",
     "n": 3,
     "pct": 2.21
    },
    {
     "code": "professional",
     "label": "专业克制",
     "n": 1,
     "pct": 0.74
    }
   ],
   "content_format": [
    {
     "code": "oral_review",
     "label": "口播测评",
     "n": 63,
     "pct": 46.32
    },
    {
     "code": "skit",
     "label": "剧情短片",
     "n": 48,
     "pct": 35.29
    },
    {
     "code": "vlog",
     "label": "生活 vlog",
     "n": 23,
     "pct": 16.91
    },
    {
     "code": "tutorial",
     "label": "教程",
     "n": 1,
     "pct": 0.74
    },
    {
     "code": "experiment",
     "label": "实验演示",
     "n": 1,
     "pct": 0.74
    }
   ],
   "single_vs_bundle": [
    {
     "code": "single",
     "label": "单品",
     "n": 55,
     "pct": 40.44
    },
    {
     "code": "bundle",
     "label": "套组组合",
     "n": 51,
     "pct": 37.5
    },
    {
     "code": "unmentioned",
     "label": "未提及",
     "n": 30,
     "pct": 22.06
    }
   ],
   "talent_gender": [
    {
     "code": "female",
     "label": "女达人",
     "n": 69,
     "pct": 50.74
    },
    {
     "code": "both",
     "label": "男女同框",
     "n": 67,
     "pct": 49.26
    }
   ],
   "product_category": [
    {
     "code": "卫生巾",
     "label": "卫生巾",
     "n": 74,
     "pct": 54.41
    },
    {
     "code": "私处洗液",
     "label": "私处洗液",
     "n": 57,
     "pct": 41.91
    },
    {
     "code": "其他",
     "label": "其他",
     "n": 2,
     "pct": 1.47
    },
    {
     "code": "护垫",
     "label": "护垫",
     "n": 1,
     "pct": 0.74
    },
    {
     "code": "私处护理（凝胶/喷雾/精油）",
     "label": "私处护理（凝胶/喷雾/精油）",
     "n": 1,
     "pct": 0.74
    },
    {
     "code": "安睡裤",
     "label": "安睡裤",
     "n": 1,
     "pct": 0.74
    }
   ],
   "confidence": [
    {
     "code": "high",
     "label": "高置信",
     "n": 132,
     "pct": 97.06
    },
    {
     "code": "low",
     "label": "低置信",
     "n": 4,
     "pct": 2.94
    }
   ]
  },
  "multi": {
   "pain_points": [
    {
     "code": "stuffy",
     "label": "闷热不透气",
     "n": 84,
     "pct": 61.76
    },
    {
     "code": "odor",
     "label": "异味",
     "n": 55,
     "pct": 40.44
    },
    {
     "code": "damp_sticky",
     "label": "潮湿黏腻",
     "n": 54,
     "pct": 39.71
    },
    {
     "code": "itch_private",
     "label": "私处瘙痒",
     "n": 50,
     "pct": 36.76
    },
    {
     "code": "wrong_care",
     "label": "清洁方式不对",
     "n": 40,
     "pct": 29.41
    },
    {
     "code": "flora_imbalance",
     "label": "菌群失衡反复",
     "n": 36,
     "pct": 26.47
    },
    {
     "code": "leak",
     "label": "侧漏后漏",
     "n": 34,
     "pct": 25.0
    },
    {
     "code": "flow_heavy",
     "label": "量大不够用",
     "n": 27,
     "pct": 19.85
    },
    {
     "code": "embarrassment",
     "label": "羞耻难言之隐",
     "n": 23,
     "pct": 16.91
    },
    {
     "code": "other",
     "label": "其他",
     "n": 22,
     "pct": 16.18
    },
    {
     "code": "allergy_sensitive",
     "label": "敏感刺痛过敏",
     "n": 21,
     "pct": 15.44
    },
    {
     "code": "period_pain",
     "label": "痛经经期不适",
     "n": 18,
     "pct": 13.24
    },
    {
     "code": "sport_swim",
     "label": "运动久坐不便",
     "n": 15,
     "pct": 11.03
    },
    {
     "code": "change_hassle",
     "label": "更换携带麻烦",
     "n": 15,
     "pct": 11.03
    },
    {
     "code": "discharge",
     "label": "分泌物困扰",
     "n": 14,
     "pct": 10.29
    },
    {
     "code": "rash",
     "label": "起疹磨红",
     "n": 12,
     "pct": 8.82
    },
    {
     "code": "bulky_feel",
     "label": "厚重有异物感",
     "n": 11,
     "pct": 8.09
    },
    {
     "code": "postpartum",
     "label": "产后特殊护理",
     "n": 10,
     "pct": 7.35
    },
    {
     "code": "night_worry",
     "label": "夜间不安心",
     "n": 6,
     "pct": 4.41
    },
    {
     "code": "dryness",
     "label": "干涩",
     "n": 4,
     "pct": 2.94
    },
    {
     "code": "cost",
     "label": "花费不划算",
     "n": 4,
     "pct": 2.94
    },
    {
     "code": "material_distrust",
     "label": "材质不放心",
     "n": 3,
     "pct": 2.21
    }
   ],
   "product_explain_methods": [
    {
     "code": "sensory",
     "label": "肤感气味描述",
     "n": 130,
     "pct": 95.59
    },
    {
     "code": "live_demo",
     "label": "现场实测",
     "n": 99,
     "pct": 72.79
    },
    {
     "code": "ingredient",
     "label": "成分讲解",
     "n": 90,
     "pct": 66.18
    },
    {
     "code": "mechanism",
     "label": "作用机理",
     "n": 86,
     "pct": 63.24
    },
    {
     "code": "certification",
     "label": "检测报告资质",
     "n": 58,
     "pct": 42.65
    },
    {
     "code": "spec_compare",
     "label": "参数规格对比",
     "n": 36,
     "pct": 26.47
    },
    {
     "code": "material_teardown",
     "label": "拆开看内部结构",
     "n": 34,
     "pct": 25.0
    },
    {
     "code": "usage_steps",
     "label": "使用步骤",
     "n": 30,
     "pct": 22.06
    },
    {
     "code": "competitor_compare",
     "label": "竞品对比",
     "n": 27,
     "pct": 19.85
    },
    {
     "code": "before_after",
     "label": "前后对比",
     "n": 5,
     "pct": 3.68
    }
   ],
   "persuasion_logic": [
    {
     "code": "safety_assurance",
     "label": "安全温和放心",
     "n": 113,
     "pct": 83.09
    },
    {
     "code": "peer_endorse",
     "label": "姐妹闺蜜认可",
     "n": 102,
     "pct": 75.0
    },
    {
     "code": "self_care",
     "label": "悦己爱自己",
     "n": 55,
     "pct": 40.44
    },
    {
     "code": "efficacy_data",
     "label": "功效数据",
     "n": 52,
     "pct": 38.24
    },
    {
     "code": "social_proof",
     "label": "销量口碑证明",
     "n": 45,
     "pct": 33.09
    },
    {
     "code": "price_value",
     "label": "性价比划算",
     "n": 28,
     "pct": 20.59
    },
    {
     "code": "male_endorse",
     "label": "男性视角认可",
     "n": 18,
     "pct": 13.24
    },
    {
     "code": "taboo_normalize",
     "label": "去羞耻化",
     "n": 13,
     "pct": 9.56
    },
    {
     "code": "expert_authority",
     "label": "专家医生背书",
     "n": 13,
     "pct": 9.56
    },
    {
     "code": "convenience",
     "label": "省事便捷",
     "n": 10,
     "pct": 7.35
    },
    {
     "code": "fear_appeal",
     "label": "恐惧诉求",
     "n": 4,
     "pct": 2.94
    }
   ],
   "cta_form": [
    {
     "code": "none",
     "label": "无引导",
     "n": 91,
     "pct": 66.91
    },
    {
     "code": "voice",
     "label": "口播引导",
     "n": 41,
     "pct": 30.15
    },
    {
     "code": "subtitle",
     "label": "字幕引导",
     "n": 32,
     "pct": 23.53
    },
    {
     "code": "cart",
     "label": "购物车挂链",
     "n": 4,
     "pct": 2.94
    },
    {
     "code": "comment",
     "label": "评论区引导",
     "n": 2,
     "pct": 1.47
    }
   ]
  },
  "bool": [
   {
    "code": "taboo_direct",
    "label": "直白谈私处/月经",
    "n": 78,
    "pct": 57.35
   },
   {
    "code": "convenience_claim",
    "label": "便捷性主张",
    "n": 49,
    "pct": 36.03
   },
   {
    "code": "cta",
    "label": "有明确 CTA",
    "n": 45,
    "pct": 33.09
   },
   {
    "code": "price_mention",
    "label": "提及价格",
    "n": 31,
    "pct": 22.79
   },
   {
    "code": "gift_scene",
    "label": "送礼场景",
    "n": 27,
    "pct": 19.85
   },
   {
    "code": "male_talent_female_product",
    "label": "男达人讲女性产品",
    "n": 0,
    "pct": 0.0
   },
   {
    "code": "euphemism_any",
    "label": "出现私处/月经代称",
    "n": 130,
    "pct": 95.59
   },
   {
    "code": "female_address_any",
    "label": "出现女性称呼语",
    "n": 118,
    "pct": 86.76
   }
  ],
  "continuous": {
   "first_product_sec": {
    "n": 136,
    "median": 41.0,
    "mean": 43.07,
    "p25": 8.75,
    "p75": 69.25
   },
   "total_duration_sec": {
    "n": 136,
    "median": 120.4,
    "mean": 156.04
   }
  },
  "brand_mix": [
   {
    "brand": "INTIMA/茵缇玛",
    "n": 20,
    "pct": 14.71,
    "seg": "私处护理"
   },
   {
    "brand": "Herlab/她研社",
    "n": 20,
    "pct": 14.71,
    "seg": "经期用品"
   },
   {
    "brand": "FREEMORE/自由点",
    "n": 19,
    "pct": 13.97,
    "seg": "经期用品"
   },
   {
    "brand": "SOFY/苏菲",
    "n": 19,
    "pct": 13.97,
    "seg": "经期用品"
   },
   {
    "brand": "洛蕾诗",
    "n": 19,
    "pct": 13.97,
    "seg": "私处护理"
   },
   {
    "brand": "whisper/护舒宝",
    "n": 18,
    "pct": 13.24,
    "seg": "经期用品"
   },
   {
    "brand": "妇炎洁",
    "n": 16,
    "pct": 11.76,
    "seg": "私处护理"
   },
   {
    "brand": "朵薇",
    "n": 5,
    "pct": 3.68,
    "seg": "经期用品"
   }
  ],
  "seg_mix": [
   {
    "seg": "经期用品",
    "n": 81,
    "pct": 59.56
   },
   {
    "seg": "私处护理",
    "n": 55,
    "pct": 40.44
   }
  ],
  "caveat": "A 块是 136 条 audience_gender=female 样本的内容特征分布。样本按「每品牌订单应收金额 TOP20」抽取，是**头部投放样本、不是随机样本**：分布可用于比较品牌与子赛道之间的讲法结构，但不可外推为「全量 2903 条视频的内容结构」；品类分布同时受抽样品牌配额（8 个品牌各 20 条）影响。"
 },
 "B_segment_contrast": {
  "g1_label": "经期用品",
  "g2_label": "私处护理",
  "g1_n": 81,
  "g2_n": 55,
  "n_tests": 64,
  "alpha": 0.05,
  "g1_brands": [
   {
    "brand": "Herlab/她研社",
    "n": 20
   },
   {
    "brand": "FREEMORE/自由点",
    "n": 19
   },
   {
    "brand": "SOFY/苏菲",
    "n": 19
   },
   {
    "brand": "whisper/护舒宝",
    "n": 18
   },
   {
    "brand": "朵薇",
    "n": 5
   }
  ],
  "g2_brands": [
   {
    "brand": "INTIMA/茵缇玛",
    "n": 20
   },
   {
    "brand": "洛蕾诗",
    "n": 19
   },
   {
    "brand": "妇炎洁",
    "n": 16
   }
  ],
  "category_mix": {
   "g1": [
    {
     "code": "卫生巾",
     "label": "卫生巾",
     "n": 74,
     "pct": 91.36
    },
    {
     "code": "私处洗液",
     "label": "私处洗液",
     "n": 4,
     "pct": 4.94
    },
    {
     "code": "其他",
     "label": "其他",
     "n": 2,
     "pct": 2.47
    },
    {
     "code": "安睡裤",
     "label": "安睡裤",
     "n": 1,
     "pct": 1.23
    }
   ],
   "g2": [
    {
     "code": "私处洗液",
     "label": "私处洗液",
     "n": 53,
     "pct": 96.36
    },
    {
     "code": "护垫",
     "label": "护垫",
     "n": 1,
     "pct": 1.82
    },
    {
     "code": "私处护理（凝胶/喷雾/精油）",
     "label": "私处护理（凝胶/喷雾/精油）",
     "n": 1,
     "pct": 1.82
    }
   ],
   "note": "品类构成只做描述、不进检验：品类与子赛道是定义关系（卫生巾/安睡裤必属经期用品，私处洗液/湿巾必属私处护理），对它做显著性检验等于检验「1=1」，还会稀释 FDR 家族。"
  },
  "method": "2×2 卡方（期望频数≥5）或 Fisher 精确检验；连续变量用 Mann-Whitney U；共 64 项检验统一做 Benjamini-Hochberg FDR 校正，仅 q<0.05 计为显著。",
  "tests": [
   {
    "field": "total_duration_sec",
    "code": "median",
    "g1_n": 81,
    "g2_n": 55,
    "p": 7.143252094009007e-15,
    "method": "mannwhitney",
    "g1_median": 175.4,
    "g2_median": 59.4,
    "q": 4.571681340165764e-13,
    "sig": true,
    "g1_pct": 175.4,
    "g2_pct": 59.4,
    "label": "视频时长（中位数，秒）",
    "direction": "g1_higher",
    "lift": 2.95
   },
   {
    "field": "pain_points",
    "code": "wrong_care",
    "g1_n": 4,
    "g2_n": 36,
    "p": 2.9269497103518885e-14,
    "method": "chi2",
    "q": 9.366239073126043e-13,
    "sig": true,
    "g1_pct": 4.94,
    "g2_pct": 65.45,
    "label": "痛点 · 清洁方式不对",
    "direction": "g2_higher",
    "lift": 0.08
   },
   {
    "field": "content_format",
    "code": "oral_review",
    "g1_n": 16,
    "g2_n": 47,
    "p": 4.6590456435344484e-14,
    "method": "chi2",
    "q": 9.93929737287349e-13,
    "sig": true,
    "g1_pct": 19.75,
    "g2_pct": 85.45,
    "label": "内容体裁 · 口播测评",
    "direction": "g2_higher",
    "lift": 0.23
   },
   {
    "field": "first_product_sec",
    "code": "median",
    "g1_n": 81,
    "g2_n": 55,
    "p": 3.2711881156456446e-11,
    "method": "mannwhitney",
    "g1_median": 56.0,
    "g2_median": 10.0,
    "q": 5.233900985033031e-10,
    "sig": true,
    "g1_pct": 56.0,
    "g2_pct": 10.0,
    "label": "首次出现产品秒数（中位数，秒）",
    "direction": "g1_higher",
    "lift": 5.6
   },
   {
    "field": "pain_points",
    "code": "odor",
    "g1_n": 15,
    "g2_n": 40,
    "p": 2.5857944875774867e-10,
    "method": "chi2",
    "q": 3.309816944099183e-09,
    "sig": true,
    "g1_pct": 18.52,
    "g2_pct": 72.73,
    "label": "痛点 · 异味",
    "direction": "g2_higher",
    "lift": 0.25
   },
   {
    "field": "pain_points",
    "code": "stuffy",
    "g1_n": 67,
    "g2_n": 17,
    "p": 1.0504555253283005e-09,
    "method": "chi2",
    "q": 1.1204858936835204e-08,
    "sig": true,
    "g1_pct": 82.72,
    "g2_pct": 30.91,
    "label": "痛点 · 闷热不透气",
    "direction": "g1_higher",
    "lift": 2.68
   },
   {
    "field": "cta_form",
    "code": "voice",
    "g1_n": 9,
    "g2_n": 32,
    "p": 4.339443552257553e-09,
    "method": "chi2",
    "q": 3.967491247778334e-08,
    "sig": true,
    "g1_pct": 11.11,
    "g2_pct": 58.18,
    "label": "CTA 形式 · 口播引导",
    "direction": "g2_higher",
    "lift": 0.19
   },
   {
    "field": "pain_points",
    "code": "leak",
    "g1_n": 34,
    "g2_n": 0,
    "p": 2.8871935991528918e-08,
    "method": "chi2",
    "q": 2.0531154482865008e-07,
    "sig": true,
    "g1_pct": 41.98,
    "g2_pct": 0.0,
    "label": "痛点 · 侧漏后漏",
    "direction": "g1_higher",
    "lift": null
   },
   {
    "field": "product_explain_methods",
    "code": "material_teardown",
    "g1_n": 34,
    "g2_n": 0,
    "p": 2.8871935991528918e-08,
    "method": "chi2",
    "q": 2.0531154482865008e-07,
    "sig": true,
    "g1_pct": 41.98,
    "g2_pct": 0.0,
    "label": "产品讲解方式 · 拆开看内部结构",
    "direction": "g1_higher",
    "lift": null
   },
   {
    "field": "cta",
    "code": true,
    "g1_n": 12,
    "g2_n": 33,
    "p": 3.880653283588325e-08,
    "method": "chi2",
    "q": 2.2578346377241166e-07,
    "sig": true,
    "g1_pct": 14.81,
    "g2_pct": 60.0,
    "label": "有明确 CTA",
    "direction": "g2_higher",
    "lift": 0.25
   },
   {
    "field": "cta_form",
    "code": "none",
    "g1_n": 69,
    "g2_n": 22,
    "p": 3.8806532835883255e-08,
    "method": "chi2",
    "q": 2.2578346377241166e-07,
    "sig": true,
    "g1_pct": 85.19,
    "g2_pct": 40.0,
    "label": "CTA 形式 · 无引导",
    "direction": "g1_higher",
    "lift": 2.13
   },
   {
    "field": "persuasion_logic",
    "code": "price_value",
    "g1_n": 5,
    "g2_n": 23,
    "p": 4.523095685637697e-07,
    "method": "chi2",
    "q": 2.3984050880072875e-06,
    "sig": true,
    "g1_pct": 6.17,
    "g2_pct": 41.82,
    "label": "说服逻辑 · 性价比划算",
    "direction": "g2_higher",
    "lift": 0.15
   },
   {
    "field": "euphemism_any",
    "code": true,
    "g1_n": 42,
    "g2_n": 51,
    "p": 4.871760335014803e-07,
    "method": "chi2",
    "q": 2.3984050880072875e-06,
    "sig": true,
    "g1_pct": 51.85,
    "g2_pct": 92.73,
    "label": "出现私处/月经代称",
    "direction": "g2_higher",
    "lift": 0.56
   },
   {
    "field": "hook_type",
    "code": "scene",
    "g1_n": 66,
    "g2_n": 22,
    "p": 6.763090689329684e-07,
    "method": "chi2",
    "q": 2.900567102879549e-06,
    "sig": true,
    "g1_pct": 81.48,
    "g2_pct": 40.0,
    "label": "钩子类型 · 场景代入",
    "direction": "g1_higher",
    "lift": 2.04
   },
   {
    "field": "cta_form",
    "code": "subtitle",
    "g1_n": 7,
    "g2_n": 25,
    "p": 6.798204147373942e-07,
    "method": "chi2",
    "q": 2.900567102879549e-06,
    "sig": true,
    "g1_pct": 8.64,
    "g2_pct": 45.45,
    "label": "CTA 形式 · 字幕引导",
    "direction": "g2_higher",
    "lift": 0.19
   },
   {
    "field": "pain_points",
    "code": "flow_heavy",
    "g1_n": 27,
    "g2_n": 0,
    "p": 1.7292030923927627e-06,
    "method": "chi2",
    "q": 6.916812369571051e-06,
    "sig": true,
    "g1_pct": 33.33,
    "g2_pct": 0.0,
    "label": "痛点 · 量大不够用",
    "direction": "g1_higher",
    "lift": null
   },
   {
    "field": "product_explain_methods",
    "code": "ingredient",
    "g1_n": 41,
    "g2_n": 49,
    "p": 3.2505152003544356e-06,
    "method": "chi2",
    "q": 1.2237233695451992e-05,
    "sig": true,
    "g1_pct": 50.62,
    "g2_pct": 89.09,
    "label": "产品讲解方式 · 成分讲解",
    "direction": "g2_higher",
    "lift": 0.57
   },
   {
    "field": "content_format",
    "code": "skit",
    "g1_n": 41,
    "g2_n": 7,
    "p": 5.681390767156765e-06,
    "method": "chi2",
    "q": 2.0200500505446275e-05,
    "sig": true,
    "g1_pct": 50.62,
    "g2_pct": 12.73,
    "label": "内容体裁 · 剧情短片",
    "direction": "g1_higher",
    "lift": 3.98
   },
   {
    "field": "pain_points",
    "code": "discharge",
    "g1_n": 1,
    "g2_n": 13,
    "p": 2.4514857905441002e-05,
    "method": "chi2",
    "q": 8.257636347095917e-05,
    "sig": true,
    "g1_pct": 1.23,
    "g2_pct": 23.64,
    "label": "痛点 · 分泌物困扰",
    "direction": "g2_higher",
    "lift": 0.05
   },
   {
    "field": "product_explain_methods",
    "code": "usage_steps",
    "g1_n": 8,
    "g2_n": 22,
    "p": 3.210450710217699e-05,
    "method": "chi2",
    "q": 0.00010273442272696637,
    "sig": true,
    "g1_pct": 9.88,
    "g2_pct": 40.0,
    "label": "产品讲解方式 · 使用步骤",
    "direction": "g2_higher",
    "lift": 0.25
   },
   {
    "field": "talent_gender",
    "code": "both",
    "g1_n": 51,
    "g2_n": 16,
    "p": 0.00010545371535766981,
    "method": "chi2",
    "q": 0.00028160607917875557,
    "sig": true,
    "g1_pct": 62.96,
    "g2_pct": 29.09,
    "label": "达人性别 · 男女同框",
    "direction": "g1_higher",
    "lift": 2.16
   },
   {
    "field": "talent_gender",
    "code": "female",
    "g1_n": 30,
    "g2_n": 39,
    "p": 0.00010545371535766981,
    "method": "chi2",
    "q": 0.00028160607917875557,
    "sig": true,
    "g1_pct": 37.04,
    "g2_pct": 70.91,
    "label": "达人性别 · 女达人",
    "direction": "g2_higher",
    "lift": 0.52
   },
   {
    "field": "pain_points",
    "code": "damp_sticky",
    "g1_n": 43,
    "g2_n": 11,
    "p": 0.00010872277539801838,
    "method": "chi2",
    "q": 0.00028160607917875557,
    "sig": true,
    "g1_pct": 53.09,
    "g2_pct": 20.0,
    "label": "痛点 · 潮湿黏腻",
    "direction": "g1_higher",
    "lift": 2.65
   },
   {
    "field": "content_format",
    "code": "vlog",
    "g1_n": 22,
    "g2_n": 1,
    "p": 0.00010913232683498815,
    "method": "chi2",
    "q": 0.00028160607917875557,
    "sig": true,
    "g1_pct": 27.16,
    "g2_pct": 1.82,
    "label": "内容体裁 · 生活 vlog",
    "direction": "g1_higher",
    "lift": 14.92
   },
   {
    "field": "hook_type",
    "code": "pain_point",
    "g1_n": 2,
    "g2_n": 13,
    "p": 0.00011000237467920138,
    "method": "chi2",
    "q": 0.00028160607917875557,
    "sig": true,
    "g1_pct": 2.47,
    "g2_pct": 23.64,
    "label": "钩子类型 · 痛点直击",
    "direction": "g2_higher",
    "lift": 0.1
   },
   {
    "field": "persuasion_logic",
    "code": "efficacy_data",
    "g1_n": 41,
    "g2_n": 11,
    "p": 0.00031102341592923616,
    "method": "chi2",
    "q": 0.000765596100748889,
    "sig": true,
    "g1_pct": 50.62,
    "g2_pct": 20.0,
    "label": "说服逻辑 · 功效数据",
    "direction": "g1_higher",
    "lift": 2.53
   },
   {
    "field": "gift_scene",
    "code": true,
    "g1_n": 24,
    "g2_n": 3,
    "p": 0.0005229919268204394,
    "method": "chi2",
    "q": 0.0012396845672780785,
    "sig": true,
    "g1_pct": 29.63,
    "g2_pct": 5.45,
    "label": "送礼场景",
    "direction": "g1_higher",
    "lift": 5.44
   },
   {
    "field": "pain_points",
    "code": "flora_imbalance",
    "g1_n": 13,
    "g2_n": 23,
    "p": 0.0008287821922587464,
    "method": "chi2",
    "q": 0.0018943592965914202,
    "sig": true,
    "g1_pct": 16.05,
    "g2_pct": 41.82,
    "label": "痛点 · 菌群失衡反复",
    "direction": "g2_higher",
    "lift": 0.38
   },
   {
    "field": "pain_points",
    "code": "bulky_feel",
    "g1_n": 11,
    "g2_n": 0,
    "p": 0.0030012513715755003,
    "method": "fisher",
    "q": 0.006623451302787311,
    "sig": true,
    "g1_pct": 13.58,
    "g2_pct": 0.0,
    "label": "痛点 · 厚重有异物感",
    "direction": "g1_higher",
    "lift": null
   },
   {
    "field": "persuasion_logic",
    "code": "social_proof",
    "g1_n": 19,
    "g2_n": 26,
    "p": 0.003768656397523884,
    "method": "chi2",
    "q": 0.00803980031471762,
    "sig": true,
    "g1_pct": 23.46,
    "g2_pct": 47.27,
    "label": "说服逻辑 · 销量口碑证明",
    "direction": "g2_higher",
    "lift": 0.5
   },
   {
    "field": "product_explain_methods",
    "code": "live_demo",
    "g1_n": 66,
    "g2_n": 33,
    "p": 0.005731945175347158,
    "method": "chi2",
    "q": 0.011833693265232844,
    "sig": true,
    "g1_pct": 81.48,
    "g2_pct": 60.0,
    "label": "产品讲解方式 · 现场实测",
    "direction": "g1_higher",
    "lift": 1.36
   },
   {
    "field": "pain_points",
    "code": "period_pain",
    "g1_n": 16,
    "g2_n": 2,
    "p": 0.006488239896182345,
    "method": "chi2",
    "q": 0.01297647979236469,
    "sig": true,
    "g1_pct": 19.75,
    "g2_pct": 3.64,
    "label": "痛点 · 痛经经期不适",
    "direction": "g1_higher",
    "lift": 5.43
   },
   {
    "field": "tone_primary",
    "code": "teaching",
    "g1_n": 5,
    "g2_n": 12,
    "p": 0.006777682948549376,
    "method": "chi2",
    "q": 0.013144597233550305,
    "sig": true,
    "g1_pct": 6.17,
    "g2_pct": 21.82,
    "label": "主语气 · 教学讲解",
    "direction": "g2_higher",
    "lift": 0.28
   },
   {
    "field": "price_mention",
    "code": true,
    "g1_n": 12,
    "g2_n": 19,
    "p": 0.007104617028541347,
    "method": "chi2",
    "q": 0.013373396759607241,
    "sig": true,
    "g1_pct": 14.81,
    "g2_pct": 34.55,
    "label": "提及价格",
    "direction": "g2_higher",
    "lift": 0.43
   },
   {
    "field": "product_explain_methods",
    "code": "mechanism",
    "g1_n": 44,
    "g2_n": 42,
    "p": 0.00888330393603604,
    "method": "chi2",
    "q": 0.016243755768751617,
    "sig": true,
    "g1_pct": 54.32,
    "g2_pct": 76.36,
    "label": "产品讲解方式 · 作用机理",
    "direction": "g2_higher",
    "lift": 0.71
   },
   {
    "field": "pain_points",
    "code": "other",
    "g1_n": 18,
    "g2_n": 4,
    "p": 0.020148465045661194,
    "method": "chi2",
    "q": 0.03581949341450879,
    "sig": true,
    "g1_pct": 22.22,
    "g2_pct": 7.27,
    "label": "痛点 · 其他",
    "direction": "g1_higher",
    "lift": 3.06
   },
   {
    "field": "pain_points",
    "code": "change_hassle",
    "g1_n": 13,
    "g2_n": 2,
    "p": 0.023332591485020444,
    "method": "chi2",
    "q": 0.040359077163278606,
    "sig": true,
    "g1_pct": 16.05,
    "g2_pct": 3.64,
    "label": "痛点 · 更换携带麻烦",
    "direction": "g1_higher",
    "lift": 4.41
   },
   {
    "field": "pain_points",
    "code": "embarrassment",
    "g1_n": 9,
    "g2_n": 14,
    "p": 0.028524528088180182,
    "method": "chi2",
    "q": 0.04804131046430347,
    "sig": true,
    "g1_pct": 11.11,
    "g2_pct": 25.45,
    "label": "痛点 · 羞耻难言之隐",
    "direction": "g2_higher",
    "lift": 0.44
   },
   {
    "field": "persuasion_logic",
    "code": "peer_endorse",
    "g1_n": 66,
    "g2_n": 36,
    "p": 0.03414273324936537,
    "method": "chi2",
    "q": 0.056029100716907275,
    "sig": false,
    "g1_pct": 81.48,
    "g2_pct": 65.45,
    "label": "说服逻辑 · 姐妹闺蜜认可",
    "direction": "g1_higher",
    "lift": 1.24
   },
   {
    "field": "tone_primary",
    "code": "emotional",
    "g1_n": 12,
    "g2_n": 2,
    "p": 0.03525802552609969,
    "method": "chi2",
    "q": 0.0564128408417595,
    "sig": false,
    "g1_pct": 14.81,
    "g2_pct": 3.64,
    "label": "主语气 · 情绪共鸣",
    "direction": "g1_higher",
    "lift": 4.07
   },
   {
    "field": "single_vs_bundle",
    "code": "unmentioned",
    "g1_n": 22,
    "g2_n": 8,
    "p": 0.08163469019024243,
    "method": "chi2",
    "q": 0.1274297602969638,
    "sig": false,
    "g1_pct": 27.16,
    "g2_pct": 14.55,
    "label": "单品/套组 · 未提及",
    "direction": "g1_higher",
    "lift": 1.87
   },
   {
    "field": "female_address_any",
    "code": true,
    "g1_n": 67,
    "g2_n": 51,
    "p": 0.09086685266065095,
    "method": "chi2",
    "q": 0.13582282200255008,
    "sig": false,
    "g1_pct": 82.72,
    "g2_pct": 92.73,
    "label": "出现女性称呼语",
    "direction": "g2_higher",
    "lift": 0.89
   },
   {
    "field": "pain_points",
    "code": "allergy_sensitive",
    "g1_n": 16,
    "g2_n": 5,
    "p": 0.09125595853296334,
    "method": "chi2",
    "q": 0.13582282200255008,
    "sig": false,
    "g1_pct": 19.75,
    "g2_pct": 9.09,
    "label": "痛点 · 敏感刺痛过敏",
    "direction": "g1_higher",
    "lift": 2.17
   },
   {
    "field": "taboo_direct",
    "code": true,
    "g1_n": 51,
    "g2_n": 27,
    "p": 0.10841432604773371,
    "method": "chi2",
    "q": 0.15769356516033994,
    "sig": false,
    "g1_pct": 62.96,
    "g2_pct": 49.09,
    "label": "直白谈私处/月经",
    "direction": "g1_higher",
    "lift": 1.28
   },
   {
    "field": "pain_points",
    "code": "rash",
    "g1_n": 10,
    "g2_n": 2,
    "p": 0.12224532988511672,
    "method": "fisher",
    "q": 0.17230942427688137,
    "sig": false,
    "g1_pct": 12.35,
    "g2_pct": 3.64,
    "label": "痛点 · 起疹磨红",
    "direction": "g1_higher",
    "lift": 3.39
   },
   {
    "field": "persuasion_logic",
    "code": "safety_assurance",
    "g1_n": 64,
    "g2_n": 49,
    "p": 0.12384739869900847,
    "method": "chi2",
    "q": 0.17230942427688137,
    "sig": false,
    "g1_pct": 79.01,
    "g2_pct": 89.09,
    "label": "说服逻辑 · 安全温和放心",
    "direction": "g2_higher",
    "lift": 0.89
   },
   {
    "field": "hook_type",
    "code": "contrast",
    "g1_n": 3,
    "g2_n": 6,
    "p": 0.15732908772710222,
    "method": "fisher",
    "q": 0.2116156038202408,
    "sig": false,
    "g1_pct": 3.7,
    "g2_pct": 10.91,
    "label": "钩子类型 · 对比反差",
    "direction": "g2_higher",
    "lift": 0.34
   },
   {
    "field": "product_explain_methods",
    "code": "spec_compare",
    "g1_n": 25,
    "g2_n": 11,
    "p": 0.1587117028651806,
    "method": "chi2",
    "q": 0.2116156038202408,
    "sig": false,
    "g1_pct": 30.86,
    "g2_pct": 20.0,
    "label": "产品讲解方式 · 参数规格对比",
    "direction": "g1_higher",
    "lift": 1.54
   },
   {
    "field": "product_explain_methods",
    "code": "sensory",
    "g1_n": 79,
    "g2_n": 51,
    "p": 0.2214568886746486,
    "method": "fisher",
    "q": 0.2892498137791329,
    "sig": false,
    "g1_pct": 97.53,
    "g2_pct": 92.73,
    "label": "产品讲解方式 · 肤感气味描述",
    "direction": "g1_higher",
    "lift": 1.05
   },
   {
    "field": "persuasion_logic",
    "code": "taboo_normalize",
    "g1_n": 6,
    "g2_n": 7,
    "p": 0.30041364092692996,
    "method": "chi2",
    "q": 0.38452946038647035,
    "sig": false,
    "g1_pct": 7.41,
    "g2_pct": 12.73,
    "label": "说服逻辑 · 去羞耻化",
    "direction": "g2_higher",
    "lift": 0.58
   },
   {
    "field": "persuasion_logic",
    "code": "self_care",
    "g1_n": 30,
    "g2_n": 25,
    "p": 0.3262763799482941,
    "method": "chi2",
    "q": 0.40944486895472204,
    "sig": false,
    "g1_pct": 37.04,
    "g2_pct": 45.45,
    "label": "说服逻辑 · 悦己爱自己",
    "direction": "g2_higher",
    "lift": 0.81
   },
   {
    "field": "persuasion_logic",
    "code": "male_endorse",
    "g1_n": 9,
    "g2_n": 9,
    "p": 0.3750122842278528,
    "method": "chi2",
    "q": 0.46155358058812657,
    "sig": false,
    "g1_pct": 11.11,
    "g2_pct": 16.36,
    "label": "说服逻辑 · 男性视角认可",
    "direction": "g2_higher",
    "lift": 0.68
   },
   {
    "field": "single_vs_bundle",
    "code": "bundle",
    "g1_n": 28,
    "g2_n": 23,
    "p": 0.3913655445356371,
    "method": "chi2",
    "q": 0.472592355665675,
    "sig": false,
    "g1_pct": 34.57,
    "g2_pct": 41.82,
    "label": "单品/套组 · 套组组合",
    "direction": "g2_higher",
    "lift": 0.83
   },
   {
    "field": "pain_points",
    "code": "postpartum",
    "g1_n": 5,
    "g2_n": 5,
    "p": 0.5249912890149357,
    "method": "fisher",
    "q": 0.5968344588058054,
    "sig": false,
    "g1_pct": 6.17,
    "g2_pct": 9.09,
    "label": "痛点 · 产后特殊护理",
    "direction": "g2_higher",
    "lift": 0.68
   },
   {
    "field": "persuasion_logic",
    "code": "convenience",
    "g1_n": 5,
    "g2_n": 5,
    "p": 0.5249912890149357,
    "method": "fisher",
    "q": 0.5968344588058054,
    "sig": false,
    "g1_pct": 6.17,
    "g2_pct": 9.09,
    "label": "说服逻辑 · 省事便捷",
    "direction": "g2_higher",
    "lift": 0.68
   },
   {
    "field": "explicit_any",
    "code": true,
    "g1_n": 60,
    "g2_n": 38,
    "p": 0.5250277713215515,
    "method": "chi2",
    "q": 0.5968344588058054,
    "sig": false,
    "g1_pct": 74.07,
    "g2_pct": 69.09,
    "label": "出现直白医学词",
    "direction": "g1_higher",
    "lift": 1.07
   },
   {
    "field": "single_vs_bundle",
    "code": "single",
    "g1_n": 31,
    "g2_n": 24,
    "p": 0.5315556898739204,
    "method": "chi2",
    "q": 0.5968344588058054,
    "sig": false,
    "g1_pct": 38.27,
    "g2_pct": 43.64,
    "label": "单品/套组 · 单品",
    "direction": "g2_higher",
    "lift": 0.88
   },
   {
    "field": "product_explain_methods",
    "code": "certification",
    "g1_n": 33,
    "g2_n": 25,
    "p": 0.5854020444204002,
    "method": "chi2",
    "q": 0.6459608766018209,
    "sig": false,
    "g1_pct": 40.74,
    "g2_pct": 45.45,
    "label": "产品讲解方式 · 检测报告资质",
    "direction": "g2_higher",
    "lift": 0.9
   },
   {
    "field": "product_explain_methods",
    "code": "competitor_compare",
    "g1_n": 15,
    "g2_n": 12,
    "p": 0.6358970772147448,
    "method": "chi2",
    "q": 0.6897866600295536,
    "sig": false,
    "g1_pct": 18.52,
    "g2_pct": 21.82,
    "label": "产品讲解方式 · 竞品对比",
    "direction": "g2_higher",
    "lift": 0.85
   },
   {
    "field": "convenience_claim",
    "code": true,
    "g1_n": 30,
    "g2_n": 19,
    "p": 0.7664380720298988,
    "method": "chi2",
    "q": 0.8175339434985587,
    "sig": false,
    "g1_pct": 37.04,
    "g2_pct": 34.55,
    "label": "便捷性主张",
    "direction": "g1_higher",
    "lift": 1.07
   },
   {
    "field": "tone_primary",
    "code": "peer_sister",
    "g1_n": 59,
    "g2_n": 39,
    "p": 0.8055049616877186,
    "method": "chi2",
    "q": 0.845119959803508,
    "sig": false,
    "g1_pct": 72.84,
    "g2_pct": 70.91,
    "label": "主语气 · 姐妹平视",
    "direction": "g1_higher",
    "lift": 1.03
   },
   {
    "field": "persuasion_logic",
    "code": "expert_authority",
    "g1_n": 8,
    "g2_n": 5,
    "p": 0.8784543873411835,
    "method": "chi2",
    "q": 0.906791625642512,
    "sig": false,
    "g1_pct": 9.88,
    "g2_pct": 9.09,
    "label": "说服逻辑 · 专家医生背书",
    "direction": "g1_higher",
    "lift": 1.09
   },
   {
    "field": "pain_points",
    "code": "itch_private",
    "g1_n": 30,
    "g2_n": 20,
    "p": 0.9362895900390599,
    "method": "chi2",
    "q": 0.9511513295634894,
    "sig": false,
    "g1_pct": 37.04,
    "g2_pct": 36.36,
    "label": "痛点 · 私处瘙痒",
    "direction": "g1_higher",
    "lift": 1.02
   },
   {
    "field": "pain_points",
    "code": "sport_swim",
    "g1_n": 9,
    "g2_n": 6,
    "p": 0.9705563767148176,
    "method": "chi2",
    "q": 0.9705563767148176,
    "sig": false,
    "g1_pct": 11.11,
    "g2_pct": 10.91,
    "label": "痛点 · 运动久坐不便",
    "direction": "g1_higher",
    "lift": 1.02
   }
  ],
  "significant": [
   {
    "field": "total_duration_sec",
    "code": "median",
    "g1_n": 81,
    "g2_n": 55,
    "p": 7.143252094009007e-15,
    "method": "mannwhitney",
    "g1_median": 175.4,
    "g2_median": 59.4,
    "q": 4.571681340165764e-13,
    "sig": true,
    "g1_pct": 175.4,
    "g2_pct": 59.4,
    "label": "视频时长（中位数，秒）",
    "direction": "g1_higher",
    "lift": 2.95
   },
   {
    "field": "pain_points",
    "code": "wrong_care",
    "g1_n": 4,
    "g2_n": 36,
    "p": 2.9269497103518885e-14,
    "method": "chi2",
    "q": 9.366239073126043e-13,
    "sig": true,
    "g1_pct": 4.94,
    "g2_pct": 65.45,
    "label": "痛点 · 清洁方式不对",
    "direction": "g2_higher",
    "lift": 0.08
   },
   {
    "field": "content_format",
    "code": "oral_review",
    "g1_n": 16,
    "g2_n": 47,
    "p": 4.6590456435344484e-14,
    "method": "chi2",
    "q": 9.93929737287349e-13,
    "sig": true,
    "g1_pct": 19.75,
    "g2_pct": 85.45,
    "label": "内容体裁 · 口播测评",
    "direction": "g2_higher",
    "lift": 0.23
   },
   {
    "field": "first_product_sec",
    "code": "median",
    "g1_n": 81,
    "g2_n": 55,
    "p": 3.2711881156456446e-11,
    "method": "mannwhitney",
    "g1_median": 56.0,
    "g2_median": 10.0,
    "q": 5.233900985033031e-10,
    "sig": true,
    "g1_pct": 56.0,
    "g2_pct": 10.0,
    "label": "首次出现产品秒数（中位数，秒）",
    "direction": "g1_higher",
    "lift": 5.6
   },
   {
    "field": "pain_points",
    "code": "odor",
    "g1_n": 15,
    "g2_n": 40,
    "p": 2.5857944875774867e-10,
    "method": "chi2",
    "q": 3.309816944099183e-09,
    "sig": true,
    "g1_pct": 18.52,
    "g2_pct": 72.73,
    "label": "痛点 · 异味",
    "direction": "g2_higher",
    "lift": 0.25
   },
   {
    "field": "pain_points",
    "code": "stuffy",
    "g1_n": 67,
    "g2_n": 17,
    "p": 1.0504555253283005e-09,
    "method": "chi2",
    "q": 1.1204858936835204e-08,
    "sig": true,
    "g1_pct": 82.72,
    "g2_pct": 30.91,
    "label": "痛点 · 闷热不透气",
    "direction": "g1_higher",
    "lift": 2.68
   },
   {
    "field": "cta_form",
    "code": "voice",
    "g1_n": 9,
    "g2_n": 32,
    "p": 4.339443552257553e-09,
    "method": "chi2",
    "q": 3.967491247778334e-08,
    "sig": true,
    "g1_pct": 11.11,
    "g2_pct": 58.18,
    "label": "CTA 形式 · 口播引导",
    "direction": "g2_higher",
    "lift": 0.19
   },
   {
    "field": "pain_points",
    "code": "leak",
    "g1_n": 34,
    "g2_n": 0,
    "p": 2.8871935991528918e-08,
    "method": "chi2",
    "q": 2.0531154482865008e-07,
    "sig": true,
    "g1_pct": 41.98,
    "g2_pct": 0.0,
    "label": "痛点 · 侧漏后漏",
    "direction": "g1_higher",
    "lift": null
   },
   {
    "field": "product_explain_methods",
    "code": "material_teardown",
    "g1_n": 34,
    "g2_n": 0,
    "p": 2.8871935991528918e-08,
    "method": "chi2",
    "q": 2.0531154482865008e-07,
    "sig": true,
    "g1_pct": 41.98,
    "g2_pct": 0.0,
    "label": "产品讲解方式 · 拆开看内部结构",
    "direction": "g1_higher",
    "lift": null
   },
   {
    "field": "cta",
    "code": true,
    "g1_n": 12,
    "g2_n": 33,
    "p": 3.880653283588325e-08,
    "method": "chi2",
    "q": 2.2578346377241166e-07,
    "sig": true,
    "g1_pct": 14.81,
    "g2_pct": 60.0,
    "label": "有明确 CTA",
    "direction": "g2_higher",
    "lift": 0.25
   },
   {
    "field": "cta_form",
    "code": "none",
    "g1_n": 69,
    "g2_n": 22,
    "p": 3.8806532835883255e-08,
    "method": "chi2",
    "q": 2.2578346377241166e-07,
    "sig": true,
    "g1_pct": 85.19,
    "g2_pct": 40.0,
    "label": "CTA 形式 · 无引导",
    "direction": "g1_higher",
    "lift": 2.13
   },
   {
    "field": "persuasion_logic",
    "code": "price_value",
    "g1_n": 5,
    "g2_n": 23,
    "p": 4.523095685637697e-07,
    "method": "chi2",
    "q": 2.3984050880072875e-06,
    "sig": true,
    "g1_pct": 6.17,
    "g2_pct": 41.82,
    "label": "说服逻辑 · 性价比划算",
    "direction": "g2_higher",
    "lift": 0.15
   },
   {
    "field": "euphemism_any",
    "code": true,
    "g1_n": 42,
    "g2_n": 51,
    "p": 4.871760335014803e-07,
    "method": "chi2",
    "q": 2.3984050880072875e-06,
    "sig": true,
    "g1_pct": 51.85,
    "g2_pct": 92.73,
    "label": "出现私处/月经代称",
    "direction": "g2_higher",
    "lift": 0.56
   },
   {
    "field": "hook_type",
    "code": "scene",
    "g1_n": 66,
    "g2_n": 22,
    "p": 6.763090689329684e-07,
    "method": "chi2",
    "q": 2.900567102879549e-06,
    "sig": true,
    "g1_pct": 81.48,
    "g2_pct": 40.0,
    "label": "钩子类型 · 场景代入",
    "direction": "g1_higher",
    "lift": 2.04
   },
   {
    "field": "cta_form",
    "code": "subtitle",
    "g1_n": 7,
    "g2_n": 25,
    "p": 6.798204147373942e-07,
    "method": "chi2",
    "q": 2.900567102879549e-06,
    "sig": true,
    "g1_pct": 8.64,
    "g2_pct": 45.45,
    "label": "CTA 形式 · 字幕引导",
    "direction": "g2_higher",
    "lift": 0.19
   },
   {
    "field": "pain_points",
    "code": "flow_heavy",
    "g1_n": 27,
    "g2_n": 0,
    "p": 1.7292030923927627e-06,
    "method": "chi2",
    "q": 6.916812369571051e-06,
    "sig": true,
    "g1_pct": 33.33,
    "g2_pct": 0.0,
    "label": "痛点 · 量大不够用",
    "direction": "g1_higher",
    "lift": null
   },
   {
    "field": "product_explain_methods",
    "code": "ingredient",
    "g1_n": 41,
    "g2_n": 49,
    "p": 3.2505152003544356e-06,
    "method": "chi2",
    "q": 1.2237233695451992e-05,
    "sig": true,
    "g1_pct": 50.62,
    "g2_pct": 89.09,
    "label": "产品讲解方式 · 成分讲解",
    "direction": "g2_higher",
    "lift": 0.57
   },
   {
    "field": "content_format",
    "code": "skit",
    "g1_n": 41,
    "g2_n": 7,
    "p": 5.681390767156765e-06,
    "method": "chi2",
    "q": 2.0200500505446275e-05,
    "sig": true,
    "g1_pct": 50.62,
    "g2_pct": 12.73,
    "label": "内容体裁 · 剧情短片",
    "direction": "g1_higher",
    "lift": 3.98
   },
   {
    "field": "pain_points",
    "code": "discharge",
    "g1_n": 1,
    "g2_n": 13,
    "p": 2.4514857905441002e-05,
    "method": "chi2",
    "q": 8.257636347095917e-05,
    "sig": true,
    "g1_pct": 1.23,
    "g2_pct": 23.64,
    "label": "痛点 · 分泌物困扰",
    "direction": "g2_higher",
    "lift": 0.05
   },
   {
    "field": "product_explain_methods",
    "code": "usage_steps",
    "g1_n": 8,
    "g2_n": 22,
    "p": 3.210450710217699e-05,
    "method": "chi2",
    "q": 0.00010273442272696637,
    "sig": true,
    "g1_pct": 9.88,
    "g2_pct": 40.0,
    "label": "产品讲解方式 · 使用步骤",
    "direction": "g2_higher",
    "lift": 0.25
   },
   {
    "field": "talent_gender",
    "code": "both",
    "g1_n": 51,
    "g2_n": 16,
    "p": 0.00010545371535766981,
    "method": "chi2",
    "q": 0.00028160607917875557,
    "sig": true,
    "g1_pct": 62.96,
    "g2_pct": 29.09,
    "label": "达人性别 · 男女同框",
    "direction": "g1_higher",
    "lift": 2.16
   },
   {
    "field": "talent_gender",
    "code": "female",
    "g1_n": 30,
    "g2_n": 39,
    "p": 0.00010545371535766981,
    "method": "chi2",
    "q": 0.00028160607917875557,
    "sig": true,
    "g1_pct": 37.04,
    "g2_pct": 70.91,
    "label": "达人性别 · 女达人",
    "direction": "g2_higher",
    "lift": 0.52
   },
   {
    "field": "pain_points",
    "code": "damp_sticky",
    "g1_n": 43,
    "g2_n": 11,
    "p": 0.00010872277539801838,
    "method": "chi2",
    "q": 0.00028160607917875557,
    "sig": true,
    "g1_pct": 53.09,
    "g2_pct": 20.0,
    "label": "痛点 · 潮湿黏腻",
    "direction": "g1_higher",
    "lift": 2.65
   },
   {
    "field": "content_format",
    "code": "vlog",
    "g1_n": 22,
    "g2_n": 1,
    "p": 0.00010913232683498815,
    "method": "chi2",
    "q": 0.00028160607917875557,
    "sig": true,
    "g1_pct": 27.16,
    "g2_pct": 1.82,
    "label": "内容体裁 · 生活 vlog",
    "direction": "g1_higher",
    "lift": 14.92
   },
   {
    "field": "hook_type",
    "code": "pain_point",
    "g1_n": 2,
    "g2_n": 13,
    "p": 0.00011000237467920138,
    "method": "chi2",
    "q": 0.00028160607917875557,
    "sig": true,
    "g1_pct": 2.47,
    "g2_pct": 23.64,
    "label": "钩子类型 · 痛点直击",
    "direction": "g2_higher",
    "lift": 0.1
   },
   {
    "field": "persuasion_logic",
    "code": "efficacy_data",
    "g1_n": 41,
    "g2_n": 11,
    "p": 0.00031102341592923616,
    "method": "chi2",
    "q": 0.000765596100748889,
    "sig": true,
    "g1_pct": 50.62,
    "g2_pct": 20.0,
    "label": "说服逻辑 · 功效数据",
    "direction": "g1_higher",
    "lift": 2.53
   },
   {
    "field": "gift_scene",
    "code": true,
    "g1_n": 24,
    "g2_n": 3,
    "p": 0.0005229919268204394,
    "method": "chi2",
    "q": 0.0012396845672780785,
    "sig": true,
    "g1_pct": 29.63,
    "g2_pct": 5.45,
    "label": "送礼场景",
    "direction": "g1_higher",
    "lift": 5.44
   },
   {
    "field": "pain_points",
    "code": "flora_imbalance",
    "g1_n": 13,
    "g2_n": 23,
    "p": 0.0008287821922587464,
    "method": "chi2",
    "q": 0.0018943592965914202,
    "sig": true,
    "g1_pct": 16.05,
    "g2_pct": 41.82,
    "label": "痛点 · 菌群失衡反复",
    "direction": "g2_higher",
    "lift": 0.38
   },
   {
    "field": "pain_points",
    "code": "bulky_feel",
    "g1_n": 11,
    "g2_n": 0,
    "p": 0.0030012513715755003,
    "method": "fisher",
    "q": 0.006623451302787311,
    "sig": true,
    "g1_pct": 13.58,
    "g2_pct": 0.0,
    "label": "痛点 · 厚重有异物感",
    "direction": "g1_higher",
    "lift": null
   },
   {
    "field": "persuasion_logic",
    "code": "social_proof",
    "g1_n": 19,
    "g2_n": 26,
    "p": 0.003768656397523884,
    "method": "chi2",
    "q": 0.00803980031471762,
    "sig": true,
    "g1_pct": 23.46,
    "g2_pct": 47.27,
    "label": "说服逻辑 · 销量口碑证明",
    "direction": "g2_higher",
    "lift": 0.5
   },
   {
    "field": "product_explain_methods",
    "code": "live_demo",
    "g1_n": 66,
    "g2_n": 33,
    "p": 0.005731945175347158,
    "method": "chi2",
    "q": 0.011833693265232844,
    "sig": true,
    "g1_pct": 81.48,
    "g2_pct": 60.0,
    "label": "产品讲解方式 · 现场实测",
    "direction": "g1_higher",
    "lift": 1.36
   },
   {
    "field": "pain_points",
    "code": "period_pain",
    "g1_n": 16,
    "g2_n": 2,
    "p": 0.006488239896182345,
    "method": "chi2",
    "q": 0.01297647979236469,
    "sig": true,
    "g1_pct": 19.75,
    "g2_pct": 3.64,
    "label": "痛点 · 痛经经期不适",
    "direction": "g1_higher",
    "lift": 5.43
   },
   {
    "field": "tone_primary",
    "code": "teaching",
    "g1_n": 5,
    "g2_n": 12,
    "p": 0.006777682948549376,
    "method": "chi2",
    "q": 0.013144597233550305,
    "sig": true,
    "g1_pct": 6.17,
    "g2_pct": 21.82,
    "label": "主语气 · 教学讲解",
    "direction": "g2_higher",
    "lift": 0.28
   },
   {
    "field": "price_mention",
    "code": true,
    "g1_n": 12,
    "g2_n": 19,
    "p": 0.007104617028541347,
    "method": "chi2",
    "q": 0.013373396759607241,
    "sig": true,
    "g1_pct": 14.81,
    "g2_pct": 34.55,
    "label": "提及价格",
    "direction": "g2_higher",
    "lift": 0.43
   },
   {
    "field": "product_explain_methods",
    "code": "mechanism",
    "g1_n": 44,
    "g2_n": 42,
    "p": 0.00888330393603604,
    "method": "chi2",
    "q": 0.016243755768751617,
    "sig": true,
    "g1_pct": 54.32,
    "g2_pct": 76.36,
    "label": "产品讲解方式 · 作用机理",
    "direction": "g2_higher",
    "lift": 0.71
   },
   {
    "field": "pain_points",
    "code": "other",
    "g1_n": 18,
    "g2_n": 4,
    "p": 0.020148465045661194,
    "method": "chi2",
    "q": 0.03581949341450879,
    "sig": true,
    "g1_pct": 22.22,
    "g2_pct": 7.27,
    "label": "痛点 · 其他",
    "direction": "g1_higher",
    "lift": 3.06
   },
   {
    "field": "pain_points",
    "code": "change_hassle",
    "g1_n": 13,
    "g2_n": 2,
    "p": 0.023332591485020444,
    "method": "chi2",
    "q": 0.040359077163278606,
    "sig": true,
    "g1_pct": 16.05,
    "g2_pct": 3.64,
    "label": "痛点 · 更换携带麻烦",
    "direction": "g1_higher",
    "lift": 4.41
   },
   {
    "field": "pain_points",
    "code": "embarrassment",
    "g1_n": 9,
    "g2_n": 14,
    "p": 0.028524528088180182,
    "method": "chi2",
    "q": 0.04804131046430347,
    "sig": true,
    "g1_pct": 11.11,
    "g2_pct": 25.45,
    "label": "痛点 · 羞耻难言之隐",
    "direction": "g2_higher",
    "lift": 0.44
   }
  ],
  "not_significant": [
   {
    "field": "persuasion_logic",
    "code": "peer_endorse",
    "g1_n": 66,
    "g2_n": 36,
    "p": 0.03414273324936537,
    "method": "chi2",
    "q": 0.056029100716907275,
    "sig": false,
    "g1_pct": 81.48,
    "g2_pct": 65.45,
    "label": "说服逻辑 · 姐妹闺蜜认可",
    "direction": "g1_higher",
    "lift": 1.24
   },
   {
    "field": "tone_primary",
    "code": "emotional",
    "g1_n": 12,
    "g2_n": 2,
    "p": 0.03525802552609969,
    "method": "chi2",
    "q": 0.0564128408417595,
    "sig": false,
    "g1_pct": 14.81,
    "g2_pct": 3.64,
    "label": "主语气 · 情绪共鸣",
    "direction": "g1_higher",
    "lift": 4.07
   },
   {
    "field": "single_vs_bundle",
    "code": "unmentioned",
    "g1_n": 22,
    "g2_n": 8,
    "p": 0.08163469019024243,
    "method": "chi2",
    "q": 0.1274297602969638,
    "sig": false,
    "g1_pct": 27.16,
    "g2_pct": 14.55,
    "label": "单品/套组 · 未提及",
    "direction": "g1_higher",
    "lift": 1.87
   },
   {
    "field": "female_address_any",
    "code": true,
    "g1_n": 67,
    "g2_n": 51,
    "p": 0.09086685266065095,
    "method": "chi2",
    "q": 0.13582282200255008,
    "sig": false,
    "g1_pct": 82.72,
    "g2_pct": 92.73,
    "label": "出现女性称呼语",
    "direction": "g2_higher",
    "lift": 0.89
   },
   {
    "field": "pain_points",
    "code": "allergy_sensitive",
    "g1_n": 16,
    "g2_n": 5,
    "p": 0.09125595853296334,
    "method": "chi2",
    "q": 0.13582282200255008,
    "sig": false,
    "g1_pct": 19.75,
    "g2_pct": 9.09,
    "label": "痛点 · 敏感刺痛过敏",
    "direction": "g1_higher",
    "lift": 2.17
   },
   {
    "field": "taboo_direct",
    "code": true,
    "g1_n": 51,
    "g2_n": 27,
    "p": 0.10841432604773371,
    "method": "chi2",
    "q": 0.15769356516033994,
    "sig": false,
    "g1_pct": 62.96,
    "g2_pct": 49.09,
    "label": "直白谈私处/月经",
    "direction": "g1_higher",
    "lift": 1.28
   },
   {
    "field": "pain_points",
    "code": "rash",
    "g1_n": 10,
    "g2_n": 2,
    "p": 0.12224532988511672,
    "method": "fisher",
    "q": 0.17230942427688137,
    "sig": false,
    "g1_pct": 12.35,
    "g2_pct": 3.64,
    "label": "痛点 · 起疹磨红",
    "direction": "g1_higher",
    "lift": 3.39
   },
   {
    "field": "persuasion_logic",
    "code": "safety_assurance",
    "g1_n": 64,
    "g2_n": 49,
    "p": 0.12384739869900847,
    "method": "chi2",
    "q": 0.17230942427688137,
    "sig": false,
    "g1_pct": 79.01,
    "g2_pct": 89.09,
    "label": "说服逻辑 · 安全温和放心",
    "direction": "g2_higher",
    "lift": 0.89
   },
   {
    "field": "hook_type",
    "code": "contrast",
    "g1_n": 3,
    "g2_n": 6,
    "p": 0.15732908772710222,
    "method": "fisher",
    "q": 0.2116156038202408,
    "sig": false,
    "g1_pct": 3.7,
    "g2_pct": 10.91,
    "label": "钩子类型 · 对比反差",
    "direction": "g2_higher",
    "lift": 0.34
   },
   {
    "field": "product_explain_methods",
    "code": "spec_compare",
    "g1_n": 25,
    "g2_n": 11,
    "p": 0.1587117028651806,
    "method": "chi2",
    "q": 0.2116156038202408,
    "sig": false,
    "g1_pct": 30.86,
    "g2_pct": 20.0,
    "label": "产品讲解方式 · 参数规格对比",
    "direction": "g1_higher",
    "lift": 1.54
   },
   {
    "field": "product_explain_methods",
    "code": "sensory",
    "g1_n": 79,
    "g2_n": 51,
    "p": 0.2214568886746486,
    "method": "fisher",
    "q": 0.2892498137791329,
    "sig": false,
    "g1_pct": 97.53,
    "g2_pct": 92.73,
    "label": "产品讲解方式 · 肤感气味描述",
    "direction": "g1_higher",
    "lift": 1.05
   },
   {
    "field": "persuasion_logic",
    "code": "taboo_normalize",
    "g1_n": 6,
    "g2_n": 7,
    "p": 0.30041364092692996,
    "method": "chi2",
    "q": 0.38452946038647035,
    "sig": false,
    "g1_pct": 7.41,
    "g2_pct": 12.73,
    "label": "说服逻辑 · 去羞耻化",
    "direction": "g2_higher",
    "lift": 0.58
   },
   {
    "field": "persuasion_logic",
    "code": "self_care",
    "g1_n": 30,
    "g2_n": 25,
    "p": 0.3262763799482941,
    "method": "chi2",
    "q": 0.40944486895472204,
    "sig": false,
    "g1_pct": 37.04,
    "g2_pct": 45.45,
    "label": "说服逻辑 · 悦己爱自己",
    "direction": "g2_higher",
    "lift": 0.81
   },
   {
    "field": "persuasion_logic",
    "code": "male_endorse",
    "g1_n": 9,
    "g2_n": 9,
    "p": 0.3750122842278528,
    "method": "chi2",
    "q": 0.46155358058812657,
    "sig": false,
    "g1_pct": 11.11,
    "g2_pct": 16.36,
    "label": "说服逻辑 · 男性视角认可",
    "direction": "g2_higher",
    "lift": 0.68
   },
   {
    "field": "single_vs_bundle",
    "code": "bundle",
    "g1_n": 28,
    "g2_n": 23,
    "p": 0.3913655445356371,
    "method": "chi2",
    "q": 0.472592355665675,
    "sig": false,
    "g1_pct": 34.57,
    "g2_pct": 41.82,
    "label": "单品/套组 · 套组组合",
    "direction": "g2_higher",
    "lift": 0.83
   },
   {
    "field": "pain_points",
    "code": "postpartum",
    "g1_n": 5,
    "g2_n": 5,
    "p": 0.5249912890149357,
    "method": "fisher",
    "q": 0.5968344588058054,
    "sig": false,
    "g1_pct": 6.17,
    "g2_pct": 9.09,
    "label": "痛点 · 产后特殊护理",
    "direction": "g2_higher",
    "lift": 0.68
   },
   {
    "field": "persuasion_logic",
    "code": "convenience",
    "g1_n": 5,
    "g2_n": 5,
    "p": 0.5249912890149357,
    "method": "fisher",
    "q": 0.5968344588058054,
    "sig": false,
    "g1_pct": 6.17,
    "g2_pct": 9.09,
    "label": "说服逻辑 · 省事便捷",
    "direction": "g2_higher",
    "lift": 0.68
   },
   {
    "field": "explicit_any",
    "code": true,
    "g1_n": 60,
    "g2_n": 38,
    "p": 0.5250277713215515,
    "method": "chi2",
    "q": 0.5968344588058054,
    "sig": false,
    "g1_pct": 74.07,
    "g2_pct": 69.09,
    "label": "出现直白医学词",
    "direction": "g1_higher",
    "lift": 1.07
   },
   {
    "field": "single_vs_bundle",
    "code": "single",
    "g1_n": 31,
    "g2_n": 24,
    "p": 0.5315556898739204,
    "method": "chi2",
    "q": 0.5968344588058054,
    "sig": false,
    "g1_pct": 38.27,
    "g2_pct": 43.64,
    "label": "单品/套组 · 单品",
    "direction": "g2_higher",
    "lift": 0.88
   },
   {
    "field": "product_explain_methods",
    "code": "certification",
    "g1_n": 33,
    "g2_n": 25,
    "p": 0.5854020444204002,
    "method": "chi2",
    "q": 0.6459608766018209,
    "sig": false,
    "g1_pct": 40.74,
    "g2_pct": 45.45,
    "label": "产品讲解方式 · 检测报告资质",
    "direction": "g2_higher",
    "lift": 0.9
   },
   {
    "field": "product_explain_methods",
    "code": "competitor_compare",
    "g1_n": 15,
    "g2_n": 12,
    "p": 0.6358970772147448,
    "method": "chi2",
    "q": 0.6897866600295536,
    "sig": false,
    "g1_pct": 18.52,
    "g2_pct": 21.82,
    "label": "产品讲解方式 · 竞品对比",
    "direction": "g2_higher",
    "lift": 0.85
   },
   {
    "field": "convenience_claim",
    "code": true,
    "g1_n": 30,
    "g2_n": 19,
    "p": 0.7664380720298988,
    "method": "chi2",
    "q": 0.8175339434985587,
    "sig": false,
    "g1_pct": 37.04,
    "g2_pct": 34.55,
    "label": "便捷性主张",
    "direction": "g1_higher",
    "lift": 1.07
   },
   {
    "field": "tone_primary",
    "code": "peer_sister",
    "g1_n": 59,
    "g2_n": 39,
    "p": 0.8055049616877186,
    "method": "chi2",
    "q": 0.845119959803508,
    "sig": false,
    "g1_pct": 72.84,
    "g2_pct": 70.91,
    "label": "主语气 · 姐妹平视",
    "direction": "g1_higher",
    "lift": 1.03
   },
   {
    "field": "persuasion_logic",
    "code": "expert_authority",
    "g1_n": 8,
    "g2_n": 5,
    "p": 0.8784543873411835,
    "method": "chi2",
    "q": 0.906791625642512,
    "sig": false,
    "g1_pct": 9.88,
    "g2_pct": 9.09,
    "label": "说服逻辑 · 专家医生背书",
    "direction": "g1_higher",
    "lift": 1.09
   },
   {
    "field": "pain_points",
    "code": "itch_private",
    "g1_n": 30,
    "g2_n": 20,
    "p": 0.9362895900390599,
    "method": "chi2",
    "q": 0.9511513295634894,
    "sig": false,
    "g1_pct": 37.04,
    "g2_pct": 36.36,
    "label": "痛点 · 私处瘙痒",
    "direction": "g1_higher",
    "lift": 1.02
   },
   {
    "field": "pain_points",
    "code": "sport_swim",
    "g1_n": 9,
    "g2_n": 6,
    "p": 0.9705563767148176,
    "method": "chi2",
    "q": 0.9705563767148176,
    "sig": false,
    "g1_pct": 11.11,
    "g2_pct": 10.91,
    "label": "痛点 · 运动久坐不便",
    "direction": "g1_higher",
    "lift": 1.02
   }
  ],
  "robustness": {
   "rows": [
    {
     "field": "pain_points",
     "code": "wrong_care",
     "label": "痛点 · 清洁方式不对",
     "g1_pct": 4.94,
     "g2_pct": 65.45,
     "q": 0.0,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0,
        "g1_pct": 6.45,
        "g2_pct": 65.45,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0,
        "g1_pct": 0.0,
        "g2_pct": 65.45,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0,
        "g1_pct": 4.94,
        "g2_pct": 62.86,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0,
        "g1_pct": 6.45,
        "g2_pct": 65.45,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0,
        "g1_pct": 6.35,
        "g2_pct": 65.45,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0,
        "g1_pct": 4.94,
        "g2_pct": 71.79,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0,
        "g1_pct": 5.26,
        "g2_pct": 65.45,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0,
        "g1_pct": 4.94,
        "g2_pct": 61.11,
        "still_sig": true
       }
      ],
      "worst_p": 0.0,
      "worst_drop_brand": "FREEMORE/自由点",
      "robust": true
     },
     "cmh_fans_band": {
      "p": 0.0,
      "mh_or": 0.02,
      "robust": true,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 4.76,
        "g2_pct": 63.64
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 0.0,
        "g2_pct": 40.0
       }
      ],
      "n_strata": 2
     },
     "robust": true
    },
    {
     "field": "content_format",
     "code": "oral_review",
     "label": "内容体裁 · 口播测评",
     "g1_pct": 19.75,
     "g2_pct": 85.45,
     "q": 0.0,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0,
        "g1_pct": 24.19,
        "g2_pct": 85.45,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0,
        "g1_pct": 13.11,
        "g2_pct": 85.45,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0,
        "g1_pct": 19.75,
        "g2_pct": 97.14,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0,
        "g1_pct": 17.74,
        "g2_pct": 85.45,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0,
        "g1_pct": 23.81,
        "g2_pct": 85.45,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0,
        "g1_pct": 19.75,
        "g2_pct": 82.05,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0,
        "g1_pct": 19.74,
        "g2_pct": 85.45,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0,
        "g1_pct": 19.75,
        "g2_pct": 77.78,
        "still_sig": true
       }
      ],
      "worst_p": 0.0,
      "worst_drop_brand": "FREEMORE/自由点",
      "robust": true
     },
     "cmh_fans_band": {
      "p": 0.0,
      "mh_or": 0.06,
      "robust": true,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 28.57,
        "g2_pct": 81.82
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 0.0,
        "g2_pct": 80.0
       }
      ],
      "n_strata": 2
     },
     "robust": true
    },
    {
     "field": "pain_points",
     "code": "odor",
     "label": "痛点 · 异味",
     "g1_pct": 18.52,
     "g2_pct": 72.73,
     "q": 0.0,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0,
        "g1_pct": 9.68,
        "g2_pct": 72.73,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0,
        "g1_pct": 18.03,
        "g2_pct": 72.73,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0,
        "g1_pct": 18.52,
        "g2_pct": 77.14,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0,
        "g1_pct": 24.19,
        "g2_pct": 72.73,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0,
        "g1_pct": 23.81,
        "g2_pct": 72.73,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0,
        "g1_pct": 18.52,
        "g2_pct": 71.79,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0,
        "g1_pct": 17.11,
        "g2_pct": 72.73,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0,
        "g1_pct": 18.52,
        "g2_pct": 69.44,
        "still_sig": true
       }
      ],
      "worst_p": 0.0,
      "worst_drop_brand": "FREEMORE/自由点",
      "robust": true
     },
     "cmh_fans_band": {
      "p": 0.0075,
      "mh_or": 0.18,
      "robust": true,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 23.81,
        "g2_pct": 54.55
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 16.67,
        "g2_pct": 80.0
       }
      ],
      "n_strata": 2
     },
     "robust": true
    },
    {
     "field": "pain_points",
     "code": "stuffy",
     "label": "痛点 · 闷热不透气",
     "g1_pct": 82.72,
     "g2_pct": 30.91,
     "q": 0.0,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0,
        "g1_pct": 79.03,
        "g2_pct": 30.91,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0,
        "g1_pct": 85.25,
        "g2_pct": 30.91,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0,
        "g1_pct": 82.72,
        "g2_pct": 42.86,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0,
        "g1_pct": 80.65,
        "g2_pct": 30.91,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0,
        "g1_pct": 82.54,
        "g2_pct": 30.91,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0,
        "g1_pct": 82.72,
        "g2_pct": 25.64,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0,
        "g1_pct": 85.53,
        "g2_pct": 30.91,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0,
        "g1_pct": 82.72,
        "g2_pct": 25.0,
        "still_sig": true
       }
      ],
      "worst_p": 0.0,
      "worst_drop_brand": "FREEMORE/自由点",
      "robust": true
     },
     "cmh_fans_band": {
      "p": 0.0,
      "mh_or": 21.28,
      "robust": true,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 90.48,
        "g2_pct": 18.18
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 83.33,
        "g2_pct": 40.0
       }
      ],
      "n_strata": 2
     },
     "robust": true
    },
    {
     "field": "cta_form",
     "code": "voice",
     "label": "CTA 形式 · 口播引导",
     "g1_pct": 11.11,
     "g2_pct": 58.18,
     "q": 0.0,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0,
        "g1_pct": 12.9,
        "g2_pct": 58.18,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0,
        "g1_pct": 8.2,
        "g2_pct": 58.18,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0,
        "g1_pct": 11.11,
        "g2_pct": 62.86,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0,
        "g1_pct": 11.29,
        "g2_pct": 58.18,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0,
        "g1_pct": 11.11,
        "g2_pct": 58.18,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0,
        "g1_pct": 11.11,
        "g2_pct": 64.1,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0,
        "g1_pct": 11.84,
        "g2_pct": 58.18,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0,
        "g1_pct": 11.11,
        "g2_pct": 47.22,
        "still_sig": true
       }
      ],
      "worst_p": 0.0,
      "worst_drop_brand": "FREEMORE/自由点",
      "robust": true
     },
     "cmh_fans_band": {
      "p": 0.0006,
      "mh_or": 0.09,
      "robust": true,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 14.29,
        "g2_pct": 72.73
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 8.33,
        "g2_pct": 20.0
       }
      ],
      "n_strata": 2
     },
     "robust": true
    },
    {
     "field": "pain_points",
     "code": "leak",
     "label": "痛点 · 侧漏后漏",
     "g1_pct": 41.98,
     "g2_pct": 0.0,
     "q": 0.0,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0,
        "g1_pct": 37.1,
        "g2_pct": 0.0,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0,
        "g1_pct": 45.9,
        "g2_pct": 0.0,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0,
        "g1_pct": 41.98,
        "g2_pct": 0.0,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0,
        "g1_pct": 40.32,
        "g2_pct": 0.0,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0,
        "g1_pct": 42.86,
        "g2_pct": 0.0,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0,
        "g1_pct": 41.98,
        "g2_pct": 0.0,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0,
        "g1_pct": 43.42,
        "g2_pct": 0.0,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0,
        "g1_pct": 41.98,
        "g2_pct": 0.0,
        "still_sig": true
       }
      ],
      "worst_p": 0.0,
      "worst_drop_brand": "FREEMORE/自由点",
      "robust": true
     },
     "cmh_fans_band": {
      "p": 0.0052,
      "mh_or": null,
      "robust": true,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 47.62,
        "g2_pct": 0.0
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 25.0,
        "g2_pct": 0.0
       }
      ],
      "n_strata": 2
     },
     "robust": true
    },
    {
     "field": "product_explain_methods",
     "code": "material_teardown",
     "label": "产品讲解方式 · 拆开看内部结构",
     "g1_pct": 41.98,
     "g2_pct": 0.0,
     "q": 0.0,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0,
        "g1_pct": 40.32,
        "g2_pct": 0.0,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0,
        "g1_pct": 50.82,
        "g2_pct": 0.0,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0,
        "g1_pct": 41.98,
        "g2_pct": 0.0,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0,
        "g1_pct": 37.1,
        "g2_pct": 0.0,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0,
        "g1_pct": 36.51,
        "g2_pct": 0.0,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0,
        "g1_pct": 41.98,
        "g2_pct": 0.0,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0,
        "g1_pct": 44.74,
        "g2_pct": 0.0,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0,
        "g1_pct": 41.98,
        "g2_pct": 0.0,
        "still_sig": true
       }
      ],
      "worst_p": 0.0,
      "worst_drop_brand": "FREEMORE/自由点",
      "robust": true
     },
     "cmh_fans_band": {
      "p": 0.0072,
      "mh_or": null,
      "robust": true,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 45.24,
        "g2_pct": 0.0
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 25.0,
        "g2_pct": 0.0
       }
      ],
      "n_strata": 2
     },
     "robust": true
    },
    {
     "field": "cta",
     "code": true,
     "label": "有明确 CTA",
     "g1_pct": 14.81,
     "g2_pct": 60.0,
     "q": 0.0,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0,
        "g1_pct": 17.74,
        "g2_pct": 60.0,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0,
        "g1_pct": 9.84,
        "g2_pct": 60.0,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0,
        "g1_pct": 14.81,
        "g2_pct": 65.71,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0,
        "g1_pct": 14.52,
        "g2_pct": 60.0,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0,
        "g1_pct": 15.87,
        "g2_pct": 60.0,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0,
        "g1_pct": 14.81,
        "g2_pct": 64.1,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0,
        "g1_pct": 15.79,
        "g2_pct": 60.0,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0001,
        "g1_pct": 14.81,
        "g2_pct": 50.0,
        "still_sig": true
       }
      ],
      "worst_p": 0.0001,
      "worst_drop_brand": "洛蕾诗",
      "robust": true
     },
     "cmh_fans_band": {
      "p": 0.0023,
      "mh_or": 0.12,
      "robust": true,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 19.05,
        "g2_pct": 72.73
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 8.33,
        "g2_pct": 20.0
       }
      ],
      "n_strata": 2
     },
     "robust": true
    },
    {
     "field": "cta_form",
     "code": "none",
     "label": "CTA 形式 · 无引导",
     "g1_pct": 85.19,
     "g2_pct": 40.0,
     "q": 0.0,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0,
        "g1_pct": 82.26,
        "g2_pct": 40.0,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0,
        "g1_pct": 90.16,
        "g2_pct": 40.0,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0,
        "g1_pct": 85.19,
        "g2_pct": 34.29,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0,
        "g1_pct": 85.48,
        "g2_pct": 40.0,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0,
        "g1_pct": 84.13,
        "g2_pct": 40.0,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0,
        "g1_pct": 85.19,
        "g2_pct": 35.9,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0,
        "g1_pct": 84.21,
        "g2_pct": 40.0,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0001,
        "g1_pct": 85.19,
        "g2_pct": 50.0,
        "still_sig": true
       }
      ],
      "worst_p": 0.0001,
      "worst_drop_brand": "洛蕾诗",
      "robust": true
     },
     "cmh_fans_band": {
      "p": 0.0023,
      "mh_or": 8.4,
      "robust": true,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 80.95,
        "g2_pct": 27.27
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 91.67,
        "g2_pct": 80.0
       }
      ],
      "n_strata": 2
     },
     "robust": true
    },
    {
     "field": "persuasion_logic",
     "code": "price_value",
     "label": "说服逻辑 · 性价比划算",
     "g1_pct": 6.17,
     "g2_pct": 41.82,
     "q": 0.0,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0,
        "g1_pct": 4.84,
        "g2_pct": 41.82,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0,
        "g1_pct": 3.28,
        "g2_pct": 41.82,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0,
        "g1_pct": 6.17,
        "g2_pct": 45.71,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0,
        "g1_pct": 8.06,
        "g2_pct": 41.82,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0,
        "g1_pct": 7.94,
        "g2_pct": 41.82,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0,
        "g1_pct": 6.17,
        "g2_pct": 43.59,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0,
        "g1_pct": 6.58,
        "g2_pct": 41.82,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0,
        "g1_pct": 6.17,
        "g2_pct": 36.11,
        "still_sig": true
       }
      ],
      "worst_p": 0.0,
      "worst_drop_brand": "FREEMORE/自由点",
      "robust": true
     },
     "cmh_fans_band": {
      "p": 0.0013,
      "mh_or": 0.08,
      "robust": true,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 11.9,
        "g2_pct": 63.64
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 0.0,
        "g2_pct": 0.0
       }
      ],
      "n_strata": 2
     },
     "robust": true
    },
    {
     "field": "euphemism_any",
     "code": true,
     "label": "出现私处/月经代称",
     "g1_pct": 51.85,
     "g2_pct": 92.73,
     "q": 0.0,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0,
        "g1_pct": 43.55,
        "g2_pct": 92.73,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0,
        "g1_pct": 44.26,
        "g2_pct": 92.73,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0,
        "g1_pct": 51.85,
        "g2_pct": 100.0,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0,
        "g1_pct": 58.06,
        "g2_pct": 92.73,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0,
        "g1_pct": 60.32,
        "g2_pct": 92.73,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0001,
        "g1_pct": 51.85,
        "g2_pct": 89.74,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0,
        "g1_pct": 52.63,
        "g2_pct": 92.73,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0001,
        "g1_pct": 51.85,
        "g2_pct": 88.89,
        "still_sig": true
       }
      ],
      "worst_p": 0.0001,
      "worst_drop_brand": "妇炎洁",
      "robust": true
     },
     "cmh_fans_band": {
      "p": 0.4149,
      "mh_or": 0.5,
      "robust": false,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 66.67,
        "g2_pct": 72.73
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 41.67,
        "g2_pct": 80.0
       }
      ],
      "n_strata": 2
     },
     "robust": false
    },
    {
     "field": "hook_type",
     "code": "scene",
     "label": "钩子类型 · 场景代入",
     "g1_pct": 81.48,
     "g2_pct": 40.0,
     "q": 0.0,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0,
        "g1_pct": 80.65,
        "g2_pct": 40.0,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0,
        "g1_pct": 85.25,
        "g2_pct": 40.0,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0,
        "g1_pct": 81.48,
        "g2_pct": 25.71,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0,
        "g1_pct": 83.87,
        "g2_pct": 40.0,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0001,
        "g1_pct": 76.19,
        "g2_pct": 40.0,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0002,
        "g1_pct": 81.48,
        "g2_pct": 48.72,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0,
        "g1_pct": 81.58,
        "g2_pct": 40.0,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0001,
        "g1_pct": 81.48,
        "g2_pct": 44.44,
        "still_sig": true
       }
      ],
      "worst_p": 0.0002,
      "worst_drop_brand": "妇炎洁",
      "robust": true
     },
     "cmh_fans_band": {
      "p": 0.3602,
      "mh_or": 2.15,
      "robust": false,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 76.19,
        "g2_pct": 63.64
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 83.33,
        "g2_pct": 60.0
       }
      ],
      "n_strata": 2
     },
     "robust": false
    },
    {
     "field": "cta_form",
     "code": "subtitle",
     "label": "CTA 形式 · 字幕引导",
     "g1_pct": 8.64,
     "g2_pct": 45.45,
     "q": 0.0,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0,
        "g1_pct": 9.68,
        "g2_pct": 45.45,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0,
        "g1_pct": 3.28,
        "g2_pct": 45.45,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0,
        "g1_pct": 8.64,
        "g2_pct": 54.29,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0,
        "g1_pct": 11.29,
        "g2_pct": 45.45,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0,
        "g1_pct": 9.52,
        "g2_pct": 45.45,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0,
        "g1_pct": 8.64,
        "g2_pct": 48.72,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0,
        "g1_pct": 9.21,
        "g2_pct": 45.45,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0008,
        "g1_pct": 8.64,
        "g2_pct": 33.33,
        "still_sig": true
       }
      ],
      "worst_p": 0.0008,
      "worst_drop_brand": "洛蕾诗",
      "robust": true
     },
     "cmh_fans_band": {
      "p": 0.0078,
      "mh_or": 0.11,
      "robust": true,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 11.9,
        "g2_pct": 54.55
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 0.0,
        "g2_pct": 0.0
       }
      ],
      "n_strata": 2
     },
     "robust": true
    },
    {
     "field": "pain_points",
     "code": "flow_heavy",
     "label": "痛点 · 量大不够用",
     "g1_pct": 33.33,
     "g2_pct": 0.0,
     "q": 0.0,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0,
        "g1_pct": 35.48,
        "g2_pct": 0.0,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0,
        "g1_pct": 39.34,
        "g2_pct": 0.0,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0001,
        "g1_pct": 33.33,
        "g2_pct": 0.0,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.001,
        "g1_pct": 17.74,
        "g2_pct": 0.0,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0,
        "g1_pct": 38.1,
        "g2_pct": 0.0,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0,
        "g1_pct": 33.33,
        "g2_pct": 0.0,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0,
        "g1_pct": 35.53,
        "g2_pct": 0.0,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0001,
        "g1_pct": 33.33,
        "g2_pct": 0.0,
        "still_sig": true
       }
      ],
      "worst_p": 0.001,
      "worst_drop_brand": "SOFY/苏菲",
      "robust": true
     },
     "cmh_fans_band": {
      "p": 0.0069,
      "mh_or": null,
      "robust": true,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 42.86,
        "g2_pct": 0.0
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 33.33,
        "g2_pct": 0.0
       }
      ],
      "n_strata": 2
     },
     "robust": true
    },
    {
     "field": "product_explain_methods",
     "code": "ingredient",
     "label": "产品讲解方式 · 成分讲解",
     "g1_pct": 50.62,
     "g2_pct": 89.09,
     "q": 0.0,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0,
        "g1_pct": 35.48,
        "g2_pct": 89.09,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0,
        "g1_pct": 54.1,
        "g2_pct": 89.09,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0,
        "g1_pct": 50.62,
        "g2_pct": 97.14,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0006,
        "g1_pct": 61.29,
        "g2_pct": 89.09,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0,
        "g1_pct": 53.97,
        "g2_pct": 89.09,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0003,
        "g1_pct": 50.62,
        "g2_pct": 84.62,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0,
        "g1_pct": 48.68,
        "g2_pct": 89.09,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0003,
        "g1_pct": 50.62,
        "g2_pct": 86.11,
        "still_sig": true
       }
      ],
      "worst_p": 0.0006,
      "worst_drop_brand": "SOFY/苏菲",
      "robust": true
     },
     "cmh_fans_band": {
      "p": 0.1689,
      "mh_or": 0.35,
      "robust": false,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 54.76,
        "g2_pct": 72.73
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 41.67,
        "g2_pct": 80.0
       }
      ],
      "n_strata": 2
     },
     "robust": false
    },
    {
     "field": "content_format",
     "code": "skit",
     "label": "内容体裁 · 剧情短片",
     "g1_pct": 50.62,
     "g2_pct": 12.73,
     "q": 0.0,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0,
        "g1_pct": 51.61,
        "g2_pct": 12.73,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0,
        "g1_pct": 55.74,
        "g2_pct": 12.73,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0,
        "g1_pct": 50.62,
        "g2_pct": 2.86,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0001,
        "g1_pct": 46.77,
        "g2_pct": 12.73,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0001,
        "g1_pct": 46.03,
        "g2_pct": 12.73,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0002,
        "g1_pct": 50.62,
        "g2_pct": 15.38,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0,
        "g1_pct": 52.63,
        "g2_pct": 12.73,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0016,
        "g1_pct": 50.62,
        "g2_pct": 19.44,
        "still_sig": true
       }
      ],
      "worst_p": 0.0016,
      "worst_drop_brand": "洛蕾诗",
      "robust": true
     },
     "cmh_fans_band": {
      "p": 0.1174,
      "mh_or": 3.55,
      "robust": false,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 42.86,
        "g2_pct": 18.18
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 50.0,
        "g2_pct": 20.0
       }
      ],
      "n_strata": 2
     },
     "robust": false
    },
    {
     "field": "pain_points",
     "code": "discharge",
     "label": "痛点 · 分泌物困扰",
     "g1_pct": 1.23,
     "g2_pct": 23.64,
     "q": 0.0001,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0002,
        "g1_pct": 1.61,
        "g2_pct": 23.64,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0001,
        "g1_pct": 0.0,
        "g2_pct": 23.64,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0,
        "g1_pct": 1.23,
        "g2_pct": 31.43,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0002,
        "g1_pct": 1.61,
        "g2_pct": 23.64,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0002,
        "g1_pct": 1.59,
        "g2_pct": 23.64,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0137,
        "g1_pct": 1.23,
        "g2_pct": 12.82,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0,
        "g1_pct": 1.32,
        "g2_pct": 23.64,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0,
        "g1_pct": 1.23,
        "g2_pct": 27.78,
        "still_sig": true
       }
      ],
      "worst_p": 0.0137,
      "worst_drop_brand": "妇炎洁",
      "robust": true
     },
     "cmh_fans_band": {
      "p": 0.2027,
      "mh_or": 0.11,
      "robust": false,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 2.38,
        "g2_pct": 18.18
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 0.0,
        "g2_pct": 0.0
       }
      ],
      "n_strata": 2
     },
     "robust": false
    },
    {
     "field": "product_explain_methods",
     "code": "usage_steps",
     "label": "产品讲解方式 · 使用步骤",
     "g1_pct": 9.88,
     "g2_pct": 40.0,
     "q": 0.0001,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0003,
        "g1_pct": 11.29,
        "g2_pct": 40.0,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0,
        "g1_pct": 6.56,
        "g2_pct": 40.0,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0,
        "g1_pct": 9.88,
        "g2_pct": 45.71,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0003,
        "g1_pct": 11.29,
        "g2_pct": 40.0,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0001,
        "g1_pct": 9.52,
        "g2_pct": 40.0,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.01,
        "g1_pct": 9.88,
        "g2_pct": 28.21,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0001,
        "g1_pct": 10.53,
        "g2_pct": 40.0,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0,
        "g1_pct": 9.88,
        "g2_pct": 47.22,
        "still_sig": true
       }
      ],
      "worst_p": 0.01,
      "worst_drop_brand": "妇炎洁",
      "robust": true
     },
     "cmh_fans_band": {
      "p": 0.0382,
      "mh_or": 0.17,
      "robust": true,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 9.52,
        "g2_pct": 27.27
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 0.0,
        "g2_pct": 40.0
       }
      ],
      "n_strata": 2
     },
     "robust": true
    },
    {
     "field": "talent_gender",
     "code": "both",
     "label": "达人性别 · 男女同框",
     "g1_pct": 62.96,
     "g2_pct": 29.09,
     "q": 0.0003,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0009,
        "g1_pct": 59.68,
        "g2_pct": 29.09,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0,
        "g1_pct": 68.85,
        "g2_pct": 29.09,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0,
        "g1_pct": 62.96,
        "g2_pct": 20.0,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0001,
        "g1_pct": 64.52,
        "g2_pct": 29.09,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0012,
        "g1_pct": 58.73,
        "g2_pct": 29.09,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0115,
        "g1_pct": 62.96,
        "g2_pct": 38.46,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0001,
        "g1_pct": 63.16,
        "g2_pct": 29.09,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0004,
        "g1_pct": 62.96,
        "g2_pct": 27.78,
        "still_sig": true
       }
      ],
      "worst_p": 0.0115,
      "worst_drop_brand": "妇炎洁",
      "robust": true
     },
     "cmh_fans_band": {
      "p": 0.0768,
      "mh_or": 3.35,
      "robust": false,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 66.67,
        "g2_pct": 36.36
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 66.67,
        "g2_pct": 40.0
       }
      ],
      "n_strata": 2
     },
     "robust": false
    },
    {
     "field": "talent_gender",
     "code": "female",
     "label": "达人性别 · 女达人",
     "g1_pct": 37.04,
     "g2_pct": 70.91,
     "q": 0.0003,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0009,
        "g1_pct": 40.32,
        "g2_pct": 70.91,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0,
        "g1_pct": 31.15,
        "g2_pct": 70.91,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0,
        "g1_pct": 37.04,
        "g2_pct": 80.0,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0001,
        "g1_pct": 35.48,
        "g2_pct": 70.91,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0012,
        "g1_pct": 41.27,
        "g2_pct": 70.91,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0115,
        "g1_pct": 37.04,
        "g2_pct": 61.54,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0001,
        "g1_pct": 36.84,
        "g2_pct": 70.91,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0004,
        "g1_pct": 37.04,
        "g2_pct": 72.22,
        "still_sig": true
       }
      ],
      "worst_p": 0.0115,
      "worst_drop_brand": "妇炎洁",
      "robust": true
     },
     "cmh_fans_band": {
      "p": 0.0768,
      "mh_or": 0.3,
      "robust": false,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 33.33,
        "g2_pct": 63.64
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 33.33,
        "g2_pct": 60.0
       }
      ],
      "n_strata": 2
     },
     "robust": false
    },
    {
     "field": "pain_points",
     "code": "damp_sticky",
     "label": "痛点 · 潮湿黏腻",
     "g1_pct": 53.09,
     "g2_pct": 20.0,
     "q": 0.0003,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0,
        "g1_pct": 58.06,
        "g2_pct": 20.0,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0003,
        "g1_pct": 52.46,
        "g2_pct": 20.0,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0001,
        "g1_pct": 53.09,
        "g2_pct": 14.29,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.004,
        "g1_pct": 45.16,
        "g2_pct": 20.0,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0002,
        "g1_pct": 53.97,
        "g2_pct": 20.0,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0007,
        "g1_pct": 53.09,
        "g2_pct": 20.51,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0,
        "g1_pct": 55.26,
        "g2_pct": 20.0,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0048,
        "g1_pct": 53.09,
        "g2_pct": 25.0,
        "still_sig": true
       }
      ],
      "worst_p": 0.0048,
      "worst_drop_brand": "洛蕾诗",
      "robust": true
     },
     "cmh_fans_band": {
      "p": 0.0738,
      "mh_or": 3.5,
      "robust": false,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 59.52,
        "g2_pct": 18.18
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 41.67,
        "g2_pct": 40.0
       }
      ],
      "n_strata": 2
     },
     "robust": false
    },
    {
     "field": "content_format",
     "code": "vlog",
     "label": "内容体裁 · 生活 vlog",
     "g1_pct": 27.16,
     "g2_pct": 1.82,
     "q": 0.0003,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0014,
        "g1_pct": 20.97,
        "g2_pct": 1.82,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0001,
        "g1_pct": 27.87,
        "g2_pct": 1.82,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0006,
        "g1_pct": 27.16,
        "g2_pct": 0.0,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0,
        "g1_pct": 35.48,
        "g2_pct": 1.82,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0001,
        "g1_pct": 26.98,
        "g2_pct": 1.82,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0013,
        "g1_pct": 27.16,
        "g2_pct": 2.56,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0003,
        "g1_pct": 25.0,
        "g2_pct": 1.82,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0022,
        "g1_pct": 27.16,
        "g2_pct": 2.78,
        "still_sig": true
       }
      ],
      "worst_p": 0.0022,
      "worst_drop_brand": "洛蕾诗",
      "robust": true
     },
     "cmh_fans_band": {
      "p": 0.0297,
      "mh_or": null,
      "robust": true,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 26.19,
        "g2_pct": 0.0
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 41.67,
        "g2_pct": 0.0
       }
      ],
      "n_strata": 2
     },
     "robust": true
    },
    {
     "field": "hook_type",
     "code": "pain_point",
     "label": "钩子类型 · 痛点直击",
     "g1_pct": 2.47,
     "g2_pct": 23.64,
     "q": 0.0003,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0002,
        "g1_pct": 1.61,
        "g2_pct": 23.64,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0011,
        "g1_pct": 3.28,
        "g2_pct": 23.64,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0,
        "g1_pct": 2.47,
        "g2_pct": 37.14,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0002,
        "g1_pct": 1.61,
        "g2_pct": 23.64,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0009,
        "g1_pct": 3.17,
        "g2_pct": 23.64,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0141,
        "g1_pct": 2.47,
        "g2_pct": 15.38,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0002,
        "g1_pct": 2.63,
        "g2_pct": 23.64,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0036,
        "g1_pct": 2.47,
        "g2_pct": 19.44,
        "still_sig": true
       }
      ],
      "worst_p": 0.0141,
      "worst_drop_brand": "妇炎洁",
      "robust": true
     },
     "cmh_fans_band": {
      "p": 0.9978,
      "mh_or": null,
      "robust": false,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 2.38,
        "g2_pct": 0.0
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 8.33,
        "g2_pct": 0.0
       }
      ],
      "n_strata": 2
     },
     "robust": false
    },
    {
     "field": "persuasion_logic",
     "code": "efficacy_data",
     "label": "说服逻辑 · 功效数据",
     "g1_pct": 50.62,
     "g2_pct": 20.0,
     "q": 0.0008,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0066,
        "g1_pct": 43.55,
        "g2_pct": 20.0,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0006,
        "g1_pct": 50.82,
        "g2_pct": 20.0,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0281,
        "g1_pct": 50.62,
        "g2_pct": 28.57,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0002,
        "g1_pct": 53.23,
        "g2_pct": 20.0,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0003,
        "g1_pct": 52.38,
        "g2_pct": 20.0,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0001,
        "g1_pct": 50.62,
        "g2_pct": 12.82,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0002,
        "g1_pct": 52.63,
        "g2_pct": 20.0,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0016,
        "g1_pct": 50.62,
        "g2_pct": 19.44,
        "still_sig": true
       }
      ],
      "worst_p": 0.0281,
      "worst_drop_brand": "INTIMA/茵缇玛",
      "robust": true
     },
     "cmh_fans_band": {
      "p": 0.001,
      "mh_or": 22.54,
      "robust": true,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 57.14,
        "g2_pct": 0.0
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 58.33,
        "g2_pct": 20.0
       }
      ],
      "n_strata": 2
     },
     "robust": true
    },
    {
     "field": "gift_scene",
     "code": true,
     "label": "送礼场景",
     "g1_pct": 29.63,
     "g2_pct": 5.45,
     "q": 0.0012,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0003,
        "g1_pct": 32.26,
        "g2_pct": 5.45,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0004,
        "g1_pct": 31.15,
        "g2_pct": 5.45,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0013,
        "g1_pct": 29.63,
        "g2_pct": 2.86,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0005,
        "g1_pct": 30.65,
        "g2_pct": 5.45,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0057,
        "g1_pct": 23.81,
        "g2_pct": 5.45,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.007,
        "g1_pct": 29.63,
        "g2_pct": 7.69,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0004,
        "g1_pct": 30.26,
        "g2_pct": 5.45,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0038,
        "g1_pct": 29.63,
        "g2_pct": 5.56,
        "still_sig": true
       }
      ],
      "worst_p": 0.007,
      "worst_drop_brand": "妇炎洁",
      "robust": true
     },
     "cmh_fans_band": {
      "p": 0.0692,
      "mh_or": 8.17,
      "robust": false,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 33.33,
        "g2_pct": 0.0
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 33.33,
        "g2_pct": 20.0
       }
      ],
      "n_strata": 2
     },
     "robust": false
    },
    {
     "field": "pain_points",
     "code": "flora_imbalance",
     "label": "痛点 · 菌群失衡反复",
     "g1_pct": 16.05,
     "g2_pct": 41.82,
     "q": 0.0019,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0002,
        "g1_pct": 11.29,
        "g2_pct": 41.82,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0001,
        "g1_pct": 9.84,
        "g2_pct": 41.82,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0007,
        "g1_pct": 16.05,
        "g2_pct": 45.71,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0147,
        "g1_pct": 20.97,
        "g2_pct": 41.82,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0127,
        "g1_pct": 20.63,
        "g2_pct": 41.82,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0147,
        "g1_pct": 16.05,
        "g2_pct": 35.9,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0018,
        "g1_pct": 17.11,
        "g2_pct": 41.82,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.001,
        "g1_pct": 16.05,
        "g2_pct": 44.44,
        "still_sig": true
       }
      ],
      "worst_p": 0.0147,
      "worst_drop_brand": "SOFY/苏菲",
      "robust": true
     },
     "cmh_fans_band": {
      "p": 0.2432,
      "mh_or": 0.41,
      "robust": false,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 21.43,
        "g2_pct": 18.18
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 8.33,
        "g2_pct": 80.0
       }
      ],
      "n_strata": 2
     },
     "robust": false
    },
    {
     "field": "pain_points",
     "code": "bulky_feel",
     "label": "痛点 · 厚重有异物感",
     "g1_pct": 13.58,
     "g2_pct": 0.0,
     "q": 0.0066,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0067,
        "g1_pct": 12.9,
        "g2_pct": 0.0,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0015,
        "g1_pct": 16.39,
        "g2_pct": 0.0,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0325,
        "g1_pct": 13.58,
        "g2_pct": 0.0,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0015,
        "g1_pct": 16.13,
        "g2_pct": 0.0,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0143,
        "g1_pct": 11.11,
        "g2_pct": 0.0,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0156,
        "g1_pct": 13.58,
        "g2_pct": 0.0,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0102,
        "g1_pct": 11.84,
        "g2_pct": 0.0,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0173,
        "g1_pct": 13.58,
        "g2_pct": 0.0,
        "still_sig": true
       }
      ],
      "worst_p": 0.0325,
      "worst_drop_brand": "INTIMA/茵缇玛",
      "robust": true
     },
     "cmh_fans_band": {
      "p": 0.2768,
      "mh_or": null,
      "robust": false,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 19.05,
        "g2_pct": 0.0
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 0.0,
        "g2_pct": 0.0
       }
      ],
      "n_strata": 2
     },
     "robust": false
    },
    {
     "field": "persuasion_logic",
     "code": "social_proof",
     "label": "说服逻辑 · 销量口碑证明",
     "g1_pct": 23.46,
     "g2_pct": 47.27,
     "q": 0.008,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0049,
        "g1_pct": 22.58,
        "g2_pct": 47.27,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0007,
        "g1_pct": 18.03,
        "g2_pct": 47.27,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.2264,
        "g1_pct": 23.46,
        "g2_pct": 34.29,
        "still_sig": false
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.065,
        "g1_pct": 30.65,
        "g2_pct": 47.27,
        "still_sig": false
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0022,
        "g1_pct": 20.63,
        "g2_pct": 47.27,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0053,
        "g1_pct": 23.46,
        "g2_pct": 48.72,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0081,
        "g1_pct": 25.0,
        "g2_pct": 47.27,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0002,
        "g1_pct": 23.46,
        "g2_pct": 58.33,
        "still_sig": true
       }
      ],
      "worst_p": 0.2264,
      "worst_drop_brand": "INTIMA/茵缇玛",
      "robust": false
     },
     "cmh_fans_band": {
      "p": 0.0001,
      "mh_or": 0.07,
      "robust": true,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 23.81,
        "g2_pct": 81.82
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 8.33,
        "g2_pct": 60.0
       }
      ],
      "n_strata": 2
     },
     "robust": false
    },
    {
     "field": "product_explain_methods",
     "code": "live_demo",
     "label": "产品讲解方式 · 现场实测",
     "g1_pct": 81.48,
     "g2_pct": 60.0,
     "q": 0.0118,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0665,
        "g1_pct": 75.81,
        "g2_pct": 60.0,
        "still_sig": false
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0045,
        "g1_pct": 83.61,
        "g2_pct": 60.0,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0009,
        "g1_pct": 81.48,
        "g2_pct": 51.43,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0665,
        "g1_pct": 75.81,
        "g2_pct": 60.0,
        "still_sig": false
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0003,
        "g1_pct": 88.89,
        "g2_pct": 60.0,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.1323,
        "g1_pct": 81.48,
        "g2_pct": 69.23,
        "still_sig": false
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0035,
        "g1_pct": 82.89,
        "g2_pct": 60.0,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0081,
        "g1_pct": 81.48,
        "g2_pct": 58.33,
        "still_sig": true
       }
      ],
      "worst_p": 0.1323,
      "worst_drop_brand": "妇炎洁",
      "robust": false
     },
     "cmh_fans_band": {
      "p": 0.0993,
      "mh_or": 3.47,
      "robust": false,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 85.71,
        "g2_pct": 54.55
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 83.33,
        "g2_pct": 80.0
       }
      ],
      "n_strata": 2
     },
     "robust": false
    },
    {
     "field": "pain_points",
     "code": "period_pain",
     "label": "痛点 · 痛经经期不适",
     "g1_pct": 19.75,
     "g2_pct": 3.64,
     "q": 0.013,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0089,
        "g1_pct": 19.35,
        "g2_pct": 3.64,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0014,
        "g1_pct": 24.59,
        "g2_pct": 3.64,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0182,
        "g1_pct": 19.75,
        "g2_pct": 2.86,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0154,
        "g1_pct": 17.74,
        "g2_pct": 3.64,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0098,
        "g1_pct": 19.05,
        "g2_pct": 3.64,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0356,
        "g1_pct": 19.75,
        "g2_pct": 5.13,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0108,
        "g1_pct": 18.42,
        "g2_pct": 3.64,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0162,
        "g1_pct": 19.75,
        "g2_pct": 2.78,
        "still_sig": true
       }
      ],
      "worst_p": 0.0356,
      "worst_drop_brand": "妇炎洁",
      "robust": true
     },
     "cmh_fans_band": {
      "p": 0.0523,
      "mh_or": null,
      "robust": false,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 33.33,
        "g2_pct": 0.0
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 8.33,
        "g2_pct": 0.0
       }
      ],
      "n_strata": 2
     },
     "robust": false
    },
    {
     "field": "tone_primary",
     "code": "teaching",
     "label": "主语气 · 教学讲解",
     "g1_pct": 6.17,
     "g2_pct": 21.82,
     "q": 0.0131,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0158,
        "g1_pct": 6.45,
        "g2_pct": 21.82,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0022,
        "g1_pct": 3.28,
        "g2_pct": 21.82,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.002,
        "g1_pct": 6.17,
        "g2_pct": 28.57,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0158,
        "g1_pct": 6.45,
        "g2_pct": 21.82,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0322,
        "g1_pct": 7.94,
        "g2_pct": 21.82,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.1728,
        "g1_pct": 6.17,
        "g2_pct": 15.38,
        "still_sig": false
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0104,
        "g1_pct": 6.58,
        "g2_pct": 21.82,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0215,
        "g1_pct": 6.17,
        "g2_pct": 22.22,
        "still_sig": true
       }
      ],
      "worst_p": 0.1728,
      "worst_drop_brand": "妇炎洁",
      "robust": false
     },
     "cmh_fans_band": {
      "p": 0.6116,
      "mh_or": 0.46,
      "robust": false,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 9.52,
        "g2_pct": 9.09
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 8.33,
        "g2_pct": 40.0
       }
      ],
      "n_strata": 2
     },
     "robust": false
    },
    {
     "field": "price_mention",
     "code": true,
     "label": "提及价格",
     "g1_pct": 14.81,
     "g2_pct": 34.55,
     "q": 0.0134,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0113,
        "g1_pct": 14.52,
        "g2_pct": 34.55,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0029,
        "g1_pct": 11.48,
        "g2_pct": 34.55,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0073,
        "g1_pct": 14.81,
        "g2_pct": 37.14,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0631,
        "g1_pct": 19.35,
        "g2_pct": 34.55,
        "still_sig": false
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0048,
        "g1_pct": 12.7,
        "g2_pct": 34.55,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0086,
        "g1_pct": 14.81,
        "g2_pct": 35.9,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0127,
        "g1_pct": 15.79,
        "g2_pct": 34.55,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.048,
        "g1_pct": 14.81,
        "g2_pct": 30.56,
        "still_sig": true
       }
      ],
      "worst_p": 0.0631,
      "worst_drop_brand": "SOFY/苏菲",
      "robust": false
     },
     "cmh_fans_band": {
      "p": 0.1206,
      "mh_or": 0.32,
      "robust": false,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 16.67,
        "g2_pct": 54.55
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 16.67,
        "g2_pct": 0.0
       }
      ],
      "n_strata": 2
     },
     "robust": false
    },
    {
     "field": "product_explain_methods",
     "code": "mechanism",
     "label": "产品讲解方式 · 作用机理",
     "g1_pct": 54.32,
     "g2_pct": 76.36,
     "q": 0.0162,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0544,
        "g1_pct": 59.68,
        "g2_pct": 76.36,
        "still_sig": false
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0026,
        "g1_pct": 49.18,
        "g2_pct": 76.36,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0849,
        "g1_pct": 54.32,
        "g2_pct": 71.43,
        "still_sig": false
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0002,
        "g1_pct": 41.94,
        "g2_pct": 76.36,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.1298,
        "g1_pct": 63.49,
        "g2_pct": 76.36,
        "still_sig": false
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0032,
        "g1_pct": 54.32,
        "g2_pct": 82.05,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0192,
        "g1_pct": 56.58,
        "g2_pct": 76.36,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0346,
        "g1_pct": 54.32,
        "g2_pct": 75.0,
        "still_sig": true
       }
      ],
      "worst_p": 0.1298,
      "worst_drop_brand": "whisper/护舒宝",
      "robust": false
     },
     "cmh_fans_band": {
      "p": 0.3232,
      "mh_or": 0.44,
      "robust": false,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 59.52,
        "g2_pct": 72.73
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 50.0,
        "g2_pct": 80.0
       }
      ],
      "n_strata": 2
     },
     "robust": false
    },
    {
     "field": "pain_points",
     "code": "other",
     "label": "痛点 · 其他",
     "g1_pct": 22.22,
     "g2_pct": 7.27,
     "q": 0.0358,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0079,
        "g1_pct": 25.81,
        "g2_pct": 7.27,
        "still_sig": true
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.007,
        "g1_pct": 26.23,
        "g2_pct": 7.27,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0097,
        "g1_pct": 22.22,
        "g2_pct": 2.86,
        "still_sig": true
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.022,
        "g1_pct": 22.58,
        "g2_pct": 7.27,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0624,
        "g1_pct": 19.05,
        "g2_pct": 7.27,
        "still_sig": false
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.1126,
        "g1_pct": 22.22,
        "g2_pct": 10.26,
        "still_sig": false
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0674,
        "g1_pct": 18.42,
        "g2_pct": 7.27,
        "still_sig": false
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.0708,
        "g1_pct": 22.22,
        "g2_pct": 8.33,
        "still_sig": false
       }
      ],
      "worst_p": 0.1126,
      "worst_drop_brand": "妇炎洁",
      "robust": false
     },
     "cmh_fans_band": {
      "p": 0.3317,
      "mh_or": 3.34,
      "robust": false,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 21.43,
        "g2_pct": 0.0
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 41.67,
        "g2_pct": 40.0
       }
      ],
      "n_strata": 2
     },
     "robust": false
    },
    {
     "field": "pain_points",
     "code": "change_hassle",
     "label": "痛点 · 更换携带麻烦",
     "g1_pct": 16.05,
     "g2_pct": 3.64,
     "q": 0.0404,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.1006,
        "g1_pct": 12.9,
        "g2_pct": 3.64,
        "still_sig": false
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0243,
        "g1_pct": 16.39,
        "g2_pct": 3.64,
        "still_sig": true
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.0611,
        "g1_pct": 16.05,
        "g2_pct": 2.86,
        "still_sig": false
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0262,
        "g1_pct": 16.13,
        "g2_pct": 3.64,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0167,
        "g1_pct": 17.46,
        "g2_pct": 3.64,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.1394,
        "g1_pct": 16.05,
        "g2_pct": 5.13,
        "still_sig": false
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0169,
        "g1_pct": 17.11,
        "g2_pct": 3.64,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.061,
        "g1_pct": 16.05,
        "g2_pct": 2.78,
        "still_sig": false
       }
      ],
      "worst_p": 0.1394,
      "worst_drop_brand": "妇炎洁",
      "robust": false
     },
     "cmh_fans_band": {
      "p": 0.0827,
      "mh_or": null,
      "robust": false,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 19.05,
        "g2_pct": 0.0
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 33.33,
        "g2_pct": 0.0
       }
      ],
      "n_strata": 2
     },
     "robust": false
    },
    {
     "field": "pain_points",
     "code": "embarrassment",
     "label": "痛点 · 羞耻难言之隐",
     "g1_pct": 11.11,
     "g2_pct": 25.45,
     "q": 0.048,
     "lobo": {
      "rows": [
       {
        "drop_brand": "FREEMORE/自由点",
        "p": 0.0829,
        "g1_pct": 12.9,
        "g2_pct": 25.45,
        "still_sig": false
       },
       {
        "drop_brand": "Herlab/她研社",
        "p": 0.0905,
        "g1_pct": 13.11,
        "g2_pct": 25.45,
        "still_sig": false
       },
       {
        "drop_brand": "INTIMA/茵缇玛",
        "p": 0.1006,
        "g1_pct": 11.11,
        "g2_pct": 22.86,
        "still_sig": false
       },
       {
        "drop_brand": "SOFY/苏菲",
        "p": 0.0045,
        "g1_pct": 6.45,
        "g2_pct": 25.45,
        "still_sig": true
       },
       {
        "drop_brand": "whisper/护舒宝",
        "p": 0.0421,
        "g1_pct": 11.11,
        "g2_pct": 25.45,
        "still_sig": true
       },
       {
        "drop_brand": "妇炎洁",
        "p": 0.0079,
        "g1_pct": 11.11,
        "g2_pct": 30.77,
        "still_sig": true
       },
       {
        "drop_brand": "朵薇",
        "p": 0.0433,
        "g1_pct": 11.84,
        "g2_pct": 25.45,
        "still_sig": true
       },
       {
        "drop_brand": "洛蕾诗",
        "p": 0.1155,
        "g1_pct": 11.11,
        "g2_pct": 22.22,
        "still_sig": false
       }
      ],
      "worst_p": 0.1155,
      "worst_drop_brand": "洛蕾诗",
      "robust": false
     },
     "cmh_fans_band": {
      "p": 0.3516,
      "mh_or": 0.38,
      "robust": false,
      "strata": [
       {
        "stratum": "100-500W",
        "g1_n": 42,
        "g2_n": 11,
        "g1_pct": 11.9,
        "g2_pct": 18.18
       },
       {
        "stratum": "50-100W",
        "g1_n": 12,
        "g2_n": 5,
        "g1_pct": 8.33,
        "g2_pct": 40.0
       }
      ],
      "n_strata": 2
     },
     "robust": false
    }
   ],
   "brand_nested_note": "⚠️ 本对照的品牌**完全嵌套**在子赛道里（FREEMORE/自由点、Herlab/她研社、SOFY/苏菲、whisper/护舒宝、朵薇 品牌只出现在 经期用品 组，INTIMA/茵缇玛、妇炎洁、洛蕾诗 品牌只出现在 私处护理 组），因此男版那种「品牌内 CMH 分层」在这里数学上不可识别（组内没有对照）。替代方案有两个，两个都做了：① 留一品牌法（轮流剔掉一个品牌重算，看结论是不是被单个品牌撑起来的）；② 按达人粉丝量级分层的 CMH（控制达人量级构成差异）。两项都稳的才标 robust=true。",
   "method": "① 留一品牌（Leave-One-Brand-Out）：8 个品牌轮流剔除后重算 2×2，取最差 p 值；② CMH：按 manifest 的达人粉丝量级（fans_band）分层，每层两组各≥3 条才纳入。"
  },
  "audience_mix": {
   "n": 136,
   "dist": [
    {
     "code": "female",
     "label": "女性向",
     "n": 136,
     "pct": 100.0
    }
   ],
   "non_female_n": 0,
   "non_female_rows": [],
   "note": "audience_gender 由多模态模型**逐条看完视频**判定（画面里谁在用、口播称呼、包装性别标识、使用场景），**不是**用标题关键词或品牌名推断，prompt 里明确禁止用品牌名倒推受众。本次 136 条标注中 female 136 条、非 female 0 条，即全部样本都判为女性向——这本身也说明该赛道的投放几乎不做男性受众。"
  },
  "caveat": "两组不是随机划分，而是两个真实子赛道：经期用品（81 条 / 5 个品牌）以卫生巾·安睡裤为主，私处护理（55 条 / 3 个品牌）以私处洗液为主，**品类差异本身就是子赛道差异的一部分**，不要把「私处护理更爱讲成分」读成「换个讲法就能赢」。另外 私处护理 组只有 3 个品牌有星图订单（全数取入），组内构成天然更集中。"
 },
 "C_content_x_effect": {
  "metric": "互动率 =（点赞+评论+转发）/播放量",
  "er_dist": {
   "n_usable": 121,
   "n_female": 136,
   "excluded": 15,
   "excluded_note": "15 条因播放量缺失或 <500 被剔除（极小分母会造出假的高互动率）",
   "median": 0.0176,
   "mean": 0.0914,
   "p25": 0.0067,
   "p75": 0.0411,
   "p90": 0.0803,
   "max": 2.6721,
   "skew": 5.85,
   "verdict": "互动率右偏（偏度 5.85），全部检验一律采用秩方法（Mann-Whitney / Kruskal-Wallis / Spearman / van Elteren），不做均值比较。"
  },
  "n_tests": 50,
  "method": "秩方法 + BH-FDR（50 项检验）。对 q<0.10 的项额外做 van Elteren 分层秩检验，分别按【品牌】【子赛道】【播放量分层】【粉丝量级】分层，检查该差异是否只是品牌/量级的混淆。",
  "tests": [
   {
    "kind": "KW",
    "field": "product_category",
    "code": null,
    "label": "品类",
    "n": 116,
    "p": 2.1050088851562016e-10,
    "levels": [
     {
      "code": "卫生巾",
      "label": "卫生巾",
      "n": 73,
      "er_median": 0.0301
     },
     {
      "code": "私处洗液",
      "label": "私处洗液",
      "n": 43,
      "er_median": 0.0061
     }
    ],
    "q": 1.0525044425781009e-08,
    "sig": true
   },
   {
    "kind": "MWU",
    "field": "cta_form",
    "code": "subtitle",
    "label": "CTA 形式 · 字幕引导",
    "n1": 27,
    "n0": 94,
    "er1": 0.0044,
    "er0": 0.0256,
    "p": 1.2028435122281147e-08,
    "q": 3.0071087805702867e-07,
    "sig": true,
    "direction": "down",
    "strat": {
     "by_brand_p": 0.0069,
     "by_seg_p": 0.0003,
     "by_vv_band_p": 0.0,
     "by_fans_band_p": 0.0,
     "brand_robust": true,
     "seg_robust": true
    },
    "interpretation": "全样本上「CTA 形式 · 字幕引导」的互动率中位 0.0044 vs 0.0256（q=0.0000）；按品牌分层后 p=0.0069、按子赛道分层后 p=0.0003，**两种分层下都仍成立，可作为值得 A/B 验证的内容假设**。"
   },
   {
    "kind": "MWU",
    "field": "cta_form",
    "code": "voice",
    "label": "CTA 形式 · 口播引导",
    "n1": 36,
    "n0": 85,
    "er1": 0.0052,
    "er0": 0.0268,
    "p": 5.862598156691631e-08,
    "q": 9.770996927819383e-07,
    "sig": true,
    "direction": "down",
    "strat": {
     "by_brand_p": 0.1169,
     "by_seg_p": 0.0631,
     "by_vv_band_p": 0.0006,
     "by_fans_band_p": 0.0019,
     "brand_robust": false,
     "seg_robust": false
    },
    "interpretation": "全样本上「CTA 形式 · 口播引导」的互动率中位 0.0052 vs 0.0268（q=0.0000）；按品牌分层后 p=0.1169、按子赛道分层后 p=0.0631，**分层后不再显著 —— 该差异主要由品牌/子赛道构成解释（两个子赛道的互动率水平本身就差好几倍），不构成内容建议**。"
   },
   {
    "kind": "MWU",
    "field": "persuasion_logic",
    "code": "price_value",
    "label": "说服逻辑 · 性价比划算",
    "n1": 25,
    "n0": 96,
    "er1": 0.005,
    "er0": 0.0256,
    "p": 2.2682601673879304e-07,
    "q": 1.9347182549901136e-06,
    "sig": true,
    "direction": "down",
    "strat": {
     "by_brand_p": 0.0115,
     "by_seg_p": 0.0059,
     "by_vv_band_p": 0.0,
     "by_fans_band_p": 0.0001,
     "brand_robust": true,
     "seg_robust": true
    },
    "interpretation": "全样本上「说服逻辑 · 性价比划算」的互动率中位 0.005 vs 0.0256（q=0.0000）；按品牌分层后 p=0.0115、按子赛道分层后 p=0.0059，**两种分层下都仍成立，可作为值得 A/B 验证的内容假设**。"
   },
   {
    "kind": "MWU",
    "field": "cta_form",
    "code": "none",
    "label": "CTA 形式 · 无引导",
    "n1": 82,
    "n0": 39,
    "er1": 0.0263,
    "er0": 0.0055,
    "p": 2.3216619059881364e-07,
    "q": 1.9347182549901136e-06,
    "sig": true,
    "direction": "up",
    "strat": {
     "by_brand_p": 0.0991,
     "by_seg_p": 0.0524,
     "by_vv_band_p": 0.0015,
     "by_fans_band_p": 0.0019,
     "brand_robust": false,
     "seg_robust": false
    },
    "interpretation": "全样本上「CTA 形式 · 无引导」的互动率中位 0.0263 vs 0.0055（q=0.0000）；按品牌分层后 p=0.0991、按子赛道分层后 p=0.0524，**分层后不再显著 —— 该差异主要由品牌/子赛道构成解释（两个子赛道的互动率水平本身就差好几倍），不构成内容建议**。"
   },
   {
    "kind": "MWU",
    "field": "cta",
    "code": true,
    "label": "有明确 CTA",
    "n1": 39,
    "n0": 82,
    "er1": 0.0055,
    "er0": 0.0263,
    "p": 2.3216619059881364e-07,
    "q": 1.9347182549901136e-06,
    "sig": true,
    "direction": "down",
    "strat": {
     "by_brand_p": 0.0991,
     "by_seg_p": 0.0524,
     "by_vv_band_p": 0.0015,
     "by_fans_band_p": 0.0019,
     "brand_robust": false,
     "seg_robust": false
    },
    "interpretation": "全样本上「有明确 CTA」的互动率中位 0.0055 vs 0.0263（q=0.0000）；按品牌分层后 p=0.0991、按子赛道分层后 p=0.0524，**分层后不再显著 —— 该差异主要由品牌/子赛道构成解释（两个子赛道的互动率水平本身就差好几倍），不构成内容建议**。"
   },
   {
    "kind": "KW",
    "field": "content_format",
    "code": null,
    "label": "内容体裁",
    "n": 119,
    "p": 3.737543595354461e-07,
    "levels": [
     {
      "code": "oral_review",
      "label": "口播测评",
      "n": 49,
      "er_median": 0.0055
     },
     {
      "code": "skit",
      "label": "剧情短片",
      "n": 47,
      "er_median": 0.0301
     },
     {
      "code": "vlog",
      "label": "生活 vlog",
      "n": 23,
      "er_median": 0.0234
     }
    ],
    "q": 2.669673996681758e-06,
    "sig": true
   },
   {
    "kind": "MWU",
    "field": "pain_points",
    "code": "wrong_care",
    "label": "痛点 · 清洁方式不对",
    "n1": 31,
    "n0": 90,
    "er1": 0.0055,
    "er0": 0.0256,
    "p": 2.32007691851128e-06,
    "q": 1.45004807406955e-05,
    "sig": true,
    "direction": "down",
    "strat": {
     "by_brand_p": 0.6624,
     "by_seg_p": 0.463,
     "by_vv_band_p": 0.0698,
     "by_fans_band_p": 0.0297,
     "brand_robust": false,
     "seg_robust": false
    },
    "interpretation": "全样本上「痛点 · 清洁方式不对」的互动率中位 0.0055 vs 0.0256（q=0.0000）；按品牌分层后 p=0.6624、按子赛道分层后 p=0.463，**分层后不再显著 —— 该差异主要由品牌/子赛道构成解释（两个子赛道的互动率水平本身就差好几倍），不构成内容建议**。"
   },
   {
    "kind": "MWU",
    "field": "euphemism_any",
    "code": true,
    "label": "出现私处/月经代称",
    "n1": 79,
    "n0": 42,
    "er1": 0.0108,
    "er0": 0.0332,
    "p": 6.1313554799898175e-06,
    "q": 3.369139533529078e-05,
    "sig": true,
    "direction": "down",
    "strat": {
     "by_brand_p": 0.4568,
     "by_seg_p": 0.0012,
     "by_vv_band_p": 0.0,
     "by_fans_band_p": 0.0061,
     "brand_robust": false,
     "seg_robust": true
    },
    "interpretation": "全样本上「出现私处/月经代称」的互动率中位 0.0108 vs 0.0332（q=0.0000）；按品牌分层后 p=0.4568、按子赛道分层后 p=0.0012，**分层后不再显著 —— 该差异主要由品牌/子赛道构成解释（两个子赛道的互动率水平本身就差好几倍），不构成内容建议**。"
   },
   {
    "kind": "MWU",
    "field": "pain_points",
    "code": "odor",
    "label": "痛点 · 异味",
    "n1": 44,
    "n0": 77,
    "er1": 0.0089,
    "er0": 0.0296,
    "p": 6.738279067058156e-06,
    "q": 3.369139533529078e-05,
    "sig": true,
    "direction": "down",
    "strat": {
     "by_brand_p": 0.9585,
     "by_seg_p": 0.0495,
     "by_vv_band_p": 0.001,
     "by_fans_band_p": 0.0049,
     "brand_robust": false,
     "seg_robust": true
    },
    "interpretation": "全样本上「痛点 · 异味」的互动率中位 0.0089 vs 0.0296（q=0.0000）；按品牌分层后 p=0.9585、按子赛道分层后 p=0.0495，**分层后不再显著 —— 该差异主要由品牌/子赛道构成解释（两个子赛道的互动率水平本身就差好几倍），不构成内容建议**。"
   },
   {
    "kind": "MWU",
    "field": "pain_points",
    "code": "flow_heavy",
    "label": "痛点 · 量大不够用",
    "n1": 26,
    "n0": 95,
    "er1": 0.0383,
    "er0": 0.0111,
    "p": 1.4766505306202741e-05,
    "q": 6.712047866455792e-05,
    "sig": true,
    "direction": "up",
    "strat": {
     "by_brand_p": 0.3256,
     "by_seg_p": 0.0055,
     "by_vv_band_p": 0.0006,
     "by_fans_band_p": 0.0001,
     "brand_robust": false,
     "seg_robust": true
    },
    "interpretation": "全样本上「痛点 · 量大不够用」的互动率中位 0.0383 vs 0.0111（q=0.0001）；按品牌分层后 p=0.3256、按子赛道分层后 p=0.0055，**分层后不再显著 —— 该差异主要由品牌/子赛道构成解释（两个子赛道的互动率水平本身就差好几倍），不构成内容建议**。"
   },
   {
    "kind": "MWU",
    "field": "product_explain_methods",
    "code": "ingredient",
    "label": "产品讲解方式 · 成分讲解",
    "n1": 77,
    "n0": 44,
    "er1": 0.011,
    "er0": 0.0317,
    "p": 2.4256460156906356e-05,
    "q": 0.00010106858398710981,
    "sig": true,
    "direction": "down",
    "strat": {
     "by_brand_p": 0.5312,
     "by_seg_p": 0.002,
     "by_vv_band_p": 0.0006,
     "by_fans_band_p": 0.0123,
     "brand_robust": false,
     "seg_robust": true
    },
    "interpretation": "全样本上「产品讲解方式 · 成分讲解」的互动率中位 0.011 vs 0.0317（q=0.0001）；按品牌分层后 p=0.5312、按子赛道分层后 p=0.002，**分层后不再显著 —— 该差异主要由品牌/子赛道构成解释（两个子赛道的互动率水平本身就差好几倍），不构成内容建议**。"
   },
   {
    "kind": "MWU",
    "field": "pain_points",
    "code": "stuffy",
    "label": "痛点 · 闷热不透气",
    "n1": 78,
    "n0": 43,
    "er1": 0.0263,
    "er0": 0.0071,
    "p": 6.651213725033365e-05,
    "q": 0.00025581591250128325,
    "sig": true,
    "direction": "up",
    "strat": {
     "by_brand_p": 0.3461,
     "by_seg_p": 0.4606,
     "by_vv_band_p": 0.0221,
     "by_fans_band_p": 0.0015,
     "brand_robust": false,
     "seg_robust": false
    },
    "interpretation": "全样本上「痛点 · 闷热不透气」的互动率中位 0.0263 vs 0.0071（q=0.0003）；按品牌分层后 p=0.3461、按子赛道分层后 p=0.4606，**分层后不再显著 —— 该差异主要由品牌/子赛道构成解释（两个子赛道的互动率水平本身就差好几倍），不构成内容建议**。"
   },
   {
    "kind": "MWU",
    "field": "price_mention",
    "code": true,
    "label": "提及价格",
    "n1": 28,
    "n0": 93,
    "er1": 0.0059,
    "er0": 0.0246,
    "p": 0.00024630724037727876,
    "q": 0.0008796687156331385,
    "sig": true,
    "direction": "down",
    "strat": {
     "by_brand_p": 0.0157,
     "by_seg_p": 0.0151,
     "by_vv_band_p": 0.0019,
     "by_fans_band_p": 0.0009,
     "brand_robust": true,
     "seg_robust": true
    },
    "interpretation": "全样本上「提及价格」的互动率中位 0.0059 vs 0.0246（q=0.0009）；按品牌分层后 p=0.0157、按子赛道分层后 p=0.0151，**两种分层下都仍成立，可作为值得 A/B 验证的内容假设**。"
   },
   {
    "kind": "MWU",
    "field": "pain_points",
    "code": "damp_sticky",
    "label": "痛点 · 潮湿黏腻",
    "n1": 53,
    "n0": 68,
    "er1": 0.0296,
    "er0": 0.0109,
    "p": 0.00030323336702647223,
    "q": 0.0010107778900882408,
    "sig": true,
    "direction": "up",
    "strat": {
     "by_brand_p": 0.1227,
     "by_seg_p": 0.0057,
     "by_vv_band_p": 0.0019,
     "by_fans_band_p": 0.0013,
     "brand_robust": false,
     "seg_robust": true
    },
    "interpretation": "全样本上「痛点 · 潮湿黏腻」的互动率中位 0.0296 vs 0.0109（q=0.0010）；按品牌分层后 p=0.1227、按子赛道分层后 p=0.0057，**分层后不再显著 —— 该差异主要由品牌/子赛道构成解释（两个子赛道的互动率水平本身就差好几倍），不构成内容建议**。"
   },
   {
    "kind": "MWU",
    "field": "product_explain_methods",
    "code": "material_teardown",
    "label": "产品讲解方式 · 拆开看内部结构",
    "n1": 34,
    "n0": 87,
    "er1": 0.0306,
    "er0": 0.0116,
    "p": 0.00133173277837857,
    "q": 0.004161664932433031,
    "sig": true,
    "direction": "up",
    "strat": {
     "by_brand_p": 0.2584,
     "by_seg_p": 0.5724,
     "by_vv_band_p": 0.2385,
     "by_fans_band_p": 0.0526,
     "brand_robust": false,
     "seg_robust": false
    },
    "interpretation": "全样本上「产品讲解方式 · 拆开看内部结构」的互动率中位 0.0306 vs 0.0116（q=0.0042）；按品牌分层后 p=0.2584、按子赛道分层后 p=0.5724，**分层后不再显著 —— 该差异主要由品牌/子赛道构成解释（两个子赛道的互动率水平本身就差好几倍），不构成内容建议**。"
   },
   {
    "kind": "MWU",
    "field": "pain_points",
    "code": "flora_imbalance",
    "label": "痛点 · 菌群失衡反复",
    "n1": 28,
    "n0": 93,
    "er1": 0.0087,
    "er0": 0.022,
    "p": 0.006415822871968654,
    "q": 0.01887006727049604,
    "sig": true,
    "direction": "down",
    "strat": {
     "by_brand_p": 0.8838,
     "by_seg_p": 0.211,
     "by_vv_band_p": 0.0466,
     "by_fans_band_p": 0.0649,
     "brand_robust": false,
     "seg_robust": false
    },
    "interpretation": "全样本上「痛点 · 菌群失衡反复」的互动率中位 0.0087 vs 0.022（q=0.0189）；按品牌分层后 p=0.8838、按子赛道分层后 p=0.211，**分层后不再显著 —— 该差异主要由品牌/子赛道构成解释（两个子赛道的互动率水平本身就差好几倍），不构成内容建议**。"
   },
   {
    "kind": "MWU",
    "field": "product_explain_methods",
    "code": "usage_steps",
    "label": "产品讲解方式 · 使用步骤",
    "n1": 22,
    "n0": 99,
    "er1": 0.008,
    "er0": 0.0217,
    "p": 0.011401286113923494,
    "q": 0.03167023920534304,
    "sig": true,
    "direction": "down",
    "strat": {
     "by_brand_p": 0.402,
     "by_seg_p": 0.8354,
     "by_vv_band_p": 0.2573,
     "by_fans_band_p": 0.0666,
     "brand_robust": false,
     "seg_robust": false
    },
    "interpretation": "全样本上「产品讲解方式 · 使用步骤」的互动率中位 0.008 vs 0.0217（q=0.0317）；按品牌分层后 p=0.402、按子赛道分层后 p=0.8354，**分层后不再显著 —— 该差异主要由品牌/子赛道构成解释（两个子赛道的互动率水平本身就差好几倍），不构成内容建议**。"
   },
   {
    "kind": "KW",
    "field": "tone_primary",
    "code": null,
    "label": "主语气",
    "n": 114,
    "p": 0.014170884286755343,
    "levels": [
     {
      "code": "emotional",
      "label": "情绪共鸣",
      "n": 14,
      "er_median": 0.0362
     },
     {
      "code": "peer_sister",
      "label": "姐妹平视",
      "n": 88,
      "er_median": 0.0145
     },
     {
      "code": "teaching",
      "label": "教学讲解",
      "n": 12,
      "er_median": 0.0085
     }
    ],
    "q": 0.037291800754619325,
    "sig": true
   },
   {
    "kind": "MWU",
    "field": "pain_points",
    "code": "rash",
    "label": "痛点 · 起疹磨红",
    "n1": 12,
    "n0": 109,
    "er1": 0.0413,
    "er0": 0.0147,
    "p": 0.016110124237320746,
    "q": 0.04027531059330187,
    "sig": true,
    "direction": "up",
    "strat": {
     "by_brand_p": 0.3634,
     "by_seg_p": 0.1434,
     "by_vv_band_p": 0.0693,
     "by_fans_band_p": 0.1618,
     "brand_robust": false,
     "seg_robust": false
    },
    "interpretation": "全样本上「痛点 · 起疹磨红」的互动率中位 0.0413 vs 0.0147（q=0.0403）；按品牌分层后 p=0.3634、按子赛道分层后 p=0.1434，**分层后不再显著 —— 该差异主要由品牌/子赛道构成解释（两个子赛道的互动率水平本身就差好几倍），不构成内容建议**。"
   },
   {
    "kind": "MWU",
    "field": "pain_points",
    "code": "leak",
    "label": "痛点 · 侧漏后漏",
    "n1": 34,
    "n0": 87,
    "er1": 0.0232,
    "er0": 0.0111,
    "p": 0.03870711434008789,
    "q": 0.09215979604782831,
    "sig": false,
    "direction": "up",
    "strat": {
     "by_brand_p": 0.2572,
     "by_seg_p": 0.2589,
     "by_vv_band_p": 0.8438,
     "by_fans_band_p": 0.7376,
     "brand_robust": false,
     "seg_robust": false
    }
   },
   {
    "kind": "KW",
    "field": "single_vs_bundle",
    "code": null,
    "label": "单品/套组",
    "n": 121,
    "p": 0.05038173850752815,
    "levels": [
     {
      "code": "bundle",
      "label": "套组组合",
      "n": 47,
      "er_median": 0.0114
     },
     {
      "code": "single",
      "label": "单品",
      "n": 47,
      "er_median": 0.0217
     },
     {
      "code": "unmentioned",
      "label": "未提及",
      "n": 27,
      "er_median": 0.0246
     }
    ],
    "q": 0.11450395115347306,
    "sig": false
   },
   {
    "kind": "MWU",
    "field": "persuasion_logic",
    "code": "social_proof",
    "label": "说服逻辑 · 销量口碑证明",
    "n1": 38,
    "n0": 83,
    "er1": 0.0109,
    "er0": 0.0253,
    "p": 0.05437456456039641,
    "q": 0.11820557513129654,
    "sig": false,
    "direction": "down"
   },
   {
    "kind": "MWU",
    "field": "female_address_any",
    "code": true,
    "label": "出现女性称呼语",
    "n1": 103,
    "n0": 18,
    "er1": 0.0143,
    "er0": 0.0319,
    "p": 0.0737495578478966,
    "q": 0.1536449121831179,
    "sig": false,
    "direction": "down"
   },
   {
    "kind": "MWU",
    "field": "pain_points",
    "code": "other",
    "label": "痛点 · 其他",
    "n1": 21,
    "n0": 100,
    "er1": 0.0314,
    "er0": 0.0143,
    "p": 0.08772120088103853,
    "q": 0.1754424017620771,
    "sig": false,
    "direction": "up"
   },
   {
    "kind": "KW",
    "field": "talent_gender",
    "code": null,
    "label": "达人性别",
    "n": 121,
    "p": 0.09416057465627563,
    "levels": [
     {
      "code": "both",
      "label": "男女同框",
      "n": 65,
      "er_median": 0.022
     },
     {
      "code": "female",
      "label": "女达人",
      "n": 56,
      "er_median": 0.0109
     }
    ],
    "q": 0.18107802818514546,
    "sig": false
   },
   {
    "kind": "MWU",
    "field": "gift_scene",
    "code": true,
    "label": "送礼场景",
    "n1": 27,
    "n0": 94,
    "er1": 0.022,
    "er0": 0.0137,
    "p": 0.11597259666024336,
    "q": 0.21476406788933955,
    "sig": false,
    "direction": "up"
   },
   {
    "kind": "MWU",
    "field": "persuasion_logic",
    "code": "male_endorse",
    "label": "说服逻辑 · 男性视角认可",
    "n1": 18,
    "n0": 103,
    "er1": 0.0111,
    "er0": 0.0196,
    "p": 0.12521864312653153,
    "q": 0.21817899214508277,
    "sig": false,
    "direction": "down"
   },
   {
    "kind": "MWU",
    "field": "taboo_direct",
    "code": true,
    "label": "直白谈私处/月经",
    "n1": 71,
    "n0": 50,
    "er1": 0.0253,
    "er0": 0.0129,
    "p": 0.12754366127180738,
    "q": 0.21817899214508277,
    "sig": false,
    "direction": "up"
   },
   {
    "kind": "MWU",
    "field": "product_explain_methods",
    "code": "certification",
    "label": "产品讲解方式 · 检测报告资质",
    "n1": 52,
    "n0": 69,
    "er1": 0.0116,
    "er0": 0.0217,
    "p": 0.13090739528704964,
    "q": 0.21817899214508277,
    "sig": false,
    "direction": "down"
   },
   {
    "kind": "MWU",
    "field": "product_explain_methods",
    "code": "competitor_compare",
    "label": "产品讲解方式 · 竞品对比",
    "n1": 23,
    "n0": 98,
    "er1": 0.0292,
    "er0": 0.0151,
    "p": 0.23053739452065392,
    "q": 0.35099687816516195,
    "sig": false,
    "direction": "up"
   },
   {
    "kind": "MWU",
    "field": "pain_points",
    "code": "allergy_sensitive",
    "label": "痛点 · 敏感刺痛过敏",
    "n1": 21,
    "n0": 100,
    "er1": 0.0253,
    "er0": 0.0165,
    "p": 0.23237885457554863,
    "q": 0.35099687816516195,
    "sig": false,
    "direction": "up"
   },
   {
    "kind": "MWU",
    "field": "persuasion_logic",
    "code": "peer_endorse",
    "label": "说服逻辑 · 姐妹闺蜜认可",
    "n1": 93,
    "n0": 28,
    "er1": 0.0196,
    "er0": 0.0107,
    "p": 0.23677006061814554,
    "q": 0.35099687816516195,
    "sig": false,
    "direction": "up"
   },
   {
    "kind": "MWU",
    "field": "explicit_any",
    "code": true,
    "label": "出现直白医学词",
    "n1": 89,
    "n0": 32,
    "er1": 0.022,
    "er0": 0.0117,
    "p": 0.23867787715231015,
    "q": 0.35099687816516195,
    "sig": false,
    "direction": "up"
   },
   {
    "kind": "MWU",
    "field": "product_explain_methods",
    "code": "live_demo",
    "label": "产品讲解方式 · 现场实测",
    "n1": 91,
    "n0": 30,
    "er1": 0.0177,
    "er0": 0.0128,
    "p": 0.2478964386778737,
    "q": 0.35413776953981957,
    "sig": false,
    "direction": "up"
   },
   {
    "kind": "MWU",
    "field": "persuasion_logic",
    "code": "expert_authority",
    "label": "说服逻辑 · 专家医生背书",
    "n1": 13,
    "n0": 108,
    "er1": 0.0079,
    "er0": 0.0181,
    "p": 0.2935162760329043,
    "q": 0.3968410639110556,
    "sig": false,
    "direction": "down"
   },
   {
    "kind": "MWU",
    "field": "persuasion_logic",
    "code": "self_care",
    "label": "说服逻辑 · 悦己爱自己",
    "n1": 50,
    "n0": 71,
    "er1": 0.0111,
    "er0": 0.0203,
    "p": 0.29366238729418115,
    "q": 0.3968410639110556,
    "sig": false,
    "direction": "down"
   },
   {
    "kind": "MWU",
    "field": "pain_points",
    "code": "period_pain",
    "label": "痛点 · 痛经经期不适",
    "n1": 18,
    "n0": 103,
    "er1": 0.021,
    "er0": 0.0155,
    "p": 0.31306995648183733,
    "q": 0.4119341532655754,
    "sig": false,
    "direction": "up"
   },
   {
    "kind": "MWU",
    "field": "persuasion_logic",
    "code": "efficacy_data",
    "label": "说服逻辑 · 功效数据",
    "n1": 47,
    "n0": 74,
    "er1": 0.0203,
    "er0": 0.0141,
    "p": 0.33178257549484913,
    "q": 0.4253622762754476,
    "sig": false,
    "direction": "up"
   },
   {
    "kind": "MWU",
    "field": "pain_points",
    "code": "itch_private",
    "label": "痛点 · 私处瘙痒",
    "n1": 44,
    "n0": 77,
    "er1": 0.0143,
    "er0": 0.0217,
    "p": 0.35545179883618705,
    "q": 0.44431474854523384,
    "sig": false,
    "direction": "down"
   },
   {
    "kind": "MWU",
    "field": "pain_points",
    "code": "bulky_feel",
    "label": "痛点 · 厚重有异物感",
    "n1": 11,
    "n0": 110,
    "er1": 0.0196,
    "er0": 0.0175,
    "p": 0.43016608173276105,
    "q": 0.5245927826009281,
    "sig": false,
    "direction": "up"
   },
   {
    "kind": "MWU",
    "field": "pain_points",
    "code": "postpartum",
    "label": "痛点 · 产后特殊护理",
    "n1": 10,
    "n0": 111,
    "er1": 0.0111,
    "er0": 0.0196,
    "p": 0.47144521337800627,
    "q": 0.5612443016404837,
    "sig": false,
    "direction": "down"
   },
   {
    "kind": "MWU",
    "field": "persuasion_logic",
    "code": "safety_assurance",
    "label": "说服逻辑 · 安全温和放心",
    "n1": 100,
    "n0": 21,
    "er1": 0.0151,
    "er0": 0.022,
    "p": 0.4872736042966358,
    "q": 0.5665972142984137,
    "sig": false,
    "direction": "down"
   },
   {
    "kind": "MWU",
    "field": "product_explain_methods",
    "code": "mechanism",
    "label": "产品讲解方式 · 作用机理",
    "n1": 75,
    "n0": 46,
    "er1": 0.0139,
    "er0": 0.021,
    "p": 0.5061984954475297,
    "q": 0.5752255630085565,
    "sig": false,
    "direction": "down"
   },
   {
    "kind": "MWU",
    "field": "persuasion_logic",
    "code": "taboo_normalize",
    "label": "说服逻辑 · 去羞耻化",
    "n1": 12,
    "n0": 109,
    "er1": 0.0092,
    "er0": 0.0177,
    "p": 0.5938171159984639,
    "q": 0.6597967955538487,
    "sig": false,
    "direction": "down"
   },
   {
    "kind": "MWU",
    "field": "convenience_claim",
    "code": true,
    "label": "便捷性主张",
    "n1": 42,
    "n0": 79,
    "er1": 0.0183,
    "er0": 0.0155,
    "p": 0.7091776829628423,
    "q": 0.7642609173645777,
    "sig": false,
    "direction": "up"
   },
   {
    "kind": "MWU",
    "field": "pain_points",
    "code": "sport_swim",
    "label": "痛点 · 运动久坐不便",
    "n1": 14,
    "n0": 107,
    "er1": 0.0154,
    "er0": 0.0176,
    "p": 0.7184052623227031,
    "q": 0.7642609173645777,
    "sig": false,
    "direction": "down"
   },
   {
    "kind": "MWU",
    "field": "product_explain_methods",
    "code": "spec_compare",
    "label": "产品讲解方式 · 参数规格对比",
    "n1": 35,
    "n0": 86,
    "er1": 0.0155,
    "er0": 0.018,
    "p": 0.7337589332499892,
    "q": 0.7643322221354053,
    "sig": false,
    "direction": "down"
   },
   {
    "kind": "MWU",
    "field": "pain_points",
    "code": "embarrassment",
    "label": "痛点 · 羞耻难言之隐",
    "n1": 20,
    "n0": 101,
    "er1": 0.0133,
    "er0": 0.0177,
    "p": 0.8205892803199368,
    "q": 0.8373360003264662,
    "sig": false,
    "direction": "down"
   },
   {
    "kind": "MWU",
    "field": "pain_points",
    "code": "change_hassle",
    "label": "痛点 · 更换携带麻烦",
    "n1": 15,
    "n0": 106,
    "er1": 0.0189,
    "er0": 0.0165,
    "p": 0.9905868844194343,
    "q": 0.9905868844194343,
    "sig": false,
    "direction": "up"
   }
  ],
  "significant": [
   {
    "kind": "KW",
    "field": "product_category",
    "code": null,
    "label": "品类",
    "n": 116,
    "p": 2.1050088851562016e-10,
    "levels": [
     {
      "code": "卫生巾",
      "label": "卫生巾",
      "n": 73,
      "er_median": 0.0301
     },
     {
      "code": "私处洗液",
      "label": "私处洗液",
      "n": 43,
      "er_median": 0.0061
     }
    ],
    "q": 1.0525044425781009e-08,
    "sig": true
   },
   {
    "kind": "MWU",
    "field": "cta_form",
    "code": "subtitle",
    "label": "CTA 形式 · 字幕引导",
    "n1": 27,
    "n0": 94,
    "er1": 0.0044,
    "er0": 0.0256,
    "p": 1.2028435122281147e-08,
    "q": 3.0071087805702867e-07,
    "sig": true,
    "direction": "down",
    "strat": {
     "by_brand_p": 0.0069,
     "by_seg_p": 0.0003,
     "by_vv_band_p": 0.0,
     "by_fans_band_p": 0.0,
     "brand_robust": true,
     "seg_robust": true
    },
    "interpretation": "全样本上「CTA 形式 · 字幕引导」的互动率中位 0.0044 vs 0.0256（q=0.0000）；按品牌分层后 p=0.0069、按子赛道分层后 p=0.0003，**两种分层下都仍成立，可作为值得 A/B 验证的内容假设**。"
   },
   {
    "kind": "MWU",
    "field": "cta_form",
    "code": "voice",
    "label": "CTA 形式 · 口播引导",
    "n1": 36,
    "n0": 85,
    "er1": 0.0052,
    "er0": 0.0268,
    "p": 5.862598156691631e-08,
    "q": 9.770996927819383e-07,
    "sig": true,
    "direction": "down",
    "strat": {
     "by_brand_p": 0.1169,
     "by_seg_p": 0.0631,
     "by_vv_band_p": 0.0006,
     "by_fans_band_p": 0.0019,
     "brand_robust": false,
     "seg_robust": false
    },
    "interpretation": "全样本上「CTA 形式 · 口播引导」的互动率中位 0.0052 vs 0.0268（q=0.0000）；按品牌分层后 p=0.1169、按子赛道分层后 p=0.0631，**分层后不再显著 —— 该差异主要由品牌/子赛道构成解释（两个子赛道的互动率水平本身就差好几倍），不构成内容建议**。"
   },
   {
    "kind": "MWU",
    "field": "persuasion_logic",
    "code": "price_value",
    "label": "说服逻辑 · 性价比划算",
    "n1": 25,
    "n0": 96,
    "er1": 0.005,
    "er0": 0.0256,
    "p": 2.2682601673879304e-07,
    "q": 1.9347182549901136e-06,
    "sig": true,
    "direction": "down",
    "strat": {
     "by_brand_p": 0.0115,
     "by_seg_p": 0.0059,
     "by_vv_band_p": 0.0,
     "by_fans_band_p": 0.0001,
     "brand_robust": true,
     "seg_robust": true
    },
    "interpretation": "全样本上「说服逻辑 · 性价比划算」的互动率中位 0.005 vs 0.0256（q=0.0000）；按品牌分层后 p=0.0115、按子赛道分层后 p=0.0059，**两种分层下都仍成立，可作为值得 A/B 验证的内容假设**。"
   },
   {
    "kind": "MWU",
    "field": "cta_form",
    "code": "none",
    "label": "CTA 形式 · 无引导",
    "n1": 82,
    "n0": 39,
    "er1": 0.0263,
    "er0": 0.0055,
    "p": 2.3216619059881364e-07,
    "q": 1.9347182549901136e-06,
    "sig": true,
    "direction": "up",
    "strat": {
     "by_brand_p": 0.0991,
     "by_seg_p": 0.0524,
     "by_vv_band_p": 0.0015,
     "by_fans_band_p": 0.0019,
     "brand_robust": false,
     "seg_robust": false
    },
    "interpretation": "全样本上「CTA 形式 · 无引导」的互动率中位 0.0263 vs 0.0055（q=0.0000）；按品牌分层后 p=0.0991、按子赛道分层后 p=0.0524，**分层后不再显著 —— 该差异主要由品牌/子赛道构成解释（两个子赛道的互动率水平本身就差好几倍），不构成内容建议**。"
   },
   {
    "kind": "MWU",
    "field": "cta",
    "code": true,
    "label": "有明确 CTA",
    "n1": 39,
    "n0": 82,
    "er1": 0.0055,
    "er0": 0.0263,
    "p": 2.3216619059881364e-07,
    "q": 1.9347182549901136e-06,
    "sig": true,
    "direction": "down",
    "strat": {
     "by_brand_p": 0.0991,
     "by_seg_p": 0.0524,
     "by_vv_band_p": 0.0015,
     "by_fans_band_p": 0.0019,
     "brand_robust": false,
     "seg_robust": false
    },
    "interpretation": "全样本上「有明确 CTA」的互动率中位 0.0055 vs 0.0263（q=0.0000）；按品牌分层后 p=0.0991、按子赛道分层后 p=0.0524，**分层后不再显著 —— 该差异主要由品牌/子赛道构成解释（两个子赛道的互动率水平本身就差好几倍），不构成内容建议**。"
   },
   {
    "kind": "KW",
    "field": "content_format",
    "code": null,
    "label": "内容体裁",
    "n": 119,
    "p": 3.737543595354461e-07,
    "levels": [
     {
      "code": "oral_review",
      "label": "口播测评",
      "n": 49,
      "er_median": 0.0055
     },
     {
      "code": "skit",
      "label": "剧情短片",
      "n": 47,
      "er_median": 0.0301
     },
     {
      "code": "vlog",
      "label": "生活 vlog",
      "n": 23,
      "er_median": 0.0234
     }
    ],
    "q": 2.669673996681758e-06,
    "sig": true
   },
   {
    "kind": "MWU",
    "field": "pain_points",
    "code": "wrong_care",
    "label": "痛点 · 清洁方式不对",
    "n1": 31,
    "n0": 90,
    "er1": 0.0055,
    "er0": 0.0256,
    "p": 2.32007691851128e-06,
    "q": 1.45004807406955e-05,
    "sig": true,
    "direction": "down",
    "strat": {
     "by_brand_p": 0.6624,
     "by_seg_p": 0.463,
     "by_vv_band_p": 0.0698,
     "by_fans_band_p": 0.0297,
     "brand_robust": false,
     "seg_robust": false
    },
    "interpretation": "全样本上「痛点 · 清洁方式不对」的互动率中位 0.0055 vs 0.0256（q=0.0000）；按品牌分层后 p=0.6624、按子赛道分层后 p=0.463，**分层后不再显著 —— 该差异主要由品牌/子赛道构成解释（两个子赛道的互动率水平本身就差好几倍），不构成内容建议**。"
   },
   {
    "kind": "MWU",
    "field": "euphemism_any",
    "code": true,
    "label": "出现私处/月经代称",
    "n1": 79,
    "n0": 42,
    "er1": 0.0108,
    "er0": 0.0332,
    "p": 6.1313554799898175e-06,
    "q": 3.369139533529078e-05,
    "sig": true,
    "direction": "down",
    "strat": {
     "by_brand_p": 0.4568,
     "by_seg_p": 0.0012,
     "by_vv_band_p": 0.0,
     "by_fans_band_p": 0.0061,
     "brand_robust": false,
     "seg_robust": true
    },
    "interpretation": "全样本上「出现私处/月经代称」的互动率中位 0.0108 vs 0.0332（q=0.0000）；按品牌分层后 p=0.4568、按子赛道分层后 p=0.0012，**分层后不再显著 —— 该差异主要由品牌/子赛道构成解释（两个子赛道的互动率水平本身就差好几倍），不构成内容建议**。"
   },
   {
    "kind": "MWU",
    "field": "pain_points",
    "code": "odor",
    "label": "痛点 · 异味",
    "n1": 44,
    "n0": 77,
    "er1": 0.0089,
    "er0": 0.0296,
    "p": 6.738279067058156e-06,
    "q": 3.369139533529078e-05,
    "sig": true,
    "direction": "down",
    "strat": {
     "by_brand_p": 0.9585,
     "by_seg_p": 0.0495,
     "by_vv_band_p": 0.001,
     "by_fans_band_p": 0.0049,
     "brand_robust": false,
     "seg_robust": true
    },
    "interpretation": "全样本上「痛点 · 异味」的互动率中位 0.0089 vs 0.0296（q=0.0000）；按品牌分层后 p=0.9585、按子赛道分层后 p=0.0495，**分层后不再显著 —— 该差异主要由品牌/子赛道构成解释（两个子赛道的互动率水平本身就差好几倍），不构成内容建议**。"
   },
   {
    "kind": "MWU",
    "field": "pain_points",
    "code": "flow_heavy",
    "label": "痛点 · 量大不够用",
    "n1": 26,
    "n0": 95,
    "er1": 0.0383,
    "er0": 0.0111,
    "p": 1.4766505306202741e-05,
    "q": 6.712047866455792e-05,
    "sig": true,
    "direction": "up",
    "strat": {
     "by_brand_p": 0.3256,
     "by_seg_p": 0.0055,
     "by_vv_band_p": 0.0006,
     "by_fans_band_p": 0.0001,
     "brand_robust": false,
     "seg_robust": true
    },
    "interpretation": "全样本上「痛点 · 量大不够用」的互动率中位 0.0383 vs 0.0111（q=0.0001）；按品牌分层后 p=0.3256、按子赛道分层后 p=0.0055，**分层后不再显著 —— 该差异主要由品牌/子赛道构成解释（两个子赛道的互动率水平本身就差好几倍），不构成内容建议**。"
   },
   {
    "kind": "MWU",
    "field": "product_explain_methods",
    "code": "ingredient",
    "label": "产品讲解方式 · 成分讲解",
    "n1": 77,
    "n0": 44,
    "er1": 0.011,
    "er0": 0.0317,
    "p": 2.4256460156906356e-05,
    "q": 0.00010106858398710981,
    "sig": true,
    "direction": "down",
    "strat": {
     "by_brand_p": 0.5312,
     "by_seg_p": 0.002,
     "by_vv_band_p": 0.0006,
     "by_fans_band_p": 0.0123,
     "brand_robust": false,
     "seg_robust": true
    },
    "interpretation": "全样本上「产品讲解方式 · 成分讲解」的互动率中位 0.011 vs 0.0317（q=0.0001）；按品牌分层后 p=0.5312、按子赛道分层后 p=0.002，**分层后不再显著 —— 该差异主要由品牌/子赛道构成解释（两个子赛道的互动率水平本身就差好几倍），不构成内容建议**。"
   },
   {
    "kind": "MWU",
    "field": "pain_points",
    "code": "stuffy",
    "label": "痛点 · 闷热不透气",
    "n1": 78,
    "n0": 43,
    "er1": 0.0263,
    "er0": 0.0071,
    "p": 6.651213725033365e-05,
    "q": 0.00025581591250128325,
    "sig": true,
    "direction": "up",
    "strat": {
     "by_brand_p": 0.3461,
     "by_seg_p": 0.4606,
     "by_vv_band_p": 0.0221,
     "by_fans_band_p": 0.0015,
     "brand_robust": false,
     "seg_robust": false
    },
    "interpretation": "全样本上「痛点 · 闷热不透气」的互动率中位 0.0263 vs 0.0071（q=0.0003）；按品牌分层后 p=0.3461、按子赛道分层后 p=0.4606，**分层后不再显著 —— 该差异主要由品牌/子赛道构成解释（两个子赛道的互动率水平本身就差好几倍），不构成内容建议**。"
   },
   {
    "kind": "MWU",
    "field": "price_mention",
    "code": true,
    "label": "提及价格",
    "n1": 28,
    "n0": 93,
    "er1": 0.0059,
    "er0": 0.0246,
    "p": 0.00024630724037727876,
    "q": 0.0008796687156331385,
    "sig": true,
    "direction": "down",
    "strat": {
     "by_brand_p": 0.0157,
     "by_seg_p": 0.0151,
     "by_vv_band_p": 0.0019,
     "by_fans_band_p": 0.0009,
     "brand_robust": true,
     "seg_robust": true
    },
    "interpretation": "全样本上「提及价格」的互动率中位 0.0059 vs 0.0246（q=0.0009）；按品牌分层后 p=0.0157、按子赛道分层后 p=0.0151，**两种分层下都仍成立，可作为值得 A/B 验证的内容假设**。"
   },
   {
    "kind": "MWU",
    "field": "pain_points",
    "code": "damp_sticky",
    "label": "痛点 · 潮湿黏腻",
    "n1": 53,
    "n0": 68,
    "er1": 0.0296,
    "er0": 0.0109,
    "p": 0.00030323336702647223,
    "q": 0.0010107778900882408,
    "sig": true,
    "direction": "up",
    "strat": {
     "by_brand_p": 0.1227,
     "by_seg_p": 0.0057,
     "by_vv_band_p": 0.0019,
     "by_fans_band_p": 0.0013,
     "brand_robust": false,
     "seg_robust": true
    },
    "interpretation": "全样本上「痛点 · 潮湿黏腻」的互动率中位 0.0296 vs 0.0109（q=0.0010）；按品牌分层后 p=0.1227、按子赛道分层后 p=0.0057，**分层后不再显著 —— 该差异主要由品牌/子赛道构成解释（两个子赛道的互动率水平本身就差好几倍），不构成内容建议**。"
   },
   {
    "kind": "MWU",
    "field": "product_explain_methods",
    "code": "material_teardown",
    "label": "产品讲解方式 · 拆开看内部结构",
    "n1": 34,
    "n0": 87,
    "er1": 0.0306,
    "er0": 0.0116,
    "p": 0.00133173277837857,
    "q": 0.004161664932433031,
    "sig": true,
    "direction": "up",
    "strat": {
     "by_brand_p": 0.2584,
     "by_seg_p": 0.5724,
     "by_vv_band_p": 0.2385,
     "by_fans_band_p": 0.0526,
     "brand_robust": false,
     "seg_robust": false
    },
    "interpretation": "全样本上「产品讲解方式 · 拆开看内部结构」的互动率中位 0.0306 vs 0.0116（q=0.0042）；按品牌分层后 p=0.2584、按子赛道分层后 p=0.5724，**分层后不再显著 —— 该差异主要由品牌/子赛道构成解释（两个子赛道的互动率水平本身就差好几倍），不构成内容建议**。"
   },
   {
    "kind": "MWU",
    "field": "pain_points",
    "code": "flora_imbalance",
    "label": "痛点 · 菌群失衡反复",
    "n1": 28,
    "n0": 93,
    "er1": 0.0087,
    "er0": 0.022,
    "p": 0.006415822871968654,
    "q": 0.01887006727049604,
    "sig": true,
    "direction": "down",
    "strat": {
     "by_brand_p": 0.8838,
     "by_seg_p": 0.211,
     "by_vv_band_p": 0.0466,
     "by_fans_band_p": 0.0649,
     "brand_robust": false,
     "seg_robust": false
    },
    "interpretation": "全样本上「痛点 · 菌群失衡反复」的互动率中位 0.0087 vs 0.022（q=0.0189）；按品牌分层后 p=0.8838、按子赛道分层后 p=0.211，**分层后不再显著 —— 该差异主要由品牌/子赛道构成解释（两个子赛道的互动率水平本身就差好几倍），不构成内容建议**。"
   },
   {
    "kind": "MWU",
    "field": "product_explain_methods",
    "code": "usage_steps",
    "label": "产品讲解方式 · 使用步骤",
    "n1": 22,
    "n0": 99,
    "er1": 0.008,
    "er0": 0.0217,
    "p": 0.011401286113923494,
    "q": 0.03167023920534304,
    "sig": true,
    "direction": "down",
    "strat": {
     "by_brand_p": 0.402,
     "by_seg_p": 0.8354,
     "by_vv_band_p": 0.2573,
     "by_fans_band_p": 0.0666,
     "brand_robust": false,
     "seg_robust": false
    },
    "interpretation": "全样本上「产品讲解方式 · 使用步骤」的互动率中位 0.008 vs 0.0217（q=0.0317）；按品牌分层后 p=0.402、按子赛道分层后 p=0.8354，**分层后不再显著 —— 该差异主要由品牌/子赛道构成解释（两个子赛道的互动率水平本身就差好几倍），不构成内容建议**。"
   },
   {
    "kind": "KW",
    "field": "tone_primary",
    "code": null,
    "label": "主语气",
    "n": 114,
    "p": 0.014170884286755343,
    "levels": [
     {
      "code": "emotional",
      "label": "情绪共鸣",
      "n": 14,
      "er_median": 0.0362
     },
     {
      "code": "peer_sister",
      "label": "姐妹平视",
      "n": 88,
      "er_median": 0.0145
     },
     {
      "code": "teaching",
      "label": "教学讲解",
      "n": 12,
      "er_median": 0.0085
     }
    ],
    "q": 0.037291800754619325,
    "sig": true
   },
   {
    "kind": "MWU",
    "field": "pain_points",
    "code": "rash",
    "label": "痛点 · 起疹磨红",
    "n1": 12,
    "n0": 109,
    "er1": 0.0413,
    "er0": 0.0147,
    "p": 0.016110124237320746,
    "q": 0.04027531059330187,
    "sig": true,
    "direction": "up",
    "strat": {
     "by_brand_p": 0.3634,
     "by_seg_p": 0.1434,
     "by_vv_band_p": 0.0693,
     "by_fans_band_p": 0.1618,
     "brand_robust": false,
     "seg_robust": false
    },
    "interpretation": "全样本上「痛点 · 起疹磨红」的互动率中位 0.0413 vs 0.0147（q=0.0403）；按品牌分层后 p=0.3634、按子赛道分层后 p=0.1434，**分层后不再显著 —— 该差异主要由品牌/子赛道构成解释（两个子赛道的互动率水平本身就差好几倍），不构成内容建议**。"
   }
  ],
  "brand_robust": [
   {
    "kind": "MWU",
    "field": "cta_form",
    "code": "subtitle",
    "label": "CTA 形式 · 字幕引导",
    "n1": 27,
    "n0": 94,
    "er1": 0.0044,
    "er0": 0.0256,
    "p": 1.2028435122281147e-08,
    "q": 3.0071087805702867e-07,
    "sig": true,
    "direction": "down",
    "strat": {
     "by_brand_p": 0.0069,
     "by_seg_p": 0.0003,
     "by_vv_band_p": 0.0,
     "by_fans_band_p": 0.0,
     "brand_robust": true,
     "seg_robust": true
    },
    "interpretation": "全样本上「CTA 形式 · 字幕引导」的互动率中位 0.0044 vs 0.0256（q=0.0000）；按品牌分层后 p=0.0069、按子赛道分层后 p=0.0003，**两种分层下都仍成立，可作为值得 A/B 验证的内容假设**。"
   },
   {
    "kind": "MWU",
    "field": "persuasion_logic",
    "code": "price_value",
    "label": "说服逻辑 · 性价比划算",
    "n1": 25,
    "n0": 96,
    "er1": 0.005,
    "er0": 0.0256,
    "p": 2.2682601673879304e-07,
    "q": 1.9347182549901136e-06,
    "sig": true,
    "direction": "down",
    "strat": {
     "by_brand_p": 0.0115,
     "by_seg_p": 0.0059,
     "by_vv_band_p": 0.0,
     "by_fans_band_p": 0.0001,
     "brand_robust": true,
     "seg_robust": true
    },
    "interpretation": "全样本上「说服逻辑 · 性价比划算」的互动率中位 0.005 vs 0.0256（q=0.0000）；按品牌分层后 p=0.0115、按子赛道分层后 p=0.0059，**两种分层下都仍成立，可作为值得 A/B 验证的内容假设**。"
   },
   {
    "kind": "MWU",
    "field": "price_mention",
    "code": true,
    "label": "提及价格",
    "n1": 28,
    "n0": 93,
    "er1": 0.0059,
    "er0": 0.0246,
    "p": 0.00024630724037727876,
    "q": 0.0008796687156331385,
    "sig": true,
    "direction": "down",
    "strat": {
     "by_brand_p": 0.0157,
     "by_seg_p": 0.0151,
     "by_vv_band_p": 0.0019,
     "by_fans_band_p": 0.0009,
     "brand_robust": true,
     "seg_robust": true
    },
    "interpretation": "全样本上「提及价格」的互动率中位 0.0059 vs 0.0246（q=0.0009）；按品牌分层后 p=0.0157、按子赛道分层后 p=0.0151，**两种分层下都仍成立，可作为值得 A/B 验证的内容假设**。"
   }
  ],
  "brand_and_seg_robust": [
   {
    "kind": "MWU",
    "field": "cta_form",
    "code": "subtitle",
    "label": "CTA 形式 · 字幕引导",
    "n1": 27,
    "n0": 94,
    "er1": 0.0044,
    "er0": 0.0256,
    "p": 1.2028435122281147e-08,
    "q": 3.0071087805702867e-07,
    "sig": true,
    "direction": "down",
    "strat": {
     "by_brand_p": 0.0069,
     "by_seg_p": 0.0003,
     "by_vv_band_p": 0.0,
     "by_fans_band_p": 0.0,
     "brand_robust": true,
     "seg_robust": true
    },
    "interpretation": "全样本上「CTA 形式 · 字幕引导」的互动率中位 0.0044 vs 0.0256（q=0.0000）；按品牌分层后 p=0.0069、按子赛道分层后 p=0.0003，**两种分层下都仍成立，可作为值得 A/B 验证的内容假设**。"
   },
   {
    "kind": "MWU",
    "field": "persuasion_logic",
    "code": "price_value",
    "label": "说服逻辑 · 性价比划算",
    "n1": 25,
    "n0": 96,
    "er1": 0.005,
    "er0": 0.0256,
    "p": 2.2682601673879304e-07,
    "q": 1.9347182549901136e-06,
    "sig": true,
    "direction": "down",
    "strat": {
     "by_brand_p": 0.0115,
     "by_seg_p": 0.0059,
     "by_vv_band_p": 0.0,
     "by_fans_band_p": 0.0001,
     "brand_robust": true,
     "seg_robust": true
    },
    "interpretation": "全样本上「说服逻辑 · 性价比划算」的互动率中位 0.005 vs 0.0256（q=0.0000）；按品牌分层后 p=0.0115、按子赛道分层后 p=0.0059，**两种分层下都仍成立，可作为值得 A/B 验证的内容假设**。"
   },
   {
    "kind": "MWU",
    "field": "price_mention",
    "code": true,
    "label": "提及价格",
    "n1": 28,
    "n0": 93,
    "er1": 0.0059,
    "er0": 0.0246,
    "p": 0.00024630724037727876,
    "q": 0.0008796687156331385,
    "sig": true,
    "direction": "down",
    "strat": {
     "by_brand_p": 0.0157,
     "by_seg_p": 0.0151,
     "by_vv_band_p": 0.0019,
     "by_fans_band_p": 0.0009,
     "brand_robust": true,
     "seg_robust": true
    },
    "interpretation": "全样本上「提及价格」的互动率中位 0.0059 vs 0.0246（q=0.0009）；按品牌分层后 p=0.0157、按子赛道分层后 p=0.0151，**两种分层下都仍成立，可作为值得 A/B 验证的内容假设**。"
   }
  ],
  "unrelated_highlights": [
   {
    "label": "单品/套组",
    "q": 0.1145,
    "detail": "组间无差异"
   },
   {
    "label": "达人性别",
    "q": 0.1811,
    "detail": "组间无差异"
   },
   {
    "label": "出现女性称呼语",
    "q": 0.1536,
    "detail": "0.0143 vs 0.0319"
   },
   {
    "label": "说服逻辑 · 安全温和放心",
    "q": 0.5666,
    "detail": "0.0151 vs 0.022"
   },
   {
    "label": "说服逻辑 · 姐妹闺蜜认可",
    "q": 0.351,
    "detail": "0.0196 vs 0.0107"
   },
   {
    "label": "产品讲解方式 · 现场实测",
    "q": 0.3541,
    "detail": "0.0177 vs 0.0128"
   },
   {
    "label": "出现直白医学词",
    "q": 0.351,
    "detail": "0.022 vs 0.0117"
   },
   {
    "label": "产品讲解方式 · 作用机理",
    "q": 0.5752,
    "detail": "0.0139 vs 0.021"
   },
   {
    "label": "直白谈私处/月经",
    "q": 0.2182,
    "detail": "0.0253 vs 0.0129"
   },
   {
    "label": "产品讲解方式 · 检测报告资质",
    "q": 0.2182,
    "detail": "0.0116 vs 0.0217"
   },
   {
    "label": "说服逻辑 · 悦己爱自己",
    "q": 0.3968,
    "detail": "0.0111 vs 0.0203"
   },
   {
    "label": "说服逻辑 · 功效数据",
    "q": 0.4254,
    "detail": "0.0203 vs 0.0141"
   },
   {
    "label": "痛点 · 私处瘙痒",
    "q": 0.4443,
    "detail": "0.0143 vs 0.0217"
   },
   {
    "label": "便捷性主张",
    "q": 0.7643,
    "detail": "0.0183 vs 0.0155"
   }
  ],
  "spearman": [
   {
    "var": "first_product_sec",
    "label": "首次出现产品秒数",
    "n": 121,
    "rho": 0.39,
    "p": 8.602404999406236e-06,
    "sig": true,
    "q": 0.0
   },
   {
    "var": "total_duration_sec",
    "label": "视频时长",
    "n": 121,
    "rho": 0.39,
    "p": 1.1366146404300046e-05,
    "sig": true,
    "q": 0.0
   },
   {
    "var": "euphemism_n",
    "label": "私处/月经代称词数量",
    "n": 121,
    "rho": -0.14,
    "p": 0.12013048292722955,
    "sig": false,
    "q": 0.1442
   },
   {
    "var": "address_n",
    "label": "女性称呼语数量",
    "n": 121,
    "rho": -0.11,
    "p": 0.2104841327618872,
    "sig": false,
    "q": 0.2105
   },
   {
    "var": "fans",
    "label": "达人粉丝数",
    "n": 121,
    "rho": 0.48,
    "p": 3.1594321463064096e-08,
    "sig": true,
    "q": 0.0
   },
   {
    "var": "vv",
    "label": "播放量",
    "n": 121,
    "rho": 0.37,
    "p": 2.559469007088581e-05,
    "sig": true,
    "q": 0.0
   }
  ],
  "strata_fans": [
   {
    "band": "10-30W",
    "n": 4,
    "er_median": null,
    "note": "样本不足，不解读"
   },
   {
    "band": "100-500W",
    "n": 53,
    "er_median": 0.0196,
    "note": ""
   },
   {
    "band": "30-50W",
    "n": 5,
    "er_median": 0.0086,
    "note": ""
   },
   {
    "band": "50-100W",
    "n": 16,
    "er_median": 0.0145,
    "note": ""
   },
   {
    "band": "500W+",
    "n": 25,
    "er_median": 0.0328,
    "note": ""
   },
   {
    "band": "<10W",
    "n": 18,
    "er_median": 0.0035,
    "note": ""
   }
  ],
  "strata_vv": [
   {
    "band": "中部",
    "n": 15,
    "er_median": 0.0061,
    "note": ""
   },
   {
    "band": "头部",
    "n": 73,
    "er_median": 0.0258,
    "note": ""
   },
   {
    "band": "尾部",
    "n": 19,
    "er_median": 0.0046,
    "note": ""
   },
   {
    "band": "腰部",
    "n": 14,
    "er_median": 0.0076,
    "note": ""
   }
  ],
  "strata_dur": [
   {
    "band": "中(31-60s)",
    "n": 19,
    "er_median": 0.0044,
    "note": ""
   },
   {
    "band": "短(≤30s)",
    "n": 2,
    "er_median": null,
    "note": "样本不足，不解读"
   },
   {
    "band": "长(>60s)",
    "n": 100,
    "er_median": 0.024,
    "note": ""
   }
  ],
  "by_seg": {
   "rows": [
    {
     "seg": "经期用品",
     "n": 80,
     "er_median": 0.0299
    },
    {
     "seg": "私处护理",
     "n": 41,
     "er_median": 0.0055
    }
   ],
   "p": 0.0,
   "sig": true,
   "note": "两个子赛道的互动率水平比较（Mann-Whitney）。样本是按投放金额取头部抽的，**不能外推为子赛道大盘互动率**。"
  },
  "by_brand": {
   "rows": [
    {
     "brand": "INTIMA/茵缇玛",
     "n": 20,
     "er_median": 0.0072,
     "note": ""
    },
    {
     "brand": "Herlab/她研社",
     "n": 20,
     "er_median": 0.0237,
     "note": ""
    },
    {
     "brand": "FREEMORE/自由点",
     "n": 19,
     "er_median": 0.0155,
     "note": ""
    },
    {
     "brand": "SOFY/苏菲",
     "n": 18,
     "er_median": 0.0439,
     "note": ""
    },
    {
     "brand": "whisper/护舒宝",
     "n": 18,
     "er_median": 0.0413,
     "note": ""
    },
    {
     "brand": "洛蕾诗",
     "n": 14,
     "er_median": 0.0025,
     "note": ""
    },
    {
     "brand": "妇炎洁",
     "n": 7,
     "er_median": null,
     "note": "样本不足（n<8），只报 n"
    },
    {
     "brand": "朵薇",
     "n": 5,
     "er_median": null,
     "note": "样本不足（n<8），只报 n"
    }
   ],
   "kruskal": {
    "p": 0.0,
    "sig": true,
    "groups": 6,
    "note": "品牌间互动率差异检验（Kruskal-Wallis）——用于回答「互动率到底是内容决定的还是品牌/达人盘子决定的」"
   }
  },
  "gmv": {
   "n_usable": 43,
   "n_female": 136,
   "metric": "每千次播放 GMV = 电商商品GMV / 播放量 × 1000",
   "zero_n": 5,
   "tests": [
    {
     "field": "taboo_direct",
     "code": true,
     "label": "直白谈私处/月经",
     "n1": 25,
     "n0": 18,
     "med1": 32.52,
     "med0": 213.62,
     "p": 0.00410212598750323,
     "q": 0.05742976382504522,
     "sig": false
    },
    {
     "field": "cta",
     "code": true,
     "label": "有明确 CTA",
     "n1": 28,
     "n0": 15,
     "med1": 108.12,
     "med0": 40.76,
     "p": 0.025655178853065445,
     "q": 0.1795862519714581,
     "sig": false
    },
    {
     "field": "persuasion_logic",
     "code": "self_care",
     "label": "说服逻辑 · 悦己爱自己",
     "n1": 26,
     "n0": 17,
     "med1": 43.21,
     "med0": 129.21,
     "p": 0.07150328275819783,
     "q": 0.3336819862049232,
     "sig": false
    },
    {
     "field": "persuasion_logic",
     "code": "price_value",
     "label": "说服逻辑 · 性价比划算",
     "n1": 20,
     "n0": 23,
     "med1": 108.12,
     "med0": 45.67,
     "p": 0.16117235898281745,
     "q": 0.5641032564398611,
     "sig": false
    },
    {
     "field": "persuasion_logic",
     "code": "efficacy_data",
     "label": "说服逻辑 · 功效数据",
     "n1": 13,
     "n0": 30,
     "med1": 30.51,
     "med0": 90.72,
     "p": 0.27208757583392673,
     "q": 0.6392793048681523,
     "sig": false
    },
    {
     "field": "persuasion_logic",
     "code": "male_endorse",
     "label": "说服逻辑 · 男性视角认可",
     "n1": 10,
     "n0": 33,
     "med1": 90.72,
     "med0": 61.36,
     "p": 0.3648057357997734,
     "q": 0.6392793048681523,
     "sig": false
    },
    {
     "field": "persuasion_logic",
     "code": "peer_endorse",
     "label": "说服逻辑 · 姐妹闺蜜认可",
     "n1": 28,
     "n0": 15,
     "med1": 65.75,
     "med0": 88.35,
     "p": 0.3653024599246585,
     "q": 0.6392793048681523,
     "sig": false
    },
    {
     "field": "product_explain_methods",
     "code": "spec_compare",
     "label": "产品讲解方式 · 参数规格对比",
     "n1": 10,
     "n0": 33,
     "med1": 45.3,
     "med0": 88.35,
     "p": 0.3071006294390589,
     "q": 0.6392793048681523,
     "sig": false
    },
    {
     "field": "product_explain_methods",
     "code": "certification",
     "label": "产品讲解方式 · 检测报告资质",
     "n1": 26,
     "n0": 17,
     "med1": 65.75,
     "med0": 88.35,
     "p": 0.4942158980388073,
     "q": 0.7687802858381446,
     "sig": false
    },
    {
     "field": "convenience_claim",
     "code": true,
     "label": "便捷性主张",
     "n1": 17,
     "n0": 26,
     "med1": 49.78,
     "med0": 89.53,
     "p": 0.5930194280543952,
     "q": 0.8302271992761533,
     "sig": false
    },
    {
     "field": "persuasion_logic",
     "code": "social_proof",
     "label": "说服逻辑 · 销量口碑证明",
     "n1": 19,
     "n0": 24,
     "med1": 85.98,
     "med0": 55.45,
     "p": 0.7783619843777085,
     "q": 0.9080889817739933,
     "sig": false
    },
    {
     "field": "product_explain_methods",
     "code": "live_demo",
     "label": "产品讲解方式 · 现场实测",
     "n1": 31,
     "n0": 12,
     "med1": 70.14,
     "med0": 58.79,
     "p": 0.7553328789441969,
     "q": 0.9080889817739933,
     "sig": false
    },
    {
     "field": "price_mention",
     "code": true,
     "label": "提及价格",
     "n1": 17,
     "n0": 26,
     "med1": 88.35,
     "med0": 65.26,
     "p": 0.8716345368397813,
     "q": 0.9288787178473441,
     "sig": false
    },
    {
     "field": "product_explain_methods",
     "code": "usage_steps",
     "label": "产品讲解方式 · 使用步骤",
     "n1": 15,
     "n0": 28,
     "med1": 85.98,
     "med0": 69.65,
     "p": 0.9288787178473441,
     "q": 0.9288787178473441,
     "sig": false
    }
   ],
   "significant": [],
   "verdict": "GMV 侧共 14 项检验，BH-FDR 校正后**无一项显著**（最小 q=0.057）。"
  },
  "verdict": "在 n=121 条互动率可用的女性向样本上做了 50 项检验，BH-FDR 校正后 20 项显著；再按品牌分层（van Elteren）后剩 3 项、同时按子赛道分层后只剩 3 项稳健。仅有的稳健项也只能当作「值得 A/B 验证的假设」，不能读成因果。",
  "caveat": [
   "样本按「每品牌投放金额 TOP20」抽取、刻意偏头部，互动率与播放量强负相关，样本层面的互动率水平不能外推为总体。",
   "未做含品牌固定效应的多元回归（n 不足以支撑），混淆控制只做到单变量 + 分层敏感性检验。",
   "品牌与品类高度共线（如私处护理组几乎全是私处洗液），品牌分层后组内变异很小；分层不显著≠效应不存在，但同样**不能声称效应存在**。",
   "互动率只是「内容被看到之后的反应强度」，不等于生意结果；GMV 字段非空率过低无法补位。"
  ]
 },
 "D_structure": {
  "n": 136,
  "opening_stage": [
   {
    "code": "hook",
    "label": "钩子",
    "n": 135,
    "pct": 99.26
   },
   {
    "code": "pain",
    "label": "痛点",
    "n": 1,
    "pct": 0.74
   }
  ],
  "closing_stage": [
   {
    "code": "other",
    "label": "其他",
    "n": 89,
    "pct": 65.44
   },
   {
    "code": "cta",
    "label": "行动号召",
    "n": 31,
    "pct": 22.79
   },
   {
    "code": "demo",
    "label": "演示",
    "n": 6,
    "pct": 4.41
   },
   {
    "code": "proof",
    "label": "证据背书",
    "n": 5,
    "pct": 3.68
   },
   {
    "code": "solution",
    "label": "解法引出",
    "n": 4,
    "pct": 2.94
   },
   {
    "code": "pain",
    "label": "痛点",
    "n": 1,
    "pct": 0.74
   }
  ],
  "stage_presence": [
   {
    "code": "hook",
    "label": "钩子",
    "n": 136,
    "pct": 100.0
   },
   {
    "code": "pain",
    "label": "痛点",
    "n": 107,
    "pct": 78.68
   },
   {
    "code": "solution",
    "label": "解法引出",
    "n": 124,
    "pct": 91.18
   },
   {
    "code": "demo",
    "label": "演示",
    "n": 114,
    "pct": 83.82
   },
   {
    "code": "proof",
    "label": "证据背书",
    "n": 69,
    "pct": 50.74
   },
   {
    "code": "cta",
    "label": "行动号召",
    "n": 34,
    "pct": 25.0
   },
   {
    "code": "other",
    "label": "其他",
    "n": 95,
    "pct": 69.85
   }
  ],
  "top_sequences": [
   {
    "seq": [
     "hook",
     "pain",
     "solution",
     "demo",
     "other"
    ],
    "seq_cn": "钩子 → 痛点 → 解法引出 → 演示 → 其他",
    "n": 9,
    "pct": 6.62
   },
   {
    "seq": [
     "hook",
     "pain",
     "solution",
     "demo",
     "proof",
     "cta"
    ],
    "seq_cn": "钩子 → 痛点 → 解法引出 → 演示 → 证据背书 → 行动号召",
    "n": 4,
    "pct": 2.94
   },
   {
    "seq": [
     "hook",
     "pain",
     "solution",
     "demo",
     "cta"
    ],
    "seq_cn": "钩子 → 痛点 → 解法引出 → 演示 → 行动号召",
    "n": 4,
    "pct": 2.94
   },
   {
    "seq": [
     "hook",
     "pain",
     "solution",
     "other"
    ],
    "seq_cn": "钩子 → 痛点 → 解法引出 → 其他",
    "n": 4,
    "pct": 2.94
   },
   {
    "seq": [
     "hook",
     "pain",
     "solution",
     "demo"
    ],
    "seq_cn": "钩子 → 痛点 → 解法引出 → 演示",
    "n": 3,
    "pct": 2.21
   },
   {
    "seq": [
     "hook",
     "other",
     "pain",
     "solution",
     "other"
    ],
    "seq_cn": "钩子 → 其他 → 痛点 → 解法引出 → 其他",
    "n": 3,
    "pct": 2.21
   },
   {
    "seq": [
     "hook",
     "pain",
     "solution",
     "demo",
     "proof"
    ],
    "seq_cn": "钩子 → 痛点 → 解法引出 → 演示 → 证据背书",
    "n": 2,
    "pct": 1.47
   },
   {
    "seq": [
     "hook",
     "other",
     "pain",
     "demo",
     "other"
    ],
    "seq_cn": "钩子 → 其他 → 痛点 → 演示 → 其他",
    "n": 2,
    "pct": 1.47
   },
   {
    "seq": [
     "hook",
     "pain",
     "proof",
     "demo",
     "solution"
    ],
    "seq_cn": "钩子 → 痛点 → 证据背书 → 演示 → 解法引出",
    "n": 2,
    "pct": 1.47
   },
   {
    "seq": [
     "hook",
     "solution",
     "demo",
     "other"
    ],
    "seq_cn": "钩子 → 解法引出 → 演示 → 其他",
    "n": 2,
    "pct": 1.47
   }
  ],
  "top_openings": [
   {
    "seq": [
     "hook",
     "pain",
     "solution"
    ],
    "seq_cn": "钩子 → 痛点 → 解法引出",
    "n": 48,
    "pct": 35.29
   },
   {
    "seq": [
     "hook",
     "other",
     "pain"
    ],
    "seq_cn": "钩子 → 其他 → 痛点",
    "n": 19,
    "pct": 13.97
   },
   {
    "seq": [
     "hook",
     "solution",
     "demo"
    ],
    "seq_cn": "钩子 → 解法引出 → 演示",
    "n": 11,
    "pct": 8.09
   },
   {
    "seq": [
     "hook",
     "other",
     "hook"
    ],
    "seq_cn": "钩子 → 其他 → 钩子",
    "n": 8,
    "pct": 5.88
   },
   {
    "seq": [
     "hook",
     "pain",
     "other"
    ],
    "seq_cn": "钩子 → 痛点 → 其他",
    "n": 8,
    "pct": 5.88
   },
   {
    "seq": [
     "hook",
     "other",
     "solution"
    ],
    "seq_cn": "钩子 → 其他 → 解法引出",
    "n": 7,
    "pct": 5.15
   },
   {
    "seq": [
     "hook",
     "pain",
     "demo"
    ],
    "seq_cn": "钩子 → 痛点 → 演示",
    "n": 5,
    "pct": 3.68
   },
   {
    "seq": [
     "hook",
     "other",
     "demo"
    ],
    "seq_cn": "钩子 → 其他 → 演示",
    "n": 5,
    "pct": 3.68
   }
  ],
  "stage_share": [
   {
    "code": "hook",
    "label": "钩子",
    "mean_pct": 16.48,
    "median_pct": 12.87
   },
   {
    "code": "pain",
    "label": "痛点",
    "mean_pct": 11.47,
    "median_pct": 9.39
   },
   {
    "code": "solution",
    "label": "解法引出",
    "mean_pct": 12.56,
    "median_pct": 10.92
   },
   {
    "code": "demo",
    "label": "演示",
    "mean_pct": 15.18,
    "median_pct": 12.28
   },
   {
    "code": "proof",
    "label": "证据背书",
    "mean_pct": 7.17,
    "median_pct": 0.94
   },
   {
    "code": "cta",
    "label": "行动号召",
    "mean_pct": 2.95,
    "median_pct": 0.0
   },
   {
    "code": "other",
    "label": "其他",
    "mean_pct": 29.57,
    "median_pct": 20.77
   }
  ],
  "seq_len": {
   "median": 6.0,
   "mean": 6.38
  },
  "first_product": {
   "n": 136,
   "median": 41.0,
   "mean": 43.07,
   "p25": 8.75,
   "p75": 69.25,
   "note": "均值 43.1s vs 中位 41.0s：口播/展示类几秒就出品、剧情/vlog 会拖很久，是双峰而非单峰。"
  },
  "first_product_by_format": [
   {
    "code": "oral_review",
    "label": "口播测评",
    "n": 63,
    "first_product_median": 15.0,
    "note": ""
   },
   {
    "code": "skit",
    "label": "剧情短片",
    "n": 48,
    "first_product_median": 60.0,
    "note": ""
   },
   {
    "code": "vlog",
    "label": "生活 vlog",
    "n": 23,
    "first_product_median": 70.0,
    "note": ""
   },
   {
    "code": "tutorial",
    "label": "教程",
    "n": 1,
    "first_product_median": 118.6,
    "note": "样本不足（n<12），仅供参考、不做结论"
   },
   {
    "code": "experiment",
    "label": "实验演示",
    "n": 1,
    "first_product_median": 14.0,
    "note": "样本不足（n<12），仅供参考、不做结论"
   }
  ],
  "first_product_by_format_test": {
   "p": 0.0,
   "sig": true,
   "groups": 3,
   "note": "不同体裁的「首次出现产品秒数」差异检验（Kruskal-Wallis）"
  },
  "high_vs_low": {
   "quartile_n": 30,
   "high": {
    "n": 30,
    "er_median": 0.0649,
    "has_pain_pct": 83.33,
    "has_proof_pct": 43.33,
    "has_cta_pct": 10.0,
    "has_demo_pct": 76.67,
    "stage_count_median": 6.0,
    "first_product_median": 53.0,
    "duration_median": 133.8,
    "taboo_direct_pct": 63.33
   },
   "low": {
    "n": 30,
    "er_median": 0.0034,
    "has_pain_pct": 73.33,
    "has_proof_pct": 73.33,
    "has_cta_pct": 60.0,
    "has_demo_pct": 90.0,
    "stage_count_median": 5.5,
    "first_product_median": 8.0,
    "duration_median": 64.15,
    "taboo_direct_pct": 46.67
   },
   "tests": [
    {
     "label": "含痛点段",
     "high_pct": 83.33,
     "low_pct": 73.33,
     "p": 0.3472,
     "sig": false
    },
    {
     "label": "含证据段",
     "high_pct": 43.33,
     "low_pct": 73.33,
     "p": 0.0184,
     "sig": true
    },
    {
     "label": "含 CTA 段",
     "high_pct": 10.0,
     "low_pct": 60.0,
     "p": 0.0,
     "sig": true
    },
    {
     "label": "含演示段",
     "high_pct": 76.67,
     "low_pct": 90.0,
     "p": 0.1659,
     "sig": false
    },
    {
     "label": "直白谈私处/月经",
     "high_pct": 63.33,
     "low_pct": 46.67,
     "p": 0.1945,
     "sig": false
    },
    {
     "label": "首次出现产品秒数（中位）",
     "high_pct": 53.0,
     "low_pct": 8.0,
     "p": 0.0001,
     "sig": true,
     "unit": "s"
    }
   ],
   "verdict": "高互动四分位（n=30，互动率中位 0.0649）与低互动四分位（互动率中位 0.0034）在结构上的差异：含证据段（43.33 vs 73.33，p=0.0184）、含 CTA 段（10.0 vs 60.0，p=0.0）、首次出现产品秒数（中位）（53.0 vs 8.0，p=0.0001）"
  },
  "caveat": "structure_timeline 的 stage 切分由多模态模型完成，双跑一致性报告只覆盖单选/多选字段、未覆盖时间轴，D 块结论的可靠度低于 content_format / audience_gender，请当作「量级参考」而非精确值。"
 },
 "E_brands": {
  "threshold": 12,
  "brands": [
   {
    "brand": "INTIMA/茵缇玛",
    "n": 20,
    "seg": "私处护理",
    "category": [
     {
      "code": "私处洗液",
      "label": "私处洗液",
      "n": 20,
      "pct": 100.0
     }
    ],
    "hook": [
     {
      "code": "scene",
      "label": "场景代入",
      "n": 13,
      "pct": 65.0
     },
     {
      "code": "taboo_break",
      "label": "打破羞耻",
      "n": 2,
      "pct": 10.0
     },
     {
      "code": "identity",
      "label": "身份认同",
      "n": 2,
      "pct": 10.0
     }
    ],
    "pain": [
     {
      "code": "wrong_care",
      "label": "清洁方式不对",
      "n": 14,
      "pct": 70.0
     },
     {
      "code": "odor",
      "label": "异味",
      "n": 13,
      "pct": 65.0
     },
     {
      "code": "flora_imbalance",
      "label": "菌群失衡反复",
      "n": 7,
      "pct": 35.0
     }
    ],
    "explain": [
     {
      "code": "sensory",
      "label": "肤感气味描述",
      "n": 18,
      "pct": 90.0
     },
     {
      "code": "mechanism",
      "label": "作用机理",
      "n": 17,
      "pct": 85.0
     },
     {
      "code": "ingredient",
      "label": "成分讲解",
      "n": 15,
      "pct": 75.0
     }
    ],
    "persuasion": [
     {
      "code": "safety_assurance",
      "label": "安全温和放心",
      "n": 18,
      "pct": 90.0
     },
     {
      "code": "peer_endorse",
      "label": "姐妹闺蜜认可",
      "n": 16,
      "pct": 80.0
     },
     {
      "code": "social_proof",
      "label": "销量口碑证明",
      "n": 14,
      "pct": 70.0
     }
    ],
    "tone": [
     {
      "code": "peer_sister",
      "label": "姐妹平视",
      "n": 15,
      "pct": 75.0
     },
     {
      "code": "teaching",
      "label": "教学讲解",
      "n": 2,
      "pct": 10.0
     }
    ],
    "format": [
     {
      "code": "oral_review",
      "label": "口播测评",
      "n": 13,
      "pct": 65.0
     },
     {
      "code": "skit",
      "label": "剧情短片",
      "n": 6,
      "pct": 30.0
     }
    ],
    "convenience_pct": 30.0,
    "female_address_pct": 95.0,
    "euphemism_pct": 100.0,
    "taboo_direct_pct": 75.0,
    "price_pct": 30.0,
    "cta_pct": 50.0,
    "compliance_hit_pct": 45.0,
    "first_product_median": 33.0,
    "duration_median": 102.7,
    "er_median": 0.0072,
    "er_n": 20,
    "er_note": "",
    "talent_male_pct": 0.0,
    "top_euphemism": [
     {
      "term": "私处",
      "n": 13
     },
     {
      "term": "小花园",
      "n": 12
     },
     {
      "term": "下面",
      "n": 5
     },
     {
      "term": "那里",
      "n": 4
     },
     {
      "term": "经期",
      "n": 4
     }
    ],
    "style": "私处洗液 占 100.0%；开场多用「场景代入」（65.0%）；主语气「姐妹平视」（75.0%）；讲解主打「肤感气味描述」（90.0%）；说服锚在「安全温和放心」（90.0%）。直白谈私处/月经 75.0%　CTA 覆盖 50.0%　首次出品中位 33.0s。"
   },
   {
    "brand": "Herlab/她研社",
    "n": 20,
    "seg": "经期用品",
    "category": [
     {
      "code": "卫生巾",
      "label": "卫生巾",
      "n": 16,
      "pct": 80.0
     },
     {
      "code": "私处洗液",
      "label": "私处洗液",
      "n": 4,
      "pct": 20.0
     }
    ],
    "hook": [
     {
      "code": "scene",
      "label": "场景代入",
      "n": 14,
      "pct": 70.0
     },
     {
      "code": "identity",
      "label": "身份认同",
      "n": 3,
      "pct": 15.0
     },
     {
      "code": "suspense",
      "label": "悬念设问",
      "n": 1,
      "pct": 5.0
     }
    ],
    "pain": [
     {
      "code": "stuffy",
      "label": "闷热不透气",
      "n": 15,
      "pct": 75.0
     },
     {
      "code": "damp_sticky",
      "label": "潮湿黏腻",
      "n": 11,
      "pct": 55.0
     },
     {
      "code": "itch_private",
      "label": "私处瘙痒",
      "n": 11,
      "pct": 55.0
     }
    ],
    "explain": [
     {
      "code": "sensory",
      "label": "肤感气味描述",
      "n": 19,
      "pct": 95.0
     },
     {
      "code": "live_demo",
      "label": "现场实测",
      "n": 15,
      "pct": 75.0
     },
     {
      "code": "mechanism",
      "label": "作用机理",
      "n": 14,
      "pct": 70.0
     }
    ],
    "persuasion": [
     {
      "code": "safety_assurance",
      "label": "安全温和放心",
      "n": 15,
      "pct": 75.0
     },
     {
      "code": "peer_endorse",
      "label": "姐妹闺蜜认可",
      "n": 14,
      "pct": 70.0
     },
     {
      "code": "self_care",
      "label": "悦己爱自己",
      "n": 11,
      "pct": 55.0
     }
    ],
    "tone": [
     {
      "code": "peer_sister",
      "label": "姐妹平视",
      "n": 14,
      "pct": 70.0
     },
     {
      "code": "teaching",
      "label": "教学讲解",
      "n": 3,
      "pct": 15.0
     }
    ],
    "format": [
     {
      "code": "oral_review",
      "label": "口播测评",
      "n": 8,
      "pct": 40.0
     },
     {
      "code": "skit",
      "label": "剧情短片",
      "n": 7,
      "pct": 35.0
     }
    ],
    "convenience_pct": 45.0,
    "female_address_pct": 75.0,
    "euphemism_pct": 95.0,
    "taboo_direct_pct": 80.0,
    "price_pct": 25.0,
    "cta_pct": 30.0,
    "compliance_hit_pct": 60.0,
    "first_product_median": 51.0,
    "duration_median": 149.25,
    "er_median": 0.0237,
    "er_n": 20,
    "er_note": "",
    "talent_male_pct": 0.0,
    "top_euphemism": [
     {
      "term": "私处",
      "n": 9
     },
     {
      "term": "经期",
      "n": 9
     },
     {
      "term": "小花园",
      "n": 8
     },
     {
      "term": "经血",
      "n": 5
     },
     {
      "term": "卫生巾",
      "n": 4
     }
    ],
    "style": "卫生巾 占 80.0%；开场多用「场景代入」（70.0%）；主语气「姐妹平视」（70.0%）；讲解主打「肤感气味描述」（95.0%）；说服锚在「安全温和放心」（75.0%）。直白谈私处/月经 80.0%　CTA 覆盖 30.0%　首次出品中位 51.0s。"
   },
   {
    "brand": "FREEMORE/自由点",
    "n": 19,
    "seg": "经期用品",
    "category": [
     {
      "code": "卫生巾",
      "label": "卫生巾",
      "n": 19,
      "pct": 100.0
     }
    ],
    "hook": [
     {
      "code": "scene",
      "label": "场景代入",
      "n": 16,
      "pct": 84.21
     },
     {
      "code": "contrast",
      "label": "对比反差",
      "n": 1,
      "pct": 5.26
     },
     {
      "code": "pain_point",
      "label": "痛点直击",
      "n": 1,
      "pct": 5.26
     }
    ],
    "pain": [
     {
      "code": "stuffy",
      "label": "闷热不透气",
      "n": 18,
      "pct": 94.74
     },
     {
      "code": "itch_private",
      "label": "私处瘙痒",
      "n": 14,
      "pct": 73.68
     },
     {
      "code": "leak",
      "label": "侧漏后漏",
      "n": 11,
      "pct": 57.89
     }
    ],
    "explain": [
     {
      "code": "sensory",
      "label": "肤感气味描述",
      "n": 19,
      "pct": 100.0
     },
     {
      "code": "ingredient",
      "label": "成分讲解",
      "n": 19,
      "pct": 100.0
     },
     {
      "code": "live_demo",
      "label": "现场实测",
      "n": 19,
      "pct": 100.0
     }
    ],
    "persuasion": [
     {
      "code": "safety_assurance",
      "label": "安全温和放心",
      "n": 16,
      "pct": 84.21
     },
     {
      "code": "peer_endorse",
      "label": "姐妹闺蜜认可",
      "n": 15,
      "pct": 78.95
     },
     {
      "code": "efficacy_data",
      "label": "功效数据",
      "n": 14,
      "pct": 73.68
     }
    ],
    "tone": [
     {
      "code": "peer_sister",
      "label": "姐妹平视",
      "n": 17,
      "pct": 89.47
     },
     {
      "code": "teaching",
      "label": "教学讲解",
      "n": 1,
      "pct": 5.26
     }
    ],
    "format": [
     {
      "code": "skit",
      "label": "剧情短片",
      "n": 9,
      "pct": 47.37
     },
     {
      "code": "vlog",
      "label": "生活 vlog",
      "n": 9,
      "pct": 47.37
     }
    ],
    "convenience_pct": 21.05,
    "female_address_pct": 84.21,
    "euphemism_pct": 100.0,
    "taboo_direct_pct": 26.32,
    "price_pct": 15.79,
    "cta_pct": 5.26,
    "compliance_hit_pct": 100.0,
    "first_product_median": 64.0,
    "duration_median": 192.8,
    "er_median": 0.0155,
    "er_n": 19,
    "er_note": "",
    "talent_male_pct": 0.0,
    "top_euphemism": [
     {
      "term": "生理期",
      "n": 5
     },
     {
      "term": "卫生巾",
      "n": 4
     },
     {
      "term": "例假",
      "n": 3
     },
     {
      "term": "那几天",
      "n": 3
     },
     {
      "term": "姨妈",
      "n": 3
     }
    ],
    "style": "卫生巾 占 100.0%；开场多用「场景代入」（84.21%）；主语气「姐妹平视」（89.47%）；讲解主打「肤感气味描述」（100.0%）；说服锚在「安全温和放心」（84.21%）。直白谈私处/月经 26.32%　CTA 覆盖 5.26%　首次出品中位 64.0s。"
   },
   {
    "brand": "SOFY/苏菲",
    "n": 19,
    "seg": "经期用品",
    "category": [
     {
      "code": "卫生巾",
      "label": "卫生巾",
      "n": 19,
      "pct": 100.0
     }
    ],
    "hook": [
     {
      "code": "scene",
      "label": "场景代入",
      "n": 14,
      "pct": 73.68
     },
     {
      "code": "contrast",
      "label": "对比反差",
      "n": 2,
      "pct": 10.53
     },
     {
      "code": "identity",
      "label": "身份认同",
      "n": 1,
      "pct": 5.26
     }
    ],
    "pain": [
     {
      "code": "stuffy",
      "label": "闷热不透气",
      "n": 17,
      "pct": 89.47
     },
     {
      "code": "flow_heavy",
      "label": "量大不够用",
      "n": 16,
      "pct": 84.21
     },
     {
      "code": "damp_sticky",
      "label": "潮湿黏腻",
      "n": 15,
      "pct": 78.95
     }
    ],
    "explain": [
     {
      "code": "live_demo",
      "label": "现场实测",
      "n": 19,
      "pct": 100.0
     },
     {
      "code": "mechanism",
      "label": "作用机理",
      "n": 18,
      "pct": 94.74
     },
     {
      "code": "sensory",
      "label": "肤感气味描述",
      "n": 18,
      "pct": 94.74
     }
    ],
    "persuasion": [
     {
      "code": "peer_endorse",
      "label": "姐妹闺蜜认可",
      "n": 16,
      "pct": 84.21
     },
     {
      "code": "safety_assurance",
      "label": "安全温和放心",
      "n": 13,
      "pct": 68.42
     },
     {
      "code": "efficacy_data",
      "label": "功效数据",
      "n": 8,
      "pct": 42.11
     }
    ],
    "tone": [
     {
      "code": "peer_sister",
      "label": "姐妹平视",
      "n": 14,
      "pct": 73.68
     },
     {
      "code": "emotional",
      "label": "情绪共鸣",
      "n": 4,
      "pct": 21.05
     }
    ],
    "format": [
     {
      "code": "skit",
      "label": "剧情短片",
      "n": 12,
      "pct": 63.16
     },
     {
      "code": "oral_review",
      "label": "口播测评",
      "n": 5,
      "pct": 26.32
     }
    ],
    "convenience_pct": 31.58,
    "female_address_pct": 78.95,
    "euphemism_pct": 100.0,
    "taboo_direct_pct": 89.47,
    "price_pct": 0.0,
    "cta_pct": 15.79,
    "compliance_hit_pct": 15.79,
    "first_product_median": 51.0,
    "duration_median": 129.1,
    "er_median": 0.0439,
    "er_n": 18,
    "er_note": "",
    "talent_male_pct": 0.0,
    "top_euphemism": [
     {
      "term": "血块",
      "n": 15
     },
     {
      "term": "经血",
      "n": 14
     },
     {
      "term": "经期",
      "n": 9
     },
     {
      "term": "月经",
      "n": 6
     },
     {
      "term": "生理期",
      "n": 6
     }
    ],
    "style": "卫生巾 占 100.0%；开场多用「场景代入」（73.68%）；主语气「姐妹平视」（73.68%）；讲解主打「现场实测」（100.0%）；说服锚在「姐妹闺蜜认可」（84.21%）。直白谈私处/月经 89.47%　CTA 覆盖 15.79%　首次出品中位 51.0s。"
   },
   {
    "brand": "洛蕾诗",
    "n": 19,
    "seg": "私处护理",
    "category": [
     {
      "code": "私处洗液",
      "label": "私处洗液",
      "n": 19,
      "pct": 100.0
     }
    ],
    "hook": [
     {
      "code": "scene",
      "label": "场景代入",
      "n": 6,
      "pct": 31.58
     },
     {
      "code": "pain_point",
      "label": "痛点直击",
      "n": 6,
      "pct": 31.58
     },
     {
      "code": "male_voice",
      "label": "男性视角切入",
      "n": 4,
      "pct": 21.05
     }
    ],
    "pain": [
     {
      "code": "odor",
      "label": "异味",
      "n": 15,
      "pct": 78.95
     },
     {
      "code": "wrong_care",
      "label": "清洁方式不对",
      "n": 14,
      "pct": 73.68
     },
     {
      "code": "stuffy",
      "label": "闷热不透气",
      "n": 8,
      "pct": 42.11
     }
    ],
    "explain": [
     {
      "code": "ingredient",
      "label": "成分讲解",
      "n": 18,
      "pct": 94.74
     },
     {
      "code": "sensory",
      "label": "肤感气味描述",
      "n": 18,
      "pct": 94.74
     },
     {
      "code": "mechanism",
      "label": "作用机理",
      "n": 15,
      "pct": 78.95
     }
    ],
    "persuasion": [
     {
      "code": "safety_assurance",
      "label": "安全温和放心",
      "n": 16,
      "pct": 84.21
     },
     {
      "code": "price_value",
      "label": "性价比划算",
      "n": 10,
      "pct": 52.63
     },
     {
      "code": "peer_endorse",
      "label": "姐妹闺蜜认可",
      "n": 10,
      "pct": 52.63
     }
    ],
    "tone": [
     {
      "code": "peer_sister",
      "label": "姐妹平视",
      "n": 14,
      "pct": 73.68
     },
     {
      "code": "teaching",
      "label": "教学讲解",
      "n": 4,
      "pct": 21.05
     }
    ],
    "format": [
     {
      "code": "oral_review",
      "label": "口播测评",
      "n": 19,
      "pct": 100.0
     }
    ],
    "convenience_pct": 21.05,
    "female_address_pct": 89.47,
    "euphemism_pct": 100.0,
    "taboo_direct_pct": 15.79,
    "price_pct": 42.11,
    "cta_pct": 78.95,
    "compliance_hit_pct": 21.05,
    "first_product_median": 2.0,
    "duration_median": 51.6,
    "er_median": 0.0025,
    "er_n": 14,
    "er_note": "",
    "talent_male_pct": 0.0,
    "top_euphemism": [
     {
      "term": "小花园",
      "n": 16
     },
     {
      "term": "那里",
      "n": 6
     },
     {
      "term": "生理期",
      "n": 5
     },
     {
      "term": "姨妈",
      "n": 3
     },
     {
      "term": "那几天",
      "n": 2
     }
    ],
    "style": "私处洗液 占 100.0%；开场多用「场景代入」（31.58%）；主语气「姐妹平视」（73.68%）；讲解主打「成分讲解」（94.74%）；说服锚在「安全温和放心」（84.21%）。直白谈私处/月经 15.79%　CTA 覆盖 78.95%　首次出品中位 2.0s。"
   },
   {
    "brand": "whisper/护舒宝",
    "n": 18,
    "seg": "经期用品",
    "category": [
     {
      "code": "卫生巾",
      "label": "卫生巾",
      "n": 17,
      "pct": 94.44
     },
     {
      "code": "安睡裤",
      "label": "安睡裤",
      "n": 1,
      "pct": 5.56
     }
    ],
    "hook": [
     {
      "code": "scene",
      "label": "场景代入",
      "n": 18,
      "pct": 100.0
     }
    ],
    "pain": [
     {
      "code": "stuffy",
      "label": "闷热不透气",
      "n": 15,
      "pct": 83.33
     },
     {
      "code": "damp_sticky",
      "label": "潮湿黏腻",
      "n": 9,
      "pct": 50.0
     },
     {
      "code": "allergy_sensitive",
      "label": "敏感刺痛过敏",
      "n": 9,
      "pct": 50.0
     }
    ],
    "explain": [
     {
      "code": "sensory",
      "label": "肤感气味描述",
      "n": 18,
      "pct": 100.0
     },
     {
      "code": "material_teardown",
      "label": "拆开看内部结构",
      "n": 11,
      "pct": 61.11
     },
     {
      "code": "live_demo",
      "label": "现场实测",
      "n": 10,
      "pct": 55.56
     }
    ],
    "persuasion": [
     {
      "code": "safety_assurance",
      "label": "安全温和放心",
      "n": 16,
      "pct": 88.89
     },
     {
      "code": "peer_endorse",
      "label": "姐妹闺蜜认可",
      "n": 16,
      "pct": 88.89
     },
     {
      "code": "efficacy_data",
      "label": "功效数据",
      "n": 8,
      "pct": 44.44
     }
    ],
    "tone": [
     {
      "code": "peer_sister",
      "label": "姐妹平视",
      "n": 9,
      "pct": 50.0
     },
     {
      "code": "emotional",
      "label": "情绪共鸣",
      "n": 6,
      "pct": 33.33
     }
    ],
    "format": [
     {
      "code": "skit",
      "label": "剧情短片",
      "n": 12,
      "pct": 66.67
     },
     {
      "code": "vlog",
      "label": "生活 vlog",
      "n": 5,
      "pct": 27.78
     }
    ],
    "convenience_pct": 55.56,
    "female_address_pct": 88.89,
    "euphemism_pct": 88.89,
    "taboo_direct_pct": 66.67,
    "price_pct": 22.22,
    "cta_pct": 11.11,
    "compliance_hit_pct": 27.78,
    "first_product_median": 71.0,
    "duration_median": 226.05,
    "er_median": 0.0413,
    "er_n": 18,
    "er_note": "",
    "talent_male_pct": 0.0,
    "top_euphemism": [
     {
      "term": "月经",
      "n": 6
     },
     {
      "term": "经期",
      "n": 4
     },
     {
      "term": "生理期",
      "n": 3
     },
     {
      "term": "卫生巾",
      "n": 2
     },
     {
      "term": "来月经了",
      "n": 2
     }
    ],
    "style": "卫生巾 占 94.44%；开场多用「场景代入」（100.0%）；主语气「姐妹平视」（50.0%）；讲解主打「肤感气味描述」（100.0%）；说服锚在「安全温和放心」（88.89%）。直白谈私处/月经 66.67%　CTA 覆盖 11.11%　首次出品中位 71.0s。"
   },
   {
    "brand": "妇炎洁",
    "n": 16,
    "seg": "私处护理",
    "category": [
     {
      "code": "私处洗液",
      "label": "私处洗液",
      "n": 14,
      "pct": 87.5
     },
     {
      "code": "护垫",
      "label": "护垫",
      "n": 1,
      "pct": 6.25
     }
    ],
    "hook": [
     {
      "code": "pain_point",
      "label": "痛点直击",
      "n": 7,
      "pct": 43.75
     },
     {
      "code": "scene",
      "label": "场景代入",
      "n": 3,
      "pct": 18.75
     },
     {
      "code": "taboo_break",
      "label": "打破羞耻",
      "n": 2,
      "pct": 12.5
     }
    ],
    "pain": [
     {
      "code": "odor",
      "label": "异味",
      "n": 12,
      "pct": 75.0
     },
     {
      "code": "itch_private",
      "label": "私处瘙痒",
      "n": 10,
      "pct": 62.5
     },
     {
      "code": "flora_imbalance",
      "label": "菌群失衡反复",
      "n": 9,
      "pct": 56.25
     }
    ],
    "explain": [
     {
      "code": "ingredient",
      "label": "成分讲解",
      "n": 16,
      "pct": 100.0
     },
     {
      "code": "sensory",
      "label": "肤感气味描述",
      "n": 15,
      "pct": 93.75
     },
     {
      "code": "usage_steps",
      "label": "使用步骤",
      "n": 11,
      "pct": 68.75
     }
    ],
    "persuasion": [
     {
      "code": "safety_assurance",
      "label": "安全温和放心",
      "n": 15,
      "pct": 93.75
     },
     {
      "code": "peer_endorse",
      "label": "姐妹闺蜜认可",
      "n": 10,
      "pct": 62.5
     },
     {
      "code": "social_proof",
      "label": "销量口碑证明",
      "n": 7,
      "pct": 43.75
     }
    ],
    "tone": [
     {
      "code": "peer_sister",
      "label": "姐妹平视",
      "n": 10,
      "pct": 62.5
     },
     {
      "code": "teaching",
      "label": "教学讲解",
      "n": 6,
      "pct": 37.5
     }
    ],
    "format": [
     {
      "code": "oral_review",
      "label": "口播测评",
      "n": 15,
      "pct": 93.75
     },
     {
      "code": "skit",
      "label": "剧情短片",
      "n": 1,
      "pct": 6.25
     }
    ],
    "convenience_pct": 56.25,
    "female_address_pct": 93.75,
    "euphemism_pct": 100.0,
    "taboo_direct_pct": 56.25,
    "price_pct": 31.25,
    "cta_pct": 50.0,
    "compliance_hit_pct": 93.75,
    "first_product_median": 5.5,
    "duration_median": 51.2,
    "er_median": null,
    "er_n": 7,
    "er_note": "互动率可用样本 <8，不给中位数",
    "talent_male_pct": 0.0,
    "top_euphemism": [
     {
      "term": "小花园",
      "n": 15
     },
     {
      "term": "私处",
      "n": 4
     },
     {
      "term": "分泌物",
      "n": 4
     },
     {
      "term": "那几天",
      "n": 4
     },
     {
      "term": "姨妈",
      "n": 4
     }
    ],
    "style": "私处洗液 占 87.5%；开场多用「痛点直击」（43.75%）；主语气「姐妹平视」（62.5%）；讲解主打「成分讲解」（100.0%）；说服锚在「安全温和放心」（93.75%）。直白谈私处/月经 56.25%　CTA 覆盖 50.0%　首次出品中位 5.5s。"
   }
  ],
  "insufficient": [
   {
    "brand": "朵薇",
    "n": 5,
    "seg": "经期用品",
    "note": "样本不足（n<12），只报 n、不做解读"
   }
  ],
  "not_yet_annotated": [],
  "n_brands": 7,
  "n_brands_expected": 8,
  "style_note": "品牌风格一句话由脚本按该品牌实际的 TOP1 品类/钩子/语气/讲解/说服自动拼装，不是人工点评，重跑后自动跟随数据变化。",
  "caveat": "品牌画像基于该品牌**订单应收金额 TOP20** 的抽样子集（每品牌 20 条），不是该品牌全部星图视频：她研社（窗口内 851 条）、自由点（493 条）、妇炎洁（440 条）这类高密度投放品牌，TOP20 只覆盖其投放金额的 38%~65%，**品牌之间只可比结构、不可比条数，也不可比互动率绝对水平**。"
 },
 "F_compliance": {
  "n_annotated": 136,
  "n_videos_hit": 69,
  "videos_hit_pct": 50.74,
  "n_term_hits": 94,
  "split": {
   "suspect_violation": {
    "n_terms": 17,
    "n_videos": 15,
    "pct_videos": 11.03,
    "label": "疑似违规（医疗宣称 / 无依据功效 / 绝对化用语等）"
   },
   "cert_check": {
    "n_terms": 77,
    "n_videos": 62,
    "pct_videos": 45.59,
    "label": "需资质核查（抑菌·杀菌宣称需消毒产品资质；械字号/医用级需医疗器械资质）",
    "note": "**抑菌/杀菌宣称本身不等于违规**：若产品持有消毒产品卫生许可（消字号）即可宣称，问题在于「有没有对应资质」与「宣称是否超出资质范围」，所以单列一类、不计入违规数。"
   }
  },
  "by_type": [
   {
    "code": "disinfect_cert",
    "label": "抑菌杀菌·需消毒资质",
    "n_terms": 77,
    "n_videos": 62,
    "bucket": "需资质核查"
   },
   {
    "code": "medical_claim",
    "label": "医疗宣称",
    "n_terms": 9,
    "n_videos": 7,
    "bucket": "疑似违规"
   },
   {
    "code": "absolute",
    "label": "绝对化用语",
    "n_terms": 7,
    "n_videos": 7,
    "bucket": "疑似违规"
   },
   {
    "code": "other",
    "label": "其他",
    "n_terms": 1,
    "n_videos": 1,
    "bucket": "疑似违规"
   }
  ],
  "by_brand": [
   {
    "brand": "妇炎洁",
    "n_videos_hit": 15,
    "n_terms": 24,
    "n_sampled": 16,
    "hit_pct": 93.75,
    "note": ""
   },
   {
    "brand": "FREEMORE/自由点",
    "n_videos_hit": 19,
    "n_terms": 21,
    "n_sampled": 19,
    "hit_pct": 100.0,
    "note": ""
   },
   {
    "brand": "Herlab/她研社",
    "n_videos_hit": 12,
    "n_terms": 19,
    "n_sampled": 20,
    "hit_pct": 60.0,
    "note": ""
   },
   {
    "brand": "INTIMA/茵缇玛",
    "n_videos_hit": 9,
    "n_terms": 11,
    "n_sampled": 20,
    "hit_pct": 45.0,
    "note": ""
   },
   {
    "brand": "洛蕾诗",
    "n_videos_hit": 4,
    "n_terms": 6,
    "n_sampled": 19,
    "hit_pct": 21.05,
    "note": ""
   },
   {
    "brand": "whisper/护舒宝",
    "n_videos_hit": 5,
    "n_terms": 5,
    "n_sampled": 18,
    "hit_pct": 27.78,
    "note": ""
   },
   {
    "brand": "SOFY/苏菲",
    "n_videos_hit": 3,
    "n_terms": 4,
    "n_sampled": 19,
    "hit_pct": 15.79,
    "note": ""
   },
   {
    "brand": "朵薇",
    "n_videos_hit": 2,
    "n_terms": 4,
    "n_sampled": 5,
    "hit_pct": 40.0,
    "note": "样本不足（n<12），只报 n"
   }
  ],
  "term_top": [
   {
    "term": "抑菌",
    "n": 12,
    "type": "抑菌杀菌·需消毒资质",
    "n_videos": 12
   },
   {
    "term": "抑菌率99.9%",
    "n": 4,
    "type": "抑菌杀菌·需消毒资质",
    "n_videos": 4
   },
   {
    "term": "抑霉菌",
    "n": 4,
    "type": "抑菌杀菌·需消毒资质",
    "n_videos": 4
   },
   {
    "term": "抑制霉菌",
    "n": 4,
    "type": "抑菌杀菌·需消毒资质",
    "n_videos": 4
   },
   {
    "term": "抑制99.9%的坏菌",
    "n": 3,
    "type": "抑菌杀菌·需消毒资质",
    "n_videos": 3
   },
   {
    "term": "弱酸抑菌",
    "n": 3,
    "type": "抑菌杀菌·需消毒资质",
    "n_videos": 3
   },
   {
    "term": "销量第一",
    "n": 2,
    "type": "绝对化用语",
    "n_videos": 2
   },
   {
    "term": "抑菌率有99.9%",
    "n": 2,
    "type": "抑菌杀菌·需消毒资质",
    "n_videos": 2
   },
   {
    "term": "抑制坏菌",
    "n": 2,
    "type": "抑菌杀菌·需消毒资质",
    "n_videos": 2
   },
   {
    "term": "物理隔菌",
    "n": 2,
    "type": "抑菌杀菌·需消毒资质",
    "n_videos": 2
   },
   {
    "term": "抑菌洗液",
    "n": 2,
    "type": "抑菌杀菌·需消毒资质",
    "n_videos": 2
   },
   {
    "term": "抑菌率高达99.9%",
    "n": 2,
    "type": "抑菌杀菌·需消毒资质",
    "n_videos": 2
   },
   {
    "term": "无法替代",
    "n": 1,
    "type": "绝对化用语",
    "n_videos": 1
   },
   {
    "term": "第一",
    "n": 1,
    "type": "绝对化用语",
    "n_videos": 1
   },
   {
    "term": "销售额是第一的",
    "n": 1,
    "type": "绝对化用语",
    "n_videos": 1
   },
   {
    "term": "完全不会反渗",
    "n": 1,
    "type": "绝对化用语",
    "n_videos": 1
   },
   {
    "term": "秒吸",
    "n": 1,
    "type": "绝对化用语",
    "n_videos": 1
   },
   {
    "term": "不舒服的感觉真好不少",
    "n": 1,
    "type": "医疗宣称",
    "n_videos": 1
   },
   {
    "term": "抗炎",
    "n": 1,
    "type": "医疗宣称",
    "n_videos": 1
   },
   {
    "term": "转阴",
    "n": 1,
    "type": "医疗宣称",
    "n_videos": 1
   },
   {
    "term": "霉菌就好了",
    "n": 1,
    "type": "医疗宣称",
    "n_videos": 1
   },
   {
    "term": "抑制白色念珠菌",
    "n": 1,
    "type": "医疗宣称",
    "n_videos": 1
   },
   {
    "term": "白色念珠菌",
    "n": 1,
    "type": "医疗宣称",
    "n_videos": 1
   },
   {
    "term": "调节经期的不适",
    "n": 1,
    "type": "医疗宣称",
    "n_videos": 1
   },
   {
    "term": "祛黑点点",
    "n": 1,
    "type": "医疗宣称",
    "n_videos": 1
   }
  ],
  "rows": [
   {
    "aweme_id": "7665995763431869696",
    "brand": "Herlab/她研社",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "无法替代",
    "quote": "这种安全感啊是其他东西都无法替代的",
    "sec": 105.4,
    "type": "absolute",
    "type_cn": "绝对化用语",
    "auto_bucket": "suspect_violation",
    "auto_bucket_cn": "疑似违规",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7665995763431869696",
    "verdict": "false_positive",
    "verdict_cn": "误报",
    "note": "“安全感无法替代”是主观感受修辞，非最高等级用语，无性能承诺"
   },
   {
    "aweme_id": "7675321149040338853",
    "brand": "INTIMA/茵缇玛",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "第一",
    "quote": "女性私密护理法国销量第一",
    "sec": 192.0,
    "type": "absolute",
    "type_cn": "绝对化用语",
    "auto_bucket": "suspect_violation",
    "auto_bucket_cn": "疑似违规",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7675321149040338853",
    "verdict": "violation",
    "verdict_cn": "真违规",
    "note": "口播“法国销量第一”，片内未标数据来源与统计口径，绝对化用语"
   },
   {
    "aweme_id": "7657156501698479542",
    "brand": "INTIMA/茵缇玛",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "销量第一",
    "quote": "女性私密护理法国销量第一",
    "sec": 113.8,
    "type": "absolute",
    "type_cn": "绝对化用语",
    "auto_bucket": "suspect_violation",
    "auto_bucket_cn": "疑似违规",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7657156501698479542",
    "verdict": "violation",
    "verdict_cn": "真违规",
    "note": "“销量第一”未标明出处与统计口径，构成绝对化用语违规"
   },
   {
    "aweme_id": "7676376803201024762",
    "brand": "INTIMA/茵缇玛",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "销量第一",
    "quote": "人家这还是在法国销量第一",
    "sec": 52.0,
    "type": "absolute",
    "type_cn": "绝对化用语",
    "auto_bucket": "suspect_violation",
    "auto_bucket_cn": "疑似违规",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7676376803201024762",
    "verdict": "violation",
    "verdict_cn": "真违规",
    "note": "“法国销量第一”无来源与口径，属绝对化用语"
   },
   {
    "aweme_id": "7669653515257928357",
    "brand": "INTIMA/茵缇玛",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "销售额是第一的",
    "quote": "销售额是第一的",
    "sec": 44.0,
    "type": "absolute",
    "type_cn": "绝对化用语",
    "auto_bucket": "suspect_violation",
    "auto_bucket_cn": "疑似违规",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7669653515257928357",
    "verdict": "violation",
    "verdict_cn": "真违规",
    "note": "“销售额第一”无第三方来源与口径，属绝对化用语"
   },
   {
    "aweme_id": "7679784024597101156",
    "brand": "SOFY/苏菲",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "完全不会反渗",
    "quote": "完全不会反渗到这个表面",
    "sec": 127.9,
    "type": "absolute",
    "type_cn": "绝对化用语",
    "auto_bucket": "suspect_violation",
    "auto_bucket_cn": "疑似违规",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7679784024597101156",
    "verdict": "grey",
    "verdict_cn": "灰区 · 需品牌提供依据",
    "note": "“完全不会反渗”为绝对化性能承诺，需回渗量检测数据支撑"
   },
   {
    "aweme_id": "7660480255639351923",
    "brand": "SOFY/苏菲",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "秒吸",
    "quote": "秒吸血块",
    "sec": 24.0,
    "type": "absolute",
    "type_cn": "绝对化用语",
    "auto_bucket": "suspect_violation",
    "auto_bucket_cn": "疑似违规",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7660480255639351923",
    "verdict": "false_positive",
    "verdict_cn": "误报",
    "note": "“秒吸”是吸收快的口语修辞，属合规卖点表述"
   },
   {
    "aweme_id": "7666341052806089993",
    "brand": "FREEMORE/自由点",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "不舒服的感觉真好不少",
    "quote": "用了它不舒服的感觉真好不少",
    "sec": 45.0,
    "type": "medical_claim",
    "type_cn": "医疗宣称",
    "auto_bucket": "suspect_violation",
    "auto_bucket_cn": "疑似违规",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7666341052806089993",
    "verdict": "false_positive",
    "verdict_cn": "误报",
    "note": "主观体感改善描述，未指向疾病或治疗，属合规"
   },
   {
    "aweme_id": "7678780829850893668",
    "brand": "INTIMA/茵缇玛",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "抗炎",
    "quote": "还有那个抗炎的食物",
    "sec": 49.0,
    "type": "medical_claim",
    "type_cn": "医疗宣称",
    "auto_bucket": "suspect_violation",
    "auto_bucket_cn": "疑似违规",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7678780829850893668",
    "verdict": "false_positive",
    "verdict_cn": "误报",
    "note": "“抗炎的食物”指饮食，不是对本产品的功效宣称"
   },
   {
    "aweme_id": "7678780829850893668",
    "brand": "INTIMA/茵缇玛",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "转阴",
    "quote": "整个HPV转阴的过程",
    "sec": 44.0,
    "type": "medical_claim",
    "type_cn": "医疗宣称",
    "auto_bucket": "suspect_violation",
    "auto_bucket_cn": "疑似违规",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7678780829850893668",
    "verdict": "violation",
    "verdict_cn": "真违规",
    "note": "以本人HPV转阴经历导入洗液，化妆品暗示医疗作用"
   },
   {
    "aweme_id": "7658147196562848698",
    "brand": "妇炎洁",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "霉菌就好了",
    "quote": "特别是我用了一次之后，霉菌就好了",
    "sec": 59.0,
    "type": "medical_claim",
    "type_cn": "医疗宣称",
    "auto_bucket": "suspect_violation",
    "auto_bucket_cn": "疑似违规",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7658147196562848698",
    "verdict": "violation",
    "verdict_cn": "真违规",
    "note": "宣称“用了一次霉菌就好了”，属疾病治疗宣称，明确违规"
   },
   {
    "aweme_id": "7660516815877097954",
    "brand": "妇炎洁",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "抑制白色念珠菌",
    "quote": "专业抑制白色念珠菌的生长",
    "sec": 39.0,
    "type": "medical_claim",
    "type_cn": "医疗宣称",
    "auto_bucket": "suspect_violation",
    "auto_bucket_cn": "疑似违规",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7660516815877097954",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "外部信息：妇炎洁抑菌洗液为消字号，抑制白念在批准范围，需核SKU"
   },
   {
    "aweme_id": "7659435495357261940",
    "brand": "妇炎洁",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "白色念珠菌",
    "quote": "那一定是白色念珠菌在作祟",
    "sec": 8.0,
    "type": "medical_claim",
    "type_cn": "医疗宣称",
    "auto_bucket": "suspect_violation",
    "auto_bucket_cn": "疑似违规",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7659435495357261940",
    "verdict": "false_positive",
    "verdict_cn": "误报",
    "note": "开场科普瘙痒成因的困扰描述，非产品功效宣称"
   },
   {
    "aweme_id": "7662694680013868322",
    "brand": "朵薇",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "调节经期的不适",
    "quote": "调节经期的不适",
    "sec": 148.8,
    "type": "medical_claim",
    "type_cn": "医疗宣称",
    "auto_bucket": "suspect_violation",
    "auto_bucket_cn": "疑似违规",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7662694680013868322",
    "verdict": "violation",
    "verdict_cn": "真违规",
    "note": "卫生巾称芍药精华可调节经期不适，属调节生理机能的无依据功效"
   },
   {
    "aweme_id": "7660049349133323635",
    "brand": "朵薇",
    "seg": "经期用品",
    "category": "其他",
    "term": "祛黑点点",
    "quote": "真的有祛黑点点效果",
    "sec": 52.0,
    "type": "medical_claim",
    "type_cn": "医疗宣称",
    "auto_bucket": "suspect_violation",
    "auto_bucket_cn": "疑似违规",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7660049349133323635",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "同片美白霜的淡斑宣称，需核祛斑美白特证与功效评价，非卫生巾宣称"
   },
   {
    "aweme_id": "7660049349133323635",
    "brand": "朵薇",
    "seg": "经期用品",
    "category": "其他",
    "term": "祛斑",
    "quote": "祛斑效果",
    "sec": 51.0,
    "type": "medical_claim",
    "type_cn": "医疗宣称",
    "auto_bucket": "suspect_violation",
    "auto_bucket_cn": "疑似违规",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7660049349133323635",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "该片实际主推面部美白霜；祛斑属特殊化妆品，需核注册证与功效评价"
   },
   {
    "aweme_id": "7657460881579724083",
    "brand": "妇炎洁",
    "seg": "私处护理",
    "category": "护垫",
    "term": "透皮吸收",
    "quote": "通过透皮吸收的方式来养护你的小花园",
    "sec": 66.0,
    "type": "other",
    "type_cn": "其他",
    "auto_bucket": "suspect_violation",
    "auto_bucket_cn": "疑似违规",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7657460881579724083",
    "verdict": "violation",
    "verdict_cn": "真违规",
    "note": "护垫称本草“透皮吸收”养护私处，卫生用品无依据药理宣称"
   },
   {
    "aweme_id": "7663072664336080763",
    "brand": "FREEMORE/自由点",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "抑制99.9%的有害菌",
    "quote": "真的能抑制99.9%的有害菌",
    "sec": 339.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7663072664336080763",
    "verdict": "grey",
    "verdict_cn": "灰区 · 需品牌提供依据",
    "note": "外部信息品牌公开抑菌率为99%，片中99.9%需检测报告"
   },
   {
    "aweme_id": "7675605946479156810",
    "brand": "FREEMORE/自由点",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "抑菌率99.9%",
    "quote": "这种抑菌率99.9%的的确更安心啊",
    "sec": 177.2,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7675605946479156810",
    "verdict": "grey",
    "verdict_cn": "灰区 · 需品牌提供依据",
    "note": "外部信息品牌公开抑菌率为99%，99.9%数值需检测报告"
   },
   {
    "aweme_id": "7666792427952506228",
    "brand": "FREEMORE/自由点",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "抑制99.9%的坏菌",
    "quote": "这里面的益生菌可以抑制99.9%的坏菌呢",
    "sec": 134.9,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7666792427952506228",
    "verdict": "grey",
    "verdict_cn": "灰区 · 需品牌提供依据",
    "note": "“抑制99.9%坏菌”高于品牌公开99%口径，需检测报告"
   },
   {
    "aweme_id": "7665594191926568113",
    "brand": "FREEMORE/自由点",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "抑制99.9%的坏菌",
    "quote": "这益生菌能抑制99.9%的坏菌",
    "sec": 132.9,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7665594191926568113",
    "verdict": "grey",
    "verdict_cn": "灰区 · 需品牌提供依据",
    "note": "“抑制99.9%坏菌”高于品牌公开99%口径，需检测报告"
   },
   {
    "aweme_id": "7675760787982324203",
    "brand": "FREEMORE/自由点",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "灭活益生菌",
    "quote": "我就能感受到它灭活益生菌的威力了",
    "sec": 121.8,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7675760787982324203",
    "verdict": "false_positive",
    "verdict_cn": "误报",
    "note": "“灭活益生菌”是成分名称，不构成抑菌功效宣称"
   },
   {
    "aweme_id": "7675992334319783206",
    "brand": "FREEMORE/自由点",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "专利益生菌",
    "quote": "这里面加的可是专利益生菌",
    "sec": 121.8,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7675992334319783206",
    "verdict": "false_positive",
    "verdict_cn": "误报",
    "note": "“专利益生菌”属成分与专利出示，是合规依据非风险"
   },
   {
    "aweme_id": "7668998844704640283",
    "brand": "FREEMORE/自由点",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "抑菌率有99.9%",
    "quote": "抑菌率有99.9%",
    "sec": 118.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7668998844704640283",
    "verdict": "grey",
    "verdict_cn": "灰区 · 需品牌提供依据",
    "note": "外部信息品牌公开为99%，口播99.9%需检测报告佐证"
   },
   {
    "aweme_id": "7673788834546453802",
    "brand": "FREEMORE/自由点",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "抑菌率99.9%",
    "quote": "抑菌率99.9%",
    "sec": 108.9,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7673788834546453802",
    "verdict": "grey",
    "verdict_cn": "灰区 · 需品牌提供依据",
    "note": "外部信息品牌公开为99%，口播99.9%需检测报告佐证"
   },
   {
    "aweme_id": "7657475425233356913",
    "brand": "FREEMORE/自由点",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "抑菌率百分之99.9%",
    "quote": "抑菌率百分之99.9%呢",
    "sec": 108.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7657475425233356913",
    "verdict": "grey",
    "verdict_cn": "灰区 · 需品牌提供依据",
    "note": "外部信息品牌公开为99%，口播99.9%需检测报告佐证"
   },
   {
    "aweme_id": "7662617614162512625",
    "brand": "FREEMORE/自由点",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "抑菌率有99.9%",
    "quote": "抑菌率有99.9%",
    "sec": 104.4,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7662617614162512625",
    "verdict": "grey",
    "verdict_cn": "灰区 · 需品牌提供依据",
    "note": "外部信息品牌公开为99%，口播99.9%需检测报告佐证"
   },
   {
    "aweme_id": "7674169817846530233",
    "brand": "FREEMORE/自由点",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "抑制坏菌",
    "quote": "抑制坏菌的同时帮忙养好菌",
    "sec": 103.4,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7674169817846530233",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "卫生巾抑菌宣称须有抗（抑）菌卫生用品检测与备案，需核证"
   },
   {
    "aweme_id": "7662649276946322019",
    "brand": "FREEMORE/自由点",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "抑制99.9%坏菌",
    "quote": "贴片字幕：不仅抑制99.9%坏菌，还能养好菌",
    "sec": 103.2,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7662649276946322019",
    "verdict": "grey",
    "verdict_cn": "灰区 · 需品牌提供依据",
    "note": "字幕“抑制99.9%坏菌”高于品牌公开99%，需检测报告"
   },
   {
    "aweme_id": "7659313939465857930",
    "brand": "FREEMORE/自由点",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "抑菌率有99%",
    "quote": "抑菌率有99%呢",
    "sec": 102.4,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7659313939465857930",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "99%与品牌公开检测口径一致，仅需核对抗抑菌备案资质"
   },
   {
    "aweme_id": "7663027472476212518",
    "brand": "FREEMORE/自由点",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "99.9%的抑菌率",
    "quote": "这个专利益生菌有99.9%的抑菌率呢",
    "sec": 101.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7663027472476212518",
    "verdict": "grey",
    "verdict_cn": "灰区 · 需品牌提供依据",
    "note": "“99.9%的抑菌率”高于品牌公开99%口径，需检测报告"
   },
   {
    "aweme_id": "7674169817846530233",
    "brand": "FREEMORE/自由点",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "益生菌卫生巾",
    "quote": "你试试这个自由点益生菌卫生巾",
    "sec": 85.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7674169817846530233",
    "verdict": "false_positive",
    "verdict_cn": "误报",
    "note": "“益生菌卫生巾”是产品品名与成分，非抑菌功效宣称"
   },
   {
    "aweme_id": "7661175509104164529",
    "brand": "FREEMORE/自由点",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "抑菌率99.9%",
    "quote": "咱这益生菌，抑菌率99.9%",
    "sec": 73.7,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7661175509104164529",
    "verdict": "grey",
    "verdict_cn": "灰区 · 需品牌提供依据",
    "note": "外部信息品牌公开为99%，口播99.9%需检测报告佐证"
   },
   {
    "aweme_id": "7673403138720017061",
    "brand": "FREEMORE/自由点",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "把坏菌赶出去，好菌补进来",
    "quote": "能把坏菌赶出去，好菌补进来",
    "sec": 63.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7673403138720017061",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "口语化抑菌宣称，需抗（抑）菌检测与备案支撑，需核证"
   },
   {
    "aweme_id": "7663373453726443962",
    "brand": "FREEMORE/自由点",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "抑菌率可以达到99.9%",
    "quote": "而且它的抑菌率可以达到99.9%",
    "sec": 55.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7663373453726443962",
    "verdict": "grey",
    "verdict_cn": "灰区 · 需品牌提供依据",
    "note": "“抑菌率可以达到99.9%”高于品牌公开99%，需检测报告"
   },
   {
    "aweme_id": "7666341052806089993",
    "brand": "FREEMORE/自由点",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "抑制坏菌",
    "quote": "能抑制坏菌，还能养好菌",
    "sec": 43.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7666341052806089993",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "“抑制坏菌”属抑菌宣称，需抗（抑）菌检测与备案，需核证"
   },
   {
    "aweme_id": "7662649677767027956",
    "brand": "FREEMORE/自由点",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "抑制99.9%的坏菌",
    "quote": "抑制99.9%的坏菌",
    "sec": 28.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7662649677767027956",
    "verdict": "grey",
    "verdict_cn": "灰区 · 需品牌提供依据",
    "note": "“抑制99.9%的坏菌”高于品牌公开99%口径，需检测报告"
   },
   {
    "aweme_id": "7671261784309207726",
    "brand": "Herlab/她研社",
    "seg": "经期用品",
    "category": "私处洗液",
    "term": "99.9%的有害菌",
    "quote": "可以温和洗去99.9%的有害菌",
    "sec": 167.6,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7671261784309207726",
    "verdict": "grey",
    "verdict_cn": "灰区 · 需品牌提供依据",
    "note": "外部信息未见该洗液消字号，量化洗菌宣称需功效评价数据支撑"
   },
   {
    "aweme_id": "7660396801582092198",
    "brand": "Herlab/她研社",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "弱酸抑菌",
    "quote": "画面贴片显示“弱酸抑菌6包”",
    "sec": 166.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7660396801582092198",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "贴片“弱酸抑菌”属抑菌宣称，需抗（抑）菌卫生用品检测与备案"
   },
   {
    "aweme_id": "7675667389816234118",
    "brand": "Herlab/她研社",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "抑制有害菌的滋生",
    "quote": "可以抑制有害菌的滋生",
    "sec": 126.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7675667389816234118",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "卫生巾抑菌宣称，需抗（抑）菌卫生用品检测与备案核对"
   },
   {
    "aweme_id": "7672974367499787234",
    "brand": "Herlab/她研社",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "赶跑有害菌",
    "quote": "就可以帮我们赶跑有害菌",
    "sec": 111.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7672974367499787234",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "“赶跑有害菌”为抑菌宣称的口语版，需抑菌检测与备案"
   },
   {
    "aweme_id": "7675667389816234118",
    "brand": "Herlab/她研社",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "抑菌",
    "quote": "【新品】她研社菌引力抑菌卫生巾",
    "sec": 102.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7675667389816234118",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "品名含“抑菌”，须有抗（抑）菌卫生用品备案与检测支撑"
   },
   {
    "aweme_id": "7660784567587078011",
    "brand": "Herlab/她研社",
    "seg": "经期用品",
    "category": "私处洗液",
    "term": "洗去99%的有害菌",
    "quote": "能温和的洗去99%的有害菌",
    "sec": 79.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7660784567587078011",
    "verdict": "grey",
    "verdict_cn": "灰区 · 需品牌提供依据",
    "note": "洗液非消字号（外部信息），量化洗去有害菌需功效评价报告"
   },
   {
    "aweme_id": "7665995763431869696",
    "brand": "Herlab/她研社",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "抑菌效果",
    "quote": "它的抑菌效果真的是肉眼可见的",
    "sec": 77.4,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7665995763431869696",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "已出示盖章检测报告，仍需核对抗（抑）菌卫生用品备案资质"
   },
   {
    "aweme_id": "7672607336002899251",
    "brand": "Herlab/她研社",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "抑菌",
    "quote": "选这种弱酸抑菌的就行了",
    "sec": 69.2,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7672607336002899251",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "“弱酸抑菌”属抑菌宣称，第三方实验非资质，需核备案"
   },
   {
    "aweme_id": "7676042983111773480",
    "brand": "Herlab/她研社",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "弱酸抑菌",
    "quote": "弱酸抑菌守护经期健康",
    "sec": 64.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7676042983111773480",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "“弱酸抑菌”属抑菌宣称，外部信息有第三方抑菌实验，需核备案"
   },
   {
    "aweme_id": "7665995763431869696",
    "brand": "Herlab/她研社",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "有效地抑菌",
    "quote": "能够温和有效地抑菌",
    "sec": 62.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7665995763431869696",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "“温和有效地抑菌”属抑菌宣称，需抗（抑）菌检测与备案核对"
   },
   {
    "aweme_id": "7673476474577938277",
    "brand": "Herlab/她研社",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "抑菌",
    "quote": "用的是抑菌的弱酸面层",
    "sec": 59.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7673476474577938277",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "“抑菌的弱酸面层”属抑菌宣称，需抗（抑）菌检测与备案核对"
   },
   {
    "aweme_id": "7665995763431869696",
    "brand": "Herlab/她研社",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "抑菌",
    "quote": "升级了这种弱酸抑菌的卫生巾",
    "sec": 51.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7665995763431869696",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "“弱酸抑菌卫生巾”属抑菌宣称，需抗（抑）菌检测与备案核对"
   },
   {
    "aweme_id": "7676042983111773480",
    "brand": "Herlab/她研社",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "较强抑制作用",
    "quote": "其产品对常见有害菌具备较强抑制作用",
    "sec": 51.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7676042983111773480",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "引用检测结论的抑菌表述，需核对报告与抗抑菌备案"
   },
   {
    "aweme_id": "7658168760885664442",
    "brand": "Herlab/她研社",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "抑菌",
    "quote": "能温和抑菌",
    "sec": 47.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7658168760885664442",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "“温和抑菌”属抑菌宣称，需抗（抑）菌检测与备案核对"
   },
   {
    "aweme_id": "7660396801582092198",
    "brand": "Herlab/她研社",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "抑菌",
    "quote": "不仅可以有效且温和的抑菌",
    "sec": 43.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7660396801582092198",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "“有效且温和的抑菌”属抑菌宣称，需抗（抑）菌检测与备案核对"
   },
   {
    "aweme_id": "7660081809182950117",
    "brand": "Herlab/她研社",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "抑菌效果肉眼可见",
    "quote": "检测报告也证实了抑菌效果肉眼可见",
    "sec": 41.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7660081809182950117",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "已出示检测报告，仍需核对抗（抑）菌卫生用品备案"
   },
   {
    "aweme_id": "7677506298925026610",
    "brand": "Herlab/她研社",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "抑菌的功效",
    "quote": "而且它有抑菌的功效",
    "sec": 31.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7677506298925026610",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "“抑菌的功效”属抑菌宣称，需检测与抗抑菌备案核对"
   },
   {
    "aweme_id": "7660081809182950117",
    "brand": "Herlab/她研社",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "弱酸抑菌",
    "quote": "现在居然都有了弱酸抑菌款",
    "sec": 28.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7660081809182950117",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "“弱酸抑菌”属抑菌宣称，需第三方检测与备案核对"
   },
   {
    "aweme_id": "7671192758421294068",
    "brand": "INTIMA/茵缇玛",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "菌群",
    "quote": "也不会破坏菌群的环境",
    "sec": 94.5,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7671192758421294068",
    "verdict": "false_positive",
    "verdict_cn": "误报",
    "note": "“不会破坏菌群”是温和性描述，属合规白名单表述"
   },
   {
    "aweme_id": "7678780829850893668",
    "brand": "INTIMA/茵缇玛",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "菌菌",
    "quote": "血块那个菌菌",
    "sec": 89.5,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7678780829850893668",
    "verdict": "false_positive",
    "verdict_cn": "误报",
    "note": "“血块那个菌菌”是经期困扰描述，非抑菌功效宣称"
   },
   {
    "aweme_id": "7675654633432164849",
    "brand": "INTIMA/茵缇玛",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "洗菌率高达99.9%",
    "quote": "而且它那个洗菌率是能高达99.9%的",
    "sec": 43.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7675654633432164849",
    "verdict": "grey",
    "verdict_cn": "灰区 · 需品牌提供依据",
    "note": "外部信息该品在华按普通化妆品备案，量化洗菌率需功效检测"
   },
   {
    "aweme_id": "7675654895919579633",
    "brand": "INTIMA/茵缇玛",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "洗菌率能做到99.9%",
    "quote": "它洗菌率能做到99.9%",
    "sec": 38.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7675654895919579633",
    "verdict": "grey",
    "verdict_cn": "灰区 · 需品牌提供依据",
    "note": "普通化妆品的量化“洗菌率99.9%”需清洁功效检测报告"
   },
   {
    "aweme_id": "7669389996537337595",
    "brand": "INTIMA/茵缇玛",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "洗菌率是高达99.9%",
    "quote": "它的洗菌率是高达99.9%的",
    "sec": 25.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7669389996537337595",
    "verdict": "grey",
    "verdict_cn": "灰区 · 需品牌提供依据",
    "note": "普通化妆品的量化“洗菌率99.9%”需清洁功效检测报告"
   },
   {
    "aweme_id": "7679784024597101156",
    "brand": "SOFY/苏菲",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "抑菌的层面",
    "quote": "包括表面用的就都还是抑菌的层面",
    "sec": 147.9,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7679784024597101156",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "“抑菌面层”属抑菌宣称，需抗（抑）菌检测与备案核对"
   },
   {
    "aweme_id": "7679065543450735311",
    "brand": "SOFY/苏菲",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "不滋生菌菌",
    "quote": "牢牢粘住不会松散，还不容易滋生菌菌",
    "sec": 84.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7679065543450735311",
    "verdict": "false_positive",
    "verdict_cn": "误报",
    "note": "说的是用后卷贴丢弃不易滋菌，非抑菌功效宣称"
   },
   {
    "aweme_id": "7671656414365342193",
    "brand": "whisper/护舒宝",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "物理隔绝95%以上经血细菌",
    "quote": "实验室实测的，能物理隔绝95%以上经血细菌",
    "sec": 195.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7671656414365342193",
    "verdict": "false_positive",
    "verdict_cn": "误报",
    "note": "物理阻隔非抑菌宣称，数值与品牌公开口径一致且口播标明实验室实测"
   },
   {
    "aweme_id": "7677913965553360768",
    "brand": "whisper/护舒宝",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "物理隔菌",
    "quote": "得用这种95%+物理隔菌才健康",
    "sec": 184.9,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7677913965553360768",
    "verdict": "grey",
    "verdict_cn": "灰区 · 需品牌提供依据",
    "note": "“95%+物理隔菌才健康”省略实验室与模拟经血限定，需标注口径出处"
   },
   {
    "aweme_id": "7667905635119287571",
    "brand": "whisper/护舒宝",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "隔离95%以上的经血细菌",
    "quote": "物理隔离95%以上的经血细菌",
    "sec": 176.8,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7667905635119287571",
    "verdict": "false_positive",
    "verdict_cn": "误报",
    "note": "物理隔菌非抑菌宣称，与品牌口径一致且同屏展示实验室实测报告"
   },
   {
    "aweme_id": "7665725527747084660",
    "brand": "whisper/护舒宝",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "物理隔菌",
    "quote": "实测了95%+物理隔菌",
    "sec": 118.7,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7665725527747084660",
    "verdict": "false_positive",
    "verdict_cn": "误报",
    "note": "“实测了95%+物理隔菌”与品牌公开口径一致，属物理阻隔非抑菌"
   },
   {
    "aweme_id": "7667905991882919266",
    "brand": "whisper/护舒宝",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "抑菌",
    "quote": "它还自带抑菌功能",
    "sec": 89.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7667905991882919266",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "卫生巾抑菌宣称需抗（抑）菌检测备案；品牌主线为物理隔菌，需核该款"
   },
   {
    "aweme_id": "7660465021512691365",
    "brand": "妇炎洁",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "抑菌",
    "quote": "抑菌、舒适",
    "sec": 57.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7660465021512691365",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "外部信息该品牌洗液为消字号，抑菌宣称需核对该SKU持证"
   },
   {
    "aweme_id": "7658147196562848698",
    "brand": "妇炎洁",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "抑菌洗液",
    "quote": "我买的妇炎洁洗液，画面显示抑菌洗液",
    "sec": 50.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7658147196562848698",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "包装品名“抑菌洗液”，消字号前提下合法，需核该SKU持证"
   },
   {
    "aweme_id": "7660465021512691365",
    "brand": "妇炎洁",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "抑菌慕斯",
    "quote": "画面包装显示：抑菌慕斯",
    "sec": 44.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7660465021512691365",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "包装“抑菌慕斯”，消字号前提下合法，需核该SKU持证"
   },
   {
    "aweme_id": "7659816863844809955",
    "brand": "妇炎洁",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "抑菌洗液",
    "quote": "画面展示产品包装名称：雪莲抑菌洗液",
    "sec": 33.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7659816863844809955",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "包装“雪莲抑菌洗液”，消字号前提下合法，需核持证"
   },
   {
    "aweme_id": "7659307420108509007",
    "brand": "妇炎洁",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "99.9%",
    "quote": "抑制白色念珠菌等发病率高达99%以上",
    "sec": 32.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7659307420108509007",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "包装抑菌数据宣称，需核检测范围；口播表述含混需复听"
   },
   {
    "aweme_id": "7657790472660224207",
    "brand": "妇炎洁",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "抑菌",
    "quote": "雪莲抑菌泡沫慕斯",
    "sec": 31.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7657790472660224207",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "包装“雪莲抑菌泡沫慕斯”，消字号前提下合法，需核持证"
   },
   {
    "aweme_id": "7657581142623640143",
    "brand": "妇炎洁",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "抑菌率高达99.9%",
    "quote": "抑菌率高达99.9%",
    "sec": 27.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7657581142623640143",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "抑菌率数据宣称，需核对消字号检测报告范围与数值"
   },
   {
    "aweme_id": "7658269901653036008",
    "brand": "妇炎洁",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "抑霉菌",
    "quote": "抑霉菌三个字直接印在包装上的产品",
    "sec": 27.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7658269901653036008",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "外部信息雪莲抑霉菌洗液为消字号，需核对该SKU持证"
   },
   {
    "aweme_id": "7670462023326604672",
    "brand": "妇炎洁",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "洗去99.9%的有害菌",
    "quote": "不仅能洗去99.9%的有害菌",
    "sec": 27.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7670462023326604672",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "“洗去99.9%有害菌”属抑菌类数据宣称，需核检测范围"
   },
   {
    "aweme_id": "7657863191686705829",
    "brand": "妇炎洁",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "抑霉菌",
    "quote": "敢把这两个字打在包装上的",
    "sec": 24.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7657863191686705829",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "包装“抑霉菌”，消字号前提下合法，需核该SKU持证"
   },
   {
    "aweme_id": "7657534514801487217",
    "brand": "妇炎洁",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "抑菌",
    "quote": "新升级的妇炎洁抑菌泡沫慕斯",
    "sec": 21.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7657534514801487217",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "包装“抑霉菌洗液”，消字号前提下合法，需核该SKU持证"
   },
   {
    "aweme_id": "7657534514801487217",
    "brand": "妇炎洁",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "抑霉菌",
    "quote": "抑霉菌洗液（泡沫型）",
    "sec": 20.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7657534514801487217",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "包装抑菌率99.9%，需核对消字号检测报告数值与范围"
   },
   {
    "aweme_id": "7660516815877097954",
    "brand": "妇炎洁",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "抑菌率高达99.9%",
    "quote": "把效果直接印在包装上，抑菌率高达99.9%",
    "sec": 18.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7660516815877097954",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "包装“抑菌霉菌洗液”，消字号前提下合法，需核持证"
   },
   {
    "aweme_id": "7661099806455418618",
    "brand": "妇炎洁",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "抑制霉菌",
    "quote": "直接把这个效果印在包装上了...抑制霉菌",
    "sec": 17.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7661099806455418618",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "包装印“抑制霉菌”，消字号前提下合法，需核该SKU检测范围"
   },
   {
    "aweme_id": "7659307420108509007",
    "brand": "妇炎洁",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "抑菌霉菌",
    "quote": "敢直接把效果给你印在包装上的，妇炎洁抑菌霉菌洗液",
    "sec": 16.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7659307420108509007",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "包装“抑制霉菌”，消字号前提下合法，需核该SKU持证"
   },
   {
    "aweme_id": "7657581142623640143",
    "brand": "妇炎洁",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "抑制霉菌",
    "quote": "抑制霉菌",
    "sec": 15.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7657581142623640143",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "包装“抑制霉菌”，消字号前提下合法，需核该SKU持证"
   },
   {
    "aweme_id": "7659435495357261940",
    "brand": "妇炎洁",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "抑制霉菌",
    "quote": "把这几个字印在包装上……抑制霉菌",
    "sec": 13.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7659435495357261940",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "包装“抑制霉菌”，消字号前提下合法，需核该SKU持证"
   },
   {
    "aweme_id": "7661099806455418618",
    "brand": "妇炎洁",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "抑霉菌",
    "quote": "妇炎洁抑霉菌洗液",
    "sec": 7.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7661099806455418618",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "包装品名“抑霉菌洗液”，消字号前提下合法，需核该SKU持证"
   },
   {
    "aweme_id": "7659816863844809955",
    "brand": "妇炎洁",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "抑制霉菌",
    "quote": "画面展示产品包装文字：抑制霉菌",
    "sec": 6.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7659816863844809955",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "“抑菌泡沫慕斯”属抑菌宣称，消字号前提下合法，需核证"
   },
   {
    "aweme_id": "7662258023151070630",
    "brand": "妇炎洁",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "管你痒不痒",
    "quote": "黄色是管你痒不痒",
    "sec": 1.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7662258023151070630",
    "verdict": "grey",
    "verdict_cn": "灰区 · 需品牌提供依据",
    "note": "“管你痒不痒”暗示止痒功效，超洗液合法宣称，需依据"
   },
   {
    "aweme_id": "7662694680013868322",
    "brand": "朵薇",
    "seg": "经期用品",
    "category": "卫生巾",
    "term": "消毒剂认证",
    "quote": "还有消毒剂认证",
    "sec": 150.6,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7662694680013868322",
    "verdict": "false_positive",
    "verdict_cn": "误报",
    "note": "主动出示资质属合规证据；该认证与卫生巾的适配性建议单独核实"
   },
   {
    "aweme_id": "7676494614476854598",
    "brand": "洛蕾诗",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "异味自然就没地方待了",
    "quote": "生态一稳，那些小别扭小异味自然就没地方待了",
    "sec": 54.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7676494614476854598",
    "verdict": "false_positive",
    "verdict_cn": "误报",
    "note": "去异味的委婉表述，属洗液清洁范畴，本身合规"
   },
   {
    "aweme_id": "7676494614476854598",
    "brand": "洛蕾诗",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "赶走坏客人",
    "quote": "精准养护好菌赶走坏客人",
    "sec": 50.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7676494614476854598",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "拟人化抑菌宣称，需消字号与检测；未能公开核实持证情况"
   },
   {
    "aweme_id": "7677544411081195170",
    "brand": "洛蕾诗",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "抑菌率99.9%",
    "quote": "展示报告显示抑菌率99.9%",
    "sec": 40.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7677544411081195170",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "片中展示抑菌报告，仍未能公开核实该SKU消字号持证情况"
   },
   {
    "aweme_id": "7671124808327300017",
    "brand": "洛蕾诗",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "抑菌",
    "quote": "产品包装显示：蔓越莓私护洗液，抑菌护发（包装贴片信息）",
    "sec": 34.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7671124808327300017",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "包装抑菌宣称，未能公开核实该SKU消字号持证情况"
   },
   {
    "aweme_id": "7668891823663044005",
    "brand": "洛蕾诗",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "抑菌率达到99.9%",
    "quote": "抑菌率可是达到了三个九那么多",
    "sec": 21.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7668891823663044005",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "片中出示抑菌报告，仍需核对该SKU消字号持证情况"
   },
   {
    "aweme_id": "7677544411081195170",
    "brand": "洛蕾诗",
    "seg": "私处护理",
    "category": "私处洗液",
    "term": "抑菌",
    "quote": "不仅抑菌还能护理小花园",
    "sec": 11.0,
    "type": "disinfect_cert",
    "type_cn": "抑菌杀菌·需消毒资质",
    "auto_bucket": "cert_check",
    "auto_bucket_cn": "需资质核查",
    "audience": "女性向",
    "url": "https://www.iesdouyin.com/share/video/7677544411081195170",
    "verdict": "cert_required",
    "verdict_cn": "需资质核查 · 非违规",
    "note": "“不仅抑菌还能护理”属抑菌宣称，未能公开核实消字号持证"
   }
  ],
  "review": {
   "file": "female/xingtu/review_compliance.json",
   "exists": true,
   "counts": [
    {
     "verdict": "cert_required",
     "label": "需资质核查 · 非违规",
     "n": 49
    },
    {
     "verdict": "grey",
     "label": "灰区 · 需品牌提供依据",
     "n": 21
    },
    {
     "verdict": "false_positive",
     "label": "误报",
     "n": 16
    },
    {
     "verdict": "violation",
     "label": "真违规",
     "n": 8
    }
   ],
   "status": "已读取人工复核结论并覆盖到明细行（94/94 条明细已有结论）。",
   "schema_hint": "复核文件写法：{\"<aweme_id>\": {\"verdict\": \"violation|grey|cert_required|false_positive\", \"note\": \"...\"}}，或用 \"<aweme_id>::<原词>\" 精确到单个命中词。"
  },
  "flagged": {
   "total": 97,
   "reasons": [
    {
     "reason": "model_note",
     "n": 47
    },
    {
     "reason": "compliance_hit:抑菌",
     "n": 6
    },
    {
     "reason": "low_confidence",
     "n": 4
    },
    {
     "reason": "compliance_hit:抑菌率99.9%",
     "n": 3
    },
    {
     "reason": "compliance_hit:抑制99.9%的坏菌",
     "n": 3
    },
    {
     "reason": "compliance_hit:销量第一",
     "n": 2
    },
    {
     "reason": "compliance_hit:抑霉菌",
     "n": 2
    },
    {
     "reason": "compliance_hit:抑菌率有99.9%",
     "n": 2
    },
    {
     "reason": "compliance_hit:物理隔菌",
     "n": 2
    },
    {
     "reason": "compliance_hit:透皮吸收",
     "n": 1
    },
    {
     "reason": "compliance_hit:抑菌率百分之99.9%",
     "n": 1
    },
    {
     "reason": "compliance_hit:抑霉菌,抑菌",
     "n": 1
    },
    {
     "reason": "compliance_hit:抑制霉菌,抑菌率高达99.9%",
     "n": 1
    },
    {
     "reason": "compliance_hit:抑菌洗液,霉菌就好了",
     "n": 1
    },
    {
     "reason": "compliance_hit:抑菌霉菌,99.9%",
     "n": 1
    },
    {
     "reason": "compliance_hit:抑菌率有99%",
     "n": 1
    },
    {
     "reason": "compliance_hit:白色念珠菌,抑制霉菌",
     "n": 1
    },
    {
     "reason": "compliance_hit:抑制霉菌,抑菌洗液",
     "n": 1
    },
    {
     "reason": "compliance_hit:祛斑,祛黑点点",
     "n": 1
    },
    {
     "reason": "compliance_hit:弱酸抑菌,抑菌效果肉眼可见",
     "n": 1
    },
    {
     "reason": "compliance_hit:抑菌,弱酸抑菌",
     "n": 1
    },
    {
     "reason": "compliance_hit:抑菌慕斯,抑菌",
     "n": 1
    },
    {
     "reason": "compliance_hit:秒吸",
     "n": 1
    },
    {
     "reason": "compliance_hit:抑菌率高达99.9%,抑制白色念珠菌",
     "n": 1
    },
    {
     "reason": "compliance_hit:洗去99%的有害菌",
     "n": 1
    },
    {
     "reason": "compliance_hit:抑霉菌,抑制霉菌",
     "n": 1
    },
    {
     "reason": "compliance_hit:管你痒不痒",
     "n": 1
    },
    {
     "reason": "compliance_hit:抑制99.9%坏菌",
     "n": 1
    },
    {
     "reason": "compliance_hit:调节经期的不适,消毒剂认证",
     "n": 1
    },
    {
     "reason": "compliance_hit:99.9%的抑菌率",
     "n": 1
    },
    {
     "reason": "compliance_hit:抑制99.9%的有害菌",
     "n": 1
    },
    {
     "reason": "compliance_hit:抑菌率可以达到99.9%",
     "n": 1
    },
    {
     "reason": "compliance_hit:抑菌,有效地抑菌,抑菌效果,无法替代",
     "n": 1
    },
    {
     "reason": "compliance_hit:抑制坏菌,不舒服的感觉真好不少",
     "n": 1
    },
    {
     "reason": "compliance_hit:隔离95%以上的经血细菌",
     "n": 1
    },
    {
     "reason": "compliance_hit:抑菌率达到99.9%",
     "n": 1
    },
    {
     "reason": "compliance_hit:洗菌率是高达99.9%",
     "n": 1
    },
    {
     "reason": "compliance_hit:销售额是第一的",
     "n": 1
    },
    {
     "reason": "compliance_hit:洗去99.9%的有害菌",
     "n": 1
    },
    {
     "reason": "compliance_hit:菌群",
     "n": 1
    },
    {
     "reason": "compliance_hit:99.9%的有害菌",
     "n": 1
    },
    {
     "reason": "compliance_hit:物理隔绝95%以上经血细菌",
     "n": 1
    },
    {
     "reason": "compliance_hit:赶跑有害菌",
     "n": 1
    },
    {
     "reason": "compliance_hit:把坏菌赶出去，好菌补进来",
     "n": 1
    },
    {
     "reason": "compliance_hit:益生菌卫生巾,抑制坏菌",
     "n": 1
    },
    {
     "reason": "compliance_hit:第一",
     "n": 1
    },
    {
     "reason": "compliance_hit:洗菌率高达99.9%",
     "n": 1
    },
    {
     "reason": "compliance_hit:洗菌率能做到99.9%",
     "n": 1
    },
    {
     "reason": "compliance_hit:抑菌,抑制有害菌的滋生",
     "n": 1
    },
    {
     "reason": "compliance_hit:灭活益生菌",
     "n": 1
    },
    {
     "reason": "compliance_hit:专利益生菌",
     "n": 1
    },
    {
     "reason": "compliance_hit:较强抑制作用,弱酸抑菌",
     "n": 1
    },
    {
     "reason": "compliance_hit:赶走坏客人,异味自然就没地方待了",
     "n": 1
    },
    {
     "reason": "compliance_hit:抑菌的功效",
     "n": 1
    },
    {
     "reason": "compliance_hit:抑菌,抑菌率99.9%",
     "n": 1
    },
    {
     "reason": "compliance_hit:转阴,抗炎,菌菌",
     "n": 1
    },
    {
     "reason": "compliance_hit:不滋生菌菌",
     "n": 1
    },
    {
     "reason": "compliance_hit:完全不会反渗,抑菌的层面",
     "n": 1
    }
   ],
   "note": "_needs_human_review 是标注管线的自动质检标记（模型自注/受众不明/低置信/合规命中），与合规不是一回事；合规复核的实际基数是命中合规/资质原词的 69 条视频。"
  },
  "method": "由多模态模型在逐条视频中标出原词 + 原话 + 时间点，再按 female/xingtu/validate.py 的 RISK_TYPE 六类归类；analyze.py 已把「疑似违规」（medical_claim / unfounded_efficacy / absolute / other）与「需资质核查」（disinfect_cert / device_claim）分开输出，避免抑菌宣称把违规量做虚高。最终判定必须经人工逐条复核（verdict 字段），本脚本不自动定性。",
  "disclaimer": "⚠️ 本合规视图基于 136 条抽样标注（每品牌订单应收金额 TOP20），**非普查**，不代表任何品牌的整体合规水平——同一品牌窗口内另有数十至数百条视频未被检视；命中原词仅表示「值得核查」，判定依据为《广告法》第九条、《化妆品监督管理条例》《消毒管理办法》等公开规则，属内容分析判断，不构成法律意见，最终以监管口径与品牌资质为准。"
 },
 "G_playbook": {
  "n_female": 136,
  "address": {
   "n_videos_with_term": 118,
   "pct": 86.76,
   "terms": [
    {
     "term": "女生",
     "n": 54,
     "pct": 39.71,
     "quote": "女生的内裤都是什么味"
    },
    {
     "term": "姐妹们",
     "n": 29,
     "pct": 21.32,
     "quote": "真的是太炸裂了姐妹们"
    },
    {
     "term": "姐妹",
     "n": 25,
     "pct": 18.38,
     "quote": "但凡生过孩子的姐妹"
    },
    {
     "term": "闺蜜",
     "n": 12,
     "pct": 8.82,
     "quote": "直接安利给所有闺蜜"
    },
    {
     "term": "女孩子",
     "n": 11,
     "pct": 8.09,
     "quote": "现在专家都让女孩子多注意卫生"
    },
    {
     "term": "姐",
     "n": 10,
     "pct": 7.35,
     "quote": "姐！我谈成了！"
    },
    {
     "term": "女性",
     "n": 10,
     "pct": 7.35,
     "quote": "国内女性的护理意识也越来越强了"
    },
    {
     "term": "妈妈",
     "n": 9,
     "pct": 6.62,
     "quote": "我妈妈那辈都开始用了"
    },
    {
     "term": "老婆",
     "n": 8,
     "pct": 5.88,
     "quote": "霸道总裁都是这么哄老婆了吗"
    },
    {
     "term": "媳妇",
     "n": 7,
     "pct": 5.15,
     "quote": "媳妇这刚加完班别用了吧"
    },
    {
     "term": "女孩",
     "n": 6,
     "pct": 4.41,
     "quote": "所有女孩惊讶"
    },
    {
     "term": "姐姐",
     "n": 6,
     "pct": 4.41,
     "quote": "姐姐一般涂完冰皮之后"
    },
    {
     "term": "女人",
     "n": 5,
     "pct": 3.68,
     "quote": "女人就是对自己好一点"
    },
    {
     "term": "妹妹",
     "n": 4,
     "pct": 2.94,
     "quote": "小到妹妹的卫生用品"
    },
    {
     "term": "女儿",
     "n": 4,
     "pct": 2.94,
     "quote": "就是勋哥的女儿"
    },
    {
     "term": "宝妈",
     "n": 3,
     "pct": 2.21,
     "quote": "我在产房见过太多的宝妈"
    },
    {
     "term": "婆婆",
     "n": 3,
     "pct": 2.21,
     "quote": "哎呀婆婆"
    },
    {
     "term": "儿媳妇",
     "n": 3,
     "pct": 2.21,
     "quote": "那个儿媳妇"
    },
    {
     "term": "阿姨",
     "n": 3,
     "pct": 2.21,
     "quote": "阿姨您坐"
    },
    {
     "term": "宝宝",
     "n": 2,
     "pct": 1.47,
     "quote": "是敏感体质的宝宝"
    },
    {
     "term": "妈",
     "n": 2,
     "pct": 1.47,
     "quote": "妈你也别闲着"
    },
    {
     "term": "老妈",
     "n": 2,
     "pct": 1.47,
     "quote": "上次带老妈去喝那个仙草"
    },
    {
     "term": "宝子",
     "n": 2,
     "pct": 1.47,
     "quote": "像我宝子们一直都在用的呢"
    },
    {
     "term": "女朋友",
     "n": 2,
     "pct": 1.47,
     "quote": "真没谈过女朋友吗"
    }
   ],
   "note": "86.76% 的女性向视频出现明确的女性称呼语；使用量第一的是「女生」（54 次）。称呼语是这个赛道建立「同类人」身份的最低成本手段。"
  },
  "phrase_patterns": [
   {
    "code": "dry",
    "label": "干爽不闷",
    "n_claims": 93,
    "n_videos": 74,
    "pct": 54.41,
    "samples": [
     {
      "quote": "有三万个透气孔，特别透气",
      "brand": "Herlab/她研社"
     },
     {
      "quote": "不用担心漏，超清爽",
      "brand": "Herlab/她研社"
     },
     {
      "quote": "可干爽了",
      "brand": "FREEMORE/自由点"
     },
     {
      "quote": "用着也不闷闷痒痒",
      "brand": "FREEMORE/自由点"
     },
     {
      "quote": "特意设计的透气孔，夏天用着也不会闷热",
      "brand": "FREEMORE/自由点"
     }
    ]
   },
   {
    "code": "ph",
    "label": "弱酸/pH 值背书",
    "n_claims": 46,
    "n_videos": 43,
    "pct": 31.62,
    "samples": [
     {
      "quote": "弱酸性更贴合女生私处pH",
      "brand": "INTIMA/茵缇玛"
     },
     {
      "quote": "弱酸性，贴合私处环境",
      "brand": "INTIMA/茵缇玛"
     },
     {
      "quote": "pH值弱酸性温和不刺激",
      "brand": "妇炎洁"
     },
     {
      "quote": "pH值只有4.7，贴合私处环境",
      "brand": "妇炎洁"
     },
     {
      "quote": "和健康肌肤一样弱酸面层",
      "brand": "Herlab/她研社"
     }
    ]
   },
   {
    "code": "mild",
    "label": "温和不刺激",
    "n_claims": 42,
    "n_videos": 37,
    "pct": 27.21,
    "samples": [
     {
      "quote": "pH值弱酸性温和不刺激",
      "brand": "妇炎洁"
     },
     {
      "quote": "能温和抑菌，不容易闷痒",
      "brand": "Herlab/她研社"
     },
     {
      "quote": "APG表活我查了一下啊，比氨基酸还要温和",
      "brand": "INTIMA/茵缇玛"
     },
     {
      "quote": "草本植萃温和不刺激",
      "brand": "妇炎洁"
     },
     {
      "quote": "植物萃取，成分温和",
      "brand": "妇炎洁"
     }
    ]
   },
   {
    "code": "flora",
    "label": "菌群/益生元话术",
    "n_claims": 39,
    "n_videos": 36,
    "pct": 26.47,
    "samples": [
     {
      "quote": "里头添加着益生菌，抑菌率百分之99.9%呢",
      "brand": "FREEMORE/自由点"
     },
     {
      "quote": "弱酸配方，你根本不用担心会破坏菌群",
      "brand": "INTIMA/茵缇玛"
     },
     {
      "quote": "加益生菌了老舒服了还更健康",
      "brand": "FREEMORE/自由点"
     },
     {
      "quote": "添加了有益后生元，维持私处菌群平衡",
      "brand": "Herlab/她研社"
     },
     {
      "quote": "维护私处的有益菌群",
      "brand": "Herlab/她研社"
     }
    ]
   },
   {
    "code": "absorb",
    "label": "吸水量实测",
    "n_claims": 31,
    "n_videos": 28,
    "pct": 20.59,
    "samples": [
     {
      "quote": "透皮吸收方式养护小花园",
      "brand": "妇炎洁"
     },
     {
      "quote": "吸收力好表面能一直保持特干爽",
      "brand": "Herlab/她研社"
     },
     {
      "quote": "吸收普通卫生巾吸收不了的血块",
      "brand": "SOFY/苏菲"
     },
     {
      "quote": "表层快速下渗技术能让粘稠经血立马被吸收",
      "brand": "SOFY/苏菲"
     },
     {
      "quote": "其实吸收力超牛还特干爽",
      "brand": "FREEMORE/自由点"
     }
    ]
   },
   {
    "code": "soft",
    "label": "柔软亲肤",
    "n_claims": 25,
    "n_videos": 23,
    "pct": 16.91,
    "samples": [
     {
      "quote": "洗完清清爽爽特别舒服",
      "brand": "妇炎洁"
     },
     {
      "quote": "加益生菌了老舒服了还更健康",
      "brand": "FREEMORE/自由点"
     },
     {
      "quote": "特别舒服",
      "brand": "朵薇"
     },
     {
      "quote": "吸收力特别好，上课坐的久也能干爽舒服",
      "brand": "Herlab/她研社"
     },
     {
      "quote": "垫着舒服没感觉",
      "brand": "FREEMORE/自由点"
     }
    ]
   },
   {
    "code": "night",
    "label": "夜用/量大场景",
    "n_claims": 8,
    "n_videos": 8,
    "pct": 5.88,
    "samples": [
     {
      "quote": "第二天量大都没漏过",
      "brand": "FREEMORE/自由点"
     },
     {
      "quote": "量大也不怕",
      "brand": "SOFY/苏菲"
     },
     {
      "quote": "晚上睡觉换上无痕裤，弹力很大",
      "brand": "whisper/护舒宝"
     },
     {
      "quote": "怎么翻身都不会侧漏",
      "brand": "whisper/护舒宝"
     },
     {
      "quote": "量大都没漏过",
      "brand": "FREEMORE/自由点"
     }
    ]
   },
   {
    "code": "leakproof",
    "label": "不侧漏/防漏",
    "n_claims": 7,
    "n_videos": 7,
    "pct": 5.15,
    "samples": [
     {
      "quote": "怎么跑都不会侧漏",
      "brand": "SOFY/苏菲"
     },
     {
      "quote": "不要这个侧漏",
      "brand": "FREEMORE/自由点"
     },
     {
      "quote": "不用再担心侧漏弄脏裤子了",
      "brand": "FREEMORE/自由点"
     },
     {
      "quote": "怎么翻身都不会侧漏",
      "brand": "whisper/护舒宝"
     },
     {
      "quote": "暴走一天也没有位移侧漏",
      "brand": "FREEMORE/自由点"
     }
    ]
   },
   {
    "code": "report",
    "label": "检测报告/资质",
    "n_claims": 5,
    "n_videos": 5,
    "pct": 3.68,
    "samples": [
     {
      "quote": "专利益生菌有99.9%的抑菌率",
      "brand": "FREEMORE/自由点"
     },
     {
      "quote": "抑菌效果显著，有权威检测报告",
      "brand": "Herlab/她研社"
     },
     {
      "quote": "添加专利益生菌",
      "brand": "FREEMORE/自由点"
     },
     {
      "quote": "加的是专利益生菌，对小花园环境特别友好",
      "brand": "FREEMORE/自由点"
     },
     {
      "quote": "专利的下渗技术配合大小孔洞组合设计",
      "brand": "SOFY/苏菲"
     }
    ]
   },
   {
    "code": "doctor",
    "label": "医生/妇科背书",
    "n_claims": 1,
    "n_videos": 1,
    "pct": 0.74,
    "samples": [
     {
      "quote": "日常护理好了，总比以后不舒服跑医院强吧",
      "brand": "INTIMA/茵缇玛"
     }
    ]
   },
   {
    "code": "sister",
    "label": "姐妹认同",
    "n_claims": 1,
    "n_videos": 1,
    "pct": 0.74,
    "samples": [
     {
      "quote": "PH值是5.3，这种对咱们女性特别友好",
      "brand": "洛蕾诗"
     }
    ]
   },
   {
    "code": "cheap",
    "label": "价格锚点",
    "n_claims": 1,
    "n_videos": 1,
    "pct": 0.74,
    "samples": [
     {
      "quote": "更高性价比的选择",
      "brand": "妇炎洁"
     }
    ]
   },
   {
    "code": "noshame",
    "label": "去羞耻化",
    "n_claims": 0,
    "n_videos": 0,
    "pct": 0.0,
    "samples": []
   }
  ],
  "templates": [
   {
    "code": "T1",
    "name": "「当场实测」硬核实证流",
    "scene": "卫生巾/安睡裤/棉条等吸水性能可视化的品类；也适用于洗液的清洁力对比",
    "formula": "0–3s 直接倒水/撕开看内部（不解释）→ 3–10s 说清测的是什么、怎么测 → 10–35s 完整实测不剪断 → 收口回到「所以它敢这么写」",
    "n": 101,
    "pct": 74.26,
    "brands": [
     {
      "brand": "FREEMORE/自由点",
      "n": 19
     },
     {
      "brand": "SOFY/苏菲",
      "n": 19
     },
     {
      "brand": "INTIMA/茵缇玛",
      "n": 15
     },
     {
      "brand": "Herlab/她研社",
      "n": 15
     }
    ],
    "n_brands": 8,
    "seg_mix": [
     {
      "seg": "经期用品",
      "n": 68
     },
     {
      "seg": "私处护理",
      "n": 33
     }
    ],
    "er_median": 0.0185,
    "er_n": 93,
    "er_p_vs_rest": 0.0836,
    "first_product_median": 49.0,
    "quotes": [
     {
      "claim": "吸满也干干爽爽的",
      "brand": "FREEMORE/自由点"
     },
     {
      "claim": "不用担心漏，超清爽",
      "brand": "Herlab/她研社"
     },
     {
      "claim": "吸收力强到连血块都能吸",
      "brand": "SOFY/苏菲"
     }
    ],
    "enough": true,
    "er_q": 0.1672,
    "er_sig": false,
    "er_p_brand_stratified": 0.5027,
    "er_brand_robust": false,
    "er_note": "与其余女性向样本相比**未达显著**（q=0.1672），互动率数字仅作描述。"
   },
   {
    "code": "T2",
    "name": "「姐妹平视」经验分享流",
    "scene": "通用；适合达人本身有女性受众基本盘、需要建立「同类人」信任的场景",
    "formula": "0–5s 直呼「姐妹们」+ 抛共同困境 → 5–20s 自曝踩坑经历 → 20–45s 边用边讲体感 → 结尾「我先用着，你自己看」",
    "n": 82,
    "pct": 60.29,
    "brands": [
     {
      "brand": "INTIMA/茵缇玛",
      "n": 14
     },
     {
      "brand": "FREEMORE/自由点",
      "n": 14
     },
     {
      "brand": "洛蕾诗",
      "n": 12
     },
     {
      "brand": "Herlab/她研社",
      "n": 11
     }
    ],
    "n_brands": 8,
    "seg_mix": [
     {
      "seg": "经期用品",
      "n": 47
     },
     {
      "seg": "私处护理",
      "n": 35
     }
    ],
    "er_median": 0.0113,
    "er_n": 72,
    "er_p_vs_rest": 0.044,
    "first_product_median": 40.0,
    "quotes": [
     {
      "claim": "清清爽爽的，不会被黏糊糊的感觉打乱",
      "brand": "Herlab/她研社"
     },
     {
      "claim": "用了大小孔结构，大洞直接往下咕咕吸，锁死不反渗",
      "brand": "SOFY/苏菲"
     },
     {
      "claim": "从小用到大的牌子，咱用的就是很放心",
      "brand": "妇炎洁"
     }
    ],
    "enough": true,
    "er_q": 0.132,
    "er_sig": false,
    "er_p_brand_stratified": 0.6414,
    "er_brand_robust": false,
    "er_note": "与其余女性向样本相比**未达显著**（q=0.132），互动率数字仅作描述。"
   },
   {
    "code": "T3",
    "name": "「打破羞耻」去污名流",
    "scene": "私处护理线的核心模板；把「难言之隐」摆上台面，降低搜索与讨论门槛",
    "formula": "0–5s 直接说出被回避的那件事 → 5–15s 讲清这很常见、不是你的错 → 15–35s 给正确做法与产品 → 收口「该被好好对待」",
    "n": 25,
    "pct": 18.38,
    "brands": [
     {
      "brand": "INTIMA/茵缇玛",
      "n": 8
     },
     {
      "brand": "SOFY/苏菲",
      "n": 5
     },
     {
      "brand": "妇炎洁",
      "n": 4
     },
     {
      "brand": "洛蕾诗",
      "n": 3
     }
    ],
    "n_brands": 7,
    "seg_mix": [
     {
      "seg": "私处护理",
      "n": 15
     },
     {
      "seg": "经期用品",
      "n": 10
     }
    ],
    "er_median": 0.0133,
    "er_n": 22,
    "er_p_vs_rest": 0.8376,
    "first_product_median": 41.0,
    "quotes": [
     {
      "claim": "不会破坏私处的平衡，温和不刺激",
      "brand": "Herlab/她研社"
     },
     {
      "claim": "苏菲咚吸卫生巾吸收力很强，连血块都能吸干净",
      "brand": "SOFY/苏菲"
     },
     {
      "claim": "给老公办完事之后用护理液洗干净",
      "brand": "INTIMA/茵缇玛"
     }
    ],
    "enough": true,
    "er_q": 0.8376,
    "er_sig": false,
    "er_p_brand_stratified": 0.6993,
    "er_brand_robust": false,
    "er_note": "与其余女性向样本相比**未达显著**（q=0.8376），互动率数字仅作描述。"
   },
   {
    "code": "T4",
    "name": "「专业背书」权威流",
    "scene": "功效型与高单价单品；用于压服「智商税」质疑",
    "formula": "0–3s 亮身份/亮报告 → 3–12s 讲机理（pH、菌群、导流层）→ 12–30s 甩检测数据 → 30s+ 自用体感兜底",
    "n": 63,
    "pct": 46.32,
    "brands": [
     {
      "brand": "Herlab/她研社",
      "n": 14
     },
     {
      "brand": "INTIMA/茵缇玛",
      "n": 11
     },
     {
      "brand": "whisper/护舒宝",
      "n": 11
     },
     {
      "brand": "洛蕾诗",
      "n": 10
     }
    ],
    "n_brands": 8,
    "seg_mix": [
     {
      "seg": "经期用品",
      "n": 36
     },
     {
      "seg": "私处护理",
      "n": 27
     }
    ],
    "er_median": 0.0118,
    "er_n": 57,
    "er_p_vs_rest": 0.1511,
    "first_product_median": 49.0,
    "quotes": [
     {
      "claim": "和健康肌肤一样弱酸面层",
      "brand": "Herlab/她研社"
     },
     {
      "claim": "专研私处护理已经36年了",
      "brand": "INTIMA/茵缇玛"
     },
     {
      "claim": "小花园专用的弱酸性洗液",
      "brand": "洛蕾诗"
     }
    ],
    "enough": true,
    "er_q": 0.2267,
    "er_sig": false,
    "er_p_brand_stratified": 0.8045,
    "er_brand_robust": false,
    "er_note": "与其余女性向样本相比**未达显著**（q=0.2267），互动率数字仅作描述。"
   },
   {
    "code": "T5",
    "name": "「安全成分」安心流",
    "scene": "敏感肌 / 孕产期 / 学生党等对刺激高度敏感的人群",
    "formula": "0–5s 拿「敢不敢用在最娇嫩的地方」发问 → 5–20s 逐条拆成分与无添加 → 20–40s 演示温和度 → 收口给适用人群",
    "n": 104,
    "pct": 76.47,
    "brands": [
     {
      "brand": "INTIMA/茵缇玛",
      "n": 17
     },
     {
      "brand": "FREEMORE/自由点",
      "n": 16
     },
     {
      "brand": "洛蕾诗",
      "n": 16
     },
     {
      "brand": "妇炎洁",
      "n": 15
     }
    ],
    "n_brands": 8,
    "seg_mix": [
     {
      "seg": "经期用品",
      "n": 56
     },
     {
      "seg": "私处护理",
      "n": 48
     }
    ],
    "er_median": 0.0143,
    "er_n": 91,
    "er_p_vs_rest": 0.2504,
    "first_product_median": 34.5,
    "quotes": [
     {
      "claim": "弱酸面层卫生巾，和自身环境相符",
      "brand": "Herlab/她研社"
     },
     {
      "claim": "植物萃取，成分温和",
      "brand": "妇炎洁"
     },
     {
      "claim": "它是97%天然来源成分",
      "brand": "INTIMA/茵缇玛"
     }
    ],
    "enough": true,
    "er_q": 0.3005,
    "er_sig": false,
    "er_p_brand_stratified": 0.3387,
    "er_brand_robust": false,
    "er_note": "与其余女性向样本相比**未达显著**（q=0.3005），互动率数字仅作描述。"
   },
   {
    "code": "T6",
    "name": "「痛点—解法—收口」闭环流",
    "scene": "通用；新品冷启、需要完整说服链路时使用",
    "formula": "钩子 → 痛点具体化（场景+后果）→ 解法引出 → 演示 → 证据 → 明确 CTA",
    "n": 24,
    "pct": 17.65,
    "brands": [
     {
      "brand": "洛蕾诗",
      "n": 10
     },
     {
      "brand": "INTIMA/茵缇玛",
      "n": 6
     },
     {
      "brand": "妇炎洁",
      "n": 5
     },
     {
      "brand": "Herlab/她研社",
      "n": 2
     }
    ],
    "n_brands": 5,
    "seg_mix": [
     {
      "seg": "私处护理",
      "n": 21
     },
     {
      "seg": "经期用品",
      "n": 3
     }
    ],
    "er_median": 0.0048,
    "er_n": 22,
    "er_p_vs_rest": 0.0,
    "first_product_median": 10.5,
    "quotes": [
     {
      "claim": "30ml经血稳稳吸收",
      "brand": "SOFY/苏菲"
     },
     {
      "claim": "姨妈走后用这个洗了三天一整个就是清清爽爽",
      "brand": "妇炎洁"
     },
     {
      "claim": "添加了蔓越莓精粹和库拉索芦荟",
      "brand": "洛蕾诗"
     }
    ],
    "enough": true,
    "er_q": 0.0,
    "er_sig": true,
    "er_p_brand_stratified": 0.5991,
    "er_brand_robust": false,
    "er_note": "互动率与其余样本有差异（q=0.0），但按品牌分层后 p=0.5991 **不再显著**，该模板与特定品牌/品类共线，不能声称「换这个模板就能提互动」。"
   }
  ],
  "female_er_median": 0.0176,
  "template_caveat": "模板覆盖率是**描述性**指标；互动率一列不能读作「用这个模板就能涨互动」：模板与品牌/品类高度共线（如 T1 实测流集中在卫生巾品牌、T3 去污名流集中在私处洗液品牌）。表中同时给出与其余样本比较的 q 值与品牌内分层 p 值，二者都稳才可当假设用。",
  "male_talent_female_product": {
   "n": 0,
   "pct": 0.0,
   "rows": [],
   "male_endorse_n": 18,
   "male_endorse_pct": 13.24,
   "verdict": "仅 0 条男达人讲女性产品，**样本严重不足，只做定性描述、不做任何量化结论**。"
  }
 },
 "H_taboo_language": {
  "n": 136,
  "coverage": {
   "n_with_terms": 130,
   "pct": 95.59,
   "n_terms": 470,
   "terms_per_video_mean": 3.46,
   "terms_per_video_median": 3.0
  },
  "class_split": [
   {
    "code": "euphemism",
    "label": "委婉代称",
    "n_terms": 189,
    "pct_terms": 40.21,
    "n_videos": 93,
    "pct_videos": 68.38
   },
   {
    "code": "explicit",
    "label": "直白医学词",
    "n_terms": 211,
    "pct_terms": 44.89,
    "n_videos": 98,
    "pct_videos": 72.06
   },
   {
    "code": "unclassified",
    "label": "未归类·体感/症状描述",
    "n_terms": 70,
    "pct_terms": 14.89,
    "n_videos": 45,
    "pct_videos": 33.09
   }
  ],
  "style_mix": [
   {
    "code": "mixed",
    "label": "委婉+直白混用",
    "n": 64,
    "pct": 47.06
   },
   {
    "code": "explicit_only",
    "label": "只用直白医学词",
    "n": 34,
    "pct": 25.0
   },
   {
    "code": "euph_only",
    "label": "只用委婉代称",
    "n": 29,
    "pct": 21.32
   },
   {
    "code": "none",
    "label": "两类都没出现",
    "n": 9,
    "pct": 6.62
   }
  ],
  "top_terms": [
   {
    "term": "小花园",
    "n_videos": 54,
    "pct": 39.71,
    "cls": "euphemism",
    "cls_label": "委婉代称",
    "n_brands": 5,
    "quote": "其实远比大家想象中的要娇嫩"
   },
   {
    "term": "经期",
    "n_videos": 31,
    "pct": 22.79,
    "cls": "explicit",
    "cls_label": "直白医学词",
    "n_brands": 7,
    "quote": "一次经期下来就要换30片"
   },
   {
    "term": "私处",
    "n_videos": 29,
    "pct": 21.32,
    "cls": "explicit",
    "cls_label": "直白医学词",
    "n_brands": 6,
    "quote": "她之前做了私处紧致"
   },
   {
    "term": "生理期",
    "n_videos": 24,
    "pct": 17.65,
    "cls": "explicit",
    "cls_label": "直白医学词",
    "n_brands": 8,
    "quote": "女生生理期时"
   },
   {
    "term": "经血",
    "n_videos": 20,
    "pct": 14.71,
    "cls": "explicit",
    "cls_label": "直白医学词",
    "n_brands": 3,
    "quote": "粘稠量大的经血"
   },
   {
    "term": "月经",
    "n_videos": 16,
    "pct": 11.76,
    "cls": "explicit",
    "cls_label": "直白医学词",
    "n_brands": 4,
    "quote": "女生平均一生要来40年的月经"
   },
   {
    "term": "血块",
    "n_videos": 16,
    "pct": 11.76,
    "cls": "explicit",
    "cls_label": "直白医学词",
    "n_brands": 2,
    "quote": "量超级大，还会有血块"
   },
   {
    "term": "卫生巾",
    "n_videos": 15,
    "pct": 11.03,
    "cls": "explicit",
    "cls_label": "直白医学词",
    "n_brands": 5,
    "quote": "我的卫生巾不见了，你们有吗？"
   },
   {
    "term": "那几天",
    "n_videos": 14,
    "pct": 10.29,
    "cls": "euphemism",
    "cls_label": "委婉代称",
    "n_brands": 6,
    "quote": "那几天用这个自由点益生菌卫生巾可好了"
   },
   {
    "term": "那里",
    "n_videos": 13,
    "pct": 9.56,
    "cls": "euphemism",
    "cls_label": "委婉代称",
    "n_brands": 3,
    "quote": "生完孩子那里特别的娇嫩"
   },
   {
    "term": "姨妈",
    "n_videos": 13,
    "pct": 9.56,
    "cls": "euphemism",
    "cls_label": "委婉代称",
    "n_brands": 5,
    "quote": "像有时候来姨妈啥子的也可以用啊"
   },
   {
    "term": "下面",
    "n_videos": 12,
    "pct": 8.82,
    "cls": "euphemism",
    "cls_label": "委婉代称",
    "n_brands": 4,
    "quote": "下面突然崩开撕裂了"
   },
   {
    "term": "分泌物",
    "n_videos": 8,
    "pct": 5.88,
    "cls": "explicit",
    "cls_label": "直白医学词",
    "n_brands": 4,
    "quote": "分泌物异常"
   },
   {
    "term": "例假",
    "n_videos": 7,
    "pct": 5.15,
    "cls": "euphemism",
    "cls_label": "委婉代称",
    "n_brands": 4,
    "quote": "我来例假了"
   },
   {
    "term": "大姨妈",
    "n_videos": 5,
    "pct": 3.68,
    "cls": "euphemism",
    "cls_label": "委婉代称",
    "n_brands": 5,
    "quote": "大姨妈来了"
   },
   {
    "term": "私密护理",
    "n_videos": 4,
    "pct": 2.94,
    "cls": "explicit",
    "cls_label": "直白医学词",
    "n_brands": 2,
    "quote": "女性私密护理法国销量第一"
   },
   {
    "term": "私密",
    "n_videos": 4,
    "pct": 2.94,
    "cls": "explicit",
    "cls_label": "直白医学词",
    "n_brands": 3,
    "quote": "咱们私密的皮肤是最娇嫩最敏感的"
   },
   {
    "term": "味道",
    "n_videos": 4,
    "pct": 2.94,
    "cls": "unclassified",
    "cls_label": "未归类·体感/症状描述",
    "n_brands": 3,
    "quote": "以前抓挠有味道，现在哦真的很清爽"
   },
   {
    "term": "姨妈期",
    "n_videos": 4,
    "pct": 2.94,
    "cls": "euphemism",
    "cls_label": "委婉代称",
    "n_brands": 3,
    "quote": "还有姨妈期来的那几天"
   },
   {
    "term": "那个",
    "n_videos": 4,
    "pct": 2.94,
    "cls": "euphemism",
    "cls_label": "委婉代称",
    "n_brands": 4,
    "quote": "要是偶尔那个的话"
   },
   {
    "term": "来姨妈",
    "n_videos": 4,
    "pct": 2.94,
    "cls": "euphemism",
    "cls_label": "委婉代称",
    "n_brands": 3,
    "quote": "这来姨妈了腰酸背痛的"
   },
   {
    "term": "不舒服",
    "n_videos": 4,
    "pct": 2.94,
    "cls": "unclassified",
    "cls_label": "未归类·体感/症状描述",
    "n_brands": 3,
    "quote": "越洗越有味道，不舒服"
   },
   {
    "term": "私密部位",
    "n_videos": 3,
    "pct": 2.21,
    "cls": "explicit",
    "cls_label": "直白医学词",
    "n_brands": 2,
    "quote": "咱们女性私密部位的肌肤啊"
   },
   {
    "term": "私护",
    "n_videos": 3,
    "pct": 2.21,
    "cls": "explicit",
    "cls_label": "直白医学词",
    "n_brands": 2,
    "quote": "帮帮忙选选私护"
   },
   {
    "term": "特殊时期",
    "n_videos": 3,
    "pct": 2.21,
    "cls": "euphemism",
    "cls_label": "委婉代称",
    "n_brands": 3,
    "quote": "这特殊时期用完全没问题"
   },
   {
    "term": "难言之隐",
    "n_videos": 3,
    "pct": 2.21,
    "cls": "euphemism",
    "cls_label": "委婉代称",
    "n_brands": 2,
    "quote": "真的总有些难言之隐"
   },
   {
    "term": "菌群",
    "n_videos": 2,
    "pct": 1.47,
    "cls": "explicit",
    "cls_label": "直白医学词",
    "n_brands": 1,
    "quote": "不会破坏咱们私处的菌群"
   },
   {
    "term": "异味",
    "n_videos": 2,
    "pct": 1.47,
    "cls": "unclassified",
    "cls_label": "未归类·体感/症状描述",
    "n_brands": 2,
    "quote": "还容易滋生异味"
   },
   {
    "term": "脆弱的部位",
    "n_videos": 2,
    "pct": 1.47,
    "cls": "euphemism",
    "cls_label": "委婉代称",
    "n_brands": 1,
    "quote": "这么脆弱的部位"
   },
   {
    "term": "白色渣渣",
    "n_videos": 2,
    "pct": 1.47,
    "cls": "unclassified",
    "cls_label": "未归类·体感/症状描述",
    "n_brands": 1,
    "quote": "一扒开有白色渣渣怎么办"
   }
  ],
  "by_seg": [
   {
    "seg": "经期用品",
    "n": 81,
    "euphemism_pct": 51.85,
    "explicit_pct": 74.07,
    "taboo_direct_pct": 62.96,
    "terms_per_video": 2.99,
    "top_terms": [
     {
      "term": "经期",
      "n": 26
     },
     {
      "term": "经血",
      "n": 20
     },
     {
      "term": "生理期",
      "n": 17
     },
     {
      "term": "血块",
      "n": 15
     },
     {
      "term": "卫生巾",
      "n": 14
     }
    ],
    "note": ""
   },
   {
    "seg": "私处护理",
    "n": 55,
    "euphemism_pct": 92.73,
    "explicit_pct": 69.09,
    "taboo_direct_pct": 49.09,
    "terms_per_video": 4.15,
    "top_terms": [
     {
      "term": "小花园",
      "n": 43
     },
     {
      "term": "私处",
      "n": 18
     },
     {
      "term": "那里",
      "n": 13
     },
     {
      "term": "下面",
      "n": 11
     },
     {
      "term": "姨妈",
      "n": 8
     }
    ],
    "note": ""
   }
  ],
  "by_brand": [
   {
    "brand": "INTIMA/茵缇玛",
    "n": 20,
    "euphemism_pct": 80.0,
    "explicit_pct": 95.0,
    "taboo_direct_pct": 75.0,
    "terms_per_video": 4.7,
    "top_terms": [
     {
      "term": "私处",
      "n": 13
     },
     {
      "term": "小花园",
      "n": 12
     },
     {
      "term": "下面",
      "n": 5
     },
     {
      "term": "那里",
      "n": 4
     },
     {
      "term": "经期",
      "n": 4
     }
    ],
    "note": ""
   },
   {
    "brand": "Herlab/她研社",
    "n": 20,
    "euphemism_pct": 75.0,
    "explicit_pct": 90.0,
    "taboo_direct_pct": 80.0,
    "terms_per_video": 3.65,
    "top_terms": [
     {
      "term": "私处",
      "n": 9
     },
     {
      "term": "经期",
      "n": 9
     },
     {
      "term": "小花园",
      "n": 8
     },
     {
      "term": "经血",
      "n": 5
     },
     {
      "term": "卫生巾",
      "n": 4
     }
    ],
    "note": ""
   },
   {
    "brand": "FREEMORE/自由点",
    "n": 19,
    "euphemism_pct": 78.95,
    "explicit_pct": 47.37,
    "taboo_direct_pct": 26.32,
    "terms_per_video": 2.42,
    "top_terms": [
     {
      "term": "生理期",
      "n": 5
     },
     {
      "term": "卫生巾",
      "n": 4
     },
     {
      "term": "例假",
      "n": 3
     },
     {
      "term": "那几天",
      "n": 3
     },
     {
      "term": "姨妈",
      "n": 3
     }
    ],
    "note": ""
   },
   {
    "brand": "SOFY/苏菲",
    "n": 19,
    "euphemism_pct": 31.58,
    "explicit_pct": 94.74,
    "taboo_direct_pct": 89.47,
    "terms_per_video": 3.84,
    "top_terms": [
     {
      "term": "血块",
      "n": 15
     },
     {
      "term": "经血",
      "n": 14
     },
     {
      "term": "经期",
      "n": 9
     },
     {
      "term": "月经",
      "n": 6
     },
     {
      "term": "生理期",
      "n": 6
     }
    ],
    "note": ""
   },
   {
    "brand": "洛蕾诗",
    "n": 19,
    "euphemism_pct": 100.0,
    "explicit_pct": 52.63,
    "taboo_direct_pct": 15.79,
    "terms_per_video": 3.47,
    "top_terms": [
     {
      "term": "小花园",
      "n": 16
     },
     {
      "term": "那里",
      "n": 6
     },
     {
      "term": "生理期",
      "n": 5
     },
     {
      "term": "姨妈",
      "n": 3
     },
     {
      "term": "那几天",
      "n": 2
     }
    ],
    "note": ""
   },
   {
    "brand": "whisper/护舒宝",
    "n": 18,
    "euphemism_pct": 22.22,
    "explicit_pct": 72.22,
    "taboo_direct_pct": 66.67,
    "terms_per_video": 2.39,
    "top_terms": [
     {
      "term": "月经",
      "n": 6
     },
     {
      "term": "经期",
      "n": 4
     },
     {
      "term": "生理期",
      "n": 3
     },
     {
      "term": "卫生巾",
      "n": 2
     },
     {
      "term": "来月经了",
      "n": 2
     }
    ],
    "note": ""
   },
   {
    "brand": "妇炎洁",
    "n": 16,
    "euphemism_pct": 100.0,
    "explicit_pct": 56.25,
    "taboo_direct_pct": 56.25,
    "terms_per_video": 4.25,
    "top_terms": [
     {
      "term": "小花园",
      "n": 15
     },
     {
      "term": "私处",
      "n": 4
     },
     {
      "term": "分泌物",
      "n": 4
     },
     {
      "term": "那几天",
      "n": 4
     },
     {
      "term": "姨妈",
      "n": 4
     }
    ],
    "note": ""
   },
   {
    "brand": "朵薇",
    "n": 5,
    "euphemism_pct": 40.0,
    "explicit_pct": 40.0,
    "taboo_direct_pct": 20.0,
    "terms_per_video": 1.4,
    "top_terms": [
     {
      "term": "生理期",
      "n": 1
     },
     {
      "term": "例假",
      "n": 1
     },
     {
      "term": "流血了",
      "n": 1
     },
     {
      "term": "经期",
      "n": 1
     },
     {
      "term": "私密的地方",
      "n": 1
     }
    ],
    "note": "样本不足（n<12），只报 n"
   }
  ],
  "by_category": [
   {
    "category": "卫生巾",
    "n": 74,
    "euphemism_pct": 52.7,
    "explicit_pct": 75.68,
    "taboo_direct_pct": 63.51,
    "terms_per_video": 3.0,
    "top_terms": [
     {
      "term": "经期",
      "n": 24
     },
     {
      "term": "经血",
      "n": 20
     },
     {
      "term": "生理期",
      "n": 16
     },
     {
      "term": "血块",
      "n": 15
     },
     {
      "term": "月经",
      "n": 14
     }
    ],
    "note": ""
   },
   {
    "category": "私处洗液",
    "n": 57,
    "euphemism_pct": 91.23,
    "explicit_pct": 71.93,
    "taboo_direct_pct": 52.63,
    "terms_per_video": 4.25,
    "top_terms": [
     {
      "term": "小花园",
      "n": 44
     },
     {
      "term": "私处",
      "n": 20
     },
     {
      "term": "那里",
      "n": 12
     },
     {
      "term": "下面",
      "n": 11
     },
     {
      "term": "分泌物",
      "n": 8
     }
    ],
    "note": ""
   },
   {
    "category": "其他",
    "n": 2,
    "euphemism_pct": 0.0,
    "explicit_pct": 0.0,
    "taboo_direct_pct": 0.0,
    "terms_per_video": 0.0,
    "top_terms": [],
    "note": "样本不足（n<12），只报 n"
   },
   {
    "category": "护垫",
    "n": 1,
    "euphemism_pct": 100.0,
    "explicit_pct": 100.0,
    "taboo_direct_pct": 100.0,
    "terms_per_video": 4.0,
    "top_terms": [
     {
      "term": "私处",
      "n": 1
     },
     {
      "term": "生理期",
      "n": 1
     },
     {
      "term": "小花园",
      "n": 1
     },
     {
      "term": "那里",
      "n": 1
     }
    ],
    "note": "样本不足（n<12），只报 n"
   },
   {
    "category": "私处护理（凝胶/喷雾/精油）",
    "n": 1,
    "euphemism_pct": 100.0,
    "explicit_pct": 0.0,
    "taboo_direct_pct": 0.0,
    "terms_per_video": 1.0,
    "top_terms": [
     {
      "term": "姨妈",
      "n": 1
     }
    ],
    "note": "样本不足（n<12），只报 n"
   },
   {
    "category": "安睡裤",
    "n": 1,
    "euphemism_pct": 0.0,
    "explicit_pct": 0.0,
    "taboo_direct_pct": 0.0,
    "terms_per_video": 1.0,
    "top_terms": [
     {
      "term": "不舒服",
      "n": 1
     }
    ],
    "note": "样本不足（n<12），只报 n"
   }
  ],
  "seg_tests": {
   "euphemism_any": {
    "field": "euphemism_any",
    "code": true,
    "g1_n": 42,
    "g2_n": 51,
    "p": 4.871760335014803e-07,
    "method": "chi2",
    "q": 2.3984050880072875e-06,
    "sig": true,
    "g1_pct": 51.85,
    "g2_pct": 92.73,
    "label": "出现私处/月经代称",
    "direction": "g2_higher",
    "lift": 0.56
   },
   "explicit_any": {
    "field": "explicit_any",
    "code": true,
    "g1_n": 60,
    "g2_n": 38,
    "p": 0.5250277713215515,
    "method": "chi2",
    "q": 0.5968344588058054,
    "sig": false,
    "g1_pct": 74.07,
    "g2_pct": 69.09,
    "label": "出现直白医学词",
    "direction": "g1_higher",
    "lift": 1.07
   },
   "taboo_direct": {
    "field": "taboo_direct",
    "code": true,
    "g1_n": 51,
    "g2_n": 27,
    "p": 0.10841432604773371,
    "method": "chi2",
    "q": 0.15769356516033994,
    "sig": false,
    "g1_pct": 62.96,
    "g2_pct": 49.09,
    "label": "直白谈私处/月经",
    "direction": "g1_higher",
    "lift": 1.28
   },
   "summary": [
    "委婉代称命中率：经期用品 51.85% vs 私处护理 92.73%，q=0.0000 → **显著**",
    "直白医学词命中率：经期用品 74.07% vs 私处护理 69.09%，q=0.5968 → **未达显著**",
    "直白谈私处/月经（taboo_direct）：经期用品 62.96% vs 私处护理 49.09%，q=0.1577 → **未达显著**"
   ],
   "note": "这三项检验与 B 块同属一个 FDR 家族（在 B 块统一校正），此处只是引用结果，未重复检验。"
  },
  "taboo_direct": {
   "n": 78,
   "pct": 57.35,
   "by_seg": [
    {
     "seg": "经期用品",
     "n": 81,
     "pct": 62.96,
     "note": ""
    },
    {
     "seg": "私处护理",
     "n": 55,
     "pct": 49.09,
     "note": ""
    }
   ],
   "by_brand": [
    {
     "brand": "INTIMA/茵缇玛",
     "n": 20,
     "pct": 75.0,
     "note": ""
    },
    {
     "brand": "Herlab/她研社",
     "n": 20,
     "pct": 80.0,
     "note": ""
    },
    {
     "brand": "FREEMORE/自由点",
     "n": 19,
     "pct": 26.32,
     "note": ""
    },
    {
     "brand": "SOFY/苏菲",
     "n": 19,
     "pct": 89.47,
     "note": ""
    },
    {
     "brand": "洛蕾诗",
     "n": 19,
     "pct": 15.79,
     "note": ""
    },
    {
     "brand": "whisper/护舒宝",
     "n": 18,
     "pct": 66.67,
     "note": ""
    },
    {
     "brand": "妇炎洁",
     "n": 16,
     "pct": 56.25,
     "note": ""
    },
    {
     "brand": "朵薇",
     "n": 5,
     "pct": 20.0,
     "note": "样本不足（n<12），只报 n"
    }
   ],
   "er_test": {
    "kind": "MWU",
    "field": "taboo_direct",
    "code": true,
    "label": "直白谈私处/月经",
    "n1": 71,
    "n0": 50,
    "er1": 0.0253,
    "er0": 0.0129,
    "p": 0.12754366127180738,
    "q": 0.21817899214508277,
    "sig": false,
    "direction": "up"
   },
   "er_summary": "与互动率的关系：命中组互动率中位 0.0253 vs 未命中组 0.0129（n=71/50），q=0.2182 → **未达显著**",
   "seg_summary": "子赛道差异：经期用品 62.96% vs 私处护理 49.09%，q=0.1577 → **未达显著**",
   "definition": "taboo_direct = 视频中直接使用医学/直白词汇谈论私处或月经（外阴、阴道、月经、经血、分泌物、菌群…），而不是全程只用「大姨妈/那几天/下面」这类代称；判 true 必须有原话证据。"
  },
  "er_tests": {
   "euphemism_any": {
    "kind": "MWU",
    "field": "euphemism_any",
    "code": true,
    "label": "出现私处/月经代称",
    "n1": 79,
    "n0": 42,
    "er1": 0.0108,
    "er0": 0.0332,
    "p": 6.1313554799898175e-06,
    "q": 3.369139533529078e-05,
    "sig": true,
    "direction": "down",
    "strat": {
     "by_brand_p": 0.4568,
     "by_seg_p": 0.0012,
     "by_vv_band_p": 0.0,
     "by_fans_band_p": 0.0061,
     "brand_robust": false,
     "seg_robust": true
    },
    "interpretation": "全样本上「出现私处/月经代称」的互动率中位 0.0108 vs 0.0332（q=0.0000）；按品牌分层后 p=0.4568、按子赛道分层后 p=0.0012，**分层后不再显著 —— 该差异主要由品牌/子赛道构成解释（两个子赛道的互动率水平本身就差好几倍），不构成内容建议**。"
   },
   "explicit_any": {
    "kind": "MWU",
    "field": "explicit_any",
    "code": true,
    "label": "出现直白医学词",
    "n1": 89,
    "n0": 32,
    "er1": 0.022,
    "er0": 0.0117,
    "p": 0.23867787715231015,
    "q": 0.35099687816516195,
    "sig": false,
    "direction": "up"
   },
   "spearman_term_count": {
    "var": "euphemism_n",
    "label": "私处/月经代称词数量",
    "n": 121,
    "rho": -0.14,
    "p": 0.12013048292722955,
    "sig": false,
    "q": 0.1442
   },
   "summary": [
    "用委婉代称 × 互动率：命中组互动率中位 0.0108 vs 未命中组 0.0332（n=79/42），q=0.0000 → **显著**；品牌内分层 p=0.4568",
    "用直白医学词 × 互动率：命中组互动率中位 0.022 vs 未命中组 0.0117（n=89/32），q=0.3510 → **未达显著**",
    "代称词数量 × 互动率：Spearman ρ=-0.14，q=0.1442 → 未达显著"
   ],
   "note": "这些检验与 C 块同属一个 FDR 家族（在 C 块统一校正），此处只引用结果。"
  },
  "wordlist": {
   "explicit": [
    "外阴",
    "阴道",
    "阴部",
    "会阴",
    "尿道",
    "黏膜",
    "粘膜",
    "私处",
    "私密",
    "私护",
    "月经",
    "经血",
    "经期",
    "生理期",
    "经量",
    "血块",
    "恶露",
    "白带",
    "分泌物",
    "菌群",
    "细菌",
    "霉菌",
    "念珠菌",
    "真菌",
    "乳酸菌",
    "益生菌",
    "抑菌",
    "杀菌",
    "ph",
    "酸碱",
    "弱酸",
    "妇科",
    "炎症",
    "抗炎",
    "hpv",
    "排卵",
    "子宫",
    "盆底",
    "痛经",
    "转阴",
    "血",
    "卫生巾",
    "护垫",
    "安睡裤",
    "棉条",
    "卫生用品",
    "洗液",
    "护理液",
    "生理结构",
    "生理现象",
    "生理健康"
   ],
   "euphemism": [
    "花园",
    "那里",
    "那儿",
    "那边",
    "哪里",
    "这里",
    "下面",
    "下边",
    "那几天",
    "这几天",
    "姨妈",
    "例假",
    "来事",
    "来这个",
    "特殊日子",
    "亲戚",
    "三角区",
    "难言之隐",
    "特殊时期",
    "特殊那几天",
    "那个",
    "这事",
    "那事",
    "办完事",
    "来完事",
    "屁屁",
    "妹妹",
    "二妹",
    "秘密",
    "小角落",
    "咱那",
    "胯下",
    "隐私",
    "娇嫩的部位",
    "脆弱的部位",
    "内里肌肤",
    "二人世界",
    "红糖水",
    "spa",
    "专区专用",
    "亲密",
    "贴身"
   ],
   "overrides": {
    "菌菌": "euphemism",
    "小花儿": "euphemism",
    "咱们的环境": "euphemism",
    "自身的环境": "euphemism",
    "环境": "euphemism",
    "生理上": "explicit"
   },
   "rule": "归并规则写死在 female/xingtu/aggregate_seed.py 的 EUPH_WORDLIST：先查例外词表，再按「直白/医学关键词」子串匹配，再按「委婉/代称关键词」子串匹配，都不命中则归为「未归类」（多为体感/症状/情绪描述，如痒、异味、尴尬）。同一条视频里同一个原词只计一次；口径可争议之处（如「私处」既可视为规范直称、也可视为回避性说法）本脚本一律按「直白」处理，词表全量公开，可自行重算。",
   "disclose": "词表与归并规则在此全量公开，页面可直接展示；对任何一条归类有异议都可以改词表后重跑脚本复算。"
  },
  "verdict": "95.59% 的女性向样本里出现了指代私处/月经的原词，平均每条 3.46 个；按词次看「委婉代称」占 40.21%、「直白医学词」占 44.89%。",
  "caveat": [
   "原词由多模态模型逐字抄录，可能漏收（尤其是字幕一闪而过的），因此**命中率是下限**，不能读成「有 X% 的视频完全不提私处」。",
   "「委婉 vs 直白」的归并是本脚本的词表规则、不是行业标准；边界词（如「私处」「私密部位」）归为直白类，换个口径结论会变，词表已全量输出可自行复算。",
   "未归类的一类主要是体感/症状/情绪描述（痒、异味、尴尬），既不是部位也不是生理事件的称呼，如实单列、不硬塞进两类里。"
  ]
 },
 "limitations": [
  "样本非普查：136 条标注 / 2903 条总体视频，且按「每品牌投放金额 TOP20」刻意超配头部，样本层面的播放量与互动率水平**不可外推为总体**，只可用于比较内容结构。",
  "口径限定在直客 × 美妆日化行业的星图订单：看板 31 个品牌中 8 个在本窗口 0 单（草本伊、uutri/由趣、PETAL STORY、由意…），这些品牌在本模块中完全不可见，不能因此判断它们「没做种草」。",
  "B 块两组的品牌**完全嵌套**在子赛道内（一个品牌只属于一个子赛道），男版那种「品牌内 CMH 分层」在这里不可识别；已改用留一品牌法 + 粉丝量级分层 CMH 做稳健性，但子赛道差异与品类、品牌构成差异**在原理上无法完全分离**。",
  "字段一致性：主语气 77%、受众性别 100%、钩子类型 83%、内容体裁 100%；一致率偏低的字段只解读方向与量级，不解读精确百分点。",
  "GMV/电商订单量字段非空率仅 42.3%，且 0 无法区分「真 0」与「未回传」，可用样本 43 条，本模块**不给出任何「什么讲法更能卖货」的结论**；效果侧只有互动率一个指标，它衡量的是「被看到之后的反应」，不是生意结果。",
  "未做含品牌固定效应的多元回归（n 不足以支撑），混淆控制只做到单变量检验 + 分层敏感性；分层后不显著 ≠ 效应不存在，但同样**不能声称效应存在**。",
  "合规视图基于抽样命中原词，判定属内容分析、不构成法律意见；抑菌/杀菌与械字号类宣称已单列为「需资质核查」，是否违规取决于品牌实际持有的资质，脚本无法判断。",
  "euphemism_terms 的「委婉 vs 直白」归并采用脚本内置词表（已全量输出），边界词（如「私处」）的归类会影响结论量级；同时原词依赖模型逐字抄录，存在漏收，命中率应读作下限。",
  "structure_timeline（D 块）的 stage 切分未纳入双跑一致性测试，可靠度低于单选字段，只作量级参考。",
  "标注任务仍在后台推进（当前 136 条），本文件所有数字随重跑而变；引用时请带上生成时间 2026-09-07 21:57。"
 ],
 "not_concluded": [
  "不能说「经期用品赛道比私处护理赛道更敢直说」 —— 本数据不支持（q=0.16，未达显著）。",
  "不能说「某个子赛道更强调省事便捷」 —— 本数据不支持（q=0.82，未达显著）。",
  "即便是 C 块里分层后仍稳健的 3 项，也只能当作「值得 A/B 验证的假设」，不能说「换成这个讲法就会涨互动」—— 观测数据不能给因果。",
  "不能说「什么讲法更能卖货」—— GMV 可用样本 43 条、检验后无一显著，本模块不做 GMV 结论。",
  "不能给出任何品牌的整体合规评价 —— 每个品牌只有 20 条抽样，且人工复核仅覆盖已复核部分；命中原词只代表「值得核查」，抑菌类宣称更是取决于品牌是否持消字号资质。",
  "不能把本模块任何数字用于描述「女性经期/私护消费大盘」或看板 31 个品牌整体 —— 口径只有直客 × 美妆日化的星图订单，且 8 个品牌 0 单。",
  "不能用样本里的互动率水平去评价达人或品牌的投放效率 —— 抽样刻意偏头部投放，互动率与播放量强负相关，样本水平系统性偏离总体。"
 ]
};
if (typeof module !== "undefined" && module.exports) { module.exports = window.SEEDING; }
