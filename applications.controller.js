const chalk = require('chalk')
const Application = require('./models/Application')

async function addApplication(fullName, phoneNumber, problem) {
  await Application.create({ fullName, phoneNumber, problem });

  console.log(chalk.bgGreen('Application was added!'))
}

async function getApplication() {
  const applications = await Application.find();

  return applications;
}

module.exports = {
  addApplication, getApplication
}
