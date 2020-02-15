const lint = require('../')
const minimist = require('minimist')

const argv = minimist(process.argv.slice(2))

const help = () => console.log(`
This is zhlint!

Usage:
zhlint --fix <filepath> ...
zhlint --help
`.trim())

if (argv.h || argv.help) {
  help()
  return
}

if (argv.f || argv.fix) {
  const files = [...argv._]
  files.forEach(file => {
    console.log(`[start] ${file}`)
    try {
      const input = fs.readFileSync(file, { encoding: 'utf8' })
      const output = lint(input)
      fs.writeFileSync(file, output)
      console.log(`[done] ${file}`)
    } catch (e) {
      console.error(e)
    }
  })
}