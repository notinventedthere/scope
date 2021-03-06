import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Box, Image, Stack } from 'grommet'
import Machine from '../../../automation.svg'
import { useSpring, config, animated } from 'react-spring'

export type ScopeBoxProps = {
    visible: boolean,
    children: ReactNode,
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
                <Image height='50%' style={{ maxHeight: '5em' }} opacity='50%' src={Machine} alt='invisible scope' />
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

export function ScopeBoxInteractive(props: ScopeBoxProps & { hoverable?: boolean }) {
    const [animatedProps, setSpring] = useSpring(() => ({
        from: { brightness: 100 },
        brightness: 100,
        config: { native: true, ...config.stiff }
    }))

    const AnimatedScopeBox = animated(ScopeBox)
    return (
        <AnimatedScopeBox
            onMouseOver={(event: any) => { if (props.hoverable) setSpring({ brightness: 98 }); props.onMouseOver && props.onMouseOver(event) }}
            onMouseOut={(event: any) => { setSpring({ brightness: 100 }); props.onMouseOut && props.onMouseOut(event) }}
            style={{ backgroundColor: animatedProps.brightness.interpolate(b => `hsl(240, 100%, ${b}%)`) }}
            {...props}
        >
            {props.children}
        </AnimatedScopeBox>
    )
}

export default ScopeBoxInteractive