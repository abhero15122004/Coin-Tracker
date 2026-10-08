document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  
  startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    document.getElementById("event-logs").innerHTML = ''; // Clear logs
    OpeningCeremony(Race100M);
  });
});

// Helper function to log to UI and Console
function logEvent(message, type = "") {
  console.log(message);
  
  const logsContainer = document.getElementById("event-logs");
  const logDiv = document.createElement("div");
  logDiv.className = `log-entry ${type}`;
  logDiv.textContent = `> ${message}`;
  
  logsContainer.appendChild(logDiv);
  logsContainer.scrollTop = logsContainer.scrollHeight;
}

// 1. Opening Ceremony
function OpeningCeremony(callbackFnc) {
  logEvent("🏆 Welcome to the Annual Sports Day! Let the games begin! 🏆", "highlight");
  
  // Initialize score object
  const score = { red: 0, blue: 0, green: 0, yellow: 0 };
  
  // The requirements say "logs start message every second" but realistically 
  // it usually means log a message, wait a second, then call the next.
  setTimeout(() => {
    logEvent("Opening ceremony concluded. Initial scores:");
    logEvent(JSON.stringify(score), "score");
    logEvent("--------------------------------------------------", "system");
    
    // Call next function
    callbackFnc(score, LongJump);
  }, 1000);
}

// 2. Race 100M
function Race100M(score, callbackFnc) {
  logEvent("🏃 100M Race is starting...", "highlight");
  
  setTimeout(() => {
    // Generate random times between 10 to 15 seconds
    const times = {
      red: Math.floor(Math.random() * 6) + 10,
      blue: Math.floor(Math.random() * 6) + 10,
      green: Math.floor(Math.random() * 6) + 10,
      yellow: Math.floor(Math.random() * 6) + 10,
    };
    
    logEvent(`Race times: ${JSON.stringify(times)}`);
    
    // Find smallest and second smallest times
    const sortedColors = Object.keys(times).sort((a, b) => times[a] - times[b]);
    const first = sortedColors[0];
    const second = sortedColors[1];
    
    logEvent(`${first.toUpperCase()} wins 1st place! (50 pts)`);
    logEvent(`${second.toUpperCase()} wins 2nd place! (25 pts)`);
    
    // Update scores
    score[first] += 50;
    score[second] += 25;
    
    logEvent("Scores after 100M Race:", "highlight");
    logEvent(JSON.stringify(score), "score");
    logEvent("--------------------------------------------------", "system");
    
    // Call next function
    callbackFnc(score, HighJump);
  }, 3000);
}

// 3. Long Jump
function LongJump(score, callbackFnc) {
  logEvent("🦘 Long Jump event is starting...", "highlight");
  
  setTimeout(() => {
    // Randomly select a color
    const colors = ["red", "blue", "green", "yellow"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    logEvent(`The random winner for Long Jump is: ${randomColor.toUpperCase()}! (150 pts)`);
    
    // Update score
    score[randomColor] += 150;
    
    logEvent("Scores after Long Jump:", "highlight");
    logEvent(JSON.stringify(score), "score");
    logEvent("--------------------------------------------------", "system");
    
    // Call next function
    callbackFnc(score, AwardCeremony);
  }, 2000);
}

// 4. High Jump
function HighJump(score, callbackFnc) {
  logEvent("🤸 High Jump event is starting...", "highlight");
  
  // We don't necessarily need a setTimeout here if we use a prompt,
  // but to keep the flow smooth, we can prompt immediately.
  const userInput = prompt("High Jump Event!\nWhat colour secured the highest jump? (red/blue/green/yellow)");
  
  if (userInput) {
    const colorInput = userInput.trim().toLowerCase();
    
    if (["red", "blue", "green", "yellow"].includes(colorInput)) {
      logEvent(`${colorInput.toUpperCase()} wins the High Jump! (100 pts)`);
      score[colorInput] += 100;
    } else {
      logEvent(`Invalid color entered ("${colorInput}"). Event cancelled, no points awarded.`);
    }
  } else {
    logEvent("No input provided. Event cancelled, no points awarded.");
  }
  
  logEvent("Scores after High Jump:", "highlight");
  logEvent(JSON.stringify(score), "score");
  logEvent("--------------------------------------------------", "system");
  
  // Call next function
  callbackFnc(score);
}

// 5. Award Ceremony
function AwardCeremony(score) {
  logEvent("🎉 Award Ceremony is starting! 🎉", "highlight");
  
  // Sort scores to find 1st, 2nd, 3rd
  const sortedScores = Object.entries(score).sort((a, b) => b[1] - a[1]);
  
  logEvent("FINAL STANDINGS:", "highlight");
  logEvent(`🥇 1st Place: ${sortedScores[0][0].toUpperCase()} with ${sortedScores[0][1]} points!`, "score");
  logEvent(`🥈 2nd Place: ${sortedScores[1][0].toUpperCase()} with ${sortedScores[1][1]} points!`, "score");
  logEvent(`🥉 3rd Place: ${sortedScores[2][0].toUpperCase()} with ${sortedScores[2][1]} points!`, "score");
  
  if (sortedScores[3]) {
      logEvent(`   4th Place: ${sortedScores[3][0].toUpperCase()} with ${sortedScores[3][1]} points.`);
  }

  logEvent("Thank you for attending the Annual Sports Day!", "highlight");
  
  // Re-enable start button
  document.getElementById("start-btn").disabled = false;
}
