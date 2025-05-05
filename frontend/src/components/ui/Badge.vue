<template>
  <span
    :class="[
      'inline-flex items-center',
      sizeClasses,
      variantClasses,
      roundedClasses,
      className
    ]"
  >
    <slot name="icon-left"></slot>
    <span>
      <slot></slot>
    </span>
    <slot name="icon-right"></slot>
  </span>
</template>

<script>
import { computed } from 'vue';
import { borderRadius } from './DesignTokens';

export default {
  name: 'UiBadge',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'neutral', 'outline'].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },
    rounded: {
      type: String,
      default: 'full',
      validator: (value) => ['none', 'sm', 'md', 'lg', 'xl', 'full'].includes(value)
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const sizeClasses = computed(() => {
      return {
        'sm': 'text-xs px-2 py-0.5',
        'md': 'text-xs px-2.5 py-1',
        'lg': 'text-sm px-3 py-1.5'
      }[props.size];
    });

    const variantClasses = computed(() => {
      return {
        'primary': 'bg-primary-500 text-white',
        'secondary': 'bg-secondary-indigo-500 text-white',
        'success': 'bg-status-success text-white',
        'error': 'bg-status-error text-white',
        'warning': 'bg-status-warning text-neutral-black',
        'info': 'bg-status-info text-white',
        'neutral': 'bg-neutral-lightGray text-neutral-darkGray',
        'outline': 'bg-transparent border border-neutral-lightGray text-neutral-darkGray'
      }[props.variant];
    });

    const roundedClasses = computed(() => {
      return {
        'none': 'rounded-none',
        'sm': 'rounded-sm',
        'md': 'rounded-md',
        'lg': 'rounded-lg',
        'xl': 'rounded-xl',
        'full': 'rounded-full'
      }[props.rounded];
    });

    return {
      sizeClasses,
      variantClasses,
      roundedClasses
    };
  }
};
</script>