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
    // message = str.replace(/[0-9]{9,}/g, '').replace(/[0-9]{1,2}:[0-9]{1,2}/, '');
    const nameResult = str.match(/(顺丰|中通|圆通|韵达|百世|申通|天天|京东|天猫|中冶|德邦|宅急送|苏宁|极兔)/)
    let codeResult = str.match(/([A-Z]*(?:\d+[-－]\s?)+\d+)/);
    if (!codeResult){
        codeResult = str.match(/(?<=(?:货号|提货码|取件码|编号|取件号|包裹号|(?:顺丰|中通|圆通|韵达|百世|申通|天天|京东|天猫(?:超市)?|中冶|德邦|宅急送|苏宁|极兔))(?:快递)?[:\s\]]*)[A-Z]*(\d+|(?:\d+-)+\d+)/);
        if (!codeResult){
            codeResult = "无取件码"
        }else {
            codeResult = codeResult[0]
        }
    }else {
        codeResult = codeResult[0]
    }
    console.log(str)
    console.log("取件码为："+codeResult)
    console.log("---")
})