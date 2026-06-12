// Loon 节点重命名脚本（远程版，原生兼容）
let customCharStart = "";  // 前缀，置空不添加
let customCharEnd = "";    // 后缀，置空不添加
const outputLanguage = "CN";

// 你常用的地区映射，精简版，避免运行卡顿
const keywordsToNames = {
    "香港|HK": outputLanguage === "EN" ? "🇭🇰HK" : "🇭🇰香港",
    "美国|US": outputLanguage === "EN" ? "🇺🇸US" : "🇺🇸美国",
    "新加坡|SG": outputLanguage === "EN" ? "🇸🇬SG" : "🇸🇬新加坡",
    "日本|JP": outputLanguage === "EN" ? "🇯🇵JP" : "🇯🇵日本",
    "台湾|TW": outputLanguage === "EN" ? "🇨🇳TW" : "🇨🇳台湾",
    "泰国|TH": outputLanguage === "EN" ? "🇹🇭TH" : "🇹🇭泰国"
};

// 过滤关键词，精简版，避免误杀
const filterKeywords = ["广告", "过期", "无效", "测试", "测速", "重置", "免流"];

// 核心逻辑（Loon 原生兼容，无 global 变量）
let originName = $name.trim();
let finalName = originName;

// 1. 过滤无效节点
for (const kw of filterKeywords) {
    const reg = new RegExp(kw, "i");
    if (reg.test(finalName)) {
        $result = "";
        return;
    }
}

// 2. 匹配地区并替换
let areaMatched = false;
for (const rule in keywordsToNames) {
    const reg = new RegExp(rule, "i");
    if (reg.test(finalName)) {
        finalName = keywordsToNames[rule];
        areaMatched = true;
        break;
    }
}

// 3. 添加前后缀
finalName = customCharStart + finalName + customCharEnd;

// 4. 输出结果
$result = finalName.trim();