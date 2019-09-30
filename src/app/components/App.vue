<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="/">MEVN Stack</a>
    </nav>

    <div class="container">
      <div class="row pt-5">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="sendTask">
                <div class="form-group">
                  <input
                    type="text"
                    v-model="task.title"
                    placeholder="Insert A Task"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <textarea
                    cols="30"
                    rows="10"
                    v-model="task.description"
                    placeholder="Insert A description"
                    class="form-control"
                  ></textarea>
                </div>
                <template v-if="edit === false">
                  <button class="btn btn-primary btn-block">Send</button>
                </template>
                <template v-else>
                  <button class="btn btn-info btn-block">Update</button>
                </template>
              </form>
            </div>
          </div>
        </div>

        <div class="col-md-7">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Task</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task of tasks" v-bind:key="task._id">
                <td>{{task.title}}</td>
                <td>{{task.description}}</td>
                <td>
                  <button @click="deleteTask(task._id)" class="btn btn-danger">Delete</button>
                  <button @click="editTask(task._id)" class="btn btn-secondary">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      task: {
        title: "",
        description: ""
      },
      tasks: [],
      edit: false,
      taskToEdit: ""
    };
  },

  created() {
    this.getTask();
  },
  methods: {
    sendTask() {
      if (this.edit === false) {
        fetch("/api/tasks", {
          method: "POST",
          body: JSON.stringify(this.task),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getTask();
            (this.task.title = ""), (this.task.description = "");
          });
      } else {
        console.log(this.taskToEdit);
        fetch("/api/tasks/" + this.taskToEdit, {
          method: "PUT",
          body: JSON.stringify(this.task),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getTask();
          });
      }
    },

    getTask() {
      fetch("/api/tasks")
        .then(res => res.json())
        .then(data => {
          this.tasks = data;
          console.log(this.tasks);
        });
    },

    deleteTask(id) {
      fetch("/api/tasks/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          this.getTask();
        });
    },

    editTask(id) {
      console.log(id);
      fetch("/api/tasks/" + id)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          (this.task.title = data.title),
            (this.task.description = data.description);
          this.taskToEdit = data._id;
          this.edit = true;
        });
    }
  }
};
</script>