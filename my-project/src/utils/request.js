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
    // const BaseURL = 'http://61.190.254.82:8080/xijia/'
    // const BaseURL = 'https://83031202.xiaoqibuz.com/xijia/'
const BaseURL = 'https://laliga.soccerworld.cn/xijia/'
if (env === 'development') {
    fly.config.baseURL = BaseURL
}

export default {
    baseURL: 'http://61.190.254.82:8080/xijia/',
    // 根据经纬度获取城市名
    listByGeno(params) {
        return get(BaseURL + 'city/listByGeno', params)
    },
    // 获取活动城市列表
    cityList(params) {
        return get(BaseURL + 'city/list', params)
    },
    // 获取对应城市商场列表
    mallList(params) {
        return get(BaseURL + 'mall/list', params)
    },
    // 轮播图
    lunboApi(params) {
        return get(BaseURL + 'banner/list', params)
    },
    // 专题活动列表
    activityList(params) {
        return get(BaseURL + 'activity/list', params)
    },
    // 专题活动详情
    activityDetail(params) {
        return get(BaseURL + 'activity/listDetail', params)
    },
    // 球童候选人列表
    voteList(params) {
        return get(BaseURL + 'vote/list', params)
    },
    // 球童候选人投票
    voteDo(params) {
        return get(BaseURL + 'vote/voteDo', params)
    },
    // 精选活动列表
    activityHomeList(params) {
        return get(BaseURL + 'activityHome/list', params)
    },
    // 精选活动详情
    activityHomeDetail(params) {
        return get(BaseURL + 'activityHome/listDetail', params)
    },
    // 注册
    saveUser(params) {
        return get(BaseURL + 'user/saveUser', params)
    },
    // 短信发送接口
    getCode(params) {
        return get(BaseURL + 'user/sendSms', params)
    },
    // 登录
    userLogin(params) {
        return get(BaseURL + 'user/userlogin', params)
    },
    // 购票列表
    ticketList(params) {
        return get(BaseURL + 'ticket/list', params)
    },
    // 我的购票记录
    myTicket(params) {
        return get(BaseURL + 'ticket/myTicket', params)
    },
    // 积分明细
    userIntegral(params) {
        return get(BaseURL + 'integralchange/getIntegral', params)
    },
    // 赠送记录
    getShareGift(params) {
        return get(BaseURL + 'integralchange/getShareGift', params)
    },
    // 兑换记录
    getDuihuan(params) {
        return get(BaseURL + 'integralchange/getDuihuan', params)
    },
    // 关于兑换
    getShareDescription(params) {
        return get(BaseURL + 'integralchange/getShareDescription', params)
    },
    // 更新用户信息
    updateuser(params) {
        return get(BaseURL + 'user/updateuser', params)
    },
    // 赠送积分
    shareGift(params) {
        return get(BaseURL + 'integralchange/shareGift', params)
    },
    // 领取积分
    obtailShareGift(params) {
        return get(BaseURL + 'integralchange/obtailShareGift', params)
    },
    // 生成订单
    getPayInfo(params) {
        return get(BaseURL + 'wxpay/getPayInfo', params)
    },
    // 保存订单记录
    saveOrder(params) {
        return get(BaseURL + 'wxpay/saveOrder', params)
    },
    // 选择球队
    selectTeam(params) {
        return get(BaseURL + 'debi/selectTeam', params)
    },
    // 球童排名
    listTp(params) {
        return get(BaseURL + 'rank/list_tp', params)
    },
    // 德比大战排行榜
    debiRank(params) {
        return get(BaseURL + 'debi/debiRank', params)
    }
}