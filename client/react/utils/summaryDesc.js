export const selectionStatus = function(options) {
  return {
    summaries:[
      {
        name:options.frontEnd.framework,
        logo: options.frontEnd.framework ? 'images/' + options.frontEnd.framework.toLowerCase() + '-logo.png' : 'derp',
        desc:{
          angular: '"AngularJS lets you extend HTML vocabulary for your application. The resulting environment is extraordinarily expressive, readable, and quick to develop."',
          react: '"React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes."',
          vue: '"Vue is a progressive framework for building user interfaces…The core library is focused on the view layer only, and is very easy to pick up."'
        },
        choiceRoute:'/guided',
        type:'frontEnd'

      },
      {
        name:options.backEnd.database,
        logo: options.backEnd.database ? 'images/' + options.backEnd.database.toLowerCase() + '-logo.png' : 'derp',
        desc:{
          mongo: '"MongoDB is the leading NoSQL database, empowering businesses to be more agile and scalable."',
          sqlite:'"SQLite is a self-contained, high-reliability, embedded, full-featured, public-domain, SQL database engine. SQLite is the most used database engine in the world. "',
        },
        choiceRoute:'/backend',
        type:'backEnd'

      },
      {
        name:options.devTools.taskRunner.name,
        logo: options.devTools.taskRunner.name ? 'images/' + options.devTools.taskRunner.name.toLowerCase() + '-logo.png' : 'derp',
        desc: {
          grunt: '"The Grunt ecosystem is huge and it\'s growing every day. With literally hundreds of plugins to choose from, you can use Grunt to automate just about anything with a minimum of effort."',
          gulp: '"gulp is a toolkit for automating painful or time-consuming tasks in your development workflow, so you can stop messing around and build something."',
        },
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
    xsOffset:0,
    className: 'nav-button navButton3'
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
