/* terminalTODO 的命令描述 */

const program = require('commander')
const api = require('./index.js')

/* add options */
program
  .option('')

/* add sub commander */
program
  .command('add')
  .description('add a task')
  .action((...args) => {
    const words = args.slice(0, -1).join(' ')
    api.add(words).then(() => console.log('添加成功'), () => console.log('添加失败'))
  })

program
  .command('clear')
  .description('clear all tasks')
  .action((...args) => {
    api.clear().then(() => console.log('任务已清空'), () => console.log('清空任务失败'))
  })

program.parse(process.argv)


if (process.argv.length === 2) {
  api.showAll()
}