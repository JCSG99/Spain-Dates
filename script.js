// Sample bookings
const bookings = [
    { name: "John Doe", startDate: "2023-05-10", endDate: "2023-05-15" },
    { name: "Jane Smith", startDate: "2023-05-20", endDate: "2023-05-25" }
  ];
  
  // Get DOM elements
  const calendarContainer = document.getElementById("calendar");
  const bookingList = document.getElementById("dates");
  const addBookingBtn = document.getElementById("addBooking");
  
  // Render calendar
  function renderCalendar() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    
    const calendar = document.createElement("table");
    calendar.classList.add("calendar");
  
    const header = calendar.createTHead();
    const headerRow = header.insertRow();
    headerRow.innerHTML = "<th colspan='7'>" + currentYear + " - " + (currentMonth + 1) + "</th>";
  
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const daysRow = calendar.insertRow();
    for (let day of daysOfWeek) {
      const cell = document.createElement("th");
      cell.innerText = day;
      daysRow.appendChild(cell);
    }
  
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
    let date = 1;
  
    for (let i = 0; i < 6; i++) {
      const row = calendar.insertRow();
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfWeek) {
          row.insertCell();
        }
        else if (date > daysInMonth) {
            break;
          } else {
            const cell = row.insertCell();
            cell.innerText = date;
    
            // Check if the date is already booked
            const formattedDate = currentYear + "-" + (currentMonth + 1) + "-" + date;
            if (isDateBooked(formattedDate)) {
              cell.classList.add("booked");
            }
    
            date++;
          }
        }
      }
    
      calendarContainer.innerHTML = "";
      calendarContainer.appendChild(calendar);
    }
    
    // Check if a date is already booked
    function isDateBooked(date) {
      for (let booking of bookings) {
        if (date >= booking.startDate && date <= booking.endDate) {
          return true;
        }
      }
      return false;
    }
    
    // Add booking to the list
    function addBooking() {
      const nameInput = document.getElementById("name");
      const startDateInput = document.getElementById("startDate");
      const endDateInput = document.getElementById("endDate");
    
      const name = nameInput.value;
      const startDate = startDateInput.value;
      const endDate = endDateInput.value;
    
      if (name && startDate && endDate) {
        const booking = { name, startDate, endDate };
        bookings.push(booking);
    
        const listItem = document.createElement("li");
        listItem.innerText = name + ": " + startDate + " to " + endDate;
        bookingList.appendChild(listItem);
    
        // Clear form inputs
        nameInput.value = "";
        startDateInput.value = "";
        endDateInput.value = "";
    
        // Clear calendar and render again
        calendarContainer.innerHTML = "";
        renderCalendar();
      } else {
        alert("Please fill in all the fields.");
      }
    }
    
    // Event listener for the addBooking button
    addBookingBtn.addEventListener("click", addBooking);
    
    // Render the initial calendar
    renderCalendar();
    