import Fly from 'flyio/dist/npm/wx'
const fly = new Fly

fly.interceptors.request.use((config, promise) => {
    wx.showLoading({ title: '正在加载中...' })
    config.headers["X-Tag"] = "flyio"
    return config
})

export function get(url, params) {
    return new Promise((resolve, reject) => {
        fly.get(url, params).then(response => {
            wx.hideLoading()
            resolve(response)
        }, err => {
            wx.hideLoading()
            wx.showToast({
                title: err.message,
                icon: 'none'
            })
            reject(err)
        }).catch((error) => {
            reject(error)
        })
    })
}

export function post(url, params) {
    return new Promise((resolve, reject) => {
        fly.post(url, params).then(response => {
            wx.hideLoading()
            resolve(response)
        }, err => {
            wx.hideLoading()
            wx.showToast({
                title: err.message,
                icon: 'none'
            })
            reject(err)
        }).catch((error) => {
            reject(error)
        })
    })
}

const env = process.env.NODE_ENV
if (env === 'development') {
    fly.config.baseURL = 'http://61.190.254.82:8080'
}

export default {
    /* 测试接口 */
    testApi(params) {
        return post('https://www.lexbst.com/server.php/api/v1/supplier/main?agent_id=1&main=1&scale=0', params)
    },
    lunboApi(params) {
        return get('/xijia/banner/list', params)
    },
    activityList(params) {
        return get('/xijia/activity/list', params)
    },
    saveUser(params) {
        return post('/xijia/user/saveUser', params)
    },
    userLogin(params) {
        return post('/xijia/user/userlogin', params)
    }
}