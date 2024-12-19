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
    if ( state.currentPage === 1 ) return;
    const users = await loadUsersByPage(state.currentPage - 1);
    state.users = users;
    state.currentPage -= 1;
}


//TODO: implementar
/**
 * 
 * @param {User} updatedUSer 
 */
const onUserChanged = (updatedUSer)=>{
    
    let wasFound = false;

    state.users = state.users.map(user=>{
        if( user.id === updatedUSer.id){
            wasFound = true;
            return updatedUSer;
        }
        return user;
    })

    if( state.users.length < 10 && !wasFound){
        state.users.push(updatedUSer)
    }

}

const reloadPage = async()=>{
    const users = await loadUsersByPage(state.currentPage);
    if ( users.length === 0 ) return;
    state.users = users
}

export default {
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,

    /**
     * 
     * @returns {USer[]}
     */
    getUsers: () =>[...state.users],

    /**
     * 
     * @returns {Number[]}
     */
    getCurrentPage: ()=>state.currentPage,
}