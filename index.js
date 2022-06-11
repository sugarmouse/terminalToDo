const default_home_dir = require('os').homedir()
const fs = require('fs')
const path = require('path')

const home = process.env.HOME || default_home_dir
const dppath = path.join(home, '.todo')

module.exports.add = (title) => {

  fs.readFile(dppath, { encoding: 'utf-8', flag: 'a+' }, (readFile_err, data) => {
    if (readFile_err) {
      console.log(readFile_err)
    } else {
      let list
      try {
        list = JSON.parse(data.toString())
      } catch (err) {
        list = []
      }

      const task = {
        title: title,
        done: false
      }
      list.push(task)

      const string = JSON.stringify(list)
      console.log(string)
      fs.writeFile(dppath, string+'\n', (writeFile_err) => {
        if (writeFile_err) throw writeFile_err;
        console.log('The file has been saved!');
      })
    }
  })
}