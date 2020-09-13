import React, { ComponentType, ReactNode } from 'react'
import { IconProps } from 'grommet-icons'
import { Box } from 'grommet'
import { SuperLabel } from '../../SuperLabel'

export function Variable({ icon }: { icon: ComponentType<IconProps> }) {
    return <SuperLabel value='𝒗'><CircleBackground>{React.createElement(icon, { size: 'medium' })}</CircleBackground></SuperLabel>
}

function CircleBackground({ children }: { children: ReactNode }) {
    return (
        <Box round background='accent-3' pad='xsmall' border={{ style: 'dashed' }}>{children}</Box>
    )
}

export default Variable