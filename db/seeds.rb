questions = [
  {
    question: 'Die Hunde von Paris Hilten heißen Prada, Dolce, Marilyn Monroe, Harajuku Bitch und _____',
    answer: 'Prince Baby Bear',
    wrong_answers: ['Dolly Diamond', 'Winston Churchill'],
    category: 'Paris'
  },
  {
    question: 'Fische können _____ werden',
    answer: 'seekrank',
    wrong_answers: ['heiser', 'schwindelig'],
    category: 'Kranke Meerestiere'
  },
  {
    question: 'Das Burnout Syndrom ist nicht neu - früher wurde es _____ genannt',
    answer: 'Newyorkitis',
    wrong_answers: ['Psylitis', 'Wolkenkratzer-Krankheit'],
    category: 'Ausbrennen'
  },
  {
    question: 'Das häufigeste Wortspiel bei deutschen Friseursalonnamen ist _____',
    answer: 'Haarmonie',
    wrong_answers: ['Schehrensache', 'Haarscharf'],
    category: 'Haarige Angelegenheit'
  },
  {
    question: 'Der langjährige Torwart des Fussballvereins Schlesweig 06 hieß Tore _____',
    answer: 'Wächter',
    wrong_answers: ['Hüter', 'Schießer'],
    category: 'Fussball'
  },
  {
    question: 'Die Hocker in der Boardbar der 50er-Jahre-Yacht "Christina O." des Reeders Aristoteles Onassis sind mit _____ überzogen',
    answer: 'der Vorhaut von Wal-Penissen',
    wrong_answers: ['den Fellen von Eichhörnchen', 'Wildblütenhonig'],
    category: 'Dekandente Schiffe'
  },
  {
    question: 'Fahrgäste die aufgrund von Schlankheitskuren in Ohnmachtfallen sind einer der Hauptgründen für _____ in New York',
    answer: 'Verspätungen der U-Bahn',
    wrong_answers: ['Taxistreiks', 'Todesfälle'],
    category: 'New York, New York'
  },
  {
    question: 'Vin Mariani, mit _____ vermischter Rotwein, war um 1900 ein Modegetränk das u.a. von zwei Päpsten sehr gerne getrunken wurde',
    answer: 'Kokain',
    wrong_answers: ['Hostien', 'pulverisierten Erbsen'],
    category: 'Trunkenbolde'
  },
  {
    question: 'Das erste Space-Shuttle der NASA hieß _____',
    answer: 'Enterprise',
    wrong_answers: ['Texas Ranger', 'Jumpo'],
    category: 'Weitentfernte Galaxien'
  },
  {
    question: '"Simon & Garfunkel" nannten sich in ihrer Anfangszeit _____',
    answer: 'Tom & Jerry',
    wrong_answers: ['Dick & Doof', 'Fritz Walter'],
    category: 'Bands'
  },
  {
    question: 'Paraskavedekatriaphobie heißt die Angst vor _____',
    answer: 'Freitag dem 13.',
    wrong_answers: ['Insekten', 'Außerirdischen'],
    category: 'Phobien'
  }
]

Question.delete_all

questions.each do |question|
  Question.create(
    question: question[:question],
    answer: question[:answer],
    wrong_answers: question[:wrong_answers],
    category: question[:category]
  )
end
