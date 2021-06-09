const User = require('../models/User')


async function login(req, res, next) {

  const { email, password } = req.body

  const user = await User.findOne({ where: {email} })

  if (!user) return res.render('admin/session/login', {
    user: req.body,
    error: "Usuário não cadastrado!"
  })

  const passedMatch = password == user.password

  if (!passedMatch) return res.render('admin/session/login', {
    user: req.body,
    error: 'Senha incorreta!'
  })

  req.user = user

  next()
}

module.exports = {
  login
}