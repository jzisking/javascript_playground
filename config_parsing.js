let content = `a = 5
b = 6
d = "Hallo"
e = [1, 2, 3]
test = "5.6"
`

function parse(c) {
    let lines = c.split("\n");
    let object = {}
    let removeWhitespace = s => s.replace(/\s/g, "")
    let parsingTable = {
        num: e => Number(e),
        str: e => e.substring(1, e.length - 1)
    }

    parsingTable.arr = e => {
        let elements = []
        e.substring(1, e.length - 1).split(",").forEach(f => {
            elements.push(selectParsingFunction(f)(f))
        })
        return elements
    }

    let selectParsingFunction = e => {
        if(!isNaN(e)) {
            return parsingTable.num
        } else if(e[0] === '"') {
            return parsingTable.str
        } else if(e[0] === "[") {
            return parsingTable.arr
        }
    }

    lines.forEach(e => {
        let split = removeWhitespace(e).split("=")
        if(split.length !== 2) {
            return
        }

        let parsingFunction = selectParsingFunction(split[1])
        object[split[0]] = parsingFunction(split[1])
    });

    return object
}

console.log(parse(content))
