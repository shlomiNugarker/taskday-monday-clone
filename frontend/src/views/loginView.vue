<template>
  <section class="login-view">
    <header class="header-container">
      <div class="container-logo" @click="goHome">
        <div class="logo">
          <div class="blue"></div>
          <div class="yellow">
            <div class="green-dot"></div>
          </div>
          <div class="red">
            <div class="yellow-dot"></div>
          </div>
        </div>
        <div class="logo-txt">
          <span class="green">T</span>as<span class="yellow">k</span>da<span
            class="red"
            >y</span
          >
        </div>
      </div>
    </header>
    <div class="login-container">
      <div class="title">
        <p>Log in to your account</p>
      </div>
      <p>Enter your work email address and password</p>
      <form class="login-singup-form">
        <input type="email" placeholder="Example@company.com" />
        <input type="password" placeholder="Password" />
        <button>Login</button>
      </form>

      <div class="login-separator-component split-line">
        <span class="separator-line"></span>
        <h2>Or Sign in with</h2>
        <span class="separator-line"></span>
      </div>

      <button type="button" class="social-login-provider">
        <img
          class="social-login-logo"
          src="https://cdn.monday.com/images/logo_google_v2.svg"
          aria-hidden="true"
          alt=""
        />
        <div class="social-login-provider-name" aria-label="Login with Google">
          Google
        </div>
      </button>

      <div class="switch-login">
        <div>Don't have an account yet? <span>Sign up</span></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'test',
  data() {
    return {}
  },
  computed: {},
  created() {
    // this.loadUsers()
  },
  methods: {
    goHome() {
      this.$router.push(`/`)
    },
  },
}
</script>
