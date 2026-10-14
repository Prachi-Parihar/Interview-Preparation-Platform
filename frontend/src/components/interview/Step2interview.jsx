import React, { useEffect, useRef, useState } from "react";
import interviewImage from "../../assets/interview.jpg";
import { AnimatePresence, motion } from "motion/react";
import {
  FiArrowRight,
  FiCamera,
  FiCameraOff,
  FiCheckCircle,
  FiClock,
  FiCode,
  FiMessageSquare,
  FiMic,
  FiMicOff,
} from "react-icons/fi";
import CodeEditor from "./CodeEditor.jsx";
import Timer from "./Timer.jsx";
import { submitAnswer } from "../../apis/interviewApi.js";
import { useNavigate } from "react-router-dom";

function Step2interview({ interviewData, user }) {
  const navigate = useNavigate();

  const [question, setQuestion] = useState(
    interviewData?.question || {}
  );
  const [currentIndex, setCurrentIndex] = useState(
    interviewData?.currentQuestion ?? 0
  );
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(
    interviewData?.question?.timer || 60
  );

  const [micOn, setMicOn] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);
  const [isAIPlaying, setIsAIPlaying] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [voiceReady, setVoiceReady] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);

  const userVideoRef = useRef(null);
  const recognitionRef = useRef(null);
  const streamRef = useRef(null);
  const submittingRef = useRef(false);
  const answerRef = useRef("");
  const micPreferenceRef = useRef(false);
  const speechIdRef = useRef(0);
  const previousQuestionRef = useRef(null);
  const interviewStartedRef = useRef(false);
  const timeoutHandledRef = useRef(false);
  const submitRef = useRef(null);

  const totalQuestions = interviewData?.totalQuestions || 1;

  const progress = Math.min(
    ((currentIndex + 1) / totalQuestions) * 100,
    100
  );

  const firstName = user?.name?.split(" ")[0] || "User";

  const updateAnswer = (value) => {
    answerRef.current = value;
    setAnswer(value);
  };

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      setVoiceReady(true);
      return;
    }

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();

      if (!voices.length) return;

      const preferred =
        voices.find((voice) => /zira|samantha/i.test(voice.name)) ||
        voices.find((voice) => voice.lang?.startsWith("en")) ||
        voices[0];

      setSelectedVoice(preferred);
      setVoiceReady(true);
    };

    loadVoices();

    window.speechSynthesis.addEventListener(
      "voiceschanged",
      loadVoices
    );

    return () => {
      window.speechSynthesis.removeEventListener(
        "voiceschanged",
        loadVoices
      );
    };
  }, []);

  const speakText = (text) =>
    new Promise((resolve) => {
      if (!text?.trim() || !("speechSynthesis" in window)) {
        resolve();
        return;
      }

      const speechId = ++speechIdRef.current;
      const synth = window.speechSynthesis;

      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang || "en-US";
      } else {
        utterance.lang = "en-US";
      }

      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      const finishSpeech = () => {
        if (speechId !== speechIdRef.current) {
          resolve();
          return;
        }

        setIsAIPlaying(false);
        setSubtitle("");
        resolve();
      };

      utterance.onstart = () => {
        if (speechId !== speechIdRef.current) return;

        setIsAIPlaying(true);
        setSubtitle(text);
      };

      utterance.onend = finishSpeech;
      utterance.onerror = finishSpeech;

      setSubtitle(text);
      synth.speak(utterance);
    });

  const startInterview = async () => {
    if (interviewStartedRef.current) return;

    interviewStartedRef.current = true;
    setInterviewStarted(true);

    await speakText(
      `Welcome ${firstName}! Let's begin your interview.`
    );

    if (question?.question) {
      previousQuestionRef.current = question;
      await speakText(question.question);
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      let spokenText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          spokenText += event.results[i][0].transcript + " ";
        }
      }

      if (spokenText.trim()) {
        updateAnswer(
          `${answerRef.current}${answerRef.current ? " " : ""}${spokenText.trim()}`
        );
      }
    };

    recognition.onerror = (event) => {
      console.error("Microphone error:", event.error);

      if (
        event.error === "not-allowed" ||
        event.error === "service-not-allowed"
      ) {
        micPreferenceRef.current = false;
        setMicOn(false);
      }
    };

    recognition.onend = () => {
      if (
        micPreferenceRef.current &&
        !submittingRef.current &&
        !isAIPlaying
      ) {
        try {
          recognition.start();
        } catch {
          // Recognition may already be active.
        }
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.onend = null;
      recognition.abort();
      recognitionRef.current = null;
    };
  }, [isAIPlaying]);

  const startMic = () => {
    if (!recognitionRef.current) {
      alert(
        "Speech recognition is not supported. Please use Chrome or Edge."
      );
      return;
    }

    micPreferenceRef.current = true;
    setMicOn(true);

    try {
      recognitionRef.current.start();
    } catch (error) {
      console.warn("Microphone could not start:", error);
    }
  };

  const stopMic = () => {
    micPreferenceRef.current = false;
    setMicOn(false);

    try {
      recognitionRef.current?.stop();
    } catch {
      // Microphone is already stopped.
    }
  };

  const toggleMic = () => {
    if (micPreferenceRef.current) {
      stopMic();
    } else {
      startMic();
    }
  };

  const toggleCamera = async () => {
    if (cameraOn) {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setCameraOn(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      streamRef.current = stream;
      setCameraOn(true);

      if (userVideoRef.current) {
        userVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Camera error:", error);
      alert("Camera permission nahi mili. Browser settings check karein.");
    }
  };

  useEffect(() => {
    if (cameraOn && userVideoRef.current && streamRef.current) {
      userVideoRef.current.srcObject = streamRef.current;
    }
  }, [cameraOn]);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      speechIdRef.current += 1;
      window.speechSynthesis?.cancel();
    };
  }, []);

  useEffect(() => {
    setQuestion(interviewData?.question || {});
    setCurrentIndex(interviewData?.currentQuestion ?? 0);
  }, [interviewData]);

  useEffect(() => {
    setTimeLeft(question?.timer || 60);
    timeoutHandledRef.current = false;
  }, [question]);

  useEffect(() => {
    if (!interviewStarted || !question?.question) return;
    if (previousQuestionRef.current === question) return;

    previousQuestionRef.current = question;
    speakText(question.question);
  }, [question, interviewStarted]);

  useEffect(() => {
    if (!interviewStarted || loading || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((previous) => Math.max(0, previous - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, loading, interviewStarted]);

  const submit = async (isTimeout = false) => {
    if (submittingRef.current || loading) return;

    const finalAnswer = answerRef.current.trim();

    if (!finalAnswer) {
      if (isTimeout) {
        timeoutHandledRef.current = true;
        setTimeLeft(0);
        alert(
          "Time is over. Please enter an answer before submitting, or leave the interview and resume it later."
        );
      } else {
        alert("Please enter or speak your answer first.");
      }

      return;
    }

    submittingRef.current = true;
    setLoading(true);
    stopMic();

    try {
      const response = await submitAnswer({
        interviewId: interviewData?.interviewId,
        answer: finalAnswer,
      });

      if (!response?.success) {
        throw new Error(
          response?.message || "Answer could not be submitted."
        );
      }

      setFeedback(response?.feedback || null);

      if (response?.completed === true) {
        await speakText(
          response?.feedback?.feedback ||
            "Your interview is complete. Preparing your report."
        );

        navigate(`/interview/${interviewData.interviewId}/report`);
        return;
      }

      if (!response?.question) {
        throw new Error("Next question was not returned by the server.");
      }

      await speakText(
        response?.feedback?.feedback ||
          "Thank you for your answer. Let's move to the next question."
      );

      previousQuestionRef.current = null;
      setQuestion(response.question);
      setCurrentIndex(response.currentQuestion ?? currentIndex + 1);
      updateAnswer("");
      setFeedback(null);
      timeoutHandledRef.current = false;
    } catch (error) {
      console.error("Submit answer error:", error);

      alert(
        error?.response?.data?.message ||
          error.message ||
          "Answer submit nahi hua. Please try again."
      );
    } finally {
      setLoading(false);
      submittingRef.current = false;
    }
  };

  submitRef.current = submit;

  useEffect(() => {
    if (
      !interviewStarted ||
      timeLeft !== 0 ||
      loading ||
      submittingRef.current ||
      timeoutHandledRef.current
    ) {
      return;
    }

    timeoutHandledRef.current = true;

    if (answerRef.current.trim()) {
      submitRef.current(true);
    } else {
      alert("Time is over. Please provide an answer before continuing.");
    }
  }, [timeLeft, loading, interviewStarted]);

  const handleBack = () => {
    stopMic();
    window.speechSynthesis?.cancel();
    navigate("/dashboard");
  };

  const handleSubmitCode = (code) => {
    const separator = answerRef.current.trim()
      ? "\n\n--- Code ---\n"
      : "--- Code ---\n";

    updateAnswer(answerRef.current + separator + code);
    setCodeOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="sticky top-0 z-30 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <button type="button" onClick={handleBack} className="text-left">
            <h1 className="text-base font-bold tracking-tight text-gray-900">
              Interview<span className="text-[#ab2552]">AI</span>
            </h1>
            <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-400">
              Interview Prep
            </p>
          </button>

          <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700">
            AI Interview
          </span>
        </div>
      </nav>

      {codeOpen && (
        <CodeEditor
          onClose={() => setCodeOpen(false)}
          onSubmitCode={handleSubmitCode}
        />
      )}

      <div className="px-3 py-4 sm:px-5 sm:py-5">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:grid-cols-[0.78fr_1.22fr]"
        >
          <div className="flex flex-col gap-4 border-b border-gray-200 bg-gray-50 p-4 sm:p-5 lg:border-b-0 lg:border-r">

            <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-200 bg-gray-900">
              <img
                src={interviewImage}
                alt="AI Interviewer"
                className="h-full w-full object-cover"
              />

              <div className="absolute left-3 top-3 rounded-md bg-black/60 px-2.5 py-1 text-xs text-white">
                AI Interviewer
              </div>

              {isAIPlaying && (
                <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-xs text-white">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                  AI Speaking
                </div>
              )}
            </div>

            {!interviewStarted && (
              <button
                type="button"
                onClick={startInterview}
                disabled={!voiceReady}
                className="flex h-10 items-center justify-center gap-2 rounded-xl bg-black px-4 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {voiceReady ? "Start AI Interview" : "Loading AI Voice..."}
                <FiArrowRight size={16} />
              </button>
            )}

            <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white">
              {cameraOn ? (
                <video
                  ref={userVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="h-full w-full scale-x-[-1] object-cover"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-xl font-bold text-gray-700">
                    {firstName.charAt(0).toUpperCase()}
                  </div>
                  <p className="mt-2 text-sm font-medium text-gray-800">
                    {firstName}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Camera is off
                  </p>
                </div>
              )}

              <div className="absolute left-3 top-3 rounded-md bg-black/60 px-2.5 py-1 text-xs text-white">
                You
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-3">

              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={toggleMic}
                  title={micOn ? "Turn microphone off" : "Turn microphone on"}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                    micOn
                      ? "border-black bg-black text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {micOn ? <FiMic size={18} /> : <FiMicOff size={18} />}
                </button>

                <button
                  type="button"
                  onClick={toggleCamera}
                  title={cameraOn ? "Turn camera off" : "Turn camera on"}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                    cameraOn
                      ? "border-black bg-black text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {cameraOn ? (
                    <FiCamera size={18} />
                  ) : (
                    <FiCameraOff size={18} />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setCodeOpen(true)}
                  title="Open code editor"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
                >
                  <FiCode size={18} />
                </button>
              </div>

              <p className="mt-3 text-center text-xs leading-5 text-gray-400">
                {micOn
                  ? "Microphone is enabled"
                  : "Use the mic button to speak your answer"}
              </p>
            </div>
          </div>

          <div className="flex min-w-0 flex-col p-2 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Interview Questions
                </h2>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                    {question?.difficulty || "General"}
                  </span>

                  <span className="flex items-center gap-1.5 text-xs text-gray-500">
                    <FiClock size={13} />
                    Time remaining
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <Timer
                  timeLeft={timeLeft}
                  totalTime={question?.timer || 60}
                />
              </div>
            </div>

            <div className="mt-2">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-medium text-gray-600">
                  Interview Progress
                </span>
                <span className="font-semibold text-gray-900">
                  {currentIndex + 1} / {totalQuestions}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <motion.div
                  className="h-full rounded-full bg-black"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 rounded-xl border border-gray-200 bg-gray-50 p-2"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white">
                  <FiMessageSquare size={17} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Question {currentIndex + 1}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Read carefully before answering
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-gray-800">
                {question?.question || "Loading question..."}
              </p>
            </motion.div>

            <div className="mt-2 flex flex-1 flex-col">
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="interviewAnswer"
                  className="text-sm font-semibold text-gray-800"
                >
                  Your Answer
                </label>

                <span className="text-xs text-gray-400">
                  Ctrl + Enter to submit
                </span>
              </div>

              <textarea
                id="interviewAnswer"
                value={answer}
                onChange={(event) => updateAnswer(event.target.value)}
                onKeyDown={(event) => {
                  if (
                    event.ctrlKey &&
                    event.key === "Enter" &&
                    !loading
                  ) {
                    submit();
                  }
                }}
                rows={6}
                placeholder="Type your answer here or use the microphone to speak..."
                className="min-h-36 w-full flex-1 resize-y rounded-xl border border-gray-200 bg-white p-3 text-sm leading-6 text-gray-800 outline-none placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
              />

              <p className="mt-2 text-xs text-gray-400">
                Tip: Explain your approach and include examples where possible.
              </p>
            </div>

            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4"
                >
                  <div className="flex items-center gap-2">
                    <FiCheckCircle size={17} className="text-green-700" />
                    <h3 className="text-sm font-semibold text-green-800">
                      AI Feedback
                    </h3>
                  </div>

                  <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-700">
                    {feedback?.feedback || "Your answer has been evaluated."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-5 border-t border-gray-100 pt-4">
              <button
                type="button"
                onClick={() => submit()}
                disabled={loading || !answer.trim() || !interviewStarted}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#a02747] px-5 text-sm font-semibold text-white hover:bg-[#9e1d3f] disabled:cursor-not-allowed disabled:opacity-40 sm:ml-auto sm:w-auto sm:min-w-40"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Answer
                    <FiArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Step2interview;
