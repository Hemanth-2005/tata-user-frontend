// Main Application Object
const App = {
    state: {
        leadId: null,
        leadName: null,
        executivePhoneNumber: null,
        callbackSelection: {
            day: null,
            slot: null,
        },
        currentSlide: 0,
    },

    // Initialize the application
    init() {
        this.getLeadIdFromURL();
        this.fetchLeadData();
        this.bindEvents();
        this.initializeAnimations();
        this.initializeBackgroundSlideshow();
        this.initializeLucide();
    },

    // Get lead ID from URL parameters
    getLeadIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        this.state.leadId = urlParams.get('leadId') || 'LEAD_001';
    },

    // Fetch lead data from API
    async fetchLeadData() {
        try {
            const data = await this.fetchLeadDataAPI();
            this.state.leadName = data.leadName;
            this.state.executivePhoneNumber = data.executivePhoneNumber;
            this.updateUI();
        } catch (error) {
            console.error('Error fetching lead data:', error);
        }
    },

    // Update UI with lead data
    updateUI() {
        const welcomeText = document.getElementById('welcome-text');
        if (welcomeText && this.state.leadName) {
            const spans = welcomeText.querySelectorAll('span');
            if (spans.length > 1) {
                spans[1].textContent = this.state.leadName;
            }
        }

        // Update call advisor link
        const callAdvisorCard = document.querySelector('[data-action="call-advisor"]');
        if (callAdvisorCard && this.state.executivePhoneNumber) {
            callAdvisorCard.addEventListener('click', () => {
                window.location.href = `tel:${this.state.executivePhoneNumber}`;
            });
        }
    },

    // Initialize background slideshow
    initializeBackgroundSlideshow() {
        console.log('=== SLIDESHOW DEBUG START ===');
        
        // Wait a bit for DOM to be fully ready
        setTimeout(() => {
            this.startSlideshow();
        }, 100);
    },

    // Start the slideshow
    startSlideshow() {
        const slides = document.querySelectorAll('.background-slide');
        console.log(`Found ${slides.length} slides`);
        
        if (slides.length === 0) {
            console.error('❌ No slides found');
            return;
        }

        // Log all slides
        slides.forEach((slide, index) => {
            console.log(`Slide ${index}:`, slide.style.backgroundImage);
        });

        // Set initial state
        slides[0].style.opacity = '1';
        slides[0].style.zIndex = '1';
        
        for (let i = 1; i < slides.length; i++) {
            slides[i].style.opacity = '0';
            slides[i].style.zIndex = '0';
        }

        let currentIndex = 0;
        const totalSlides = slides.length;

        const nextSlide = () => {
            console.log(`🔄 Transitioning from slide ${currentIndex}`);
            
            const currentSlide = slides[currentIndex];
            const nextIndex = (currentIndex + 1) % totalSlides;
            const nextSlide = slides[nextIndex];

            console.log(`Current: ${currentIndex}, Next: ${nextIndex}`);

            // Simple cross-fade
            currentSlide.style.transition = 'opacity 2s ease-in-out';
            nextSlide.style.transition = 'opacity 2s ease-in-out';
            
            currentSlide.style.opacity = '0';
            nextSlide.style.opacity = '1';
            
            currentSlide.style.zIndex = '0';
            nextSlide.style.zIndex = '1';

            currentIndex = nextIndex;
            console.log(`✅ Updated to slide ${currentIndex}`);
        };

        // Manual test function
        window.testSlideshow = () => {
            console.log('🧪 Manual test triggered');
            nextSlide();
        };

        // Check state function
        window.checkSlideshowState = () => {
            console.log('📊 Current state:');
            slides.forEach((slide, index) => {
                console.log(`Slide ${index}: opacity=${slide.style.opacity}, zIndex=${slide.style.zIndex}`);
            });
        };

        // Start automatic transitions
        console.log('🚀 Starting automatic transitions every 5 seconds');
        setInterval(nextSlide, 5000);
        
        console.log('=== SLIDESHOW DEBUG END ===');
    },

    // Initialize animations
    initializeAnimations() {
        // Hero text animation
        const welcomeText = document.getElementById('welcome-text');
        const welcomeSpans = welcomeText?.querySelectorAll('span');

        if (welcomeSpans) {
            gsap.to(welcomeSpans, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.3,
                ease: "power3.out",
                delay: 0.5
            });
        }

        // Action cards animation
        const actionCards = document.querySelectorAll('.glass-card[data-action], #ai-assistant');
        actionCards.forEach((card, index) => {
            gsap.to(card, {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                delay: 1.5 + (index * 0.1),
                ease: "power3.out"
            });
        });
    },

    // Bind all event listeners
    bindEvents() {
        // Action card click handlers
        const actionCards = document.querySelectorAll('[data-action]');
        actionCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const action = card.getAttribute('data-action');
                if (action) {
                    this.handleActionClick(action);
                }
            });
        });

        // AI Assistant card click
        const aiAssistant = document.getElementById('ai-assistant');
        if (aiAssistant) {
            aiAssistant.addEventListener('click', () => {
                this.toggleChat();
            });
        }

        // Chat functionality
        this.bindChatEvents();

        // Modal close handlers
        this.bindModalEvents();

        // Toast notification
        this.bindToastEvents();
    },

    // Handle action card clicks
    handleActionClick(action) {
        switch(action) {
            case 'call-advisor':
                // This is handled by updateUI() - direct phone call
                break;
                
            case 'book-test-drive':
                this.postUserAction('test_drive_request').then(() => {
                    this.showModal('test-drive-modal');
                });
                break;
                
            case 'request-callback':
                this.updateCallbackModalView('day-selection');
                this.showModal('callback-modal');
                break;
                
            case 'view-offers':
                this.renderOffers();
                this.showModal('offers-modal');
                break;
        }
    },

    // Show modal with proper animations
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        const modalContent = modal.querySelector('.glass-card, .bg-white');
        
        if (!modal || !modalContent) {
            console.error(`Modal ${modalId} not found`);
            return;
        }

        // Remove hidden class
        modal.classList.remove('hidden');
        
        // Animate backdrop
        gsap.to(modal, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
        });

        // Animate modal content
        gsap.to(modalContent, {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: "power3.out"
        });
    },

    // Hide modal with proper animations
    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        const modalContent = modal.querySelector('.glass-card, .bg-white');
        
        if (!modal || !modalContent) {
            console.error(`Modal ${modalId} not found`);
            return;
        }

        // Animate modal content
        gsap.to(modalContent, {
            scale: 0.95,
            opacity: 0,
            duration: 0.2,
            ease: "power2.in"
        });

        // Animate backdrop
        gsap.to(modal, {
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
            onComplete: () => {
                modal.classList.add('hidden');
            }
        });
    },

    // Update callback modal view
    updateCallbackModalView(viewName) {
        const callbackModal = document.getElementById('callback-modal');
        const views = callbackModal.querySelectorAll('[data-view]');
        
        // Hide all views
        views.forEach(view => {
            view.classList.add('hidden');
        });
        
        // Show specific view
        const targetView = callbackModal.querySelector(`[data-view="${viewName}"]`);
        if (targetView) {
            targetView.classList.remove('hidden');
        }
    },

    // Render offers in the offers modal
    renderOffers() {
        const offersContent = document.getElementById('offers-content');
        if (!offersContent) return;

        const offers = [
            {
                title: "Monsoon Bonanza",
                description: "Flat ₹50,000 discount + accessories worth ₹10,000",
                model: "On the Tata Harrier",
                icon: "gift"
            },
            {
                title: "EV Power Pack",
                description: "Free home charging station installation",
                model: "On the Tata Nexon EV",
                icon: "zap"
            },
            {
                title: "Family Adventure Upgrade",
                description: "Complimentary roof rack and floor mats",
                model: "On the Tata Safari",
                icon: "mountain"
            }
        ];

        offersContent.innerHTML = offers.map(offer => `
            <div class="bg-white/10 rounded-lg p-4 border border-white/20">
                <div class="flex items-start justify-between">
                    <div class="flex-1">
                        <h4 class="font-semibold text-white mb-1">${offer.title}</h4>
                        <p class="text-sm text-white/80 mb-2">${offer.description}</p>
                        <p class="text-xs text-tata-gold font-medium">${offer.model}</p>
                    </div>
                    <div class="w-8 h-8 bg-tata-gold/20 rounded-lg flex items-center justify-center ml-3 border border-tata-gold/30">
                        <i data-lucide="${offer.icon}" class="w-4 h-4 text-tata-gold"></i>
                    </div>
                </div>
            </div>
        `).join('');

        // Reinitialize Lucide icons
        lucide.createIcons();
    },

    // Bind modal events
    bindModalEvents() {
        // Close modal buttons
        document.querySelectorAll('[data-action="close-modal"]').forEach(button => {
            button.addEventListener('click', (e) => {
                const modal = e.target.closest('[id$="-modal"]');
                if (modal) {
                    this.hideModal(modal.id);
                }
            });
        });

        // Callback modal specific events
        const callbackModal = document.getElementById('callback-modal');
        if (callbackModal) {
            // Day selection
            callbackModal.querySelectorAll('[data-day]').forEach(button => {
                button.addEventListener('click', (e) => {
                    const day = e.currentTarget.getAttribute('data-day');
                    this.state.callbackSelection.day = day;
                    this.updateCallbackModalView('time-selection');
                });
            });

            // Time selection
            callbackModal.querySelectorAll('[data-slot]').forEach(button => {
                button.addEventListener('click', (e) => {
                    const slot = e.currentTarget.getAttribute('data-slot');
                    this.state.callbackSelection.slot = slot;
                    
                    this.postUserAction('callback_request', this.state.callbackSelection).then(() => {
                        this.updateCallbackModalView('confirmation');
                    });
                });
            });
        }
    },

    // Bind chat events
    bindChatEvents() {
        const fab = document.getElementById('fab');
        const chatWindow = document.getElementById('chat-window');
        const closeChat = document.getElementById('close-chat');
        const chatInput = document.getElementById('chat-input');
        const sendMessage = document.getElementById('send-message');
        const chatMessages = document.getElementById('chat-messages');

        if (fab && chatWindow) {
            fab.addEventListener('click', () => {
                this.toggleChat();
            });
        }

        if (closeChat) {
            closeChat.addEventListener('click', () => {
                this.toggleChat();
            });
        }

        if (sendMessage && chatInput) {
            sendMessage.addEventListener('click', () => {
                this.sendChatMessage();
            });

            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendChatMessage();
                }
            });
        }
    },

    // Toggle chat window
    toggleChat() {
        const fab = document.getElementById('fab');
        const chatWindow = document.getElementById('chat-window');

        if (fab.style.display === 'none') {
            // Show FAB, hide chat
            gsap.to(chatWindow, {
                scale: 0.8,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    chatWindow.classList.add('hidden');
                    fab.style.display = 'block';
                    gsap.to(fab, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
        } else {
            // Hide FAB, show chat
            gsap.to(fab, {
                scale: 0,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    fab.style.display = 'none';
                    chatWindow.classList.remove('hidden');
                    gsap.fromTo(chatWindow, 
                        { scale: 0.8, opacity: 0 },
                        { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" }
                    );
                }
            });
        }
    },

    // Send chat message
    sendChatMessage() {
        const chatInput = document.getElementById('chat-input');
        const chatMessages = document.getElementById('chat-messages');
        
        const message = chatInput.value.trim();
        if (message) {
            this.addMessage(message, 'user');
            chatInput.value = '';

            setTimeout(() => {
                const aiResponse = this.getAIResponse(message);
                this.addMessage(aiResponse, 'ai');
            }, 1000);
        }
    },

    // Add message to chat
    addMessage(text, sender) {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-animation ${sender === 'user' ? 'flex justify-end' : 'flex justify-start'}`;
        
        const messageClass = sender === 'user' 
            ? 'bg-electric-blue/20 text-white rounded-lg p-3 max-w-xs border border-electric-blue/30' 
            : 'bg-white/10 rounded-lg p-3 max-w-xs border border-white/20';
        
        messageDiv.innerHTML = `
            <div class="${messageClass}">
                <p class="text-sm text-white leading-relaxed">${text}</p>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    },

    // Get AI response
    getAIResponse(userMessage) {
        const responses = {
            'test drive': 'I can help you book a test drive! What model are you interested in? We have the latest Tata Safari, Harrier, and Nexon available.',
            'price': 'I can provide you with current pricing and offers. Which Tata model are you looking for?',
            'offer': 'Great! We have several exciting offers running. Would you like to know about our financing options or cash discounts?',
            'help': 'I\'m here to help! I can assist with booking test drives, checking prices, viewing offers, or connecting you with our sales team.',
            'curvv': 'The Tata Curvv is our latest SUV with cutting-edge design and advanced features. Would you like to know more about its specifications?',
            'safari': 'The Tata Safari is our flagship SUV with premium features and unmatched comfort. Shall I show you the available variants?',
            'harrier': 'The Tata Harrier offers the perfect blend of style and performance. Would you like to explore its features?',
            'nexon': 'The Tata Nexon EV is India\'s safest electric car with 5-star safety rating. Interested in its range and charging options?',
            'tiago': 'The Tata Tiago is our popular hatchback with great fuel efficiency. Would you like to know about its variants?',
            'altroz': 'The Tata Altroz is our premium hatchback with 5-star safety rating. Shall I show you its features?',
            'default': 'Thank you for your message! I\'m here to help you with any questions about Tata Motors vehicles, test drives, pricing, or offers. How can I assist you today?'
        };

        const lowerMessage = userMessage.toLowerCase();
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        return responses.default;
    },

    // Bind toast events
    bindToastEvents() {
        const toast = document.getElementById('toast');
        const addToHome = document.getElementById('add-to-home');

        // Show toast after 3 seconds
        setTimeout(() => {
            if (toast) {
                toast.classList.remove('hidden');
            }
        }, 3000);

        if (addToHome) {
            addToHome.addEventListener('click', () => {
                if ('serviceWorker' in navigator) {
                    console.log('Add to home screen clicked');
                }
                
                gsap.to(toast, {
                    y: 100,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => {
                        toast.classList.add('hidden');
                    }
                });
            });
        }
    },

    // Initialize Lucide icons
    initializeLucide() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    },

    // API simulation functions
    async fetchLeadDataAPI() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    leadName: 'Priya',
                    executivePhoneNumber: '+91 98765 43210',
                    leadId: this.state.leadId
                });
            }, 1000);
        });
    },

    async postUserAction(action, data = null) {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log(`Action posted: ${action}`, data);
                resolve({ success: true });
            }, 500);
        });
    },

    async getAIChatResponse(message) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.getAIResponse(message));
            }, 1000);
        });
    }
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the app
    App.init();
    
    console.log('Tata Motors Customer Engagement Portal - Single Screen Experience initialized successfully!');
}); 