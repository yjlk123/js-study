// node 启动一个 ws 服务
let ws = require('nodejs-websocket')
console.log('开始建立连接...')

let interval = null
let count = 4
let arr = [200, 300, 400, 500]
let server = ws.createServer(function (conn) {
    conn.on('text', function (str) {
        let receive = JSON.parse(str)
        let props = receive.pointModel.split(',')
        interval = setInterval(function () {
            for (let i = 0; i < props.length; i++) {
                const element = props[i];
                let resp = {
                    deviceId: receive.device_id,
                    templateId: '',
                    id: '',
                    fields: {
                        [element]: {
                            // value: Math.floor(Math.random() * (1000 - 1)) + 1,
                            value: arr[count % 4],
                            pointCode: '',
                            type: 'long',
                            time: new Date().valueOf()
                        }
                    }
                }
                count++
                conn.sendText(JSON.stringify(resp))
            }
        }, 300)
    })
    conn.on('close', function (code, reason) {
        if (interval) {
            clearInterval(interval)
        }
        console.log('关闭连接')
    });
    conn.on('error', function (code, reason) {
        console.log('异常关闭')
    });
}).listen(8001)
console.log('WebSocket建立完毕')

