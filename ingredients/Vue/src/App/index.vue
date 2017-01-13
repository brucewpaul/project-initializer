<!-- This file brings all of the parts necessary for the App component to function.

the organizational convention being used here seperates each component into a Uppercased folder tht contains a script.js, style.css, and template.html file that are united here in this index.vue file. -->

<!-- Alternatively, you can combine the template script and style into one .vue file. see comments below for alternative formatting. -->
<template src='./template.html'></template>
<script src='./script.js'></script>
<style scoped src='./style.css'></style>

<!--    Alternative Formatting for .vue file
<template>
  <div>
    <p>To Do App</p>
    <inputForm ></inputform>
  </div>
</template>

<script>
  import InputForm from '../InputForm/index.vue';

  export default {
    name: 'App',
    components:{
      inputForm: InputForm
    },
    data() {
      return {}
    }
  }
</script>

<style>
  p {
    font-family: fantasy;
  }
</style> -->