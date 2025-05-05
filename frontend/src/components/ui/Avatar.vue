<template>
  <div 
    :class="[
      'inline-flex items-center justify-center bg-gray-200 text-gray-700 font-medium overflow-hidden',
      sizeClasses,
      { 'rounded-full': rounded },
      { 'rounded-md': !rounded },
      className
    ]"
    :style="borderStyle"
  >
    <img 
      v-if="src && !error" 
      :src="src" 
      :alt="alt"
      @error="handleError" 
      class="h-full w-full object-cover"
    />
    
    <span 
      v-else-if="initials" 
      :class="[
        'font-semibold',
        initSizeClasses
      ]"
    >
      {{ initials }}
    </span>
    
    <slot v-else></slot>
  </div>
</template>

<script>
export default {
  name: 'UiAvatar',
  props: {
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: 'User avatar'
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
    },
    initials: {
      type: String,
      default: ''
    },
    rounded: {
      type: Boolean,
      default: true
    },
    borderColor: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      error: false
    };
  },
  computed: {
    sizeClasses() {
      return {
        'xs': 'w-6 h-6',
        'sm': 'w-8 h-8',
        'md': 'w-10 h-10',
        'lg': 'w-12 h-12',
        'xl': 'w-16 h-16'
      }[this.size];
    },
    initSizeClasses() {
      return {
        'xs': 'text-xs',
        'sm': 'text-sm',
        'md': 'text-base',
        'lg': 'text-lg',
        'xl': 'text-xl'
      }[this.size];
    },
    borderStyle() {
      return this.borderColor ? `border: 2px solid ${this.borderColor}` : '';
    }
  },
  methods: {
    handleError() {
      this.error = true;
    }
  }
};
</script>