// Get the search bar, all medicine items, and the "no results" message
const searchBar = document.getElementById('search-bar');
const medicineItems = document.querySelectorAll('.medicine-item');
const noResultsMessage = document.getElementById('no-results-message');

// Add an event listener to the search bar
searchBar.addEventListener('keyup', function () {
    const query = searchBar.value.toLowerCase();
    let hasResults = false;

    // Loop through all medicine items to filter them
    medicineItems.forEach(function (item) {
        const medicineName = item.querySelector('p strong').textContent.toLowerCase();

        if (medicineName.includes(query)) {
            item.style.display = ''; // Show item if it matches the query
            hasResults = true;
        } else {
            item.style.display = 'none'; // Hide item if it doesn't match
        }
    });

    // Show or hide the "no results" message based on results
    if (hasResults) {
        noResultsMessage.style.display = 'none';
    } else {
        noResultsMessage.style.display = 'block';
    }
});
