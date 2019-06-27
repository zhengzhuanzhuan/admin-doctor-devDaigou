<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import defaultRoutes from '@/router/routers'
import LoginForm from '_c/login-form'
import { formatMenuToRouter } from '@/libs/businessUtil'
import { mapActions } from 'vuex'
export default {
    components: {
        LoginForm
    },
    methods: {
        ...mapActions([
            'handleLogin',
            'setUserId',
            'setAvator'
            // 'getUserInfo'
        ]),
        handleSubmit ({ userName, password }) {
            // todo 待进一步优化session的存储
            this.$API.Login.login({ username: userName, password: password, systemType: 2 }).then(res => {
                sessionStorage.setItem('rsysSessionId', res.data['rs-upms-server-session-id'])
                sessionStorage.setItem('rsysUserId', res.data.user.userId)
                sessionStorage.setItem('rsysUserName', res.data.user.userName)
							  sessionStorage.setItem('rsysUserRealName', res.data.user.realName)
                sessionStorage.setItem('rsysUserAvator', res.data.user.logo)
                sessionStorage.setItem('rsysLastLoginTime', res.data.user.lastLoginTime)
                sessionStorage.setItem('rsysPosition', res.data.user.position)
							  sessionStorage.setItem('rsysCallPhone', res.data.user.mobile) // todo 外呼号码未设置，待改正
                // todo vuex 强制刷新，会清空数据
                // this.setUserId(res.data.user.userId)
                // this.setAvator(res.data.user.logo)
                sessionStorage.setItem('rsysMenus', JSON.stringify(res.data.menus))
							// 是否有首页的权限
							if (JSON.stringify(res.data.menus).indexOf('home/homePage') === -1) {
                	sessionStorage.setItem('rsysHasHomeAuth', 0)
							} else {
								sessionStorage.setItem('rsysHasHomeAuth', 1)
							}
                // 获取按钮的url数组
                const btnPermissionsArr = []
                res.data.menus.forEach(item => {
                    if (item.menuType === 2) {
                        btnPermissionsArr.push(item.menuUrl)
                    }
                })
                sessionStorage.setItem('rsysBtnPermission', btnPermissionsArr)
                this.handleLogin(res.data['rs-upms-server-session-id'])
                this.$router.$addRoutes(formatMenuToRouter().concat(defaultRoutes))
                this.$router.push({
                    name: this.$config.homeName
                })
            }).catch(e => {
                console.log(e)
            })
        }
    }
}
</script>

<style>

</style>
