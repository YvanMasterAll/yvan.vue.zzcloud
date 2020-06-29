import moment from 'moment'

// mock data
const visitData = []
const beginDay = new Date().getTime()

const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5]
for (let i = 0; i < fakeY.length; i += 1) {
    visitData.push({
        x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format(
            'YYYY-MM-DD'
        ),
        y: fakeY[i]
    })
}

const visitData2 = []
const fakeY2 = [1, 6, 4, 8, 3, 7, 2]
for (let i = 0; i < fakeY2.length; i += 1) {
    visitData2.push({
        x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format(
            'YYYY-MM-DD'
        ),
        y: fakeY2[i]
    })
}

const salesData = []
for (let i = 0; i < 12; i += 1) {
    salesData.push({
        x: `${i + 1}月`,
        y: Math.floor(Math.random() * 1000) + 200
    })
}
const searchData = []
for (let i = 0; i < 50; i += 1) {
    searchData.push({
        index: i + 1,
        keyword: `搜索关键词-${i}`,
        count: Math.floor(Math.random() * 1000),
        range: Math.floor(Math.random() * 100),
        status: Math.floor((Math.random() * 10) % 2)
    })
}
const salesTypeData = [
    {
        x: '家用电器',
        y: 4544
    },
    {
        x: '食用酒水',
        y: 3321
    },
    {
        x: '个护健康',
        y: 3113
    },
    {
        x: '服饰箱包',
        y: 2341
    },
    {
        x: '母婴产品',
        y: 1231
    },
    {
        x: '其他',
        y: 1231
    }
]

const salesTypeDataOnline = [
    {
        x: '家用电器',
        y: 244
    },
    {
        x: '食用酒水',
        y: 321
    },
    {
        x: '个护健康',
        y: 311
    },
    {
        x: '服饰箱包',
        y: 41
    },
    {
        x: '母婴产品',
        y: 121
    },
    {
        x: '其他',
        y: 111
    }
]

const salesTypeDataOffline = [
    {
        x: '家用电器',
        y: 99
    },
    {
        x: '食用酒水',
        y: 188
    },
    {
        x: '个护健康',
        y: 344
    },
    {
        x: '服饰箱包',
        y: 255
    },
    {
        x: '其他',
        y: 65
    }
]

const offlineData = []
for (let i = 0; i < 10; i += 1) {
    offlineData.push({
        name: `Stores ${i}`,
        cvr: Math.ceil(Math.random() * 9) / 10
    })
}
const offlineChartData = []
for (let i = 0; i < 20; i += 1) {
    offlineChartData.push({
        x: new Date().getTime() + 1000 * 60 * 30 * i,
        y1: Math.floor(Math.random() * 100) + 10,
        y2: Math.floor(Math.random() * 100) + 10
    })
}

const radarOriginData = [
    {
        name: '个人',
        ref: 10,
        koubei: 8,
        output: 4,
        contribute: 5,
        hot: 7
    },
    {
        name: '团队',
        ref: 3,
        koubei: 9,
        output: 6,
        contribute: 3,
        hot: 1
    },
    {
        name: '部门',
        ref: 4,
        koubei: 1,
        output: 6,
        contribute: 5,
        hot: 7
    }
]

const radarData = []
const radarTitleMap = {
    ref: '引用',
    koubei: '口碑',
    output: '产量',
    contribute: '贡献',
    hot: '热度'
}
radarOriginData.forEach(item => {
    Object.keys(item).forEach(key => {
        if (key !== 'name') {
            radarData.push({
                name: item.name,
                label: radarTitleMap[key],
                value: item[key]
            })
        }
    })
})

