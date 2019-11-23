import { createClient } from '~/plugins/contentful.js'
import {
  CTF_BLOG_POST_TYPE_ID,
  CTF_PERSON_ID,
  POSTS_PER_PAGE
} from '@/config/constant'
const client = createClient()

export const state = () => ({
  counter: 0,
  person: {},
  posts: {},
  tagPosts: {},
  noMore: false,
  index: {
    post: {
      total: null,
      pageIndex: 2
    },
    tag: {
      total: null,
      pageIndex: 2
    }
  }
})

export const mutations = {
  // ページング
  increment(state) {
    state.index.post.pageIndex++
  },
  incrementTag(state) {
    state.index.tag.pageIndex++
  },
  setPerson(state, person) {
    state.person = person
  },
  setPosts(state, posts) {
    state.posts = posts
  },
  // 異なるタグ検索時のリセット用
  setTagPosts(state, posts) {
    state.tagPosts = posts
  },
  mergePostEntities(state, items) {
    state.posts = {
      ...state.posts,
      ...items.reduce((obj, item) => ({ ...obj, [item.sys.id]: item }), {})
    }
  },
  mergeTagPostEntities(state, items) {
    state.tagPosts = {
      ...state.tagPosts,
      ...items.reduce((obj, item) => ({ ...obj, [item.sys.id]: item }), {})
    }
  },
  setTotalPost(state, total) {
    state.index.post.total = total
    // console.log('state.index[type].total' + state.index.post.total)
  },
  setTotalPostTag(state, { total }) {
    state.index.tag.total = total
  },
  setNoMore(state, Boolean) {
    state.noMore = Boolean
  }
}

export const getters = {
  posts: (state) => state.posts,
  tagPosts: (state) => state.tagPosts,
  person: (state) => state.person,
  noMore: (state) => state.noMore,
  indexPage: (state) => state.index.post.pageIndex,
  indexTagPage: (state) => state.index.tag.pageIndex
}

export const actions = {
  fetchPosts({ state, commit }, { page, tag = null }) {
    // tagのありなしでparamを分ける
    const param = {
      content_type: CTF_BLOG_POST_TYPE_ID,
      order: '-sys.createdAt',
      skip: (page - 1) * POSTS_PER_PAGE,
      limit: POSTS_PER_PAGE
    }
    if (tag !== null) {
      param['fields.tags[in]'] = tag
    }
    client
      .getEntries(param)
      .then((posts) => {
        const total = posts.total
        const items = posts.items
        // tagのありなしで、データの格納先を決定
        if (tag === null) {
          commit('mergePostEntities', items)
        } else {
          commit('mergeTagPostEntities', items)
        }

        // 1ページ目の場合はtotalコンテンツ総数を設定
        if (page === 1 && tag === null) {
          // console.log('posts.total' + posts.total)
          commit('setPosts', posts.items)
          commit('setTotalPost', posts.total)
        } else if (page === 1) {
          commit('setTotalPostTag', { total })
          // tagありかつ1ページ目の場合はtagPostsを上書き
          commit('setTagPosts', posts.items)
          // console.log('posts.total' + posts.total)
        }

        // moreボタン表示用変数の設定
        // tagのありなしで格納先が異なるため、総数との比較も場合分け
        if (tag === null) {
          if (Object.keys(state.posts).length < state.index.post.total) {
            commit('setNoMore', true)
            // console.log(
            // 'Object.keys(state.posts.items).length' +
            // Object.keys(state.posts).length
            // )
          } else {
            commit('setNoMore', false)
          }
        } else if (Object.keys(state.tagPosts).length < state.index.tag.total) {
          commit('setNoMore', true)
        } else {
          commit('setNoMore', false)
        }
      })
      .catch(console.error)
  },
  fetchMore({ dispatch, state, commit }, { page, tag = null }) {
    dispatch('fetchPosts', { page, tag })
    if (tag === null) {
      commit('increment')
    } else {
      commit('incrementTag')
    }
  },
  searchPosts({ state, commit }, { query }) {
    client
      .getEntries({
        content_type: CTF_BLOG_POST_TYPE_ID,
        limit: 10,
        skip: 0,
        order: '-sys.createdAt',
        query
      })
      .then((posts) => {
        commit('setPosts', posts.items)
        commit('setNoMore', false)
        console.log(query)
        console.log(posts.items)
      })
      .catch(console.error)
  },
  fetchPerson({ commit }) {
    client
      .getEntries({
        'sys.id': CTF_PERSON_ID
      })
      .then((entries) => {
        commit('setPerson', entries.items[0])
      })
      .catch(console.error)
    const { person } = client.getEntries({ 'sys.id': CTF_PERSON_ID })
    commit('setPerson', person.items[0])
  },
  async nuxtServerInit({ commit }) {
    const person = await client.getEntries({ 'sys.id': CTF_PERSON_ID })
    await commit('setPerson', person)
  }
}
