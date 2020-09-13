import { ScopeTreePath } from "../domain/scope-tree";

export function scopeId(pathHere: ScopeTreePath): string {
    return pathHere.join('-')
}