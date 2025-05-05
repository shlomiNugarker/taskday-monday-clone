<template>
  <span
    :class="[
      'inline-flex items-center justify-center font-medium',
      sizeClasses,
      variantClasses,
      { 'rounded-full': pill },
      { 'rounded': !pill },
      className
    ]"
  >
    <slot name="icon-left"></slot>
    <slot></slot>
    <slot name="icon-right"></slot>
  </span>
</template>

<script>
export default {
  name: 'UiBadge',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => [
        'primary', 'secondary', 'success', 'danger', 
        'warning', 'info', 'light', 'dark'
      ].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },
    pill: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    sizeClasses() {
      return {
        'sm': 'px-1.5 py-0.5 text-xs',
        'md': 'px-2 py-1 text-xs',
        'lg': 'px-2.5 py-1.5 text-sm'
      }[this.size];
    },
    variantClasses() {
      return {
        'primary': 'bg-blue-100 text-blue-800',
        'secondary': 'bg-gray-100 text-gray-800',
        'success': 'bg-green-100 text-green-800',
        'danger': 'bg-red-100 text-red-800',
        'warning': 'bg-yellow-100 text-yellow-800',
        'info': 'bg-blue-100 text-blue-800',
        'light': 'bg-gray-100 text-gray-800',
        'dark': 'bg-gray-800 text-white'
      }[this.variant];
    }
  }
};
</script>