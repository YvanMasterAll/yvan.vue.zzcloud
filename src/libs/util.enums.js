
// 枚举常量

const enums = {
    // 数据状态
    state: {            
        on: 'on',
        off: 'off',
        del: 'del'
    },
    // 权限范围
    scope: {            
        all: 'all',     // 全部
        diy: 'diy',     // 自定义
        same: 'same'    // 本级
    },
}

// 字典常量，以后会直接从后台获取
enums.dict = {
    dicts: [
        {
            id: 1,
            name: 'state',
            description: '通用状态',
            Dict_Items: [
                {id: 1, dict_id: 1, value: 'on', label: '激活', sort: 0},
                {id: 2, dict_id: 1, value: 'off', label: '禁用', sort: 1},
            ]
        }
    ],
    // 获取字典数据项
    getDictItems(name) {
        let dict = this.dicts.filter(d => d.name === name)[0]
        if (dict) {
            return dict.Dict_Items
        }
        return []
    },
    // 获取数据项标签
    getItemLabel(name, value) {
        let dict = this.dicts.filter(d => d.name === name)[0]
        if (dict) {
            let item = dict.Dict_Items.filter(d => d.value === value)[0]
            if (item) {
                return item.label
            }
        }
        return null
    }
}

// 工作流模块
enums.wk = {
    // 工作流字段类型
    field_type: {
        int: 'int',
        string: 'string',
        float: 'float',
        bool: 'bool',
        date: 'date',
        radio: 'radio',         // 单选框
        checkbox: 'checkbox',   // 多选框
        select: 'select',       // 下拉列表
        text: 'text',           // 文本域
        richtext: 'richtext',   // 富文本
        user: 'user',           // 用户
        image: 'image',         // 图片
        attachment: 'attachment'// 附件
    },
    // 工作流字段读写类型
    field_attribute_type: { 
        readOnly: 0,            // 只读
        required: 1,            // 必填
        optional: 2             // 可选
    },
    // 执行人类型
    executor_type: {
        none: 'none',           // 无执行人
        personal: 'personal',   // 个人
        multi: 'multi',         // 多人
        dept: 'dept',           // 部门
        role: 'role',           // 角色
        script: 'script'        // 脚本
    },
    // 流转类型
    action_type: {
        accept: 'accept',       // 同意
        deny: 'deny'            // 拒绝
    },
}

export default enums