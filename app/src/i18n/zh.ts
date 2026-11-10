// 简体中文界面文本：与 `en.ts` 同构（键缺失或多余都会让构建失败），采用中国大陆的日期与数字习惯（见 `index.ts`）。
// 中文名词不分单复数，所以带计数的句子不区分"1 个"和"多个"——同一中文形式复用。

import type {
  CheckKey,
  Entity,
  ExportEntity,
  ExportFormat,
  GraphicsCounts,
  MassOperationKind,
  MassPreview,
  PlayerSort,
  SquadSort,
  StaffSort,
  Storefront,
} from "../types";
import type { ErrorTexts, Strings } from "./en";
import { fieldName } from "./fieldNames";

const numbers = new Intl.NumberFormat("zh-CN");
const percents = new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 1 });

const format = (value: number) => numbers.format(value);

const changeCount = (count: number) =>
  count === 0 ? "无变更" : count === 1 ? "1 处变更" : `${format(count)} 处变更`;

const playerCount = (count: number) => (count === 1 ? "1 名球员" : `${format(count)} 名球员`);

const valuesLeftAlone = (count: number) =>
  count === 1 ? "1 项值未改动" : `${format(count)} 项值未改动`;

const entityCount: Record<Entity, (count: number) => string> = {
  player: (count) => `${format(count)} 名球员`,
  staff: (count) => `${format(count)} 名工作人员`,
  club: (count) => `${format(count)} 家俱乐部`,
};

const entityNouns: Record<Entity, string> = { player: "球员", staff: "工作人员", club: "俱乐部" };

const SQUAD_STATUSES: Partial<Record<number, string>> = {
  1: "核心球员", 2: "重要球员", 3: "常规首发", 4: "轮换阵容",
  5: "冲击型替补", 7: "边缘球员", 9: "应急替补", 10: "准新星",
  11: "未来新星", 13: "小将", 14: "B 队常客", 15: "主力门将",
  16: "杯赛门将", 17: "国内杯赛门将", 20: "替补门将",
  21: "应急替补门将", 22: "多余球员",
};

const CONTRACT_TYPES: Partial<Record<number, string>> = {
  0: "非全职合同", 1: "全职合同", 2: "业余合同", 3: "青年合同",
  4: "无合同", 10: "最低薪水合同", 11: "高级合同",
};

const field = (key: string | undefined) => fieldName(zh, key ?? "");

const checkName = (key: string | undefined) => {
  const name = (zh.checks as Partial<Record<string, string>>)[key ?? ""] ?? key ?? "";
  return name;
};

const UNSUPPORTED: Partial<Record<string, string>> = {
  "a date can only be set": "日期字段只能设置具体值",
  "it is changed one person at a time": "每次只能修改一名球员",
  "the new value is not one of the game's own records of that kind":
    "新值不是游戏中该字段已有的记录",
  "the in-game date is not known": "当前游戏内日期未知",
};
const reload = "请重新读取数据后再试";
const STAFF_DEPARTMENTS: Partial<Record<string, string>> = {
  medical: "医疗部门", coaching: "教练班子", scouting: "球探部门",
};
const recordNoun = (entity: string | undefined) =>
  entity === "player" || entity === "staff" || entity === "club" ? entityNouns[entity as Entity] : "记录";
const jobName = (code: string | undefined) =>
  (zh.jobs as Partial<Record<number, string>>)[Number(code)] ?? code;

const CLAUSE_NAMES_ZH: Partial<Record<number, string>> = {
  0: "最低解约金条款", 1: "降级解约金条款", 2: "未升级解约金条款",
  3: "每年薪水递增", 4: "升级薪水递增", 5: "降级薪水递减",
  6: "俱乐部条款解约金（职位）", 8: "转会费百分比", 9: "转会利润百分比",
  10: "赛季里程碑进球奖金", 11: "联赛场次满一年续约（最后赛季）",
  12: "工资最高者条款", 13: "联赛场次达标涨薪",
  14: "顶级联赛升级涨薪", 15: "顶级联赛降级减薪",
  16: "最低解约金（外国俱乐部）", 17: "最低解约金（国内高等级联赛）",
  18: "最低解约金（国内俱乐部）", 19: "国家队出场涨薪",
  20: "赞助商承担工资比例", 21: "门票分成比例",
  22: "俱乐部可选续约", 23: "放弃教练职位补偿金",
  25: "联赛场次满一年续约（升级最后赛季）", 26: "联赛场次满一年续约（保级最后赛季）",
  27: "最低解约金（欧冠俱乐部）", 28: "MLS 保障合同条款",
  29: "升级后续约", 30: "伤病解约条款",
  31: "最低解约金（洲际赛事俱乐部）", 32: "出场费",
  33: "进球奖金", 34: "零失球奖金", 37: "国家队出场奖金",
  38: "未上场替补费", 39: "助攻奖金", 40: "赛季里程碑助攻奖金",
  41: "赛季里程碑进球助攻合并奖金", 54: "游戏中不显示 (54)",
  55: "生效的降级解约金条款", 56: "生效的未升级解约金条款",
  58: "游戏中不显示 (58)", 63: "游戏中不显示 (63)",
};

const CONCERN_MOTIVES_ZH: Partial<Record<number, string>> = {
  596: "未入选比赛名单",
  808: "认为队友受到不公对待",
  926: "不相信队友配得上他想要的出场时间",
};

const TRAIT_NAMES_ZH: readonly string[] = [
  "沿左路带球突破", "沿右路带球突破", "沿中路带球突破", "前插禁区",
  "插入空当", "有机会就前插", "短传为主", "频繁尝试威胁球",
  "远射", "大力射门", "巧射", "弧线球",
  "喜欢过人后射门", "喜欢反越位", "使用逆足", "贴身防守",
  "激怒对手", "和裁判争论", "背身拿球", "回撤接球",
  "二过一配合", "挑过门将", "控制节奏", "倒钩射门",
  "传中而不是射门", "不传身后球", "控球停顿", "把球趟过对手",
  "运球前先调整到右脚", "运球前先调整到左脚", "停球转身", "后插上",
  "尝试摆脱困境", "始终留守后场", "避免使用逆足", "尝试花式过人",
  "尝试远射任意球", "倒地铲抢", "不倒地铲抢", "内切",
  "贴近边路", "调动观众", "尝试第一时间射门", "尝试长传",
  "喜欢把球传到脚下", "大力任意球", "喜欢连续过人",
  "喜欢转移到另一侧", "巅峰期退役", "尽可能延长足球生涯",
  "擅长掷长界外球", "频繁带球", "很少带球",
  "尝试提升逆足", "站桩式中锋", "用长界外球发动反击",
  "克制远射", "左路内切", "右路内切",
  "早传中", "后场带球推进", "用脚控球",
];

