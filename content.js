// Function to select and verify tour name
function verifyTourName() {
    let tourName = document.querySelector('#tour-name-selector').innerText; // Replace with actual selector
    chrome.runtime.sendMessage({ action: 'verifyTourName', tourName: tourName }, function(response) {
      if (response.success) {
        console.log('Tour name verified:', response.tourName);
      } else {
        alert('Failed to verify tour name.');
      }
    });
  }
  
  // Function to select and verify the number of passengers
  function verifyPax() {
    let paxNumber = document.querySelector('#pax-number-selector').innerText; // Replace with actual selector
    chrome.runtime.sendMessage({ action: 'verifyPax', paxNumber: paxNumber }, function(response) {
      if (response.success) {
        console.log('Number of passengers verified:', response.paxNumber);
      } else {
        alert('Failed to verify number of passengers.');
      }
    });
  }
  
  // Function to extract and send final ticket price
  function getFinalPrice() {
    let finalPrice = document.querySelector('#final-price-selector').innerText; // Replace with actual selector
    chrome.runtime.sendMessage({ action: 'getFinalPrice', finalPrice: finalPrice }, function(response) {
      if (response.success) {
        console.log('Final price verified:', response.finalPrice);
      } else {
        alert('Failed to get final price.');
      }
    });
  }
  
  // Adding event listeners to relevant elements for verification
  document.querySelector('#tour-name-selector').addEventListener('click', verifyTourName); // Replace with actual selector
  document.querySelector('#pax-number-selector').addEventListener('click', verifyPax); // Replace with actual selector
  document.querySelector('#final-price-selector').addEventListener('click', getFinalPrice); // Replace with actual selector
  