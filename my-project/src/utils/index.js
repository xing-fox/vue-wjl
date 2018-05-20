function formatNumber(n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
}

export function formatTime(date, type) {
    var dateT = new Date(date);
    const year = dateT.getFullYear()
    const month = dateT.getMonth() + 1
    const day = dateT.getDate()

    const hour = dateT.getHours()
    const minute = dateT.getMinutes()
    const second = dateT.getSeconds()

    const t1 = [year, month, day].map(formatNumber).join('-')
    const t2 = [hour, minute].map(formatNumber).join(':')

    if (type === 1) {
        return `${t1} ${t2}`
    } else {
        return `${t1}`
    }
}

export default {
    formatT(params, type) {
        return formatTime(params, type)
    }
}