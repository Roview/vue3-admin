import { Module } from 'vuex'
import { IDashboardState } from '../../interface/requestInterface'
import { IRootState } from '../types'
import {
  getAddressGoodsSale,
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale
} from '../../network/login'

//第二个泛型放根节点的泛型
const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCounts: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCounts = list
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryGoodsCount: any = await getCategoryGoodsCount()
      console.log(39, categoryGoodsCount)
      commit('changeCategoryGoodsCount', categoryGoodsCount.data)

      const categoryGoodsSale: any = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale', categoryGoodsSale.data)

      const categoryGoodsFavor: any = await getCategoryGoodsFavor
      commit('changeCategoryGoodsFavor', categoryGoodsFavor.data)

      const addResGoodsSale: any = await getAddressGoodsSale()
      commit('changeAddressGoodsSale', addResGoodsSale.data)
    }
  }
}
export default dashboardModule
