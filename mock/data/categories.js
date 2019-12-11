const categories = [
  {
    id: 1,
    name: 'Programing',
    subCategories: [
      {
        id: 11,
        name: 'Algorithm',
        subCategories: [],
        layer: 2
      },
      {
        id: 12,
        name: 'Framework',
        subCategories: [],
        layer: 2
      },
      {
        id: 13,
        name: 'Experience',
        subCategories: [],
        layer: 2
      }
    ],
    layer: 1
  },
  {
    id: 2,
    name: 'Database',
    subCategories: [
      {
        id: 21,
        name: 'MySQL',
        subCategories: [],
        amount: 1,
        layer: 3
      },
      {
        id: 22,
        name: 'Oracle',
        subCategories: [],
        layer: 3
      }
    ],
    layer: 2
  },
  {
    id: 3,
    name: 'Operations',
    subCategories: [
      {
        id: 31,
        name: 'Linux',
        subCategories: [],
        layer: 2
      },
      {
        id: 32,
        name: 'Docker',
        subCategories: [],
        layer: 2
      },
      {
        id: 33,
        name: 'Application',
        subCategories: [],
        layer: 2
      }
    ],
    layer: 1
  },
  {
    id: 4,
    name: 'Others',
    subCategories: [],
    layer: 1
  }
]

function setAmount(category) {
  let amount = 0
  if (category.subCategories.length > 0) {
    for (const subCategory of category.subCategories) {
      amount += setAmount(subCategory)
    }
  } else {
    amount = Math.ceil(Math.random() * 3)
  }
  category.amount = amount
  return amount
}

for (const category of categories) {
  setAmount(category)
}

export { categories }
