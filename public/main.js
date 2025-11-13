
const updateBtns = document.querySelectorAll('.update-button')
// Array.from(updateBtns).forEach((element) => {
//     element.addEventListener('click', updateTransaction)
// })


//eventlistener for fullcalendar 
document.addEventListener('DOMContentLoaded', function() {

    //delete 
    const deleteOne = document.querySelectorAll('.delete-button');
    //editable amounts by click -  in line changes 
    const editableAmounts = document.querySelectorAll('.editable-amount');

    //forEach on the arrays 
    Array.from(deleteOne).forEach((element) => {
    element.addEventListener('click', deleteExpense)
    });

    Array.from(editableAmounts).forEach((element) =>{
    element.addEventListener('click', convertToInput)
    });

    //FullCalendar with interaction (drag)
    var Calendar = FullCalendar.Calendar;
    var Draggable = FullCalendar.Draggable;

    let containerEl = document.getElementById('external-events');
    let calendarEl = document.getElementById('calendar');


    //initialize the external events
    new Draggable(containerEl, {
        itemSelector: 'tr',
        eventData: function(eventEl){
            return {
                title: eventEl.querySelector('.description').innerText,
                id: eventEl.dataset.id,
            };}
    });
  
    var calendar = new Calendar (calendarEl, {
        // Basic settings from the documentation
        initialView: 'dayGridMonth',
    
        // Add a toolbar for navigation (Recommended)
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
        },
        droppable: true //allows external dropping 
    });
    calendar.render();

});

async function deleteExpense(e) {

    //get button element
    const clickedButton = e.target;

    //getting the nearest parent and using tr since it is the parent element we are looking for 
    const parentRow= clickedButton.closest('tr');

    //we cann now get the parent's id
    const transactionId = parentRow.dataset.id;
    
    console.log(transactionId)
    try{
        const response = await fetch('/deleteTransaction', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'transactionIdFromJSFile': transactionId,
            })
          });
          //checking if deletion was successful 
          if(response.ok){
            console.log(`Transaction ID:${transactionId} succesfully deleted, King!`)
            //removing row from DOM
            parentRow.remove();
            //refresh
            window.location.reload();
          }else{
            //server side error
            const errorData = await response.json(); 
            console.error('Failed to delete transaction', errorData)
          }


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
    const originalTd = e.target;
    
    const originalAmount = originalTd.innerText;

    //creating the new input
    const input = document.createElement('input');
    input.type = 'number';
    input.value = originalAmount;
    input.classList.add('edit-input');

    //replace the span w/ the input 
    originalTd.replaceWith(input)    

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
    

    const tr = input.closest('tr');
    const transactionId = tr.dataset.id; 

    //checking if value is a number
    if(newAmount == "" || isNaN(newAmount) || Number(newAmount) < 0){
        // If invalid, just restore the original text
        tr.querySelector('.editable-amount').innerText = input.dataset.originalAmount;
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
        const newSpan = document.createElement('td');
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