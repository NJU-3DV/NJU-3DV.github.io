// Teaser Examples Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const prevButton = document.getElementById('prevExample');
    const nextButton = document.getElementById('nextExample');
    const examples = document.querySelectorAll('.teaser-example');
    
    // Material editing functionality
    const materialButtons = document.querySelectorAll('.btn.btn-outline-secondary');
    
    let currentIndex = 0;
    
    // Event listeners
    prevButton.addEventListener('click', showPreviousExample);
    nextButton.addEventListener('click', showNextExample);
    
    // Functions
    function showPreviousExample() {
        currentIndex = (currentIndex - 1 + examples.length) % examples.length;
        updateExampleVisibility();
    }
    
    function showNextExample() {
        currentIndex = (currentIndex + 1) % examples.length;
        updateExampleVisibility();
    }

    function cleanExamples() {
        // Hide all examples
        examples.forEach(example => {
            example.classList.remove('active');
            const emptyVideo = example.querySelector('.empty-scene-video');
            emptyVideo.classList.remove('active');
            emptyVideo.pause();
            emptyVideo.currentTime = 0; // Reset to start

            const otherVideos = example.querySelectorAll('video:not(.empty-scene-video)');
            otherVideos.forEach(video => {
                video.classList.remove('active');
                video.pause();
                video.currentTime = 0; // Reset to start
            });
        });
    }

    function initMaterialControls() {
        materialButtons.forEach(button => {
            button.classList.remove('active');
        });
        // Set default button as active initially
        const defaultButton = document.querySelector('[data-material="default"]');
        defaultButton.classList.add('active');
        
        // Get default video ID and select the default video
        const defaultVideoId = defaultButton.getAttribute('data-video-id');
        const defaultVideo = document.getElementById(defaultVideoId);
        defaultVideo.classList.add('active');

        // Update title to default state
        const compositionTitle = document.querySelector('.active .composition-video').closest('.col-md-6').querySelector('.card-title');
        compositionTitle.innerHTML = 'Object-Scene Composition<br><span style="font-size: 0.9em; visibility: hidden;">Placeholder</span>';

        // Run all material videos
        const otherVideos = document.querySelectorAll('.composition-video');
        otherVideos.forEach(video => {
            video.play();
        });
    }
    
    function updateExampleVisibility() {
        cleanExamples();
        // Show current example
        examples[currentIndex].classList.add('active');
        const currentExample = examples[currentIndex];
        
        // Hide all loading spinners
        const spinners = currentExample.querySelectorAll('.loading-spinner');
        spinners.forEach(spinner => {
            spinner.style.display = 'none';
        });
        
        // First find and play the empty scene video
        const emptyVideo = currentExample.querySelector('.empty-scene-video');
        emptyVideo.classList.add('active');
        emptyVideo.play();
        
        // Then play other videos and sync them if needed
        const compVideo = currentExample.querySelector('.teaser-comp-video');
        if (compVideo) {
            compVideo.classList.add('active');
            compVideo.play();
        }        

        initMaterialControls();
    }

    // Function to get the currently active empty scene video
    const getActiveEmptySceneVideo = () => {
        // Get the active example
        const activeExample = document.querySelector('.teaser-example.active');
        return activeExample ? activeExample.querySelector('.empty-scene-video') : null;
    };
    
    // Initialize material buttons
    materialButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button state
            materialButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Get material and video ID
            const videoId = this.getAttribute('data-video-id');
            const material = this.getAttribute('data-material');
            const selectedVideo = document.getElementById(videoId);
            
            if (selectedVideo) {
                console.log("Switching material and resetting videos");
                
                // Get active example's composition videos
                const activeExample = document.querySelector('.teaser-example.active');
                const activeCompositionVideos = activeExample.querySelectorAll('.composition-video');
                const emptySceneVideo = getActiveEmptySceneVideo();

                // Update the composition title based on material
                const compositionTitle = selectedVideo.closest('.col-md-6').querySelector('.card-title');
                if (material === 'default') {
                    compositionTitle.innerHTML = 'Object-Scene Composition<br><span style="font-size: 0.9em; visibility: hidden;">Placeholder</span>';
                } else {
                    // Get the color from the button's icon
                    const materialIcon = this.querySelector('.fa-circle');
                    const iconColor = materialIcon ? window.getComputedStyle(materialIcon).color : 'var(--primary-color)';
                    
                    // Capitalize the material name and format it
                    const materialName = material.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ');
                    compositionTitle.innerHTML = `Object-Scene Composition<br><span style="color: ${iconColor}; font-size: 0.9em;">Material Editing: ${materialName}</span>`;
                }
                
                // Remove active class from all composition videos
                activeCompositionVideos.forEach(video => {
                    video.classList.remove('active');
                });
                
                // Show the selected video
                selectedVideo.currentTime = emptySceneVideo.currentTime;
                selectedVideo.classList.add('active');
            } else {
                console.error("Could not find selected video or empty scene video");
            }
            
        });
    });
    
    
    updateExampleVisibility();

});