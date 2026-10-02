const bookingData = localStorage.getItem("bookingDetails");

const bookingDetailsElement =
    document.getElementById("bookingDetails");

const totalAmountElement =
    document.getElementById("totalAmount");

const paymentMethod =
    document.getElementById("paymentMethod");

const cardDetails =
    document.getElementById("cardDetails");

const upiDetails =
    document.getElementById("upiDetails");

const netBankingDetails =
    document.getElementById("netBankingDetails");

const paymentForm =
    document.getElementById("paymentForm");

const paymentError =
    document.getElementById("paymentError");

const backButton =
    document.getElementById("backButton");


let bookingDetails = null;


/* Load Booking Details */

if (bookingData) {

    bookingDetails =
        JSON.parse(bookingData);

} else {

    bookingDetailsElement.innerHTML = `
        <p>No booking details found.</p>
    `;

    paymentForm.style.display = "none";
}


/* Display Booking Details */

function displayBookingDetails() {

    if (!bookingDetails) {
        return;
    }

    bookingDetailsElement.innerHTML = `

        <div class="booking-info">

            <p>
                <strong>Event:</strong>
                ${bookingDetails.eventName}
            </p>

            <p>
                <strong>Date:</strong>
                ${bookingDetails.date}
            </p>

            <p>
                <strong>Location:</strong>
                ${bookingDetails.location}
            </p>

            <p>
                <strong>Ticket Price:</strong>
                ₹${bookingDetails.ticketPrice}
            </p>

            <p>
                <strong>Quantity:</strong>
                ${bookingDetails.quantity}
            </p>

            <p>
                <strong>Total Amount:</strong>
                ₹${bookingDetails.totalAmount}
            </p>

        </div>
    `;

    totalAmountElement.textContent =
        `₹${bookingDetails.totalAmount}`;
}


/* Hide Payment Details */

function hidePaymentDetails() {

    cardDetails.style.display = "none";

    upiDetails.style.display = "none";

    netBankingDetails.style.display = "none";
}


/* Change Payment Method */

paymentMethod.addEventListener(
    "change",
    function () {

        hidePaymentDetails();

        paymentError.textContent = "";

        if (paymentMethod.value === "card") {

            cardDetails.style.display = "block";

        }

        if (paymentMethod.value === "upi") {

            upiDetails.style.display = "block";

        }

        if (paymentMethod.value === "netbanking") {

            netBankingDetails.style.display = "block";

        }

    }
);


/* Submit Payment Form */

paymentForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        if (!bookingDetails) {

            paymentError.textContent =
                "Booking details are not available.";

            return;
        }


        if (!paymentMethod.value) {

            paymentError.textContent =
                "Please select a payment method.";

            return;
        }


        paymentError.textContent = "";

        /*
            Actual payment processing
            will be implemented in Story 6.
        */

        alert(
            "Payment details submitted successfully."
        );

    }
);


/* Back Button */

backButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "ticket-selection.html";

    }
);


/* Load Page */

displayBookingDetails();