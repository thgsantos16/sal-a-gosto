<template>
  <div class="professor row" :class="{ 'justify-content-end left': left }">
    <div class="col-lg-auto col-md-12" :class="{ 'order-12': left }">
      <small v-html="clean(professor.specialty)" />
      <div class="image"
           :style="{ backgroundImage: professor.image ? `url(${professor.image})` : ''}" />
    </div>

    <div class="col-lg col-xl-5 data" :class="{ 'order-1': left }">
      <h2>{{ professor.name }}</h2>
      <div class="summary" v-html="clean(professor.summary)" />
      <div class="social-media">
        <a :href="professor.facebook" class="facebook" v-if="professor.facebook"></a>
        <a :href="professor.instagram" class="instagram" v-if="professor.instagram"></a>
        <a :href="professor.youtube" class="youtube" v-if="professor.youtube"></a>
        <a :href="professor.instagram" class="instagram-text" v-if="professor.instagram">
          @{{ professor.instagram }}
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
  padding-top: 25px;
  text-align: left;
  padding-bottom: 20px;
  border-bottom: 2px solid #dededf;

  &.last {
    border-bottom: none;
  }

  &.left {
    text-align: right;
  }

  small {
    font-weight: bold;
    text-transform: lowercase;
    font-size: 18px;
    max-width: 584px;
    display: block;

    @media (max-width: 1240px) {
      max-width: 430px;
    }
  }

  .image {
    margin-top: 10px;
    height: 383px;
    width: 584px;
    background: #AAA center/cover no-repeat;

    @media (max-width: 1240px) {
      width: 430px;
      height: 250px;
    }
  }

  .data {
    padding-left: 43px;
    padding-top: 52px;

    h2 {
      font-weight: bold;
      font-size: 38px;
      margin-bottom: 25px;
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
