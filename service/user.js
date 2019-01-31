const request = require('../utils/request')

exports.findByNickname = async (nickname) => {
    const { data } = await request({
        url: '/users',
        method: "GET",
        params: {
            nickname
        }
    })
    return data[0]
}

exports.findByUsername = async (username) => {
    const { data } = await request({
      url: '/users',
      method: 'GET',
      params: {
        username
      }
    })
    return data[0]
  }

  exports.signup = async (user) => {
    console.log(90909090)
    const { data } = await request({
      url: '/users/signup',
      method: 'POST',
      data: {
        email: user.email,
        password: user.password,
        nickname: user.nickname
      }
    })
    console.log('data============');
    console.log(data);
    return data
  }


  
exports.create = async (user) => {
    const { data } = await request({
      url: '/users',
      method: 'POST',
      data: {
        username: user.username,
        password: user.password,
        nickname: user.nickname
      }
    })
    return data
  }


  exports.signin = async (user) => {
    const { data } = await request({
      url: '/users/signin',
      method: 'POST',
      data: {
        email:user.email,
        password:user.password
      }
    })
    return data
  }