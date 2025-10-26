"use client";

import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mic, Pause, Play, Square } from "lucide-react";

export default function NewSession() {
  const [isRecording, setIsRecording] = useState(false);

  const handleStart = () => {
    setIsRecording(true);
    // TODO: start recording logic here
  };

  const handleStop = () => {
    setIsRecording(false);
    // TODO: stop recording logic here
  };

  const handlePause = () => {
    // TODO: pause recording logic here
  };

  const handleSpeak = () => {
    // TODO: speak/voice logic here
  };

  return (
    <div className="h-full w-full grid grid-rows-[4fr_1fr]">
      {/* AI Avatar */}
      <div className="flex justify-center items-center relative">
        <Avatar className="h-60 w-60 rounded-xl">
          <AvatarImage src="/Abstract.png" alt="Eve avatar" />
          <AvatarFallback>E</AvatarFallback>
        </Avatar>
        <div className="absolute text-xl font-mono text-black italic drop-shadow-lg">
          <span>Eve</span>
        </div>
      </div>

      <div className="flex justify-center gap-4 font-mono">
        {!isRecording ? (
          <Button
            onClick={handleStart}
            className="rounded-xl"
            variant="ghost"
          >
            <Play size={18} /> Start
          </Button>
        ) : (
          <>
            <Button
              onClick={handleStop}
              className="rounded-xl"
              variant="ghost"
            >
              <Square /> Stop
            </Button>
            <Button
              onClick={handlePause}
              className="rounded-xl"
              variant="ghost"
            >
              <Pause /> Pause
            </Button>
            <Button
              onClick={handleSpeak}
              className="rounded-xl"
              variant="ghost"
            >
              <Mic /> Speak
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
