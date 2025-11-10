// import React from "react";
// import { useNavigate } from "react-router-dom";
// import errorIllustration from "../assets/404-illustration.png"; // Use a nice illustration

// const NotFoundPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-white px-4">
//       {/* Back arrow */}
//       <div
//         onClick={() => navigate(-1)}
//         className="absolute top-6 right-6 flex items-center cursor-pointer text-orange-500 hover:text-orange-600 transition"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-8 w-8"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth={2}
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//         </svg>
//       </div>

//       {/* Content */}
//       <div className="max-w-lg text-center">
//         <img
//           src={errorIllustration}
//           alt="Page not found"
//           className="w-72 h-72 mx-auto mb-6 animate-fadeIn"
//         />
//         <h1 className="text-6xl font-extrabold text-orange-500 mb-4">404</h1>
//         <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
//         <p className="text-gray-600 mb-6">
//           Oops! The page you are looking for doesn’t exist or you don’t have access.
//         </p>
//         <button
//           onClick={() => navigate(-1)}
//           className="bg-orange-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-orange-600 transition font-semibold"
//         >
//           Go Back
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NotFoundPage;




// import React from "react";
// import { useNavigate } from "react-router-dom";

// const NotFoundPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-white px-4 relative">
//       {/* Back arrow top-right */}
//       <div
//         onClick={() => navigate(-1)}
//         className="absolute top-6 left-6 flex items-center cursor-pointer text-orange-500 hover:text-orange-600 transition"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-8 w-8"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth={2}
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//         </svg>
//       </div>

//       {/* Illustration (SVG inline) */}
//       <div className="mb-6">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="w-72 h-72 mx-auto text-orange-300 animate-bounce"
//           fill="none"
//           viewBox="0 0 64 64"
//         >
//           <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="4" />
//           <line x1="20" y1="20" x2="44" y2="44" stroke="currentColor" strokeWidth="4" />
//           <line x1="44" y1="20" x2="20" y2="44" stroke="currentColor" strokeWidth="4" />
//         </svg>
//       </div>

//       {/* Text content */}
//       <div className="max-w-lg text-center">
//         <h1 className="text-6xl font-extrabold text-orange-500 mb-4">404</h1>
//         <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
//         <p className="text-gray-600 mb-6">
        //   Oops! The page you are looking for doesn’t exist or you don’t have access.
//         </p>
//         <button
//           onClick={() => navigate(-1)}
//           className="bg-orange-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-orange-600 transition font-semibold"
//         >
//           Go Back
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NotFoundPage;



import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [ballPos, setBallPos] = useState({ top: 50, left: 50 });
  const [sound] = useState(new Audio("https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3"));
  const timerRef = useRef(null);

  useEffect(() => {
    if (showGame && timeLeft > 0) {
      timerRef.current = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timerRef.current);
    }
    if (timeLeft === 0) {
      clearInterval(timerRef.current);
    }
  }, [showGame, timeLeft]);

  const handleBallClick = () => {
    if (timeLeft > 0) {
      sound.currentTime = 0;
      sound.play();
      setScore(prev => prev + 1);
      setBallPos({
        top: Math.random() * 80 + 10,
        left: Math.random() * 80 + 10,
      });
    }
  };

  const startGame = () => {
    setShowGame(true);
    setScore(0);
    setTimeLeft(60);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      {!showGame ? (
        <>
          <div className="text-center mb-6">
            <h1 className="text-6xl md:text-7xl font-extrabold text-orange-500 mb-2 tracking-wide animate-bounce">
              404
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
              Page Not Found
            </p>
            <p className="text-gray-600 max-w-md mx-auto text-lg md:text-xl leading-relaxed">
              Oops! The page you’re looking for doesn’t exist or you don’t have access.
            </p>
          </div>

          <button
            onClick={startGame}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full mb-4 transition-all shadow-md"
          >
            Play Game 🎮
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full transition-all shadow-md"
          >
            Back to Mealex
          </button>
        </>
      ) : (
        <div className="w-full max-w-md h-[400px] bg-white shadow-2xl rounded-xl relative overflow-hidden flex flex-col justify-center items-center">
          <div className="absolute top-2 left-2 text-lg font-semibold text-orange-500">
            Time: {timeLeft}s
          </div>
          <div className="absolute top-2 right-2 text-lg font-semibold text-green-600">
            Score: {score}
          </div>
          {timeLeft > 0 ? (
            <div
              onClick={handleBallClick}
              className="absolute w-12 h-12 bg-gradient-to-r from-green-500 to-orange-500 rounded-full shadow-lg cursor-pointer transition-all duration-300"
              style={{ top: `${ballPos.top}%`, left: `${ballPos.left}%`, transform: "translate(-50%, -50%)" }}
            ></div>
          ) : (
            <div className="text-center px-4">
              <h2 className="text-2xl font-bold text-orange-500 mb-3">Game Over!</h2>
              <p className="text-gray-600 mb-4 text-lg">
                Your Score: <span className="text-green-600 font-semibold">{score}</span>
              </p>
              <button
                onClick={startGame}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full mb-3 transition-all shadow-md"
              >
                Play Again 🔁
              </button>
              <button
                onClick={() => navigate(-1)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full transition-all shadow-md"
              >
                Back to MealEx
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotFound;
