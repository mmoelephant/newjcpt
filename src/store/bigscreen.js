export default {
    namespaced: true,
    state:{
        cate_on:{}
    },
    mutations:{
        SET_CATE_ON(state, data) {
            state.cate_on = data
            console.log(state.cate_on )
        }
    }
}