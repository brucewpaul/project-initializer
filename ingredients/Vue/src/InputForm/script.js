// This is where all of the logic lives for the InputForm component. The data function returns all of the variables that the component can access. These variables can be accessed via "this.variable-name" (To access the todo variable seen below, you would call this.todo). This is important for building methods that manipulate the data.
export default {
  name: 'InputForm',
  data () {
    return {
      todo: 'Type Here',
      todos:[]
    }
  },
  methods: {
    onSubmit(e) {
      this.todos.push(this.todo);
      this.todo = '';
    },
    removeTodo(e){
      console.log(e)
    }
  }
}