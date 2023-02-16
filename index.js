const form = document.querySelector('form')
const fromInput = document.querySelector('[data-from-date]')
const events = document.querySelectorAll('[data-event]')

form.addEventListener('reset', showAll)
form.addEventListener('change', filter)

async function filter() {
    if (!fromInput.value) { showAll(); return }
    const fromDate = new Date(fromInput.value)
    if (!fromDate) { showAll(); return }

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
    filter()
}
