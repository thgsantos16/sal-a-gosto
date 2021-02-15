<template>
  <div class="stripe-carousel" :class="stripe.classes">
    <h3>{{ stripe.title }}</h3>

    <VueSlickCarousel v-bind="settings">
      <div class="image">
        <div class="text">Sushi</div>
      </div>
      <div class="image">
        <div class="text">Sushi</div>
      </div>
      <div class="image">
        <div class="text">Sushi</div>
      </div>
      <div class="image">
        <div class="text">Sushi</div>
      </div>
      <div class="image">
        <div class="text">Sushi</div>
      </div>
      <div class="image">
        <div class="text">Sushi</div>
      </div>
      <div class="image">
        <div class="text">Sushi</div>
      </div>
      <div class="image">
        <div class="text">Sushi</div>
      </div>
      <div class="image">
        <div class="text">Sushi</div>
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script lang="ts">
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

import { Component, Prop, Vue } from 'vue-property-decorator';

interface StripeObject {
  title: string;
  id: number;
}

interface CarouselSettings {
    arrows?: boolean;
    dots?: boolean;
    slidesToShow?: number;
    slidesToScroll?: number;
    centerMode?: boolean;
    fade?: boolean;
    rtl?: boolean;
    responsive?: Array<object>;
    infinite?: boolean;
    swipeToSlide?: boolean;
}

@Component({
  components: {
    VueSlickCarousel,
  },
})
export default class Stripe extends Vue {
  @Prop() private stripe!: StripeObject;

  settings: CarouselSettings;

  constructor() {
    super();

    this.settings = {
      arrows: true,
      dots: false,
      slidesToShow: 6,
      slidesToScroll: 6,
      centerMode: true,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: true,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
      ],
    };
  }
}
</script>

<style lang="scss">

.stripe-carousel {
  padding: 3px 0 18px;
  text-align: left;

  h3 {
    padding: 10px 0 5px 70px;
    font-size: 22px;
    font-weight: 800;
    text-transform: lowercase;
  }

  .slick-prev {
    left: 0;
    z-index: 99;
    width: 40px;
    height: calc(100% - 21px);
    background: #00000077;
    margin-top: -3px;
  }

  .slick-next {
    right: 0;
    z-index: 99;
    width: 40px;
    height: calc(100% - 21px);
    background: #00000077;
    margin-top: -3px;
  }

  .slick-slide {
    padding: 7px 10px;

    & > div {
      transition: all 0.43s;

      &:hover {
        margin-bottom: -7px;
      }
    }

    .image {
      top: 0;
      transition: all 0.43s;
      background: url(../assets/preview.jpg) center/cover;
      height: 186px;
      position: relative;

      &:hover {
          top: -7px;
          margin: -7px;
          width: calc(100% + 14px) !important;
          height: 200px !important;
          cursor: pointer;

          .text {
              opacity: 1;
              margin-top: 142px;
              position: absolute;
          }
      }

      .text {
          opacity: 0;
          transition: all 0.43s;
          margin-top: 170px;
          position: absolute;
          text-transform: uppercase;
          font-weight: 800;
          padding-left: 30px;
          text-shadow: 2px 2px 5px #00000077;
          font-size: 24px;
      }
    }
  }

  &.bigger {
    .slick-slide {
      & > div {
        &:hover {
          margin-bottom: -7px;
        }
      }

      .image {
        background: url(../assets/preview.jpg) center/cover;
        height: 389px;

        &:hover {
            top: -7px;
            margin: -7px;
            width: calc(100% + 14px) !important;
            height: 403px !important;

          .text {
              margin-top: 340px;
          }
        }

        .text {
            margin-top: 380px;
        }
      }
    }

  }
}
</style>
