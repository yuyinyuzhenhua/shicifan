const Comment = require('../service/comment')

exports.list = async (req, res, next) => {
  const { postId } = req.query
  const data = await Comment.findByPostId(postId)
  res.status(200).send(data)
}
