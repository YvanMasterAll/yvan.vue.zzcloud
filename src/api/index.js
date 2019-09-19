import request from '@/plugin/axios'
import * as urls from '@/dataSourceConfig'

class API {
  
    /// 登录
    async signin(data) {
        return await request({
            method: urls.signin.method, 
            url: urls.signin.url,
            params: data
        })
    }
}

export default new API()