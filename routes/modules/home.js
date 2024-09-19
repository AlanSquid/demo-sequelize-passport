const express = require('express');
const router = express.Router();
const { User, Todo } = require('../../models');

/* GET home page. */
router.get('/', async function (req, res, next) {

  const id = req.user.id;
  const user = await User.findOne({
    where: {
      id
    },
    include: [
      {
        model: Todo,
        attributes: ['id', 'title', 'isDone']
      },
      {
        model: User,
        as: 'following',
        attributes: ['id', 'name', 'age'],
        through: { attributes: [] }
      }
    ],
    // raw: true,
    nest: true
  });
  if (!user) return res.redirect('/users/login');

  const formatTodos = user.Todos.map(todo => {
    todo.isDone = todo.isDone ? '完成' : '未完成'
    return todo
  }) 
  
  res.render('index', {
    todos: formatTodos,
    user: user.toJSON()
  });
});

module.exports = router;

