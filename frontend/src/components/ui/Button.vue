<template>
  <button 
    :class="[
      'transition-all focus:outline-none focus:ring-2 focus:ring-offset-2',
      sizeClasses,
      variantClasses,
      roundedClasses,
      { 'opacity-50 cursor-not-allowed': disabled },
      { 'inline-flex items-center justify-center gap-2': $slots['icon-left'] || $slots['icon-right'] },
      className
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <span v-if="$slots['icon-left']" class="flex-shrink-0">
      <slot name="icon-left"></slot>
    </span>
    <span :class="{'font-medium': !isPlain}">
      <slot></slot>
    </span>
    <span v-if="$slots['icon-right']" class="flex-shrink-0">
      <slot name="icon-right"></slot>
    </span>
  </button>
</template>

<script>
import { computed } from 'vue';
import { colors, animation } from './DesignTokens';

export default {
  name: 'UiButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'info', 'warning'].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
    },
    rounded: {
      type: String,
      default: 'md',
      validator: (value) => ['none', 'sm', 'md', 'lg', 'xl', 'full'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isPlain: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const sizeClasses = computed(() => {
      return {
        'xs': 'py-1 px-2 text-xs',
        'sm': 'py-1.5 px-3 text-sm',
        'md': 'py-2 px-4 text-sm',
        'lg': 'py-2.5 px-5 text-base',
        'xl': 'py-3 px-6 text-base'
      }[props.size];
    });

    const variantClasses = computed(() => {
      const baseTransition = `transition-colors duration-${animation.duration.normal}`;
      
      return {
        'primary': `bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 ${baseTransition}`,
        'secondary': `bg-secondary-indigo-500 text-white hover:bg-secondary-indigo-600 focus:ring-secondary-indigo-500 ${baseTransition}`,
        'outline': `bg-transparent border border-neutral-lightGray text-neutral-black hover:bg-neutral-extraLightGray focus:ring-neutral-lightGray ${baseTransition}`,
        'ghost': `bg-transparent text-neutral-black hover:bg-neutral-extraLightGray focus:ring-neutral-lightGray ${baseTransition}`,
        'danger': `bg-secondary-red-500 text-white hover:bg-secondary-red-600 focus:ring-secondary-red-500 ${baseTransition}`,
        'success': `bg-status-success text-white hover:bg-secondary-green-600 focus:ring-status-success ${baseTransition}`,
        'info': `bg-status-info text-white hover:bg-blue-600 focus:ring-status-info ${baseTransition}`,
        'warning': `bg-status-warning text-neutral-black hover:bg-amber-600 focus:ring-status-warning ${baseTransition}`
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