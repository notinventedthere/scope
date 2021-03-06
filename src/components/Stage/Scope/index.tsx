import React, { ReactNode, Dispatch, SetStateAction } from 'react'
import { Box, Heading } from 'grommet'
import ScopeBox from './ScopeBox'
import Variable, { FunctionVariable } from '../Variable'
import ScopeTree, { ScopeTreePath, VariableType } from '../../../domain/scope-tree'
import * as context from '../context'
import { scopeId } from '../../../utils/css'
import { ScopeConnections } from './ScopeConnections'
import _ from 'lodash'

export function GlobalScope(props: { scopeTree: ScopeTree, vantagePoint: ScopeTreePath, setVantagePoint: Dispatch<SetStateAction<ScopeTreePath>> }) {
    return (
        <Scope name='Global' {...props} />
    )
}

function Title({ children }: { children: ReactNode }) {
    return <Box width='100%' align='center'><Heading level='3' margin='small'>{children}</Heading></Box>
}

export function Scope(props: { name?: string, scopeTree: ScopeTree, vantagePoint: ScopeTreePath, setVantagePoint: Dispatch<SetStateAction<ScopeTreePath>> }) {
    const isVantagePoint = props.scopeTree.pathHere === props.vantagePoint
    const localTitle = isVantagePoint && 'Local'

    return (
        <ScopeBox
            visible={props.scopeTree.lineOfSight(props.vantagePoint)}
            onClick={() => props.setVantagePoint(props.scopeTree.pathHere)}
            id={scopeId(props.scopeTree.pathHere) + '-scope'}
            hoverable={!isVantagePoint}
        >
            <Title>{_.compact([props.name, localTitle]).join(' & ')}</Title>
            <Box
                direction='row-responsive'
                flex='grow'
                gap='small'
            >
                <ScopeConnections scope={props.scopeTree}>
                    <Box fill gap='small'>
                        <Variables variables={props.scopeTree.variables} scopes={props.scopeTree.scopes} />
                        <Scopes scopes={props.scopeTree.scopes} vantagePoint={props.vantagePoint} setVantagePoint={props.setVantagePoint} />
                    </Box>
                </ScopeConnections>
            </Box>
        </ScopeBox>
    )
}

function Variables(props: { variables: VariableType[], scopes: ScopeTree[] }) {
    return (
        <Box direction='row' gap='small' wrap>
            {props.variables.map(v => <Variable icon={v.icon} />)}
            {props.scopes.map(s => <FunctionVariable id={scopeId(s.pathHere) + '-variable'} />)}
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