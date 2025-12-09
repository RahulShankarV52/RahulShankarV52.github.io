/* --- PROJECT DATA SOURCE --- */
const projectsData = [
    {
        id: "p1",
        order: 1,           // Priority 1: High impact, In-Progress
        showInResume: true,
        name: "Malware Analysis Tool",
        inProgress: true,
        title: "In Memory Payload Detector",
        badges: ["C++", "Python", "Memory Forensics"],
        overview: "Designed to counter sophisticated in-memory attacks, this tool interfaces directly with system RAM to identify and extract malicious payloads that never write themselves to the disk (fileless malware).",
        features: [
            "Direct memory access payload extraction.",
            "Automated resubmission of artifacts to behavioral analysis sandboxes.",
            "Drastically reduces manual triage time for security analysts."
        ],
        link: "#", 
        linkText: "View Source Code"
    },
    {
        id: "p7",
        order: 2,           // Priority 2: New C++ Systems project (High value)
        showInResume: true,
        name: "CppChain",
        inProgress: false,
        title: "CppChain: Persistent Blockchain Engine",
        badges: ["C++", "Systems Programming", "Cryptography"],
        overview: "A lightweight, persistent Proof-of-Work blockchain node built from scratch in C++. Designed to explore system-level concepts including manual memory management, binary file protocols, and cryptographic data integrity without external dependencies.",
        features: [
            "Custom implementation of SHA-256 and Proof-of-Work consensus.",
            "Manual binary serialization protocol to persist complex object graphs.",
            "Interactive CLI for transaction management, mining, and ledger auditing."
        ],
        link: "https://github.com/RahulShankarV52/blockchain_clone_in_cpp", 
        linkText: "View Code",
        linkIcon: "bxl-github"
    },
    {
        id: "p2",
        order: 3,
        showInResume: true,
        name: "Verification Pipeline",
        inProgress: false,
        title: "Docker Verification Pipeline",
        badges: ["Docker", "Bash Scripting", "Formal Verification"],
        overview: "A docker based automatic verification workflow that combines frama-c, tamarin and spin.",
        features: [
            "Single-command execution to ensure automatic verification.",
            "Files can be stored in a specific folder and automatically added.",
            "Sandboxed environment preventing system package conflicts."
        ],
        link: "https://github.com/RahulShankarV52/dfst-code-analyzer",
        linkText: "View Project"
    },
    {
        id: "p3",
        order: 4,
        showInResume: true,
        name: "Secure Kanban board",
        inProgress: false,
        title: "Fortified Kanban (SecOps)",
        badges: ["FastAPI", "YARA Engine", "AES-256"],
        overview: "A self-hosted project management tool built with a Zero-Trust mindset. Prioritizes forensic readiness and data confidentiality.",
        features: [
            "Zero-Knowledge Storage: Application-layer AES-256 encryption.",
            "Active Malware Defense: Integrated YARA engine scans uploads.",
            "Forensic Audit Trail: Immutable logging of all actions."
        ],
        link: "https://github.com/RahulShankarV52/fortified_local_kanban_projectmanager",
        linkText: "View Source"
    },
    {
        id: "p5",
        order: 5,
        showInResume: true,
        name: "Voxel Terrain Gen",
        inProgress: false,
        title: "Voxel Terrain Generator",
        badges: ["Python", "JIT Compilation", "NumPy"],
        overview: "A procedural generation engine that creates Minecraft-like voxel landscapes using Python with JIT compilation (Numba).",
        features: [
            "Perlin Noise algorithms for realistic terrain.",
            "Optimized chunk loading system.",
            "Real-time rendering capabilities."
        ],
        link: "https://github.com/RahulShankarV52/Pycraft-Minecraft-in-Python-",
        linkText: "View Source"
    },
    {
        id: "p4",
        order: 6,
        showInResume: false, // Hidden from Resume to save space
        name: "A5/1 Cipher implementation",
        inProgress: false,
        title: "A5/1 Stream Cipher Simulation",
        badges: ["Web", "Cryptography"],
        overview: "A one-to-one recreation of the A5/1 stream cipher used in old GSM systems, meant to educate viewers on the methodology.",
        features: [
            "Visual description of the system working.",
            "Initialization log window showing behind-the-scenes math.",
            "2-party communication mockup to test the code."
        ],
        link: "https://github.com/RahulShankarV52/A5-1_StreamCipherDemo",
        linkText: "View Project"
    },
    {
        id: "p6",
        order: 7,
        showInResume: false, // Hidden from Resume
        name: "Ray Caster Engine",
        inProgress: false,
        title: "Ray Casting Engine",
        badges: ["Python", "Mathematics", "Rendering"],
        overview: "Implementation of a retro-style ray casting engine similar to Wolfenstein 3D focusing on raw 3D projection mathematics.",
        features: [
            "Pure mathematical implementation of ray casting.",
            "Texture mapping and wall collision detection.",
            "Highly optimized loop structures."
        ],
        link: "https://rahulthemadlad.itch.io/bad-doom-clone",
        linkText: "View Game",
        linkIcon: "bxs-joystick"
    }
];

/* --- RENDER LOGIC --- */
if (typeof document !== 'undefined') {
    document.addEventListener("DOMContentLoaded", () => {
        const listContainer = document.getElementById("project-list-container");
        const displayContainer = document.getElementById("project-display-container");

        // Safety check: Only run if these elements exist (prevents errors on Resume page)
        if (listContainer && displayContainer) {
            
            // 1. SORT PROJECTS
            const sortedProjects = projectsData.sort((a, b) => a.order - b.order);

            // Clear existing content
            listContainer.innerHTML = '<h2 class="list-header">Select Project</h2>'; 
            displayContainer.innerHTML = '';

            sortedProjects.forEach((project, index) => {
                
                // 2. CREATE LIST ITEM (Sidebar/Top Menu)
                const listItem = document.createElement("div");
                listItem.className = `project-item ${index === 0 ? 'active' : ''}`;
                listItem.setAttribute('onclick', `showProject('${project.id}')`);
                listItem.setAttribute('onmouseover', `showProject('${project.id}')`);
                
                listItem.innerHTML = `
                    <span class="p-name">${project.name}${project.inProgress ? '*' : ''}</span>
                    <i class='bx bx-chevron-right'></i>
                `;
                listContainer.appendChild(listItem);


                // 3. CREATE PROJECT CARD (Content Area)
                const card = document.createElement("div");
                card.id = project.id;
                card.className = `project-card ${index === 0 ? 'active' : ''}`;

                // Generate Badges HTML
                const badgesHTML = project.badges.map(tech => 
                    `<span class="ptech-badge">${tech}</span>`
                ).join('');

                // Generate Features HTML
                const featuresHTML = project.features.map(feat => 
                    `<li>${feat}</li>`
                ).join('');

                // Determine Icon (Game vs Github)
                const iconClass = project.linkIcon ? project.linkIcon : 'bxl-github';

                card.innerHTML = `
                    <div class="card-header">
                        <h1>${project.title}</h1>
                        <div class="ptech-row">
                            ${badgesHTML}
                        </div>
                    </div>
                    <div class="card-body">
                        <h3>Overview</h3>
                        <p>${project.overview}</p>
                        <h3>Key Features</h3>
                        <ul class="feature-list">
                            ${featuresHTML}
                        </ul>
                        <div class="card-footer">
                            <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="btn-link">
                                ${project.linkText} <i class='bx ${iconClass}'></i>
                            </a>
                        </div>
                    </div>
                `;
                displayContainer.appendChild(card);
            });
        }
    });
}