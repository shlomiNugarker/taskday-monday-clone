<template>
  <div 
    :class="[
      'overflow-hidden',
      elevationClasses,
      borderClasses,
      roundedClasses,
      { 'bg-white': !transparent },
      { 'bg-transparent': transparent },
      { 'hover:shadow-lg transition-shadow duration-300': hoverable },
      className
    ]"
  >
    <div v-if="$slots.header" :class="['px-4 py-3 border-b border-gray-200', headerClass]">
      <slot name="header"></slot>
    </div>
    
    <div :class="['p-4', bodyClass]">
      <slot></slot>
    </div>
    
    <div v-if="$slots.footer" :class="['px-4 py-3 border-t border-gray-200', footerClass]">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiCard',
  props: {
    elevation: {
      type: String,
      default: 'md',
      validator: (value) => ['none', 'sm', 'md', 'lg', 'xl'].includes(value)
    },
    border: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: String,
      default: 'md',
      validator: (value) => ['none', 'sm', 'md', 'lg', 'xl'].includes(value)
    },
    hoverable: {
      type: Boolean,
      default: false
    },
    transparent: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    },
    headerClass: {
      type: String,
      default: ''
    },
    bodyClass: {
      type: String,
      default: ''
    },
    footerClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    elevationClasses() {
      if (this.border) return '';
      
      return {
        'none': '',
        'sm': 'shadow-sm',
        'md': 'shadow',
        'lg': 'shadow-md',
        'xl': 'shadow-lg'
      }[this.elevation];
    },
    borderClasses() {
      return this.border ? 'border border-gray-200' : '';
    },
    roundedClasses() {
      return {
        'none': 'rounded-none',
        'sm': 'rounded-sm',
        'md': 'rounded-md',
        'lg': 'rounded-lg',
        'xl': 'rounded-xl'
      }[this.rounded];
    }
  }
};
</script>