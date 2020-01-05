export default {
    path: '/ticket',
    title: '工单管理',
    iconSvg: 'ticket-menu',
    children: (pre => [
        { path: `${pre}panel`, title: '工单面板', iconSvg: 'ticket-panel' },
        { path: `${pre}add`, title: '新建工单', iconSvg: 'ticket-new', public: true },
        { path: `${pre}commit`, title: '我发布的工单', iconSvg: 'ticket-commit' },
        { path: `${pre}hold`, title: '我待办的工单', iconSvg: 'ticket-hold' },
        { path: `${pre}stay`, title: '待处理的工单', iconSvg: 'ticket-stay' },
        { path: `${pre}handle`, title: '我处理的工单', iconSvg: 'ticket-handle' },
        { path: `${pre}list`, title: '所有工单列表', iconSvg: 'ticket-list' },
    ])('/ticket/')
}
