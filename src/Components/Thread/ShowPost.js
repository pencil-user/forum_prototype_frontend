import React from 'react'
import ReactMarkdown from 'react-markdown'

import { useUser } from '../../ZustandStore/ZustandStore.js'

import UserHighlight from '../Shared/UserHighlight.js'

import ButtonWithSpin from '../Shared/ButtonWithSpin.js'

import { useHistory, useLocation } from 'react-router-dom';

import { useDeletePost } from '../../QueryHooks/posts.js'



function ShowPost({ post, thread }) {
    const { isLoading, deletePost } = useDeletePost()

    const { user } = useUser()

    const history = useHistory()

    const location = useLocation()

    async function clickDelete() {
        await deletePost(post.id)
    }

    async function clickEdit() {
        history.push('/thread/' + thread.id + '/update-post/' + post.id, { background: location })
    }

    return (
        <div className="card mt-1">
            <div className="card-header">
                <>#{post.id} | </>
                <> {post.created_on} | </>
                <> <UserHighlight user={post?.username} id={post?.created_by_id} level={post?.user_level} /> | </>
            </div>
            <div className="card-body">
                <ReactMarkdown children={post.post_body} />
            </div>
            {(user.logged && (user.level >= 2 || (user.id === post.user_id && !thread.locked))) &&
                <div className="card-footer">
                    <ButtonWithSpin
                        className="btn-primary ml-1 mr-1"
                        onClick={clickEdit}
                        disabled={isLoading}
                        label="edit"
                    />
                    <ButtonWithSpin
                        className="btn-danger ml-1 mr-1"
                        onClick={clickDelete}
                        spinning={isLoading}
                        label="delete"
                    />

                </div>
            }
        </div>
    )
}


export default ShowPost