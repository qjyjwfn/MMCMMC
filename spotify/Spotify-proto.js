console.log(`2026 spotify-proto loaded`);
const resStatus = $response.status ? $response.status : $response.statusCode;
if(resStatus !== 200) {
    $done({});
} else {
    const url = $request.url;
    const method = $request.method;
    const postMethod = "POST";
    const isQuanX = typeof $task !== "undefined";
    const binaryBody = isQuanX ? new Uint8Array($response.bodyBytes) : $response.body;
    let accountAttributesMapObj;
    let body;

    // 注意：这里需要 protobuf 定义（当前版本简化处理，完整版可能需要额外定义）
    if(url.includes("bootstrap/v1/bootstrap") && method === postMethod){
        console.log('bootstrap processed');
        body = binaryBody;
    } else if(url.includes("user-customization-service/v1/customize") && method === postMethod){
        console.log('customize processed');
        body = binaryBody;
    } else {
        $notification.post('Spotify', '路径错误', method + "," + url);
    }

    if(isQuanX){
        $done({bodyBytes: body});
    } else {
        $done({body});
    }
}

// 核心解锁函数
function processMapObj(accountAttributesMapObj){
    accountAttributesMapObj['smart-shuffle'] = {stringValue : 'AVAILABLE'};
    accountAttributesMapObj['is-euterpe'] = {boolValue : true};
    accountAttributesMapObj['has-audiobooks-subscription'] = {boolValue : true};
    accountAttributesMapObj['type'] = {stringValue : 'premium'};
    accountAttributesMapObj['subscription-enddate'] = {stringValue : new Date(Date.now() + 365*24*60*60*1000).toISOString().split('.')[0] + "Z"};
    accountAttributesMapObj['ads'] = {boolValue : false};
    accountAttributesMapObj['on-demand'] = {boolValue : true};
    accountAttributesMapObj['offline'] = {boolValue : true};
    // ... 更多字段可自行添加
}
