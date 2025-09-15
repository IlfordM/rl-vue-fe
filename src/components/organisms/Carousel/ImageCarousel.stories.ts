import type { Meta, StoryObj } from '@storybook/vue3'
import ImageCarousel from './ImageCarousel.vue'

const meta: Meta<typeof ImageCarousel> = {
  title: 'Organisms/ImageCarousel',
  component: ImageCarousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    autoplay: {
      control: 'boolean',
      description: 'Enable autoplay functionality',
    },
    autoplayInterval: {
      control: 'number',
      description: 'Autoplay interval in milliseconds',
    },
    showNavigation: {
      control: 'boolean',
      description: 'Show navigation arrows',
    },
    showPagination: {
      control: 'boolean',
      description: 'Show pagination dots',
    },
    itemsToShow: {
      control: 'number',
      description: 'Number of items to show at once',
    },
    itemsToScroll: {
      control: 'number',
      description: 'Number of items to scroll',
    },
    wrapAround: {
      control: 'boolean',
      description: 'Enable wrap around navigation',
    },
    mouseDrag: {
      control: 'boolean',
      description: 'Enable mouse drag',
    },
    touchDrag: {
      control: 'boolean',
      description: 'Enable touch drag',
    },
    height: {
      control: 'number',
      description: 'Carousel height in pixels',
    },
    width: {
      control: 'text',
      description: 'Carousel width',
    },
    slideEffect: {
      control: 'select',
      options: ['slide', 'fade'],
      description: 'Slide transition effect',
    },
    showThumbnails: {
      control: 'boolean',
      description: 'Show thumbnail navigation',
    },
    thumbnailsItemsToShow: {
      control: 'number',
      description: 'Number of thumbnails to show',
    },
    thumbnailsHeight: {
      control: 'number',
      description: 'Thumbnails height in pixels',
    },
    thumbnailsGap: {
      control: 'number',
      description: 'Gap between thumbnails in pixels',
    },
    thumbnailsPosition: {
      control: 'select',
      options: ['bottom', 'left'],
      description: 'Position of thumbnails',
    },
    thumbnailsDirection: {
      control: 'select',
      options: ['row', 'column'],
      description: 'Direction of thumbnails layout',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleImages = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  src: `https://picsum.photos/seed/${Math.random()}/800/600`,
  alt: `Gallery Image ${index + 1}`,
  title: `Image ${index + 1}`,
  description: `Beautiful image ${index + 1} from our gallery`,
}))

export const Default: Story = {
  args: {
    images: sampleImages,
    autoplay: false,
    showNavigation: true,
    showPagination: true,
    itemsToShow: 1,
    wrapAround: true,
    height: 400,
    width: '600px',
    slideEffect: 'slide',
    showThumbnails: false,
  },
}

export const WithThumbnails: Story = {
  args: {
    images: sampleImages,
    autoplay: false,
    showNavigation: true,
    showPagination: false,
    itemsToShow: 1,
    wrapAround: true,
    height: 400,
    width: '600px',
    slideEffect: 'slide',
    showThumbnails: true,
    thumbnailsItemsToShow: 6,
    thumbnailsHeight: 80,
    thumbnailsGap: 10,
  },
}

export const LeftThumbnailsColumn: Story = {
  args: {
    images: sampleImages,
    autoplay: false,
    showNavigation: false,
    showPagination: false,
    itemsToShow: 1,
    wrapAround: true,
    height: 500,
    width: '800px',
    slideEffect: 'fade',
    showThumbnails: true,
    thumbnailsItemsToShow: 4,
    thumbnailsHeight: 80,
    thumbnailsGap: 8,
    thumbnailsPosition: 'left',
    thumbnailsDirection: 'column',
  },
}

export const FadeEffect: Story = {
  args: {
    images: sampleImages,
    autoplay: false,
    showNavigation: true,
    showPagination: true,
    itemsToShow: 1,
    wrapAround: true,
    height: 400,
    width: '600px',
    slideEffect: 'fade',
    showThumbnails: false,
  },
}

export const Autoplay: Story = {
  args: {
    images: sampleImages,
    autoplay: true,
    autoplayInterval: 3000,
    showNavigation: true,
    showPagination: true,
    itemsToShow: 1,
    wrapAround: true,
    height: 400,
    width: '600px',
    slideEffect: 'slide',
    showThumbnails: false,
  },
}

export const MultipleItems: Story = {
  args: {
    images: sampleImages,
    autoplay: false,
    showNavigation: true,
    showPagination: true,
    itemsToShow: 3,
    itemsToScroll: 1,
    wrapAround: true,
    height: 300,
    width: '800px',
    slideEffect: 'slide',
    showThumbnails: false,
  },
}

export const GalleryWithThumbnails: Story = {
  args: {
    images: sampleImages,
    autoplay: false,
    showNavigation: true,
    showPagination: false,
    itemsToShow: 1,
    wrapAround: true,
    height: 500,
    width: '700px',
    slideEffect: 'fade',
    showThumbnails: true,
    thumbnailsItemsToShow: 8,
    thumbnailsHeight: 100,
    thumbnailsGap: 8,
  },
}

export const NoNavigation: Story = {
  args: {
    images: sampleImages,
    autoplay: true,
    autoplayInterval: 4000,
    showNavigation: false,
    showPagination: true,
    itemsToShow: 1,
    wrapAround: true,
    height: 400,
    width: '600px',
    slideEffect: 'slide',
    showThumbnails: false,
  },
}

export const NoPagination: Story = {
  args: {
    images: sampleImages,
    autoplay: false,
    showNavigation: true,
    showPagination: false,
    itemsToShow: 1,
    wrapAround: true,
    height: 400,
    width: '600px',
    slideEffect: 'slide',
    showThumbnails: false,
  },
}
