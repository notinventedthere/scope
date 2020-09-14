import ScopeTree, { ScopeTreePath } from "./scope-tree";
import _ from "lodash";
import { Car, Calculator, Book, BarChart, Home, Folder, Filter } from 'grommet-icons'

export type GenerateArgs = {
    minLevel: number,
    maxLevel: number,
    pathHere: ScopeTreePath
}

export function generate(args: GenerateArgs): ScopeTree | null {
    const maybeTree = randomBool()

    if (args.minLevel > 0 || (maybeTree && args.maxLevel > 0)) {
        const variables = generateVariables()
        const g = (index: number) => generate({ maxLevel: args.maxLevel - 1, minLevel: args.minLevel - 1, pathHere: args.pathHere.concat([index]) })

        return new ScopeTree(variables, _.compact([g(0), g(1), g(2)]), args.pathHere)
    } else {
        return null
    }
}

function generateVariables() {
    const vars = [
        { name: 'car', icon: Car },
        { name: 'calculator', icon: Calculator },
        { name: 'book', icon: Book },
        { name: 'bar chart', icon: BarChart },
        { name: 'home', icon: Home },
        { name: 'folder', icon: Folder },
        { name: 'filter', icon: Filter },
    ]

    const varsLength = _.random(0, 3)
    const selection = new Array(varsLength).fill(0).map(() => vars[_.random(0, vars.length - 1)])
    return selection
}

function randomBool() {
    return Boolean(_.random(0, 1))
}