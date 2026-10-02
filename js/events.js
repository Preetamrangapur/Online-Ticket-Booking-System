const events = [
    {
        id: 1,
        name: "Live Music Festival",
        category: "music",
        date: "15 October 2026",
        location: "Bengaluru",
        price: 499,
        availableTickets: 120
    },
    {
        id: 2,
        name: "Cricket Championship",
        category: "sports",
        date: "20 October 2026",
        location: "Bengaluru",
        price: 799,
        availableTickets: 45
    },
    {
        id: 3,
        name: "Technology Conference 2026",
        category: "conference",
        date: "25 October 2026",
        location: "Bengaluru",
        price: 999,
        availableTickets: 80
    },
    {
        id: 4,
        name: "Comedy Night",
        category: "entertainment",
        date: "30 October 2026",
        location: "Bengaluru",
        price: 399,
        availableTickets: 15
    },
    {
        id: 5,
        name: "Startup Summit",
        category: "conference",
        date: "5 November 2026",
        location: "Bengaluru",
        price: 699,
        availableTickets: 60
    },
    {
        id: 6,
        name: "Rock Concert",
        category: "music",
        date: "10 November 2026",
        location: "Bengaluru",
        price: 599,
        availableTickets: 8
    }
];

const eventList = document.getElementById("eventList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const availabilityFilter = document.getElementById("availabilityFilter");
const noEventsMessage = document.getElementById("noEventsMessage");

function getAvailabilityStatus(availableTickets) {
    if (availableTickets <= 20) {
        return {
            text: "Limited Availability",
            className: "limited"
        };
    }

    return {
        text: "Available",
        className: "available"
    };
}

function displayEvents(eventData) {
    eventList.innerHTML = "";

    if (eventData.length === 0) {
        noEventsMessage.style.display = "block";
        return;
    }

    noEventsMessage.style.display = "none";

    eventData.forEach(event => {
        const availability = getAvailabilityStatus(event.availableTickets);

        const card = document.createElement("div");
        card.className = "event-card";

        card.innerHTML = `
            <h2>${event.name}</h2>

            <p class="event-info">
                <strong>Date:</strong> ${event.date}
            </p>

            <p class="event-info">
                <strong>Location:</strong> ${event.location}
            </p>

            <p class="event-info">
                <strong>Tickets Left:</strong> ${event.availableTickets}
            </p>

            <p class="event-price">
                ₹${event.price}
            </p>

            <span class="availability ${availability.className}">
                ${availability.text}
            </span>

            <button
                class="select-ticket-button"
                onclick="selectEvent(${event.id})"
            >
                Select Tickets
            </button>
        `;

        eventList.appendChild(card);
    });
}

function filterEvents() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;
    const selectedAvailability = availabilityFilter.value;

    const filteredEvents = events.filter(event => {

        const matchesSearch =
            event.name.toLowerCase().includes(searchText) ||
            event.location.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            event.category === selectedCategory;

        const status =
            event.availableTickets <= 20
                ? "limited"
                : "available";

        const matchesAvailability =
            selectedAvailability === "all" ||
            selectedAvailability === status;

        return (
            matchesSearch &&
            matchesCategory &&
            matchesAvailability
        );
    });

    displayEvents(filteredEvents);
}

function selectEvent(eventId) {
    const selectedEvent = events.find(event => event.id === eventId);

    if (!selectedEvent) {
        return;
    }

    localStorage.setItem(
        "selectedEvent",
        JSON.stringify(selectedEvent)
    );

    window.location.href = "ticket-selection.html";
}

searchInput.addEventListener("input", filterEvents);
categoryFilter.addEventListener("change", filterEvents);
availabilityFilter.addEventListener("change", filterEvents);

displayEvents(events);