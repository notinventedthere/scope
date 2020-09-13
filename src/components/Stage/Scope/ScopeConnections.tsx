import React, { ReactNode, ComponentProps } from 'react'
import { Stack, Diagram } from 'grommet'
import ScopeTree from '../../../domain/scope-tree'
import { scopeId } from '../../../utils/css'

export function ScopeConnections({ scope, children }: { children: ReactNode, scope: ScopeTree }) {
    const connections = (scope: ScopeTree) => {
        const connection = (scope: ScopeTree): ComponentProps<typeof Diagram>['connections'][0] => {
            return {
                fromTarget: scopeId(scope.pathHere) + '-scope',
                toTarget: scopeId(scope.pathHere) + '-variable',
                anchor: 'vertical',
                thickness: 'xxsmall',
            }
        }

        return scope.scopes.map(connection)
    }

    return (
        <Stack fill guidingChild='last'>
            <Diagram
                connections={connections(scope)}
            />
            {children}
        </Stack>
    )
}