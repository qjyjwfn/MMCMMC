// Stash 汇率面板 - 修正版 (彻底移除 $log)
const url = "https://api.coingecko.com/api/v3/simple/price?ids=tether,tron&vs_currencies=cny";
const startTime = Date.now();

function addLog(msg, level = "info") {
  switch(level) {
    case "error":
      console.error(`[Crypto_RMB] ${msg}`);
      break;
    case "warn":
      console.warn(`[Crypto_RMB] ${msg}`);
      break;
    default:
      console.log(`[Crypto_RMB] ${msg}`);
  }
}

addLog("脚本已启动，正在请求数据...");

$httpClient.get({
  url: url,
  headers: { 
    "X-Stash-Selected-Proxy": "auto",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15"
  },
  timeout: 10000
}, function(error, response, data) {
  const elapsed = Date.now() - startTime;
  
  if (error) {
    addLog(`❌ 请求失败：${error} (耗时: ${elapsed}ms)`, "error");
    $done({
      title: "实时汇率 (RMB)",
      content: `数据请求失败`,
      icon: "exclamationmark.triangle.fill",
      "icon-color": "#FF3B30"
    });
    return;
  }
  
  try {
    const json = JSON.parse(data);
    const usdt = json.tether.cny.toFixed(2);
    const trx = json.tron.cny.toFixed(2);
    addLog(`✅ 成功 | USDT: ${usdt} | TRX: ${trx}`);
    
    $done({
      title: "实时汇率 (RMB)",
      content: `USDT: ￥${usdt}\nTRX: ￥${trx}`,
      icon: "yensign.circle.fill",
      "icon-color": "#10B981"
    });
  } catch (e) {
    addLog(`❌ 解析错误：${e.message}`, "error");
    $done({
      title: "实时汇率 (RMB)",
      content: `数据解析失败`,
      icon: "exclamationmark.triangle.fill",
      "icon-color": "#FF3B30"
    });
  }
});
