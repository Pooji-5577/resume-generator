// Resume Builder JavaScript with Enhanced Styling Options
class ResumeBuilder {
    constructor() {
        this.skills = [];
        this.interests = [];
        this.selectedTemplate = 'modern';
        this.selectedFont = 'Inter';
        this.selectedFontSize = 'medium';
        this.selectedColorScheme = 'default';
        this.customColors = {
            primary: '#4f46e5',
            secondary: '#7c3aed',
            text: '#1e293b'
        };
        
        this.initializeEventListeners();
        this.setupDynamicForms();
        this.initializeStyleControls();
    }

    initializeEventListeners() {
        // Skills input
        const skillInput = document.getElementById('skillInput');
        if (skillInput) {
            skillInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.addSkill();
                }
            });
        }

        // Interests input
        const interestInput = document.getElementById('interestInput');
        if (interestInput) {
            interestInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.addInterest();
                }
            });
        }

        // Template selection
        const templateOptions = document.querySelectorAll('.template-option');
        templateOptions.forEach(option => {
            option.addEventListener('click', () => {
                this.selectTemplate(option.dataset.template);
            });
        });

        // Auto-generate preview on input changes
        const formInputs = document.querySelectorAll('#resumeForm input, #resumeForm textarea, #resumeForm select');
        formInputs.forEach(input => {
            input.addEventListener('input', () => {
                this.debouncePreview();
            });
        });
    }

    setupDynamicForms() {
        // Add remove buttons to existing items
        this.addRemoveButtons();
    }

    addSkill() {
        const skillInput = document.getElementById('skillInput');
        const skill = skillInput.value.trim();
        
        if (skill && !this.skills.includes(skill)) {
            this.skills.push(skill);
            this.renderSkills();
            skillInput.value = '';
            this.generatePreview();
        }
    }

    removeSkill(skill) {
        this.skills = this.skills.filter(s => s !== skill);
        this.renderSkills();
        this.generatePreview();
    }

    renderSkills() {
        const skillsList = document.getElementById('skillsList');
        skillsList.innerHTML = this.skills.map(skill => 
            `<div class="skill-tag">
                ${skill}
                <span class="remove" onclick="resumeBuilder.removeSkill('${skill}')">&times;</span>
            </div>`
        ).join('');
    }

    addInterest() {
        const interestInput = document.getElementById('interestInput');
        const interest = interestInput.value.trim();
        
        if (interest && !this.interests.includes(interest)) {
            this.interests.push(interest);
            this.renderInterests();
            interestInput.value = '';
            this.generatePreview();
        }
    }

    removeInterest(interest) {
        this.interests = this.interests.filter(i => i !== interest);
        this.renderInterests();
        this.generatePreview();
    }

    renderInterests() {
        const interestsList = document.getElementById('interestsList');
        interestsList.innerHTML = this.interests.map(interest => 
            `<div class="interest-tag">
                ${interest}
                <span class="remove" onclick="resumeBuilder.removeInterest('${interest}')">&times;</span>
            </div>`
        ).join('');
    }

    selectTemplate(template) {
        this.selectedTemplate = template;
        
        // Update UI
        document.querySelectorAll('.template-option').forEach(option => {
            option.classList.remove('active');
        });
        document.querySelector(`[data-template="${template}"]`).classList.add('active');
        
        this.generatePreview();
    }

    addRemoveButtons() {
        const containers = ['experienceContainer', 'educationContainer', 'projectsContainer', 'awardsContainer', 'languagesContainer'];
        
        containers.forEach(containerId => {
            const container = document.getElementById(containerId);
            if (container) {
                const items = container.querySelectorAll('.experience-item, .education-item, .project-item, .award-item, .language-item');
                items.forEach((item, index) => {
                    if (index > 0 && !item.querySelector('.remove-item')) {
                        const removeBtn = document.createElement('button');
                        removeBtn.className = 'remove-item';
                        removeBtn.innerHTML = '&times;';
                        removeBtn.onclick = () => item.remove();
                        item.appendChild(removeBtn);
                    }
                });
            }
        });
    }

    collectFormData() {
        return {
            // Personal Information
            fullName: document.getElementById('fullName')?.value || '',
            email: document.getElementById('email')?.value || '',
            phone: document.getElementById('phone')?.value || '',
            location: document.getElementById('location')?.value || '',
            linkedin: document.getElementById('linkedin')?.value || '',
            portfolio: document.getElementById('portfolio')?.value || '',
            
            // Professional Summary
            summary: document.getElementById('summary')?.value || '',
            
            // Skills and Interests
            skills: this.skills,
            interests: this.interests,
            
            // Work Experience
            experience: this.collectExperience(),
            
            // Education
            education: this.collectEducation(),
            
            // Projects
            projects: this.collectProjects(),
            
            // Awards
            awards: this.collectAwards(),
            
            // Languages
            languages: this.collectLanguages(),
            
            // Template and styling
            template: this.selectedTemplate,
            font: this.selectedFont,
            fontSize: this.selectedFontSize,
            colorScheme: this.selectedColorScheme,
            customColors: this.customColors
        };
    }

    collectExperience() {
        const experiences = [];
        const experienceItems = document.querySelectorAll('#experienceContainer .experience-item');
        
        experienceItems.forEach(item => {
            const jobTitle = item.querySelector('.jobTitle')?.value || '';
            const company = item.querySelector('.company')?.value || '';
            const duration = item.querySelector('.duration')?.value || '';
            const location = item.querySelector('.jobLocation')?.value || '';
            const description = item.querySelector('.jobDescription')?.value || '';
            
            if (jobTitle || company) {
                experiences.push({ jobTitle, company, duration, location, description });
            }
        });
        
        return experiences;
    }

    collectEducation() {
        const education = [];
        const educationItems = document.querySelectorAll('#educationContainer .education-item');
        
        educationItems.forEach(item => {
            const degree = item.querySelector('.degree')?.value || '';
            const institution = item.querySelector('.institution')?.value || '';
            const duration = item.querySelector('.eduDuration')?.value || '';
            const gpa = item.querySelector('.gpa')?.value || '';
            
            if (degree || institution) {
                education.push({ degree, institution, duration, gpa });
            }
        });
        
        return education;
    }

    collectProjects() {
        const projects = [];
        const projectItems = document.querySelectorAll('#projectsContainer .project-item');
        
        projectItems.forEach(item => {
            const name = item.querySelector('.projectName')?.value || '';
            const tech = item.querySelector('.projectTech')?.value || '';
            const description = item.querySelector('.projectDescription')?.value || '';
            
            if (name) {
                projects.push({ name, tech, description });
            }
        });
        
        return projects;
    }

    collectAwards() {
        const awards = [];
        const awardItems = document.querySelectorAll('#awardsContainer .award-item');
        
        awardItems.forEach(item => {
            const name = item.querySelector('.awardName')?.value || '';
            const organization = item.querySelector('.awardOrganization')?.value || '';
            const year = item.querySelector('.awardYear')?.value || '';
            
            if (name) {
                awards.push({ name, organization, year });
            }
        });
        
        return awards;
    }

    collectLanguages() {
        const languages = [];
        const languageItems = document.querySelectorAll('#languagesContainer .language-item');
        
        languageItems.forEach(item => {
            const name = item.querySelector('.languageName')?.value || '';
            const level = item.querySelector('.languageLevel')?.value || '';
            
            if (name) {
                languages.push({ name, level });
            }
        });
        
        return languages;
    }

    generatePreview() {
        const data = this.collectFormData();
        const preview = document.getElementById('resumePreview');
        
        if (!data.fullName && !data.email) {
            preview.innerHTML = `
                <div class="preview-placeholder">
                    <i class="fas fa-file-alt"></i>
                    <p>Fill out the form to see your resume preview</p>
                </div>
            `;
            return;
        }
        
        preview.innerHTML = this.generateTemplate(data);
    }

    generateTemplate(data) {
        switch (data.template) {
            case 'classic':
                return this.generateClassicTemplate(data);
            case 'creative':
                return this.generateCreativeTemplate(data);
            case 'executive':
                return this.generateExecutiveTemplate(data);
            case 'minimal':
                return this.generateMinimalTemplate(data);
            case 'tech':
                return this.generateTechTemplate(data);
            default:
                return this.generateModernTemplate(data);
        }
    }

    applyStyles(template, data) {
        const fontClass = `font-${this.selectedFont.toLowerCase().replace(/\s+/g, '')}`;
        const sizeClass = `size-${this.selectedFontSize}`;
        const templateClass = data.template;
        
        let customStyles = '';
        if (this.selectedColorScheme === 'custom' || this.selectedColorScheme !== 'default') {
            customStyles = `
                <style>
                    .resume-template .resume-section-title { color: ${this.customColors.primary} !important; }
                    .resume-template .resume-name { color: ${this.customColors.text} !important; }
                    .resume-template .resume-item-title { color: ${this.customColors.primary} !important; }
                    .resume-template .resume-skill { 
                        background: ${this.customColors.primary}20 !important; 
                        color: ${this.customColors.primary} !important; 
                        border-color: ${this.customColors.primary}40 !important;
                    }
                    .resume-template.creative .resume-section-title { 
                        color: ${this.customColors.primary} !important; 
                        border-bottom-color: ${this.customColors.primary} !important;
                    }
                    .resume-template.creative .resume-skill {
                        background: linear-gradient(135deg, ${this.customColors.primary}, ${this.customColors.secondary}) !important;
                        color: white !important;
                    }
                    .resume-template .resume-contact span { color: ${this.customColors.secondary} !important; }
                </style>
            `;
        }
        
        return `${customStyles}<div class="resume-template ${templateClass} ${fontClass} ${sizeClass}">${template}</div>`;
    }

    generateModernTemplate(data) {
        const content = `
            <div class="resume-header">
                <h1 class="resume-name">${data.fullName}</h1>
                <div class="resume-contact">
                    ${data.email ? `<span><i class="fas fa-envelope"></i> ${data.email}</span>` : ''}
                    ${data.phone ? `<span><i class="fas fa-phone"></i> ${data.phone}</span>` : ''}
                    ${data.location ? `<span><i class="fas fa-map-marker-alt"></i> ${data.location}</span>` : ''}
                    ${data.linkedin ? `<span><i class="fab fa-linkedin"></i> LinkedIn</span>` : ''}
                    ${data.portfolio ? `<span><i class="fas fa-globe"></i> Portfolio</span>` : ''}
                </div>
            </div>

            ${this.renderSections(data)}
        `;
        
        return this.applyStyles(content, data);
    }

    generateClassicTemplate(data) {
        const content = `
            <div class="resume-template classic">
                <div class="resume-header">
                    <h1 class="resume-name">${data.fullName}</h1>
                    <div class="resume-contact">
                        ${data.email ? `<div>${data.email}</div>` : ''}
                        ${data.phone ? `<div>${data.phone}</div>` : ''}
                        ${data.location ? `<div>${data.location}</div>` : ''}
                        ${data.linkedin ? `<div>LinkedIn Profile Available</div>` : ''}
                    </div>
                </div>

                ${this.renderSections(data)}
            </div>
        `;
        
        return this.applyStyles(content, data);
    }

    generateCreativeTemplate(data) {
        const content = `
            <div class="resume-template creative">
                <div class="resume-header">
                    <h1 class="resume-name" style="color: #4f46e5;">${data.fullName}</h1>
                    <div class="resume-contact">
                        ${data.email ? `<span style="color: #7c3aed;"><i class="fas fa-envelope"></i> ${data.email}</span>` : ''}
                        ${data.phone ? `<span style="color: #7c3aed;"><i class="fas fa-phone"></i> ${data.phone}</span>` : ''}
                        ${data.location ? `<span style="color: #7c3aed;"><i class="fas fa-map-marker-alt"></i> ${data.location}</span>` : ''}
                        ${data.linkedin ? `<span style="color: #7c3aed;"><i class="fab fa-linkedin"></i> LinkedIn</span>` : ''}
                    </div>
                </div>

                ${this.renderSections(data)}
            </div>
        `;
        
        return this.applyStyles(content, data);
    }

    generateExecutiveTemplate(data) {
        const content = `
            <div class="resume-header">
                <h1 class="resume-name">${data.fullName}</h1>
                <div class="resume-contact">
                    ${data.email ? `<span>${data.email}</span>` : ''}
                    ${data.phone ? `<span>${data.phone}</span>` : ''}
                    ${data.location ? `<span>${data.location}</span>` : ''}
                    ${data.linkedin ? `<span>LinkedIn Profile</span>` : ''}
                </div>
            </div>

            ${this.renderSections(data)}
        `;
        
        return this.applyStyles(content, data);
    }

    generateMinimalTemplate(data) {
        const content = `
            <div class="resume-header">
                <h1 class="resume-name">${data.fullName}</h1>
                <div class="resume-contact">
                    ${data.email ? `<div>${data.email}</div>` : ''}
                    ${data.phone ? `<div>${data.phone}</div>` : ''}
                    ${data.location ? `<div>${data.location}</div>` : ''}
                </div>
            </div>

            ${this.renderSections(data)}
        `;
        
        return this.applyStyles(content, data);
    }

    generateTechTemplate(data) {
        const content = `
            <div class="resume-header">
                <h1 class="resume-name">&lt;${data.fullName}/&gt;</h1>
                <div class="resume-contact">
                    ${data.email ? `<span><i class="fas fa-terminal"></i> ${data.email}</span>` : ''}
                    ${data.phone ? `<span><i class="fas fa-mobile-alt"></i> ${data.phone}</span>` : ''}
                    ${data.location ? `<span><i class="fas fa-server"></i> ${data.location}</span>` : ''}
                    ${data.linkedin ? `<span><i class="fab fa-github"></i> Portfolio</span>` : ''}
                </div>
            </div>

            ${this.renderSections(data)}
        `;
        
        return this.applyStyles(content, data);
    }

    renderSections(data) {
        return `
            ${data.summary ? `
                <div class="resume-section">
                    <h2 class="resume-section-title">${data.template === 'tech' ? '// About' : data.template === 'classic' ? 'PROFESSIONAL SUMMARY' : 'Professional Summary'}</h2>
                    <p>${data.summary}</p>
                </div>
            ` : ''}

            ${data.education.length > 0 ? `
                <div class="resume-section">
                    <h2 class="resume-section-title">${data.template === 'tech' ? '// Education' : data.template === 'classic' ? 'EDUCATION' : 'Education'}</h2>
                    ${data.education.map(edu => `
                        <div class="resume-item">
                            <div class="resume-item-header">
                                <div>
                                    <div class="resume-item-title">${data.template === 'classic' ? edu.degree.toUpperCase() : edu.degree}</div>
                                    <div class="resume-item-subtitle">${edu.institution}</div>
                                </div>
                                <div class="resume-item-duration">${edu.duration}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            ${data.experience.length > 0 ? `
                <div class="resume-section">
                    <h2 class="resume-section-title">${data.template === 'tech' ? '// Experience' : data.template === 'classic' ? 'WORK EXPERIENCE' : 'Work Experience'}</h2>
                    ${data.experience.map(exp => `
                        <div class="resume-item">
                            <div class="resume-item-header">
                                <div>
                                    <div class="resume-item-title">${data.template === 'classic' ? exp.jobTitle.toUpperCase() : exp.jobTitle}</div>
                                    <div class="resume-item-subtitle">${exp.company}${exp.location ? ` • ${exp.location}` : ''}</div>
                                </div>
                                <div class="resume-item-duration">${exp.duration}</div>
                            </div>
                            ${exp.description ? `<div class="resume-item-description">${exp.description.replace(/\n/g, '<br>')}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            ${data.projects.length > 0 ? `
                <div class="resume-section">
                    <h2 class="resume-section-title">${data.template === 'tech' ? '// Projects' : data.template === 'classic' ? 'PROJECTS' : 'Projects'}</h2>
                    ${data.projects.map(project => `
                        <div class="resume-item">
                            <div class="resume-item-title">${data.template === 'classic' ? project.name.toUpperCase() : project.name}</div>
                            ${project.tech ? `<div class="resume-item-subtitle">${data.template === 'tech' ? 'Stack:' : 'Technologies:'} ${project.tech}</div>` : ''}
                            ${project.description ? `<div class="resume-item-description">${project.description.replace(/\n/g, '<br>')}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            ${data.skills.length > 0 ? `
                <div class="resume-section">
                    <h2 class="resume-section-title">${data.template === 'tech' ? '// Skills' : data.template === 'classic' ? 'SKILLS' : 'Skills'}</h2>
                    <div class="resume-skills">
                        ${data.skills.map(skill => `<span class="resume-skill">${skill}</span>`).join('')}
                    </div>
                </div>
            ` : ''}

            ${data.languages.length > 0 ? `
                <div class="resume-section">
                    <h2 class="resume-section-title">${data.template === 'tech' ? '// Languages' : data.template === 'classic' ? 'LANGUAGES' : 'Languages'}</h2>
                    <div class="resume-skills">
                        ${data.languages.map(lang => `<span class="resume-skill">${lang.name}${lang.level ? ` (${lang.level})` : ''}</span>`).join('')}
                    </div>
                </div>
            ` : ''}

            ${data.awards.length > 0 ? `
                <div class="resume-section">
                    <h2 class="resume-section-title">${data.template === 'tech' ? '// Achievements' : data.template === 'classic' ? 'AWARDS & HONORS' : 'Awards & Honors'}</h2>
                    ${data.awards.map(award => `
                        <div class="resume-item">
                            <div class="resume-item-header">
                                <div class="resume-item-title">${award.name}</div>
                                <div class="resume-item-duration">${award.year}</div>
                            </div>
                            ${award.organization ? `<div class="resume-item-subtitle">${award.organization}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            ${data.interests.length > 0 ? `
                <div class="resume-section">
                    <h2 class="resume-section-title">${data.template === 'tech' ? '// Interests' : data.template === 'classic' ? 'INTERESTS' : 'Interests'}</h2>
                    <div class="resume-skills">
                        ${data.interests.map(interest => `<span class="resume-skill">${interest}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
        `;
    }

    // Debounce preview generation
    debouncePreview() {
        clearTimeout(this.previewTimeout);
        this.previewTimeout = setTimeout(() => {
            this.generatePreview();
        }, 500);
    }

    async downloadResume() {
        const data = this.collectFormData();
        
        if (!data.fullName) {
            alert('Please enter your name before downloading the resume.');
            return;
        }

        try {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF();
            
            // Get the resume preview content
            const resumeContent = document.querySelector('.resume-template');
            
            if (!resumeContent) {
                alert('Please generate a preview first.');
                return;
            }

            // Convert HTML to PDF using html2canvas and jsPDF
            const canvas = await html2canvas(resumeContent, {
                scale: 2,
                useCORS: true,
                allowTaint: true
            });
            
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210;
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`${data.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');
        }
    }

    initializeStyleControls() {
        // Font family selection
        const fontSelect = document.getElementById('fontFamily');
        if (fontSelect) {
            fontSelect.addEventListener('change', (e) => {
                this.selectedFont = e.target.value;
                this.generatePreview();
            });
        }

        // Font size selection
        const fontSizeSelect = document.getElementById('fontSize');
        if (fontSizeSelect) {
            fontSizeSelect.addEventListener('change', (e) => {
                this.selectedFontSize = e.target.value;
                this.generatePreview();
            });
        }

        // Color scheme selection
        const colorSchemes = document.querySelectorAll('.color-scheme');
        colorSchemes.forEach(scheme => {
            scheme.addEventListener('click', () => {
                this.selectColorScheme(scheme.dataset.colors);
            });
        });

        // Custom color inputs
        const colorInputs = ['primaryColor', 'secondaryColor', 'textColor'];
        colorInputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('change', (e) => {
                    const colorType = inputId.replace('Color', '');
                    this.customColors[colorType] = e.target.value;
                    this.updateColorSchemeToCustom();
                    this.generatePreview();
                });
            }
        });
    }

    selectColorScheme(scheme) {
        this.selectedColorScheme = scheme;
        
        // Update UI
        document.querySelectorAll('.color-scheme').forEach(option => {
            option.classList.remove('active');
        });
        document.querySelector(`[data-colors="${scheme}"]`).classList.add('active');
        
        // Update custom color inputs based on scheme
        const colorMaps = {
            default: { primary: '#4f46e5', secondary: '#7c3aed', text: '#1e293b' },
            green: { primary: '#059669', secondary: '#0d9488', text: '#1e293b' },
            purple: { primary: '#7c3aed', secondary: '#a855f7', text: '#1e293b' },
            red: { primary: '#dc2626', secondary: '#ef4444', text: '#1e293b' },
            orange: { primary: '#ea580c', secondary: '#f97316', text: '#1e293b' },
            gray: { primary: '#374151', secondary: '#6b7280', text: '#1e293b' }
        };

        if (colorMaps[scheme]) {
            this.customColors = { ...colorMaps[scheme] };
            document.getElementById('primaryColor').value = this.customColors.primary;
            document.getElementById('secondaryColor').value = this.customColors.secondary;
            document.getElementById('textColor').value = this.customColors.text;
        }
        
        this.generatePreview();
    }

    updateColorSchemeToCustom() {
        document.querySelectorAll('.color-scheme').forEach(option => {
            option.classList.remove('active');
        });
        this.selectedColorScheme = 'custom';
    }
}

// Global functions for HTML onclick handlers
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[href="#${sectionId}"]`).classList.add('active');
}

function addExperience() {
    const container = document.getElementById('experienceContainer');
    const newItem = document.createElement('div');
    newItem.className = 'experience-item';
    newItem.innerHTML = `
        <button type="button" class="remove-item" onclick="this.parentElement.remove()">&times;</button>
        <div class="form-grid">
            <input type="text" class="jobTitle" placeholder="Job Title *">
            <input type="text" class="company" placeholder="Company Name *">
            <input type="text" class="duration" placeholder="Duration (e.g., Jan 2020 - Present)">
            <input type="text" class="jobLocation" placeholder="Location">
        </div>
        <textarea class="jobDescription" placeholder="Describe your key responsibilities and achievements. Use bullet points and action verbs..." rows="4"></textarea>
    `;
    container.appendChild(newItem);
}

function addEducation() {
    const container = document.getElementById('educationContainer');
    const newItem = document.createElement('div');
    newItem.className = 'education-item';
    newItem.innerHTML = `
        <button type="button" class="remove-item" onclick="this.parentElement.remove()">&times;</button>
        <div class="form-grid">
            <input type="text" class="degree" placeholder="Degree/Certification *">
            <input type="text" class="institution" placeholder="Institution Name *">
            <input type="text" class="eduDuration" placeholder="Year (e.g., 2018-2022)">
            <input type="text" class="gpa" placeholder="GPA (optional)">
        </div>
    `;
    container.appendChild(newItem);
}

function addProject() {
    const container = document.getElementById('projectsContainer');
    const newItem = document.createElement('div');
    newItem.className = 'project-item';
    newItem.innerHTML = `
        <button type="button" class="remove-item" onclick="this.parentElement.remove()">&times;</button>
        <div class="form-grid">
            <input type="text" class="projectName" placeholder="Project Name">
            <input type="text" class="projectTech" placeholder="Technologies Used">
        </div>
        <textarea class="projectDescription" placeholder="Describe the project, your role, and key achievements..." rows="3"></textarea>
    `;
    container.appendChild(newItem);
}

function addAward() {
    const container = document.getElementById('awardsContainer');
    const newItem = document.createElement('div');
    newItem.className = 'award-item';
    newItem.innerHTML = `
        <button type="button" class="remove-item" onclick="this.parentElement.remove()">&times;</button>
        <div class="form-grid">
            <input type="text" class="awardName" placeholder="Award/Honor Name">
            <input type="text" class="awardOrganization" placeholder="Organization">
            <input type="text" class="awardYear" placeholder="Year">
        </div>
    `;
    container.appendChild(newItem);
}

function addLanguage() {
    const container = document.getElementById('languagesContainer');
    const newItem = document.createElement('div');
    newItem.className = 'language-item';
    newItem.innerHTML = `
        <button type="button" class="remove-item" onclick="this.parentElement.remove()">&times;</button>
        <div class="form-grid">
            <input type="text" class="languageName" placeholder="Language">
            <select class="languageLevel">
                <option value="">Proficiency Level</option>
                <option value="Native">Native</option>
                <option value="Fluent">Fluent</option>
                <option value="Proficient">Proficient</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Basic">Basic</option>
            </select>
        </div>
    `;
    container.appendChild(newItem);
}

function generatePreview() {
    resumeBuilder.generatePreview();
}

function refreshPreview() {
    resumeBuilder.generatePreview();
}

function downloadResume() {
    resumeBuilder.downloadResume();
}

// Initialize resume builder when page loads
let resumeBuilder;
document.addEventListener('DOMContentLoaded', () => {
    resumeBuilder = new ResumeBuilder();
});