import React, { ReactNode, Dispatch, SetStateAction } from 'react'
import { Box, Heading } from 'grommet'
import ScopeBox from './ScopeBox'
import Variable from '../Variable'
import ScopeTree, { ScopeTreePath, VariableType } from '../../../domain/scope-tree'
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
            visible={props.scopeTree.lineOfSight(props.vantagePoint)}
            onClick={() => props.setVantagePoint(props.scopeTree.pathHere)}
        >
            {props.name ? <Title>{props.name}</Title> : null}
            <Box
                direction='row-responsive'
                flex='grow'
                gap='small'
            >
                <Box fill gap='small'>
                    <Variables variables={props.scopeTree.variables} />
                    <Scopes scopes={props.scopeTree.scopes} vantagePoint={props.vantagePoint} setVantagePoint={props.setVantagePoint} />
                </Box>
            </Box>
        </ScopeBox>
    )
}

function Variables(props: { variables: VariableType[] }) {
    return (
        <Box direction='row' gap='small' wrap>
            {props.variables.map(v => <Variable icon={v.icon} />)}
        </Box>
    )
}

function Scopes(props: { scopes: ScopeTree[], vantagePoint: ScopeTreePath, setVantagePoint: Dispatch<SetStateAction<ScopeTreePath>> }) {
    return (
        <Box wrap fill gap='medium' direction='row-responsive' pad='small'>
            {props.scopes.map(s => <Scope scopeTree={s} vantagePoint={props.vantagePoint} setVantagePoint={props.setVantagePoint} />)}
        </Box>
    )
}

export function ScopeContainer(props: { name?: string, scopeTree: ScopeTree }) {
    const [vantagePoint, setVantagePoint] = context.useVantagePoint()

    return <Scope {...props} vantagePoint={vantagePoint} setVantagePoint={setVantagePoint} />
}

export default ScopeContainer