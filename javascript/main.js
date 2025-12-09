/* --- MAIN INITIALIZATION --- */

// 1. Force manual scroll restoration (prevents browser jumping to old spot on reload)
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

// 2. Force scroll to top instantly
window.scrollTo(0, 0);

document.addEventListener("DOMContentLoaded", () => {
    
    /* --- PART 1: SMOOTH SCROLL RESTORATION --- */
    setTimeout(() => {
        window.scrollTo(0, 0); 
        document.documentElement.style.scrollBehavior = 'smooth';
    }, 50);


    /* --- PART 2: OPTIMIZED SCROLL SPY (NAVIGATION HIGHLIGHT) --- */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const beanLinks = document.querySelectorAll('.bean-btn');

    // Use requestAnimationFrame for performance (prevents lag while scrolling)
    let isScrolling = false;

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                highlightNavigation();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    function highlightNavigation() {
        let current = '';
        const scrollY = window.scrollY;

        // Determine which section is active
        sections.forEach(sec => {
            const sectionTop = sec.offsetTop;
            const sectionHeight = sec.clientHeight;
            
            // Trigger when 30% of the section is visible
            // This is a balance between your previous -150px and height/3 logic
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = sec.getAttribute('id');
            }
        });

        // Force 'home' active if at the very top
        if (scrollY < 100) {
            current = 'home';
        }

        // Helper function to update classes
        const updateActive = (links) => {
            links.forEach(link => {
                link.classList.remove('active');
                // Check if href matches the current ID (e.g., href="#home" matches id="home")
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        };

        // Update both Navbars simultaneously
        updateActive(navLinks);
        updateActive(beanLinks);
    }


    /* --- PART 3: FILTER LOGIC (SKILLS SECTION) --- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const filterItems = document.querySelectorAll('.filter-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            filterItems.forEach(item => {
                // If filter is '*' OR item has the class (e.g., .lang), show it
                if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
                    item.classList.remove('hide');
                    item.classList.add('show');
                } else {
                    item.classList.add('hide');
                    item.classList.remove('show');
                }
            });
        });
    });

});


/* --- PART 4: PROJECT DISPLAY LOGIC --- */
// Defined globally so dynamic HTML can access it
function showProject(projectId) {
    // 1. Switch Active Project Card
    const cards = document.querySelectorAll('.project-card');
    let activeIndex = 0; 

    cards.forEach((card, index) => {
        card.classList.remove('active');
        if (card.id === projectId) {
            card.classList.add('active');
            activeIndex = index; 
        }
    });

    // 2. Highlight the List Item
    // Note: We skip index 0 in listItems because we added a header <h2> inside the container
    // So we need to be careful with indexing.
    
    const listItems = document.querySelectorAll('.project-item');
    
    listItems.forEach((item, index) => {
        item.classList.remove('active');
        if (index === activeIndex) {
            item.classList.add('active');
        }
    });
}

