import React, { useState } from 'react';
import Input from './Input';

function AddThreadForm({ onClose, onSave }){
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hasVoting, setHasVoting] = useState(false);

  function handleSave(e){
    // e.preventDefault();
    // private Integer threadId;

    // private Integer maxResponses;

    // private Integer maxMessages;

    // private Boolean isPrivate;

    // @Temporal(TemporalType.TIMESTAMP)
    // private Date timeCreated;

    // @ManyToOne
    // @JoinColumn(name ="board_id")
    // private Board parentBoard;

    // @OneToMany(cascade = CascadeType.ALL, mappedBy = "parentThread")
    // List<hr.fer.proinz.project_bajeet.dataTypes.Message> messages;

    // @ManyToMany
    // @JoinTable(
    // name = "caninteractwith",
    // joinColumns = @JoinColumn(name = "thread_id"),
    // inverseJoinColumns = @JoinColumn(name = "user_id"))
    // Set<User> participants
    // Set<User> participants;
    const newThread = {
      threadId : null,
      title: title,
      description,
      upVotes: 0,
      downVotes: 0,
      userVoted: false,
      hasVoting,
      comments: [],
    };
    onSave(newThread); 
    onClose(); 
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-bold mb-4">Dodaj novu diskusiju</h2>
      <Input label="discussion title" type="text" labelClassName="block text-sm font-medium text-gray-700" inputClassName="w-full p-2 mt-2 border rounded-lg" stateSetter={setTitle}/>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Discussion description</label>
        <textarea
          className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
          rows="4"
          placeholder="input discussion description"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          checked={hasVoting}
          onChange={(e) => setHasVoting(e.target.checked)}
          className="mr-2"
        />
        <label className="text-sm font-medium text-gray-700">Voting</label>
      </div>
      <div className="flex justify-end gap-4">
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400"
        >
          Zatvori
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Spremi
        </button>
      </div>
    </div>
  );
};

export default AddThreadForm;
