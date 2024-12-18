import { loadUsersByPage } from "../use-cases/load-users-by-page"


const state ={
    currentPage:0,
    users:[],
}

const loadNextPage = async () => {
    const users = await loadUsersByPage(state.currentPage + 1);
    if ( users.length === 0 ) return;
    state.currentPage += 1
    state.users = users
}

const loadPreviousPage = async()=>{
    throw new error('no implementado')

}


//TODO: implementar
const onUserChanged = ()=>{
    throw new error('no implementado')

}

const reloadPage = ()=>{
    throw new error('no implementado')
}

export default {
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,

    getUser: () =>[...state.users],
    getCurrentPage: ()=>state.currentPage,
}