"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, RotateCcw } from "lucide-react";
import { signVideos } from "../data/signVideos";

const AvatarTranslation = () => {
    const [inputValue, setInputValue] = useState("");
    const [currentVideo, setCurrentVideo] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const videoRef = useRef(null);

    // Requirement: Convert input to lowercase and find best match using text.includes()
    const findBestMatch = (text) => {
        const input = text.toLowerCase().trim();

        // Check for exact match first
        if (signVideos[input]) {
            return { word: input, video: signVideos[input] };
        }

        // Requirement: support partial matches using text.includes()
        // We'll iterate through keys and see if input contains the key
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

    // Requirement: Replay using ref
    const handleWatchAgain = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    };

    // Speech Recognition logic
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

    // Requirement: Use useEffect
    // For example, to ensure video plays whenever currentVideo changes
    useEffect(() => {
        if (currentVideo && videoRef.current) {
            videoRef.current.load(); // Ensure source is loaded
            videoRef.current.play().catch(err => console.log("Video play error:", err));
        }
    }, [currentVideo]);

    return (
        <div className="min-h-screen bg-[#F5F5DC] flex flex-col items-center justify-center p-6 text-[#4F3E34]">
            <div className="w-full max-w-2xl space-y-8 bg-white p-10 rounded-3xl shadow-2xl border border-[#4F3E34]/10">

                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight">
                        Avatar Live Translation
                    </h1>
                    <p className="text-lg opacity-80">
                        Type or speak a word to see sign translation.
                    </p>
                </div>

                {/* Search & Mic Section */}
                <form onSubmit={handleSubmit} className="flex gap-4 items-center">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Type a sentence (e.g., hello come to my home)"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full px-6 py-4 rounded-full border-2 border-[#4F3E34]/20 focus:border-[#4F3E34] outline-none transition-all text-lg shadow-sm"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleMicClick}
                        className={`p-4 rounded-full transition-all shadow-md ${isRecording
                            ? "bg-red-500 text-white animate-pulse"
                            : "bg-gray-100 hover:bg-gray-200"
                            }`}
                    >
                        <Mic size={24} />
                    </button>

                    <button
                        type="submit"
                        disabled={!inputValue.trim()}
                        className="bg-[#4F3E34] text-white p-4 rounded-full hover:bg-[#3d3128] disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all"
                    >
                        <Send size={24} />
                    </button>
                </form>

                {/* Video Player Section */}
                <div className="relative overflow-hidden rounded-2xl bg-[#4F3E34]/5 border-2 border-[#4F3E34]/10 aspect-video flex items-center justify-center">
                    {currentVideo ? (
                        <video
                            ref={videoRef}
                            key={currentVideo.video} // Change key to force re-render/reload when video source changes
                            autoPlay
                            muted
                            controls
                            playsInline
                            className="w-full h-full object-cover"
                        >
                            <source src={currentVideo.video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <div className="text-center p-8 text-gray-400">
                            {errorMsg ? (
                                <p className="text-red-500 font-medium">{errorMsg}</p>
                            ) : (
                                <p>Submit a word to play translation video.</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Watch Again Button */}
                {currentVideo && (
                    <div className="flex flex-col items-center gap-4">
                        <h3 className="text-xl font-bold capitalize underline underline-offset-4 decoration-[#4F3E34]/30">
                            {currentVideo.word}
                        </h3>
                        <button
                            onClick={handleWatchAgain}
                            className="flex items-center gap-2 px-8 py-3 bg-[#4F3E34] text-white rounded-full hover:bg-[#3d3128] transition-all font-semibold shadow-lg hover:shadow-xl active:scale-95"
                        >
                            <RotateCcw size={20} />
                            Watch Again
                        </button>
                    </div>
                )}

                {/* Fallback help message if nothing is playing */}
                {!currentVideo && !errorMsg && (
                    <p className="text-center text-sm text-[#4F3E34]/60">
                        Try: <span className="font-semibold italic">good morning, sorry, strong man</span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default AvatarTranslation;