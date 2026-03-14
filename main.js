document.addEventListener('DOMContentLoaded', () => {
    
    // --- Loader Removal ---
    const loader = document.getElementById('loader');
    const wrapper = document.querySelector('.wrapper');

    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        
        setTimeout(() => {
            wrapper.classList.add('loaded');
        }, 300); 

    }, 1500); // Wait 1.5 seconds to show the Shinwoo Global logo, then fade into the card.

    // Removed the 3D tilt interaction to keep the landscape card stable and professional for reading text.
    // Removed the language toggle logic as the content is now static English based on the new design.
});
