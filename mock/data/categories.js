const categories = [
  {
    id: 1,
    name: 'Development',
    subCategories: [
      {
        id: 11,
        name: 'Programing',
        subCategories: [
          {
            id: 111,
            name: 'Basic',
            subCategories: [],
            layer: 3
          },
          {
            id: 112,
            name: 'Framework',
            subCategories: [],
            layer: 3
          }
        ],
        layer: 2
      },
      {
        id: 12,
        name: 'Database',
        subCategories: [
          {
            id: 31,
            name: 'MySQL',
            subCategories: [],
            amount: 1,
            layer: 3
          },
          {
            id: 32,
            name: 'Oracle',
            subCategories: [],
            layer: 3
          }
        ],
        layer: 2
      }
    ],
    layer: 1
  },
  {
    id: 2,
    name: 'Operations',
    subCategories: [
      {
        id: 21,
        name: 'Linux',
        subCategories: [],
        layer: 2
      },
      {
        id: 22,
        name: 'Docker',
        subCategories: [],
        layer: 2
      },
      {
        id: 23,
        name: 'Application',
        subCategories: [],
        layer: 2
      }
    ],
    layer: 1
  },
  {
    id: 3,
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
