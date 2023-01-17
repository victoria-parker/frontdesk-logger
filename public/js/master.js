const removeForms=document.querySelectorAll('.removeForm')

Array.from(removeForms).forEach(element=>element.addEventListener("submit",function(event){
    event.preventDefault()

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d9534f',
        cancelButtonColor: '#5bc0de',
        confirmButtonText: 'Yes, delete it!'
      }).then((confirm)=>{
        if(confirm.value){
            event.target.submit()
        }
      })
}))


// .forEach(element=>{
//     element.addEventListener("submit", function confirmRemove(event){
//         element.style.backgroundColor="red";
//         event.preventDefault()

//         Swal({
//             title:"Are you sure you want to archive this?",
//             text:"This action can't be undone.",
//             icon:"warning",
//             buttons: true,
//             dangerMode:true,
//         })
//         .then((isOkay)=>{
//             if(isOkay){
//                 element.submit()
//             }
//         })
        
//     })
// })





// function confirmRemove(id){
    
//     Swal({
//         title:"Are you sure you want to archive this?",
//         text:"This action can't be undone."+id,
//         icon:"warning",
//         buttons: true,
//         dangerMode:true,
//     })
//     .then((isOkay)=>{
//         if(isOkay){
//             console.log('ok')
//         }
//     })
// }