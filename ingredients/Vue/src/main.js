// This is anchors the App component to the index.html file

import Vue from 'vue';

import AppComponent from './App/index.vue';

const vm = new Vue({
  el:'#app',
  components: {
    app: AppComponent
  },
  render: h => h('app')
})