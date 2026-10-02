const bookingData = localStorage.getItem("selectedEvent");

const eventDetails = document.getElementById("eventDetails");
const ticketQuantityElement = document.getElementById("ticketQuantity");
const totalAmountElement = document.getElementById("totalAmount");
const availabilityMessage = document.getElementById("availabilityMessage");
const selectionError = document.getElementById("selectionError");

const decreaseButton = document.getElementById("decreaseButton");
const increaseButton = document.getElementById("increaseButton");
const continueButton = document.getElementById("continueButton");
const backButton = document.getElementById("backButton");

let selectedEvent = null;
let ticketQuantity = 1;


/* Load selected event */

if (bookingData) {

    selectedEvent = JSON.parse(bookingData);

} else {

    selectionError.textContent =
        "No event has been selected.";

    continueButton.disabled = true;
}


/* Display event details */

function displayEventDetails() {

    if (!selectedEvent) {
        return;
    }

    eventDetails.innerHTML = `
        <h2>${selectedEvent.name}</h2>

        <p>
            <strong>Date:</strong>
            ${selectedEvent.date}
        </p>

        <p>
            <strong>Location:</strong>
            ${selectedEvent.location}
        </p>

        <p>
            <strong>Price per Ticket:</strong>
            ₹${selectedEvent.price}
        </p>
    `;

    availabilityMessage.textContent =
        `${selectedEvent.availableTickets} tickets available`;
}


/* Calculate total */

function updateTotal() {

    if (!selectedEvent) {
        return;
    }

    const total =
        selectedEvent.price * ticketQuantity;

    ticketQuantityElement.textContent =
        ticketQuantity;

    totalAmountElement.textContent =
        `₹${total}`;
}


/* Decrease quantity */

decreaseButton.addEventListener(
    "click",
    function () {

        if (ticketQuantity > 1) {

            ticketQuantity--;

            selectionError.textContent = "";

            updateTotal();
        }

    }
);


/* Increase quantity */

increaseButton.addEventListener(
    "click",
    function () {

        if (!selectedEvent) {
            return;
        }

        if (
            ticketQuantity <
            selectedEvent.availableTickets
        ) {

            ticketQuantity++;

            selectionError.textContent = "";

            updateTotal();

        } else {

            selectionError.textContent =
                "You cannot select more tickets than available.";

        }

    }
);


/* Continue to payment */

continueButton.addEventListener(
    "click",
    function () {

        if (!selectedEvent) {

            selectionError.textContent =
                "Please select an event before continuing.";

            return;
        }


        if (ticketQuantity < 1) {

            selectionError.textContent =
                "Please select at least one ticket.";

            return;
        }


        if (
            ticketQuantity >
            selectedEvent.availableTickets
        ) {

            selectionError.textContent =
                "Selected quantity is greater than available tickets.";

            return;
        }


        const bookingDetails = {

            eventId: selectedEvent.id,

            eventName: selectedEvent.name,

            date: selectedEvent.date,

            location: selectedEvent.location,

            ticketPrice: selectedEvent.price,

            quantity: ticketQuantity,

            totalAmount:
                selectedEvent.price * ticketQuantity

        };


        localStorage.setItem(
            "bookingDetails",
            JSON.stringify(bookingDetails)
        );


        window.location.href =
            "payment.html";

    }
);


/* Back to events */

backButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "events.html";

    }
);


/* Load page */

displayEventDetails();

updateTotal();