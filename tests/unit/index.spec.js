import axios from 'axios'

// 命令行 > npm run test:unit -t tests/index.spec.js
// 命令行 > ./node_modules/.bin/vue-cli-service test:unit
// 注意一个坑，测试时遇到无法识别import语法的问题，这是因为没有配置.babelrc，在里面添加es2015插件即可
// 后面又接连遇到好几个坑，不能识别require.context，core-js版本太高，polyfill配置("useBuiltIns": "usage")，浪费了好多时间
// 需要注意的一点就是，如果开了翻墙，接口请求可能会报错，因为无法发请求，重开一个Terminal即可

// https://codeburst.io/mocking-and-stubbing-api-calls-in-vue-apps-with-cypress-and-jest-53ba4f34706a
// https://alexjover.com/blog/test-methods-and-mock-dependencies-in-vue-js-with-jest/


// describe('测试mock接口', () => { // 因为mockjs拦截不到来自测试用例的请求，所以这段代码只做参考

//     it('test', async (done) => {
//         let result = await axios.get('/api/demo/business/issues/142/fetch')
//         // let result = await axios.get('https://www.baidu.com')
//         console.log(result)
//         done()
//     })
// })

const baseUrl = 'http://localhost:3001'

describe('登录测试', () => {

    it('test', async (done) => {
        let result = await axios.post(baseUrl + '/api/auth/signin?name=test&password=test')
        expect(result.data.code).toBe(200)
        done()
    })
})