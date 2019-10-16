export default [
    {
        path: '/api/demo/business/table/1/fetch.*',
        method: 'get',
        handle({ params, Repeat }) {
            let { pageSize } = params
            return {
                code: 0,
                msg: '获取数据成功',
                data: {
                    page: {
                        total: 1000
                    },
                    list: Repeat(pageSize, {
                        'id|+1': 1,
                        name: '@cname',
                        phone: '18888888888',
                        email: '@email',
                        dept: { name: '研发部' },
                        job: {name: '全栈开发' },
                        state: 'on',
                        create_at: Date.now()
                    })
                }
            }
        }
    }
]
