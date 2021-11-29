import React from 'react'
import { Nav, Spinner } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useStore } from '../../ZustandStore/ZustandStore.js';
import { useGetConvosCount } from '../../QueryHooks/messages.js'

function MessagesLink() {
    const user = useStore(s => s.User);

    const { data, isLoading } = useGetConvosCount(user.id);

    return (
        <LinkContainer to="/messages/">
            <Nav.Link>
                Messages
                {isLoading && <Spinner animation="border" size="sm" style={{ 'marginLeft': '3px' }} />}
                {data && data > 0 && <span className="badge badge-warning" style={{ 'marginLeft': '3px' }}>{data}</span>}
            </Nav.Link>
        </LinkContainer>
    )
}

export default MessagesLink