<template>
<div class="column is-12-mobile is-12-tablet is-6-desktop is-offset-3-desktop">
  <div>
    <div v-if="wrapNum == 1">
      <svg ref="svgCard" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
        <rect x="0" y="0" height="100%" width="100%" fill="#00C8FF"></rect>
        <rect x="0" y="15%" height="85%" width="100%" fill="#7BE2FF" stroke="#00C8FF" stroke-width="24"></rect>
        <text x="50%" y="14%" font-size="7px" text-anchor="middle" fill="#fff">{{dateTitle}}の🐶Q</text>
        <text x="50%" y="23%" font-size="7px" text-anchor="middle" fill="#fff">"{{question.title}}"</text>
        <text x="50%" y="60%" font-size="10px" text-anchor="middle" fill="#fff">{{makeMsg1}}</text>
        <text x="77%" y="95%" font-size="5px" text-anchor="right" fill="#fff">1日1問! oneQ!!!</text>
      </svg>
    </div>
    <div v-else-if="wrapNum == 2">
      <svg ref="svgCard" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
        <rect x="0" y="0" height="100%" width="100%" fill="#00C8FF"></rect>
        <rect x="0" y="15%" height="85%" width="100%" fill="#7BE2FF" stroke="#00C8FF" stroke-width="24"></rect>
        <text x="50%" y="14%" font-size="7px" text-anchor="middle" fill="#fff">{{dateTitle}}の🐶Q</text>
        <text x="50%" y="23%" font-size="7px" text-anchor="middle" fill="#fff">"{{question.title}}"</text>
        <text x="50%" y="55%" font-size="10px" text-anchor="middle" fill="#fff">{{makeMsg1}}</text>
        <text x="50%" y="65%" font-size="10px" text-anchor="middle" fill="#fff">{{makeMsg2}}</text>
        <text x="77%" y="95%" font-size="5px" text-anchor="right" fill="#fff">1日1問! oneQ!!!</text>
      </svg>
    </div>
    <div v-else-if="wrapNum == 3">
      <svg ref="svgCard" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
        <rect x="0" y="0" height="100%" width="100%" fill="#00C8FF"></rect>
        <rect x="0" y="15%" height="85%" width="100%" fill="#7BE2FF" stroke="#00C8FF" stroke-width="24"></rect>
        <text x="50%" y="14%" font-size="7px" text-anchor="middle" fill="#fff">{{dateTitle}}の🐶Q</text>
        <text x="50%" y="23%" font-size="7px" text-anchor="middle" fill="#fff">"{{question.title}}"</text>
        <text x="50%" y="50%" font-size="10px" text-anchor="middle" fill="#fff">{{makeMsg1}}</text>
        <text x="50%" y="60%" font-size="10px" text-anchor="middle" fill="#fff">{{makeMsg2}}</text>
        <text x="50%" y="70%" font-size="10px" text-anchor="middle" fill="#fff">{{makeMsg3}}</text>
        <text x="77%" y="95%" font-size="5px" text-anchor="right" fill="#fff">1日1問! oneQ!!!</text>
      </svg>
    </div>
    <div v-else>
      <svg ref="svgCard" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
        <rect x="0" y="0" height="100%" width="100%" fill="#00C8FF"></rect>
        <rect x="0" y="15%" height="85%" width="100%" fill="#7BE2FF" stroke="#00C8FF" stroke-width="24"></rect>
        <text x="50%" y="14%" font-size="7px" text-anchor="middle" fill="#fff">{{dateTitle}}の🐶Q</text>
        <text x="50%" y="23%" font-size="7px" text-anchor="middle" fill="#fff">"{{question.title}}"</text>
        <text x="50%" y="45%" font-size="10px" text-anchor="middle" fill="#fff">{{makeMsg1}}</text>
        <text x="50%" y="55%" font-size="10px" text-anchor="middle" fill="#fff">{{makeMsg2}}</text>
        <text x="50%" y="65%" font-size="10px" text-anchor="middle" fill="#fff">{{makeMsg3}}</text>
        <text x="50%" y="75%" font-size="10px" text-anchor="middle" fill="#fff">{{makeMsg4}}</text>
        <text x="77%" y="95%" font-size="5px" text-anchor="right" fill="#fff">1日1問! oneQ!!!</text>
      </svg>
    </div>
  </div>
  <div>
    <!-- <p>{{user}}</p> -->
    <p v-if="user" >
      <img :src="user.icon">
      {{user.name}}
    </p>
    <p v-else >not signed</p>
  </div>
  <b-field>
    <b-input v-model="msg" type="textarea"></b-input>
  </b-field>
  <b-field position="is-centered">
    <p class="control">
      <button @click="create" class="button is-primary">
        Send message
      </button>
    </p>
  </b-field>
  <div v-if="shareUrl">
    <button @click="twitterShare" class="button is-primary">
      Twitterでシェアする
    </button>
  </div>
  <div>
    <button @click="twitterLogin" class="button is-info">
      Twitterでログインする
    </button>
    <button @click="logout" class="button is-info">
      ログアウトする
    </button>
  </div>
</div>
</template>

<script>
import auth from '~/plugins/auth'
import firebase from '~/plugins/firebase'
import canvg from 'canvg'
import shortid from 'shortid'
import format from 'date-fns/format'
import jaLocale from 'date-fns/locale/ja'
import parse from 'date-fns/parse'
import { mapGetters, mapActions } from 'vuex'

const db = firebase.firestore()

