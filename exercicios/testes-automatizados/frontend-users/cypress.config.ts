import axios from "axios";
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        async deleteAllUsers() {
          const { data } = await axios.delete(`http://localhost:3000/users`);
          return data;
        },

        async createUser(user) {
          const { data } = await axios.post(`http://localhost:3000/users`, user);
          return data;
        }
      })
    }
  }
});
