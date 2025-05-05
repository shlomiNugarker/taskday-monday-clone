<template>
  <section class="header-container">
    <div class="header-content">
      <div class="header-logo">
        <span class="logo-text">TaskDay</span>
      </div>
      <div class="header-nav">
        <nav>
          <ul class="nav-list">
            <li class="nav-item"><a href="#" class="nav-link">Dashboard</a></li>
            <li class="nav-item"><a href="#" class="nav-link">Projects</a></li>
            <li class="nav-item"><a href="#" class="nav-link">Tasks</a></li>
          </ul>
        </nav>
      </div>
      <div class="header-actions">
        <button class="action-button search-button">
          <font-awesome-icon icon="search" />
        </button>
        <button class="action-button notification-button">
          <font-awesome-icon icon="bell" />
        </button>
        <div class="user-profile">
          <div class="avatar">JS</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'header-cmp',
  props: {},
  data() {
    return {}
  },
  components: {},
  computed: {},
  methods: {},
}
</script>

<style scoped>
.header-container {
  width: 100%;
  height: 60px;
  background-color: var(--color-background-primary);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-xl);
  position: sticky;
  top: 0;
  z-index: var(--z-index-sticky);
  box-shadow: var(--shadow-small);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.header-logo {
  display: flex;
  align-items: center;
}

.logo-text {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  background: linear-gradient(135deg, var(--color-primary) 0%, #00a6fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header-nav {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-list {
  display: flex;
  list-style: none;
  gap: var(--spacing-xl);
}

.nav-item {
  position: relative;
}

.nav-link {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast) ease;
}

.nav-link:hover {
  color: var(--color-text-primary);
  background-color: var(--color-background-hover);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-base);
}

.action-button {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  background-color: transparent;
  transition: all var(--transition-fast) ease;
  cursor: pointer;
}

.action-button:hover {
  background-color: var(--color-background-hover);
  color: var(--color-text-primary);
}

.user-profile {
  display: flex;
  align-items: center;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background-color: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast) ease;
}

.avatar:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-small);
}
</style>
