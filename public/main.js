const deleteOne = document.querySelectorAll('.delete-button')
const updateBtns = document.querySelectorAll('.update-button')
//this variable will be used for making in line changes to our index.ejs on the amounts
const editableAmounts = document.querySelectorAll('.editable-amount')

Array.from(deleteOne).forEach((element) => {
    element.addEventListener('click', deleteExpense)
})
// Array.from(updateBtns).forEach((element) => {
//     element.addEventListener('click', updateTransaction)
// })
Array.from(editableAmounts).forEach((element) =>{
    element.addEventListener('click', convertToInput)
})
//eventlistener for fullcalendar 

document.addEventListener('DOMContentLoaded', function() {
  
  // NOTE: Ensure this ID matches the <div> ID in your index.ejs
  var calendarEl = document.getElementById('calendar'); 
  
  var calendar = new FullCalendar.Calendar(calendarEl, {
    // Basic settings from the documentation
    initialView: 'dayGridMonth',
    
    // Add a toolbar for navigation (Recommended)
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
    },
    
    // You will later add your dynamic events array here: events: [...]
  });
  
  calendar.render();
});

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
// async function updateTransaction(){
//     const li = this.parentNode;

//     const transactionId = li.dataset.id;

//     const oldAmount = li.querySelector('.amount').innerText;
//     //const oldType = li.querySelector('.type').innerText.toLowerCase().trim(); 

//     const newAmount = prompt('Enter new Amount:', oldAmount);

//     //const newType = (oldType === 'expense') ? 'income' : 'expense'; 
    
//     if(isNaN(newAmount) || newAmount.trim() === ''){
//         alert('Invalid amount entered. Update cancelled.');
//         return;
//     }
//     try {
//         const response = await fetch('/updateTransaction', { // Match this path to routes file transactionsInRoutes.js
//             method: 'put',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 transactionIdFromJSFile: transactionId,
//                 amount: newAmount
//                 //type: newType // Send the toggled type
//             })
//         });

//         const data = await response.json();
//         console.log(data);
//         location.reload(); // Reload to reflect changes

//     } catch (err) {
//         console.error("Error updating transaction:", err);
//     }
// }
// Attach a click listener to the amount span. When clicked, swap the <span> for an <input> field.
function convertToInput(e) {
    const originalSpan = e.target;
    const originalAmount = originalSpan.innerText;

    //creating the new input
    const input = document.createElement('input');
    input.type = 'number';
    input.value = originalAmount;
    input.classList.add('edit-input');

    //replace the span w/ the input 
    originalSpan.replaceWith(input)

    //listen for enter key or blur
    //blur just means losing focus or click somewhere else on the screen
    //focus() really means focusing on the input element 
    //the code below simply listens when we click somewhere else or click enter
    //in either case the handleUpdate function will run 
    input.focus();
    input.addEventListener('blur', handleUpdate);
    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter'){
            input.blur();
        }
    })
    //When the input loses focus (blur) or the user presses Enter, capture the new amount and send the PUT request.
}
async function handleUpdate(e) {
    const input = e.target;
    const newAmount = input.value;

    const li = input.closest('li');
    const transactionId = li.dataset.id; 

    //checking if value is a number
    if(newAmount == "" || isNaN(newAmount) || Number(newAmount) < 0){
        // If invalid, just restore the original text
        li.querySelector('.editable-amount').innerText = input.dataset.originalAmount;
        return;
    }
    try {
        //send PUT request to server
        const response = await fetch('/updateTransaction', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'transactionIdFromJSFile': transactionId,
                'amount': newAmount
            })
        });
        const data = await response.json();
        console.log(data);
        
        //after success 
        const newSpan = document.createElement('span');
        newSpan.classList.add('itemsMatrix', 'amount', 'editable-amount');
        newSpan.innerText = newAmount; 
        newSpan.addEventListener('click', convertToInput)// re adding the event listener 
        input.replaceWith(newSpan);

        //refresh
        window.location.reload();
    } catch (err) {
        console.error(err)
        
    }
    
}