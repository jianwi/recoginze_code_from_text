const fs = require('fs');
let rows = []
try {
    const data = fs.readFileSync('./text.txt', 'utf-8');
    // 等待操作结果返回，然后打印结果
    rows = data.split('\n')
} catch(e) {
    console.log('读取文件发生错误');
}

rows.forEach(str=>{
    let message = str.replace(/[0-9]{9,}/g, '').replace(/[0-9]{1,2}:[0-9]{1,2}/, '');
    const nameResult = message.match(/(顺丰|中通|圆通|韵达|百世|申通|天天|京东|天猫|中冶|德邦|宅急送|苏宁|极兔)/)
    let codeResult = message.match(/([A-Z]*(?:\d{1,6}[-－\s]+)+\d{1,6})/);
    if (!codeResult){
        codeResult = message.match(/(?:货号|提货码|取件码|编号|取件号|包裹号|取货码?|提货|(?:顺丰|邮政|中通|圆通|韵达|百世|申通|天天|京东|天猫(?:超市)?|中冶|德邦|宅急送|苏宁|极兔))(?:快递)?[^\d]{0,8}[A-Z]*(\d{1,6}|(?:\d{1,6}[-－\s]+)+\d{1,6})/);
        if (!codeResult){
            codeResult = message.match(/[^\d]+(\d{6}[^\d:]|[^\d]+\d{2,6}[^\d]{1,3}(?:顺丰|中通|圆通|韵达|百世|申通|天天|京东|天猫(?:超市)?|中冶|德邦|宅急送|苏宁|极兔))/)
            if (!codeResult){
                // 多次匹配，仍未匹配到提货码的情况
                // console.log(str)
                // return
            }
        }
    }
    // if (!nameResult){
    //     return
    // }
    if (codeResult){
        codeResult = codeResult[0].match(/[-－\dA-Z]+/)
        if (!codeResult){
            console.error(codeResult)
            codeResult = "没有取货码"
        }else {
            codeResult = codeResult[0]
        }
    }else {
        codeResult = "没有取货码"
    }
    console.log(str)
    console.log('快递公司',nameResult?nameResult[0]:'未知')
    console.log("取货码",codeResult)
    console.log("----")
})