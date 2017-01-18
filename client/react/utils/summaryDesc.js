export const selectionStatus = function(options) {
  return {
    summaries:[
      {
        name:options.frontEnd.framework,
        logo: options.frontEnd.framework ? 'images/' + options.frontEnd.framework.toLowerCase() + '-logo.png' : 'derp',
        desc:'Work in progress',
        choiceRoute:'/guided',
        type:'frontEnd'

      },
      {
        name:options.backEnd.database,
        logo: options.backEnd.database ? 'images/' + options.backEnd.database.toLowerCase() + '-logo.png' : 'derp',
        desc:'Work in progress',
        choiceRoute:'/backend',
        type:'backEnd'

      },
      {
        name:options.devTools.taskRunner.name,
        logo: options.devTools.taskRunner.name ? 'images/' + options.devTools.taskRunner.name.toLowerCase() + '-logo.png' : 'derp',
        desc:'Work in progress',
        choiceRoute:'/taskrunner',
        type:'taskRunner'
      }
    ]
  }
}

export const summaryNav = {
  build: {
    name: 'Build',
    link: '/download',
    color: 'grey',
    xs:0,
    xsOffset:0
  },
  view: {
    name: 'View Project',
    link: '/view',
    color: 'grey',
    xs: 0,
    xsOffset: 0,
    className: 'final-nav-btn2'
  }

}
