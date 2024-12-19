import usersStore from '../../store/users-store';
import { showModal } from '../render-modal/render-modal';
import './render-table.css';
import {deleteUserById}from '../../use-cases/delete-user-by-id'


let table;
const createTable = () => {
    const table = document.createElement('table');
    const tableHeaders = document.createElement('thead');
    tableHeaders.innerHTML = `
        <tr>
            <th>#ID</th>
            <th>Balance</th>
            <th>FistName</th>
            <th>LastName</th>
            <th>Active</th>
            <th>Actions</th>
        </tr>
    `;

    const tableBody = document.createElement('tbody');
    table.append( tableHeaders, tableBody )
    return table;
}

const tableSelectListener = (event) => {
    const element = event.target.closest('.select-user');
    if (!element) return;

    const id = element.getAttribute('data-id');
    showModal(id);
}

const tableDeleteListener = async (event) => {
    const element = event.target.closest('.delete-user');
    if (!element) return;

    const id = element.getAttribute('data-id');
    try {
        await deleteUserById(id);
        await usersStore.reloadPage();
        document.querySelector('#current-page').innerText = usersStore.getCurrentPage();
        renderTable()
    }catch(error){
        console.log(error);
        alert('No se pudo eliminar')
    }
}

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderTable = ( element ) => {
    
    const users = usersStore.getUsers();

    if ( !table ) {
        table = createTable();
        element.append( table );
        
        table.addEventListener('click', event  => tableSelectListener(event))
        table.addEventListener('click', event  => tableDeleteListener(event))

    }

    let tableHTML = '';
    users.forEach( user =>{
        tableHTML += `
        <tr>
            <td>${ user.id}</th>
            <td>${ user.balance}</th>
            <td>${ user.firstName}</th>
            <td>${ user.lastName}</th>
            <td>${ user.isActive}</th>
            <td>
                <a href="#/" class="select-user" data-id="${user.id}">Select</a>
                |
                <a href="#/" class="delete-user" data-id="${user.id}">Delete</a>
            </th>
        </tr>
        
        `
    });
    
    table.querySelector('tbody').innerHTML = tableHTML;

}