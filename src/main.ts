import './assets/styles/index.less'

import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'

import App from './App.vue'
import i18n from './i18n'
import router from './router'

import { ConfigProvider } from 'ant-design-vue'
import viVN from 'ant-design-vue/es/locale/vi_VN'

startApp()

async function startApp() {
    const app = createApp(App)
    const initializingApp = createApp(app)

    app.use(VueQueryPlugin)
    app.use(i18n)
    app.use(router)
    app.use(ConfigProvider, {
        locale: viVN
    })
    try {
        initializingApp.mount('#app')
        console.info(
            ':::startApp -> Attempting to auto refresh token before startup, also persisting auth data into store'
        )
        console.info(':::startApp -> Persisted auth data into store')
    } catch {
        // TODO: catch error to start app on success or failure
    } finally {
        initializingApp.unmount()
    }

    app.mount('#app')
}
