
const devs_add_select = document.getElementById('add-select');
const devs_add_form = document.getElementById('devs_add_form');
const all_load_devs = document.getElementById('all_load_devs');


const addloaderskill = () =>{

    axios('http://localhost:7070/skill').then(data => {
            let skills = '';
        data.data.map(skill => {

            skills  +=`
            <option value="${skill.id}">${skill.skill}</option>
            `;
            devs_add_select.insertAdjacentHTML('beforeend',  skills);
        });

    });
    
}
addloaderskill();

// get load list
function getloadlist (){

    axios.get('http://localhost:7070/developer').then(res => {
        let delouar = '';
        res.data.map((dev, index) =>{
            delouar  +=`
                        <tr>
                                    <td>${index + 1}</td>
                                    <td>${dev.name}</td>
                                    <td>${dev.email}</td>
                                    <td><img style=" object-fit: cover;  height: 50px; width: 50px;" src="${dev.photo}" alt=""></td>
                                    <td>
                                    <a class="btn btn-info btn-sm" data-bs-toggle="modal"  href="#modal-view"><i class="fa fa fa-eye" aria-hidden="true"></i></a>
                                    <a class="btn btn-warning btn-sm"data-bs-toggle="modal" href="#modal-edit"><i class="fa fa fa-edit" aria-hidden="true"></i></a>
                                    <a class="btn btn-danger btn-sm" onclick= "deletedevs(${index})"  data-bs-toggle="modal"  href="#modal-delete"><i class="fa fa fa-trash" aria-hidden="true"></i></a>
                                    </td>
                            </tr>
                        
            `;

        });

        all_load_devs.innerHTML =   delouar;

    })
}




// input add all form

devs_add_form.addEventListener('submit', function (e) {
    e.preventDefault();

    let name = this.querySelector('#name');
    let email = this.querySelector('#email');
    let photo = this.querySelector('#photo');
    let skill = this.querySelector('#add-select');

    if(name.value =='' || email.value =='' || skill.value ==''){
        alert('All Feaild are Requerd');
    }else{
        
        axios.post('http://localhost:7070/developer',{

        id          :          "",
        name     :          name.value,
        email     :         email.value,
        photo     :         photo.value,
        skillid       :       skill.value


        }).then(res => {
        name.value ='',
        email.value='',
        photo.value='',
        skill.value=''
        getloadlist ();
        })
    }


})




