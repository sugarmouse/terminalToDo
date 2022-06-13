/* 对 todoList 的操作封装 */
const db = require('./db')
const inquirer = require('inquirer')

module.exports.add = async (title) => {
  const list = await db.read()
  list.push({ title, done: false })
  await db.write(list)
}


module.exports.clear = async () => {
  await db.write([])
}

module.exports.showAll = async () => {
  const list = await db.read()
  showTasks(list)
}




function showTasks(list) {
  inquirer
    .prompt({
      type: 'list',
      name: 'index',
      message: '选择你要操作的任务：',
      choices: (list.map((task, index) => {
        return { name: `${task.done ? '[X]' : '[_]'} - No.${index + 1} -- ${task.title}`, value: index.toString() }
      })).concat([{ name: '退出', value: '-1' }, { name: '创建新的任务', value: '-2' }])
    })
    .then((answer) => {
      const index = parseInt(answer.index)
      if (index >= 0) {
        //选中了某个任务
        handleSelectedTask(list, index)
      } else if (index === -2) {
        //创建新的任务
        askForNewTask(list)
      }
    })
}

function handleSelectedTask(list, index) {
  const actions = {
    markDone: markSelectedTaskDone,
    markTodo: markSelectedTaskTodo,
    delete: deleteSelectedTask,
    modify: modifyTask
  }

  inquirer
    .prompt({
      type: 'list',
      name: 'action',
      message: '选择你需要进行的操作：',
      choices: [
        { name: '退出', value: 'quit' },
        { name: '已完成', value: 'markDone' },
        { name: '未完成', value: 'markTodo' },
        { name: '删除', value: 'delete' },
        { name: '修改任务', value: 'modify' },
      ]
    })
    .then(answer2 => actions[answer2.action](list, index))
}

function markSelectedTaskTodo(list, index) {
  list[index].done = false
  db.write(list)
}

function markSelectedTaskDone(list, index) {
  list[index].done = true
  db.write(list)
}

function deleteSelectedTask(list, index) {
  list.splice(index, 1)
  db.write(list)
}

function modifyTask(list, index) {
  inquirer.prompt({
    type: 'input',
    name: 'title',
    message: "新的任务标题",
    default: list[index].title
  }).then((task) => {
    if (task.title.length === 0) return
    list[index].title = task.title
    db.write(list)
  })
}

function askForNewTask(list) {
  inquirer.prompt({
    type: 'input',
    name: 'title',
    message: "新的任务标题",
  }).then((task) => {
    if (task.title.length === 0) return
    list.push({ title: task.title, done: false })
    db.write(list)
  })
}