import React, { useState, useEffect } from 'react'
import Scope from './Scope'
import { Box } from 'grommet'
import ScopeTree, { ScopeTreePath } from '../../domain/scope-tree'
import { Context } from './context'
import { generate } from '../../domain/random-generation'

export function Stage() {
    const [scopeTree, setScopeTree] = useState<ScopeTree>(new ScopeTree([], [], [0]))
    useEffect(() => {
        let tree = generate({ maxLevel: 4, pathHere: [0] })
        while (!tree) tree = generate({ maxLevel: 4, pathHere: [0] })
        setScopeTree(tree)
    }, [setScopeTree])

    const [vantagePoint, setVantagePoint] = useState<ScopeTreePath>([0])

    return (
        <Context.Provider value={{ vantagePoint, setVantagePoint }}>
            <Box
                alignContent='center'
                direction='column'
                pad='medium'
                fill
            >
                {scopeTree && <Scope name='Global' scopeTree={scopeTree} />}
            </Box>
        </Context.Provider>
    )
}

export default Stage