export const home = {
  cards: [
    {
      name:'Guided',
      descriptions: [
        'If full-stack applications are new to you, this might be a good place to start',
        'Receive information about the different ingredients as you are selecting them to make educated selections',
      ],
      button: {
        name: 'Get Started',
        link: '/guided',
        shadowType: 'guided',
        className: 'selector guided'
      },
      xs:6,
      xsOffset: 0,

    },
    {
      name:'Advanced',
      descriptions: [
        'Quickly select the frontend framework, database and taskrunner',
        'Create custom tasks with different plugins'
      ],
      button: {
        name: 'Advanced',
        link: '/advanced',
        shadowType: 'advanced',
        className: 'selector advanced'
      },
      xs:6,
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
        shadowType: 'advanced',
        className: 'selector advanced'
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
        shadowType: 'guided',
        className: 'selector advanced'
      },
      xs:4,
      xsOffset: 0,
    },
    {
      name:"View the Stack",
      descriptions: [
        'View your project and all of its files.',
        'Make and save edits directly to your project before you download.'
      ],
      button: {
        className: 'selector advanced',
        name: 'View',
        link: '/view',
        shadowType: 'advanced'
      },
      xs:4,
      xsOffset: 0,
    }
  ]
}