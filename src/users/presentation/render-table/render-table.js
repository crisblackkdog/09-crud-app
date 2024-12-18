import usersStore from '../../store/users-store';
import './render-table.css';



let table;
const createTable= () => {
    const table = document.createElement('table');
    const tableHeader = document.createElement('thead');
    tableHeader.innerHTML = `
    <tr>
        <th>#ID</th>
        <th>Balance</th>
        <th>firstName</th>
        <th>lastName</th>
        <th>Active</th>
        <th>Actions</th>
    </tr>
    `;

    const tableBody = document.createElement('tBody')
    table.append(tableHeader, tableBody)
    return table
}
/**
 * 
 * @param {HTMLDivElement} element 
 */
export const RenderTable = (element) =>{
    const user = usersStore.getUser()
    if(!table){
        table = createTable
    }
}