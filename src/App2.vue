<script>
import util from '@/libs/util'
import sheetTableData from '@/mixins/sheetTableData'
const template = {
    "cellHeight": 34, // 行高
    "table": {
        "th": [120, 80, 80, 80, 90, 100, 100, 80, 90 ], // 列宽
        "tr": [
            {
                "td": [
                    { "rowspan": 1, "cellspan": 6, "type": "text", "name": null, "key": null, "value": "测试过程填写",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "责任人",}, 
                    { "rowspan": 2, "cellspan": 2, "name": "leader", "type": "select", "key": "leaders",  "value": "" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "测试日期",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "date", "name": "date", "key": null, "value": util.toDateString(new Date(), 'YYYY-MM-DD'),},
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "测试者",}, 
                    { "rowspan": 1, "cellspan": 2, "name": "tester", "type": "select", "key": "leaders",  "value": "" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "80分体控制器编号",}, 
                    { "rowspan": 1, "cellspan": 2, "name": "_sn1", "type": "textfield", "key": null,  "value": "", "placeholder": "编码", "mutable": false },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "变压器编号",}, 
                    { "rowspan": 1, "cellspan": 2, "name": "_sn2", "type": "textfield", "key": null,  "value": "", "placeholder": "编码", "mutable": false },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "中频控制器编号",}, 
                    { "rowspan": 1, "cellspan": 2, "name": "_sn3", "type": "textfield", "key": null,  "value": "", "placeholder": "编码", "mutable": false },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "风扇转动情况",}, 
                    { "rowspan": 1, "cellspan": 3, "type": "option", "name": "fanState", "key": "stateOptions", "value": "正常",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数据存储状态",}, 
                    { "rowspan": 1, "cellspan": 3, "type": "option", "name": "storeState", "key": "stateOptions", "value": "正常",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "屏幕显示情况",}, 
                    { "rowspan": 1, "cellspan": 3, "type": "option", "name": "screenState", "key": "stateOptions", "value": "正常",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "芯片版本",}, 
                    { "rowspan": 1, "cellspan": 3, "name": "clip", "type": "select", "key": "clipVersions",  "value": "" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 5, "type": "text", "name": null, "key": null, "value": "变压器次级连接材料",}, 
                    { "rowspan": 1, "cellspan": 4, "type": "option", "name": "linkState", "key": "linkOptions", "value": "紫铜",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 9, "type": "text", "name": null, "key": null, "value": "测试数据记录",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 4, "type": "text", "name": null, "key": null, "value": "恒导通角40%（时间20/5）",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "",}, 
                    { "rowspan": 1, "cellspan": 4, "type": "text", "name": null, "key": null, "value": "恒流5KA（时间20/5）",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "本机显示",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "电流显示仪",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "本机显示",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "电流显示仪",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流（A)",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "导通角",},
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流(R)",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流(P)",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流（A)",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "导通角",},
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流(R)",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流(P)",},
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "name": "angle40LocalA1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle40LocalD1", "type": "number", "key": null,  "value": "40", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle40DisplayR1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle40DisplayP1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "1",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "const5KLocalA1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "const5KLocalD1", "type": "number", "key": null,  "value": "", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "const5KDisplayR1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "const5KDisplayP1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "name": "angle40LocalA2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle40LocalD2", "type": "number", "key": null,  "value": "40", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle40DisplayR2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle40DisplayP2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "2",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "const5KLocalA2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "const5KLocalD2", "type": "number", "key": null,  "value": "", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "const5KDisplayR2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "const5KDisplayP2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "name": "angle40LocalA3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle40LocalD3", "type": "number", "key": null,  "value": "40", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle40DisplayR3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle40DisplayP3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "3",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "const5KLocalA3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "const5KLocalD3", "type": "number", "key": null,  "value": "", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "const5KDisplayR3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "const5KDisplayP3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 4, "type": "text", "name": null, "key": null, "value": "恒导通角80%（时间20/5）",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "",}, 
                    { "rowspan": 1, "cellspan": 4, "type": "text", "name": null, "key": null, "value": "恒流10KA（时间20/5）",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "本机显示",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "电流显示仪",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "本机显示",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "电流显示仪",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "name": "angle80LocalA1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle80LocalD1", "type": "number", "key": null,  "value": "80", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle80DisplayR1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle80DisplayP1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "1",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "const10KLocalA1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "const10KLocalD1", "type": "number", "key": null,  "value": "", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "const10KDisplayR1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "const10KDisplayP1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "name": "angle80LocalA2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle80LocalD2", "type": "number", "key": null,  "value": "80", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle80DisplayR2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle80DisplayP2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "2",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "const10KLocalA2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "const10KLocalD2", "type": "number", "key": null,  "value": "", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "const10KDisplayR2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "const10KDisplayP2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "name": "angle80LocalA3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle80LocalD3", "type": "number", "key": null,  "value": "80", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle80DisplayR3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle80DisplayP3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "3",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "const10KLocalA3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "const10KLocalD3", "type": "number", "key": null,  "value": "", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "const10KDisplayR3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "const10KDisplayP3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 3, "type": "text", "name": null, "key": null, "value": "注：电流检测仪的波形",}, 
                    { "rowspan": 1, "cellspan": 6, "type": "option", "name": "waveState", "key": "stateOptions", "value": "正常",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 8, "name": "remark", "type": "textfield", "option": "remark", "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 9, "type": "text", "name": null, "key": null, "value": "",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 6, "type": "text", "name": null, "key": null, "value": "发货前测试填写",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "责任人",}, 
                    { "rowspan": 2, "cellspan": 2, "name": "leader2", "type": "select", "key": "leaders",  "value": "" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "测试日期",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "date", "name": "date2", "key": null, "value": util.toDateString(new Date(), 'YYYY-MM-DD'),},
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "测试者",}, 
                    { "rowspan": 1, "cellspan": 2, "name": "tester2", "type": "select", "key": "leaders",  "value": "" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "风扇转动情况",}, 
                    { "rowspan": 1, "cellspan": 3, "type": "option", "name": "fan2State", "key": "stateOptions", "value": "正常",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数据存储状态",}, 
                    { "rowspan": 1, "cellspan": 3, "type": "option", "name": "store2State", "key": "stateOptions", "value": "正常",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "屏幕显示情况",}, 
                    { "rowspan": 1, "cellspan": 3, "type": "option", "name": "screen2State", "key": "stateOptions", "value": "正常",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "螺丝检查",}, 
                    { "rowspan": 1, "cellspan": 3, "type": "option", "name": "screw2State", "key": "stateOptions", "value": "正常",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "液晶屏安装",}, 
                    { "rowspan": 1, "cellspan": 3, "type": "option", "name": "fit2State", "key": "screenFitOptions", "value": "外置",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "芯片版本",}, 
                    { "rowspan": 1, "cellspan": 3, "name": "clip2", "type": "select", "key": "clipVersions",  "value": "" },
                ]
            },
            {
                "td": [
                    { "rowspan": 2, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "中频变频选择",}, 
                    { "rowspan": 2, "cellspan": 3, "type": "option", "name": "freq2State", "key": "freqTypeOptions", "value": "中频",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "接插件液晶显示卡子配备情况",}, 
                    { "rowspan": 2, "cellspan": 3, "type": "option", "name": "card2State", "key": "stateOptions", "value": "正常",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "屏幕程序版本",}, 
                    { "rowspan": 1, "cellspan": 3, "type": "option", "name": "screenVer2State", "key": "screenOptions", "value": "普通",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "screenVerDesc", "type": "textfield", "key": null,  "value": "", "placeholder": "备注（注明屏幕显示客户名称）" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 4, "type": "text", "name": null, "key": null, "value": "恒导通角模式",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "",}, 
                    { "rowspan": 1, "cellspan": 4, "type": "text", "name": null, "key": null, "value": "恒流模式",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 4, "type": "text", "name": null, "key": null, "value": "恒导通角50%（时间10/5）",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "",}, 
                    { "rowspan": 1, "cellspan": 4, "type": "text", "name": null, "key": null, "value": "恒流15KA（时间10/5）",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "本机显示",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "电流显示仪",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "本机显示",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "电流显示仪",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流（A)",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "导通角",},
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流(R)",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流(P)",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流（A)",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "导通角",},
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流(R)",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流(P)",},
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "name": "angleLocalA1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angleLocalD1", "type": "number", "key": null,  "value": "", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "angleDisplayR1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angleDisplayP1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "1",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "constLocalA1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "constLocalD1", "type": "number", "key": null,  "value": "", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "constDisplayR1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "constDisplayP1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "name": "angleLocalA2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angleLocalD2", "type": "number", "key": null,  "value": "", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "angleDisplayR2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angleDisplayP2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "2",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "constLocalA2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "constLocalD2", "type": "number", "key": null,  "value": "", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "constDisplayR2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "constDisplayP2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "name": "angleLocalA3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angleLocalD3", "type": "number", "key": null,  "value": "", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "angleDisplayR3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angleDisplayP3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "2",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "constLocalA3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "constLocalD3", "type": "number", "key": null,  "value": "", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "constDisplayR3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "constDisplayP3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "外壳清洁度检查",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "option", "name": "clean2State", "key": "cleanOptions", "value": "清洁",}, 
                    { "rowspan": 2, "cellspan": 3, "type": "text", "name": null, "key": null, "value": "水压测试结果（注：水压测试为10kg十分钟）",}, 
                    { "rowspan": 2, "cellspan": 2, "type": "option", "name": "pressure2State", "key": "pressureOptions", "value": "完好",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "配件配备情况",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "option", "name": "parts2State", "key": "partsOptions", "value": "完整",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "包装情况",}, 
                    { "rowspan": 1, "cellspan": 4, "type": "option", "name": "pack2State", "key": "packOptions", "value": "木箱",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "第二次签名",}, 
                    { "rowspan": 2, "cellspan": 2, "name": "recheck2", "type": "select", "key": "leaders",  "value": "" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "注：电流检测仪的波形",}, 
                    { "rowspan": 1, "cellspan": 4, "type": "option", "name": "wave2State", "key": "stateOptions", "value": "正常",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "客户名称",}, 
                    { "rowspan": 1, "cellspan": 8, "name": "company", "type": "select", "iscompany": true, "key": "company",  "value": "" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 8, "name": "remark2", "type": "textfield", "option": "remark", "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 4, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "图片",}, 
                    { "rowspan": 4, "cellspan": 8, "name": "attachments", "type": "image", "key": null,  "value": 'hello*http://image.yy.com/yywebalbumbs2bucket/144152f8680f421599233c6ffcfcef49_1476265267104.jpeg|hello*http://image.yy.com/yywebalbumbs2bucket/144152f8680f421599233c6ffcfcef49_1476265267104.jpeg|hello*http://image.yy.com/yywebalbumbs2bucket/144152f8680f421599233c6ffcfcef49_1476265267104.jpeg'}
                ]
            },
        ]
    }
}
let json = {"title":"包装测试表单","sn":"20063006","date":"2020-06-16","leader":"","tester":"黄辉","_sn1":"","_sn2":"","_sn3":"20063006","fanState":"正常","storeState":"正常","screenState":"正常","clip":"ZMF400TIN01A181207062.101","linkState":"紫铜","angle40LocalA1":"6.30","angle40LocalD1":"40","angle40DisplayR1":"8.7","angle40DisplayP1":"11.0","const5KLocalA1":"3.9","const5KLocalD1":"28.39","const5KDisplayR1":"5.5","const5KDisplayP1":"7.0","angle40LocalA2":"6.32","angle40LocalD2":"40","angle40DisplayR2":"8.7","angle40DisplayP2":"11.0","const5KLocalA2":"3.9","const5KLocalD2":"28.39","const5KDisplayR2":"5.5","const5KDisplayP2":"7.0","angle40LocalA3":"6.29","angle40LocalD3":"40","angle40DisplayR3":"8.7","angle40DisplayP3":"11.0","const5KLocalA3":"3.91","const5KLocalD3":"28.43","const5KDisplayR3":"5.5","const5KDisplayP3":"7.0","angle80LocalA1":"13.49","angle80LocalD1":"80","angle80DisplayR1":"18.5","angle80DisplayP1":"21.7","const10KLocalA1":"8.53","const10KLocalD1":"51.17","const10KDisplayR1":"11.8","const10KDisplayP1":"13.9","angle80LocalA2":"13.50","angle80LocalD2":"80","angle80DisplayR2":"18.5","angle80DisplayP2":"21.7","const10KLocalA2":"8.52","const10KLocalD2":"51.01","const10KDisplayR2":"11.8","const10KDisplayP2":"13.9","angle80LocalA3":"13.59","angle80LocalD3":"80","angle80DisplayR3":"18.7","angle80DisplayP3":"21.8","const10KLocalA3":"8.52","const10KLocalD3":"51.11","const10KDisplayR3":"11.8","const10KDisplayP3":"13.9","waveState":"正常","remark":"","leader2":"","date2":"2020-06-16","tester2":"","fan2State":"正常","store2State":"正常","screen2State":"正常","screw2State":"正常","fit2State":"外置","clip2":"","freq2State":"中频","card2State":"正常","screenVer2State":"普通","screenVerDesc":"","angleLocalA1":"","angleLocalD1":"","angleDisplayR1":"","angleDisplayP1":"","constLocalA1":"","constLocalD1":"","constDisplayR1":"","constDisplayP1":"","angleLocalA2":"","angleLocalD2":"","angleDisplayR2":"","angleDisplayP2":"","constLocalA2":"","constLocalD2":"","constDisplayR2":"","constDisplayP2":"","angleLocalA3":"","angleLocalD3":"","angleDisplayR3":"","angleDisplayP3":"","constLocalA3":"","constLocalD3":"","constDisplayR3":"","constDisplayP3":"","clean2State":"清洁","pressure2State":"完好","parts2State":"完整","pack2State":"纸箱","recheck2":"","wave2State":"正常","company":"广东旭日电器设备","remark2":"","attachments":""}
export default {
    name: 'app',
    mixins: [sheetTableData],
    data() { 
        return {
            sheet: {
                template: template
            }
        }
    },
    render() {
        return this.renderForm()
    },
    created() {
        
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/public-class.scss';
</style>
