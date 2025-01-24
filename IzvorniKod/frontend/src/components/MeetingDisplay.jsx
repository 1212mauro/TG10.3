import React from 'react'
import Modal from './Modal'

function MeetingDisplay({ meeting, onClose }) {

    const formatDate = (dateString) => {
        const date = dateString.split("T")[0].split("-");
        
        const day = date[2];
        const month = date[1]
        const year = date[0];
      
        return `${day}.${month}.${year}`;
    };

    return (
        <Modal title={meeting.title} onClose={onClose}>
            <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                    <p className="text-2xl text-gray-800">{meeting.description}</p>
                    <p className="text-sm text-gray-500">{formatDate(meeting.timeOfMeeting)}</p>
                </div>
                <ul className="mt-4 list-disc pl-5 text-gray-700">
                    {meeting.points.map((point, index) => (
                        <li key={index}>{point.title}</li>
                    ))}
                </ul>
            </div>
        </Modal>
    )
}

export default MeetingDisplay