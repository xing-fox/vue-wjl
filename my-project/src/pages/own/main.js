import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        backgroundColor: '#000000',
        navigationBarTitleText: '我的'
    }
}