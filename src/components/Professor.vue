<template>
  <div class="professor row" :class="{ 'justify-content-end left': left }">
    <div class="col-lg-auto col-md-12" :class="{ 'order-lg-12': left }">
      <small v-html="clean(professor.specialty)" />
      <div class="image order-1"
           v-lazy:background-image="bgImage(professor.image)" />
    </div>

    <div class="col-lg data" :class="{ 'order-1': left }">
      <h2>{{ professor.name }}</h2>
      <div class="summary" v-html="clean(professor.summary)" />
      <div class="social-media">
        <a target="_blank"
           :href="professor.facebook"
           class="facebook"
           v-if="professor.facebook"></a>
        <a target="_blank"
           :href="professor.instagram"
           class="instagram"
           v-if="professor.instagram"></a>
        <a target="_blank"
           :href="professor.youtube"
           class="youtube"
           v-if="professor.youtube"></a>
        <a target="_blank"
           :href="professor.instagram"
           class="instagram-text"
           v-if="professor.instagram">
          @{{ adjustInsta(professor.instagram) }}
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

interface ProfessorObject {
  name: string;
  summary: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  image?: string;
  specialty: string;
  display?: string;
}

@Component({
  methods: {
    clean(val: string): string {
      if (!val) return '';
      return val.replaceAll('\\n', '');
    },
    bgImage(img: string) {
      // eslint-disable-next-line global-require
      return img || require('../assets/preview.jpg');
    },
    adjustInsta(insta) {
      if (insta[0] === '@') return insta.substr(1);
      if (insta.split('/').length <= 1) return insta;
      const res = insta.split('/');
      return res[res.length - 1] ? res[res.length - 1] : res[res.length - 2];
    },
  },
})
export default class Professor extends Vue {
  @Prop() private professor!: ProfessorObject;

  @Prop({ default: false }) private left!: boolean;
}
</script>

<style scoped lang="scss">

.professor {
  margin: 16px 0;
  padding-top: 16px;
  text-align: left;
  padding-bottom: 20px;
  border-bottom: 2px solid #dededf;

  @media screen and (min-width: 1421px) {
    width: 80%;
    margin-left: 10%;
  }

  @media screen and (max-width: 1420px) {
    .summary {
      font-size: .9rem;
    }
  }

  &.last {
    border-bottom: none;
  }

  &.left {
    text-align: right;

    @media screen and (max-width: 1024px) {
      text-align: left;
    }
  }

  small {
    font-weight: bold;
    text-transform: lowercase;
    font-size: 18px;
    max-width: 430px;
    display: block;

    @media screen and (max-width: 1420px) {
      max-width: 384px;
      font-size: 16px;
    }

    @media (max-width: 991.99px) {
      max-width: none;
      text-align: center;
    }
  }

  .image {
    margin-top: 10px;
    background: #AAA center/cover no-repeat;
    width: 430px;
    height: 250px;
    max-width: 100%;

    @media screen and (max-width: 1420px) {
      width: 384px;
      height: 216px;
    }

    @media (max-width: 991.99px) {
      margin: 12px auto 0;
    }
  }

  .data {
    padding-left: 43px;
    padding-top: 52px;

    @media screen and (max-width: 1024px) {
      padding-left: 15px;
    }

    h2 {
      font-weight: bold;
      font-size: 34px;
      margin-bottom: 25px;

      @media screen and (max-width: 1420px) {
        font-size: 30px;
      }
    }

    .social-media {
      margin-top: 25px;

      a {
        display: inline-block;
        height: 25px;
        min-width: 26px;
        margin-right: 10px;
        background: url(../assets/icon-facebook.png) center/contain no-repeat;
        vertical-align: top;
        opacity: .7;

        &:hover {
          opacity: 1;
        }

        &.instagram {
          background-image: url(../assets/icon-instagram.png);
        }

        &.youtube {
          background-image: url(../assets/icon-youtube.png);
          width: 35px;
        }

        &.instagram-text {
          opacity: 1;
          background-image: none;
        }
      }
    }
  }
}
</style>
