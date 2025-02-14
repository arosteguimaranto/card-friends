import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Card = ({ message, showMore }) => {
  const [typedMessage, setTypedMessage] = useState([]);
  const [typingFinished, setTypingFinished] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✉️ Estructura de la carta para amigos del trabajo
  const messageParts = [
    "¡Holaaa! 😃",
           "Solo quería decirles que trabajar con ustedes es un verdadero placer.",
            "No solo son un gran equipo, sino también personas increíbles.  ",
           " Gracias por todas las risas, el apoyo y la buena vibra.  ",
         "   ¡Sigamos pasándola bien y haciendo cosas chidas juntos! 🚀🎉" 
  ];

  useEffect(() => {
    if (currentIndex < messageParts.length) {
      const timeout = setTimeout(() => {
        setTypedMessage((prev) => [...prev, messageParts[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, 1000); // Aparece más rápido que antes (1s en vez de 1.2s)

      return () => clearTimeout(timeout);
    } else {
      setTypingFinished(true);
    }
  }, [currentIndex]);

  return (
    <motion.div 
      className="bg-white p-8 rounded-xl shadow-lg mt-6 border-2 border-blue-400 max-w-md mx-auto relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ fontFamily: "'Merriweather', serif" }} // Tipografía más formal
    >
      {/* 📜 Encabezado de la carta */}
      <div className="text-left mb-4 text-gray-700">
        <p className="text-lg font-semibold font-serif">📍 De: Dylan Maranto</p>
        <p className="text-lg font-semibold font-serif">📩 Para: Team VN, leo y angel</p>
      </div>

      {/* 📝 Mensaje progresivo con animación */}
      {typedMessage.map((part, index) => (
        <motion.p
          key={index}
          className="text-gray-700 text-lg leading-relaxed font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }} // Aparece más rápido
        >
          {part}
        </motion.p>
      ))}

      {/* ✏️ Simulación de escritura */}
      {!typingFinished && <span className="text-blue-500 text-2xl animate-pulse">|</span>}

      {/* 📌 Botón para continuar */}
      {typingFinished && (
        <motion.button
          onClick={showMore}
          className="mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Ver más 📩
        </motion.button>
      )}
    </motion.div>
  );
};

export default Card;