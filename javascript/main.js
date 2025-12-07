/* --- PART 1: RESET TO TOP ON RELOAD --- */

// 1. Force manual scroll restoration
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

// 2. Force scroll to top instantly
window.scrollTo(0, 0);

// 3. When page loads, enable smooth scroll and set up the Bean Logic
document.addEventListener("DOMContentLoaded", () => {
    
    // A. Re-enable Smooth Scroll after a tiny delay
    setTimeout(() => {
        window.scrollTo(0, 0); // Double check we are at top
        document.documentElement.style.scrollBehavior = 'smooth';
    }, 50);

    /* --- PART 2: FLOATING BEAN HIGHLIGHTER --- */
    
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.bean-btn');

    // B. Listen for scroll events
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(sec => {
            const sectionTop = sec.offsetTop;
            const sectionHeight = sec.clientHeight;
            
            // 150px offset to trigger the highlight slightly before you hit the line
            if (scrollY >= (sectionTop - 150)) {
                current = sec.getAttribute('id');
            }
        });

        // If we are at the very top, force 'home' to be active
        if (scrollY === 0) {
                current = 'home';
        }

        // Update the classes
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});

/* 2. NAVIGATION HIGHLIGHT LOGIC */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link'); // Target top navbar
const beanLinks = document.querySelectorAll('.bean-btn'); // Target side bean

window.addEventListener('scroll', () => {
    let current = '';
    
    // Determine which section is currently active
    sections.forEach(sec => {
        const sectionTop = sec.offsetTop;
        const sectionHeight = sec.clientHeight;
        
        // Trigger when 1/3rd of the section is visible
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            current = sec.getAttribute('id');
        }
    });
    
    // Special case for top of page
    if (window.scrollY < 100) {
        current = 'home';
    }

    // Update Top Navbar Links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });

    // Update Side Bean Links
    beanLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

const filterBtns = document.querySelectorAll('.filter-btn');
const filterItems = document.querySelectorAll('.filter-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 1. Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // 2. Add active class to clicked button
        btn.classList.add('active');

        // 3. Get the category to filter
        const filterValue = btn.getAttribute('data-filter');

        // 4. Loop through items and show/hide
        filterItems.forEach(item => {
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
function showProject(projectId) {
        // 1. Remove active class from all content cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.classList.remove('active');
        });
        
        // 2. Add active class to the specific project ID
        document.getElementById(projectId).classList.add('active');

        // 3. Highlight the list item (Optional visual feedback)
        // This part finds which list item triggered it and highlights it
        // We can do this via CSS :hover mostly, but keeping 'active' state nice
        const listItems = document.querySelectorAll('.project-item');
        listItems.forEach(item => {
            // Remove active from all
            item.classList.remove('active');
            // Check if this item corresponds to the function call (simple logic match)
            if(item.getAttribute('onmouseover').includes(projectId)) {
                item.classList.add('active');
            }
        });
    }