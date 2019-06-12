export default {
    namespaced: true,
    state:{
        token:'',
        userInfo:{},
        map:{id:'53'}
    },
    mutations:{
        SET_TOKEN(state, data) {
            state.token = data
        },
        SET_USER_INFO(state, data) {
            state.userInfo = data
        },
        SET_MAP(state, data) {
            state.map = data
        }
    }
}