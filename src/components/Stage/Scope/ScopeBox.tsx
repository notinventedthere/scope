import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'
import { Box, Image, Stack } from 'grommet'
import Machine from '../../../automation.svg'
import Invisible from '../../../invisible.svg'

export type ScopeBoxProps = {
    visible: boolean,
    children: ReactNode,
    hover?: boolean,
    onClick?: (event: React.MouseEvent) => void,
    onMouseOver?: (event: React.MouseEvent) => void,
    onMouseOut?: (event: React.MouseEvent) => void,
    className?: string
}

const InvisibleScopeContents = ({ children }: { children: ReactNode }) => (
    <Box fill>
        <Stack
            interactiveChild='last'
            fill
        >
            {children}
            <Box align='center' justify='center' fill background='light-2' round='small'>
                <Stack>
                    <Image width='100em' opacity='50%' src={Machine} />
                    <Image width='100em' opacity='50%' src={Invisible} alt='Invisible scope' />
                </Stack>
            </Box>
        </Stack>
    </Box>
)

export const ScopeBox = styled((props: ScopeBoxProps) => {
    return (
        <Box
            pad='medium'
            border={{ style: 'solid', size: 'small' }}
            round='small'
            flex='grow'
            onClick={(event: React.MouseEvent) => { event.stopPropagation(); props.onClick && props.onClick(event) }}
            onMouseOver={(event: React.MouseEvent) => { event.stopPropagation(); props.onMouseOver && props.onMouseOver(event) }}
            onMouseOut={(event: React.MouseEvent) => { event.stopPropagation(); props.onMouseOut && props.onMouseOut(event) }}
            hoverIndicator={false}
            focusIndicator={false}
            className={props.className}
        >
            {props.visible ? props.children : <InvisibleScopeContents>{props.children}</InvisibleScopeContents>}
        </Box>
    )
})`
  cursor: default;
  background: ${props => props.hover ? 'lightblue' : 'white'};
`

export function ScopeBoxInteractive(props: Omit<ScopeBoxProps, 'hover'>) {
    const [hover, setHover] = useState(false)

    return (
        <ScopeBox
            onMouseOver={(event) => { setHover(true); props.onMouseOver && props.onMouseOver(event) }}
            onMouseOut={(event) => { setHover(false); props.onMouseOut && props.onMouseOut(event) }}
            hover={hover}
            {...props}
        >
            {props.children}
        </ScopeBox>
    )
}

export default ScopeBoxInteractive