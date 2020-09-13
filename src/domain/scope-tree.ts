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

    /**
     * Whether this part of the tree is in the scope of the vantagePoint
     */
    lineOfSight(vantagePoint: ScopeTreePath): boolean {
        return _.zip(this.pathHere, vantagePoint).every(([x, y]) => x === undefined || x === y)
    }

    levels(): ScopeTree[][] {
        const self: ScopeTree = this
        return [[self]].concat(_.zipWith(this.scopes.map(s => s.levels()), levelParts => levelParts.flat()))
    }
}


export default ScopeTree