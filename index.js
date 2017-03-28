#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const _ = require('lodash')

const logDir = 'logs'
const currentDir = fs.readdirSync('.')

if (currentDir.indexOf(logDir) === -1) {
  console.log(chalk.bgRed(`\nNo ./${logDir} directory found\n`))
  console.log(chalk.red(`cd ~`))
  process.exit()
}

const files = fs.readdirSync('./' + logDir)
const output = files.map(readFile)

function readFile (file) {
  const title = file.split('.')[0]
  const content = fs.readFileSync(`./${logDir}/${file}`, 'utf8')
  if(!content) return `
    ${chalk.yellow.bold(_.padEnd(title, 20))} No info
  `
  const obj = JSON.parse(content)

  let {
    start_date,
    end_date,
    bandwidth
  } = obj.general

  let estimate = _.round(bandwidth / 1024 / 1024 / 1024 * 0.09 * 4, 2)
  if (estimate > 10) {
    estimate = chalk.red(estimate)
  } else if (estimate > 1) {
    estimate = chalk.yellow(estimate)
  } else {
    estimate = chalk.green(estimate)
  }

  bandwidth = bytesToSize(bandwidth)
  if (bandwidth.includes('GB')) bandwidth = chalk.red(bandwidth)
  if (bandwidth.includes('MB')) bandwidth = chalk.yellow(bandwidth)
  if (bandwidth.includes('KB')) bandwidth = chalk.green(bandwidth)

  const output = `
    ${chalk.green.bold(_.padEnd(title, 20))} ${_.padEnd(bandwidth, 20)} $${_.padEnd(estimate + '/mo', 20)} From: ${chalk.blue(start_date)} To: ${chalk.blue(end_date)}
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
