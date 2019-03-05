const request = require('../utils/request')

exports.create = async (post) => {
    const { data } = await request({
      url: '/posts',
      method: 'POST',
      data: {
        title: post.title,
        body: post.body,
        tags: post.tags,
        userId: post.userId
      }
    })
    return data
  }

exports.findById = async (id) => {
    const { data } = await request({
        url: `/posts/${id}`,
        method: 'GET'
    })
    
    return data
}
