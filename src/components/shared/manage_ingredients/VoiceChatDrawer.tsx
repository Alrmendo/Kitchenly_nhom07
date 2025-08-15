import { GeminiServiceAddIngredients } from "@/services/geminiServiceAddIngredients";
import { Mic, MicOff, Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  ingredients?: Array<{
    name: string;
    category: string;
    amount: string;
    unit: string;
    icon: string;
  }>;
}

interface VoiceChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddIngredients?: (ingredients: any[]) => void;
}

export function VoiceChatDrawer({ isOpen, onClose, onAddIngredients }: VoiceChatDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const finalTranscriptRef = useRef<string>(""); // Store accumulated final transcript
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Cleanup recognition when component unmounts or closes
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen && recognitionRef.current) {
      stopVoiceRecording();
    }
  }, [isOpen]);

  // Auto-resize textarea when textInput changes (from voice recognition)
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 128) + "px";
    }
  }, [textInput]);

  // Handle smooth closing animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // Match the animation duration
  };

  // Start voice recording using Web Speech API with continuous recognition
  const startVoiceRecording = async () => {
    if (isRecording) {
      // Stop recording
      stopVoiceRecording();
      return;
    }

    try {
      if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
        throw new Error("Speech recognition not supported in this browser");
      }

      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.lang = "vi-VN"; // Vietnamese
      recognition.continuous = true; // Keep listening continuously
      recognition.interimResults = true; // Show real-time results
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        console.log("Web Speech API started listening...");
        setIsRecording(true);
        setTextInput(""); // Clear input when starting
        finalTranscriptRef.current = ""; // Reset accumulated transcript
      };

      recognition.onresult = (event: any) => {
        let interimTranscript = "";
        let newFinalTranscript = "";

        // Process all results from the current event
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            newFinalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        // Accumulate final results to preserve previous speech segments
        if (newFinalTranscript) {
          finalTranscriptRef.current += newFinalTranscript;
        }

        // Display accumulated final transcript + current interim results
        const displayText = finalTranscriptRef.current + interimTranscript;
        setTextInput(displayText);
        console.log("Transcription:", displayText);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
        const errorMessage = {
          id: Date.now().toString(),
          text: `Lỗi nhận diện giọng nói: ${event.error}. Vui lòng thử lại.`,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      };

      recognition.onend = () => {
        console.log("Speech recognition ended");
        // If we're still supposed to be recording, restart recognition
        if (isRecording && recognitionRef.current) {
          console.log("Restarting recognition to continue listening...");
          try {
            recognitionRef.current.start();
          } catch (error) {
            console.warn("Could not restart recognition:", error);
            setIsRecording(false);
          }
        } else {
          setIsRecording(false);
        }
      };

      console.log("Starting continuous Web Speech API recognition...");
      recognition.start();
    } catch (error) {
      console.error("Voice recognition failed:", error);
      const errorMessage = {
        id: Date.now().toString(),
        text: "Lỗi khởi động nhận diện giọng nói. Vui lòng thử lại.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  // Stop voice recording
  const stopVoiceRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setIsRecording(false);
      // Keep the final accumulated text in the input box
      // Don't reset finalTranscriptRef here so the text stays in the input
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setTextInput("");
    finalTranscriptRef.current = ""; // Reset accumulated transcript after sending
    setIsLoading(true);

    try {
      // Send to Gemini API for processing
      const response = await processWithGemini(text);

      // Add AI response
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isUser: false,
        timestamp: new Date(),
        ingredients: response.ingredients,
      };
      setMessages((prev) => [...prev, aiMessage]);

      // If AI extracted ingredients, add them
      if (response.ingredients && response.ingredients.length > 0) {
        onAddIngredients?.(response.ingredients);
      }
    } catch (error) {
      console.error("Error processing message:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Xin lỗi, tôi gặp lỗi khi xử lý yêu cầu của bạn. Vui lòng thử lại.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const processWithGemini = async (text: string) => {
    try {
      // Use Gemini API for processing - this should handle ALL ingredients
      const response = await GeminiServiceAddIngredients.processTextWithGemini(text);

      // If Gemini found ingredients, use them
      if (response.ingredients && response.ingredients.length > 0) {
        return response;
      }

      // If Gemini didn't find ingredients but gave a response, return that
      if (response.text) {
        return {
          text: response.text,
          ingredients: [],
        };
      }

      // Last resort fallback
      throw new Error("Gemini returned empty response");
    } catch (error) {
      console.error("Gemini API failed", error);
      return {
        text: "Xin lỗi, tôi gặp sự cố với AI.",
        ingredients: [],
      };
    }
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70" onClick={handleClose} />

      {/* Drawer */}
      <div className={`relative h-4/5 w-full rounded-t-2xl bg-white shadow-lg ${isClosing ? "animate-slide-down" : "animate-slide-up"}`}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Trợ lý AI bằng giọng nói</h3>
          </div>
          <button onClick={handleClose} className="rounded-full p-2 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-full flex-1 overflow-y-auto p-4 pb-44">
          {messages.length === 0 && (
            <div className="mt-8 text-center text-gray-500">
              <div className="mb-2 text-4xl">🎤</div>
              <p>Nói hoặc gõ để bắt đầu trò chuyện với AI</p>
              <p className="mt-1 text-sm">AI có thể giúp bạn thêm nguyên liệu</p>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`mb-4 flex ${message.isUser ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs rounded-2xl px-4 py-2 ${message.isUser ? "bg-[#ff8c94] text-white" : "bg-gray-100 text-gray-800"}`}>
                <p className="text-sm">{message.text}</p>
                {message.ingredients && message.ingredients.length > 0 && (
                  <div className="mt-2 border-t border-gray-300 pt-2">
                    <p className="mb-1 text-xs opacity-75">Đã thêm nguyên liệu:</p>
                    {message.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center gap-1 text-xs">
                        <span>{ingredient.icon}</span>
                        <span>
                          {ingredient.name} - {ingredient.amount}
                          {ingredient.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-1 text-xs opacity-75">{message.timestamp.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}</div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="mb-4 flex justify-start">
              <div className="rounded-2xl bg-gray-100 px-4 py-2">
                <div className="flex gap-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0.1s" }}></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="absolute right-0 bottom-0 left-0 border-t border-gray-200 bg-white p-4">
          <div className="flex items-end gap-2">
            <div className="flex flex-1 items-end rounded-2xl bg-gray-100 px-4 py-2">
              <textarea
                ref={textareaRef}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage(textInput))}
                placeholder="Nói để tương tác..."
                className="max-h-32 min-h-[20px] flex-1 resize-none overflow-y-auto bg-transparent text-sm outline-none"
                disabled={isRecording}
                rows={1}
                style={{
                  height: "auto",
                  minHeight: "20px",
                  maxHeight: "128px",
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height = Math.min(target.scrollHeight, 128) + "px";
                }}
              />
              <button onClick={() => sendMessage(textInput)} disabled={!textInput.trim() || isLoading} className="ml-2 flex-shrink-0 p-1 text-[#ff8c94] disabled:text-gray-400">
                <Send className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={startVoiceRecording}
              disabled={isLoading}
              className={`flex-shrink-0 rounded-full p-3 ${isRecording ? "animate-pulse bg-red-500 text-white" : "bg-[#ff8c94] text-white hover:bg-[#ff7a85]"} disabled:opacity-50`}>
              {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
          </div>

          <div className="mt-2 text-center">
            <p className="text-xs text-gray-500">{isRecording ? "Đang nghe... Nhấn để dừng" : "Nhấn để nói hoặc gõ tin nhắn"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
