import { Box, Heading } from 'grommet'
import _ from 'lodash'
import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { animated, config, useSpring } from 'react-spring'
import ScopeTree, { ScopeTreePath, VariableType } from '../../../domain/scope-tree'
import { scopeId } from '../../../utils/css'
import AnimatedExpandText from '../../text/AnimatedExpandText'
import * as context from '../context'
import Variable, { FunctionVariable } from '../Variable'
import { InvisibleScopeContents } from './InvisibleScopeContents'
import ScopeBox from './ScopeBox'
import { ScopeConnections } from './ScopeConnections'

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
    const isVisible = props.scopeTree.lineOfSight(props.vantagePoint)

    const [ClickableHoverExpandText, hoverTextBindings] = useClickableHoverExpandText(isVantagePoint)
    const [hoverStyleProps, hoverHighlightBindings] = useScopeBoxHover(!isVantagePoint)

    const ScopeContents = (
        <ScopeConnections scope={props.scopeTree}>
            <Box fill gap='small'>
                <Variables variables={props.scopeTree.variables} scopes={props.scopeTree.scopes} />
                <Scopes scopes={props.scopeTree.scopes} vantagePoint={props.vantagePoint} setVantagePoint={props.setVantagePoint} />
            </Box>
        </ScopeConnections>
    )

    return (
        <AnimatedScopeBox
            onClick={() => props.setVantagePoint(props.scopeTree.pathHere)}
            id={scopeId(props.scopeTree.pathHere) + '-scope'}
            {...hoverTextBindings}
            onMouseOver={(event: any) => { hoverTextBindings.onMouseOver(event); hoverHighlightBindings.onMouseOver(event) }}
            onMouseOut={(event: any) => { hoverTextBindings.onMouseOut(event); hoverHighlightBindings.onMouseOut(event) }}
            style={hoverStyleProps}
        >
            <ClickableHoverExpandText>Enter Scope</ClickableHoverExpandText>
            <Title>{_.compact([props.name, localTitle]).join(' & ')}</Title>
            <Box
                direction='row-responsive'
                flex='grow'
                gap='small'
            >
                {isVisible ? ScopeContents : <InvisibleScopeContents>{ScopeContents}</InvisibleScopeContents>}
            </Box>
        </AnimatedScopeBox>
    )
}

const AnimatedScopeBox = animated(ScopeBox)

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

function useClickableHoverExpandText(isVantagePoint: boolean) {
    const [hovering, setHovering] = useState(false)

    const bindings = {
        onMouseOver: (event: any) => { event.stopPropagation(); setHovering(true) },
        onMouseOut: (event: any) => { event.stopPropagation(); setHovering(false) }
    }

    const ClickableHoverExpandText = (props: { children?: ReactNode }) => {
        return <AnimatedExpandText show={hovering && !isVantagePoint}>{props.children}</AnimatedExpandText>
    }
    return [ClickableHoverExpandText, bindings] as [typeof ClickableHoverExpandText, typeof bindings]
}

function useScopeBoxHover(hoverable: boolean) {
    const [animatedProps, setSpring] = useSpring(() => ({
        brightness: 100,
        config: { native: true, ...config.stiff }
    }))

    const bindings = {
        onMouseOver: (event: any) => { if (hoverable) setSpring({ brightness: 98 }) },
        onMouseOut: (event: any) => { setSpring({ brightness: 100 }) }
    }

    const style = { backgroundColor: animatedProps.brightness.interpolate(b => `hsl(240, 100%, ${b}%)`) }

    return [style, bindings] as [typeof style, typeof bindings]
}

export default ScopeContainer