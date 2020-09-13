import { ComponentType } from "react"
import _ from "lodash"

export type VariableType = { name: string, icon: ComponentType }

export type ScopeTreePath = number[]

export class ScopeTree {
    readonly variables: VariableType[]
    readonly scopes: ScopeTree[]
    readonly pathHere: ScopeTreePath

    constructor(variables: VariableType[], scopes: ScopeTree[], pathHere: ScopeTreePath) {
        this.variables = variables
        this.scopes = scopes
        this.pathHere = pathHere
    }
}

export function lineOfSight(scopeTree: ScopeTree, vantagePoint: ScopeTreePath): boolean {
    return _.zip(scopeTree.pathHere, vantagePoint).every(([x, y]) => x === undefined || x === y)
}

export default ScopeTree