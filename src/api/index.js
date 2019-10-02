import request from '@/plugin/axios'
import * as urls from '@/dataSourceConfig'

class API {
  
    /// 登录
    async signin(data) {
        return await request({
            api: urls.signin,
            params: data
        })
    }
}

export default new API()