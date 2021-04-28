<template>
  <div class="video">
    <div class="video-overlay" @click="closeVideo"></div>
    <div class="video-close" @click="closeVideo">x</div>
    <div class="video-inner" ref="inner">
      <transition name="fade" mode="out-in" appear>
        <div class="video-ready" key="ready" v-if="ready">
          <div class="video-player-outer">
            <div class="video-player">
              <div class="video-embed" v-if="aula.embed_video && aula.embed_chat">
                <div v-html="getEmbed(aula.embed_video)" class="with-chat" />
                <div v-html="getEmbed(aula.embed_chat)" class="chat" />
              </div>
              <div class="video-embed" v-else-if="aula.embed_video">
                <div v-html="getEmbed(aula.embed_video)" />
              </div>
              <video controls="controls" v-else>
                <source :src="aula.video_url" type="video/mp4" />
                O seu navegador não suporta a tag vídeo
              </video>
            </div>
          </div>
          <div class="row video-data">
            <div class="col-lg-8">
              <h2 v-html="video.titulo" />
              <small>
                {{ findTeacher }} .
                {{ videoYear }} .
                {{ toHoursMins(video.duracao) }}
              </small>

              <p class="video-summary font-italic" v-html="clean(video.resumo)" />

              <p class="video-summary" v-html="clean(video.descricao)" />

              <div class="row video-commentaries">
                <form @submit.prevent="sendComment" v-if="getUser" class="row">
                  <div class="col-lg">
                    <input placeholder="Escrever um comentário..." v-model="comment">
                  </div>
                  <div class="col-lg-auto col-md-12">
                    <button class="button" type="submit">Enviar</button>
                  </div>
                </form>
                <div class="col-lg-12 video-commentaries-inner">
                  <h3 class="comments-header">Comentários</h3>
                  <div class="no-comments" v-if="aula.comentarios.length === 0">
                    Ainda não há comentários nessa aula.
                  </div>
                  <div class="video-comment" v-for="comment in aula.comentarios" :key="comment.id">
                    <div class="video-comment-text" v-html="comment.descricao" />
                    <small class="video-comment-meta"
                         v-html="`${comment.usuario_nome} .
                         ${formatDate(comment.data_criacao)}`" />
                  </div>
                </div>
              </div>
            </div>
            <div class="right-col col-lg-4 text-right pt-4 pr-3">
              <StarRating :round-start-rating="false"
                          :rounded-corners="true"
                          :animate="true"
                          :show-rating="false"
                          :style="{ float: 'right' }"
                          :padding="7"
                          border-color="#FFF"
                          :star-size="34"
                          inactive-color="#555"
                          :active-color="activeColor"
                          v-model="rating"
                          @rating-selected="ratingSelected" />
              <div class="mt-5 pt-4">
                <p><a :href="aula.arquivo_url" download>Aula em PDF</a></p>
                <p>
                  <a @click="toogleFav">Aula Favorita</a>
                  <span class="custom-checkbox"
                        :class="{ selected: fav }"
                        @click="toogleFav" />
                </p>

                <p>
                  <a @click="toogleConcluded">Aula Concluída</a>
                  <span class="custom-checkbox"
                        :class="{ selected: concluded }"
                        @click="toogleConcluded" />
                </p>
              </div>
            </div>
          </div>
        </div>
        <Loader v-else />
      </transition>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import _ from 'lodash';
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default Vue.extend({
  props: ['video'],
  computed: {
    ...mapGetters(['getApiUrl', 'getUser', 'getTeachers']),
    findTeacher() {
      const prof = _.find(this.getTeachers, { id: this.aula.professores });
      return prof ? prof.nome : 'Professor Convidado';
    },
    activeColor() {
      return this.aula.mine_nota || this.toYellow ? '#ffd055' : '#DDD';
    },
  },
  data() {
    return {
      aula: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        embed_video: null,
        comentarios: [],
      },
      ready: false,
      rating: 0,
      comment: '',
      videoYear: '',
      fav: false,
      concluded: false,
      toYellow: false,
    };
  },
  beforeMount() {
    let userId = '';
    if (this.getUser) userId = this.getUser.login_token;

    const url = `${this.getApiUrl}&meth=getAula&id_aula=${this.video.id}&id_usuario=${userId}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const aula = res.result[0].aula[0];
        if (aula) {
          if (aula.publico === '0') {
            if (!this.getUser) {
              this.setRedirect(this.video);
              this.leave();
            } else if (!this.getUser.id_plano) {
              this.$router.push({ name: 'planos' });
              this.closeVideo();
            } else {
              this.aula = aula;
              this.rating = parseFloat(aula.mine_nota) || parseFloat(aula.nota);
              this.fav = !!aula.mine_fav && aula.mine_fav !== '0';
              this.concluded = !!aula.mine_concluido && aula.mine_concluido !== '0';

              // eslint-disable-next-line prefer-destructuring
              this.videoYear = aula.data_criacao.split('-')[0];
              this.ready = true;
            }
          } else {
            this.aula = aula;

            // eslint-disable-next-line prefer-destructuring
            this.videoYear = aula.data_criacao.split('-')[0];
            this.rating = parseFloat(aula.mine_nota) || parseFloat(aula.nota);
            this.fav = !!aula.mine_fav && aula.mine_fav !== '0';
            this.concluded = !!aula.mine_concluido && aula.mine_concluido !== '0';
            this.ready = true;
          }
        } else {
          this.leave();
        }
      });
  },
  methods: {
    ...mapActions(['changeVideoDisplay', 'setRedirect', 'setLoadingApi']),
    leave() {
      if (!this.getUser) this.$router.push({ name: 'login' });
      else this.$router.push({ name: 'planos' });
      this.closeVideo();
    },
    closeVideo() {
      this.changeVideoDisplay(false);
    },
    toogleFav() {
      this.fav = !this.fav;

      let url = `${this.getApiUrl}&meth=setFav`;
      url += `&id_aula=${this.video.id}&id_usuario=${this.getUser.login_token}`;

      this.setLoadingApi(true);

      fetch(url)
        .then((res) => res.json())
        .then(() => {
          this.setLoadingApi(false);
        });
    },
    toogleConcluded() {
      this.concluded = !this.concluded;

      let url = `${this.getApiUrl}&meth=setLog&concluido=1`;
      url += `&id_aula=${this.video.id}&id_usuario=${this.getUser.login_token}`;

      this.setLoadingApi(true);

      fetch(url)
        .then((res) => res.json())
        .then(() => {
          this.setLoadingApi(false);
        });
    },
    validateComment() {
      this.$v.touch();
      if (!this.$v.invalid) this.sendComment();
    },
    sendComment() {
      let url = `${this.getApiUrl}&meth=setComentario`;
      url += `&id_aula=${this.video.id}&id_usuario=${this.getUser.login_token}`;
      url += `&descricao=${this.comment}`;

      this.setLoadingApi(true);

      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          this.setLoadingApi(false);

          if (res.result[0].aulas_comentarios.length > 0) {
            this.aula.comentarios.push(res.result[0].aulas_comentarios[0]);

            this.$bvToast.toast('Seus comentário foi Salvo com sucesso!', {
              title: 'Cometário salvo',
              variant: 'success',
              solid: true,
            });
          } else {
            this.$bvToast.toast('Não conseguimos salvar seu comentário no momento.', {
              title: 'Erro inesperado',
              variant: 'danger',
              solid: true,
            });
          }

          this.comment = '';
        });
    },
    ratingSelected() {
      this.toYellow = true;

      let url = `${this.getApiUrl}&meth=setNota`;
      url += `&id_aula=${this.video.id}&id_usuario=${this.getUser.login_token}`;
      url += `&nota=${this.rating}`;

      this.setLoadingApi(true);

      fetch(url)
        .then((res) => res.json())
        .then(() => {
          this.setLoadingApi(false);
        });
    },
    toHoursMins(time) {
      const minutes = parseInt(time.split('.')[0], 10);
      if (minutes <= 60) return `${minutes}min`;
      const hours = Math.floor(minutes / 60);
      const rest = minutes % 60;
      return `${hours}h${rest}min`;
    },
    clean(val) {
      if (!val) return '';
      return val.replaceAll('\\n', '');
    },
    getEmbed(video) {
      const { inner } = this.$refs;

      const height = (inner.clientWidth * 9) / 16;
      const iframe = video.replace(/ width=''(.*?)''/, '')
        .replace(/ height=''(.*?)''/, '')
        .replace('><', ` style="width: 100%; height: ${height}px;" ref="video"><`)
        .replaceAll(/''/g, '"');

      return iframe;
    },
    formatDate(date) {
      return moment(date).locale('pt-br').format('MMMM Do YYYY, hh:mm:ss');
    },
  },
  validations: {
    comment: { required },
  },
});
</script>

