import Vue from 'vue'
import App from './App'
import http from '@/utils/request'

require('./reset.css')

Vue.prototype.$http = http
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        pages: ['^pages/index/main'],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'black'
        },
        tabBar: {
            color: '#333333',
            selectedColor: '#07a216',
            borderStyle: 'white',
            backgroundColor: '#f8f9fb',
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
