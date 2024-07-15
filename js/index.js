function searchUsers(username) {
    const searchUrl = `${BASE_URL}/search/users?q=${username}`;
  
    return fetch(searchUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => data.items) // Extract the items array from the response
      .catch(error => {
        console.error('Error searching users:', error);
        return []; // Return empty array in case of error
      });
  }
  
  // Function to fetch repositories of a GitHub user
  function getUserRepositories(username) {
    const reposUrl = `${BASE_URL}/users/${username}/repos`;
  
    return fetch(reposUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching repositories:', error);
        return []; // Return empty array in case of error
      });
  }
  
  // Function to display users in the DOM
  function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Clear previous results
  
    users.forEach(user => {
      const userDiv = document.createElement('div');
      userDiv.classList.add('user');
  
      const avatar = document.createElement('img');
      avatar.src = user.avatar_url;
      avatar.alt = `${user.login} avatar`;
      userDiv.appendChild(avatar);
  
      const usernameLink = document.createElement('a');
      usernameLink.href = user.html_url;
      usernameLink.textContent = user.login;
      usernameLink.target = '_blank'; // Open link in new tab
      userDiv.appendChild(usernameLink);
  
      userList.appendChild(userDiv);
  
      // Add click event listener to fetch and display repositories
      userDiv.addEventListener('click', () => {
        getUserRepositories(user.login)
          .then(repos => displayRepositories(repos));
      });
    });
  }
  
  // Function to display repositories in the DOM
  function displayRepositories(repos) {
    const reposList = document.getElementById('repos-list');
    reposList.innerHTML = ''; // Clear previous results
  
    repos.forEach(repo => {
      const repoDiv = document.createElement('div');
      repoDiv.classList.add('repo');
  
      const repoLink = document.createElement('a');
      repoLink.href = repo.html_url;
      repoLink.textContent = repo.name;
      repoLink.target = '_blank'; // Open link in new tab
      repoDiv.appendChild(repoLink);
  
      reposList.appendChild(repoDiv);
    });
  }
  
  // Event listener for form submission
  const searchForm = document.getElementById('search-form');
  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const searchTerm = document.getElementById('search-input').value.trim();
  
    if (searchTerm !== '') {
      try {
        const users = await searchUsers(searchTerm);
        displayUsers(users);
      } catch (error) {
        console.error('Error searching users:', error);
      }
    }
  