<style lang="scss" scoped>

.video {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1090;

  .video-overlay {
    background-color: #000000AA;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1091;
  }

  .video-close {
    position: fixed;
    color: #FFF;
    top: calc(10vh - 34px);
    right: calc(5% - 20px);
    font-size: 25px;
    cursor: pointer;

    @media screen and (min-width: 1330px) {
      right: calc(15% - 20px);
    }

  }

  .video-inner {
    background-color: #000000CC;
    position: fixed;
    width: 90%;
    min-height: 30px;
    max-height: calc(100vh - 95px);
    top: 10vh;
    margin-left: 5%;
    z-index: 9992;
    overflow-x: hidden;
    overflow-y: auto;

    .custom-checkbox {
      margin-left: 16px;
      margin-right: 0 !important;

      &.selected:before {
        display: block !important;
      }
    }

    @media screen and (min-width: 1330px) {
      width: 70%;
      margin-left: 15%;
    }

    .right-col {
      p {
        margin: 7px 0;

        a {
          cursor: pointer;
        }
      }
    }

    .video-player {
      background-color: #000;
      animation: appear .5s;
      width: 100%;

      .with-chat {
          width: 75%;
          display: inline-block;
          vertical-align: top;
      }

      .chat {
          width: 25%;
          display: inline-block;
          overflow-x: auto;
      }

      video {
        width: 100%;
      }
    }

    .video-data {
      text-align: left;
      padding: 28px;

      .video-summary {
        margin-top: 20px;
      }

      .video-commentaries {
        form {
          width: 100%;
          padding-left: 15px;
        }

        .video-comment {
          padding: 8px 0;
          border-bottom: 1px solid #222;
          margin-bottom: 12px;

          &:last-child {
            border-bottom: none;
          }
        }

        .comments-header {
          margin: 16px 0;
        }

        button {
          margin-top: 11px;
        }
      }
    }
  }
}

@keyframes appear {
  from {
    width: 0;
    height: 0;
    margin: 10vh 0 0 50%;
  }
  to {
    width: 100%;
    height: 520px;
    margin: 0;
  }
}

</style>
