const request = require('../utils/request')

exports.find = async (vote) => {
    return request({
        url:'/votes',
        method: 'GET',
        params: {
            type: vote.type,
            typeId: vote.typeId,
            userId: vote.userId
        }
    })
}