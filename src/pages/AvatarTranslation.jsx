import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Mic, RotateCcw, Languages, Video, Sparkles, AlertCircle } from "lucide-react";
import { signVideos } from "../data/signVideos";

const AvatarTranslation = () => {
    const [inputValue, setInputValue] = useState("");
    const [currentVideo, setCurrentVideo] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const videoRef = useRef(null);

    const findBestMatch = (text) => {
        const input = text.toLowerCase().trim();

        if (signVideos[input]) {
            return { word: input, video: signVideos[input] };
        }

        for (const key in signVideos) {
            if (input.includes(key)) {
                return { word: key, video: signVideos[key] };
            }
        }

        return null;
    };

    const handleTranslate = (text) => {
        const match = findBestMatch(text);
        if (match) {
            setCurrentVideo(match);
            setErrorMsg("");
        } else {
            setCurrentVideo(null);
            setErrorMsg("No sign found. Try: good morning, sorry, strong man");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        handleTranslate(inputValue);
        setInputValue("");
    };

    const handleWatchAgain = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    };

    const handleMicClick = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Browser does not support Speech Recognition");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";

        recognition.onstart = () => setIsRecording(true);
        recognition.onend = () => setIsRecording(false);

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInputValue(transcript);
            handleTranslate(transcript);
        };

        recognition.start();
    };

    useEffect(() => {
        if (currentVideo && videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch((err) => console.log("Video play error:", err));
        }
    }, [currentVideo]);

    return (
        <div className="avatar-translation-page" style={{ padding: "1rem" }}>
            <motion.div
                className="glass-card"
                style={{
                    padding: "2rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "2rem",
                    background: "var(--color-primary)",
                    color: "#FFF"
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div>
                    <h2 style={{ color: "#FFF", margin: "0 0 0.5rem 0", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <Languages size={28} />
                        Avatar Live Translation
                    </h2>
                    <p style={{ opacity: 0.8, margin: 0 }}>
                        Type or speak a phrase and instantly view the matching sign avatar.
                    </p>
                </div>

                <div style={{ display: "flex", gap: "2rem" }}>
                    <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "2rem", fontWeight: 800 }}>AI</div>
                        <div style={{ fontSize: "0.85rem", opacity: 0.8 }}>Smart Match</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "2rem", fontWeight: 800 }}>Live</div>
                        <div style={{ fontSize: "0.85rem", opacity: 0.8 }}>Voice Input</div>
                    </div>
                </div>
            </motion.div>

            <div style={{ display: "flex", gap: "1.5rem", alignItems: "stretch" }}>
                <motion.div
                    className="glass-card"
                    style={{
                        flex: 1.2,
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden"
                    }}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div
                        style={{
                            padding: "1.5rem",
                            borderBottom: "1px solid var(--glass-border)",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <h3 style={{ margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <Video size={22} color="var(--color-primary)" />
                            Avatar Preview
                        </h3>

                        {currentVideo && (
                            <button
                                className="btn btn-secondary"
                                onClick={handleWatchAgain}
                                style={{ padding: "0.6rem 1rem" }}
                            >
                                <RotateCcw size={16} />
                                Watch Again
                            </button>
                        )}
                    </div>

                    <div
                        style={{
                            padding: "1.5rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            flex: 1
                        }}
                    >
                        <div
                            style={{
                                position: "relative",
                                overflow: "hidden",
                                borderRadius: "18px",
                                background: "rgba(79, 62, 52, 0.06)",
                                border: "1px solid var(--glass-border)",
                                aspectRatio: "16 / 9",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            {currentVideo ? (
                                <video
                                    ref={videoRef}
                                    key={currentVideo.video}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="no-tilt"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "18px",
                                        background: "#000"
                                    }}
                                >
                                    <source src={currentVideo.video} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <div
                                    style={{
                                        textAlign: "center",
                                        color: "var(--color-text-muted)",
                                        padding: "2rem",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: "0.75rem"
                                    }}
                                >
                                    <Video size={56} opacity={0.5} />
                                    {errorMsg ? (
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                                            <AlertCircle size={22} color="#FF6B6B" />
                                            <p style={{ color: "#d9534f", fontWeight: 600, margin: 0 }}>{errorMsg}</p>
                                        </div>
                                    ) : (
                                        <p style={{ margin: 0 }}>Submit a word to play translation avatar.</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {currentVideo && (
                            <div
                                style={{
                                    background: "rgba(79, 62, 52, 0.05)",
                                    borderRadius: "14px",
                                    padding: "1rem 1.2rem",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: "1rem"
                                }}
                            >
                                <div>
                                    <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: "0.25rem" }}>
                                        Current Match
                                    </div>
                                    <div style={{ fontSize: "1.2rem", fontWeight: 700, textTransform: "capitalize", color: "var(--color-primary)" }}>
                                        {currentVideo.word}
                                    </div>
                                </div>

                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--color-text-muted)" }}>
                                    <Sparkles size={18} />
                                    <span style={{ fontSize: "0.9rem" }}>Matched from your input</span>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>

                <motion.div
                    className="glass-card"
                    style={{
                        width: "360px",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden"
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div
                        style={{
                            padding: "1.5rem",
                            borderBottom: "1px solid var(--glass-border)"
                        }}
                    >
                        <h3 style={{ margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <Languages size={20} />
                            Translate Input
                        </h3>
                    </div>

                    <div
                        style={{
                            padding: "1.5rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            flex: 1
                        }}
                    >
                        <p style={{ margin: 0, color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                            Enter a word or short phrase and the system will search for the closest sign avatar available in your dataset.
                        </p>

                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.75rem",
                                    background: "rgba(255,255,255,0.7)",
                                    border: "1px solid var(--glass-border)",
                                    borderRadius: "16px",
                                    padding: "0.75rem 1rem"
                                }}
                            >
                                <input
                                    type="text"
                                    placeholder="Type a sentence..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    style={{
                                        flex: 1,
                                        background: "transparent",
                                        border: "none",
                                        outline: "none",
                                        fontSize: "1rem",
                                        color: "var(--color-text-main)"
                                    }}
                                />

                                <button
                                    type="button"
                                    onClick={handleMicClick}
                                    className="icon-btn"
                                    style={{
                                        background: isRecording ? "#FF4D4F" : "transparent",
                                        color: isRecording ? "#FFF" : "var(--color-text-muted)",
                                        borderRadius: "12px",
                                        padding: "0.55rem"
                                    }}
                                >
                                    <Mic size={18} />
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={!inputValue.trim()}
                                className="btn btn-primary w-100"
                            >
                                <Send size={18} />
                                Translate Now
                            </button>
                        </form>

                        <div
                            style={{
                                marginTop: "0.5rem",
                                background: "rgba(79, 62, 52, 0.04)",
                                borderRadius: "16px",
                                padding: "1rem"
                            }}
                        >
                            <div style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--color-primary)" }}>
                                Suggested phrases
                            </div>

                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                                {["good morning", "sorry", "strong man", "hello"].map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => {
                                            setInputValue(item);
                                            handleTranslate(item);
                                        }}
                                        style={{
                                            border: "1px solid var(--glass-border)",
                                            background: "#FFF",
                                            color: "var(--color-text-main)",
                                            borderRadius: "999px",
                                            padding: "0.45rem 0.9rem",
                                            fontSize: "0.82rem",
                                            cursor: "pointer"
                                        }}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {!currentVideo && !errorMsg && (
                            <div
                                style={{
                                    marginTop: "auto",
                                    padding: "1rem",
                                    borderRadius: "14px",
                                    background: "rgba(198, 172, 143, 0.18)",
                                    color: "var(--color-text-main)",
                                    fontSize: "0.9rem"
                                }}
                            >
                                Try phrases like <strong>good morning</strong>, <strong>sorry</strong>, or <strong>strong man</strong>.
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AvatarTranslation;