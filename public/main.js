const deleteOne = document.querySelectorAll('.delete-button')
const updateBtns = document.querySelectorAll('.update-button')

Array.from(deleteOne).forEach((element) => {
    element.addEventListener('click', deleteExpense)
})
Array.from(updateBtns).forEach((element) => {
    element.addEventListener('click', updateTransaction)
})


async function deleteExpense() {

    //you only need the ID - no need for the properties 
    const transactionId = this.parentNode.dataset.id
    
    try{
        const response = await fetch('/deleteTransaction', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'transactionIdFromJSFile': transactionId,
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
    
}

//pseudo code 
//form has to send information to db 
//the type has to be called something else to prevent confusion with the current class in the css
async function updateTransaction(){
    const li = this.parentNode;

    const transactionId = li.dataset.id;

    const oldAmount = li.querySelector('.amount').innerText;
    //const oldType = li.querySelector('.type').innerText.toLowerCase().trim(); 

    const newAmount = prompt('Enter new Amount:', oldAmount);

    //const newType = (oldType === 'expense') ? 'income' : 'expense'; 
    
    if(isNaN(newAmount) || newAmount.trim() === ''){
        alert('Invalid amount entered. Update cancelled.');
        return;
    }
    try {
        const response = await fetch('/updateTransaction', { // Match this path to routes file transactionsInRoutes.js
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                transactionIdFromJSFile: transactionId,
                amount: newAmount
                //type: newType // Send the toggled type
            })
        });

        const data = await response.json();
        console.log(data);
        location.reload(); // Reload to reflect changes

    } catch (err) {
        console.error("Error updating transaction:", err);
    }
}    
