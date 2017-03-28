#!/usr/bin/env node

const fs = require('fs')
const chalk = require('chalk')

const logDir = 'logs'
const currentDir = fs.readdirSync('.')
if (currentDir.indexOf(logDir) === -1) {
  console.log(chalk.bgRed(`No ./${logDir} directory found`))
}

const files = fs.readdirSync('./' + logDir)
const output = files.map(readFile)

function readFile (file) {
  const title = file.split('.')[0]
  const content = fs.readFileSync(`./${logDir}/${file}`, 'utf8')
  if(!content) return `
    ${chalk.yellow.bold(title)} – No info
  `
  const obj = JSON.parse(content)

  const {
    start_date,
    end_date,
    bandwidth
  } = obj.general

  const output = `
    ${chalk.green.bold(title)} – ${chalk.yellow.underline(bytesToSize(bandwidth))} – From: ${chalk.blue(start_date)} To: ${chalk.blue(end_date)}
  `
  return output
}

console.log(output.join(''))

function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes == 0) return '0 Byte'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}
