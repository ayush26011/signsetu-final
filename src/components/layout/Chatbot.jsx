import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Image as ImageIcon, Mic, Minus } from 'lucide-react';

// --- General + Platform Q&A ---
const qaData = [
  { keywords: ["what is signsetu", "about signsetu", "what is this"], answer: "SignSetu is an AI-powered platform that helps users learn, practice, and detect sign language in real time." },
  { keywords: ["free", "cost", "price", "pay"], answer: "SignSetu can offer a free basic experience with optional premium features like advanced lessons, analytics, and community tools." },
  { keywords: ["sign up", "register", "create account"], answer: "You can create an account from the Sign Up page using your email and password." },
  { keywords: ["login", "sign in"], answer: "Use the Login page and enter your registered email and password to access your dashboard." },
  { keywords: ["start learning", "beginner", "where to start"], answer: "Start from the Learning page. 'Alphabet Mastery' is the best first course for beginners." },
  { keywords: ["live detection", "camera", "translate signs"], answer: "Live Detection uses your camera feed and AI model to detect hand signs and convert them into readable output." },
  { keywords: ["safe", "privacy", "camera data"], answer: "Yes, SignSetu focuses on secure usage. Camera access should only be used for live detection and should not be stored without user permission." },
  { keywords: ["mobile", "phone", "app"], answer: "SignSetu is designed to work on web and can later be extended into mobile apps using frameworks like Flutter." },
  { keywords: ["support", "help", "contact"], answer: "You can use the support section or contact the team through the help page for technical or platform issues." },
  { keywords: ["courses", "available lessons"], answer: "SignSetu includes lessons such as Alphabet Mastery, Numbers 1-100, Basic Colors, Greetings, and more." },

  { keywords: ["asl", "american sign language"], answer: "ASL stands for American Sign Language. It has its own grammar, structure, and expressions." },
  { keywords: ["isl", "indian sign language"], answer: "ISL stands for Indian Sign Language. It is widely used in India and has its own signs and patterns." },
  { keywords: ["sign language", "what is sign language"], answer: "Sign language is a visual language that uses hand gestures, movement, and facial expressions to communicate." },
  { keywords: ["same everywhere", "universal"], answer: "No, sign languages are not universal. Different regions use different sign languages, like ASL and ISL." },
  { keywords: ["how long to learn", "time to learn"], answer: "Basic learning can take a few months with regular practice, while fluency takes longer depending on consistency." },

  { keywords: ["camera not working", "webcam error"], answer: "Check browser camera permissions first. Then refresh the page and ensure no other app is using your webcam." },
  { keywords: ["lag", "slow", "latency"], answer: "Lag can happen if too many processes are running. Good lighting, stable internet, and fewer background tabs help improve performance." },
  { keywords: ["progress", "track progress"], answer: "Your dashboard can show completed courses, ongoing lessons, and learning streaks." },
  { keywords: ["certificate", "certificates"], answer: "Certificates can be awarded after completing certain lesson milestones or advanced modules." },

  { keywords: ["hello", "hi", "hey"], answer: "Hello! I’m your SignSetu AI assistant. Ask me anything about sign language or the project. 🤟" },
  { keywords: ["thank you", "thanks"], answer: "You're welcome! Happy to help with your SignSetu journey." },
  { keywords: ["bye", "goodbye"], answer: "Goodbye! Keep practicing and come back stronger tomorrow. 🤟" },
  { keywords: ["what can you do", "help me"], answer: "I can explain project features, AI logic, sign language basics, troubleshooting steps, and learning flow." },

  // --- Project-specific AI / ML / System Q&A (60+) ---
  { keywords: ["project idea", "what is your project idea", "signsetu idea"], answer: "SignSetu is built to bridge communication gaps using AI-powered sign language learning and real-time gesture detection." },
  { keywords: ["project objective", "main objective"], answer: "The main objective of SignSetu is to make sign language learning and communication more accessible, interactive, and real-time." },
  { keywords: ["problem statement", "what problem does signsetu solve"], answer: "SignSetu solves the communication gap between sign language users and non-signers by enabling learning and AI-based recognition." },
  { keywords: ["ai in signsetu", "how ai is used"], answer: "AI in SignSetu is used to detect hand gestures, classify signs, and provide real-time translation or learning feedback." },
  { keywords: ["machine learning", "ml in signsetu"], answer: "Machine learning helps SignSetu recognize gesture patterns from extracted hand landmark features." },
  { keywords: ["model used", "which model"], answer: "SignSetu uses a trained classification model for hand-sign recognition. In your current version, Random Forest is one of the main model approaches." },
  { keywords: ["random forest", "why random forest"], answer: "Random Forest is useful because it is fast, stable, easy to train, and works well on structured landmark-based features." },
  { keywords: ["why not cnn", "cnn"], answer: "CNNs are powerful for image-based tasks, but landmark-based models like Random Forest are lighter and faster for quick gesture classification." },
  { keywords: ["mediapipe", "why mediapipe"], answer: "MediaPipe is used to detect and track hand landmarks efficiently in real time from the camera feed." },
  { keywords: ["mediapipe hands", "hand landmarks"], answer: "MediaPipe Hands detects 21 hand landmarks, which provide x and y positions for gesture analysis." },
  { keywords: ["21 landmarks", "how many landmarks"], answer: "SignSetu uses 21 hand landmarks provided by MediaPipe for each detected hand." },
  { keywords: ["feature extraction", "features"], answer: "Feature extraction is done by measuring landmark positions relative to a base point, usually the wrist landmark." },
  { keywords: ["why relative coordinates", "base landmark"], answer: "Relative coordinates make the model more robust by reducing dependence on absolute hand position inside the frame." },
  { keywords: ["wrist landmark", "base point"], answer: "The wrist landmark is often used as the base point because it provides a stable reference for the other hand points." },
  { keywords: ["label encoder", "encoded classes"], answer: "Label Encoder converts sign labels into numerical form for model training and converts predictions back into readable sign names." },
  { keywords: ["predict proba", "probability"], answer: "predict_proba gives the probability of each class, which is useful for confidence estimation." },
  { keywords: ["confidence score", "confidence"], answer: "Confidence score shows how certain the model is about a detected sign. Higher confidence means stronger prediction reliability." },
  { keywords: ["confidence threshold", "threshold"], answer: "Confidence threshold filters weak predictions. If prediction confidence is below the threshold, the output can be treated as uncertain." },
  { keywords: ["uncertain", "why uncertain appears"], answer: "Uncertain appears when the model predicts a sign but the confidence is lower than the selected threshold." },
  { keywords: ["no hand", "why no hand"], answer: "No Hand appears when MediaPipe cannot detect any valid hand landmarks in the frame." },
  { keywords: ["sentence building", "how sentence is made"], answer: "Sentence building works by appending stable recognized signs one by one into a short phrase buffer." },
  { keywords: ["prediction buffer", "buffer"], answer: "Prediction buffer stores recent predictions and helps smooth output by selecting the most repeated sign over recent frames." },
  { keywords: ["buffer size", "why buffer size"], answer: "Buffer size helps reduce noisy predictions. A larger buffer gives smoother output but may slightly increase delay." },
  { keywords: ["cooldown", "cooldown frames"], answer: "Cooldown prevents the same sign from being added again and again too quickly, improving sentence quality." },
  { keywords: ["last prediction", "duplicate signs"], answer: "The last prediction is stored so the system can avoid repeating the same detected sign continuously." },
  { keywords: ["smooth prediction", "stable prediction"], answer: "Smooth prediction is achieved using confidence filtering, repeated frame buffering, and cooldown logic." },
  { keywords: ["false positives", "wrong detection"], answer: "False positives can happen due to poor lighting, unclear hand positioning, background clutter, or similar-looking gestures." },
  { keywords: ["accuracy", "model accuracy"], answer: "Accuracy depends on training quality, dataset diversity, hand visibility, and the stability of extracted landmarks." },
  { keywords: ["improve accuracy", "how to improve model"], answer: "You can improve accuracy by collecting more balanced data, better preprocessing, more gestures, and cleaner landmark features." },
  { keywords: ["dataset", "training data"], answer: "The dataset contains sign samples for each class, usually represented by extracted hand landmarks or labeled gesture images." },
  { keywords: ["data collection", "collect data"], answer: "Data collection can be done by recording multiple samples of each gesture under different angles, lighting, and users." },
  { keywords: ["training", "model training"], answer: "Training means teaching the model patterns from labeled hand landmark data so it can later classify unknown gestures." },
  { keywords: ["testing", "model testing"], answer: "Testing is used to evaluate how well the trained model performs on unseen data." },
  { keywords: ["overfitting", "underfitting"], answer: "Overfitting means the model memorizes training data too much, while underfitting means it fails to learn enough patterns." },
  { keywords: ["why landmarks not full image", "images vs landmarks"], answer: "Landmarks are lighter, faster, and more structured than full images, making them good for real-time sign classification." },
  { keywords: ["real time detection", "live prediction"], answer: "Real-time detection means the camera captures frames continuously and the model predicts signs instantly or near-instantly." },
  { keywords: ["pipeline", "media pipeline"], answer: "The basic pipeline is: camera frame -> MediaPipe hand detection -> landmark feature extraction -> ML model prediction -> output display." },
  { keywords: ["frontend", "frontend role"], answer: "The frontend handles user interaction, camera access, lesson pages, chatbot UI, and display of predictions or results." },
  { keywords: ["backend", "backend role"], answer: "The backend processes requests, loads the trained model, runs prediction logic, and returns the result to the frontend." },
  { keywords: ["flask", "why flask"], answer: "Flask is lightweight and simple, making it a good choice for serving model predictions and API routes." },
  { keywords: ["react", "why react"], answer: "React is used for building an interactive frontend with modular components, reusable pages, and smooth UI behavior." },
  { keywords: ["vite", "why vite"], answer: "Vite provides a fast development server and quick frontend builds, which helps a lot during UI development." },
  { keywords: ["firebase", "why firebase"], answer: "Firebase can be used for authentication, realtime database features, notifications, and quick backend support." },
  { keywords: ["websocket", "real time communication"], answer: "WebSocket can support real-time communication features like live messaging, accessibility rooms, and peer interaction." },
  { keywords: ["speech", "text to speech", "tts"], answer: "Text-to-speech helps SignSetu speak out detected signs or built sentences aloud for easier communication." },
  { keywords: ["speech to text", "stt"], answer: "Speech-to-text can convert spoken language into text and later support sign animation or communication support." },
  { keywords: ["vosk", "vosk api"], answer: "Vosk is a lightweight speech recognition engine often used for offline or efficient speech-to-text features." },
  { keywords: ["google tts", "google text to speech"], answer: "Google TTS is useful for producing clear spoken output from detected or generated text." },
  { keywords: ["multilingual", "multiple languages"], answer: "SignSetu aims to support multilingual communication by combining sign recognition with different language outputs." },
  { keywords: ["asl and isl support", "multiple sign languages"], answer: "SignSetu can be expanded to support both ASL and ISL by training separate datasets or adding language modes." },
  { keywords: ["one hand only", "single hand"], answer: "Your current implementation mainly works with one-hand detection for simpler and more stable prediction." },
  { keywords: ["two hands", "both hands"], answer: "Two-hand signs can be supported, but they require more advanced tracking, dataset collection, and model handling." },
  { keywords: ["mirrored", "mirror camera"], answer: "Mirroring the camera gives a more natural user view, but backend prediction logic must stay consistent with training orientation." },
  { keywords: ["skeleton", "hand skeleton"], answer: "The hand skeleton is drawn using MediaPipe landmarks and connectors, making the detected gesture visually understandable." },
  { keywords: ["why skeleton useful", "benefit of skeleton"], answer: "Skeleton overlay helps users see if the hand is being tracked properly and improves trust in live detection." },
  { keywords: ["latency in render", "render issue"], answer: "Cloud deployment can introduce delay because camera frames must be uploaded, processed remotely, and returned back." },
  { keywords: ["local vs deployed", "local better"], answer: "Local execution is often faster for sign detection because the camera and model run on the same machine." },
  { keywords: ["deployment", "host project"], answer: "Frontend can be hosted separately, while the AI backend can be exposed as an API service for prediction requests." },
  { keywords: ["cors", "cors error"], answer: "CORS errors happen when frontend and backend run on different origins without proper permission headers." },
  { keywords: ["render", "onrender"], answer: "Render can host your backend API, but real-time video-heavy workloads may perform slower than local execution." },
  { keywords: ["localhost", "local server"], answer: "Running on localhost is useful for development and testing because it avoids deployment latency and remote request overhead." },
  { keywords: ["api route", "predict route"], answer: "The /predict route accepts image data, processes it through the AI pipeline, and returns prediction results as JSON." },
  { keywords: ["json response", "prediction response"], answer: "A typical response includes predicted sign, confidence score, and optionally the built sentence." },
  { keywords: ["chatbot in signsetu", "why chatbot"], answer: "The chatbot acts as a smart guide, helping users understand the platform, AI logic, troubleshooting, and sign language learning." },
  { keywords: ["kids section", "children module"], answer: "The kids section can make sign language learning engaging through simpler lessons, visuals, and child-friendly interactions." },
  { keywords: ["community feature", "community"], answer: "The community feature helps users interact, practice together, and create a more collaborative learning experience." },
  { keywords: ["emergency mode", "emergency feature"], answer: "Emergency mode can help users quickly communicate urgent needs through sign-to-text or fast accessibility support." },
  { keywords: ["future scope", "future improvements"], answer: "Future scope includes offline mode, smart glasses integration, better multilingual support, two-way translation, and wider gesture coverage." },
  { keywords: ["smart glasses", "glasses integration"], answer: "Smart glasses integration could allow real-time accessible overlays for sign detection and communication support." },
  { keywords: ["offline mode"], answer: "Offline mode would make SignSetu more accessible by allowing core detection features to run without internet." },
  { keywords: ["hackathon", "why unique"], answer: "SignSetu stands out because it combines AI detection, learning, communication support, and accessibility into one meaningful platform." },
  { keywords: ["innovation", "what is innovative"], answer: "The innovation lies in combining live AI sign detection, guided learning, speech output, and inclusive accessibility features in a single experience." },
  { keywords: ["revenue model", "monetization"], answer: "Possible revenue models include subscription tiers, school/institute licensing, accessibility solutions for businesses, and premium learning modules." },
  { keywords: ["real world use", "use cases"], answer: "Real-world use cases include education, hospitals, customer support, public services, classrooms, and inclusive workplaces." },
  { keywords: ["why this project matters", "importance"], answer: "This project matters because it promotes accessibility, inclusion, and better communication for Deaf and hard-of-hearing communities." }
];

// --- Smart Fallback Pool ---
const fallbackPool = [
  "I'm not sure about that yet, but I can definitely help with SignSetu, AI, MediaPipe, Random Forest, live detection, or learning modules.",
  "That’s interesting. Try asking me about SignSetu features, machine learning, MediaPipe, model accuracy, or chatbot guidance.",
  "I can answer project-related questions like AI pipeline, frontend-backend flow, sign language modules, or model working.",
  "I’m still learning that topic, but I can explain your SignSetu project, its ML model, training logic, or live detection flow.",
  "Try asking about confidence threshold, Random Forest, landmarks, frontend integration, or future scope of SignSetu.",
  "I work best with SignSetu questions about learning, AI, live detection, deployment, or sign language basics."
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
                <button className="suggestion-chip" onClick={() => handleSuggestion("What is SignSetu?")}>What is SignSetu?</button>
                <button className="suggestion-chip" onClick={() => handleSuggestion("How does MediaPipe work?")}>How does MediaPipe work?</button>
                <button className="suggestion-chip" onClick={() => handleSuggestion("Why Random Forest is used?")}>Why Random Forest?</button>
                <button className="suggestion-chip" onClick={() => handleSuggestion("How does live detection work?")}>Live Detection</button>
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