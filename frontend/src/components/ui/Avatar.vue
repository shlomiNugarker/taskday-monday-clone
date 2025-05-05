<template>
  <div
    :class="[
      'relative inline-flex items-center justify-center overflow-hidden',
      sizeClasses,
      roundedClasses,
      borderClasses,
      { 'bg-primary-500': !bgColor },
      { 'ring-2 ring-white': hasRing },
      className
    ]"
    :style="bgColor ? { backgroundColor: bgColor } : {}"
  >
    <!-- Initials (shown when no image) -->
    <span 
      v-if="!imgSrc && initials" 
      :class="[
        'text-white', 
        initialsClasses
      ]"
    >
      {{ initials }}
    </span>
    
    <!-- Icon (shown when no image and no initials) -->
    <span 
      v-if="!imgSrc && !initials" 
      :class="[
        'text-white', 
        iconClasses
      ]"
    >
      <slot name="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
          <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
        </svg>
      </slot>
    </span>
    
    <!-- Image -->
    <img
      v-if="imgSrc"
      :src="imgSrc"
      :alt="alt"
      class="w-full h-full object-cover"
    />
    
    <!-- Status Indicator -->
    <div 
      v-if="status" 
      :class="[
        'absolute',
        statusPositionClasses,
        statusSizeClasses,
        statusVariantClasses,
        'rounded-full border-2 border-white'
      ]"
    ></div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'UiAvatar',
  props: {
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl', '2xl'].includes(value)
    },
    rounded: {
      type: String,
      default: 'full',
      validator: (value) => ['none', 'sm', 'md', 'lg', 'xl', 'full'].includes(value)
    },
    imgSrc: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: 'Avatar'
    },
    initials: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: ''
    },
    hasBorder: {
      type: Boolean,
      default: false
    },
    hasRing: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: '',
      validator: (value) => ['', 'online', 'offline', 'busy', 'away'].includes(value)
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const sizeClasses = computed(() => {
      return {
        'xs': 'w-6 h-6',
        'sm': 'w-8 h-8',
        'md': 'w-10 h-10',
        'lg': 'w-12 h-12',
        'xl': 'w-16 h-16',
        '2xl': 'w-20 h-20'
      }[props.size];
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

    const borderClasses = computed(() => {
      return props.hasBorder ? 'border border-neutral-lightGray' : '';
    });

    const initialsClasses = computed(() => {
      return {
        'xs': 'text-xs',
        'sm': 'text-xs',
        'md': 'text-sm',
        'lg': 'text-base',
        'xl': 'text-lg',
        '2xl': 'text-xl'
      }[props.size];
    });

    const iconClasses = computed(() => {
      return {
        'xs': 'w-3 h-3',
        'sm': 'w-4 h-4',
        'md': 'w-5 h-5',
        'lg': 'w-6 h-6',
        'xl': 'w-8 h-8',
        '2xl': 'w-10 h-10'
      }[props.size];
    });

    const statusSizeClasses = computed(() => {
      return {
        'xs': 'w-1.5 h-1.5',
        'sm': 'w-2 h-2',
        'md': 'w-2.5 h-2.5',
        'lg': 'w-3 h-3',
        'xl': 'w-3.5 h-3.5',
        '2xl': 'w-4 h-4'
      }[props.size];
    });

    const statusPositionClasses = computed(() => {
      return {
        'xs': 'right-0 bottom-0',
        'sm': 'right-0 bottom-0',
        'md': 'right-0 bottom-0',
        'lg': 'right-0 bottom-0',
        'xl': 'right-0.5 bottom-0.5',
        '2xl': 'right-1 bottom-1'
      }[props.size];
    });

    const statusVariantClasses = computed(() => {
      return {
        'online': 'bg-status-success',
        'offline': 'bg-neutral-lightGray',
        'busy': 'bg-status-error',
        'away': 'bg-status-warning'
      }[props.status];
    });

    return {
      sizeClasses,
      roundedClasses,
      borderClasses,
      initialsClasses,
      iconClasses,
      statusSizeClasses,
      statusPositionClasses,
      statusVariantClasses
    };
  }
};
</script>