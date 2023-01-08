
export function pop (e) {
    let amount = 25;
    for (let i = 0; i < amount; i++) {
        createParticle( e.clientX, e.clientY );
    }
}

function createParticle (x, y) {
    const particle = document.createElement('particle');
    document.body.appendChild(particle);
    let width = Math.floor(Math.random() * 30 + 8);
    let height = width;
    let destinationX = (Math.random() - 0.5) * 300;
    let destinationY = (Math.random() - 0.5) * 300;
    let rotation = Math.random() * 520;
    let delay = Math.random() * 200;
    particle.innerHTML = ['🎵','🎵','🎵','🎵','🎵','🎵','🎵'][Math.floor(Math.random() * 7)];
    particle.style.fontSize = `${Math.random() * 24 + 10}px`;
    width = height = 'auto';
    particle.style.width = `${width}px`;
    particle.style.height = `${height}px`;
    const animation = particle.animate([
        {
            transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(0deg)`,
            opacity: 1
        },
        {
            transform: `translate(-50%, -50%) translate(${x + destinationX}px, ${y + destinationY}px) rotate(${rotation}deg)`,
            opacity: 0
        }
    ], {
        duration: Math.random() * 1000 + 5000,
        easing: 'cubic-bezier(0, .9, .57, 1.8)',
        delay: delay
    });
    animation.onfinish = removeParticle;
}
function removeParticle (e) {
    e.srcElement.effect.target.remove();
}

