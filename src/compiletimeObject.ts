let objectKeys: <T extends object>(input: T) => (keyof T)[]
let objectEntries: <T extends object>(input: T) => [keyof T, T[keyof T]][]
let objectValues: <T extends object>(input: T) => T[keyof T][]
let tableToString: <T extends object>(table: T, name: string) => string

compiletime(() => {
  objectKeys = <T extends object>(input: T): (keyof T)[] => {
    return Object.keys(input) as (keyof T)[]
  }

  objectEntries = <T extends object>(input: T): [keyof T, T[keyof T]][] => {
    let result: [keyof T, T[keyof T]][] = []
    for (const key of objectKeys(input)) {
      result.push([key, input[key]])
    }
    return result
  }

  objectValues = <T extends object>(input: T): T[keyof T][] => {
    let result = []
    for (const key of objectKeys(input)) {
      result.push(input[key])
    }
    return result
  }

  function getSubTableText<T extends object>(
    text: string,
    table: T,
    name: string,
    indentsCount: number
  ): string {
    const indents = string.rep('\t', indentsCount)
    text = `${text}${indents}${name} = {\n`
    for (let [k, v] of pairs(table)) {
      let key = k as string
      let value = v as any
      if (type(tonumber(key)) == 'number') {
        key = `[${key}]`
      }
      if (type(value) == 'table') {
        text = getSubTableText(text, value, key, indentsCount + 1)
      } else {
        if (type(value) == 'string') {
          value = `"${value}"`
        }
        text = `${text}${indents}\t${key} = ${tostring(value)},\n`
      }
    }
    if (indentsCount > 0) {
      text = `${text}${indents}},\n`
    } else {
      text = `${text}}`
    }
    return text
  }

  tableToString = <T extends object>(
    table: T,
    name: string = 'defaultTable'
  ): string => {
    return getSubTableText('', table, `${tostring(table)} "${name}"`, 0)
  }
})
