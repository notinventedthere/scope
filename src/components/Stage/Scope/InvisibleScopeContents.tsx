import { Box, Image, Stack } from 'grommet'
import React, { ReactNode } from 'react'
import Machine from '../../../automation.svg'

export const InvisibleScopeContents = ({ children }: { children: ReactNode }) => (
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