body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  background: linear-gradient(45deg, #ffe6f0, #ccf2ff, #fff0b3);
  height: 100vh;
  width: 100vw;
  position: relative;
}

.title {
  text-align: center;
  font-size: 2em;
  margin-top: 20px;
}

.booth {
  width: 80px;
  height: 80px;
  font-size: 2em;
  text-align: center;
  line-height: 80px;
  background: white;
  border-radius: 50%;
  position: absolute;
  cursor: pointer;
  animation: float 30s infinite alternate ease-in-out;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
}

.booth:hover {
  transform: scale(1.2) rotate(10deg);
  box-shadow: 0 0 20px rgba(0,0,0,0.4);
}

.big-letter {
  width: 100px;
  height: 100px;
  font-size: 2.5em;
}

.hidden {
  display: none;
}

#popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0,0,0,0.4);
  z-index: 1000;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
}

#popup-content {
  font-size: 1.2em;
  text-align: center;
}

#background {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}

/* Floating animation */
@keyframes float {
  0% { transform: translate(0, 0) rotate(0deg); }
  100% { transform: translate(200px, 200px) rotate(360deg); }
}
