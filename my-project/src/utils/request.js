import Fly from 'flyio/dist/npm/wx'
const fly = new Fly

fly.interceptors.request.use((config, promise) => {
    // wx.showLoading({ title: '正在加载中...' })
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
    fly.config.baseURL = 'http://61.190.254.82:8080/xijia/'
}

export default {
    baseURL: 'http://61.190.254.82:8080/xijia/',
    // 根据经纬度获取城市名
    listByGeno(params) {
        return get('city/listByGeno', params)
    },
    // 获取活动城市列表
    cityList(params) {
        return get('city/list', params)
    },
    // 获取对应城市商场列表
    mallList(params) {
        return get('mall/list', params)
    },
    // 轮播图
    lunboApi(params) {
        return get('banner/list', params)
    },
    // 专题活动列表
    activityList(params) {
        return get('activity/list', params)
    },
    // 专题活动详情
    activityDetail(params) {
        return get('activity/listDetail', params)
    },
    // 球童候选人列表
    voteList(params) {
        return get('vote/list', params)
    },
    // 球童候选人投票
    voteDo(params) {
        return get('vote/voteDo', params)
    },
    // 精选活动列表
    activityHomeList(params) {
        return get('activityHome/list', params)
    },
    // 精选活动详情
    activityHomeDetail(params) {
        return get('activityHome/listDetail', params)
    },
    // 注册
    saveUser(params) {
        return get('user/saveUser', params)
    },
    // 短信发送接口
    getCode(params) {
        return get('user/sendSms', params)
    },
    // 登陆
    userLogin(params) {
        return get('user/userlogin', params)
    },
    // 购票列表
    ticketList(params) {
        return get('ticket/list', params)
    },
    // 我的购票记录
    myTicket(params) {
        return get('ticket/myTicket', params)
    },
    // 积分明细
    userIntegral(params) {
        return get('integralchange/getIntegral', params)
    },
    // 赠送记录
    getShareGift(params) {
        return get('integralchange/getShareGift', params)
    },
    // 兑换记录
    getDuihuan(params) {
        return get('integralchange/getDuihuan', params)
    },
    // 关于兑换
    getShareDescription(params) {
        return get('integralchange/getShareDescription', params)
    },
    // 更新用户信息
    updateuser(params) {
        return get('user/updateuser', params)
    },
    // 赠送积分
    shareGift(params) {
        return get('integralchange/shareGift', params)
    },
    // 领取积分
    obtailShareGift(params) {
        return get('integralchange/obtailShareGift', params)
    }
}