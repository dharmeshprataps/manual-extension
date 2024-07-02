chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'fetchBookingDetails') {
      // Simulate fetching booking details from BMS
      const mockDetails = {
        tourName: 'Example Tour',
        paxNumber: 2,
        otherDetails: 'Additional details here'
      };
      sendResponse({ success: true, details: mockDetails });
    } else if (message.action === 'generateCreditCard') {
      // Simulate credit card generation
      const mockCreditCard = {
        cardNumber: '1234 5678 9012 3456',
        expiryDate: '12/25',
        cvv: '123'
      };
      sendResponse({ success: true, creditCard: mockCreditCard });
    } else if (message.action === 'uploadTicket') {
      // Simulate ticket upload
      sendResponse({ success: true });
    }
  });
  