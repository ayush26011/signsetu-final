import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Image as ImageIcon, Mic, Minus } from 'lucide-react';

// --- Manual Q&A Dataset (100+ Entries) ---
const qaData = [
  { keywords: ["what is signsetu", "about signsetu", "what is this"], answer: "SignSetu is an AI-powered platform designed to bridge the communication gap by translating and teaching sign language in real-time." },
  { keywords: ["free", "cost", "price", "pay"], answer: "SignSetu offers a generous free tier for basic learning and detection. Premium features like advanced courses and multi-user practice are available via our subscription plans." },
  { keywords: ["sign up", "register", "create account"], answer: "You can sign up by clicking the 'Get Started' or 'Sign Up' button on the navigation bar. Just provide your email and a password!" },
  { keywords: ["login", "sign in", "access"], answer: "Click 'Login' at the top right, enter your credentials, and you'll be redirected to your personal dashboard." },
  { keywords: ["start learning", "beginner", "where to start"], answer: "Head over to the 'Learning' page! We recommend starting with 'Alphabet Mastery' to get the fundamentals down." },
  { keywords: ["live detection", "how to use camera", "translate signs"], answer: "Our 'Live Detection' page uses your camera to recognize gestures instantly. Make sure you're in a well-lit area for the best accuracy!" },
  { keywords: ["safe", "privacy", "camera data"], answer: "Yes, it is completely safe. We process camera data locally or via secure encrypted streams, and we never store your private video feeds without permission." },
  { keywords: ["mobile", "phone", "app"], answer: "SignSetu is fully responsive and works great on mobile browsers. We are also working on dedicated iOS and Android apps!" },
  { keywords: ["who made this", "team", "creator"], answer: "SignSetu was built by a dedicated team of AI engineers and accessibility advocates passionate about inclusive communication." },
  { keywords: ["contact", "support", "help", "email"], answer: "You can reach our support team via the 'Contact Us' page or email us at support@signsetu.ai." },

  { keywords: ["how to learn", "learning method", "process"], answer: "We use a hybrid approach: watch instructor videos, then practice in our AI Sandbox for instant feedback." },
  { keywords: ["levels", "beginner", "intermediate", "advanced"], answer: "Yes! Courses are categorized into Beginner (basics), Intermediate (sentences), and Advanced (complex conversations)." },
  { keywords: ["track progress", "my progress", "completion"], answer: "Your dashboard shows your overall progress, completed courses, and learning streak. Every lesson you finish counts!" },
  { keywords: ["courses", "available lessons"], answer: "We have courses on Alphabets, Numbers, Colors, Greetings, Food, Directions, and much more." },
  { keywords: ["practice daily", "daily goal"], answer: "Consistency is key! We recommend 15 minutes of practice daily to build muscle memory." },
  { keywords: ["improve faster", "tips", "tricks"], answer: "Try our 'AI Practice' mode frequently. It's the best way to correct your hand positioning in real-time." },
  { keywords: ["certificate", "verified"], answer: "Upon completing advanced modules, you earn digital certificates to showcase your sign language proficiency." },
  { keywords: ["offline", "download"], answer: "Currently, you need an internet connection to use our AI models, but you can download lesson summaries for offline review." },
  { keywords: ["test", "quiz", "assessment"], answer: "Each module ends with a quiz where you must replicate signs correctly to move to the next level." },
  { keywords: ["languages", "variety"], answer: "We currently focus on ASL (American Sign Language) and ISL (Indian Sign Language), with more coming soon!" },

  { keywords: ["what is sign language", "manual communication"], answer: "Sign language is a visual-gestural language that uses hand shapes, movements, and facial expressions to convey meaning." },
  { keywords: ["universal", "same everywhere"], answer: "Actually, no. Sign languages vary by country and region, just like spoken languages (e.g., ASL vs. BSL vs. ISL)." },
  { keywords: ["asl", "american sign language"], answer: "ASL is the primary sign language used in the United States and Canada. It has its own unique grammar and syntax." },
  { keywords: ["isl", "indian sign language"], answer: "ISL is the sign language used in India. It is culturally rich and contains unique regional variations." },
  { keywords: ["long to learn", "timeframe"], answer: "Basic conversational skills take 3-6 months. Fluency can take several years of immersion and practice." },
  { keywords: ["difficult", "hard to learn"], answer: "It's like any language! The visual aspect makes it very engaging, though mastering the speed of 'fingerspelling' takes time." },
  { keywords: ["grammar", "syntax"], answer: "Sign languages have their own grammar rules, often using 'topic-comment' structure rather than purely matching spoken word order." },
  { keywords: ["facial expressions", "eyes", "mouth"], answer: "Crucial! In sign language, eyebrows and mouth movements can change a statement from a fact into a question." },
  { keywords: ["dominant hand", "left handed"], answer: "You use your 'dominant hand' for most signs. If you're left-handed, just be consistent with using your left hand as the leader." },
  { keywords: ["history", "origin"], answer: "Sign languages have evolved naturally within Deaf communities for centuries. Gallaudet University is a major hub for Deaf history." },

  { keywords: ["how does ai work", "computer vision", "machine learning"], answer: "We use sophisticated 'Computer Vision' models that track landmarks on your hand to identify specific gestures." },
  { keywords: ["camera used for", "webcam"], answer: "Your camera captures your movements so our AI can compare them to our database of correct gestures." },
  { keywords: ["real-time", "instant"], answer: "Yes! Our optimized models provide detection in under 100ms, making the interaction feel natural." },
  { keywords: ["detect all signs", "accuracy"], answer: "We currently detect over 500+ common signs with 95% accuracy. We're adding more every single week!" },
  { keywords: ["dark room", "lighting"], answer: "AI works best in good lighting. If it's too dark, the model may struggle to see your hand landmarks." },
  { keywords: ["background", "messy room"], answer: "Try to have a relatively plain background so the AI doesn't get confused by other objects." },
  { keywords: ["latency", "lag"], answer: "If you experience lag, try closing other heavy browser tabs. SignSetu works best on Chrome and Edge." },
  { keywords: ["browser", "compatible"], answer: "SignSetu is optimized for latest versions of Chrome, Safari, Firefox, and Brave." },
  { keywords: ["internet speed", "bandwidth"], answer: "A stable connection is recommended. About 2-5 Mbps is sufficient for our cloud-assisted detection." },
  { keywords: ["security", "encryption"], answer: "All data transmitted to our processing servers is encrypted using industry-standard TLS 1.3." },

  { keywords: ["camera not working", "camera error", "no webcam"], answer: "First, check if your browser has permission to access the camera. Refresh the page and click 'Allow' in the popup." },
  { keywords: ["load", "slow", "stuck"], answer: "Clear your browser cache and refresh. If that fails, check your internet connection or try a different browser." },
  { keywords: ["progress not updating", "lost progress"], answer: "Make sure you're logged into your account. If you finish a lesson and it doesn't count, try refreshing the dashboard." },
  { keywords: ["login issues", "password", "reset"], answer: "Click 'Forgot Password' on the login page to receive a reset link via email." },
  { keywords: ["audio", "sound", "volume"], answer: "Check your system volume and ensure the video player isn't muted in the bottom corner." },
  { keywords: ["mobile lag", "phone hot"], answer: "AI detection is heavy. Close background apps on your phone to give the browser more CPU power." },
  { keywords: ["not detecting me", "can't see hand"], answer: "Move slightly further from the camera so your entire arm/hand is visible. Don't move too fast!" },
  { keywords: ["blank screen", "white page"], answer: "Disable any ad-blockers or scripts that might be blocking our AI modules from loading." },
  { keywords: ["subscription error", "billing"], answer: "Visit your 'Billing' portal to update payment methods or resolve failed payments." },
  { keywords: ["bug", "report"], answer: "Found a bug? Use the 'Report Issue' link in the footer to help us improve." },

  { keywords: ["how are you", "how's it going"], answer: "I'm functioning perfectly! Ready to help you master some signs. How about you?" },
  { keywords: ["hello", "hi", "hey"], answer: "Hello there! Welcome to SignSetu. What would you like to learn today?" },
  { keywords: ["thanks", "thank you", "cool"], answer: "You're very welcome! Keep up the great work. 🤟" },
  { keywords: ["help me", "stuck", "what can you do"], answer: "I can answer questions about sign language, help you navigate the platform, troubleshoot camera issues, or recommend courses!" },
  { keywords: ["good morning", "good evening", "good night"], answer: "Greetings! Is it time for a quick sign language lesson?" },
  { keywords: ["bye", "see ya", "goodbye"], answer: "Goodbye! Don't forget to practice tomorrow. See you soon!" },
  { keywords: ["joke", "funny"], answer: "Why did the SignSetu user bring a ladder to class? Because they wanted to reach the 'Intermediate' level!" },
  { keywords: ["weather"], answer: "I'm better at signs than clouds! But it's always a good day to learn something new indoors." },
  { keywords: ["favorite sign", "popular sign"], answer: "I love the 'I Love You' sign (🤟)—it's simple, powerful, and recognized globally!" },
  { keywords: ["repeat", "what did you say"], answer: "I'm here to help! I just mentioned that I can guide you through the SignSetu platform." },

  { keywords: ["why learn sign language", "benefits"], answer: "It improves cognitive function, enhances spatial awareness, and builds a bridge to the vibrant Deaf community." },
  { keywords: ["hearing people", "non-deaf"], answer: "Absolutely! Most of our users are hearing people who want to communicate with friends, family, or colleagues." },
  { keywords: ["future of ai", "accessibility future"], answer: "AI will eventually allow for seamless, two-way, real-time translation between sign and spoken speech worldwide." },
  { keywords: ["careers", "jobs", "interpreter"], answer: "Learning sign language can lead to amazing careers as educational interpreters, community Liaisons, or social workers." },
  { keywords: ["sign names", "what is a sign name"], answer: "A 'sign name' is a unique gesture given to you by a member of the Deaf community. It usually reflects a physical trait or personality!" },
  { keywords: ["culture", "deaf culture"], answer: "Deaf culture is rich in storytelling, poetry (Visual Vernacular), and deep social bonds. It's much more than just a lack of hearing." },
  { keywords: ["baby sign", "toddlers"], answer: "Sign language is great for babies! They can often sign basic needs like 'milk' or 'more' before they can speak." },
  { keywords: ["bilingual", "multilingual"], answer: "Yes! Being fluent in ASL and English makes you truly bilingual, using two different modes of communication." },
  { keywords: ["advocacy", "how to help"], answer: "Support Deaf-owned businesses and advocate for captions and interpreters in public spaces!" },
  { keywords: ["ai bias", "hand shades"], answer: "We take diversity seriously. Our AI is trained on thousands of diverse hand shapes and skin tones to ensure fair performance for everyone." },

  { keywords: ["community", "friends list"], answer: "Our 'Community' page lets you join rooms and practice with others. Check the 'Friends' tab to see who's online!" },
  { keywords: ["badges", "achievements"], answer: "You earn badges for milestones like 25%, 50%, and 100% course completion. Check your 'Achievements' tab!" },
  { keywords: ["settings", "theme", "dark mode"], answer: "You can change your theme and notification settings in the 'Profile' or 'Settings' page." },
  { keywords: ["notifications", "reminders"], answer: "We send gentle reminders to help you keep your learning streak alive. You can toggle these in Settings." },
  { keywords: ["feedback", "suggestion"], answer: "We love feedback! Use our contact form to suggest new signs or features." },
  { keywords: ["avatar", "profile picture"], answer: "Customize your profile on the 'Profile' page to stand out in the community." },
  { keywords: ["leaderboard", "ranking"], answer: "Compete with others! The leaderboard shows top learners based on XP and streak days." },
  { keywords: ["xp", "experience points"], answer: "You earn XP for every lesson completed and every correct gesture in the AI Sandbox." },
  { keywords: ["streak", "flame"], answer: "A streak is the number of consecutive days you've practiced. Don't let the flame go out!" },
  { keywords: ["gems", "currency"], answer: "Gems are earned through learning and can be used to unlock special avatars or profile themes." },
  { keywords: ["mission", "daily challenge"], answer: "Check your dashboard for 'Daily Missions' to earn bonus gems and XP." },
  { keywords: ["fingerspelling"], answer: "Fingerspelling is using the ASL alphabet to spell out words that don't have a specific sign." },
  { keywords: ["numbers", "counting"], answer: "We have a dedicated module for numbers 1-100. It's a great second step after the alphabet!" },
  { keywords: ["colors"], answer: "Our 'Basic Colors' course covers primary and secondary colors. Perfect for beginners!" },
  { keywords: ["family", "mom", "dad"], answer: "Family signs are core. Check the 'Daily Conversations' module to learn signs for mom, dad, and siblings." },
  { keywords: ["emotions", "happy", "sad"], answer: "Express yourself! Facial expressions are 50% of the sign in emotions." },
  { keywords: ["food signs", "hungry"], answer: "Our 'Ordering Food' course is one of our most popular intermediate modules." },
  { keywords: ["emergency", "police", "doctor"], answer: "Crucial signs! These are covered in our 'Safety & Emergency' advanced course." },
  { keywords: ["school", "teacher"], answer: "Learn academic signs in our 'Education' module." },
  { keywords: ["work", "office"], answer: "Professional signs are great for the workplace. Check the 'Business ASL' level." },
  { keywords: ["travel", "airport"], answer: "Going somewhere? Our 'Directions' course includes common travel signs." },
  { keywords: ["sports", "game"], answer: "From football to yoga, learn sports signs in the 'Hobbies' category." },
  { keywords: ["animals", "dog", "cat"], answer: "Animal signs are very visual and fun to learn for all ages!" },
  { keywords: ["time", "today", "tomorrow"], answer: "Master time concepts in our 'Grammar & Time' module." },
  { keywords: ["calendar", "monday", "sunday"], answer: "Days of the week are vital for scheduling practice!" },
  { keywords: ["orientation", "palm position"], answer: "Hand orientation (where your palm faces) can change the entire meaning of a sign." },
  { keywords: ["movement", "circular", "linear"], answer: "The path your hand takes is critical. Double movements often indicate a noun vs. a verb." },
  { keywords: ["signing space"], answer: "Your 'signing space' is the area from your top of head to waist. Keep your signs within this frame!" },
  { keywords: ["interpreter", "pro"], answer: "Becoming an interpreter takes dedication but is one of the most rewarding ways to use your skills." },
  { keywords: ["deafblind", "tactile"], answer: "Tactile signing is used by people who are both Deaf and Blind. It involves signing into the palm." },
  { keywords: ["coda", "child of deaf adult"], answer: "CODAs are often native signers and bridges between the Deaf and hearing worlds." },
  { keywords: ["name signs", "etiquette"], answer: "Never give yourself a sign name; it's a gift from the community!" },
  { keywords: ["eye contact"], answer: "In Deaf culture, eye contact is very important. Looking away while someone is signing is like 'closing your ears'." },
  { keywords: ["attention", "wave", "tap"], answer: "To get someone's attention, a small wave or a gentle tap on the shoulder is standard." },
  { keywords: ["applause", "clapping"], answer: "Deaf applause is waving both hands in the air—it's beautiful to see!" },
  { keywords: ["video calls", "zoom"], answer: "SignSetu helps you prepare for smooth and clear signing over video conferences." },
  { keywords: ["ai limitations"], answer: "While our AI is great, practicing with a real person is the best way to gain true fluency." },
  { keywords: ["data usage"], answer: "Our app is light, but video lessons can use more data. Use Wi-Fi for the best experience." },
  { keywords: ["engine", "v1 v2"], answer: "We are currently on Detection Engine v2.4, our most stable and fast version yet." },
  { keywords: ["api docs"], answer: "Interested in building with our tech? Check the 'Developers' section in the footer." },
  { keywords: ["signsetu x", "limited edition"], answer: "SignSetu X is our upcoming advanced platform for pro interpreters and researchers!" }
];

