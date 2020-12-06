document.getElementById('loan-form').addEventListener('submit', function(e){
    //Remove the results if previously displayed and show Loader giff instead
    showResults(false);
    showLoader(true);

    //Set Delay on calculation routine to provide an impression of calculation
    setTimeout(calculateResults, 1500);
    e.preventDefault();
})

function showLoader(status){
    //Shows or hides the loader gif from the DOM
    if (status === true){
        console.log('showing loader')
        document.getElementById('loading').style.display = 'block';
    } else{
        document.getElementById('loading').style.display = 'none';
    }
}

function showResults(status){
    //Shows or hides the results from the DOM
    if (status === true){
        document.getElementById('results').style.display = 'block';
    } else{
        document.getElementById('results').style.display = 'none';
    }
}

function calculateResults(){
    //Retrieving all elements from DOM
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayments = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');
    
    //Working out the calculations
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) /100 /12;
    const calculatedPayments = parseFloat(years.value) * 12;
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest)/(x-1);

    //If calculations are finite numbers ie. no errors, set values inside of DOM elements
    if (isFinite(monthly)){
        monthlyPayments.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly* calculatedPayments) - principal).toFixed(2);
        
        //Hide the loader and now display the calculation
        showLoader(false);
        showResults(true);
    } else {
        //Hide the loader and display error
        showLoader(false);
        showError('Please check your numbers');
    }
}

function showError(error) {
    //If no error elements present on the site, display error
    if(document.querySelector('.alert') == null){
        //Retrieve DOM elements
        const card = document.querySelector('.card');
        const heading = document.querySelector('.heading');

        //Create a div
        const errorDiv = document.createElement('div');

        //Add bootrstrap alert classes to div
        errorDiv.className = 'alert alert-danger';
        
        //Add error text to the div
        errorDiv.appendChild(document.createTextNode(error));

        //Add in the error div to our Card before the first heading
        card.insertBefore(errorDiv, heading);

        //Add event listener to clear the error upon typing within loan-form
        document.querySelector('#loan-form').addEventListener('keyup', clearError);
    }
}

function clearError(e){
    //Remove error element from the DOM
    document.querySelector('.alert').remove();

    //Remove the listener on the keyup within the loan form as the error has now been cleared
    document.querySelector('#loan-form').removeEventListener('keyup', clearError);
    e.preventDefault();
}