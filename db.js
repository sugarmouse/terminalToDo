/* 对系统文件的操作进行封装导出 */
const default_home_dir = require('os').homedir()
const fs = require('fs')
const path = require('path')


/* Setting the path to the file that will be used to store the todo list. */
const home = process.env.HOME || default_home_dir
const dppath = path.join(home, '.todo')

module.exports = {

 /* Reading the file and returning a promise. resolve todoList */
  read(path = dppath) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { encoding: 'utf-8', flag: 'a+' }, (readFile_err, data) => {
        if (readFile_err) return reject(readFile_err)
        let list
        try {
          list = JSON.parse(data.toString())
        } catch (err) {
          list = []
        }
        resolve(list)
      })
    })
  },

  write(list, path = dppath) {

    return new Promise((resolve, reject) => {

      const todoList = JSON.stringify(list)

      fs.writeFile(path, todoList + '\n', (writeFile_err) => {
        if (writeFile_err) return reject(writeFile_err)
        resolve('success')

      })
    })
  }
}