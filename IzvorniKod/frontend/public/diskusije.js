const diskusijeData = [
  {
    id: 1,
    naslov: "Renovacija ulaznog hodnika",
    opis: "Predlaže se renovacija ulaznog hodnika kako bi se poboljšao izgled i sigurnost prostora. Moguće je postaviti nove pločice, zamijeniti svjetla i obojiti zidove.",
    upVotes: 11,
    downVotes: 15,
    glasovi: 15,
    korisnikGlasao: false,
    hasVoting: true,
    komentari: [
      {
        id: 1,
        komentar: "Mislim da je ovo dobra ideja!",
        timestamp: "2024-11-11T12:00:00Z",
        korisnik: "Ivan Perić"
      },
      {
        id: 2,
        komentar: "Slažem se, hodnik stvarno treba obnoviti.",
        timestamp: "2024-11-11T12:30:00Z",
        korisnik: "Ana Horvat"
      }
    ]
  },
  {
    id: 2,
    naslov: "Uvođenje sustava video nadzora",
    opis: "Postavljanje kamera za nadzor zajedničkih prostora radi veće sigurnosti i smanjenja vandalizma u zgradi.",
    upVotes: 1,
    downVotes: 0,
    glasovi: 8,
    korisnikGlasao: false,
    hasVoting: true,
    komentari: [
      {
        id: 1,
        komentar: "Nisam siguran da je ovo neophodno.",
        timestamp: "2024-11-10T09:15:00Z",
        korisnik: "Marko Kovač"
      }
    ]
  },
  {
    id: 3,
    naslov: "Ugradnja punionice za električne automobile",
    opis: "Predlaže se postavljanje punionice za električna vozila u garaži kako bi se suvlasnicima omogućila jednostavnija upotreba električnih automobila.",
    upVotes: 12,
    downVotes: 71,
    glasovi: 20,
    korisnikGlasao: true,
    hasVoting: true,
    komentari: [
      {
        id: 1,
        komentar: "Odlično! Ovo nam stvarno treba.",
        timestamp: "2024-11-10T14:45:00Z",
        korisnik: "Petra Novak"
      },
      {
        id: 2,
        komentar: "Podržavam ovu inicijativu.",
        timestamp: "2024-11-10T15:30:00Z",
        korisnik: "Tomislav Marić"
      }
    ]
  },
  {
    id: 4,
    naslov: "Postavljanje novih poštanskih sandučića",
    opis: "Obnova i zamjena poštanskih sandučića u zgradi, jer su postojeći u lošem stanju i ne pružaju odgovarajuću zaštitu pošte.",
    upVotes: 23,
    downVotes: 55,
    glasovi: 12,
    korisnikGlasao: false,
    hasVoting: true,
    komentari: []
  },
  {
    id: 5,
    naslov: "Postavljanje dodatnog osvjetljenja u garaži",
    opis: "Ugradnja dodatnih svjetiljki radi bolje osvijetljenosti garažnih prostora, što može poboljšati sigurnost i vidljivost.",
    upVotes: 17,
    downVotes: 22,
    glasovi: 5,
    korisnikGlasao: false,
    hasVoting: false,
    komentari: [
      {
        id: 1,
        komentar: "Ovo bi definitivno poboljšalo sigurnost!",
        timestamp: "2024-11-11T10:10:00Z",
        korisnik: "Maja Jurković"
      }
    ]
  }
];

export default diskusijeData;
