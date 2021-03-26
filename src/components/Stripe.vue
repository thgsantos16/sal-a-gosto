<template>
  <div class="stripe-carousel" :class="stripe.classes">
    <h3>{{ stripe.title }}</h3>

    <VueSlickCarousel v-bind="settings">
      <div class="image"
           v-for="cls in stripe.classes"
           :key="`${cls.id}-${cls.titulo}`"
           @click="openVideo(cls)"
           :style="{ backgroundImage: cls.imagem_url ? `url(${cls.imagem_url})` : '' }">
        <div class="text">{{ cls.titulo }}</div>
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script lang="ts">
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapActions } from 'vuex';

interface ClassObject {
  apimsg: string|null;
  apistatus: string|null;
  arquivo: string|null;
  arquivo_url: string|null;
  categoria: string|null;
  data_disponivel: string|null;
  descricao: string|null;
  duracao: string|null;
  id: string|null;
  id_plano_minimo: string|null;
  id_tipo: string|null;
  imagem: string|null;
  imagem_url: string|null;
  live: string|null;
  preco: string|null;
  professores: string|null;
  publico: string|null;
  receitas: string|null;
  resumo: string|null;
  tags: string|null;
  titulo: string|null;
}

interface StripeObject {
  title: string;
  id: number;
  classes: Array<ClassObject>;
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
  methods: {
    ...mapActions(['changeVideoDisplay']),
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

  openVideo(video: ClassObject) {
    console.log(video);
    this.$store.dispatch('changeVideoInfo', video);
    this.$store.dispatch('changeVideoDisplay', true);
  }
}
</script>

<style lang="scss">

.stripe-carousel {
  padding: 3px 0 18px;
  text-align: left;
  min-height: 280px;

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
      background: #333 url(../assets/preview.jpg) center/cover;
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
              margin-top: 133px;
              position: absolute;
          }
      }

      .text {
          opacity: 0;
          transition: all 0.43s;
          margin-top: 152px;
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
