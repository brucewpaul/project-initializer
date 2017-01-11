export const home = {
  cards: [
    {
      name:'Guided',
      descriptions: [
        'Thing 1',
        'Thing 2',
        'Thing 3'
      ],
      button: {
        name: 'Get Started',
        link: '/guided',
        shadowType: 'guided'
      },
      xs:3,
      xsOffset: 3,
    },
    {
      name:'Advanced',
      descriptions: [
        'Thing 1',
        'Thing 2',
        'Thing 3'
      ],
      button: {
        name: 'Advanced',
        link: '/advanced',
        shadowType: 'advanced'
      },
      xs:3,
      xsOffset: 0,
    }
  ]
}

export const download = {
  cards: [
    {
      name:'Push to Github',
      descriptions: [
        'Coming Soon!',
        'Push your application to Github.'
      ],
      button: {
        name: 'Push',
        link: '/download',
        shadowType: 'advanced'
      },
      xs:4,
      xsOffset: 0,
    },
    {
      name:'Download Zip',
      descriptions: [
        'Download your project.'
      ],
      button: {
        name: 'Download',
        link: '/download',
        shadowType: 'guided'
      },
      xs:4,
      xsOffset: 0,
    },
    {
      name:"Save the Stack",
      descriptions: [
        'Coming Soon!',
        'Save the stack to your account'
      ],
      button: {
        name: 'Save',
        link: '/download',
        shadowType: 'advanced'
      },
      xs:4,
      xsOffset: 0,
    }
  ]
}