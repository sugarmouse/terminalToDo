const program = require('commander')
const api = require('./index.js')

/**
 * 添加选项
*/
program
  .option('-x, --xxxx', 'what the x')

/**
 * 添加子命令
*/
program
  .command('add')
  .description('add a task')
  .action((...args) => {
    const words = args.slice(0, -1).join(' ')
    api.add(words)
  })

program
  .command('clear')
  .description('clear all tasks')
  .action((...args) => {
    const realArgs = args.slice(0, -1)
    console.log(realArgs)
  })

program.parse(process.argv)


