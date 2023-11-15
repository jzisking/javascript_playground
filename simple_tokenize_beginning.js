function hasSpaceLeft(i, amount, code) {
    return i + amount < code.length - 1
}

function finishIdent(tokens, identTemp) {
    if(identTemp.content.length > 0) {
        if(identTemp.content.trim() === "") {
            return;
        }

        tokens.push({
            name: "ident",
            content: identTemp.content.trim()
        })
    }
    identTemp.content = ""
}

function canParseToken(code, i, name) {
    if(!hasSpaceLeft(i, name.length, code)) {
        return 0;
    }

    for(let j = 1; j < name.length; j++) {
        if (code[i + j] !== name[j]) {
            return 0
        }
    }

    return name.length - 1
}

function tokenize(code) {
    let tokens = []
    let identTemp = {
        content: ""
    }

    for(let i = 0; i < code.length; i++) {
        let e = code[i]

        switch(e) {
            case "(":
                finishIdent(tokens, identTemp)
                tokens.push({
                    name: "("
                })
                break
            case ")":
                finishIdent(tokens, identTemp)
                tokens.push({
                    name: ")"
                })
                break
            case "{":
                finishIdent(tokens, identTemp)
                tokens.push({
                    name: "{"
                })
                break
            case "}":
                finishIdent(tokens, identTemp)
                tokens.push({
                    name: "}"
                })
                break
            case ":":
                finishIdent(tokens, identTemp)
                tokens.push({
                    name: ":"
                })
                break
            case "l":
            {
                let amount = canParseToken(code, i, "let ")
                if(amount !== 0) {
                    finishIdent(tokens, identTemp)
                    tokens.push({
                        name: "let"
                    })
                }

                i += amount
            }
            case "r":
            {
                let amount = canParseToken(code, i, "return ")
                if(amount !== 0) {
                    finishIdent(tokens, identTemp)
                    tokens.push({
                        name: "return"
                    })
                }

                i += amount
            }
                break
            case "f":
                let amount = canParseToken(code, i, "fn ");
                if(amount !== 0) {
                    finishIdent(tokens, identTemp)
                    tokens.push({
                        name: "fn"
                    })
                }

                i += amount
                break
            case "-":
                if(hasSpaceLeft(i, 1, code) && code[i + 1] === ">") {
                    tokens.push({
                        name: "->"
                    })
                    i += 1
                } else {
                    finishIdent(tokens, identTemp)
                }
                break
            case "=":
                finishIdent(tokens, identTemp)
                tokens.push({
                    name: "="
                })
                break
            case "+":
                finishIdent(tokens, identTemp)
                tokens.push({
                    name: "+"
                })
                break
            default:
                identTemp.content += code[i]
        }
    }

    return tokens
}

tokenize("fn main(a: i32) -> u32 {" +
    " let b = a + 5" +
    "\nreturn b" +
    "}"
).forEach(e => console.log(JSON.stringify(e)))
