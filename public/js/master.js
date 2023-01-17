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
