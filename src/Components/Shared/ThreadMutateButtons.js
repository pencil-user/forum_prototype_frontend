import React from 'react'
import ButtonWithSpin from '../Shared/ButtonWithSpin.js'
import { useUser } from '../../ZustandStore/ZustandStore.js'


function ThreadMutateButtons({ status, thread, clickLock, clickPin, clickUpdate, clickDelete }) {
    const { user, isLogged, isAdmin } = useUser()

    return (
        <span >
            {isAdmin &&
                <>
                    <ButtonWithSpin
                        className="btn-primary ml-1 mr-1"
                        onClick={clickLock}
                        disabled={status}
                        spinning={status === 'toggleLock'}
                        label={thread.locked ? "Unlock" : "Lock"}
                    />
                    <ButtonWithSpin
                        className="btn-info ml-1 mr-1"
                        onClick={clickPin}
                        disabled={status}
                        spinning={status === 'togglePin'}
                        label={thread.pinned ? "Unpin" : "Pin"}
                    />

                </>
            }

            {isLogged && (isAdmin || user.id == thread.created_by_id) &&

                <>
                    <ButtonWithSpin
                        className="btn-warning ml-1 mr-1"
                        onClick={clickUpdate}
                        disabled={status}
                        label="Edit"
                    />
                    <ButtonWithSpin
                        className="btn-danger ml-1 mr-3"
                        onClick={clickDelete}
                        disabled={status}
                        spinning={status === 'deleting'}
                        label="Delete"
                    />
                </>
            }
        </span>
    )
}

export default ThreadMutateButtons