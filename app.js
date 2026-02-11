const username = 'omitCruz';

const urlProfile = `https://api.github.com/users/${username}`;
const urlRepos = `https://api.github.com/users/${username}/repos?sort=updated&per_page=6&type=owner&direction=desc`;
const urlFollowers = `https://api.github.com/users/${username}/followers`;

const profileContainer = document.getElementById('profile');
const projectsContainer = document.getElementById('projects-container');
const followersContainer = document.getElementById('followers-container');

async function getProfile() {
    try {
        const response = await fetch(urlProfile);
        const data = await response.json();

        profileContainer.innerHTML = `
            <img src="${data.avatar_url}" alt="${data.name}">
            <h1>${data.name || data.login}</h1>
            <p>${data.bio || 'Sin biografía'}</p>
            <p><strong>Ubicación:</strong> ${data.location || 'No especificada'}</p>
        `;
    } catch (error) {
        console.error('Error al cargar perfil:', error);
    }
}

async function getProjects() {
    try {
        const response = await fetch(urlRepos);
        const data = await response.json();

        data.forEach(repo => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || 'Sin descripción'}</p>
                <a href="${repo.html_url}" target="_blank">Ver Código</a>
            `;
            projectsContainer.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error al cargar proyectos:', error);
    }
}

async function getFollowers() {
    try {
        const response = await fetch(urlFollowers);
        const data = await response.json();

        const firstFive = data.slice(0, 5);

        firstFive.forEach(follower => {
            const img = document.createElement('img');
            img.src = follower.avatar_url;
            img.alt = follower.login;
            img.title = follower.login; 
            followersContainer.appendChild(img);
        });
    } catch (error) {
        console.error('Error al cargar seguidores:', error);
    }
}

getProfile();
getProjects();
getFollowers();