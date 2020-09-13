import { createContext, useContext, Dispatch, SetStateAction } from 'react'
import { ScopeTreePath } from '../../domain/scope-tree'

export const Context = createContext<{
    vantagePoint: ScopeTreePath,
    setVantagePoint: Dispatch<SetStateAction<ScopeTreePath>>
} | undefined>(undefined)

export function useVantagePoint(): [ScopeTreePath, Dispatch<SetStateAction<ScopeTreePath>>] {
    const context = useContext(Context)
    return [context!.vantagePoint, context!.setVantagePoint]
}