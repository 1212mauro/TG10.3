import { startCase } from 'lodash'
import React, { useContext, useEffect, useState } from 'react'
import Comment from './Comment'
import { BoardContext } from './ThreadList'
import client from '../lib/AxiosConfig'
import axios from 'axios'

function CommentList({ label, comments, deleteComment, thread, setMeeting }) {

    const [sizeOfThread, setSizeOfThread] = useState()

    const boardID = useContext(BoardContext)

    useEffect(() => {
        getSizeOfThread()
    })

    async function getSizeOfThread() {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        let res = await client.get(`/main/getUsersOnBoard/${boardID}`, config)
        setSizeOfThread(thread.public ? res.data.length : thread.participants.length)
    }

    async function handleCreateMeeting(comment) {
        let data={
            MeetingTitle : thread.title,
            ScheduledDate : new Date("9-10-2025 12:13:14"),
            MeetingSummary : thread.description,
            ThreadTitle : comment.content,
            ThreadDescription : ""
        }
        let res1 = await axios.post("https://apartmeet-backend.onrender.com/meetings/thread", data)
        let points = res1.data.tockeDnevnogReda.map(point => ({ meetingPointID : null, "title" : point.naziv }))
        let meeting = {
            title : res1.data.naslov,
            description : res1.data.sazetak,
            state : res1.data.stanje,
            points : res1.data.tockeDnevnogReda.map(point => ({ meetingPointID : null, title : point.naziv, type : point.pravniUcinak, conclusion : points.zakljucak })),
            timeOfMeeting : res1.data.vrijeme,
        }
        const token = localStorage.getItem('authToken');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        let res2 = await client.get(`/main/getUsersOnBoard/${boardID}`, config)
        let boardMembers = res2.data
        meeting.participants = thread.public ? boardMembers : thread.participants
        meeting.id = null
        let res3 = await client.post(`/main/addMeeting/${thread.threadID}`, meeting, config)
        meeting = res3.data
        console.log(meeting)
        setMeeting(meeting)
    }

    return (
        <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">{startCase(label)}</h3>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} deleteComment={deleteComment} sizeOfThread={sizeOfThread} handleCreateMeeting={() => handleCreateMeeting(comment)}/>))
                    ) : (
                    <p className="text-gray-500">No {label}</p>
                )}
        </div>
    )
}

export default CommentList