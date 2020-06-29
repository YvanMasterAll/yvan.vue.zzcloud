export default {
    path: '/device',
    title: '设备',
    iconFont: 'shebei',
    children: (pre => [
        { path: `${pre}panel`, title: '工作台', iconFont: 'gongzuotai', public: true },
        { path: `${pre}monitor`, title: '监控页', iconFont: 'xuexijiankong', public: true },
        { path: `${pre}analysis`, title: '分析页', iconFont: 'tongjifenxi', public: true }
    ])('/device/')
}
