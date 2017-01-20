export const frontEnd = {
  header: 'Select a Front End Framework',
  selectors: [
    {
      image1X:'images/react-logo.png',
      image2X:'images/react-logo@2x.png',
      image3X:'images/react-logo@3x.png',
      name: 'React',
      payloadName: 'React',
      desc:'"React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes."',
      xs: 4,
      xsOffset: 0
    },
    {
      image1X:'images/angular-logo.png',
      image2X:'images/angular-logo@2x.png',
      image3X:'images/angular-logo@3x.png',
      name: 'Angular',
      payloadName: 'Angular',
      xs: 4,
      xsOffset: 0,
      desc: '"AngularJS lets you extend HTML vocabulary for your application. The resulting environment is extraordinarily expressive, readable, and quick to develop."'
    },
    {
      image1X:'images/vue-logo.png',
      image2X:'images/vue-logo@2x.png',
      image3X:'images/vue-logo@3x.png',
      name: 'Vue',
      payloadName: 'Vue',
      xs: 4,
      xsOffset: 0,
      desc: '"Vue is a progressive framework for building user interfaces…The core library is focused on the view layer only, and is very easy to pick up."'
    }
  ],
  buttons: [
    {
      name: 'Home',
      link: '/',
      color: 'grey',
      xs:4,
      xsOffset:0,
      className: 'nav-button navButton1'
    },
    {
      name: 'Next',
      link: '/backend',
      color: 'blue',
      xs:4,
      xsOffset:4,
      className: 'nav-button navButton2'
    }
  ]
}

export const backEnd = {
  header: 'Select a DataBase',
  selectors: [
    {
      image1X:'images/mongo-logo.png',
      image2X:'images/mongo-logo@2x.png',
      image3X:'images/mongo-logo@3x.png',
      name: 'Mongo',
      payloadName: 'Mongo',
      xs: 6,
      xsOffset: 0,
      desc: '"MongoDB is the leading NoSQL database, empowering businesses to be more agile and scalable."'
    },
    {
      image1X:'images/sqlite-logo.png',
      image2X:'images/sqlite-logo@2x.png',
      image3X:'images/sqlite-logo@3x.png',
      name: 'Sqlite',
      payloadName: 'Sqlite',
      xs: 6,
      xsOffset: 0,
      desc: '"SQLite is a self-contained, high-reliability, embedded, full-featured, public-domain, SQL database engine. SQLite is the most used database engine in the world. "'
    }
  ],
  buttons: [
    {
      name: 'Back',
      link: '/guided',
      color: 'primary',
      xs:3,
      xsOffset:0,
      className: 'nav-button navButton1'
    },
    {
      name: 'Next',
      link: '/taskrunner',
      color: 'blue',
      xs:3,
      xsOffset:6,
      className: 'nav-button navButton2'
    }
  ]
}

export const task = {
  header: 'Select a Task Runner',
  selectors: [
    {
      image1X:'images/gulp-logo.png',
      image2X:'images/gulp-logo@2x.png',
      image3X:'images/gulp-logo@3x.png',
      name: 'Gulp',
      payloadName: 'Gulp',
      xs: 6,
      xsOffset: 0,
      desc: '"gulp is a toolkit for automating painful or time-consuming tasks in your development workflow, so you can stop messing around and build something."'
    },
    {
      image1X:'images/grunt-logo.png',
      image2X:'images/grunt-logo@2x.png',
      image3X:'images/grunt-logo@3x.png',
      name: 'Grunt',
      payloadName: 'Grunt',
      xs: 6,
      xsOffset: 0,
      desc: '"The Grunt ecosystem is huge and it\'s growing every day. With literally hundreds of plugins to choose from, you can use Grunt to automate just about anything with a minimum of effort."'
    }
  ],
  buttons: [
    {
      name: 'Back',
      link: '/backend',
      color: 'grey',
      xs:3,
      xsOffset:0,
      className: 'nav-button navButton1'
    },
    {
      name: 'Next',
      link: '/checkout',
      color: 'blue',
      xs:3,
      xsOffset:6,
      className: 'nav-button navButton2'
    }
  ]
}

export const advanced ={
  header: 'Advanced Stack Builder',
  front: 'Select a Front End Framework',
  back: 'Select a DataBase',
  task: 'Select a Task Runner',
  buttons: [
    {
      name: 'Home',
      link: '/',
      color: 'grey',
      xs:3,
      xsOffset:0,
      className: 'nav-button nav-button navButton1'
    },
    {
      name: 'Next',
      link: '/task',
      color: 'blue',
      xs:3,
      xsOffset:6,
      className: 'nav-button navButton2'
    }
  ]
}