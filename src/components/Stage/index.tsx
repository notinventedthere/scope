import React, { useState } from 'react'
import Scope from './Scope'
import Variable from './Variable'
import { Box } from 'grommet'
import { Book, BarChart, Calculator, Car } from 'grommet-icons'
import ScopeTree, { ScopeTreePath } from '../../domain/scope-tree'
import { Context } from './context'

export function Stage() {
    const scopeTree = new ScopeTree(
        [{ name: 'calculator', icon: Calculator }],
        [
            new ScopeTree(
                [{ name: 'car', icon: Car }],
                [
                    new ScopeTree([{ name: 'bar chart', icon: BarChart }], [], [0, 0, 0]),
                    new ScopeTree([{ name: 'bar chart', icon: BarChart }], [], [0, 0, 1])
                ],
                [0, 0]
            ),
            new ScopeTree([{ name: 'book', icon: Book }], [], [0, 1])
        ],
        [0]
    )

    const [vantagePoint, setVantagePoint] = useState<ScopeTreePath>([0, 1])

    return (
        <Context.Provider value={{ vantagePoint, setVantagePoint }}>
            <Box
                alignContent='center'
                direction='column'
                pad='medium'
                fill
            >
                <Scope name='Global' scopeTree={scopeTree} />
            </Box>
        </Context.Provider>
    )
}

export default Stage