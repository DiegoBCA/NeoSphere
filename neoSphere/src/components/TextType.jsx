// src/components/TextType.jsx
import React, { useState, useEffect } from "react";

const TextType = ({
  text = [""],
  typingSpeed = 75,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = "|",
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let typingTimeout;

    if (textIndex < text.length) {
      if (!isDeleting && charIndex <= text[textIndex].length) {
        // Escribir letra por letra
        typingTimeout = setTimeout(() => {
          setDisplayedText(text[textIndex].substring(0, charIndex));
          setCharIndex((prev) => prev + 1);
        }, typingSpeed);
      } else if (isDeleting && charIndex >= 0) {
        // Borrar letra por letra
        typingTimeout = setTimeout(() => {
          setDisplayedText(text[textIndex].substring(0, charIndex));
          setCharIndex((prev) => prev - 1);
        }, typingSpeed / 2);
      } else if (!isDeleting && charIndex > text[textIndex].length) {
        // Pausa antes de borrar
        typingTimeout = setTimeout(() => {
          setIsDeleting(true);
          setCharIndex((prev) => prev - 1);
        }, pauseDuration);
      } else if (isDeleting && charIndex < 0) {
        // Pasar al siguiente texto
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % text.length);
        setCharIndex(0);
      }
    }

    return () => clearTimeout(typingTimeout);
  }, [charIndex, isDeleting, text, textIndex, typingSpeed, pauseDuration]);

  // Resetear cuando cambia el array de texto externo
  useEffect(() => {
    setTextIndex(0);
    setCharIndex(0);
    setIsDeleting(false);
  }, [text]);

  return (
    <span>
      {displayedText}
      {showCursor && <span className="animate-pulse">{cursorCharacter}</span>}
    </span>
  );
};

export default TextType;
