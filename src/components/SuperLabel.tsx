import React, { ReactNode } from 'react'
import { Stack, Text } from 'grommet'

export function SuperLabel({ value, children }: { value: string, children: ReactNode }) {
    return (
        <Stack anchor='top-left'>
            {children}
            <Text style={{ position: 'relative', right: '0.1em', bottom: '0.4em' }}>{value}</Text>
        </Stack>
    )
}