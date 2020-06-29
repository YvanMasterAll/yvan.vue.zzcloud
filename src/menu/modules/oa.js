export default {
    path: '/oa',
    title: '办公',
    iconFont: '_Oa_SFontCN',
    children: (pre => [
        {
            path: `${pre}sheet`,
            title: '表格管理',
            iconFont: 'biaoge',
            children: (pre2 => [
                { path: `${pre2}list`, title: '表格列表', iconFont: 'liebiao' },
                { path: `${pre2}tmpl`, title: '模板管理', iconFont: 'moban2' },
                { path: `${pre2}field`, title: '字段管理', iconFont: 'ziduan' },
            ])(`${pre}sheet/`)
        },
        {
            path: `${pre}ticket`,
            title: '工单管理',
            iconFont: 'huabanfuben',
            children: (pre2 => [
                { path: `${pre2}panel`, title: '工单面板', iconFont: 'gongyezujian-yibiaopan' },
                { path: `${pre2}add`, title: '新建工单', iconFont: 'xinjian', public: true },
                { path: `${pre2}commit`, title: '我发布的工单', iconFont: 'fabu' },
                // { path: `${pre2}pending`, title: '我待办的工单', iconFont: 'daibanshixiang' },
                { path: `${pre2}todo`, title: '待处理的工单', iconFont: 'drxx85' },
                { path: `${pre2}handle`, title: '我处理的工单', iconFont: 'wancheng' },
                { path: `${pre2}list`, title: '所有工单列表', iconFont: 'liebiao' },
            ])(`${pre}ticket/`)
        }
    ])('/oa/')
}
