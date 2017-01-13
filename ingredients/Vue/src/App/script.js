// This is where all of the logic lives for the App component. The data function returns all of the variables that the component can access. These variables can be accessed via "this.variable-name" This is the root component for the application. Smaller components are imported and added to this file.
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