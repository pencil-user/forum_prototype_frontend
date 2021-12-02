import React, { useState } from 'react'

import UserHighlight from '../Shared/UserHighlight.js'
import { useUser } from '../../ZustandStore/ZustandStore.js'
import { useStore } from '../../ZustandStore/ZustandStore.js'

import {
    useHistory,
    useLocation
} from "react-router-dom";

import ThreadMutateButtons from '../Shared/ThreadMutateButtons.js';

import ButtonWithSpin from '../Shared/ButtonWithSpin.js'

import ShowThreadCell from './ShowThreadCell'

import { useUpdateThread, useDeleteThread } from '../../QueryHooks/threads.js'


function ShowThreadRow({ thread, offset, limit }) {
    const deleteThreadHook = useDeleteThread(thread.id, offset, limit)
    const updateThreadHook = useUpdateThread(thread.id, offset, limit)

    const AddAlert = useStore(state => state.AddAlert)

    const { user, isLogged, isAdmin } = useUser()

    const [status, setStatus] = useState(false)

    const history = useHistory()

    const location = useLocation()


    async function clickDelete() {
        setStatus('deleting')
        await deleteThreadHook.deleteThread()
        setStatus(false)

        AddAlert('Thread deleted', 'danger')

    }

    function clickUpdate() {
        history.push('/update-thread/' + thread.id, { background: location })
    }

    async function clickLock() {
        setStatus('toggleLock')

        await updateThreadHook.lockThread(thread.locked ? 0 : 1)

        setStatus(false)
    }

    async function clickPin() {
        setStatus('togglePin')

        await updateThreadHook.pinThread(thread.pinned ? 0 : 1)

        setStatus(false)

    }

    return (
        <tr >
            <td>{thread.id}</td>
            <td>
                <div className="d-flex justify-content-between">
                    <div>
                        <ShowThreadCell thread={thread} disabled={status} />
                    </div>
                    <div>
                    <ThreadMutateButtons
                        thread={thread}
                        clickPin={clickPin}
                        clickLock={clickLock}
                        clickUpdate={clickUpdate}
                        clickDelete={clickDelete}
                        status={status} />
                    </div>
                </div>

            </td>
            <td>{thread.created_on}</td>
            <td><UserHighlight user={thread.username} id={thread?.created_by_id} level={thread.user_level} /></td>
        </tr>
    )
}

export default ShowThreadRow