import React from "react";
import { motion } from "framer-motion";

const MoreContent = ({ handleResponse }) => {
  return (
    <motion.div
      className="mt-6 bg-gradient-to-br from-blue-100 to-green-200 p-6 rounded-2xl shadow-xl text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 📷 Imagen opcional (puedes cambiarla a una imagen de equipo) */}
      <div className="flex justify-center">
        <img
          src="/team.jpg" // Asegúrate de que la imagen esté en /public/
          alt="Imagen especial"
          className="w-52 h-52 rounded-full shadow-xl border-4 border-white mb-4"
        />
      </div>

      <p className="text-gray-800 text-2xl font-bold mb-4">
        ¿Te gustaría recibir este mensaje especial? ✉️😊
      </p>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => handleResponse("sí")}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          ¡Por supuesto! 🙌
        </button>
        <button
          onClick={() => handleResponse("no")}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          Quizás después 🤔
        </button>
      </div>
    </motion.div>
  );
};

export default MoreContent;