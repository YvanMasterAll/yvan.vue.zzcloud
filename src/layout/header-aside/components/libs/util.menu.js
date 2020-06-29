// 创建 el-menu-item
export function elMenuItem(createElement, menu, active) {
    // return createElement('el-menu-item', { props: { index: menu.path }, attrs: { class: `el-menu-item ${menu.path === active ? 'is-active':''}`} }, [
    //     ...(menu.icon
    //         ? [createElement('i', { attrs: { class: `fa fa-${menu.icon}` } })]
    //         : []),
    //     ...((menu.icon === undefined) & !menu.iconSvg
    //         ? [createElement('i', { attrs: { class: 'fa fa-file-o' } })]
    //         : []),
    //     ...(menu.iconSvg
    //         ? [createElement('d2-icon-svg', { props: { name: menu.iconSvg } })]
    //         : []),
    //     createElement('span', { slot: 'title' }, menu.title || '未命名菜单')
    // ])
    if (!menu.show) {
        return null
    }
    return createElement(
        'el-menu-item',
        { key: menu.path, props: { index: menu.path } },
        [
            ...(menu.icon
                ? [
                      createElement('i', {
                          attrs: { class: `fa fa-${menu.icon}` }
                      })
                  ]
                : []),
            ...(menu.iconSvg
                ? [
                        createElement('d2-icon-svg', {
                            props: { name: menu.iconSvg }
                        })
                    ]
                : []),
            ...(menu.iconFont
                ? [
                        createElement('i', {
                            attrs: { class: `fa iconfont icon-${menu.iconFont}` }
                        })
                    ]
                : []),
            ...((menu.icon === undefined) & !menu.iconFont & !menu.iconSvg
                ? [createElement('i', { attrs: { class: 'fa fa-file-o' } })]
                : []),
            createElement('span', { slot: 'title' }, menu.title || '未命名菜单')
        ]
    )
}

// 创建 el-submenu
export function elSubmenu(createElement, menu, active) {
    if (!menu.show) {
        return null
    }
    return createElement(
        'el-submenu',
        { key: menu.path, props: { index: menu.path } },
        [
            ...(menu.icon
                ? [
                      createElement('i', {
                          slot: 'title',
                          attrs: { class: `fa fa-${menu.icon}` }
                      })
                  ]
                : []),
            ...(menu.iconSvg
                ? [
                        createElement('d2-icon-svg', {
                            slot: 'title',
                            props: { name: menu.iconSvg }
                        })
                    ]
                : []),
            ...(menu.iconFont
                ? [
                        createElement('i', {
                            slot: 'title',
                            attrs: { class: `fa iconfont icon-${menu.iconFont}` }
                        })
                    ]
                : []),
            ...((menu.icon === undefined) & !menu.iconFont & !menu.iconSvg
                ? [
                      createElement('i', {
                          slot: 'title',
                          attrs: { class: 'fa fa-folder-o' }
                      })
                  ]
                : []),
            createElement(
                'span',
                { slot: 'title' },
                menu.title || '未命名菜单'
            ),
            ...menu.children.map((child, childIndex) =>
                (child.children === undefined ? elMenuItem : elSubmenu).call(
                    this,
                    createElement,
                    child,
                    active
                )
            )
        ]
    )
}

/**
 * @description 在组件中调用此方法渲染菜单项目
 * @param {Function} h createElement
 * @param {Object} menu 菜单项
 */
export function createMenu(h, menu) {
    if (menu.children === undefined) return elMenuItem.call(this, h, menu)
    return elSubmenu.call(this, h, menu)
}
