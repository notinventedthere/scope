import { Box, Text } from 'grommet'
import React, { ReactNode, useEffect } from 'react'
import { animated, config, useSpring } from 'react-spring'

export function useAnimatedExpandText() {
    const [{ show }, setSpring] = useSpring(() => ({
        show: '0px',
        config: { mass: 1, ...config.stiff }
    }))

    const setShow = (show: boolean) => {
        setSpring({
            show: show ? '100px' : '0px'
        })
    }

    const AnimatedExpandText = (props: { children?: ReactNode }) => <AnimatedBox style={{ width: show, overflow: 'hidden' }}><Text truncate>{props.children}</Text></AnimatedBox>

    return [AnimatedExpandText, setShow] as [typeof AnimatedExpandText, typeof setShow]
}


const AnimatedBox = animated(Box)