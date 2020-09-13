import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'
import { Box, Image, Stack } from 'grommet'
import Machine from '../../../automation.svg'
import { useSpring, config, animated } from 'react-spring'

export type ScopeBoxProps = {
    visible: boolean,
    children: ReactNode,
    hover?: boolean,
    className?: string,
} & React.HTMLAttributes<HTMLDivElement>

const InvisibleScopeContents = ({ children }: { children: ReactNode }) => (
    <Box fill>
        <Stack
            interactiveChild='last'
            fill
        >
            {children}
            <Box align='center' justify='center' fill background='light-2' round='small'>
                <Image width='100em' opacity='50%' src={Machine} alt='invisible scope' />
            </Box>
        </Stack>
    </Box>
)

export const ScopeBox = styled((props: ScopeBoxProps) => {
    return (
        <Box
            pad='small'
            border={{ style: 'solid', size: 'small' }}
            round='small'
            flex='grow'
            onClick={(event: any) => { event.stopPropagation(); props.onClick && props.onClick(event) }}
            onMouseOver={(event: any) => { event.stopPropagation(); props.onMouseOver && props.onMouseOver(event) }}
            onMouseOut={(event: any) => { event.stopPropagation(); props.onMouseOut && props.onMouseOut(event) }}
            hoverIndicator={false}
            focusIndicator={false}
            className={props.className}
            style={props.style}
            id={props.id}
        >
            {props.visible ? props.children : <InvisibleScopeContents>{props.children}</InvisibleScopeContents>}
        </Box>
    )
})`
  cursor: default;
`

export function ScopeBoxInteractive(props: Omit<ScopeBoxProps, 'hover'>) {
    const [hover, setHover] = useState(false)
    const animatedProps = useSpring({ from: { brightness: 100 }, brightness: hover ? 98 : 100, config: config.stiff })

    const AnimatedScopeBox = animated(ScopeBox)
    return (
        <AnimatedScopeBox
            onMouseOver={(event: any) => { setHover(true); props.onMouseOver && props.onMouseOver(event) }}
            onMouseOut={(event: any) => { setHover(false); props.onMouseOut && props.onMouseOut(event) }}
            hover={hover}
            style={{ backgroundColor: animatedProps.brightness.interpolate(b => `hsl(240, 100%, ${b}%)`) }}
            {...props}
        >
            {props.children}
        </AnimatedScopeBox>
    )
}

export default ScopeBoxInteractive