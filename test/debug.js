const utils = require('../lib/utilFuncs');


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

let result;
result = utils.deepReplace(o, 'a', 'MothahFkinA', 'all');
result = utils.deepSearch(o, 'a');
console.log(result);