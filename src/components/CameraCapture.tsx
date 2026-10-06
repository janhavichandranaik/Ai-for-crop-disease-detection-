import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Camera,
  RotateCcw,
  Upload,
  Sparkles,
  SwitchCamera,
  Zap,
  Timer,
  CheckCircle,
  AlertCircle,
  X,
  FileImage,
  Leaf,
} from 'lucide-react';
import { SAMPLE_CROPS, SampleCrop } from '../data/sampleCrops';
import { TRANSLATIONS, Language } from '../utils/translations';

interface CameraCaptureProps {
  onCapture: (base64Data: string, mimeType: string, cropHint?: string, notes?: string) => void;
  isAnalyzing: boolean;
  language?: Language;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, isAnalyzing, language = 'en' }) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [mode, setMode] = useState<'camera' | 'upload'>('camera');
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [capturedMimeType, setCapturedMimeType] = useState<string>('image/jpeg');
  const [cropHint, setCropHint] = useState<string>('Auto-detect');
  const [customCrop, setCustomCrop] = useState<string>('');
  const [fieldNotes, setFieldNotes] = useState<string>('');
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isCountingDown, setIsCountingDown] = useState<boolean>(false);
  const [countdownValue, setCountdownValue] = useState<number>(0);
  const [flashTrigger, setFlashTrigger] = useState<boolean>(false);
  const [hasTorch, setHasTorch] = useState<boolean>(false);
  const [torchOn, setTorchOn] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const commonCrops = [
    'Auto-detect',
    'Tomato',
    'Potato',
    'Corn / Maize',
    'Wheat',
    'Rice / Paddy',
    'Grape',
    'Apple',
    'Soybean',
    'Cotton',
    'Chili / Pepper',
    'Banana',
    'Citrus / Orange',
    'Other (Type)',
  ];

  // Stop camera stream cleanly
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
    setTorchOn(false);
  }, []);

  // Start camera stream
  const startCamera = useCallback(async () => {
    setCameraError(null);
    stopCamera();

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch((e) => console.error('Video play error:', e));
        };
      }

      setIsCameraActive(true);

      // Check for torch capability
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities ? (track.getCapabilities() as any) : {};
      if (capabilities && 'torch' in capabilities) {
        setHasTorch(true);
      } else {
        setHasTorch(false);
      }
    } catch (err: any) {
      console.warn('Camera access failed, falling back to upload view:', err);
      let msg = 'Unable to access camera. Please check browser permissions or use file upload.';
      if (err.name === 'NotAllowedError') {
        msg = 'Camera permission was denied. Please allow camera access in your browser or upload a photo.';
      } else if (err.name === 'NotFoundError') {
        msg = 'No camera found on this device. Please upload an image from your files.';
      }
      setCameraError(msg);
      setIsCameraActive(false);
      setMode('upload');
    }
  }, [facingMode, stopCamera]);

  useEffect(() => {
    if (mode === 'camera' && !capturedImage) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [mode, facingMode, capturedImage, startCamera, stopCamera]);

  // Flip camera between front and rear
  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  // Toggle torch / flash
  const toggleTorch = async () => {
    if (streamRef.current) {
      const track = streamRef.current.getVideoTracks()[0];
      if (track) {
        try {
          const nextTorch = !torchOn;
          await (track as any).applyConstraints({
            advanced: [{ torch: nextTorch }],
          });
          setTorchOn(nextTorch);
        } catch (e) {
          console.error('Torch toggle failed:', e);
        }
      }
    }
  };

  // Sound effect via Web Audio API
  const playShutterSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.09);
    } catch (e) {
      // Audio optional
    }
  };

  // Execute snapshot from video element
  const takeSnapshot = () => {
    if (!videoRef.current) return;

    playShutterSound();
    setFlashTrigger(true);
    setTimeout(() => setFlashTrigger(false), 200);

    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      // If front camera, flip horizontally for natural look
      if (facingMode === 'user') {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      setCapturedImage(dataUrl);
      setCapturedMimeType('image/jpeg');
      stopCamera();
    }
  };

  // Handle capture with optional countdown timer
  const handleCaptureClick = () => {
    if (timerSeconds > 0) {
      setIsCountingDown(true);
      setCountdownValue(timerSeconds);
      let current = timerSeconds;
      const interval = setInterval(() => {
        current -= 1;
        setCountdownValue(current);
        if (current <= 0) {
          clearInterval(interval);
          setIsCountingDown(false);
          takeSnapshot();
        }
      }, 1000);
    } else {
      takeSnapshot();
    }
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCapturedImage(result);
        setCapturedMimeType(file.type || 'image/jpeg');
        stopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCapturedImage(result);
        setCapturedMimeType(file.type || 'image/jpeg');
        stopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  // Retake photo
  const handleRetake = () => {
    setCapturedImage(null);
    if (mode === 'camera') {
      startCamera();
    }
  };

  // Trigger analysis
  const handleAnalyze = () => {
    if (!capturedImage) return;
    const finalHint = cropHint === 'Other (Type)' ? customCrop : cropHint === 'Auto-detect' ? undefined : cropHint;
    onCapture(capturedImage, capturedMimeType, finalHint, fieldNotes);
  };

  // Load a demo sample crop
  const handleSelectSample = async (sample: SampleCrop) => {
    try {
      // Fetch the sample image and convert to data URL so Gemini gets standard base64
      const response = await fetch(sample.imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        setCapturedImage(base64data);
        setCapturedMimeType(blob.type || 'image/jpeg');
        setCropHint(sample.crop.split(' ')[0] || 'Auto-detect');
        setFieldNotes(`Inspecting leaf sample: ${sample.name}`);
        stopCamera();
      };
      reader.readAsDataURL(blob);
    } catch (e) {
      console.error('Failed to load sample image:', e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-stone-900/90 backdrop-blur-md rounded-2xl border border-stone-700/60 shadow-2xl overflow-hidden text-stone-100">
      {/* Hidden canvas for capturing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Top Controls Bar */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-stone-950/80 border-b border-stone-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-stone-200">Crop Health Scanner</h2>
            <p className="text-xs text-stone-400">Take leaf photo or upload field picture</p>
          </div>
        </div>

        {/* Mode Switch Tabs */}
        {!capturedImage && (
          <div className="flex items-center bg-stone-900 p-1 rounded-xl border border-stone-800">
            <button
              onClick={() => {
                setMode('camera');
                setCameraError(null);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                mode === 'camera'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              {t.camera}
            </button>
            <button
              onClick={() => {
                setMode('upload');
                stopCamera();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                mode === 'upload'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              {t.upload}
            </button>
          </div>
        )}
      </div>

      {/* Main Viewport Container */}
      <div className="relative bg-stone-950 flex flex-col items-center justify-center min-h-[380px] sm:min-h-[460px] max-h-[560px] overflow-hidden">
        {/* Flash animation layer */}
        {flashTrigger && (
          <div className="absolute inset-0 bg-white z-50 animate-pulse pointer-events-none" />
        )}

        {/* Countdown overlay */}
        {isCountingDown && (
          <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-xs flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-emerald-600/80 border-4 border-emerald-400 flex items-center justify-center text-white text-5xl font-black animate-ping">
              {countdownValue}
            </div>
          </div>
        )}

        {/* 1. Captured Image Preview State */}
        {capturedImage ? (
          <div className="relative w-full h-full flex items-center justify-center bg-black/90 p-3">
            <img
              src={capturedImage}
              alt="Leaf sample to diagnose"
              className="max-h-[420px] max-w-full rounded-xl object-contain border border-stone-700 shadow-xl"
            />
            <div className="absolute top-5 left-5 bg-stone-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-700 flex items-center gap-2 text-xs text-stone-200">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>{t.takePhoto}</span>
            </div>
            <button
              onClick={handleRetake}
              disabled={isAnalyzing}
              className="absolute top-5 right-5 bg-stone-900/80 hover:bg-stone-800 text-stone-200 px-3.5 py-1.5 rounded-full border border-stone-700 text-xs font-medium flex items-center gap-1.5 transition-colors shadow-lg"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {t.retake}
            </button>
          </div>
        ) : mode === 'camera' ? (
          /* 2. Live Camera Viewfinder */
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover max-h-[500px] ${
                facingMode === 'user' ? 'scale-x-[-1]' : ''
              }`}
            />

            {/* Viewfinder Target Overlay */}
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 border-2 border-emerald-500/60 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.25)]">
                {/* Viewfinder corner brackets */}
                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-emerald-400 rounded-tl-lg" />
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-emerald-400 rounded-tr-lg" />
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-emerald-400 rounded-bl-lg" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-emerald-400 rounded-br-lg" />

                {/* Center crosshair */}
                <div className="w-8 h-8 border border-emerald-400/50 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                </div>
              </div>

              <div className="mt-4 px-3.5 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-xs text-stone-300 font-medium text-center">
                🌾 Center diseased leaf inside the frame • Hold steady
              </div>
            </div>

            {/* Quick in-viewfinder controls */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
              {hasTorch && (
                <button
                  type="button"
                  onClick={toggleTorch}
                  className={`p-2.5 rounded-full backdrop-blur-md border transition-colors ${
                    torchOn
                      ? 'bg-amber-400 text-stone-950 border-amber-300'
                      : 'bg-stone-900/70 text-stone-300 border-stone-700 hover:bg-stone-800'
                  }`}
                  title="Toggle Torch/Flash"
                >
                  <Zap className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={toggleFacingMode}
                className="p-2.5 rounded-full bg-stone-900/70 hover:bg-stone-800 text-stone-300 backdrop-blur-md border border-stone-700 transition-colors"
                title="Flip Camera (Front/Rear)"
              >
                <SwitchCamera className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setTimerSeconds((prev) => (prev === 0 ? 3 : prev === 3 ? 5 : 0))}
                className={`p-2.5 rounded-full backdrop-blur-md border transition-colors ${
                  timerSeconds > 0
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : 'bg-stone-900/70 text-stone-300 border-stone-700 hover:bg-stone-800'
                }`}
                title="Timer delay"
              >
                <span className="flex items-center text-xs font-bold gap-0.5">
                  <Timer className="w-3.5 h-3.5" />
                  {timerSeconds > 0 ? `${timerSeconds}s` : ''}
                </span>
              </button>
            </div>

            {/* Camera error fallback if stream fails */}
            {cameraError && (
              <div className="absolute inset-0 bg-stone-950/90 flex flex-col items-center justify-center p-6 text-center z-30">
                <AlertCircle className="w-12 h-12 text-amber-400 mb-3" />
                <h3 className="text-base font-semibold text-stone-100 mb-1">Camera Not Available</h3>
                <p className="text-xs text-stone-400 max-w-md mb-4">{cameraError}</p>
                <button
                  onClick={() => setMode('upload')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  {t.upload}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* 3. Upload File / Drag and Drop Mode */
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="w-full h-full flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:bg-stone-900/40 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <div className="w-16 h-16 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-inner">
              <FileImage className="w-8 h-8" />
            </div>
            <h3 className="text-sm font-semibold text-stone-200 mb-1">
              {t.selectOrDrop}
            </h3>
            <p className="text-xs text-stone-400 max-w-sm mb-4">
              {t.uploadDesc}
            </p>
            <button
              type="button"
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600 rounded-xl text-xs font-medium flex items-center gap-2 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              {t.browseFiles}
            </button>
          </div>
        )}
      </div>

      {/* Shutter / Capture Trigger Bar (when in camera mode and not captured) */}
      {mode === 'camera' && !capturedImage && isCameraActive && (
        <div className="py-4 bg-stone-950 border-t border-stone-800 flex items-center justify-center gap-6">
          <div className="w-12 flex justify-center">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-800 transition-colors"
              title="Upload existing file"
            >
              <Upload className="w-4 h-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

          {/* Big Shutter Button */}
          <button
            type="button"
            onClick={handleCaptureClick}
            disabled={isCountingDown}
            className="w-18 h-18 rounded-full p-1 bg-stone-900 border-2 border-emerald-500/80 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all group"
            title="Take Photo"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-500 group-hover:bg-emerald-400 flex items-center justify-center text-stone-950 shadow-md">
              <Camera className="w-6 h-6" />
            </div>
          </button>

          <div className="w-12 flex justify-center">
            <button
              type="button"
              onClick={toggleFacingMode}
              className="p-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-800 transition-colors"
              title="Flip camera"
            >
              <SwitchCamera className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Field Metadata & Action Section */}
      <div className="p-5 bg-stone-900 border-t border-stone-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Crop Selector */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5 flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              {t.targetCrop}
            </label>
            <div className="flex gap-2">
              <select
                value={cropHint}
                onChange={(e) => setCropHint(e.target.value)}
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
              >
                {commonCrops.map((c) => (
                  <option key={c} value={c}>
                    {c === 'Auto-detect' ? t.autoDetect : c}
                  </option>
                ))}
              </select>
              {cropHint === 'Other (Type)' && (
                <input
                  type="text"
                  placeholder="e.g., Cucumber"
                  value={customCrop}
                  onChange={(e) => setCustomCrop(e.target.value)}
                  className="w-1/2 bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                />
              )}
            </div>
          </div>

          {/* Field Notes */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              {t.fieldNotesLabel}
            </label>
            <input
              type="text"
              placeholder={t.fieldNotesPlaceholder}
              value={fieldNotes}
              onChange={(e) => setFieldNotes(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Diagnosis Submit Button (when image is captured) */}
        {capturedImage && (
          <div className="pt-2">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-stone-950 font-bold text-sm tracking-wide shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2.5 transition-all active:scale-[0.99] disabled:opacity-60"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                  <span>{t.analyzingBtn}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>{t.analyzeBtn}</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Sample Crops One-Click Presets */}
        <div className="pt-3 border-t border-stone-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
              {t.orTestSamples}
            </span>
            <span className="text-[11px] text-stone-500">{t.clickToPreview}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {SAMPLE_CROPS.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSelectSample(sample)}
                className="group text-left bg-stone-950/60 hover:bg-stone-800/80 border border-stone-800 hover:border-emerald-500/50 rounded-xl p-2 transition-all flex flex-col gap-2"
              >
                <div className="relative aspect-4/3 w-full rounded-lg overflow-hidden bg-stone-900 border border-stone-800">
                  <img
                    src={sample.imageUrl}
                    alt={sample.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span
                    className={`absolute bottom-1 left-1 text-[9px] font-bold px-1.5 py-0.5 rounded border ${sample.badgeColor}`}
                  >
                    {sample.crop.split(' ')[0]}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-200 line-clamp-1 group-hover:text-emerald-400 transition-colors">
                    {sample.name}
                  </h4>
                  <p className="text-[10px] text-stone-400 line-clamp-1">{sample.condition}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
