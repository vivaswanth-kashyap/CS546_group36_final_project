
document.addEventListener('DOMContentLoaded', function() {
  const communityForm = document.getElementById('communityForm');

  if (communityForm) {
    communityForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;

      const titleError = document.getElementById('titleError');
      const descriptionError = document.getElementById('descriptionError');

      const isTitleValid = validateLength(title, 3, 15);
      const isDescriptionValid = validateLength(description, 10, 100);

      titleError.textContent = '';
      descriptionError.textContent = '';

      if (!isTitleValid) {
        titleError.textContent = 'Title should be between 3 and 15 characters.';
      }
      if (!isDescriptionValid) {
        descriptionError.textContent = 'Description should be between 10 and 100 characters.';
      }
      if(isTitleValid && isDescriptionValid){
        communityForm.submit();
      }
       
    });
  }

  const searchInput = document.getElementById('search');
  if (searchInput) {
    searchInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        const searchValue = searchInput.value.trim();
        if (searchValue !== '') {
          window.location.href = `/communities/search/${encodeURIComponent(searchValue)}`;
        } else {
          alert('Please enter a search query.');
        }
      }
    });
  }
});

function validateLength(value, minLength, maxLength) {
  const trimmedValue = value.trim();
  return trimmedValue.length >= minLength && trimmedValue.length <= maxLength;
}