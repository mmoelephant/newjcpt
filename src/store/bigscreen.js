export default {
    namespaced: true,
    state:{
        cate_on:{},
        cate_list:[]
    },
    mutations:{
        SET_CATE_ON(state, data) {
            state.cate_on = data
            console.log(state.cate_on )
        },
        SET_CATE_LIST(state, data) {
            state.cate_list = data
        }
    }
}