const errors: ErrorTexts = {
  "edit.unknownField": (p) => `此处没有可编辑字段"${p.field}"。`,
  "edit.outOfRange": (p) => `${p.value} 不是有效的${field(p.field)}：取值范围 ${p.min} 到 ${p.max}。`,
  "edit.notADate": (p) => `${p.value} 不是${field(p.field)}的有效日期。`,
  "edit.notAChoice": (p) => `${p.value} 不是${field(p.field)}的合法取值。`,
  "edit.taken": (p) => `球衣号 ${p.value} 已被占用：${p.name ?? `UID ${p.uid}`}穿着它。`,
  "edit.unsupported": (p) => `${field(p.field)}不能那样改：${UNSUPPORTED[p.reason] ?? p.reason}。`,
  "edit.moved": (p) => `该${recordNoun(p.entity)}在游戏中发生了变化：${reload}。`,
  "edit.noRecord": (p) => `${field(p.field)}此处无法修改：它的记录缺失或校验未通过。`,
  "edit.unset": (p) => `${field(p.field)}在游戏中未设置，故未改动。`,
  "edit.implausible": (p) => `${field(p.field)}当前值 ${p.value} 超出合理范围；为安全起见未改动。`,
  "edit.notApplied": (p) => `${field(p.field)}：写入 ${p.wrote}，但回读为 ${p.read}。`,
  "edit.conflict": (p) => `${field(p.field)}现在是 ${p.found}，不是 ${p.expected}：游戏在此期间改了它。`,
  "move.outOfRange": (p) => `${p.value} 不是有效的${field(p.field)}：取值范围 ${p.min} 到 ${p.max}。`,
  "move.moved": (p) => `${recordNoun(p.entity)}在此期间发生了变化：${reload}。`,
  "move.notAClub": (p) => `"${p.club}"不是一家俱乐部。`,
  "move.freeAgent": () => "自由球员不需要转会。",
  "move.sameClub": (p) => `"${p.club}"是球员当前所在俱乐部。`,
  "move.onLoan": (p) => `球员仍租借在${p.club}。`,
  "move.notOnLoan": (p) => `球员并没有租借在${p.club}。`,
  "move.playerCoach": () => "球员兼教练不能转会，否则他的教练职位会失去。",
  "move.unusualContract": (p) => `"${p.club}"持有的合同非标准，游戏无法处理此类转会。`,
  "move.humanClub": (p) => `俱乐部"${p.club}"由玩家控制——FMLibreEditor 不能把球员转到玩家控制的俱乐部。`,
  "move.menAndWomen": () => "不能在男足和女足俱乐部之间转会。",
  "move.notListed": () => "球员没有被列入转会或租借名单。",
  "move.noRoom": (p) => `俱乐部"${p.club}"的一线队已满（${p.players} 人），没有空位接收球员。`,
  "move.changed": (p) => `"${p.player}"在此期间发生了变化：${reload}。`,
  "move.notApplied": (p) => `"${p.club}"在此期间发生了变化：${reload}。`,
  "sign.noPool": () => "当前没有可签约的自由球员。",
  "sign.poolFull": () => "俱乐部已满，不能再签自由球员。",
  "sign.noModel": () => "该俱乐部没有全职合同可以作为新合同的模板。",
  "sign.noDate": () => "游戏内日期未知，FMLibreEditor 无法创建合同。",
  "heal.notInjured": () => "该球员没有伤病。",
  "ban.notBanned": () => "该球员没有停赛。",
  "relation.missing": (p) => `"${p.name}"在游戏中不存在。`,
  "relation.noRoom": (p) => `游戏不给该${p.entity}增加此类记录。`,
  "relation.target": (p) => `不能用"${p.target}"替换"${p.name}"。`,
  "relation.same": (p) => `"${p.name}"已经存在。`,
  "relation.rule": (p) => `规则 ${p.rule} 尚未支持。`,
  "staff.you": () => "你就是这家俱乐部的经理。",
  "staff.unemployed": () => "该工作人员没有俱乐部，不需要转会。",
  "staff.role": (p) => `"${p.name}"已经是这家俱乐部的${p.role}。`,
  "staff.notListed": () => "该工作人员没有被列出换职。",
  "staff.noRoom": (p) => `${p.staff === "0" ? "俱乐部" : STAFF_DEPARTMENTS[p.department] ?? p.department}已满。`,
  "staff.job": (p) => `不能任命${jobName(p.job) ?? p.job}——游戏不允许。`,
  "staff.directorTaken": (p) => `${p.name ?? "其他人"}已是俱乐部体育总监。先给这位工作人员安排别的职务，或先调离${p.name ?? "那个人"}。`,
  "staff.managerTaken": (p) => `${p.name ?? "其他人"}已是俱乐部经理。先给这位工作人员安排别的职务，或先调离${p.name ?? "那个人"}。`,
  "staff.yourClub": () => "你就是这家俱乐部的经理。FMLibreEditor 不会取代你的位置。",
  "staff.noJob": () => "请选择他在俱乐部中的职务。",
  "staff.noModel": (p) =>
    p.staff === "0"
      ? "该俱乐部完全没有工作人员：保存中没有进行中联赛的俱乐部，游戏不为其生成记录。"
      : "该俱乐部没有任何全职合同可作为新合同模板。",
  "stadium.none": () => "该俱乐部没有球场。",
  "stadium.shared": (p) => `该名称被 ${p.holders} 处共用，不能单独改球场名称。`,
  "stadium.nameLength": (p) => `名称长度需在 ${p.min} 到 ${p.max} 个字符之间（UTF-8 编码 ${p.bytes} 字节，重音字符算 2 个）。`,
  "stadium.badName": () => "名称中包含游戏不接受的字符。",
  "squad.noTeam": () => "该俱乐部没有球队可选。",
  "captain.notInTeam": () => "此人不在当前球队。",
  "captain.unchanged": () => "已没有变化。",
  "session.notRunning": () => "FM 没有在运行。",
  "session.noSuchProcess": (p) => `没有找到进程 ${p.pid}（${p.exe}）。`,
  "session.severalRunning": (p) => `有 ${p.count} 个 ${p.exe} 实例在运行（PID ${p.pids}），无法自动选择。`,
  "session.pluginNotLoaded": () => "游戏插件 DLL 没有正确加载，Bridge 不可用。",
  "session.unsupportedEdition": (p) => `当前游戏版本"${p.edition}"不受支持。`,
  "session.unknownEdition": () => "无法识别游戏版本。",
  "session.playersNotFound": () => "无法在游戏内存中找到球员列表。",
  "memory.win32": (p) => `Windows ${p.operation} 失败：${p.code}。`,
  "memory.read": (p) => `读取失败：${p.code}。`,
  "memory.write": (p) => `写入失败：${p.code}。`,
  "memory.readOnly": () => "当前为只读模式，无法写入。",
  "memory.notWritable": () => "游戏内存已加保护，无法写入。",
  "memory.invalidPe": () => "无法识别游戏可执行文件。",
  "memory.invalidMachO": () => "无法识别游戏二进制。",
  "memory.mach": (p) => `macOS ${p.operation} 失败：${p.code}。`,
  "memory.posix": (p) => `POSIX ${p.operation} 失败：${p.code}。`,
  "memory.noBridge": () =>
    "macOS 不让 FMLibreEditor 进入游戏：游戏启动时没有加载 FMLibreEditor Bridge。请从 Steam 重新启动游戏。",
  "memory.bridge": (p) => `Bridge 错误：${p.reason}。`,
  "scout.noClub": () => "你在当前存档中没有执教俱乐部，没有球探对象。",
  "scout.noTactic": (p) => `无法从游戏中读取"${p.club}"的战术。`,
  "scout.notPlaced": () => "该球员不在战术的任何位置上。",
  "scout.unknownRole": (p) => `编辑器不认识位置"${p.role}"。`,
  "setup.steamRunning": () =>
    "Steam 正在运行，FM 的启动参数未被自动写入——Bridge 本身已安装。请先退出 Steam 再试，或手动在 Steam 中填写启动参数。",
  "setup.noSteamAccount": () => "没有登录 Steam 账户。",
  "setup.noLibrary": (p) => `没有找到 Steam 游戏库（${p.path}）。`,
  "setup.unknownConfig": (p) => `无法识别 Steam 配置（${p.path}）。`,
  "setup.io": (p) => `文件错误（${p.path}）：${p.error}。`,
  "app.internal": (p) => `内部错误：${p.reason}。`,
  "app.notConnected": () => "尚未连接游戏。",
  "app.notFound": (p) => `找不到${recordNoun(p.entity)}（UID ${p.uid}）。`,
  "app.dataChanged": () => "游戏数据在连接期间发生了变化，请重新连接。",
  "app.noChange": (p) => `"${p.id}"没有可撤销的变更。`,
  "app.alreadyUndone": () => "已撤销。",
  "export.failed": (p) => `无法写入文件：${p.reason}`,
  "export.notAllowed": (p) =>
    `FMLibreEditor 无权写入 ${p.folder}。若 macOS 提示访问 Documents，请到 系统设置 › 隐私与安全 › 文件与文件夹 中允许，然后重新导出。`,
  "export.noFolder": () => "导出目录不存在。",
  "export.notExported": () => "未能导出任何内容。",
  "export.openFailed": (p) => `无法打开文件：${p.reason}`,
  "guard.unknownBuild": () =>
    "FMLibreEditor 还没在此版本的游戏上做过验证，所以不会写入数据。点击顶部提示里的‘依然编辑’即可打开编辑。",
  "guard.failed": (p) =>
    `${checkName(p.check)}在此版本游戏中未通过校验，FMLibreEditor 保持原值不变。`,
  "mass.noOperations": () => "批量编辑至少需要一项操作。",
  "mass.tooMany": (p) => `共 ${p.count} 项，但一次最多处理 ${p.limit} 项。`,
  "mass.outOfDate": () => "预览后数据又变了，请重新预览。",
};

