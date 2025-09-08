// Chatbot functionality without API - Intelligent Resume Assistant
class ChatBot {
    constructor() {
        this.messagesContainer = document.getElementById('messagesContainer');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.typingIndicator = document.getElementById('typingIndicator');
        
        this.initializeEventListeners();
        this.conversationHistory = [];
        this.responses = this.generateIntelligentResponses();
        
        // Always show as ready since no API needed
        this.updateStatusIndicator('online');
    }

    updateStatusIndicator(status) {
        const statusElement = document.querySelector('.status span');
        const indicatorElement = document.querySelector('.status-indicator');
        
        statusElement.textContent = 'AI Ready';
        indicatorElement.style.background = '#10b981';
    }

    initializeEventListeners() {
        // Send message on button click
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
        // Send message on Enter key press
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Auto-resize input and enable/disable send button
        this.messageInput.addEventListener('input', () => {
            this.sendButton.disabled = this.messageInput.value.trim() === '';
        });

        // Initialize send button state
        this.sendButton.disabled = true;
    }

    generateIntelligentResponses() {
        return {
            greetings: [
                "Hello! I'm your resume and career assistant. I can help you create a compelling resume, write professional summaries, choose the right skills, and provide career advice. What would you like to work on?",
                "Hi there! I'm here to help you build an outstanding resume and advance your career. Whether you need help with writing, formatting, or career strategy, I've got you covered. How can I assist you today?",
                "Welcome! I specialize in resume building and career guidance. I can help you craft compelling content, choose the right format, and make your application stand out. What aspect of your resume would you like to improve?"
            ],
            
            professionalSummary: [
                "Here's a framework for a strong professional summary:\n\n📝 **Structure:**\n• Start with your title/role (e.g., 'Experienced Marketing Manager')\n• Highlight 2-3 key achievements with numbers\n• Mention relevant skills for your target role\n• End with what you bring to employers\n\n💡 **Example:**\n'Results-driven Software Developer with 5+ years building scalable web applications. Increased system efficiency by 40% and led a team of 6 developers. Expert in React, Node.js, and cloud architecture. Passionate about creating innovative solutions that drive business growth.'\n\nWould you like me to help you customize this for your specific field?",
                
                "A compelling professional summary should be your elevator pitch! Here's what makes it effective:\n\n🎯 **Key Elements:**\n• 2-3 impactful sentences\n• Quantified achievements (numbers, percentages, results)\n• Industry-specific keywords\n• Forward-looking statement\n\n✨ **Formula:**\n[Your Role] + [Years of Experience] + [Key Achievement] + [Relevant Skills] + [Value Proposition]\n\n📊 **Power Words:** Achieved, Led, Increased, Developed, Implemented, Optimized, Delivered\n\nWhat's your target role? I can help you craft a summary tailored to that position!"
            ],
            
            skills: [
                "Great question! Here's how to choose the right skills for your resume:\n\n🔍 **Technical Skills:**\n• Programming languages (Python, JavaScript, Java)\n• Software tools (Adobe Creative Suite, Salesforce, Excel)\n• Platforms (AWS, Google Cloud, WordPress)\n• Methodologies (Agile, Scrum, Lean)\n\n🤝 **Soft Skills:**\n• Leadership & Team Management\n• Communication & Presentation\n• Problem-solving & Critical Thinking\n• Project Management\n• Adaptability & Learning Agility\n\n💡 **Pro Tips:**\n• Match skills to job descriptions\n• Use specific versions (React 18, Python 3.9)\n• Include certifications\n• Balance technical and soft skills\n\nWhat industry are you targeting? I can suggest more specific skills!",
                
                "Skills selection is crucial! Here's my strategic approach:\n\n📋 **Research Phase:**\n• Analyze 5 job postings in your target role\n• Note recurring skill requirements\n• Identify industry-specific tools\n\n⭐ **Skill Categories:**\n• **Core Competencies:** Your strongest abilities\n• **Technical Proficiencies:** Tools and technologies\n• **Industry Knowledge:** Sector-specific expertise\n• **Certifications:** Professional credentials\n\n🎯 **Formatting Tips:**\n• List 8-12 key skills\n• Group related skills together\n• Use bullet points or tags\n• Update regularly based on learning\n\nShare your field and I'll suggest a tailored skill set!"
            ],
            
            workExperience: [
                "Here's how to write compelling work experience descriptions:\n\n🚀 **STAR Method:**\n• **Situation:** Context/challenge\n• **Task:** What you needed to do\n• **Action:** Steps you took\n• **Result:** Measurable outcome\n\n📊 **Power Formula:**\n[Action Verb] + [What you did] + [How you did it] + [Result with numbers]\n\n✨ **Examples:**\n❌ 'Responsible for social media'\n✅ 'Developed social media strategy that increased engagement by 150% and grew followers from 1K to 15K in 6 months'\n\n💪 **Action Verbs:**\nAchieved, Implemented, Led, Optimized, Designed, Increased, Reduced, Launched, Managed, Created\n\n🎯 **Focus on:**\n• Quantifiable results\n• Impact on business\n• Leadership examples\n• Problem-solving instances\n\nNeed help with a specific role description?",
                
                "Excellent work experience descriptions follow this winning formula:\n\n📈 **Results-Focused Writing:**\n• Start with strong action verbs\n• Include specific metrics (%, $, #)\n• Show progression and growth\n• Highlight unique contributions\n\n🏆 **Achievement Examples:**\n• 'Increased sales by 35% through strategic client relationship management'\n• 'Reduced processing time by 50% by implementing automated workflows'\n• 'Led cross-functional team of 12 to deliver $2M project ahead of schedule'\n\n🎨 **Formatting Best Practices:**\n• 3-4 bullet points per role\n• Consistent tense (past for previous roles)\n• Parallel structure\n• Relevant accomplishments only\n\nWhat role would you like help describing? I can provide industry-specific guidance!"
            ],
            
            interviewPrep: [
                "Let me help you prepare for interviews! Here's a comprehensive approach:\n\n🎯 **Common Questions & Frameworks:**\n\n**'Tell me about yourself'**\n• Present: Current role/situation\n• Past: Relevant experience\n• Future: Why you want this role\n\n**'Why should we hire you?'**\n• Match your skills to their needs\n• Provide specific examples\n• Show enthusiasm for the role\n\n**'What's your weakness?'**\n• Choose a real but manageable weakness\n• Explain how you're improving\n• Show self-awareness\n\n💼 **STAR Method for Behavioral Questions:**\n• Situation, Task, Action, Result\n• Prepare 5-6 stories covering different skills\n• Practice timing (2-3 minutes each)\n\n❓ **Questions to Ask Them:**\n• 'What does success look like in this role?'\n• 'What are the biggest challenges facing the team?'\n• 'How would you describe the company culture?'\n\nWhat specific interview area would you like to practice?",
                
                "Interview preparation is key to success! Here's your action plan:\n\n🔍 **Research Phase:**\n• Company mission, values, recent news\n• Role requirements and team structure\n• Industry trends and challenges\n• Interviewer backgrounds (LinkedIn)\n\n💡 **Story Bank Creation:**\nPrepare examples for:\n• Leadership experience\n• Problem-solving ability\n• Teamwork and collaboration\n• Handling failure/setbacks\n• Learning and adaptation\n\n🎭 **Practice Sessions:**\n• Mock interviews with friends\n• Record yourself answering questions\n• Practice in front of a mirror\n• Time your responses\n\n👔 **Day-of Tips:**\n• Arrive 10-15 minutes early\n• Bring multiple copies of your resume\n• Prepare thoughtful questions\n• Follow up within 24 hours\n\nWant help preparing for a specific interview question or scenario?"
            ],
            
            careerAdvice: [
                "I'd love to help with your career development! Here are key strategies for advancement:\n\n🚀 **Career Growth Framework:**\n\n**1. Self-Assessment**\n• Identify your strengths and interests\n• Define short and long-term goals\n• Assess skill gaps for target roles\n\n**2. Skill Development**\n• Take online courses (Coursera, LinkedIn Learning)\n• Attend industry conferences\n• Seek stretch assignments at work\n• Build a side project portfolio\n\n**3. Network Building**\n• Join professional associations\n• Attend networking events\n• Connect with colleagues on LinkedIn\n• Find a mentor in your field\n\n**4. Personal Branding**\n• Optimize your LinkedIn profile\n• Share industry insights\n• Contribute to professional discussions\n• Build an online portfolio\n\n🎯 **Action Steps:**\n• Set SMART goals (Specific, Measurable, Achievable)\n• Create a 90-day development plan\n• Track progress monthly\n• Celebrate small wins\n\nWhat specific aspect of career development interests you most?",
                
                "Career advancement requires strategic planning! Here's a comprehensive roadmap:\n\n📊 **Career Planning Matrix:**\n\n**Assess Current State:**\n• Skills inventory\n• Performance feedback\n• Market value research\n• Satisfaction levels\n\n**Define Future Vision:**\n• Dream roles and companies\n• Required qualifications\n• Timeline expectations\n• Potential obstacles\n\n🌟 **Growth Accelerators:**\n• **Visibility:** Volunteer for high-profile projects\n• **Value:** Solve important business problems\n• **Relationships:** Build strategic alliances\n• **Skills:** Stay ahead of industry trends\n\n💼 **Professional Development:**\n• Industry certifications\n• Leadership training\n• Cross-functional experience\n• International assignments\n\n🎯 **Success Metrics:**\n• Promotion timeline\n• Salary progression\n• Skill acquisition\n• Network expansion\n\nAre you looking to advance in your current company or transition to something new?"
            ],
            
            salaryNegotiation: [
                "Salary negotiation is a crucial career skill! Here's a strategic approach:\n\n💰 **Research Phase:**\n• Use Glassdoor, PayScale, Salary.com\n• Check LinkedIn salary insights\n• Network with industry contacts\n• Consider location and company size\n\n📊 **Value Proposition:**\n• Quantify your achievements\n• Research market rates for your role\n• Prepare a 'brag sheet' of accomplishments\n• Understand total compensation package\n\n🎯 **Negotiation Strategy:**\n• Ask for the full range first\n• Present your research confidently\n• Negotiate total package (salary + benefits)\n• Be prepared to walk away\n\n💡 **Key Phrases:**\n• 'Based on my research and experience...'\n• 'I was hoping for something closer to...'\n• 'Can we find a middle ground?'\n• 'What would it take to get to X?'\n\n⏰ **Timing Matters:**\n• After job offer, before acceptance\n• During performance reviews\n• After major achievements\n• When taking on new responsibilities\n\nWhat's your specific negotiation scenario? I can provide tailored advice!",
                
                "Let's master salary negotiation together! Here's a comprehensive strategy:\n\n🔍 **Preparation Steps:**\n\n**1. Market Research**\n• Industry salary surveys\n• Geographic cost of living\n• Company size and sector\n• Your unique value proposition\n\n**2. Documentation**\n• Achievement portfolio\n• Performance metrics\n• Additional responsibilities\n• Skills development\n\n🎭 **Negotiation Tactics:**\n• **Anchoring:** Start with your research\n• **Bundling:** Consider entire package\n• **Timing:** Choose the right moment\n• **Alternatives:** Know your BATNA\n\n💼 **Beyond Base Salary:**\n• Signing bonus\n• Stock options/equity\n• Flexible working arrangements\n• Professional development budget\n• Additional vacation days\n• Healthcare benefits\n\n🏆 **Success Framework:**\n• Practice your pitch\n• Stay professional and confident\n• Listen actively\n• Be prepared to compromise\n• Get agreements in writing\n\nReady to discuss your specific situation?"
            ],
            
            default: [
                "I'm here to help with all aspects of resume building and career development! I can assist you with:\n\n📝 **Resume Writing:**\n• Professional summaries\n• Work experience descriptions\n• Skills selection\n• Education and certifications\n• Formatting and design\n\n💼 **Career Development:**\n• Interview preparation\n• Salary negotiation\n• Career planning\n• Professional networking\n• Personal branding\n\n🎯 **Job Search Strategy:**\n• Application optimization\n• LinkedIn profile enhancement\n• Cover letter writing\n• Industry insights\n• Market trends\n\nWhat specific area would you like to explore? Just ask me anything about resumes, careers, or professional development!",
                
                "I'm your dedicated career and resume assistant! Here's how I can help you succeed:\n\n🌟 **My Expertise Areas:**\n• Crafting compelling professional narratives\n• Optimizing resumes for ATS systems\n• Developing interview strategies\n• Building professional networks\n• Negotiating job offers\n• Planning career transitions\n\n💡 **Popular Topics:**\n• 'Help me write a professional summary'\n• 'What skills should I include?'\n• 'How do I describe my work experience?'\n• 'Prepare me for common interview questions'\n• 'Give me career advancement tips'\n\n🚀 **Let's Get Started:**\nTell me about your current situation, target role, or any specific challenge you're facing. I'll provide personalized, actionable advice to help you achieve your career goals!\n\nWhat would you like to work on first?"
            ]
        };
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        this.messageInput.value = '';
        this.sendButton.disabled = true;

        // Show typing indicator
        this.showTypingIndicator();

        // Generate intelligent response after delay
        setTimeout(() => {
            const response = this.generateIntelligentResponse(message);
            this.hideTypingIndicator();
            this.addMessage(response, 'bot');
        }, Math.random() * 2000 + 1000); // 1-3 seconds delay for realistic feel
    }

    generateIntelligentResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Greeting detection
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || 
            lowerMessage.includes('good morning') || lowerMessage.includes('good afternoon')) {
            return this.getRandomResponse('greetings');
        }
        
        // Professional summary help
        if (lowerMessage.includes('professional summary') || lowerMessage.includes('summary') || 
            lowerMessage.includes('objective') || lowerMessage.includes('profile')) {
            return this.getRandomResponse('professionalSummary');
        }
        
        // Skills-related queries
        if (lowerMessage.includes('skills') || lowerMessage.includes('abilities') || 
            lowerMessage.includes('competencies') || lowerMessage.includes('what should i include')) {
            return this.getRandomResponse('skills');
        }
        
        // Work experience help
        if (lowerMessage.includes('work experience') || lowerMessage.includes('job description') || 
            lowerMessage.includes('responsibilities') || lowerMessage.includes('achievements') ||
            lowerMessage.includes('experience description') || lowerMessage.includes('bullet points')) {
            return this.getRandomResponse('workExperience');
        }
        
        // Interview preparation
        if (lowerMessage.includes('interview') || lowerMessage.includes('interview prep') || 
            lowerMessage.includes('interview questions') || lowerMessage.includes('prepare')) {
            return this.getRandomResponse('interviewPrep');
        }
        
        // Career advice
        if (lowerMessage.includes('career advice') || lowerMessage.includes('career growth') || 
            lowerMessage.includes('promotion') || lowerMessage.includes('career development') ||
            lowerMessage.includes('career path') || lowerMessage.includes('advance')) {
            return this.getRandomResponse('careerAdvice');
        }
        
        // Salary negotiation
        if (lowerMessage.includes('salary') || lowerMessage.includes('negotiate') || 
            lowerMessage.includes('compensation') || lowerMessage.includes('pay') ||
            lowerMessage.includes('raise') || lowerMessage.includes('offer')) {
            return this.getRandomResponse('salaryNegotiation');
        }
        
        // Specific helpful responses
        if (lowerMessage.includes('template') || lowerMessage.includes('format')) {
            return "Great question about resume templates! I see you're using our resume builder which offers three professional templates:\n\n🎨 **Modern Template:** Clean, contemporary design with subtle colors\n📄 **Classic Template:** Traditional, conservative format perfect for formal industries\n🎯 **Creative Template:** Stylish design with personality for creative fields\n\nEach template is ATS-friendly and follows best practices. You can switch between them using the template selector in the form. The preview updates instantly so you can see how your information looks in each style!\n\nWhich template appeals to you most for your target industry?";
        }
        
        if (lowerMessage.includes('download') || lowerMessage.includes('pdf')) {
            return "To download your resume as a PDF:\n\n📋 **Steps:**\n1. Fill out all relevant sections in the form\n2. Click 'Preview Resume' to see how it looks\n3. Choose your preferred template (Modern, Classic, or Creative)\n4. Click 'Download PDF' button\n\n✨ **The PDF will include:**\n• Professional formatting\n• All your information organized cleanly\n• Print-ready layout\n• ATS-compatible structure\n\n💡 **Pro Tips:**\n• Review the preview before downloading\n• Save multiple versions for different roles\n• Keep file names professional (FirstName_LastName_Resume.pdf)\n\nNeed help with any specific section before downloading?";
        }
        
        if (lowerMessage.includes('ats') || lowerMessage.includes('applicant tracking')) {
            return "Great question about ATS (Applicant Tracking Systems)! Here's how to optimize your resume:\n\n🤖 **ATS-Friendly Formatting:**\n• Use standard fonts (Arial, Calibri, Times New Roman)\n• Avoid graphics, images, and complex layouts\n• Use simple bullet points\n• Include keywords from job descriptions\n\n📝 **Content Optimization:**\n• Match job description language\n• Use industry-standard section headers\n• Include relevant keywords naturally\n• Spell out acronyms first, then use abbreviations\n\n✅ **Our templates are ATS-optimized with:**\n• Clean, simple formatting\n• Standard section headers\n• Proper heading hierarchy\n• Text-based design (no complex graphics)\n\nThe key is balancing ATS compatibility with visual appeal for human readers!";
        }
        
        // Default intelligent response
        return this.getRandomResponse('default');
    }

    getRandomResponse(category) {
        const responses = this.responses[category];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';

        const content = document.createElement('div');
        content.className = 'message-content';
        
        const messageText = document.createElement('p');
        messageText.innerHTML = text.replace(/\n/g, '<br>'); // Handle line breaks
        
        const timestamp = document.createElement('span');
        timestamp.className = 'message-time';
        timestamp.textContent = this.getCurrentTime();

        content.appendChild(messageText);
        content.appendChild(timestamp);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);

        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        this.typingIndicator.classList.add('show');
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.typingIndicator.classList.remove('show');
    }

    scrollToBottom() {
        setTimeout(() => {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }, 100);
    }

    getCurrentTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    clearChat() {
        // Keep only the initial bot message
        const messages = this.messagesContainer.querySelectorAll('.message');
        for (let i = 1; i < messages.length; i++) {
            messages[i].remove();
        }
        
        // Reset conversation history to just system message
        this.conversationHistory = [];
        
        // Reset input
        this.messageInput.value = '';
        this.sendButton.disabled = true;
    }
}

// Global functions for HTML onclick handlers
function sendMessage() {
    chatBot.sendMessage();
}

function clearChat() {
    if (confirm('Are you sure you want to clear the chat history?')) {
        chatBot.clearChat();
    }
}

function insertSuggestion(text) {
    const messageInput = document.getElementById('messageInput');
    messageInput.value = text;
    messageInput.focus();
    document.getElementById('sendButton').disabled = false;
}

// Initialize chatbot when page loads
let chatBot;
document.addEventListener('DOMContentLoaded', () => {
    chatBot = new ChatBot();
    
    // Add some welcome animations
    setTimeout(() => {
        document.querySelector('.container').style.opacity = '1';
    }, 100);
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effect to feature cards
    const featureCards = document.querySelectorAll('.feature-cards');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add smooth scroll for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
});