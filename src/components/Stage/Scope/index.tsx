import React, { ReactNode, ReactEventHandler, Dispatch, SetStateAction } from 'react'
import { Box, Heading } from 'grommet'
import ScopeBox from './ScopeBox'
import Variable from '../Variable'
import ScopeTree, { ScopeTreePath, lineOfSight } from '../../../domain/scope-tree'
import * as context from '../context'

export function GlobalScope(props: { scopeTree: ScopeTree, vantagePoint: ScopeTreePath, setVantagePoint: Dispatch<SetStateAction<ScopeTreePath>> }) {
    return (
        <Scope name='Global' {...props} />
    )
}

function Title({ children }: { children: ReactNode }) {
    return <Box width='100%' align='center' height='10%'><Heading level='2'>{children}</Heading></Box>
}

export function Scope(props: { name?: string, scopeTree: ScopeTree, vantagePoint: ScopeTreePath, setVantagePoint: Dispatch<SetStateAction<ScopeTreePath>> }) {
    return (
        <ScopeBox
            visible={lineOfSight(props.scopeTree, props.vantagePoint)}
            onClick={() => props.setVantagePoint(props.scopeTree.pathHere)}
        >
            {props.name ? <Title>{props.name}</Title> : null}
            <Box
                direction='row-responsive'
                flex='grow'
                gap='small'
            >
                <Box fill gap='small'>
                    <Box direction='row' gap='small' wrap>
                        {props.scopeTree.variables.map(v => <Variable icon={v.icon} />)}
                    </Box>
                    <Box fill gap='large' direction='row-responsive' pad='large'>
                        {props.scopeTree.scopes.map(s => <Scope scopeTree={s} vantagePoint={props.vantagePoint} setVantagePoint={props.setVantagePoint} />)}
                    </Box>
                </Box>
            </Box>
        </ScopeBox>
    )
}

export function ScopeContainer(props: { name?: string, scopeTree: ScopeTree }) {
    const [vantagePoint, setVantagePoint] = context.useVantagePoint()

    return <Scope {...props} vantagePoint={vantagePoint} setVantagePoint={setVantagePoint} />
}

export default ScopeContainer