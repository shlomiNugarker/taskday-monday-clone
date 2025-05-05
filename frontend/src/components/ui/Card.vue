<template>
  <div 
    :class="[
      'overflow-hidden',
      elevationClasses,
      borderClasses,
      roundedClasses,
      colorClasses,
      { 'hover:shadow-lg transition-shadow duration-300': hoverable },
      className
    ]"
  >
    <div 
      v-if="$slots.header" 
      :class="[
        'px-4 py-3', 
        {'border-b border-neutral-lightGray': !noBorder},
        headerClass
      ]"
    >
      <slot name="header"></slot>
    </div>
    
    <div :class="['px-4 py-3', bodyClass]">
      <slot></slot>
    </div>
    
    <div 
      v-if="$slots.footer" 
      :class="[
        'px-4 py-3', 
        {'border-t border-neutral-lightGray': !noBorder},
        footerClass
      ]"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { shadows, borderRadius } from './DesignTokens';

export default {
  name: 'UiCard',
  props: {
    elevation: {
      type: String,
      default: 'md',
      validator: (value) => ['none', 'sm', 'md', 'lg', 'xl', '2xl'].includes(value)
    },
    border: {
      type: Boolean,
      default: false
    },
    noBorder: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: String,
      default: 'md',
      validator: (value) => ['none', 'sm', 'md', 'lg', 'xl', '2xl'].includes(value)
    },
    hoverable: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'white',
      validator: (value) => ['white', 'light', 'transparent', 'primary', 'secondary'].includes(value)
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
  setup(props) {
    const elevationClasses = computed(() => {
      if (props.border) return '';
      
      return {
        'none': '',
        'sm': 'shadow-sm',
        'md': 'shadow',
        'lg': 'shadow-lg',
        'xl': 'shadow-xl',
        '2xl': 'shadow-2xl'
      }[props.elevation];
    });

    const borderClasses = computed(() => {
      return props.border ? 'border border-neutral-lightGray' : '';
    });

    const roundedClasses = computed(() => {
      return {
        'none': 'rounded-none',
        'sm': 'rounded-sm',
        'md': 'rounded-md',
        'lg': 'rounded-lg',
        'xl': 'rounded-xl',
        '2xl': 'rounded-2xl'
      }[props.rounded];
    });

    const colorClasses = computed(() => {
      return {
        'white': 'bg-white',
        'light': 'bg-neutral-extraLightGray',
        'transparent': 'bg-transparent',
        'primary': 'bg-primary-500 text-white',
        'secondary': 'bg-secondary-indigo-500 text-white'
      }[props.variant];
    });

    return {
      elevationClasses,
      borderClasses,
      roundedClasses,
      colorClasses
    };
  }
};
</script>