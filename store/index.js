import firebase from '~/plugins/firebase'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import cloneDeep from 'lodash.clonedeep'
// const firestore = firebase.firestore()

// if (process.browser) {
//   const settings = {}
//   firestore.settings(settings)
// }

const provider = new firebase.auth.TwitterAuthProvider();

export const state = () => ({
  authUser: null,
  user: null,
  post: null,
  question: null,
  questions: [],
  isLoaded: false
})

export const getters = {
  authUser: state => state.authUser,
  user: state => state.user,
  questions: state => state.questions,
  question: state => state.question,
  isLoaded: state => state.isLoaded
}

export const mutations = {
  setCredential(state, {authUser}) {
    state.authUser = authUser
  },
  saveUser(state, {user}) {
    state.user = user
  },
  saveQuestion(state, {question}) {
    state.question = question
  },
  setIsLoaded(state, next) {
    state.isLoaded = !!next
  },
  ...vuexfireMutations
}

export const actions = {
  async setCredential({ commit }, { authUser }) {
    console.log("actions setCredential")
    if (!authUser) return
    console.log("actions continue setCredential")
    authUser = cloneDeep(authUser)
    const db = firebase.firestore()
    const usersCollection = db.collection('users')
    await usersCollection
      .doc(authUser.uid)
      .set({
        name: authUser.displayName,
        email: authUser.email,
        icon: authUser.photoURL
      })
    commit('setCredential', { authUser: authUser })
  },
  async initUser({ commit }, { uid }) {
    const db = firebase.firestore()
    const snapshot = await db
    .collection('users')
    .doc(uid)
    .get()
    .then(snapshot => {
      commit('saveUser', { user: snapshot.data() })
    })
  },
  async initQuestion({ commit }, { dayKey }) {
    const db = firebase.firestore()
    const snapshot = await db
    .collection('questions')
    .doc(dayKey)
    .get()
    .then(snapshot => {
      commit('saveQuestion', { question: snapshot.data() })
    })
  },
  initQuestions: firestoreAction(({ bindFirestoreRef }) => {
    console.log("actions initQuestions")
    // const toDayKey = 'v1_' + '20190610'
    const db = firebase.firestore()
    const questionCollection = db.collection('questions')
    bindFirestoreRef('questions', questionCollection)
  }),
  initUsers: firestoreAction(({ bindFirestoreRef }) => {
    console.log("actions initUsers")
    const db = firebase.firestore()
    const usersCollection = db.collection('users')
    bindFirestoreRef('users', usersCollection)
  }),
  addPost: firestoreAction((ctx, {
    id,
    email,
    body,
    createdAt
  }) => {
    firestore
      .collection('posts')
      .doc(`${id}`)
      .set({
        id,
        from: email,
        body,
        createdAt
      })
  }),
  callAuth() {
    firebase.auth().signInWithPopup(provider)
  },
  loadComplete({
    commit
  }) {
    console.log("actions loadComplete")
    commit('setIsLoaded', true)
  }
}
