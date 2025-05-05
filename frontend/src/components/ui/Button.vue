<template>
  <button 
    :class="[
      'transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
      sizeClasses,
      variantClasses,
      roundedClasses,
      { 'opacity-50 cursor-not-allowed': disabled },
      { 'inline-flex items-center justify-center': $slots.icon },
      className
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot name="icon-left"></slot>
    <slot></slot>
    <slot name="icon-right"></slot>
  </button>
</template>

<script>
export default {
  name: 'UiButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success'].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },
    rounded: {
      type: String,
      default: 'md',
      validator: (value) => ['none', 'sm', 'md', 'lg', 'full'].includes(value)
    },
    disabled: {
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
        'sm': 'py-1.5 px-3 text-xs',
        'md': 'py-2 px-4 text-sm',
        'lg': 'py-2.5 px-5 text-base'
      }[this.size];
    },
    variantClasses() {
      return {
        'primary': 'bg-primary-blue text-white hover:bg-blue-600 focus:ring-blue-500',
        'secondary': 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 focus:ring-indigo-500',
        'outline': 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
        'ghost': 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
        'danger': 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        'success': 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
      }[this.variant];
    },
    roundedClasses() {
      return {
        'none': 'rounded-none',
        'sm': 'rounded',
        'md': 'rounded-md',
        'lg': 'rounded-lg',
        'full': 'rounded-full'
      }[this.rounded];
    }
  }
};
</script>