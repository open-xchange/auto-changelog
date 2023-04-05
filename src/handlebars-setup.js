

const addLinks = str => str
  .replace(/(CVE-\d+-\d+)/g, '[`$1`](https://www.cve.org/CVERecord?id=$1)')
  .replace(/^(?![A-Z]{2,9}-\d+-$)([A-Z]{2,9}-\d+)/g, '[`$1`](https://jira.open-xchange.com/browse/$1)')
const stripKeywords = (str) => addLinks(str.replace(/^(add(ed)?|change(d)?|deprecate(ed)?|fix(ed)?|remove(d)?|security)?:\s+?/i, ''))
const excise = (str) => {
  const entry = str.split('Changelog:\n')[1]
  return entry ? addLinks(entry).replace(/This is a breaking change\.\n/g, '').split('\n') : []
}

const compile = ({ subject, message, shorthash, href }) => {
  return [`${stripKeywords(subject)} [\`${shorthash}\`](${href})`, ...excise(message)].join('\n  ')
}

module.exports = Handlebars => Handlebars.registerHelper('custom', (context) => compile(context))
