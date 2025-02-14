"use client";
import { useState, useRef, useEffect } from "react";
import Card from "./components/Card";
import Envelope from "./components/Envelope";
import { motion } from "framer-motion";

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [visibleGifs, setVisibleGifs] = useState([]);
  const audioRef = useRef(null);

  // 🎞 Array de GIFs aleatorios
  const gifs = [
    "https://media3.giphy.com/media/VduFvPwm3gfGO8duNN/giphy.gif",
    "https://media1.giphy.com/media/Qur3qH5qrLpGJauEcj/giphy.gif",
    "https://media2.giphy.com/media/FkD6uqVhmJMd2/giphy.gif",
    "https://media3.giphy.com/media/TIG6XFVuOriidsTsdu/giphy.gif",
    "https://media2.giphy.com/media/qRtwZkH3TaQrJuAUmp/giphy.gif",
    "https://media1.giphy.com/media/OZo94JbTwybXat529c/giphy.gif",
    "https://media4.giphy.com/media/FfR51q915U9lzm2IGa/giphy.gif"
  ];

  const openEnvelope = () => setShowIntro(true);
  const handleShowMessage = () => setIsOpened(true);

  const handleShowMore = () => {
    setShowMore(true);
    startGifReveal();

    // 🔊 Reproducir la canción cuando se hace clic en "Ver más"
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((error) => console.log("Reproducción bloqueada:", error));
    }
  };

  // 🔹 Controlar la reproducción del audio al cambiar de pestaña
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && audioRef.current) {
        audioRef.current.pause();
      } else if (!document.hidden && showMore && audioRef.current) {
        audioRef.current
          .play()
          .catch((error) => console.log("Reproducción bloqueada:", error));
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [showMore]);

  // 🔹 Genera posiciones más dispersas evitando el centro
  const getRandomPosition = () => {
    const minX = 2;
    const maxX = 98;
    const minY = 2;
    const maxY = 98;

    let top, left;
    do {
      top = Math.random() * (maxY - minY) + minY;
      left = Math.random() * (maxX - minX) + minX;
    } while (
      top > 35 && top < 65 && left > 35 && left < 65 // Evita la parte central
    );

    return { top: `${top}%`, left: `${left}%` };
  };

  const startGifReveal = () => {
    let usedIndexes = new Set();

    const interval = setInterval(() => {
      if (usedIndexes.size >= gifs.length) {
        usedIndexes.clear();
      }

      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * gifs.length);
      } while (usedIndexes.has(randomIndex));

      usedIndexes.add(randomIndex);

      setVisibleGifs((prev) => [
        ...prev,
        { src: gifs[randomIndex], id: Date.now(), position: getRandomPosition() }
      ]);

      setTimeout(() => {
        setVisibleGifs((prev) => prev.filter((gif) => gif.id !== Date.now()));
      }, 5000);
    }, 1200);
  };

  return (
    <div className="bg-blue-100 flex items-center justify-center min-h-screen p-6 relative">
      <div className="text-center z-10">
        {!isOpened && !showIntro && <Envelope openEnvelope={openEnvelope} />}
        {showIntro && !isOpened && (
          <div className="bg-white p-8 rounded-lg shadow-lg text-center animate-fadeIn">
            <p className="text-gray-800 text-2xl font-bold">
              Hey equipo, les tengo un mensaje especial 📩
            </p>
            <button
              onClick={handleShowMessage}
              className="mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              Leer mensaje 📩
            </button>
          </div>
        )}

        {isOpened && !showMore && (
          <Card
            message="¡Hola Team Viva Nómada! 😃  
            Solo quería decirles que trabajar con ustedes es un verdadero placer.  
            No solo son un gran equipo, sino también personas increíbles.  
            Gracias por todas las risas, el apoyo y la buena vibra.  
            ¡Sigamos pasándola bien y haciendo cosas chidas juntos! 🚀🎉"
            showMore={handleShowMore}
          />
        )}

        {showMore && (
          <div className="mt-6 bg-white p-4 rounded-md shadow-lg animate-fadeIn">
            <p className="text-gray-700 text-lg font-semibold">
              ¡Gracias por la buena vibra y el trabajo en equipo! 🚀🎉
            </p>
            <motion.img
              src="https://media2.giphy.com/media/PCXuEII4UDEXPecfUs/giphy.gif"
              alt="GIF de celebración"
              className="w-60 mx-auto mt-4 opacity-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}
      </div>

      {/* 🔹 GIFs dispersos por la pantalla */}
      {visibleGifs.map((gif) => (
        <img
          key={gif.id}
          src={gif.src}
          alt="GIF animado"
          className="absolute w-20 h-20 md:w-16 md:h-16 sm:w-14 sm:h-14 rounded-full transition-opacity duration-5000 ease-in-out opacity-0"
          style={{
            top: gif.position.top,
            left: gif.position.left,
            transform: `translate(-50%, -50%)`,
            animation: `fadeInOut 5s ease-in-out forwards`
          }}
        />
      ))}

      {/* 🔹 Audio de fondo */}
      <audio ref={audioRef} loop muted={false}>
        <source src="/cancion.mp3" type="audio/mp3" />
        Tu navegador no soporta el audio.
      </audio>

      {/* 🔹 Animaciones en CSS */}
      <style jsx>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: scale(0.5); }
          20% { opacity: 1; transform: scale(1); }
          80% { opacity: 1; }
          100% { opacity: 0; transform: scale(1.2); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out forwards;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}