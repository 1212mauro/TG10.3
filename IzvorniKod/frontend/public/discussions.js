const discussionsData = [
  {
    id: 1,
    title: "Renovation of the entrance hallway",
    description: "It is proposed to renovate the entrance hallway to improve the appearance and safety of the space. It is possible to install new tiles, replace lights, and paint the walls.",
    type: "public", // New parameter
    comments: [
      {
        id: 1,
        comment: "I think this is a good idea!",
        timestamp: "2024-11-11T12:00:00Z",
        user: "Ivan Perić"
      },
      {
        id: 2,
        comment: "I agree, the hallway really needs to be renovated.",
        timestamp: "2024-11-11T12:30:00Z",
        user: "Ana Horvat"
      }
    ],
    votings: [
      {
        id: 1,
        question: "Do you support the renovation of the entrance hallway?",
        upVotes: 10,
        downVotes: 5,
        userVoted: false,
        timestamp: "2024-11-10T14:45:00Z",
        user: "Petra Novak"
      },
      {
        id: 2,
        question: "Should new tiles be installed?",
        upVotes: 8,
        downVotes: 7,
        userVoted: false,
        timestamp: "2024-11-10T15:30:00Z",
        user: "Tomislav Marić"
      }
    ]
  },
  {
    id: 2,
    title: "Introduction of a video surveillance system",
    description: "Installing cameras to monitor common areas for greater security and reducing vandalism in the building.",
    type: "private", // New parameter
    comments: [
      {
        id: 1,
        comment: "I'm not sure this is necessary.",
        timestamp: "2024-11-10T09:15:00Z",
        user: "Marko Kovač"
      }
    ],
    votings: [
      {
        id: 1,
        question: "Do you support the introduction of video surveillance?",
        upVotes: 5,
        downVotes: 2,
        userVoted: false,
        timestamp: "2024-11-10T14:45:00Z",
        user: "Petra Novak"
      }
    ]
  },
  {
    id: 3,
    title: "Installation of an electric car charging station",
    description: "It is proposed to install a charging station for electric vehicles in the garage to facilitate the use of electric cars for co-owners.",
    type: "public", // New parameter
    comments: [
      {
        id: 1,
        comment: "Great! We really need this.",
        timestamp: "2024-11-10T14:45:00Z",
        user: "Petra Novak"
      },
      {
        id: 2,
        comment: "I support this initiative.",
        timestamp: "2024-11-10T15:30:00Z",
        user: "Tomislav Marić"
      }
    ],
    votings: [
      {
        id: 1,
        question: "Do you support the installation of an electric car charging station?",
        upVotes: 15,
        downVotes: 5,
        userVoted: true,
        timestamp: "2024-11-10T14:45:00Z",
        user: "Petra Novak"
      }
    ]
  },
  {
    id: 4,
    title: "Installation of new mailboxes",
    description: "Renovation and replacement of mailboxes in the building, as the existing ones are in poor condition and do not provide adequate mail protection.",
    type: "private", // New parameter
    comments: [],
    votings: [
      {
        id: 1,
        question: "Do you support the installation of new mailboxes?",
        upVotes: 20,
        downVotes: 10,
        userVoted: false,
        timestamp: "2024-11-10T14:45:00Z",
        user: "Petra Novak"
      }
    ]
  },
  {
    id: 5,
    title: "Installation of additional lighting in the garage",
    description: "Installation of additional lights for better illumination of garage spaces, which can improve safety and visibility.",
    type: "public", // New parameter
    comments: [
      {
        id: 1,
        comment: "This would definitely improve safety!",
        timestamp: "2024-11-11T10:10:00Z",
        user: "Maja Jurković"
      }
    ],
    votings: [
      {
        id: 1,
        question: "Do you support the installation of additional lighting in the garage?",
        upVotes: 12,
        downVotes: 8,
        userVoted: false,
        timestamp: "2024-11-10T14:45:00Z",
        user: "Petra Novak"
      }
    ]
  }
];

export default discussionsData;
