document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
  
    if (searchInput) {
      searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
          const searchValue = searchInput.value.trim();
          if (searchValue !== '') {
            window.location.href = `/communities/search/${encodeURIComponent(searchValue)}`;
          } else {
            // Handle case when search value is empty
            alert('Please enter a search query.');
          }
        }
      });
    }
  });