export const zh: Strings = {
  attributes: {
    corners: "角球", crossing: "传中", dribbling: "盘带", finishing: "射门",
    first_touch: "停球", free_kicks: "任意球", heading: "头球", long_shots: "远射",
    long_throws: "长界外球", marking: "防守", passing: "传球", penalty_taking: "点球",
    tackling: "抢断", technique: "技术",
    aggression: "侵略性", anticipation: "预判", bravery: "勇敢", composure: "镇定",
    concentration: "集中", decisions: "决断", determination: "决心", flair: "想象力",
    leadership: "领导力", off_the_ball: "无球跑动", positioning: "位置感", teamwork: "团队合作",
    vision: "视野", work_rate: "比赛投入",
    acceleration: "加速", agility: "灵活", balance: "平衡", jumping_reach: "弹跳",
    natural_fitness: "自然体质", pace: "速度", stamina: "耐力", strength: "力量",
    aerial_reach: "空中范围", command_of_area: "控制范围", communication: "沟通",
    eccentricity: "离奇程度", handling: "门将接控球", kicking: "门将踢球",
    one_on_ones: "单对单扑救", punching: "击出倾向", reflexes: "反应",
    rushing_out: "出击倾向", throwing: "门将手抛",
    consistency: "稳定性", dirtiness: "肮脏", important_matches: "大赛发挥",
    injury_proneness: "受伤倾向", versatility: "适应性",
    left_foot: "左脚", right_foot: "右脚",
  },

  staffAttributes: {
    attacking: "进攻训练", defending: "防守训练", fitness: "体能训练", goalkeeping: "门将训练",
    possession: "传控训练", set_pieces: "定位球训练", tactical: "战术训练", technical: "技术训练",
    working_with_youngsters: "青年培养",
    authority: "权威", determination: "决心", motivating: "激励能力", people_management: "人际管理",
    data_analysis: "数据分析", judging_ability: "判断球员能力", judging_potential: "判断球员潜力",
    judging_staff: "判断工作人员能力", negotiating: "谈判", tactical_knowledge: "战术知识",
    physiotherapy: "理疗", sports_science: "运动科学",
  },

  personality: {
    adaptability: "适应性", ambition: "野心", loyalty: "忠诚", pressure: "抗压能力",
    professionalism: "职业素养", sportsmanship: "体育道德", temperament: "情绪", controversy: "争议性",
  },

  positions: { gk: "GK", sw: "SW", dl: "DL", dc: "DC", dr: "DR", dm: "DM", ml: "ML", mc: "MC", mr: "MR", aml: "AML", amc: "AMC", amr: "AMR", st: "ST", wbl: "WBL", wbr: "WBR" },

  clubFacilities: {
    training: "训练设施", youth_facilities: "青年训练营", youth_coaching: "青年教练",
    youth_recruitment: "青年招募", corporate: "商务设施",
  },

  supporterTraits: {
    loyalty: "忠诚", passion: "热情", patience: "耐心",
    affluence: "财富", temperament: "脾气", expectations: "期望",
  },

  supporterMix: {
    hardcore: "死忠", core: "核心", family: "家庭球迷", fair_weather: "跟风球迷", corporate: "企业球迷", casual: "路人",
  },

  jobs: {
    1: "球员", 2: "教练", 4: "主席", 6: "体育总监", 10: "体育总监", 12: "理疗师", 14: "球探", 16: "经理",
    20: "助理教练", 22: "定位球教练", 26: "体能教练", 34: "门将教练", 38: "首席队医", 40: "运动科学主管",
    44: "首席球探", 46: "队医", 48: "运动科学家", 50: "首席理疗师", 58: "招募分析师", 60: "表现分析师",
    62: "首席表现分析师", 64: "青年发展主管", 66: "老板", 70: "主席", 86: "租借协调员", 88: "技术总监",
  },

  fields: {
    current_ability: "当前能力", potential_ability: "潜在能力", height: "身高（厘米）",
    date_of_birth: "出生日期", asking_price: "挂牌价", nation: "国籍",
    "reputation.home": "国内声望", "reputation.current": "当前声望", "reputation.world": "世界声望",
    "international.caps": "国家队出场", "international.goals": "国家队进球",
    "international.u21_caps": "U21 出场", "international.u21_goals": "U21 进球",
    condition: "体能", match_sharpness: "比赛状态", jadedness: "疲劳", morale: "士气",
    "contract.wage": "周薪", "contract.loyalty_bonus": "每周忠诚奖金",
    "contract.happiness": "满意度", "contract.playing_time_happiness": "出场时间满意度",
    "contract.unhappiness": "不满原因", "contract.expires": "合同到期", "contract.squad_number": "球衣号",
    "contract.squad_status": "球队地位", "contract.transfer_listed": "列入转会名单", "contract.loan_listed": "列入租借名单",
    "loan.expires": "租借到期", "loan.option_fee": "买断金额", "contract.job": "职务",
    "tie.nationality": "第二国籍", "tie.trainedInNation": "青训所在国", "tie.trainedAtClub": "青训所在俱乐部",
    "tie.workPermit": "工作许可豁免", club: "俱乐部", injuries: "伤病", bans: "停赛", retirement: "退役",
    clause: "合同条款", "clause.amount": "条款金额", "clause.condition": "条款条件",
    captain: "队长", vice_captain: "副队长", reputation: "声望",
    "facilities.training": "训练设施", "facilities.youth_facilities": "青年训练营",
    "facilities.youth_coaching": "青年教练", "facilities.youth_recruitment": "青年招募",
    "facilities.corporate": "商务设施",
    "finance.balance": "账户余额", "finance.transfer_budget": "转会预算", "finance.wage_budget": "薪资预算",
    "finance.total_wage_budget": "总薪资预算",
    "stadium.capacity": "球场容量", "stadium.name": "球场名称", "stadium.seating": "座席容量",
    "stadium.used": "使用容量", "stadium.expansion": "扩展容量",
  },

  profile: {
    close: "关闭球员信息", loading: "正在加载球员信息…",
    resize: "调整信息面板宽度", resizeHint: "拖动可调整面板宽度；双击恢复默认",
    none: "—",
    freeAgent: "自由球员", born: "出生日期",
    height: (cm: number) => `${cm} 厘米`, heightUnit: "厘米",
    uid: "UID", currentAbility: "当前能力", currentAbilityShort: "CA",
    potentialAbility: "潜在能力", potentialAbilityShort: "PA",
    potentialRange: "潜在能力设置为区间值",
    technical: "技术", goalkeeping: "门将", mental: "精神", physical: "身体",
    hidden: "隐藏属性", feet: "惯用脚", personality: "个性",
    raw: (raw: number, scale = 100) => `原始值 ${raw} / ${scale}`,
    lowerIsBetter: "越低越好", age: (age: number) => `年龄 ${age}`,
    positions: "位置", positionsSummary: (best: string) => `位置评分：${best}`,
    positionRatings: "位置评分",
    positionTiers: {
      natural: "自然", accomplished: "熟练", competent: "胜任", unconvincing: "勉强", ineffective: "不行",
    },
    positionTooltip: (position: string, rating: number, tier: string) => `${position} · ${rating} · ${tier}`,
    contract: "合同", wage: "周薪",
    wageNote: (converted: boolean): string =>
      converted
        ? "游戏以英镑存储；当前按 FM 自身汇率换算显示"
        : "游戏以英镑存储；可在设置中选择其他货币",
    signed: "签约日期", expires: "到期日", joined: "加盟日期",
    squadStatus: "球队地位",
    squadStatusName: (status: number) => SQUAD_STATUSES[status] ?? `状态 ${status}`,
    contractType: "合同类型",
    contractTypeName: (code: number) => CONTRACT_TYPES[code] ?? `类型 ${code}`,
    squadNumber: "球衣号", transferListed: "列入转会名单", loanListed: "列入租借名单",
    career: "职业生涯", internationalCaps: "国家队出场", internationalGoals: "国家队进球",
    u21Caps: "U21 出场", u21Goals: "U21 进球", askingPrice: "挂牌价", notSet: "未设置",
    reputation: "声望", reputationHome: "国内", reputationCurrent: "当前", reputationWorld: "世界",
    retirement: "退役", retires: "计划退役", noRetirement: "游戏未为他安排退役",
    keepPlaying: "阻止退役", keepingPlaying: "正在阻止…",
    keepPlayingTitle:
      "将他从游戏的退役计划中移除，并赋予习惯‘尽可能延长足球生涯’代替‘巅峰期退役’；变更可被撤销",
    morale: (value: number) => `${value} / 20`,
    traits: "习惯", noTraits: "无习惯",
    traitName: (bit: number) => TRAIT_NAMES_ZH[bit] ?? `习惯 ${bit}`,
    unhappiness: "不满原因", noUnhappiness: "没有让他不满的事",
    removeUnhappiness: "全部清除", removingUnhappiness: "清除中…",
    removeUnhappinessTitle: "清除他所有的不满原因；变更可被撤销",
    concernSince: (date: string) => `自 ${date} 起`,
    concernKind: (kind: number) => (kind === 1 ? "担忧" : kind === 2 ? "内部矛盾" : `类型 ${kind}`),
    concernMotive: (motive: number) => CONCERN_MOTIVES_ZH[motive] ?? `原因 ${motive}`,
    clauses: "奖金与条款", noClauses: "无奖金或条款", loyaltyBonus: "忠诚奖金",
    happiness: "满意度", playingTimeHappiness: "出场时间满意度",
    moodTitle: "FMRTE 风格显示：-100 到 100；游戏中用文字表示",
    clauseName: (kind: number) => CLAUSE_NAMES_ZH[kind] ?? `条款 ${kind}`,
    loan: "租借", loanAt: "租借自", loanParent: "属于", loanFrom: "来自", loanUntil: "至",
    loanNumber: "球衣号",
    recall: "召回", recallTitle: "将他召回到原俱乐部，租借立即结束。变更可被撤销",
    recallAgain: "再次召回",
    makePermanent: "转为永久", makePermanentTitle: "让他正式加盟租借中的俱乐部。变更可被撤销",
    recalledWaiting: "已召回 · 等待返回", endsTodayWaiting: "今日到期 · 等待返回",
    pendingTitle: (parent: string) => `今日是租借最后一天：在游戏内继续一天后他将回到 ${parent}。`,
    endPassed: (date: string) =>
      `租借原定 ${date} 到期，但游戏尚未让他返回。请重新召回，然后在游戏内继续一天。`,
    loanCanRecall: "可召回",
    loanCanRecallTitle: "原俱乐部是否可以召回他，游戏中的设定；此处的召回始终有效",
    loanCanTerminate: "可提前终止", loanCupMatches: "可参加杯赛", loanAgainstClub: "可对阵原俱乐部",
    loanOptionFee: "买断金额",
    loanOptionFeeTitle: "租借方俱乐部买断他需要支付的金额",
    loanMonthlyFee: "月度租借费",
    loanMonthlyFeeTitle: "租借方俱乐部按月支付给原俱乐部的费用",
    loanUnusedFee: "未使用月度租借费",
    loanUnusedFeeTitle: "他未被使用时俱乐部仍需支付的费用",
    clauseCondition: (kind: number, value: number) => {
      switch (kind) {
        case 10: return value === 1 ? "1 球" : `${value} 球`;
        case 40: return value === 1 ? "1 次助攻" : `${value} 次助攻`;
        case 41: return `${value} 球助攻合计`;
        case 19: return value === 1 ? "1 次国家队出场" : `${value} 次国家队出场`;
        case 11: case 13: case 25: case 26:
          return value === 1 ? "1 场联赛" : `${value} 场联赛`;
        case 22: case 29:
          return value === 1 ? "1 年" : `${value} 年`;
        case 3: case 4: case 5: case 8: case 9: case 14: case 15: case 20: case 21:
          return `${value}%`;
        default: return String(value);
      }
    },
    clauseExpires: (date: string) => `${date} 到期`,
    clauseExpiresAfter: (days: number) =>
      days === 1 ? "签约后 1 天到期" : `签约后 ${format(days)} 天到期`,
    clauseProfitShare: (percent: string, amount: string) => `利润超过 ${amount} 部分的 ${percent}`,
    clauseWage: (amount: string) => `每周 ${amount}`,
    moraleTitle: "游戏中以文字表示士气：0–10 消沉，15–20 极度开心",
    jadednessTitle: "比赛消耗程度：休息可恢复；-500 完全休息，数值越高越疲劳",
    noInjuries: "无伤病", unknownInjury: "未知伤病",
    injuryStarted: (date: string) => `始于 ${date}`, injuryBack: (dates: string) => `预计恢复 ${dates}`,
    heal: "治疗", healTitle: "立即治愈该球员所有伤病",
    noBans: "无停赛",
    banMatches: (matches: number) => matches === 1 ? "1 场" : `${format(matches)} 场`,
    banStarted: (date: string) => `自 ${date} 起`,
    liftBans: "解除", liftBansTitle: "立即解除该球员所有停赛",
    maxAttributes: "属性最大化",
    maxAttributesTitle: "将该球员所有属性调到最高：20，受伤倾向和肮脏调到 1",
    maxAttributesDone: (count: number) =>
      count === 0 ? "所有属性已在最高值" : `${changeCount(count)} 已写入`,
    maxAttributesUndone: (count: number) => count === 0 ? "无撤销" : `已撤销 ${changeCount(count)}`,
    undoMax: "撤销", undoMaxTitle: "把原来的属性值写回游戏",
    freezeAttributes: "冻结属性",
    freezeAttributesNote:
      "只要应用保持打开并连接，他的属性就不会下降：游戏削减的属性会被回写，训练提升仍然生效。此应用在当前存档中记忆该设置，下次连接时自动继续冻结。",
    maxStaffAttributesTitle: "将该工作人员所有属性调到最高：20",
    undoMaxStaffTitle: "把原来的属性值写回游戏",
    freezeStaffAttributesNote:
      "只要应用保持打开并连接，他们的属性就不会下降：游戏削减的属性会被回写，训练提升仍然生效。此应用在当前存档中记忆该设置，下次连接时自动继续冻结。",
    freezeFitness: "冻结体能",
    freezeFitnessNote:
      "只要应用保持打开并连接，他的体能和比赛状态就不会下降：游戏削减的会被回写，补充仍然生效，所以 100% 就保持 100%。此应用在当前存档中记忆该设置。",
    freezePositions: "冻结位置",
    freezePositionsInfo: "冻结位置有什么效果？",
    freezePositionsNote:
      "只要应用保持打开并连接，他的位置评分就保持不变：不会学到新位置，已有评分也不会升降。此应用在当前存档中记忆该设置。",
    you: "你", youTitle: "你在当前存档中控制的经理",
    id: "ID", job: "职务",
    changeJob: "更换职务", changeJobTitle: "在游戏中给这位工作人员安排另一个职务",
    newJob: "新职务", applyJob: "应用", cancelJob: "取消",
    unemployed: "失业", coaching: "教练能力", knowledge: "知识", medical: "医疗",
    playerCoach: (job: string) => `${job}（球员兼教练）`,
    unknownJob: (code: number) => `职务 ${code}`,
  },

  playerList: {
    nav: "球员", count: (total: number) => `${format(total)} 名球员`,
    search: "按姓名或 UID 搜索球员",
    summary: (total: number, shown: number, sorted: { by: string; ascending: boolean } | null) => {
      const count = `${format(total)} 名球员`;
      if (total <= shown) return count;
      return sorted === null
        ? `${count} · 当前显示前 ${shown} 名（按当前能力）`
        : `${count} · 按${sorted.by}${sorted.ascending ? "升序" : "降序"}显示前 ${shown} 名`;
    },
    empty: (query: string, filtered: boolean) => {
      if (query === "") return filtered ? "没有球员符合筛选条件。" : "没有找到球员。";
      return filtered ? `没有球员"${query}"符合筛选条件。` : `没有找到"${query}"。`;
    },
    columns: {
      name: "姓名", age: "年龄", positions: "位置", nation: "国籍", club: "俱乐部",
      contractExpires: "合同到期", born: "出生日期", currentAbility: "CA", potentialAbility: "PA", uid: "UID",
    } satisfies Record<PlayerSort | "positions" | "born" | "uid", string>,
    sortBy: (by: string) => `按 ${by} 排序`,
    sortNames: {
      currentAbility: "当前能力", potentialAbility: "潜在能力", age: "年龄", name: "姓名",
      nation: "国籍", club: "俱乐部", contractExpires: "合同到期",
    } satisfies Record<PlayerSort, string>,
    filters: {
      toggle: "筛选", toggleActive: (count: number) => `筛选，已启用 ${count} 项`,
      clear: "清除", any: "全部", position: "位置", gender: "性别", men: "男", women: "女",
      age: "年龄", minAge: "最小年龄", maxAge: "最大年龄",
      minPlaceholder: "最小", maxPlaceholder: "最大",
      minCurrentAbility: "最低 CA", minCurrentAbilityTitle: "最小当前能力",
      minPotentialAbility: "最低 PA", minPotentialAbilityTitle: "最小潜在能力",
      abilityPlaceholder: "1–200", nation: "国籍", club: "俱乐部",
      freeAgentsOnly: "仅自由球员", contractEndsBy: "合同到期截止日",
      transferListedOnly: "仅列入转会名单", loanListedOnly: "仅列入租借名单",
      attributes: {
        heading: "属性", attribute: "属性", pick: "选择属性",
        min: (name: string) => (name ? `${name} 最低` : "最低"),
        max: (name: string) => (name ? `${name} 最高` : "最高"),
        add: "添加属性", remove: (name: string) => (name ? `移除 ${name}` : "移除本行"),
      },
      saved: {
        save: "保存", saveTitle: "保存当前筛选与排序",
        name: "筛选名称", namePlaceholder: "筛选名称", ok: "确定", cancel: "取消",
        select: "已保存的筛选", delete: "删除", deleteTitle: (name: string) => `删除筛选：${name}`,
        replaceQuestion: (name: string) => `"${name}"已存在，是否替换？`, replace: "替换",
        full: (max: number) =>
          `最多可保存 ${max} 个筛选。请先删除一个，或用现有名称替换。`,
      },
    },
  },

  staffList: {
    nav: "工作人员", count: (total: number) => `${format(total)} 名工作人员`,
    search: "按姓名或 ID 搜索工作人员",
    summary: (total: number, shown: number, sorted: { by: string; ascending: boolean } | null) => {
      const count = `${format(total)} 名工作人员`;
      if (total <= shown) return count;
      return sorted === null
        ? `${count} · 当前显示前 ${shown} 名（按当前能力）`
        : `${count} · 按${sorted.by}${sorted.ascending ? "升序" : "降序"}显示前 ${shown} 名`;
    },
    empty: (query: string, filtered: boolean) => {
      if (query === "") return filtered ? "没有工作人员符合筛选条件。" : "没有找到工作人员。";
      return filtered ? `没有工作人员"${query}"符合筛选条件。` : `没有找到"${query}"。`;
    },
    columns: {
      name: "姓名", age: "年龄", job: "职务", club: "俱乐部", nation: "国籍",
      born: "出生日期", currentAbility: "CA", potentialAbility: "PA", id: "ID",
    } satisfies Record<StaffSort | "job" | "born" | "id", string>,
    sortBy: (by: string) => `按 ${by} 排序`,
    sortNames: {
      currentAbility: "当前能力", potentialAbility: "潜在能力", age: "年龄", name: "姓名",
      nation: "国籍", club: "俱乐部",
    } satisfies Record<StaffSort, string>,
    filters: { job: "职务", anyJob: "全部", unemployedOnly: "仅失业" },
  },

  clubProfile: {
    womensClub: "女子俱乐部", founded: (year: number) => `成立于 ${year}`,
    reputationShort: "声望", reputationTitle: "俱乐部声望",
    tabsLabel: "俱乐部板块",
    tabs: { overview: "概况", squad: "阵容", stadium: "球场" },
    squadLocked: "请先结束编辑才能打开阵容",
    facilities: "设施", supporters: "球迷", supporterMix: "球迷结构",
    percent: (value: number) => `${percents.format(value)}%`,
    mixTooltip: (kind: string, percent: string) => `${kind} · ${percent}`,
    finances: "财务", balance: "账户余额", transferBudget: "转会预算",
    wageBudget: "薪资预算（支出）", totalWageBudget: "总薪资预算",
    ticketPrice: "平均票价", perWeek: "每周",
    noFinances: "FM 只为进行中联赛内俱乐部维护财务数据。",
    freeze: "冻结资金",
    freezeNote:
      "只要应用保持打开并连接，账户余额就不会下降：游戏支出的会被回写，收入仍然计。此应用在当前存档中记忆该设置，下次连接时自动继续冻结。",
    stadium: "球场", capacity: "容量", seating: "座席", used: "使用中",
    usedAll: "全部开放",
    usedTitle: "游戏允许使用的容量（关闭部分时少于总容量）；0 表示全部开放",
    expansion: "可扩展到",
    noStadium: "无法读取该俱乐部的球场信息。",
    stadiumName: "名称", rename: "重命名", renameTitle: "更改球场名称；立即写入，变更可被撤销",
    renameInfoLabel: "重命名是如何工作的？",
    renameInfo:
      "游戏存档中不存球场名称——每次加载存档时从数据库读取。所以 FMLibreEditor 在当前存档中记忆新名称，并在游戏加载的几秒钟内覆盖回来，只要应用保持打开并连接。如果应用关闭时游戏加载存档，会先显示游戏原名称，待应用重新连接后再覆盖回来。要恢复原名，在变更中撤销，或把名称改回去。",
    saveName: "保存", renaming: "保存中…", cancelRename: "取消",
    nameLength: (bytes: number, min: number, max: number) =>
      min <= 1
        ? `${bytes} 字符（最多 ${max}，重音字符算 2 个）`
        : `${bytes} 字符：需要 ${min}–${max} 个（重音字符算 2 个）`,
    nameShared: (holders: number) => `${holders} 处共用此名称，不能单独改球场的`,
    info: "俱乐部信息", seasonTickets: "季票持有", socialMedia: "社交媒体粉丝",
  },

  clubList: {
    nav: "俱乐部", count: (total: number) => `${format(total)} 家俱乐部`,
    search: "按名称或 UID 搜索俱乐部",
    summary: (total: number, shown: number) =>
      total > shown
        ? `${format(total)} 家俱乐部 · 按声望显示前 ${shown} 名`
        : `${format(total)} 家俱乐部`,
    empty: (query: string, filtered: boolean) => {
      if (query === "") return filtered ? "没有俱乐部符合筛选条件。" : "没有找到俱乐部。";
      return filtered ? `没有俱乐部"${query}"符合筛选条件。` : `没有找到"${query}"。`;
    },
    women: "女足",
    columns: { name: "名称", reputation: "声望", founded: "成立年份", uid: "UID" },
    filters: { kind: "显示的俱乐部", all: "全部", men: "男足", women: "女足" },
  },

  app: {
    stage: "beta",
    settingsLabel: "设置", languageLabel: "语言", currencyLabel: "货币",
    noteEditable: "修改只有在点击应用后才会写入游戏。请先备份存档。",
    noteReadOnly: "只读：Windows 不允许 FMLibreEditor 写入游戏。",
    noteUnknownBuild: "只读：此版本游戏 FMLibreEditor 还未验证过。",
    noteNotConnected: "只有执行修改并应用后游戏才会变化。",
    notConnected: "未连接", previewTag: "浏览器预览 · 示例数据",
    noDate: "无游戏内日期",
    noDateTitle:
      "此版本游戏无法读取游戏内日期，因此不显示年龄，按年龄筛选也找不到任何人。请检查更新。",
    reload: "重新读取数据", refresh: "刷新",
    detecting: "正在查找 Football Manager…",
    connecting: "正在读取球员、工作人员与俱乐部…",
    reloading: "正在重新读取球员、工作人员与俱乐部…",
    refrozen: {
      title: "恢复上次冻结设置", waitingTitle: "冻结设置暂未生效",
      players: (names: string) => `属性：${names}`, staff: (names: string) => `工作人员属性：${names}`,
      clubs: (names: string) => `资金：${names}`, fitness: (names: string) => `体能：${names}`,
      positions: (names: string) => `位置：${names}`, stadiums: (names: string) => `球场名称：${names}`,
      more: (count: number) => `等 ${format(count)} 个`,
      waiting: (count: number) =>
        `${count === 1 ? "1 项" : `${format(count)} 项`}已记忆但暂未冻结：当前版本游戏还不支持写入。`,
      dismiss: "忽略",
    },
    freezeInfo: {
      label: "冻结是如何工作的？",
      note:
        "冻结不会永久改变游戏：每 2 秒 FMLibreEditor 把游戏削减的值回写回来。所以它只有在应用打开并连接时生效；关闭应用后游戏就会重新改回去。此应用在当前存档中记忆冻结设置，下次连接时自动继续。",
    },
    connect: {
      title: "连接 Football Manager 27",
      intro: "FMLibreEditor 在游戏运行时读取其内存。启动游戏并加载存档后，点击连接。",
      notRunning: "Football Manager 27 未运行。",
      openFailed: (error: string) => `无法打开游戏：${error}`,
      game: "游戏", gameData: "游戏数据", loaded: "已加载",
      stillLoading: "仍在加载；请等待主菜单",
      process: "进程", pid: (pid: number) => `pid ${pid}`,
      several: "有多个游戏实例在运行；使用第一个。",
      button: "连接并读取球员、工作人员与俱乐部",
      bridge: {
        title: "Bridge（macOS）",
        intro:
          "macOS 不让一个应用读取另一个应用的内存，所以 FM27 需要自己把内存交出来。它加载 FMLibreEditor Bridge 库（不改变游戏本身），FMLibreEditor 就能读和写。Steam 的启动参数会让 FM27 自动加载它。",
        library: "Bridge", installed: "已安装", missing: "未安装",
        launchOption: "启动参数", set: "已在 Steam 设置", notSet: "未设置",
        ready: "已配置。从 Steam 启动 FM27（如正在运行请先退出），加载存档后再连接。",
        steamRunning:
          "Steam 正在运行，启动参数要等它关闭时才能写入。请先退出 Steam 再让应用自动设置，或手动填写。",
        setUp: "配置 Bridge", remove: "移除 Bridge",
        manual: "或者，在 Steam 中右键 Football Manager 27 › 属性 › 常规 › 启动选项，填入：",
        copy: "复制", copied: "已复制",
      },
    },
  },

  graphics: {
    reading: "正在读取图形包…",
    summary: ({ clubLogos, flags, faces }: Pick<GraphicsCounts, "clubLogos" | "flags" | "faces">) =>
      `图形：${format(clubLogos)} 个俱乐部徽章 · ${format(flags)} 面旗帜 · ${format(faces)} 张头像`,
    none: "未找到任何图形包", noneHint: "FM27 的图形包放在其 graphics 目录中。",
  },

  compatibility: {
    unknownBuild: (game: string) => `FMLibreEditor 还没在 ${game} 上做过验证`,
    unknownBuildText:
      "游戏可能更新过了。FMLibreEditor 找到了游戏数据并做了校验，但它不会在未测试版本上写入，除非你允许。新版本通常几天内就会跟进。",
    allowedText: "本次会话中已开启编辑（在允许范围内）。请保持存档备份。",
    failedTitle: "部分游戏数据未通过校验",
    reloadHint: "如果存档仍在加载中，请重新读取数据后再次校验。",
    noDate: "游戏内日期未通过校验，因此不显示年龄。",
    failed: (names: string) => `保持只读：${names}。`,
    join: (names: string[]) =>
      names.length <= 1 ? names.join("") : `${names.slice(0, -1).join("、")}和${names[names.length - 1]}`,
    allow: "依然编辑", allowTitle: "在关闭或重新连接前保持编辑开启。请先备份存档。",
  },

  checks: {
    gameDate: "游戏内日期", players: "球员详情", positions: "位置", attributes: "属性",
    personality: "个性", liveValues: "体能、比赛状态、疲劳与士气",
    contracts: "合同", teams: "球队", staff: "工作人员", clubs: "俱乐部",
  } satisfies Record<CheckKey, string>,

  update: {
    available: (version: string) => `FMLibreEditor ${version} 已发布`,
    youHave: (version: string) => `当前版本：${version}。`,
    download: "下载", install: "更新",
    installTitle: "下载并安装新版本；FMLibreEditor 会自动关闭并重新启动",
    preparing: "准备中…",
    downloading: (percent: number | null) =>
      percent === null ? "下载中…" : `下载中… ${percent}%`,
    installing: "正在安装：FMLibreEditor 会自动关闭并重新启动。",
    installFailed: (reason: string) => `无法更新：${reason}。请到发布页手动下载。`,
    notInstallable: "此版本无法自动安装。请到发布页手动下载。",
    later: "稍后", check: "检查更新", checking: "正在检查更新…",
    upToDate: "已是最新版本。", failed: "无法检查更新。",
  },

  edit: {
    unknownNation: "未知国籍", edit: "编辑",
    editTitle: "修改此页面的数值",
    startFailed: (reason: string) => `无法开始编辑：${reason}`,
    positionRating: (position: string) => `${position} 评分`,
    was: (value: string) => `原值 ${value}`,
    invalid: (min: number, max: number) => `请输入 ${min} 到 ${max} 之间的整数`,
    invalidDate: (from: string, to: string) => `请输入 ${from} 到 ${to} 之间的日期`,
    invalidMoney: (from: string, to: string) => `请输入 ${from} 到 ${to} 之间的整数金额`,
    invalidPercentage: (from: string, to: string) => `请输入 ${from} 到 ${to} 之间的整数百分比`,
    percent: "%", yes: "是", no: "否", none: "无",
    footer: "编辑中", changes: changeCount, invalidCount: (count: number) => `${count} 项无效`,
    review: "查看变更", reviewList: "待应用的变更",
    discard: "放弃", apply: "应用", applying: "应用中…",
    applyBlocked: "请先修正无效值", done: "完成",
    confirmDiscard: (count: number) => `放弃 ${changeCount(count)}？`,
    keepEditing: "继续编辑",
    applied: (count: number) => `已应用 ${changeCount(count)}`,
    nothingToChange: "没有需要变更的：游戏中已经是这些值。",
    refused: (label: string, reason: string) => `${label}：${reason}`,
    rereadFailed: (reason: string) => `无法回读数值：${reason}`,
    dismiss: "忽略",
  },

  changes: {
    nav: "变更", title: "本次会话的变更",
    hint: "按时间倒序。一项变更只有在游戏仍保留它写入的值时才可撤销。",
    continueHint: "变更只有在游戏继续一次后才会在游戏中体现：在游戏内按继续。",
    swappedWith: (name: string) => `与 ${name} 互换`,
    released: (name: string) => `${name} 被解约`,
    fee: (amount: string) => `转会费 ${amount}`,
    optionRemoved: (amount: string) => `买断权（${amount}）已移除`,
    healed: (count: number) => count === 1 ? "治愈 1 项伤病" : `治愈 ${format(count)} 项伤病`,
    lifted: (count: number) => count === 1 ? "解除 1 场停赛" : `解除 ${format(count)} 场停赛`,
    keptPlaying: (date: string | null) => date === null ? "继续踢球" : `阻止于 ${date} 退役`,
    count: (total: number, undone: number) => {
      const count = changeCount(total);
      return undone === 0 ? count : `${count} · ${undone} 项已撤销`;
    },
    empty: "暂无变更。打开球员、工作人员或俱乐部并选择编辑，或在列表中使用批量编辑。",
    columns: { time: "时间", name: "名称", field: "字段", change: "变更", status: "状态" },
    kinds: { player: "球员", staff: "工作人员", club: "俱乐部" } satisfies Record<Entity, string>,
    stored: (change: string) => `原始存储：${change}`,
    undone: (time: string) => `${time} 撤销`,
    undo: "撤销", undoTitle: (label: string) => `把 ${label} 的原值写回游戏`,
    batch: "批量编辑",
    batchCount: (total: number, remaining: number) =>
      remaining === 0
        ? `${changeCount(total)} · 全部已撤销`
        : `${changeCount(total)} · ${format(remaining)} 项未撤销`,
    showChanges: "查看变更", hideChanges: "隐藏变更",
    undoBatch: "撤销本次批量编辑",
    undoBatchTitle: (remaining: number) =>
      `把本次批量编辑的原值全部写回游戏（${format(remaining)} 项仍在生效）`,
    pages: "分页", batchPages: "批量编辑变更分页",
    previous: "上一页", next: "下一页",
    range: (first: number, last: number, total: number) => `${format(first)}–${format(last)} / 共 ${format(total)}`,
  },

  export: {
    button: "导出",
    buttonTitle: {
      player: "把列表中显示的球员写入 CSV 或 JSON 文件（给表格或脚本用）",
      club: "把列表中显示的俱乐部写入 CSV 或 JSON 文件（给表格或脚本用）",
    } satisfies Record<ExportEntity, string>,
    title: { player: "导出球员", club: "导出俱乐部" } satisfies Record<ExportEntity, string>,
    scope: (entity: ExportEntity, count: number) =>
      count === 0
        ? `没有${entityNouns[entity]}符合搜索和筛选条件。`
        : `${entityCount[entity](count)}：按列表当前搜索与筛选顺序导出。`,
    formatLabel: "格式",
    formats: { csv: "CSV（逗号分隔）", csvSemicolon: "CSV（分号分隔）", json: "JSON" } satisfies Record<ExportFormat, string>,
    formatHints: {
      csv: "适合大多数表格软件和脚本",
      csvSemicolon: "适合用逗号作小数点的 Excel（土耳其语、西班牙语、德语等环境）",
      json: {
        player: "适合脚本：位置、属性、个性均为独立对象",
        club: "适合脚本：球迷、设施、球场、财务均为独立对象",
      } satisfies Record<ExportEntity, string>,
    },
    contents: {
      player:
        "包含每名球员的能力、位置与位置评分、属性（1–20 分制，含隐藏属性）、个性、声望、国家队出场和合同及条款，并带游戏内日期。金额以英镑计（游戏存储格式）。不改变游戏数据。",
      club:
        "包含每家俱乐部的声望、成立年份、季票持有、社交媒体粉丝、球迷结构与特征、设施、球场和财务（账户余额、转会预算、周薪支出、薪资预算与票价），并带游戏内日期。FM 只为进行中联赛内俱乐部维护财务数据。金额以英镑计（游戏存储格式）。不改变游戏数据。",
    } satisfies Record<ExportEntity, string>,
    export: "导出", exporting: "导出中…",
    done: (entity: ExportEntity, count: number, file: string) => `已导出 ${entityCount[entity](count)} 到 ${file}`,
    folder: (folder: string) => `位于 ${folder}`,
    skipped: (entity: ExportEntity, count: number) =>
      `读取过程中有 ${entityCount[entity](count)} 在游戏中发生了变化，已跳过。`,
    open: "打开", openTitle: "用系统默认程序打开该文件",
    show: "在文件夹中显示", showTitle: "在其所在文件夹中显示该文件",
    close: "关闭",
  },

  massEdit: {
    button: "批量编辑", buttonTitle: "批量修改列表中所有球员的数值，先预览再应用",
    title: { player: "批量编辑球员", staff: "批量编辑工作人员", club: "批量编辑俱乐部" } satisfies Record<Entity, string>,
    scope: (entity: Entity, total: number) => `当前列表显示的 ${entityCount[entity](total)}（搜索与筛选后的结果）`,
    scopeAll: (shown: number) => `已包含所有匹配项，不仅仅是屏幕上的前 ${format(shown)} 行。`,
    scopeNone: (entity: Entity) => `没有${entityNouns[entity]}符合搜索与筛选条件，没有可修改的内容。`,
    scopeTooMany: (entity: Entity, total: number, limit: number) =>
      `当前列表显示的 ${entityCount[entity](total)} 超过单次批量编辑上限（${format(limit)}）。请先缩小搜索或筛选范围。`,
    loadingFields: "正在读取字段…", fieldsFailed: (reason: string) => `无法读取字段：${reason}`,
    groups: {
      ability: "能力", technical: "技术属性", mental: "精神属性", physical: "身体属性",
      goalkeeping: "门将属性", hidden: "隐藏属性", feet: "惯用脚",
      coaching: "教练属性", knowledge: "知识属性", medical: "医疗属性",
      positions: "位置", personality: "个性", reputation: "声望", international: "国家队",
      contract: "合同", facilities: "设施", finances: "财务", stadium: "球场",
      traits: "习惯", health: "医疗", other: "其他",
    },
    fieldsLabel: "待修改字段",
    row: (position: number) => `第 ${position} 项修改`, field: "字段", operation: "操作",
    operations: { set: "设为", add: "相加", scale: "按百分比缩放" } satisfies Record<MassOperationKind["op"], string>,
    values: { set: "值", add: "数值", scale: "百分比" } satisfies Record<MassOperationKind["op"], string>,
    addTitle: "在显示值基础上相加；负数即相减",
    addPointsTitle: "以百分点相加（70% + 10 = 80%）；负数即相减",
    rangeHint: (min: number, max: number) => `${format(min)}–${format(max)}`,
    amountHint: (max: number) => `±${format(max)}`,
    ofCurrent: "% 当前值",
    percentTitle: "当前值的百分比：100 保持不变，110 增加十分之一，50 减半",
    invalidAdd: (min: number, max: number) => `请输入 ${format(min)} 到 ${format(max)} 之间的整数`,
    invalidPercent: (min: number, max: number) => `请输入 ${min} 到 ${max} 之间的整数百分比`,
    dateSetOnly: "日期字段只能设为具体值",
    addField: "添加字段", addFieldFull: (max: number) => `单次批量编辑最多修改 ${max} 个字段`,
    remove: "移除此字段", removeLast: "批量编辑至少需要一个字段",
    preview: "预览", previewing: "正在预览…", previewBlocked: "请先为每个字段填入有效值以预览",
    summary: (entity: Entity, preview: MassPreview) =>
      [
        preview.changes === 0
          ? "无变更"
          : `${changeCount(preview.changes)}，对 ${format(preview.targets - preview.unchanged)} / ${entityCount[entity](preview.targets)}`,
        preview.unchanged > 0 &&
          (preview.unchanged === 1 ? "1 项已是目标值" : `${format(preview.unchanged)} 项已是目标值`),
        preview.skippedCount > 0 && valuesLeftAlone(preview.skippedCount),
      ].filter(Boolean).join(" · "),
    tableLabel: "批量编辑将产生的变更",
    columns: { name: "名称", field: "字段", change: "变更", reason: "原因" },
    more: (count: number) => `等 ${format(count)} 项`,
    skippedHeading: valuesLeftAlone, skippedLabel: "未改动的项",
    apply: "应用", applying: "应用中…",
    applyTitle: (changes: number) => `把 ${changeCount(changes)} 写入游戏`,
    applyFirst: "请先预览批量编辑", applyNothing: "预览结果中没有待写入的变更",
    hint: "只有点击应用后游戏才会变化。",
    applied: (count: number) => count === 0 ? "没有任何变更被写入" : `已应用 ${changeCount(count)}`,
    failure: (name: string, label: string, reason: string) => `${name} · ${label}：${reason}`,
    undo: "撤销本次批量编辑", undoing: "撤销中…",
    undoTitle: "把本次批量编辑的原值全部写回游戏",
    undone: (count: number) => count === 0 ? "无撤销" : `已撤销 ${changeCount(count)}`,
    undoFailure: (who: string, reason: string) => `${who}：${reason}`,
    changeNumber: (id: number) => `第 ${id} 项变更`, close: "关闭",
  },

  comparison: {
    compare: "比较", add: "加入比较", remove: "移出比较",
    full: (max: number) => `最多同时比较 ${max} 名球员，请先移除一个。`,
    trayLabel: "待比较球员", removePlayer: (name: string) => `移出比较：${name}`,
    clear: "清空", open: (count: number) => `比较（${count}）`,
    title: "对比", hint: "每行中最好的值会高亮：越高越好，越低越好的属性反之。",
    tooFew: "请至少加入两名球员才能比较。", loading: "正在加载球员…",
    tableLabel: "球员数据", highest: "最高", lowest: "最低", profile: "基本信息", close: "关闭",
  },

  move: {
    button: "转会", buttonTitle: "把这名球员转会到另一家俱乐部（可设转会费）",
    title: "转会", from: "来自", to: "前往",
    modeLabel: "转会或互换", modeMove: "转会到俱乐部", modeSwap: "与球员互换",
    searchLabel: "搜索目标俱乐部", resultsLabel: "搜索到的俱乐部",
    searching: "正在搜索俱乐部…", searchFailed: (reason: string) => `无法搜索俱乐部：${reason}`,
    more: (count: number) => `等 ${format(count)} 家；输入关键词缩小范围`,
    change: "重新选择俱乐部",
    feeHeading: "转会费", fee: "转会费", feeHint: "留空即自由转会",
    feeInvalid: (max: string) => `请输入 0 到 ${max} 之间的整数金额`,
    pays: (club: string, fee: string, balance: string, budget: string | null) =>
      `${club} 支付 ${fee}：账户余额 ${balance}${budget === null ? "" : `，转会预算 ${budget}`}`,
    receives: (club: string, fee: string, balance: string) => `${club} 收到 ${fee}：账户余额 ${balance}`,
    noFinances: (club: string) => `${club} 没有游戏内财务记录：资金保持不变`,
    wageInvalid: "请输入 0 或以上的整数金额", expiresInvalid: "请输入日期",
    chooseClub: "选择球员转会的目标俱乐部。", fixTerms: "请先设定转会费或合同参数。",
    checking: "正在检查转会…",
    route: (from: string, to: string) => `${from} → ${to}`,
    doesHeading: "转会将产生的效果",
    does: [
      "加入新俱乐部的一线队",
      "合同签约日改为游戏当前日期；球衣号清空",
      "移出转会名单和租借名单",
      "周薪和合同到期日仅在你明确设置时才改变",
      "转会费从买方账户余额和转会预算中扣除，进入卖方账户余额",
      "原俱乐部的队长职务会被让出",
      "游戏转会历史暂不会记录",
      "变更会在'变更'视图中列出，一次撤销可回退转会和费用",
    ],
    noRoom: (club: string) => `${club} 的一线队已满。`,
    noRoomInfoLabel: "为什么？",
    noRoomInfo: "编辑器在可能的情况下会扩展一线队名单，但此处无法扩展：必须有球员离开以腾出空间。",
    noRoomNeed: (player: string, club: string) => `为让 ${player} 加盟，需要有人先离开 ${club}。`,
    releaseChoice: "解约：", releasePickLabel: "选择要解约的球员",
    releaseOutcome: "→ 成为自由球员",
    injuredTag: "有伤", captainTag: "队长",
    swapChoice: "改为互换：", swapChoiceOutcome: (club: string) => `此球员去 ${club}`,
    moveAndRelease: (name: string) => `转会并解约 ${name}`,
    makeRoomDoes: [
      "加入新俱乐部的一线队（替代被解约的球员）",
      "被解约的球员离开该俱乐部所有球队，合同终止，成为自由球员",
      "合同签约日改为游戏当前日期；球衣号清空",
      "移出转会名单和租借名单",
      "周薪和合同到期日仅在你明确设置时才改变",
      "转会费从买方账户余额和转会预算中扣除，进入卖方账户余额",
      "任何一方在离开俱乐部时担任的队长职务会被让出",
      "游戏转会历史暂不会记录",
      "变更会在'变更'视图中作为一次记录列出，一次撤销可回退转会、解约和费用",
    ],
    swapTitle: "与球员互换", swapWith: "与谁互换",
    playerSearchLabel: "搜索互换球员", playerSearch: "按姓名搜索该俱乐部球员",
    playersLabel: "搜索到的球员", playersSearching: "正在搜索球员…",
    playersSearchFailed: (reason: string) => `无法搜索球员：${reason}`,
    playersEmpty: (query: string) =>
      query === "" ? "该俱乐部没有球员。" : `该俱乐部没有"${query}"。`,
    changePlayer: "重新选择球员",
    swapContract: "双方各自保留原有合同；薪资和到期日均不变。",
    staffButtonTitle: "把这名工作人员转会到另一家俱乐部",
    staffChooseClub: "选择工作人员转会的目标俱乐部。",
    staffContract: "保留原职务、薪资和合同到期日；合同签约日改为游戏当前日期。",
    staffJob: "职务", staffJobChoose: "选择职务…",
    staffJobKept: (job: string) => `${job}（保持不变）`,
    staffNewJob: "担任新职务，保留薪资和合同到期日；合同签约日改为游戏当前日期。",
    staffDoes: [
      "加入新俱乐部对应部门：医疗、教练班子、球探部门，或体育总监/经理（已有者不能再安排）",
      "薪资和合同到期日保持不变；合同签约日改为游戏当前日期",
      "担任经理的工作人员离开球队后，该位置空出由游戏董事会处理",
      "变更会在'变更'视图中列出并可撤销",
    ],
    staffSignButtonTitle: "与这名无俱乐部的工作人员签约",
    staffSignTitle: "签约工作人员",
    staffSignChooseClub: "选择签约的目标俱乐部。",
    staffSignChooseJob: "选择他在俱乐部中的职务。",
    staffSignTerms: "留空时，薪资参考俱乐部中职务最相近的工作人员，合同到下赛季末。",
    staffSignRoute: (to: string) => `无俱乐部 → ${to}`,
    staffSignContract: (wage: string, expires: string) => `新合同：每周 ${wage}，至 ${expires}`,
    staffSignDoes: [
      "加入俱乐部对应部门（已满则扩展），或担任体育总监/经理（无先例时）",
      "以游戏当前日期为签约日，使用合同空闲槽位（游戏自身创建的格式）",
      "参考俱乐部中职务相同（或同部门、同能力最接近）的工作人员",
      "你设置的薪资和到期日会覆盖参考值；无奖金或条款",
      "变更会在'变更'视图中列出，一次撤销可回退全部",
    ],
    swapChooseClub: "选择互换球员所在俱乐部。", swapChoosePlayer: "选择互换的球员。",
    swapChecking: "正在检查互换…",
    swapRoute: (player: string, from: string, to: string, other: string) =>
      `${player}：${from} → ${to}\n${other}：${to} → ${from}`,
    swapDoesHeading: "互换将产生的效果",
    swapDoes: [
      "双方各自加入对方俱乐部一线队",
      "合同签约日改为游戏当前日期；球衣号清空",
      "双方均移出转会名单和租借名单",
      "原俱乐部的队长职务会被让出",
      "无转会费；职业生涯历史不更新",
      "变更会在'变更'视图中作为一次记录列出，撤销会同时回退两个转会",
    ],
    signButtonTitle: "与这名自由球员签约", signTitle: "签约自由球员",
    signChooseClub: "选择签约的目标俱乐部。", signChecking: "正在检查签约…",
    signTerms: "留空时，薪资参考俱乐部中能力最相近的球员，合同到下赛季末。",
    signRoute: (to: string) => `自由球员 → ${to}`,
    signContract: (wage: string, expires: string, status: string) =>
      `新合同：每周 ${wage}，至 ${expires}，地位 ${status}`,
    signDoesHeading: "签约将产生的效果",
    signDoes: [
      "加入俱乐部一线队；一线队已满时会扩展",
      "以游戏当前日期为签约日，使用合同空闲槽位（游戏自身创建的格式）",
      "合同类型和球队地位参考俱乐部中能力最相近的球员",
      "你设置的薪资和到期日会覆盖参考值",
      "无球衣号、忠诚奖金或条款",
      "游戏转会历史暂不会记录",
      "变更会在'变更'视图中列出，一次撤销可回退全部",
    ],
    signHint: "只有点击签约后游戏才会变化。",
    sign: "签约", signing: "签约中…",
    hint: "只有点击转会后游戏才会变化。",
    move: "转会", moving: "转会中…", cancel: "取消",
    swapHint: "只有点击互换后游戏才会变化。", swap: "互换", swapping: "互换中…",
  },

  ties: {
    heading: "国籍与青训",
    nationalities: "第二国籍", trainedInNation: "青训所在国", trainedAtClub: "青训所在俱乐部",
    workPermit: "工作许可豁免国", none: "无",
    rules: {
      1: "本土 15-21", 2: "本土 0-21", 5: "本土 15-21（不含租借）", 10: "本土 0-19（1 年）",
    } as Readonly<Record<number, string>>,
    rule: (code: number) => `本土规则 ${format(code)}`,
    change: "修改", changeTitle: "在游戏中修改该球员的第二国籍和本土状态",
    title: "国籍与青训",
    hint: "每项修改都会立即写入游戏，并在'变更'视图中列出，可撤销。",
    full: "游戏为此球员分配的列表刚好撑满：可修改或移除国籍/青训，但不能新增。",
    nationOf: (name: string) => `替代 ${name} 的国籍`,
    ruleOf: (name: string) => `${name} 的本土规则`,
    remove: "移除", removeTitle: (name: string) => `移除 ${name}`,
    addNationality: "添加国籍…", addNation: "添加国家…", addPermit: "添加豁免国…",
    daysLeft: (days: number) => `剩余 ${format(days)} 天`,
    permitInfoLabel: "这是什么？",
    permitInfo:
      "游戏允许英国脱欧前在英格兰/苏格兰的欧盟球员无需工作许可，持续若干天。设置此豁免后，该球员在该国同样无需许可，剩余天数与该国其他豁免球员相同（存档中无人时为 10 年）。",
    newRule: "新国籍的本土规则", add: "添加",
    changeClub: "更换俱乐部", changeClubTitle: (name: string) => `将青训俱乐部从 ${name} 改为另一家`,
    clubInsteadOf: (name: string) => `替代 ${name} 的俱乐部`,
    addClub: "添加俱乐部…", addClubTitle: "再添加一家青训俱乐部",
    newClub: "新俱乐部", pickAnother: "重新选择", newClubRule: "新俱乐部的本土规则",
    cancel: "取消", working: "正在写入游戏…", close: "关闭",
  },

  clauses: {
    change: "修改", changeTitle: "在游戏中修改该球员的奖金与条款",
    title: "奖金与条款",
    hint: "每项修改都会立即写入游戏，并在'变更'视图中列出，可撤销。",
    full: "游戏为此合同分配的列表刚好撑满：可修改或移除奖金/条款，但解约金条款不能新增。",
    amountOf: (name: string) => `${name} 的金额`,
    conditionOf: (name: string) => `${name} 的条件`,
    save: "保存", remove: "移除", removeTitle: (name: string) => `移除 ${name}`,
    addRelease: "添加解约金条款", releaseAmount: "新解约金条款的金额",
    add: "添加", outOfRange: (max: string) => `请输入 0 到 ${max} 之间的整数。`,
    working: "正在写入游戏…", close: "关闭",
  },

  release: {
    button: "解约", buttonTitle: "在游戏中把该球员从俱乐部解约（成为自由球员）",
    title: "解约", from: "离开", checking: "正在检查解约…", ready: (club: string) => `${club} → 自由球员`,
    doesHeading: "解约将产生的效果",
    does: [
      "离开俱乐部所有球队，合同终止，成为任意俱乐部可签的自由球员",
      "无任何费用",
      "原俱乐部的队长职务会被让出",
      "游戏转会历史暂不会记录",
      "变更会在'变更'视图中列出，一次撤销可按原合同回退",
    ],
    hint: "只有点击解约后游戏才会变化。",
    release: "解约", releasing: "解约中…", cancel: "取消",
  },

  permanent: {
    title: "将租借转为永久", stays: "留在", leaves: "离开", checking: "正在检查…",
    doesHeading: "将产生的效果",
    does: [
      "正式效力当前租借俱乐部，合同签约日改为今天，使用上述条款",
      "保留现有球衣号和球队地位",
      "离开原俱乐部所有球队，租借关系结束",
      "游戏转会历史暂不会记录",
      "变更会在'变更'视图中作为转会列出，一次撤销可恢复租借",
    ],
    optionFee: (money: string) => `按租借买断金额预填：${money}`,
    hint: "只有点击确认后游戏才会变化。",
    confirm: "转为永久", confirming: "正在转为永久…", cancel: "取消",
  },

  recall: {
    title: "召回", from: "租借自", to: "回到",
    doesHeading: "召回将产生的效果",
    does: (parent: string) => [
      "今日成为租借最后一天：继续一天游戏后游戏自身会结束租借",
      `在游戏内继续一天后他回到 ${parent}`,
      "在此之前变更会在'变更'视图中列出，撤销可恢复原到期日",
    ],
    termsHeading: "游戏中的限制",
    notRecallable: (parent: string) => `游戏不允许 ${parent} 召回他`,
    notTerminable: "游戏不允许提前终止租借",
    worksAnyway: "此处的召回始终有效：不走游戏的召回流程，而是直接调整租借到期日",
    dropsOption: (club: string, amount: string) =>
      `${club} 以 ${amount} 买断他的权利会被移除：否则租借到期后游戏可能自动把他卖给 ${club}`,
    hint: "只有点击召回后游戏才会变化。",
    confirm: "召回", confirming: "召回中…", cancel: "取消",
  },

  squad: {
    teamsLabel: "球队",
    teams: {
      first: "一线队", b: "B 队", age: (limit: number) => `U${limit}`, other: (place: number) => `球队 ${place}`,
    },
    noTeams: "该俱乐部没有球队。", loading: "正在读取阵容…", empty: "此球队没有球员。",
    players: (count: number) => count === 1 ? "1 名球员" : `${format(count)} 名球员`,
    averageAge: (age: string) => `平均年龄 ${age}`,
    captains: (captain: string, viceCaptain: string) => `队长：${captain} · 副队长：${viceCaptain}`,
    actionsLabel: "整队操作",
    healAll: (injured: number) => injured === 0 ? "全员治愈" : `全员治愈（${format(injured)} 名有伤）`,
    healAllTitle: "立即治愈本队所有球员的所有伤病", healNone: "本队没有受伤球员",
    liftAll: (banned: number) => banned === 0 ? "全员解禁" : `全员解禁（${format(banned)} 名停赛）`,
    liftAllTitle: "立即解除本队所有球员的所有停赛", liftNone: "本队没有停赛球员",
    inspireAll: "全员鼓舞",
    inspireAllTitle: "把本队所有球员的士气调到 20（最高）并移除所有不满原因",
    refreshAll: "全员刷新",
    refreshAllTitle: "把本队所有球员的体能和比赛状态调到 100%，并完全休息（疲劳 -500）",
    maxAll: "全员属性最大化",
    maxAllTitle: "把本队所有球员的属性调到最高：20，受伤倾向和肮脏调到 1",
    hint: "操作覆盖列表中的所有球员，包括租借在外的。撤销也在'变更'视图中。",
    freezeLabel: "冻结整队",
    freezeAttributes: "冻结属性",
    freezeAttributesTitle:
      "只要应用保持打开并连接，本队球员的属性就不会下降：游戏削减的属性会被回写，训练提升仍然生效",
    freezeFitness: "冻结体能",
    freezeFitnessTitle:
      "只要应用保持打开并连接，本队球员的体能和比赛状态就不会下降：游戏削减的会被回写。先执行全员刷新可以保持 100%",
    freezePositions: "冻结位置",
    freezePositionsTitle:
      "只要应用保持打开并连接，本队球员的位置评分就保持不变：游戏升降的评分会被回写",
    frozenCount: (frozen: number, total: number) => `${format(frozen)} / ${format(total)}`,
    freezeHint: "冻结覆盖列表中的所有球员，并随球员移动保持。此应用在当前存档中记忆该设置。",
    frozeAttributes: (count: number) =>
      count === 0 ? "他们的属性已经在冻结中" : `已冻结 ${playerCount(count)} 的属性`,
    unfrozeAttributes: (count: number) => `已解除 ${playerCount(count)} 的属性冻结`,
    frozeFitness: (count: number) =>
      count === 0 ? "他们的体能已经在冻结中" : `已冻结 ${playerCount(count)} 的体能`,
    unfrozeFitness: (count: number) => `已解除 ${playerCount(count)} 的体能冻结`,
    frozePositions: (count: number) =>
      count === 0 ? "他们的位置已经在冻结中" : `已冻结 ${playerCount(count)} 的位置`,
    unfrozePositions: (count: number) => `已解除 ${playerCount(count)} 的位置冻结`,
    written: (count: number) => `${changeCount(count)} 已写入`,
    refused: (name: string, reason: string) => `${name}：${reason}`,
    undo: "撤销", undoTitle: "把这些变更的原值写回游戏",
    captainShort: "C", viceCaptainShort: "VC",
    menuLabel: (name: string) => `${name} 的队长职务`, menuTitle: "队长职务",
    makeCaptain: "设为队长", makeViceCaptain: "设为副队长",
    nowCaptain: (name: string) => `${name} 现在是队长`,
    nowViceCaptain: (name: string) => `${name} 现在是副队长`,
    noCaptain: "现在没有队长", noViceCaptain: "现在没有副队长",
    tableLabel: (team: string) => `${team} 的球员`, openProfile: "打开球员信息",
    columns: {
      name: "姓名", position: "位置", age: "年龄", currentAbility: "CA", potentialAbility: "PA",
      condition: "体能", matchSharpness: "状态", jadedness: "疲劳", morale: "士气", actions: "队长",
    } satisfies Record<SquadSort | "actions", string>,
    sortBy: (by: string) => `按 ${by} 排序`,
    sortNames: {
      name: "姓名", position: "位置", age: "年龄", currentAbility: "当前能力",
      potentialAbility: "潜在能力", condition: "体能", matchSharpness: "状态",
      jadedness: "疲劳", morale: "士气",
    } satisfies Record<SquadSort, string>,
    injured: "有伤", injuredTitle: (count: number) => count === 1 ? "1 项伤病" : `${format(count)} 项伤病`,
    banned: "停赛", bannedTitle: (count: number) => count === 1 ? "1 场停赛" : `${format(count)} 场停赛`,
    onLoan: "租借中", onLoanTitle: "租借到其他俱乐部",
    loanee: "租借自他队", loaneeTitle: "从其他俱乐部租借来的",
    elsewhere: "他队", elsewhereTitle: "效力于本俱乐部的其他球队",
    frozen: "已冻结",
    frozenTitle: (attributes: boolean, fitness: boolean, positions: boolean): string => {
      const frozen = [
        ...(attributes ? ["属性"] : []),
        ...(fitness ? ["体能", "比赛状态"] : []),
        ...(positions ? ["位置"] : []),
      ];
      const last = frozen.pop() ?? "";
      const listed = frozen.length > 0 ? `${frozen.join("、")}和${last}` : last;
      return `他的${listed}已被冻结`;
    },
  },

  game: {
    name: "Football Manager",
    storefronts: { gamePass: "Game Pass", steam: "Steam", epic: "Epic Games", unknown: "未知商店" } satisfies Record<Storefront, string>,
    steamBuild: (id: string) => `构建 ${id}`,
  },

  scouting: {
    nav: "球探", reading: "正在读取你的俱乐部…", refresh: "刷新", refreshTitle: "重新从游戏读取俱乐部",
    searching: "搜索中…", none: "—", perWeek: "/周", openProfile: "打开球员信息",
    freeAgent: "自由球员", loan: "租借",
    header: {
      transferBudget: "转会预算", wageRoom: "薪资空间", wageBudget: "薪资预算",
      squad: "阵容", averageAge: "平均年龄",
      players: (count: number) => count === 1 ? "1 名球员" : `${format(count)} 名球员`,
    },
    tabs: { label: "球探板块", recommend: "转会建议", depth: "阵容厚度", departures: "可放走的球员" },
    status: { missing: "空缺", thin: "薄弱", fine: "正常", crowded: "冗余" },
    lines: {
      goalkeeper: "门将", centreBack: "中后卫", fullBack: "边后卫", wingBack: "翼卫",
      defensiveMidfield: "后腰", centralMidfield: "中前卫", attackingMidfield: "前腰",
      wide: "边路", striker: "前锋",
    },
    depthLines: {
      gk: "门将", dc: "中后卫", rightBack: "右后卫", leftBack: "左后卫",
      dm: "后腰", mc: "中前卫", rightWing: "右边锋", leftWing: "左边锋",
      amc: "前腰", st: "前锋",
    } as Record<string, string>,
    positionTip: (line: string, count: number, target: number, status: string) =>
      `${line}：阵容中 ${format(count)} 人（通常 ${format(target)} 人）——${status}`,
    brief: {
      heading: "你在找什么？", pitch: "位置", legend: "圆点表示每一排的厚度情况。",
      inPossession: "有球", outOfPossession: "无球", anyRole: "任意 — 每名球员的最佳位置",
      purpose: "目的", filters: "筛选", minAge: "最小年龄", maxAge: "最大年龄",
      maxFee: "最高价格", minProbability: "概率", anyProbability: "任意", noFreeAgents: "不含自由球员",
    },
    purposes: { firstTeam: "一线队", rotation: "轮换", future: "未来", any: "全部" },
    purposeTips: {
      firstTeam: "强过你当前此位置的最佳球员",
      rotation: "跟你的第二选择差不多，价格合理",
      future: "21 岁或以下，还有成长空间",
      any: "所有符合条件的",
    },
    ask: { before: "为", after: "", anyRole: "每名球员的最佳位置" },
    own: { heading: "你的阵容", empty: "你的阵容里没有人踢这个位置。", position: "位置" },
    summary: (candidates: number, eligible: number, shown: number, purpose: string) =>
      `${format(candidates)} 名可胜任此位置 · ${format(eligible)} 符合${purpose} · 推荐 ${format(shown)} 人`,
    how: {
      label: "列表是如何生成的？",
      note: (rule: string, count: string) =>
        `球探会扫描所有能踢这个位置的球员（该位置评分 ≥ 10），排除你自家俱乐部和其他玩家控制的球员。然后从中筛掉不满足"${rule}"的。对最合适的 400 人估算加盟概率，再综合能力和概率排序，推荐前 ${count} 名。排序权重：70% 能力 + 30% 概率，30 岁以上稍降；轮换模式两者各半，未来模式还看潜力。点击列标题可排序；# 是球探原始顺序。`,
    },
    purposeRules: {
      firstTeam: "比你此位置的最佳球员更胜任",
      rotation: "至少和你第二选择一样胜任",
      future: "21 岁或以下且还有成长空间（潜力 ≥ 能力 + 15）",
      any: "能胜任即可",
    },
    sortBy: (by: string) => `按 ${by} 排序`,
    sortNames: {
      rank: "球探顺序", name: "姓名", age: "年龄", ca: "当前能力", pa: "潜在能力",
      fit: "适合度", probability: "概率", fee: "价格",
    },
    backToScoutOrder: "恢复球探原始顺序",
    showMore: (count: number) => `多显示 ${format(count)} 名`,
    playsFor: (club: string) => `效力于 ${club}`,
    empty: "没有符合当前设置的建议。试试目的'全部'或放宽筛选条件。",
    columns: {
      rank: "#", ca: "CA", pa: "PA", player: "球员", age: "年龄", fit: "适合度", role: "位置",
      probability: "概率", fee: "预估价格", wage: "周薪", note: "球探备注", money: "价格", value: "身价",
    },
    probabilityInfo: "球员加盟你俱乐部的概率——根据他的身价、合同、俱乐部和声望估算。",
    probabilityInfoLabel: "概率是什么？",
    fitTitle: (inPossession: string | null, outOfPossession: string | null, position: string) =>
      [
        inPossession !== null && `有球：${inPossession}`,
        outOfPossession !== null && `无球：${outOfPossession}`,
        `位置：${position}`,
      ].filter(Boolean).join("\n"),
    note: "适合度使用编辑器自身的属性权重估算；价格、薪资和概率为估算值。",
    depth: {
      summary: (size: number, age: string | null, level: string) =>
        `${format(size)} 人${age === null ? "" : ` · 平均年龄 ${age}`} · 最佳十一人平均能力 ${level}`,
      weak: "低于阵容水平", ageing: "老龄化",
      cover: (names: string) => `还能踢这里：${names}`,
      advice: "获取建议", adviceTitle: "针对此线的转会建议",
      empty: "无人", ability: "当前能力", more: (count: number) => `+${format(count)} 人`,
      columns: {
        line: "位置线", status: "状态", count: "人数", players: "最佳（按能力排序）",
        cover: "还能踢这里", age: "平均年龄",
      },
      countTitle: (count: number, target: number) =>
        `${format(count)} 名最佳位置在此线的球员；阵容通常需要 ${format(target)} 人`,
      statusHelp: {
        missing: "没有人踢这个位置。", thin: "比常规人数少；可客串的球员按 0.5 人计。",
        fine: "与常规人数大致相当。", crowded: "比常规人数多 2 人以上。",
      },
      attention: "需要注意：", allFine: "每条线都很均衡。",
    },
    departures: {
      intro: "球探建议你放走的球员，最紧迫的排在前面。",
      filter: "建议", all: "全部", empty: "当前球探没有建议你放走任何人。",
      sortNames: {
        rank: "球探顺序", name: "姓名", age: "年龄", ca: "当前能力", pa: "潜在能力",
        value: "身价", wage: "周薪", contract: "合同到期",
      },
      columns: {
        player: "球员", age: "年龄", ability: "能力", value: "身价", wage: "周薪",
        contract: "合同至", advice: "建议", reasons: "原因",
      },
      actions: { sell: "出售", loan: "租借出去", release: "解约" },
      rank: (line: string, rank: number) => `${line} · 第 ${rank}`,
    },
    roles: {
      bgk: "出球型门将", ngk: "清道夫门将", sk: "扫球门将", lhk: "站位门将",
      cb: "中后卫", bcb: "出球型中后卫", ncb: "清道夫中后卫", acb: "进攻型中后卫",
      ocb: "插上型中后卫", scb: "阻截型中后卫", ccb: "协防型中后卫", wcb: "宽型中后卫",
      fb: "边后卫", ifb: "内收边后卫", pfb: "压迫型边后卫", hfb: "拖后边后卫",
      wb: "翼卫", iwb: "内收翼卫", pwb: "组织型翼卫", awb: "进攻型翼卫", hwb: "拖后翼卫",
      dm: "后腰", hb: "半后腰", ddm: "拖后后腰", pdm: "压迫型后腰",
      bbm: "全能中场", bbp: "全能组织中场", cm: "中前卫", pcm: "压迫型中前卫",
      scm: "拖后中前卫", chm: "穿插中前卫", wcm: "宽型中前卫",
      ap: "攻击型组织核心", am: "前腰", oam: "前场出球点",
      w: "边锋", if: "内切前锋", pw: "组织型边锋", wfd: "边锋前锋", tw: "追击型边锋", iow: "内切出球边锋",
      cfd: "中锋", dlf: "拖后前锋", p: "突前前锋", tcf: "追击型中锋", ocf: "出球中锋",
    } as Record<string, string>,
    reasons: {
      listed: () => "已列入转会名单", freeAgent: () => "自由球员",
      expiring: (value: string) => `合同 ${value} 天后到期`, releaseClause: (value: string) => `解约金 ${value}`,
      fringe: () => "在原俱乐部不是常规主力", keyPlayer: () => "是原俱乐部的关键球员",
      unwanted: () => "在原俱乐部已是多余", overBudget: (value: string) => `${value} 超出你的预算`,
      stretch: (value: string) => `略微超出预算（+${value}）`, wageHigh: (value: string) => `每周工资比你的上限高 ${value}`,
      biggerClub: () => "效力于更大的俱乐部", smallerClub: () => "效力于更小的俱乐部",
      reputationGap: () => "对俱乐部来说名气太大", ambitious: () => "有野心：欢迎升级", notForSale: () => "非卖品",
    } as Record<string, (value: string) => string>,
    departureReasons: {
      surplus: (value: string) => `此线冗余（${value} 人）`, belowLevel: () => "低于阵容水平",
      ageing: (value: string) => `年龄偏大（${value}）`, expiring: (value: string) => `合同 ${value} 天后到期`,
      highWage: (value: string) => `此角色薪资偏高（${value}/周）`, unhappy: () => "情绪不佳",
      lowMorale: () => "士气低落", blocked: () => "需要比赛才能成长", unwanted: () => "球队地位：多余球员",
      listed: () => "已列入转会名单",
    } as Record<string, (value: string) => string>,
  },

  errors,
};
