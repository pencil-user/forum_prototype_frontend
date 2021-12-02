import React, { useState } from 'react'

import { useUser } from '../../ZustandStore/ZustandStore.js'
import { useStore } from '../../ZustandStore/ZustandStore.js'

import ThreadMutateButtons from '../Shared/ThreadMutateButtons.js';

import {
    useHistory,
    useLocation
} from "react-router-dom";


import { useUpdateThread, useDeleteThread } from '../../QueryHooks/threads.js'

function ThreadButtons({ thread, inThread = false }) {
    const deleteThreadHook = useDeleteThread(thread.id)
    const updateThreadHook = useUpdateThread(thread.id)

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
        history.replace('/')

    }

    function clickUpdate() {
        history.push('/thread/' + thread.id + '/update-thread/', { background: location })
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
        <span style={{ 'marginLeft': 5 }}>
            <ThreadMutateButtons
                thread={thread}
                clickPin={clickPin}
                clickLock={clickLock}
                clickUpdate={clickUpdate}
                clickDelete={clickDelete}
                status={status} />
        </span>
    )

}

export default ThreadButtons