// svgをpngに変換する関数
function svg2imageData(svgElement, successCallback, errorCallback) {
  var canvas = document.createElement('canvas')
  canvas.width = 1200
  canvas.height = 630
  var ctx = canvas.getContext('2d')
  var image = new Image()
  image.onload = () => {
    ctx.drawImage(image, 0, 0, 1200, 630)
    successCallback(canvas.toDataURL())
  }
  image.onerror = (e) => {
    errorCallback(e)
  }
  var svgData = new XMLSerializer().serializeToString(svgElement)
  image.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(unescape(encodeURIComponent(svgData)))
}

const firstWrap = 15
const secondWrap = 30
const thirdWrap = 45
const fourthWrap = 60

export default {
  components: {},
  data() {
    return {
      msg: 'ふむふむ、いい質問ですね、',
      wrapNo: 1,
      uuid: shortid.generate(),
      shareUrl: ''
    }
  },
  async asyncData({ store }) {
    let checkUser

    const today = format(
      new Date(),
      'YYYYMMDD',
      {locale: jaLocale}
    )

    // const today = moment(new Date).format('YYYYMMDD');
    const toDayKey = 'v1_' + today
    // const toDayKey = 'v1_' + '20190610'
    // checkUser = await auth()
    // if (store.getters['user']) checkUser = await auth()
    await Promise.all([
      store.getters['question'] ? Promise.resolve() : store.dispatch('initQuestion', {dayKey: toDayKey}),
      store.getters['questions'].length ? Promise.resolve() : store.dispatch('initQuestions'),
      // store.getters['user'] ? Promise.resolve() : store.dispatch('setCredential', { user: user || null }),
      // this.posts.length ? Promise.resolve() : this.$store.dispatch('initPosts'),)
    ])
    store.dispatch('loadComplete')
    console.log("this is questions: ", store.questions)
    console.log("this is question: ", store.question)
    return {
    }
  },
  async mounted() {
    let authUser
    if (!this.authUser) authUser = await auth()
    console.log("ログインできてる", authUser)
    await Promise.all([
      this.authUser ? Promise.resolve() : this.$store.dispatch('setCredential', { authUser: authUser || null }),
    ])
    await Promise.all([
      this.uesr ? Promise.resolve() : this.$store.dispatch('initUser', { uid: this.authUser.uid || null }),
    ])
    console.log("this is authUser: ", this.authUser)
    // console.log("this is user: ", this.user)
  },
  computed: {
    ...mapGetters(['authUser','user','question', 'questions']),
    //改行する用の監視ロジック
    wrapNum: function() {
      var num = 1
      if (this.msg.length > thirdWrap) {
        num = 4
      } else if (this.msg.length > firstWrap) {
        num = 3
      } else if (this.msg.length > secondWrap) {
        num = 2
      } else {
        num = 1
      }
      return num;
    },
    //各行に流す用の文字列生成
    makeMsg1: function() {
      var result = this.msg.slice(0, firstWrap)
      return result
    },
    makeMsg2: function() {
      var result = this.msg.slice(firstWrap, secondWrap)
      return result
    },
    makeMsg3: function() {
      var result = this.msg.slice(secondWrap, thirdWrap)
      return result
    },
    makeMsg4: function() {
      var result = this.msg.slice(thirdWrap, fourthWrap)
      return result
    },
    // 20190610 -> 6月10日 にコンバート
    dateTitle: function() {
      const date = this.question.date
      const result = parse(date)
      const today = format(
        result,
        'M月D日',
        {locale: jaLocale}
      )
      return today
    }
  },
  methods: {
  ...mapActions(['loadComplete']),
    create() {
      let self = this
      // refでsvgCardをsvgに設定しているのでthis.$refs.svgCardで要素を取れます
      svg2imageData(this.$refs.svgCard, (data) => {
        const sRef = firebase.storage().ref()
        const fileRef = sRef.child(`${this.uuid}.png`)
        console.log('this.uuid: ', this.uuid);
        // Cloud Storageにアップロード
        fileRef.putString(data, 'data_url')
          .then(response => {
            console.error('Success save strage');
            response.ref.getDownloadURL().then((downloadURL) => {
              console.error('Start save firestore', downloadURL);
              //Strage保存成功→Firestoreに保存
              let newUrl = ""
              db.collection('cards').add({
                  msg: this.msg,
                  storageUrl: downloadURL
                })
                .then(function(docRef) {
                  console.log('Document written with ID: ', docRef.id);
                  newUrl = "https://oneq-7af56.firebaseapp.com/s/" + docRef.id
                  self.shareUrl = newUrl
                }).catch(function(error) {
                  console.error('Error adding document: ', error);
                })
            })
          })
          //Strage保存失敗
          .catch(err => console.console.log(err))
      })
    },
    twitterLogin() {
      var provider = new firebase.auth.TwitterAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var secret = result.credential.secret;
        var user = result.user;
        var photoUrl = user.photoURL
        var displayName = user.displayName
        var email = user.email
        var uid = user.uid
        // fireStore users に保存
        db.collection("users").doc(uid).set({
          name: displayName,
          profileUrl: photoUrl,
          email: email
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
       });
    },
    logout() {
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("logout success!! ");
      }).catch(function(error) {
        // An error happened.
        console.error();
      });
    },
    twitterShare() {
      location.href = "https://twitter.com/intent/tweet?text=" + this.msg + "&hashtags=" + "oneQ,ワンキュー," + this.question + "&url=" + this.shareUrl

    }
  }
}
</script>

<style>
/* .container {
  width: 800px;
  height: 800px;
  margin-top: 50px;
  margin-right: auto;
  margin-left: auto;
} */
</style>
