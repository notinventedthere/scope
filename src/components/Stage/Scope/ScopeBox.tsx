import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'
import { Box, Image, Stack, Text } from 'grommet'
import { useSpring, config, animated } from 'react-spring'
import AnimatedExpandText from '../../text/AnimatedExpandText'

export type ScopeBoxProps = {
    children: ReactNode,
    className?: string,
} & React.HTMLAttributes<HTMLDivElement>

export const ScopeBox = styled((props: ScopeBoxProps) => {
    return (
        <Box
            pad='small'
            border={{ style: 'solid', size: 'small' }}
            round='small'
            flex='grow'
            onClick={(event: any) => { event.stopPropagation(); props.onClick && props.onClick(event) }}
            onMouseOver={event => { event.stopPropagation(); props.onMouseOver && props.onMouseOver(event); }}
            onMouseOut={event => { event.stopPropagation(); props.onMouseOut && props.onMouseOut(event); }}
            hoverIndicator={false}
            focusIndicator={false}
            className={props.className}
            style={props.style}
            id={props.id}
        >
            {props.children}
        </Box>
    )
})`
  cursor: default;
`

export default ScopeBox