let cloudTags = {"list":[{"name":"宣城市","value":89,"type":2},{"name":"黄石市","value":59,"type":0},{"name":"西双版纳傣族自治州","value":3,"type":1},{"name":"三沙市","value":55,"type":1},{"name":"云浮市","value":18,"type":0},{"name":"新乡市","value":8,"type":0},{"name":"阿里地区","value":16,"type":1},{"name":"邵阳市","value":63,"type":1},{"name":"三亚市","value":13,"type":2},{"name":"恩施土家族苗族自治州","value":61,"type":2},{"name":"揭阳市","value":28,"type":0},{"name":"漳州市","value":6,"type":1},{"name":"三门峡市","value":26,"type":1},{"name":"天津市","value":44,"type":0},{"name":"海外","value":16,"type":1},{"name":"黔西南布依族苗族自治州","value":3,"type":0},{"name":"天津市","value":78,"type":1},{"name":"苗栗县","value":12,"type":2},{"name":"黔东南苗族侗族自治州","value":85,"type":2},{"name":"邵阳市","value":55,"type":1},{"name":"遵义市","value":74,"type":1},{"name":"湘西土家族苗族自治州","value":98,"type":1},{"name":"达州市","value":97,"type":2},{"name":"武汉市","value":39,"type":1},{"name":"百色市","value":90,"type":0},{"name":"榆林市","value":36,"type":2},{"name":"彰化县","value":33,"type":1},{"name":"三沙市","value":50,"type":2},{"name":"天津市","value":71,"type":1},{"name":"海北藏族自治州","value":40,"type":2},{"name":"梧州市","value":43,"type":1},{"name":"天津市","value":71,"type":1},{"name":"赤峰市","value":41,"type":1},{"name":"湘潭市","value":80,"type":1},{"name":"离岛","value":16,"type":2},{"name":"佛山市","value":46,"type":1},{"name":"运城市","value":66,"type":1},{"name":"包头市","value":69,"type":0},{"name":"福州市","value":32,"type":1},{"name":"资阳市","value":76,"type":1},{"name":"吉林市","value":94,"type":1},{"name":"三亚市","value":20,"type":2},{"name":"邢台市","value":19,"type":1},{"name":"雅安市","value":67,"type":1},{"name":"吉安市","value":2,"type":2},{"name":"宁波市","value":72,"type":0},{"name":"十堰市","value":30,"type":2},{"name":"海东市","value":18,"type":1},{"name":"晋城市","value":40,"type":2},{"name":"淮南市","value":42,"type":0},{"name":"离岛","value":45,"type":0},{"name":"拉萨市","value":1,"type":0},{"name":"嘉峪关市","value":22,"type":0},{"name":"广州市","value":52,"type":0},{"name":"澳门半岛","value":98,"type":1},{"name":"海北藏族自治州","value":16,"type":1},{"name":"通化市","value":29,"type":1},{"name":"安阳市","value":79,"type":1},{"name":"哈密地区","value":80,"type":2},{"name":"榆林市","value":97,"type":1},{"name":"泰州市","value":79,"type":1},{"name":"锡林郭勒盟","value":19,"type":0},{"name":"澳门半岛","value":79,"type":1},{"name":"普洱市","value":57,"type":0},{"name":"庆阳市","value":3,"type":0},{"name":"乌海市","value":16,"type":1},{"name":"鹰潭市","value":21,"type":1},{"name":"那曲地区","value":84,"type":0},{"name":"泰安市","value":15,"type":1},{"name":"汉中市","value":25,"type":0},{"name":"河池市","value":83,"type":0},{"name":"鹰潭市","value":24,"type":1},{"name":"绍兴市","value":36,"type":2},{"name":"兴安盟","value":2,"type":1},{"name":"三沙市","value":83,"type":1},{"name":"鹤壁市","value":25,"type":1},{"name":"六盘水市","value":28,"type":1},{"name":"兰州市","value":21,"type":2},{"name":"萍乡市","value":70,"type":2},{"name":"重庆市","value":17,"type":0},{"name":"攀枝花市","value":59,"type":1},{"name":"云浮市","value":51,"type":0},{"name":"毕节市","value":42,"type":2},{"name":"海外","value":33,"type":0},{"name":"普洱市","value":44,"type":1},{"name":"珠海市","value":75,"type":1},{"name":"西安市","value":97,"type":1},{"name":"衢州市","value":95,"type":1},{"name":"重庆市","value":97,"type":0},{"name":"牡丹江市","value":42,"type":0},{"name":"塔城地区","value":89,"type":2},{"name":"台南市","value":36,"type":2},{"name":"三沙市","value":61,"type":0},{"name":"重庆市","value":20,"type":0},{"name":"怀化市","value":27,"type":1},{"name":"本溪市","value":35,"type":0},{"name":"乌海市","value":8,"type":1},{"name":"日喀则地区","value":86,"type":1},{"name":"六盘水市","value":95,"type":0},{"name":"石嘴山市","value":36,"type":1}]}

const getFakeChartData = {
    visitData,
    visitData2,
    salesData,
    searchData,
    offlineData,
    offlineChartData,
    salesTypeData,
    salesTypeDataOnline,
    salesTypeDataOffline,
    radarData,
    cloudTags
}

export default [
    {
        path: '/api/device/chart/mock',
        method: 'get',
        handle() {
            return {
                code: 0,
                msg: '获取数据成功',
                data: getFakeChartData
            }
        }
    }
]
