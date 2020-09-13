import React, { ComponentType, ReactNode } from 'react'
import { IconProps } from 'grommet-icons'
import { Box, Text } from 'grommet'
import { SuperLabel } from '../../SuperLabel'

export function Variable({ icon }: { icon: ComponentType<IconProps> }) {
    return <SuperLabel value='𝒗'><CircleBackground>{React.createElement(icon, { size: 'medium' })}</CircleBackground></SuperLabel>
}

function CircleBackground({ children }: { children: ReactNode }) {
    return (
        <Box round background='accent-3' pad='xsmall' border={{ style: 'dashed' }}>{children}</Box>
    )
}

export function FunctionVariable(props: { id: string }) {
    return (
        <SuperLabel value='𝒗'>
            <CircleBackground>
                <Text id={props.id} size='medium' margin={{ horizontal: '0.4em' }}>𝒇</Text>
            </CircleBackground>
        </SuperLabel>
    )
}

export default Variable