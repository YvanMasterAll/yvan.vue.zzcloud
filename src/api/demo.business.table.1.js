import request from '@/plugin/axios'

export function BusinessTable1List(params) {
    return request({
        api: {
            url: 'api/demo/business/table/1/fetch',
            method: 'get',
        },
        params
    })
}
