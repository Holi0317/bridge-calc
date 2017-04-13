export const PLAYER_NAME = ['John', 'Thomas', 'William', 'Richard', 'Robert', 'Edward', 'James', 'George', 'Henry', 'Francis', 'Nicholas', 'Samuel', 'Joseph', 'Anthony', 'Matthew', 'Edmund', 'Christopher', 'Andrew', 'Ralph', 'Michael', 'Peter', 'Philip', 'Daniel', 'Roger', 'Nathaniel', 'Charles', 'Walter', 'Humphrey', 'Alexander', 'Benjamin', 'Hugh', 'Stephen', 'Abraham', 'Bernard', 'Simon', 'Miles', 'Rowland', 'Arthur', 'Jonathan', 'Mark', 'Allen', 'Ellis', 'Martin', 'Cuthbert', 'David', 'Gabriel', 'Jonas', 'Lawrence', 'Elizabeth', 'Mary', 'Anne', 'Margaret', 'Alice', 'Jane', 'Joan', 'Agnes', 'Susanna', 'Dorothy', 'Catherine', 'Sarah', 'Grace', 'Isabel', 'Martha', 'Elinor', 'Ellen', 'Frances', 'Hannah', 'Bridget', 'Margery', 'Rebecca', 'Joyce', 'Barbara', 'Judith', 'Joanna', 'Hester', 'Thomasin', 'Cecily', 'Amy', 'Rachel', 'Helen', 'Janet', 'Christian', 'Temperance', 'Abigail', 'Charity', 'Deborah', 'Patience', 'Esther', 'Lucy', 'Ursula', 'Mabel', 'Marion', 'Millicent', 'Priscilla', 'Ruth', 'Faith', 'Sybil', 'Winifred']

export function randomName() {
  return PLAYER_NAME[Math.floor(Math.random() * PLAYER_NAME.length)]
}

export function genRandomNames() {
  return [randomName(), randomName(), randomName(), randomName()]
}
