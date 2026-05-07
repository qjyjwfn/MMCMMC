/**
 * 实时 USDT/CNY 汇率脚本
 * 建议间隔：3600s (1小时)
 */

const url = 'https://api.coinbase.com/v2/exchange-rates?currency=USDT';

$httpClient.get(url, function(error, response, data) {
    if (error) {
        $done({
            title: "汇率获取失败",
            content: "请检查网络连接",
            icon: "exclamationmark.triangle",
            "icon-color": "#FF0000"
        });
    } else {
        const res = JSON.parse(data);
        const rate = parseFloat(res.data.rates.CNY).toFixed(2);
        const time = new Date().toLocaleTimeString();

        $done({
            title: "USDT / CNY 汇率",
            content: `实时价格: ¥${rate}  |  更新: ${time}`,
            icon: "dollarsign.circle.fill",
            "icon-color": "#1296db"
        });
    }
});

