<template>
  <section class="home-view">
    <div class="header-container">
      <header class="header">
        <div class="container-logo">
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

        <nav class="nav-bar">
          <ul>
            <li class="contact-btn">
              <button>Contact sales</button>
            </li>
            <li class="login-btn" @click="goLogin">
              <button>Log in</button>
            </li>
            <li class="go-demo-btn" @click="goDemo">
              <button>See Demo</button>
              <font-awesome-icon class="arrow-right" icon="arrow-right" />
            </li>
          </ul>
        </nav>
      </header>
    </div>

    <div class="hero-section">
      <div class="title-container">
        <div class="title">
          <h1 class="animate-title">
            A platform built for a <br />
            <span class="highlight">new way of working</span>
          </h1>
          <p class="subtitle">
            What would you like to manage with
            <span class="green">T</span>as<span class="yellow">k</span>da<span
              class="red"
              >y</span
            >?
          </p>
          
          <div class="cta-buttons">
            <button class="primary-btn" @click="goDemo">
              <span>See Demo</span>
              <font-awesome-icon class="arrow-right" icon="arrow-right" />
            </button>
            <button class="secondary-btn" @click="goLogin">
              <span>Sign up free</span>
            </button>
          </div>
        </div>
      </div>
      
      <div class="mockup-container">
        <div class="mockup-images">
          <div class="img-container img-left">
            <img class="img img-1" src="../styles/images/1.png" alt="Taskday interface example" />
          </div>
          <div class="img-container img-center">
            <img class="img img-2" src="../styles/images/2.png" alt="Taskday dashboard" />
          </div>
          <div class="img-container img-right">
            <img class="img img-3" src="../styles/images/3.png" alt="Taskday project view" />
          </div>
        </div>
      </div>
    </div>
    
    <div class="features-section">
      <h2>Features that help you succeed</h2>
      <div class="features-grid">
        <div class="feature-card">
          <font-awesome-icon class="feature-icon" icon="tasks" />
          <h3>Task Management</h3>
          <p>Organize and manage your tasks efficiently</p>
        </div>
        <div class="feature-card">
          <font-awesome-icon class="feature-icon" icon="users" />
          <h3>Team Collaboration</h3>
          <p>Work together seamlessly with your team</p>
        </div>
        <div class="feature-card">
          <font-awesome-icon class="feature-icon" icon="chart-line" />
          <h3>Progress Tracking</h3>
          <p>Monitor your project's progress in real-time</p>
        </div>
      </div>
    </div>

    <div class="testimonials-section">
      <h2>Trusted by teams worldwide</h2>
      <div class="testimonials-carousel">
        <div class="testimonial-item">
          <div class="testimonial-content">
            <font-awesome-icon class="quote-icon" icon="quote-left" />
            <p>Taskday has completely transformed how our team collaborates. It's intuitive and powerful!</p>
            <div class="testimonial-author">
              <div class="author-avatar">
                <font-awesome-icon icon="user-circle" />
              </div>
              <div class="author-info">
                <h4>Sarah Johnson</h4>
                <p>Project Manager, TechCorp</p>
              </div>
            </div>
          </div>
        </div>
        <div class="testimonial-item">
          <div class="testimonial-content">
            <font-awesome-icon class="quote-icon" icon="quote-left" />
            <p>We've increased our productivity by 40% since implementing Taskday across our organization.</p>
            <div class="testimonial-author">
              <div class="author-avatar">
                <font-awesome-icon icon="user-circle" />
              </div>
              <div class="author-info">
                <h4>Michael Chen</h4>
                <p>COO, Innovate Inc.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="testimonial-item">
          <div class="testimonial-content">
            <font-awesome-icon class="quote-icon" icon="quote-left" />
            <p>The customization options allow us to adapt Taskday perfectly to our unique workflow needs.</p>
            <div class="testimonial-author">
              <div class="author-avatar">
                <font-awesome-icon icon="user-circle" />
              </div>
              <div class="author-info">
                <h4>Emily Rodriguez</h4>
                <p>Team Lead, Creative Studios</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="companies">
        <div class="company-logos">
          <div class="logo-item">
            <font-awesome-icon icon="building" />
            <span>TechCorp</span>
          </div>
          <div class="logo-item">
            <font-awesome-icon icon="building" />
            <span>Innovate Inc.</span>
          </div>
          <div class="logo-item">
            <font-awesome-icon icon="building" />
            <span>Creative Studios</span>
          </div>
          <div class="logo-item">
            <font-awesome-icon icon="building" />
            <span>Global Systems</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="contact-section">
      <div class="contact-container">
        <div class="contact-content">
          <h2>Ready to transform your workflow?</h2>
          <p>Get started with Taskday today and see the difference for yourself.</p>
          <div class="contact-buttons">
            <button class="primary-btn" @click="goDemo">
              <span>Try Demo</span>
              <font-awesome-icon icon="arrow-right" />
            </button>
            <button class="contact-sales-btn">
              <font-awesome-icon icon="envelope" />
              <span>Contact Sales</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-logo">
          <div class="logo-small">
            <div class="blue"></div>
            <div class="yellow">
              <div class="green-dot"></div>
            </div>
            <div class="red">
              <div class="yellow-dot"></div>
            </div>
          </div>
          <div class="logo-txt-small">
            <span class="green">T</span>as<span class="yellow">k</span>da<span class="red">y</span>
          </div>
        </div>
        
        <div class="footer-links">
          <div class="footer-column">
            <h3>Product</h3>
            <ul>
              <li>Features</li>
              <li>Pricing</li>
              <li>Integrations</li>
              <li>Enterprise</li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>Resources</h3>
            <ul>
              <li>Documentation</li>
              <li>Guides</li>
              <li>Webinars</li>
              <li>Blog</li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>Company</h3>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        
        <div class="footer-social">
          <div class="social-icons">
            <font-awesome-icon icon="fa-brands fa-twitter" />
            <font-awesome-icon icon="fa-brands fa-linkedin" />
            <font-awesome-icon icon="fa-brands fa-facebook" />
            <font-awesome-icon icon="fa-brands fa-instagram" />
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>© 2023 Taskday. All rights reserved.</p>
        <div class="footer-legal">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Security</span>
        </div>
      </div>
    </footer>
  </section>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      imgs: [
        '../styles/images/1.png',
        '../styles/images/2.png',
        '../styles/images/3.png',
      ]
    }
  },
  computed: {
    boardsList() {
      return this.$store.getters.boardsList
    },
  },
  created() {
    this.$store.dispatch({ type: 'getBoardsList' })
    this.loadUsers()
  },
  methods: {
    goDemo() {
      var boardId = this.boardsList[0].boardId

      this.$router.push(`/board/${boardId}`)
    },
    goLogin() {
      var boardId = this.boardsList[0].boardId

      this.$router.push(`/login/`)
    },
    loadUsers() {
      this.$store.dispatch({ type: 'loadUsers' })
    }
  },
  components: {},
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
