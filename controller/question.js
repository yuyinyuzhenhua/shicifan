const Question = require('../service/question')
const User = require('../service/user')
const Vote = require('../service/vote')

exports.showNew = async (req, res, next) => {
    res.render('questions/new.html')
}

exports.create = async (req, res, next) => {
    try {
        const { title, tags, body } = req.body
        console.log(title, tags, body )
        const ret = await Question.create({
          title,
          tags,
          body,
          userId: req.session.user._id
        })
        res.send(ret)
      } catch (err) {
        next(err)
      }
}


exports.show = async (req, res, next) => {
    try {
        const { id: questionId } = req.params
        const question = await Question.findById(questionId);
        console.log(question)
        if (!question) {
            return res.render('error.html', {
                message: '该资源不存在！'
            })
        }
        question.user = await User.findById(question.userId);
        const { data: votes } = await Vote.find({
            type: 'posts',
            typeId: questionId,
            userId: req.session.user._id            
        })

        question.vote = votes[0]
        res.render('questions/show.html',{ question: question })
    } catch (err) {
        next(err)
    }
}