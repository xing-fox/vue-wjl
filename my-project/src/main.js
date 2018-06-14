import Vue from 'vue'
import App from './App'
import http from '@/utils/request'
import format from '@/utils/index'

require('./reset.css')

Vue.prototype.$http = http
Vue.prototype.$format = format
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        pages: ['^pages/index/main'],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#ffffff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'black',
            backgroundColor: "#fff"
        },
        tabBar: {
            color: '#333333',
            selectedColor: '#07a216',
            borderStyle: 'black',
            backgroundColor: '#ffffff',
            list: [{
                    text: '首页',
                    pagePath: 'pages/index/main',
                    iconPath: 'static/homemr.png',
                    selectedIconPath: 'static/homeactive.png'
                },
                {
                    text: '购票',
                    pagePath: 'pages/buyCard/main',
                    iconPath: 'static/menpiaomr.png',
                    selectedIconPath: 'static/menpiaoactive.png'
                },
                {
                    text: '我的',
                    pagePath: 'pages/own/main',
                    iconPath: 'static/personmr.png',
                    selectedIconPath: 'static/personactive.png'
                }
            ]
        }
    }
}