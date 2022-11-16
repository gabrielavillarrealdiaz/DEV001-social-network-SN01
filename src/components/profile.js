export const viewForProfile = ()  => {
    
    const profileDiv = document.createElement('div');

    profileDiv.innerHTML = `<iframe src="https://giphy.com/embed/1Zbeweu52ZaQE" width="480" height="402" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/tumbleweed-1Zbeweu52ZaQE">via GIPHY</a></p>`
    
    return profileDiv
}

