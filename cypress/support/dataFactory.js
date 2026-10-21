const pick = (items) => items[Cypress._.random(0, items.length - 1)];
const number = (min, max) => Cypress._.random(min, max);

export function student(locations) {
  const location = pick(locations);
  const month = number(0, 11);
  const day = number(1, 28);
  const year = number(1980, 2005);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return {
    firstName: pick(['Ana', 'Bruno', 'Carla', 'Diego', 'Elisa']),
    lastName: pick(['Silva', 'Costa', 'Souza', 'Lima', 'Santos']),
    email: `qa.${crypto.randomUUID()}@example.com`,
    gender: pick(['Male', 'Female', 'Other']),
    mobile: String(number(6000000000, 9999999999)),
    birth: {
      day,
      month,
      year,
      display: `${String(day).padStart(2, '0')} ${months[month]},${year}`,
    },
    subjects: Cypress._.sampleSize(
      ['Maths', 'English', 'Physics', 'Chemistry', 'Computer Science'],
      2,
    ),
    hobbies: Cypress._.sampleSize(['Sports', 'Reading', 'Music'], number(1, 3)),
    address: `${number(1, 9999)} Test Street, Block ${number(1, 99)}`,
    state: location.state,
    city: pick(location.cities),
    fileName: 'upload.txt',
  };
}

export function employee() {
  return {
    firstName: pick(['Ana', 'Bruno', 'Carla', 'Diego', 'Elisa']),
    lastName: pick(['Silva', 'Costa', 'Souza', 'Lima', 'Santos']),
    email: `qa.${crypto.randomUUID()}@example.com`,
    age: String(number(18, 65)),
    salary: String(number(1500, 25000)),
    department: pick(['Quality', 'Engineering', 'Finance', 'Sales']),
  };
}
