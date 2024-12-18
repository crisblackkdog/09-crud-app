import modalHtml from "./render-modal.html?raw";
import './render-modal.css'
let modal, form;

//todo
export const showModal= () => {
    modal?.classList.remove('hide-modal');
}

export const hideModal= () => {
    //reset del formulario
    modal?.classList.add('hide-modal');
    form?.reset();
}



/**
 * 
 * @param {HTMLDivElement} element 
 * @param {(userlike)=>Promise<void>} callback
 */
export const renderModal = (element, Callback) => {

    if(modal) return
    modal = document.createElement('div')
    modal.innerHTML = modalHtml;
    modal.className = 'modal-container hide-modal';

    form = modal.querySelector('form')



    modal.addEventListener('click',(event) =>{
        if(event.target.className === 'modal-container') {
            hideModal()
        };
    })

    form.addEventListener('submit', async(event) => {
        event.preventDefault();
        
        const formData = new FormData(form);
        const userLike = {}

        for (const [key, value] of formData) {
            if ( key === 'balance'){
                userLike[key] = +value
                continue;
            }
            if ( key === 'isActive'){
                userLike[key] = (value ==='on') ? true:false
                continue;
            }
            userLike[key] = value;
        }

        await Callback(userLike)

        hideModal()
    });

    element.append(modal);
}