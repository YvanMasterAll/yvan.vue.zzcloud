<script>
import util from '@/libs/util'
import sheetTableData from '@/mixins/sheetTableData'
// let json = '{"title":"包装测试表单","sn":"20063006","date":"2020-06-16","leader":"","tester":"黄辉","_sn1":"","_sn2":"","_sn3":"20063006","fanState":"正常","storeState":"正常","screenState":"正常","clip":"ZMF400TIN01A181207062.101","linkState":"紫铜","angle40LocalA1":"6.30","angle40LocalD1":"40","angle40DisplayR1":"8.7","angle40DisplayP1":"11.0","const5KLocalA1":"3.9","const5KLocalD1":"28.39","const5KDisplayR1":"5.5","const5KDisplayP1":"7.0","angle40LocalA2":"6.32","angle40LocalD2":"40","angle40DisplayR2":"8.7","angle40DisplayP2":"11.0","const5KLocalA2":"3.9","const5KLocalD2":"28.39","const5KDisplayR2":"5.5","const5KDisplayP2":"7.0","angle40LocalA3":"6.29","angle40LocalD3":"40","angle40DisplayR3":"8.7","angle40DisplayP3":"11.0","const5KLocalA3":"3.91","const5KLocalD3":"28.43","const5KDisplayR3":"5.5","const5KDisplayP3":"7.0","angle80LocalA1":"13.49","angle80LocalD1":"80","angle80DisplayR1":"18.5","angle80DisplayP1":"21.7","const10KLocalA1":"8.53","const10KLocalD1":"51.17","const10KDisplayR1":"11.8","const10KDisplayP1":"13.9","angle80LocalA2":"13.50","angle80LocalD2":"80","angle80DisplayR2":"18.5","angle80DisplayP2":"21.7","const10KLocalA2":"8.52","const10KLocalD2":"51.01","const10KDisplayR2":"11.8","const10KDisplayP2":"13.9","angle80LocalA3":"13.59","angle80LocalD3":"80","angle80DisplayR3":"18.7","angle80DisplayP3":"21.8","const10KLocalA3":"8.52","const10KLocalD3":"51.11","const10KDisplayR3":"11.8","const10KDisplayP3":"13.9","waveState":"正常","remark":"","leader2":"","date2":"2020-06-16","tester2":"","fan2State":"正常","store2State":"正常","screen2State":"正常","screw2State":"正常","fit2State":"外置","clip2":"","freq2State":"中频","card2State":"正常","screenVer2State":"普通","screenVerDesc":"","angleLocalA1":"","angleLocalD1":"","angleDisplayR1":"","angleDisplayP1":"","constLocalA1":"","constLocalD1":"","constDisplayR1":"","constDisplayP1":"","angleLocalA2":"","angleLocalD2":"","angleDisplayR2":"","angleDisplayP2":"","constLocalA2":"","constLocalD2":"","constDisplayR2":"","constDisplayP2":"","angleLocalA3":"","angleLocalD3":"","angleDisplayR3":"","angleDisplayP3":"","constLocalA3":"","constLocalD3":"","constDisplayR3":"","constDisplayP3":"","clean2State":"清洁","pressure2State":"完好","parts2State":"完整","pack2State":"纸箱","recheck2":"","wave2State":"正常","company":"广东旭日电器设备","remark2":"","attachments":""}'
let json = '{"leader":"测试数据1","date":"2020-06-16","tester":"黄辉","_sn1":"","_sn2":"","_sn3":"20063010","fanState":"异常","storeState":"正常","screenState":"异常","clip":"ZMF400TIN01A181207062.101","linkState":"黄铜","angle40LocalA1":"6.30","angle40LocalD1":"40","angle40DisplayR1":"8.7","angle40DisplayP1":"11.0","const5KLocalA1":"3.9","const5KLocalD1":"28.39","const5KDisplayR1":"5.5","const5KDisplayP1":"7.0","angle40LocalA2":"6.32","angle40LocalD2":"40","angle40DisplayR2":"8.7","angle40DisplayP2":"11.0","const5KLocalA2":"3.9","const5KLocalD2":"28.39","const5KDisplayR2":"5.5","const5KDisplayP2":"7.0","angle40LocalA3":"6.29","angle40LocalD3":"40","angle40DisplayR3":"8.7","angle40DisplayP3":"11.0","const5KLocalA3":"3.91","const5KLocalD3":"28.43","const5KDisplayR3":"5.5","const5KDisplayP3":"7.0","angle80LocalA1":"13.49","angle80LocalD1":"80","angle80DisplayR1":"18.5","angle80DisplayP1":"21.7","const10KLocalA1":"8.53","const10KLocalD1":"51.17","const10KDisplayR1":"11.8","const10KDisplayP1":"13.9","angle80LocalA2":"13.50","angle80LocalD2":"80","angle80DisplayR2":"18.5","angle80DisplayP2":"21.7","const10KLocalA2":"8.52","const10KLocalD2":"51.01","const10KDisplayR2":"11.8","const10KDisplayP2":"13.9","angle80LocalA3":"13.59","angle80LocalD3":"80","angle80DisplayR3":"18.7","angle80DisplayP3":"21.8","const10KLocalA3":"8.52","const10KLocalD3":"51.11","const10KDisplayR3":"11.8","const10KDisplayP3":"13.9","waveState":"正常","remark":"","leader2":"","date2":"2020-06-16","tester2":"","fan2State":"正常","store2State":"正常","screen2State":"正常","screw2State":"正常","fit2State":"外置","clip2":"","freq2State":"中频","card2State":"正常","screenVer2State":"普通","screenVerDesc":"","angleLocalA1":"1","angleLocalD1":"1","angleDisplayR1":"5","angleDisplayP1":"5","constLocalA1":"22","constLocalD1":"7","constDisplayR1":"7","constDisplayP1":"8","angleLocalA2":"1","angleLocalD2":"3","angleDisplayR2":"2","angleDisplayP2":"11","constLocalA2":"22","constLocalD2":"6","constDisplayR2":"7","constDisplayP2":"8","angleLocalA3":"1","angleLocalD3":"1","angleDisplayR3":"5","angleDisplayP3":"2","constLocalA3":"5","constLocalD3":"7","constDisplayR3":"7","constDisplayP3":"9","clean2State":"清洁","pressure2State":"完好","parts2State":"完整","pack2State":"不包装","recheck2":"测试数据2","wave2State":"异常","company":"广东旭日电器设备","remark2":"22222","attachments":"hello*http://image.yy.com/yywebalbumbs2bucket/144152f8680f421599233c6ffcfcef49_1476265267104.jpeg|5G机会图.png*http://localhost:3001/sheet/upload/upload-172dadebeb5.png","title":"包装测试表格","tmpl_id":3,"sn":"20063010"}'
export default {
    // name: 'oa-sheet-detail',
    mixins: [sheetTableData],
    render() {
        if (!this.sheet.template) {
            return null
        }
        var page = 
            <d2-container>
                <d2-search-panel slot='header'>
                    <template slot="prefix">
                        <div>
                            <d2-button type="primary" class='is-thin' size='mini' icon="el-icon-arrow-left" label="返回表格列表" to="/oa/sheet/list" plain/>
                        </div>
                    </template>
                    <template slot="title">
                        <div style='display: flex; justify-content: flex-end;'>
                            <el-button-group>
                                { this.renderSaveButton }
                            </el-button-group>
                        </div>
                    </template>
                </d2-search-panel>
                { this.renderSheet() }
            </d2-container>
        return page
    },
    created() {
        // 获取路由参数
        let data = this.$route.params.data
        let tmpl = this.$route.params.tmpl
        let fields = this.$route.params.fields
        this.initData(data, tmpl, fields)
    },
    methods: {

    }
}
</script>