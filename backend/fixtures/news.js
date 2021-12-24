import faker from 'faker'

export default function makeFakeNews(overrides) {
  const news = {
    author: faker.name.findName(),
    createdOn: Date.now(),
    title: faker.lorem.sentences(1),
    description: faker.lorem.paragraph(2),
    content: faker.lorem.paragraph(10),
    archivedOn: null,
    archived: false
  }

  return {
    ...news,
    ...overrides
  }
}
