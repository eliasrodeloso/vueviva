const path = require('path')
const NodeFtp = require('ftp')
const config = require('../config')
const chalk = require('chalk')
const fse = require('fs-extra')
const array = require('lodash/array')

const log = msg => console.log(msg)

// FPT conf object
const ftpConfig = {
  host: 'ftp.digitalcenter.com.co',
  port: 21,
  user: 'u539553597',
  password: 'asd123...',
  path: '/public_html/viva'
}

function _getFiles (dir) {
  let files = [] // array to return
  let list // list to store the list of files in the directory

  // To know if is an absolute path or not
  if (path.isAbsolute(dir)) {
    list = fse.readdirSync(dir)
  } else {
    list = fse.readdirSync(path.join(config.build.assetsRoot, dir))
  }

  list.forEach(file => {
    let pathToFile = path.join(dir, file) // Get the absolute path to file in loop
    let st = fse.statSync(pathToFile)

    if (st && st.isDirectory()) {
      files = array.union(files, _getFiles(pathToFile)) // If directory, call recursively the same method
    } else {
      files.push(pathToFile)
    }
  })

  return files
}

function _getDirs (dir) {
  let dirs = [] // array to return
  let list // list to store the list of files in the directory

  // To know if is an absolute path or not
  if (path.isAbsolute(dir)) {
    list = fse.readdirSync(dir)
  } else {
    list = fse.readdirSync(path.join(config.build.assetsRoot, dir))
  }

  list.forEach(file => {
    let pathToFile = path.join(dir, file) // Get the absolute path to file in loop
    let st
    if (path.isAbsolute(pathToFile)) {
      st = fse.statSync(pathToFile)
    } else {
      st = fse.statSync(path.join(config.build.assetsRoot, pathToFile))
    }

    if (st && st.isDirectory()) {
      pathToFile = pathToFile.split(config.build.assetsRoot + path.sep).join('')
      pathToFile = pathToFile.replace(/\\/g, '/')
      dirs.push(_getDirs(pathToFile))
    } else {
      let dir = path.parse(pathToFile).dir === config.build.assetsRoot ? '' : path.parse(pathToFile).dir
      dirs.push(dir)
    }
  })

  return array.compact(array.flattenDeep(array.uniq(dirs)))
}

function _cleanServer (callback) {
  client.rmdir(`${ftpConfig.path}/.`, true, err => {
    if (!err) {
      log(chalk.green(`Directory ${ftpConfig.path} cleaned succesfully`))
      callback.call()
    } else {
      log(chalk.magenta(`${err}`))
    }
  })
}

function _uploadFiles (filesList) {
  filesList.forEach(file => {
    let pathFile = _getServerPath(file)
    let serverFilePath = `${ftpConfig.path}/${pathFile}`
    client.put(file, serverFilePath, err => {
      if (!err) {
        log(chalk.blue(`File ${pathFile} uploaded to ${serverFilePath} correctly`))
      } else {
        log(chalk.magenta(`${err}`))
      }
    })
  })
}

function _getServerPath (filePath) {
  let serverPath = filePath.split(config.build.assetsRoot + path.sep).join('')
  serverPath = serverPath.replace(/\\/g, '/')
  return serverPath
}

function _createDirectories (dirsList) {
  dirsList.forEach(dir => {
    dir = dir.replace(/\\/g, '/')
    client.mkdir(`${ftpConfig.path}/${dir}`, true, (err) => {
      if (!err) {
        log(chalk.green(`Directory ${dir} created succesfully`))
      } else {
        log(chalk.magenta(`${err}`))
      }
    })
  })
}

const client = new NodeFtp()

client.connect(ftpConfig)

fse.ensureDirSync(config.build.assetsRoot)

client.on('ready', () => {
  log(chalk.green(`Connection to ${ftpConfig.host}:${ftpConfig.port}@${ftpConfig.user} started succesfully`))
  _cleanServer(() => {
    let dirs = _getDirs(config.build.assetsRoot)
    _createDirectories(dirs)
    _uploadFiles(_getFiles(config.build.assetsRoot))
  })
  client.end()
})

client.on('end', () => {
  log(chalk.green(`Connection to ${ftpConfig.host}:${ftpConfig.port}@${ftpConfig.user} ended succesfully`))
})
