import { Box, Text } from 'grommet'
import React, { ReactNode, useEffect } from 'react'
import { animated, config, useSpring } from 'react-spring'

export default function (props: { show?: boolean, children?: ReactNode }) {
    const [{ show }, setSpring] = useSpring(() => ({
        show: '0px',
        config: { mass: 1, ...config.stiff }
    }))

    useEffect(() => {
        setSpring({
            show: props.show ? '100px' : '0px'
        })
    }, [props.show, setSpring])

    return <AnimatedBox style={{ width: show, overflow: 'hidden' }}><Text truncate>{props.children}</Text></AnimatedBox>
}


const AnimatedBox = animated(Box)