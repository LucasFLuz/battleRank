import React, { useState, useEffect } from "react";
import { Timer, Play, Pause, RotateCcw, Plus, X } from "lucide-react";
import { Button } from "../ui/Button";

interface RestStopwatchProps {
  initialSeconds?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const RestStopwatch: React.FC<RestStopwatchProps> = ({
  initialSeconds = 60,
  isOpen,
  onClose,
}) => {
  const [totalSeconds, setTotalSeconds] = useState(initialSeconds);
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setTotalSeconds(initialSeconds);
    setSecondsLeft(initialSeconds);
    setIsRunning(true);
  }, [initialSeconds, isOpen]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      // Feedback sonoro/vibração se suportado no navegador
      if ("vibrate" in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsLeft]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const progressPercent = totalSeconds > 0 ? ((totalSeconds - secondsLeft) / totalSeconds) * 100 : 0;
  const isFinished = secondsLeft === 0;

  const handlePreset = (secondsVal: number) => {
    setTotalSeconds(secondsVal);
    setSecondsLeft(secondsVal);
    setIsRunning(true);
  };

  const handleAdd15s = () => {
    setSecondsLeft((prev) => prev + 15);
    setTotalSeconds((prev) => prev + 15);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 rounded-2xl bg-dark-850/95 backdrop-blur-md border border-brand-500/30 p-4 shadow-2xl shadow-brand-500/10 transition-all animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-dark-700">
        <div className="flex items-center gap-2 text-brand-400">
          <Timer className="w-4 h-4 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider">Cronômetro de Descanso</span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          aria-label="Fechar cronômetro"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Timer Display */}
      <div className="my-3 text-center">
        <div
          className={`text-4xl font-black font-mono tracking-wider transition-colors ${
            isFinished ? "text-brand-400 animate-bounce" : "text-white"
          }`}
        >
          {formattedTime}
        </div>
        <p className="text-[11px] text-slate-400 mt-0.5">
          {isFinished ? "Descanso finalizado! Hora da próxima série!" : "Tempo de recuperação muscular"}
        </p>

        {/* Barra de Progresso */}
        <div className="w-full h-1.5 bg-dark-700 rounded-full mt-2.5 overflow-hidden">
          <div
            className="h-full bg-brand-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Controles */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <Button
          size="sm"
          variant={isRunning ? "secondary" : "primary"}
          onClick={() => setIsRunning(!isRunning)}
          className="gap-1.5 px-4"
        >
          {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          {isRunning ? "Pausar" : "Iniciar"}
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setSecondsLeft(totalSeconds);
            setIsRunning(false);
          }}
          className="p-2"
          title="Reiniciar"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={handleAdd15s}
          className="text-xs px-2.5"
          title="Adicionar 15 segundos"
        >
          <Plus className="w-3 h-3 mr-0.5" /> 15s
        </Button>
      </div>

      {/* Presets Rápidos */}
      <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-dark-700/60">
        {[30, 60, 90, 120].map((presetSec) => (
          <button
            key={presetSec}
            type="button"
            onClick={() => handlePreset(presetSec)}
            className={`py-1 text-[11px] font-semibold rounded-lg transition-colors ${
              totalSeconds === presetSec && !isFinished
                ? "bg-brand-500/20 text-brand-400 border border-brand-500/30"
                : "bg-dark-800 text-slate-400 hover:text-white hover:bg-dark-700"
            }`}
          >
            {presetSec}s
          </button>
        ))}
      </div>
    </div>
  );
};
