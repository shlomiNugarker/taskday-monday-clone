import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import store from './store'
import VueSnip from 'vue-snip'
import DropdownMenu from '@innologica/vue-dropdown-menu'

// UI Components
import UiComponents from './components/ui'

// Styles
import '../src/styles/tailwind.css'
import '../src/styles/styles.scss'
import 'element-plus/dist/index.css'

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { dom } from '@fortawesome/fontawesome-svg-core'

// Add all icons
library.add(fas, fab, far)
dom.watch()

const app = createApp(App)

// Use plugins
app.use(VueSnip)
app.use(ElementPlus)
app.use(DropdownMenu)
app.use(UiComponents)

// Global components
app.component('font-awesome-icon', FontAwesomeIcon)

// Core plugins
app.use(router)
app.use(store)

app.mount('#app')