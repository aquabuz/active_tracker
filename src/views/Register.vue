<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="mb-10 rounded-md bg-light-grey">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- Register -->
    <form
      @submit.prevent="register"
      class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg"
    >
      <h1 class="text-3xl text-at-light-green mb-4">Register</h1>

      <div class="flex flex-col mb-2">
        <label for="email" class="mb-1 text-sm text-at-light-green">
          Email
        </label>
        <input
          type="text"
          required
          id="email"
          class="p-2 text-gray-500 focus:outline-none"
          v-model="email"
        />
      </div>

      <div class="flex flex-col mb-2">
        <label for="password" class="mb-1 text-sm text-at-light-green">
          Password
        </label>
        <input
          type="password"
          required
          id="password"
          class="p-2 text-gray-500 focus:outline-none"
          v-model="password"
        />
      </div>

      <div class="flex flex-col mb-2">
        <label for="confirmPassword" class="mb-1 text-sm text-at-light-green">
          Confirm Password
        </label>
        <input
          type="password"
          required
          id="confirmPassword"
          class="p-2 text-gray-500 focus:outline-none"
          v-model="confirmPassword"
        />
      </div>

      <button
        type="submit"
        class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:border-white hover:bg-white hover:text-at-light-green"
      >
        Register
      </button>

      <router-link class="text-sm mt-6 text-center" :to="{ name: 'Login' }">
        Already have an account?
        <span class="text-at-light-green">Login</span>
      </router-link>
    </form>
  </div>
</template>

<script>
import { supabase } from "../supabase/init";
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  name: "register",
  setup() {
    // Create data / vars
    const router = useRouter();
    const email = ref(null);
    const password = ref(null);
    const confirmPassword = ref(null);
    const errorMsg = ref(null);

    // Register function
    const register = async () => {
      if (password.value === confirmPassword.value) {
        try {
          const { error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
          });
          if (error) throw error;
          router.push({ name: "Login" });
        } catch (error) {
          errorMsg.value = error.message;
          setTimeout(() => {
            errorMsg.value = null;
          }, 5000);
        }
        return;
      }
      errorMsg.value = "Error: password do not match";
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    };

    return { email, password, confirmPassword, errorMsg, register };
  },
};
</script>
