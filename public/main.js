const deleteOne = document.querySelectorAll('.delete-button')
const updateBtns = document.querySelectorAll('.update-button')

Array.from(deleteOne).forEach((element) => {
    element.addEventListener('click', deleteExpense)
})
Array.from(updateBtns).forEach((element) => {
    element.addEventListener('click', updateTransaction)
})


async function deleteExpense() {
    const parentNode = this.parentNode

    const tempVar = parentNode.childNodes
    const descrip = parentNode.childNodes[3].innerText
    const amount = parentNode.childNodes[7].innerText
    const type = parentNode.childNodes[9].innerText
    
    //this is to view the text from each span
    // console.log(tempVar)
    // console.log(descrip)
    // console.log(amount)
    // console.log(type)
    try{
        const response = await fetch('deleteExpenses', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'description': descrip,
              'amount': amount,
              'type': type
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
    
}
async function updateTransaction(){
    
}