import React, { ComponentType } from 'react'
import { Book, IconProps } from 'grommet-icons'

export function Variable({ icon }: { icon: ComponentType<IconProps> }) {
    return React.createElement(icon, { size: 'large' })
}

export default Variable