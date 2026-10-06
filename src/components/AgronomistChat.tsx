import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  User,
  HelpCircle,
  X,
  Sprout,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  RotateCcw,
  CheckCircle,
} from 'lucide-react';
import { DiagnosisResult } from '../types/crop';
import { Language, TRANSLATIONS } from '../utils/translations';

interface AgronomistChatProps {
  diagnosis?: DiagnosisResult | null;
  language?: Language;
  onClose?: () => void;
  initialQuestion?: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'agronomist';
  text: string;
  timestamp: string;
}

export const AgronomistChat: React.FC<AgronomistChatProps> = ({
  diagnosis,
  language = 'en',
  onClose,
  initialQuestion,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const getGreeting = () => {
    if (language === 'kn') {
      return diagnosis
        ? `ನಮಸ್ಕಾರ! ನಾನು ಡಾ. ಎಲೆನಾ, ನಿಮ್ಮ ಕೃಷಿ ತಜ್ಞೆ. ನಿಮ್ಮ ${diagnosis.cropName} ಬೆಳೆಯಲ್ಲಿ ${diagnosis.diseaseName} ರೋಗದ ಪರಿಶೀಲನೆ ಮಾಡಿದ್ದೇನೆ. ರೋಗದ ಸ್ಪಷ್ಟತೆ, ಗೊಬ್ಬರದ ಪ್ರಮಾಣ, ಸಿಂಪಡಣೆ ಅಥವಾ ರೋಗ ಹರಡುವಿಕೆ ಬಗ್ಗೆ ಮೈಕ್ರೊಫೋನ್ ಮೂಲಕ ಮಾತನಾಡಿ ಅಥವಾ ಟೈಪ್ ಮಾಡಿ ಪ್ರಶ್ನಿಸಿ!`
        : `ನಮಸ್ಕಾರ! ಕೃಷಿ ಬೆಳೆ ರೋಗಗಳು, ಗೊಬ್ಬರಗಳು ಅಥವಾ ಕೀಟನಾಶಕಗಳ ಬಗ್ಗೆ ಧ್ವನಿ ಮೂಲಕ ಮಾತನಾಡಿ ಅಥವಾ ಪ್ರಶ್ನೆ ಕೇಳಿ.`;
    }
    if (language === 'hi') {
      return diagnosis
        ? `नमस्ते! मैं डॉ. एलेना, आपकी AI कृषि विशेषज्ञ हूँ। मैंने आपके ${diagnosis.cropName} में ${diagnosis.diseaseName} रोग की जांच देखी है। इस रोग के कारण, खाद की मात्रा या दवा छिड़काव के बारे में माइक से बोलकर या लिखकर बेझिझक पूछें!`
        : `नमस्ते! फसल रोग, उचित खाद या कीटनाशक छिड़काव के बारे में माइक से बोलकर या लिखकर सवाल पूछें।`;
    }
    return diagnosis
      ? `Hello! I'm Dr. Elena Greenfield, your AI Agronomist. I've reviewed your ${diagnosis.cropName} scan showing ${diagnosis.diseaseName}. Tap the microphone to speak your question or ask for any disease clarification, fertilizer dosing, or spray safety advice!`
      : `Hello! I'm your AI Agronomist. Ask or speak any question about crop diseases, pest symptoms, fertilizer prescriptions, or weather spray timing.`;
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'agronomist',
      text: getGreeting(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputQuestion, setInputQuestion] = useState<string>(initialQuestion || '');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition (Microphone)
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;

      // Set recognition language based on farmer's selected language
      if (language === 'kn') {
        recognition.lang = 'kn-IN'; // Kannada
      } else if (language === 'hi') {
        recognition.lang = 'hi-IN'; // Hindi
      } else {
        recognition.lang = 'en-IN'; // English (Indian dialect friendly)
      }

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentTranscript += event.results[i][0].transcript;
        }
        setInputQuestion(currentTranscript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch (e) {
      console.warn('SpeechRecognition initialization failed:', e);
      setSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
    };
  }, [language]);

  // Toggle microphone recording
  const toggleMicrophone = () => {
    if (!speechSupported) {
      alert(
        language === 'kn'
          ? 'ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಮೈಕ್ರೊಫೋನ್ ಸೌಲಭ್ಯ ಲಭ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಟೈಪ್ ಮಾಡಿ.'
          : language === 'hi'
          ? 'आपके ब्राउज़र में माइक उपलब्ध नहीं है। कृपया लिखकर पूछें।'
          : 'Microphone is not supported on this browser. Please type your question.'
      );
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch (e) {}
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.error('Failed to start microphone:', e);
      }
    }
  };

  // Text-to-Speech output for reading answers aloud
  const speakMessage = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMessageId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (language === 'kn') utterance.lang = 'kn-IN';
    else if (language === 'hi') utterance.lang = 'hi-IN';
    else utterance.lang = 'en-IN';

    utterance.rate = 0.95;
    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    window.speechSynthesis.speak(utterance);
    setSpeakingMessageId(msgId);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  // Handle sending question to Gemini Agronomist API
  const handleSend = async (questionToSend?: string) => {
    const q = questionToSend || inputQuestion.trim();
    if (!q || isSending) return;

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch (e) {}
      setIsListening(false);
    }

    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setIsSending(true);

    const langName = language === 'kn' ? 'Kannada' : language === 'hi' ? 'Hindi' : 'English';

    try {
      const response = await fetch('/api/ask-agronomist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          diagnosis: diagnosis || undefined,
          language: langName,
          chatHistory: messages.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text,
          })),
        }),
      });

      const data = await response.json();
      if (data.answer) {
        const botMsg: ChatMessage = {
          id: 'bot_' + Date.now(),
          sender: 'agronomist',
          text: data.answer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error(data.error || 'No answer received');
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: 'bot_err_' + Date.now(),
        sender: 'agronomist',
        text:
          language === 'kn'
            ? 'ಕ್ಷಮಿಸಿ, ಸಂಪರ್ಕ ಸಾಧಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ.'
            : language === 'hi'
            ? 'माफ़ कीजिए, संपर्क नहीं हो सका। कृपया दोबारा प्रयास करें।'
            : 'I could not connect to the agronomy engine right now. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsSending(false);
    }
  };

  // Localized sample questions
  const sampleQuestions = diagnosis
    ? language === 'kn'
      ? [
          `ಈ ರೋಗ ಬರುವುದಕ್ಕೆ ಮುಖ್ಯ ಕಾರಣವೇನು?`,
          `ಶಿಫಾರಸು ಮಾಡಿದ ${diagnosis.fertilizerAdvisory?.recommendedFertilizers?.[0]?.name || 'ಗೊಬ್ಬರವನ್ನು'} ಹೇಗೆ ಬಳಸಬೇಕು?`,
          `ಹೂವು ಅಥವಾ ಕಾಯಿ ಬಿಡುವಾಗ ಈ ಔಷಧಿಯನ್ನು ಸಿಂಪಡಿಸಬಹುದೇ?`,
          `ಇದು ಪಕ್ಕದ ಗಿಡಗಳಿಗೂ ಹರಡುತ್ತದೆಯೇ?`,
        ]
      : language === 'hi'
      ? [
          `यह रोग फसल में क्यों और कैसे फैला?`,
          `अनुशंसित ${diagnosis.fertilizerAdvisory?.recommendedFertilizers?.[0]?.name || 'खाद'} की सही मात्रा क्या है?`,
          `क्या फूल आने की अवस्था में दवा का छिड़काव सुरक्षित है?`,
          `क्या यह पड़ोस के पौधों में भी फैल सकता है?`,
        ]
      : [
          `What caused this disease to develop in my crop?`,
          `How exactly do I apply the recommended ${diagnosis.fertilizerAdvisory?.recommendedFertilizers?.[0]?.name || 'fertilizer'}?`,
          `Is it safe to spray while the crop is flowering?`,
          `Can this disease spread to neighboring plants?`,
        ]
    : language === 'kn'
    ? [
        'ಬೆಳೆಗಳಿಗೆ ರೋಗ ಬರದಂತೆ ಯಾವ ಮುನ್ನೆಚ್ಚರಿಕೆ ವಹಿಸಬೇಕು?',
        'ಸಾವಯವ ಪದ್ಧತಿಯಲ್ಲಿ ಬೂದಿ ರೋಗವನ್ನು ಹೇಗೆ ನಿಯಂತ್ರಿಸುವುದು?',
        'ಮಳೆಯ ನಂತರ ಯಾವ ಗೊಬ್ಬರ ಹಾಕುವುದು ಸೂಕ್ತ?',
      ]
    : language === 'hi'
    ? [
        'फसल में रोगों से बचाव के लिए क्या उपाय करें?',
        'जैविक तरीके से फफूंद जनित रोगों का नियंत्रण कैसे करें?',
        'बारिश के तुरंत बाद कौन सी खाद डालनी चाहिए?',
      ]
    : [
        'How do I prevent fungal leaf blights naturally?',
        'What fertilizer builds plant immunity against pests?',
        'What are the optimal weather conditions to spray fungicides?',
      ];

  return (
    <div className="w-full max-w-4xl mx-auto bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[620px] text-stone-100">
      {/* Header */}
      <div className="px-5 py-3.5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-100 flex items-center gap-1.5">
              <span>{language === 'kn' ? 'ಡಾ. ಎಲೆನಾ (ಕೃಷಿ ತಜ್ಞೆ)' : language === 'hi' ? 'डॉ. एलेना (कृषि विशेषज्ञ)' : 'Dr. Elena Greenfield'}</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded-full font-normal">
                {language === 'kn' ? 'AI ಕೃಷಿ ವೈದ್ಯೆ' : language === 'hi' ? 'AI कृषि डॉक्टर' : 'AI Agronomist'}
              </span>
            </h3>
            <p className="text-[11px] text-stone-400">
              {diagnosis
                ? `${diagnosis.cropName} (${diagnosis.diseaseName})`
                : language === 'kn'
                ? 'ಧ್ವನಿ ಅಥವಾ ಪಠ್ಯದ ಮೂಲಕ ಪ್ರಶ್ನಿಸಿ'
                : language === 'hi'
                ? 'आवाज़ या लिखकर सवाल पूछें'
                : 'Ask or speak disease questions'}
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-950/40">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.sender === 'user'
                  ? 'bg-stone-700 text-white'
                  : 'bg-emerald-600 text-stone-950'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Sprout className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3.5 text-xs leading-relaxed relative group ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-stone-950 font-medium rounded-tr-none'
                  : 'bg-stone-900 border border-stone-800 text-stone-200 rounded-tl-none whitespace-pre-line shadow-md'
              }`}
            >
              <p>{msg.text}</p>

              <div className="flex items-center justify-between gap-3 mt-2 pt-1 border-t border-black/10 text-[9px] text-stone-400">
                <span>{msg.timestamp}</span>

                {msg.sender === 'agronomist' && (
                  <button
                    onClick={() => speakMessage(msg.id, msg.text)}
                    className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                    title="Listen in voice"
                  >
                    {speakingMessageId === msg.id ? (
                      <>
                        <VolumeX className="w-3 h-3 text-amber-400" />
                        <span>Stop</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3 h-3" />
                        <span>Speak</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {isSending && (
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-stone-950 flex items-center justify-center shrink-0">
              <Sprout className="w-4 h-4" />
            </div>
            <div className="bg-stone-900 border border-stone-800 rounded-2xl rounded-tl-none p-3 text-xs text-stone-400 flex items-center gap-2">
              <div className="w-3.5 h-3.5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
              <span>
                {language === 'kn'
                  ? 'ಕೃಷಿ ತಜ್ಞರು ಉತ್ತರಿಸುತ್ತಿದ್ದಾರೆ...'
                  : language === 'hi'
                  ? 'कृषि विशेषज्ञ उत्तर तैयार कर रहे हैं...'
                  : 'Analyzing agronomic recommendations...'}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Mic Audio Ripple Active Indicator */}
      {isListening && (
        <div className="px-4 py-2 bg-emerald-950/80 border-t border-emerald-700/80 flex items-center justify-between text-xs text-emerald-300 animate-pulse">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="font-semibold">
              {language === 'kn'
                ? 'ಧ್ವನಿ ಆಲಿಸುತ್ತಿದೆ... ಮಾತನಾಡಿ (ಕನ್ನಡ)'
                : language === 'hi'
                ? 'आवाज़ सुन रहा है... बोलिए (हिन्दी)'
                : 'Listening to your voice... Speak now'}
            </span>
          </div>
          <button
            onClick={toggleMicrophone}
            className="text-[11px] underline text-emerald-200 hover:text-white"
          >
            {language === 'kn' ? 'ನಿಲ್ಲಿಸಿ' : language === 'hi' ? 'रोकें' : 'Done Speaking'}
          </button>
        </div>
      )}

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 bg-stone-950 border-t border-stone-800 overflow-x-auto flex items-center gap-2 no-scrollbar">
        <span className="text-[10px] text-stone-500 font-semibold shrink-0 uppercase">
          {t.quickAsk}
        </span>
        {sampleQuestions.map((sq, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(sq)}
            className="text-[11px] bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white px-2.5 py-1 rounded-full border border-stone-800 hover:border-emerald-500/50 whitespace-nowrap transition-colors"
          >
            {sq}
          </button>
        ))}
      </div>

      {/* Input Form with Microphone Button */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-stone-950 border-t border-stone-800 flex items-center gap-2"
      >
        {/* Microphone Voice Input Button */}
        <button
          type="button"
          onClick={toggleMicrophone}
          className={`p-2.5 rounded-xl border transition-all ${
            isListening
              ? 'bg-red-500 text-white border-red-400 shadow-lg shadow-red-500/50 animate-pulse'
              : 'bg-stone-900 hover:bg-stone-800 text-emerald-400 border-stone-700 hover:border-emerald-500'
          }`}
          title={
            language === 'kn'
              ? 'ಧ್ವನಿ ಮೂಲಕ ಮಾತನಾಡಲು ಮೈಕ್ ಕ್ಲಿಕ್ ಮಾಡಿ'
              : language === 'hi'
              ? 'बोलकर पूछने के लिए माइक दबाएं'
              : 'Tap microphone to speak your question'
          }
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        <input
          type="text"
          placeholder={
            isListening
              ? language === 'kn'
                ? 'ಮಾತನಾಡಿ... ಧ್ವನಿ ದಾಖಲಾಗುತ್ತಿದೆ'
                : language === 'hi'
                ? 'बोलिए... आवाज़ रिकॉर्ड हो रही है'
                : 'Listening... speak your question'
              : t.chatPlaceholder
          }
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          disabled={isSending}
          className="flex-1 bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500"
        />

        <button
          type="submit"
          disabled={!inputQuestion.trim() || isSending}
          className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-stone-950 font-bold transition-all shadow-md flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
