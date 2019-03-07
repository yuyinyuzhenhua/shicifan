const request = require('../utils/request')


exports.findByPostId = async (postId) => {
    const { data } = await request({
      url: '/comments',
      method: 'GET',
      params: {
        postId
      }
    })
    return data
  }