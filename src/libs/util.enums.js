
/// 枚举常量

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