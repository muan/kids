const form = document.querySelector('form')
const fromInput = document.querySelector('[data-from-date]')
const events = document.querySelectorAll('[data-event]')

form.addEventListener('reset', filter)
form.addEventListener('change', filter)

function filter(dateTime) {
    if (!fromInput.value && !dateTime) return
    const fromDate = dateTime || new Date(fromInput.value)
    if (!fromDate) return

    for (const event of events) {
        const eventDate = new Date(event.getAttribute('data-datetime'))
        event.hidden = eventDate <= fromDate
    }
}

function showAll() {
    for (const event of events) {
        event.hidden = false
    }
}

const fromDateString = new URLSearchParams(location.search).get('from')
const date = new Date(fromDateString)
if (fromDateString && date) {
    fromInput.value = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
    filter(date)
}
