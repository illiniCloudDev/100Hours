const deleteOne = document.querySelectorAll('.delete-button')

Array.from(deleteOne).forEach((element) => {
    element.addEventListener('click', deleteExpense)
})
async function deleteExpense() {
    const tempVar = this.parentNode.childNodes
    const descrip = this.parentNode.childNodes[3].innerText
    const expen = this.parentNode.childNodes[7].innerText
    
    //this is to view the text from each span
    console.log(tempVar)
    console.log(descrip)
    console.log(expen)
    try{
        const response = await fetch('deleteExpenses', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'description': descrip,
              'expense': expen
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
    
}