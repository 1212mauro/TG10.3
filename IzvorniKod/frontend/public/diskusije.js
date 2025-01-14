const diskusijeData = [
  {
    id: 1,
    naslov: "Renovacija ulaznog hodnika",
    opis: "Predlaže se renovacija ulaznog hodnika kako bi se poboljšao izgled i sigurnost prostora. Moguće je postaviti nove pločice, zamijeniti svjetla i obojiti zidove.",
    tip: "public", // New parameter
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
    ],
    glasanja: [
      {
        id: 1,
        pitanje: "Da li podržavate renovaciju ulaznog hodnika?",
        upVotes: 10,
        downVotes: 5,
        korisnikGlasao: false,
        timestamp: "2024-11-10T14:45:00Z",
        korisnik: "Petra Novak"
      },
      {
        id: 2,
        pitanje: "Da li bi trebalo postaviti nove pločice?",
        upVotes: 8,
        downVotes: 7,
        korisnikGlasao: false,
        timestamp: "2024-11-10T15:30:00Z",
        korisnik: "Tomislav Marić"
      }
    ]
  },
  {
    id: 2,
    naslov: "Uvođenje sustava video nadzora",
    opis: "Postavljanje kamera za nadzor zajedničkih prostora radi veće sigurnosti i smanjenja vandalizma u zgradi.",
    tip: "private", // New parameter
    komentari: [
      {
        id: 1,
        komentar: "Nisam siguran da je ovo neophodno.",
        timestamp: "2024-11-10T09:15:00Z",
        korisnik: "Marko Kovač"
      }
    ],
    glasanja: [
      {
        id: 1,
        pitanje: "Da li podržavate uvođenje video nadzora?",
        upVotes: 5,
        downVotes: 2,
        korisnikGlasao: false,
        timestamp: "2024-11-10T14:45:00Z",
        korisnik: "Petra Novak"
      }
    ]
  },
  {
    id: 3,
    naslov: "Ugradnja punionice za električne automobile",
    opis: "Predlaže se postavljanje punionice za električna vozila u garaži kako bi se suvlasnicima omogućila jednostavnija upotreba električnih automobila.",
    tip: "public", // New parameter
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
    ],
    glasanja: [
      {
        id: 1,
        pitanje: "Da li podržavate ugradnju punionice za električne automobile?",
        upVotes: 15,
        downVotes: 5,
        korisnikGlasao: true,
        timestamp: "2024-11-10T14:45:00Z",
        korisnik: "Petra Novak"
      }
    ]
  },
  {
    id: 4,
    naslov: "Postavljanje novih poštanskih sandučića",
    opis: "Obnova i zamjena poštanskih sandučića u zgradi, jer su postojeći u lošem stanju i ne pružaju odgovarajuću zaštitu pošte.",
    tip: "private", // New parameter
    komentari: [],
    glasanja: [
      {
        id: 1,
        pitanje: "Da li podržavate postavljanje novih poštanskih sandučića?",
        upVotes: 20,
        downVotes: 10,
        korisnikGlasao: false,
        timestamp: "2024-11-10T14:45:00Z",
        korisnik: "Petra Novak"
      }
    ]
  },
  {
    id: 5,
    naslov: "Postavljanje dodatnog osvjetljenja u garaži",
    opis: "Ugradnja dodatnih svjetiljki radi bolje osvijetljenosti garažnih prostora, što može poboljšati sigurnost i vidljivost.",
    tip: "public", // New parameter
    komentari: [
      {
        id: 1,
        komentar: "Ovo bi definitivno poboljšalo sigurnost!",
        timestamp: "2024-11-11T10:10:00Z",
        korisnik: "Maja Jurković"
      }
    ],
    glasanja: [
      {
        id: 1,
        pitanje: "Da li podržavate postavljanje dodatnog osvjetljenja u garaži?",
        upVotes: 12,
        downVotes: 8,
        korisnikGlasao: false,
        timestamp: "2024-11-10T14:45:00Z",
        korisnik: "Petra Novak"
      }
    ]
  }
];

export default diskusijeData;
