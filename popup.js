// Function to save the state to Chrome storage
function saveState(state) {
    chrome.storage.local.set(state, function() {
      console.log('State saved:', state);
    });
  }
  
  // Function to restore the state from Chrome storage
  function restoreState() {
    chrome.storage.local.get(['bookingId', 'bookingDetails', 'finalPrice', 'creditCardDetails'], function(state) {
      if (state.bookingId) {
        document.getElementById('booking-id').value = state.bookingId;
      }
      if (state.bookingDetails) {
        document.getElementById('booking-details').innerText = state.bookingDetails;
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
      }
      if (state.finalPrice) {
        document.getElementById('final-price').value = state.finalPrice;
        document.getElementById('step2').style.display = 'none';
        document.getElementById('step3').style.display = 'block';
      }
      if (state.creditCardDetails) {
        document.getElementById('credit-card-details').innerText = state.creditCardDetails;
        document.getElementById('step3').style.display = 'none';
        document.getElementById('step4').style.display = 'block';
      }
    });
  }
  
  // Restore state when the popup is opened
  document.addEventListener('DOMContentLoaded', restoreState);
  
  // Step 1: Fetch Booking Details
  document.getElementById('fetch-details').addEventListener('click', function() {
    const bookingId = document.getElementById('booking-id').value;
    if (bookingId) {
      // Simulate fetching booking details from BMS using the booking ID
      chrome.runtime.sendMessage({ action: 'fetchBookingDetails', bookingId: bookingId }, function(response) {
        if (response.success) {
          const bookingDetails = JSON.stringify(response.details, null, 2);
          document.getElementById('booking-details').innerText = bookingDetails;
          document.getElementById('step1').style.display = 'none';
          document.getElementById('step2').style.display = 'block';
  
          saveState({ bookingId: bookingId, bookingDetails: bookingDetails });
        } else {
          alert('Failed to fetch booking details.');
        }
      });
    } else {
      alert('Please enter a booking ID.');
    }
  });
  
  // Step 2: Verify Booking Details
  document.getElementById('verify-details').addEventListener('click', function() {
    // Simulate verification logic here
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'block';
  
    saveState({ step: 3 });
  });
  
  // Step 3: Generate Credit Card
  document.getElementById('generate-cc').addEventListener('click', function() {
    const finalPrice = document.getElementById('final-price').value;
    if (finalPrice) {
      // Simulate credit card generation based on final price
      chrome.runtime.sendMessage({ action: 'generateCreditCard', finalPrice: finalPrice }, function(response) {
        if (response.success) {
          const creditCardDetails = JSON.stringify(response.creditCard, null, 2);
          document.getElementById('credit-card-details').innerText = creditCardDetails;
          document.getElementById('step3').style.display = 'none';
          document.getElementById('step4').style.display = 'block';
  
          saveState({ finalPrice: finalPrice, creditCardDetails: creditCardDetails });
        } else {
          alert('Failed to generate credit card.');
        }
      });
    } else {
      alert('Please enter the final price.');
    }
  });
  
  // Step 4: Upload Ticket to BMS
  document.getElementById('upload-ticket').addEventListener('click', function() {
    const ticketFile = document.getElementById('ticket-file').files[0];
    if (ticketFile) {
      // Simulate ticket upload to BMS
      const reader = new FileReader();
      reader.onload = function() {
        const base64Data = reader.result;
        chrome.runtime.sendMessage({ action: 'uploadTicket', ticketFile: base64Data }, function(response) {
          if (response.success) {
            alert('Ticket uploaded successfully.');
            chrome.storage.local.clear(); // Clear state after successful upload
          } else {
            alert('Failed to upload ticket.');
          }
        });
      };
      reader.readAsDataURL(ticketFile);
    } else {
      alert('Please select a ticket file.');
    }
  });
  