// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){

    //Hide results even after the submit button is clicked
    document.getElementById('results').style.display = 'none';

    //Show Loader as soon as the submit button is clicked
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);
    e.preventDefault();
});

function calculateResults(e)
{
    //console.log('yes');
    //UI variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');

    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //Compute monthly payments
    const x = Math.pow(1+calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest)/(x-1);

    if(isFinite(monthly))
    {
        monthlyPayment.value = monthly.toFixed(2); // To 2 decimal places
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        //Hide the loading gif after 2 secs.
        document.getElementById('loading').style.display = 'none';

        //Show results after 2 secs
        document.getElementById('results').style.display = 'block';
    }
    else
    {
        showError('Please check your numbers');        
        //console.log('Please check');
    }

    
    
}

function showError(error)
{
    //Hide the loading gif after 2 secs.
    document.getElementById('loading').style.display = 'none';

    //Hide results after 2 secs
    document.getElementById('results').style.display = 'none';

    //Create a div
    const errorDiv = document.createElement('div');

    //Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //Add class
    errorDiv.className = 'alert alert-danger' // Bootstrap thing

    //Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error before heading
    card.insertBefore(errorDiv, heading); // Insert errorDiv in the card, before the heading


    //Clear error after 3 seconds
    setTimeout(clearError, 3000); //Two params : a function, time in milliseconds
}

//Clear error
function clearError()
{
    document.querySelector('.alert').remove();
}