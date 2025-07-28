# Tata Motors Customer Engagement Portal

A premium, cinematic customer engagement portal for Tata Motors featuring liquid-smooth animations, GSAP-powered interactions, and a mobile-first design philosophy.

## 🚀 Features

### Core Experience
- **Liquid Smooth Scrolling**: Powered by Lenis for buttery-smooth scroll animations
- **Cinematic Animations**: GSAP-powered animations with ScrollTrigger for scroll-based effects
- **Mobile-First Design**: Responsive design optimized for all devices
- **Premium UI/UX**: Glass morphism effects, micro-interactions, and modern design patterns

### Interactive Components

#### 🎬 Hero Section
- Cinematic background image reveal with 5-second zoom animation
- Staggered text animation for welcome message
- Dynamic lead name integration

#### 🎯 Action Hub
- 2x2 grid of interactive action cards
- Hover effects with electric-blue glow
- Sequential scroll-triggered animations
- Four main actions:
  - Call Advisor
  - Book Test Drive
  - Request Callback
  - View Offers

#### 🤖 AI Assistant
- Floating Action Button (FAB) with morphing animation
- Expandable chat window with smooth transitions
- Real-time message animations
- Intelligent response system

#### 📱 Premium Features
- Sticky header with backdrop blur effect
- Modal system with smooth animations
- "Add to Home Screen" toast notification
- Responsive design across all devices

## 🛠 Technology Stack

### Core Technologies
- **HTML5**: Semantic markup structure
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript (ES6+)**: Modern JavaScript with async/await

### Animation & Interaction Libraries
- **GSAP (GreenSock)**: Professional-grade animations
- **ScrollTrigger**: Scroll-based animation triggers
- **Lenis**: Smooth scrolling implementation
- **Lucide Icons**: Modern icon library

### Design System
- **Font**: Inter (Google Fonts)
- **Colors**: Tata Motors brand palette
  - Tata Blue: `#1e40af`
  - Electric Blue: `#3b82f6`
  - Off White: `#f8fafc`
  - Tata Gold: `#f59e0b`

## 🎨 Design Philosophy

### "Kinetic Luxury"
- **Liquid Smoothness**: Every interaction feels premium and responsive
- **Cinematic Feel**: Animations create depth and narrative
- **Energetic & Sportive**: Clean, bold, and dynamic design
- **Authentic Branding**: Rooted in Tata Motors official identity

## 📱 Mobile-First Features

### Responsive Design
- Optimized for mobile devices
- Touch-friendly interactions
- Adaptive layouts for different screen sizes
- Performance optimized for mobile networks

### Progressive Enhancement
- Core functionality works without JavaScript
- Enhanced animations and interactions with JS
- Graceful degradation for older browsers

## 🚀 Getting Started

### Prerequisites
- Modern web browser with ES6+ support
- No build tools required (CDN-based)

### Installation
1. Clone or download the project files
2. Open `index.html` in a web browser
3. Experience the premium Tata Motors portal

### File Structure
```
lead-ui/
├── index.html          # Main HTML file
├── script.js           # JavaScript functionality
├── README.md          # Project documentation
└── prompt.txt         # Original specifications
```

## 🎯 Key Interactions

### Scroll Animations
- Header height adjustment on scroll
- Action cards animate in sequentially
- AI assistant card with delayed entrance

### Click Interactions
- Action cards trigger modal dialogs
- FAB morphs into chat window
- Smooth modal open/close animations

### Chat System
- Real-time message animations
- AI response simulation
- Smooth scroll to new messages

## 🔧 Customization

### Brand Colors
Modify the Tailwind config in `index.html`:
```javascript
colors: {
    'tata-blue': '#1e40af',
    'electric-blue': '#3b82f6',
    'off-white': '#f8fafc',
    'tata-gold': '#f59e0b',
}
```

### Animation Timing
Adjust GSAP animation durations in `script.js`:
```javascript
gsap.to(element, {
    duration: 0.8,  // Animation duration
    ease: "power3.out"  // Easing function
});
```

## 📊 Performance Features

### Optimizations
- CDN-based libraries for faster loading
- Efficient GSAP animations
- Optimized image loading
- Minimal DOM manipulation

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers

## 🎨 Animation Details

### Hero Section
- Background image cinematic zoom (5s duration)
- Staggered text animation (0.3s delay between words)
- Smooth opacity and transform transitions

### Action Cards
- Scroll-triggered entrance animations
- Hover effects with transform and shadow
- Sequential animation with 0.1s stagger

### Chat Interface
- FAB morphing animation (0.5s duration)
- Message slide-up animations (0.3s duration)
- Smooth icon transformations

### Modals
- Backdrop blur effect
- Scale and fade animations
- Native OS dialog feel

## 🔮 Future Enhancements

### Planned Features
- Real API integration for lead data
- Advanced AI chat functionality
- Push notifications
- Offline support
- Advanced analytics tracking

### Performance Improvements
- Image optimization and lazy loading
- Service worker for caching
- Advanced animation performance tuning

## 📄 License

This project is created for Tata Motors customer engagement portal demonstration.

## 🤝 Contributing

This is a demonstration project showcasing premium web development techniques for automotive brand engagement.

---

**Built with ❤️ for Tata Motors - Kinetic Luxury in Every Interaction** 