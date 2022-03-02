import { reactive } from "vue";

const state = reactive({
  user: null,
});

const methos = {
  setUser(payload) {
    state.user = payload ? payload.user : null;
  },
};

export default {
  state,
  methos,
};
