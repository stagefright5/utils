// const utils = require('../lib/utilFuncs');
import utils from '../lib/utilFuncs.js';
const o = {
    a: "lfkglkfg",
    b: "pppppppp",
    f: {
        dnc: "ssdsdf",
        qw: {
            sgdhf: 999,
            f: {
                mnb: "weah",
                a: "wewdef"
            },
            a: "asAS"
        },
        a: "ssdsdf"
    },
    s: {
        l: {
            g: "sfdd", trt: "dasfdf",
            a: 'edrtert'
        },
        a: 'sdasd'
    },
    c: "ppppopopopopo",
    lk: "asdasd",
};

let result; // because, hovering >>> typing.
result = utils.deepReplace(o, 'a', 'MothahFkinA', 'all'); console.log(result);
result = utils.deepSearch(o, 'l'); console.log(result);
result = utils.getURLQParams('http://sdf.sdfs.com/llk?bagOf=fur&suma=cumlaude'); console.log(result);
result = utils.kebabFromPorC('YouCanPrepareKebabFromPork'); console.log(result);
result = utils.pOrCFromKebab('you-can-get-pork-from-kebab-too'); console.log(result);