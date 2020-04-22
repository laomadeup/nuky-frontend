import faker from 'faker'

const allCategories = []
const categories = [
  {
    id: 10,
    name: 'Programing',
    children: [
      {
        id: 11,
        name: 'Algorithm',
        children: [],
        layer: 2
      },
      {
        id: 12,
        name: 'Framework',
        children: [],
        layer: 2
      },
      {
        id: 13,
        name: 'Experience',
        children: [],
        layer: 2
      }
    ],
    layer: 1
  },
  {
    id: 20,
    name: 'Database',
    children: [
      {
        id: 21,
        name: 'MySQL',
        children: [],
        amount: 1,
        layer: 2
      },
      {
        id: 22,
        name: 'Oracle',
        children: [],
        layer: 2
      }
    ],
    layer: 1
  },
  {
    id: 30,
    name: 'Operations',
    children: [
      {
        id: 31,
        name: 'Linux',
        children: [],
        layer: 2
      },
      {
        id: 32,
        name: 'Docker',
        children: [],
        layer: 2
      },
      {
        id: 33,
        name: 'Application',
        children: [],
        layer: 2
      }
    ],
    layer: 1
  },
  {
    id: 40,
    name: 'Others',
    children: [],
    layer: 1
  }
]

function setAmount(category, parent, layer) {
  let amount = 0
  if (category.children.length > 0) {
    for (const subCategory of category.children) {
      amount += setAmount(subCategory, { id: category.id, name: category.name },
        category.layer + 1)
    }
  } else {
    amount = faker.random.number({ min: 1, max: 3 })
  }
  category.layer = layer
  category.amount = amount
  category.slug = category.name.toLowerCase()
  allCategories.push(
    {
      id: category.id,
      name: category.name,
      parent,
      slug: category.slug,
      layer: category.layer
    })
  return amount
}

for (const category of categories) {
  setAmount(category, null, 1)
}

allCategories.sort((a, b) => a.id - b.id)

export { categories, allCategories }
