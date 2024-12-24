const discussionData = [
  {
    id: 1,
    title: "Renovacija ulaznog hodnika",
    description: "Predlaže se renovacija ulaznog hodnika kako bi se poboljšao izgled i sigurnost prostora. Moguće je postaviti nove pločice, zamijeniti svjetla i obojiti zidove.",
    upVotes: 11,
    downVotes: 15,
    userVoted: false,
    hasVoting: true,
    comments: [
      {
        id: 1,
        content: "Mislim da je ovo dobra ideja!",
        timestamp: "2024-11-11T12:00:00Z",
        user: "Ivan Perić"
      },
      {
        id: 2,
        content: "Slažem se, hodnik stvarno treba obnoviti.",
        timestamp: "2024-11-11T12:30:00Z",
        user: "Ana Horvat"
      }
    ]
  },
  {
    id: 2,
    title: "Uvođenje sustava video nadzora",
    description: "Postavljanje kamera za nadzor zajedničkih prostora radi veće sigurnosti i smanjenja vandalizma u zgradi.",
    upVotes: 1,
    downVotes: 0,
    userVoted: false,
    hasVoting: true,
    comments: [
      {
        id: 1,
        content: "Nisam siguran da je ovo neophodno.",
        timestamp: "2024-11-10T09:15:00Z",
        user: "Marko Kovač"
      }
    ]
  },
  {
    id: 3,
    title: "Ugradnja punionice za električne automobile",
    description: "Predlaže se postavljanje punionice za električna vozila u garaži kako bi se suvlasnicima omogućila jednostavnija upotreba električnih automobila.",
    upVotes: 12,
    downVotes: 71,
    userVoted: true,
    hasVoting: true,
    comments: [
      {
        id: 1,
        content: "Odlično! Ovo nam stvarno treba.",
        timestamp: "2024-11-10T14:45:00Z",
        user: "Petra Novak"
      },
      {
        id: 2,
        content: "Podržavam ovu inicijativu.",
        timestamp: "2024-11-10T15:30:00Z",
        user: "Tomislav Marić"
      }
    ]
  },
  {
    id: 4,
    title: "Postavljanje novih poštanskih sandučića",
    description: "Obnova i zamjena poštanskih sandučića u zgradi, jer su postojeći u lošem stanju i ne pružaju odgovarajuću zaštitu pošte.",
    upVotes: 23,
    downVotes: 55,
    userVoted: false,
    hasVoting: true,
    comments: []
  },
  {
    id: 5,
    title: "Postavljanje dodatnog osvjetljenja u garaži",
    description: "Ugradnja dodatnih svjetiljki radi bolje osvijetljenosti garažnih prostora, što može poboljšati sigurnost i vidljivost.",
    upVotes: 17,
    downVotes: 22,
    userVoted: false,
    hasVoting: false,
    comments: [
      {
        id: 1,
        content: "Ovo bi definitivno poboljšalo sigurnost!",
        timestamp: "2024-11-11T10:10:00Z",
        user: "Maja Jurković"
      }
    ]
  }
];

export default discussionData;