// --- Smart Fallback Pool ---
const fallbackPool = [
  "I'm not sure about that yet, but I'm learning! Try asking about sign language types, platform features, or how to start learning.",
  "That sounds interesting, but I don't have a specific answer for it. Can you rephrase or ask about sign language basics?",
  "I can help with sign language mastery, live detection troubleshooting, or course guidance. Would you like to know about those?",
  "I'm still brain-mapping that topic! How about we talk about learning your first sign or how our AI works?",
  "Our knowledge hub is growing every day. For now, try asking something like 'What is ASL?' or 'How do I track progress?'",
  "I'm your SignSetu guide! I work best when asked about gestures, platform tools, or community features."
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: "Hello! I'm your SignSetu AI assistant. How can I help you today with your sign language journey? 🤟" }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const findBestAnswer = (input) => {
    const lowerInput = input.toLowerCase().trim();

    for (const item of qaData) {
      if (item.keywords.some(kw => lowerInput.includes(kw))) {
        return item.answer;
      }
    }

    const randomIndex = Math.floor(Math.random() * fallbackPool.length);
    return fallbackPool[randomIndex];
  };

  const handleSend = async () => {
    if (!inputText.trim() || isTyping) return;

    const currentInput = inputText;
    const userMsg = { id: Date.now(), sender: 'user', text: currentInput };
    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const botReply = findBestAnswer(currentInput);
      setIsTyping(false);
      const botMsg = { id: Date.now() + 1, sender: 'bot', text: botReply };
      setMessages(prev => [...prev, botMsg]);
    }, 800);
  };

  const handleSuggestion = (text) => {
    setInputText(text);
  };

  const preventSubmit = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className="chatbot-fab pulse glow-effect"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle size={28} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window glass-card"
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="header-info">
                <div className="bot-avatar" style={{ boxShadow: '0 0 10px rgba(79, 62, 52, 0.3)' }}>
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 600 }}>SignSetu AI Assistant</h4>
                  <span className="status">Online</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => setIsOpen(false)} className="close-btn"><Minus size={20} /></button>
                <button onClick={() => setIsOpen(false)} className="close-btn"><X size={20} /></button>
              </div>
            </div>

            {/* Chat Map Container */}
            <div className="chatbot-messages hide-scrollbar">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`chat-bubble ${msg.sender === 'bot' ? 'bubble-ai' : 'bubble-user'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {msg.text}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div className="chat-bubble bubble-ai" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="typing-indicator">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length < 3 && !isTyping && (
              <motion.div className="chatbot-suggestions" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.5 } }}>
                <button className="suggestion-chip" onClick={() => handleSuggestion("Learn basic sign language")}>Learn basic sign language</button>
                <button className="suggestion-chip" onClick={() => handleSuggestion("Start live detection")}>Start live detection</button>
                <button className="suggestion-chip" onClick={() => handleSuggestion("Open learning courses")}>Open learning courses</button>
                <button className="suggestion-chip" onClick={() => handleSuggestion("Join community rooms")}>Join community rooms</button>
              </motion.div>
            )}

            {/* Text Input Row */}
            <div className="chatbot-input">
              <div className="input-wrapper">
                <button className="icon-btn hover-lift"><ImageIcon size={18} /></button>
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={preventSubmit}
                />
                <button className="icon-btn hover-lift"><Mic size={18} /></button>
              </div>
              <button
                className="send-btn"
                onClick={handleSend}
                disabled={!inputText.trim() || isTyping}
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}