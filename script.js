//! Created On July 2025 -->
// ! Pixterial Tab - By Vaishnav Raj (@ivaishnavraj) -->
//? Disable Right Click
function disableRightClick(event) { //just disable right click
  event.preventDefault();
}
// ------------------------------------------------------------------------------------------------------------------------------
navigator.geolocation.getCurrentPosition(success, error);
// For mainfest.json location call







// ------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------
//! 🎨 THEME SWITCHER BUTTONS START 🎨
// This function applies the selected theme and highlights the active button
function applyTheme(themeName) {
  // Apply selected theme to the body class
  document.body.className = themeName;

  // Save the selected theme to localStorage
  localStorage.setItem("selectedTheme", themeName);

  // Highlight the active button
  document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.classList.remove("active"); // Remove highlight from all buttons
    if (btn.dataset.theme === themeName) {
      btn.classList.add("active"); // Add highlight to the selected button
    }
  });
}

// Wait for the full page to load
window.addEventListener("DOMContentLoaded", () => {
  // Load the last used theme from localStorage, or default to theme-blue
  const savedTheme = localStorage.getItem("selectedTheme") || "theme-blue";

  // Apply the saved theme on page load
  applyTheme(savedTheme);

  // Add click event listeners to all theme buttons
  document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedTheme = btn.dataset.theme;
      applyTheme(selectedTheme);
    });
  });
});

// ------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------

//! Theme Button Click Function 
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themePanel = document.getElementById('theme-panel');
const themeButtons = document.querySelectorAll('.theme-btn');

// Toggle visibility of theme panel
themeToggleBtn.addEventListener('click', () => {
    themePanel.classList.toggle('open');
});

// Theme selection logic
themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedTheme = button.dataset.theme;
        
        // Clear all other theme classes from <html>
        document.documentElement.className = '';
        
        // Apply the selected theme class
        document.documentElement.classList.add(selectedTheme);
        
        // Save selected theme for the session
        sessionStorage.setItem('activeTheme', selectedTheme);
    });
});

// Load theme if previously saved
const savedTheme = sessionStorage.getItem('activeTheme');
if (savedTheme) {
    document.documentElement.classList.add(savedTheme);
}

//? 🎨 THEME SWITCHER BUTTONS END 🎨
// ------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------


//! ⏰ CLOCK STARTS ⏰

// This function runs every second to update the clock
function updateClock() {
  const now = new Date(); // Get current date and time

  const sec = now.getSeconds(); // Get current second
  const min = now.getMinutes(); // Get current minute
  const hr = now.getHours() % 12; // Get current hour in 12-hour format

  // Calculate degree angles for each hand
  const secDeg = sec * 6; // 360 / 60 = 6 degrees per second
  const minDeg = min * 6 + sec * 0.1; // Each minute is 6 degrees + slight second movement
  const hrDeg = hr * 30 + min * 0.5; // Each hour is 30 degrees + minute-based movement

  // Rotate the clock hands
  document.getElementById("second").style.transform = `rotate(${secDeg}deg)`;
  document.getElementById("minute").style.transform = `rotate(${minDeg}deg)`;
  document.getElementById("hour").style.transform = `rotate(${hrDeg}deg)`;
}

// Call updateClock every 1000 milliseconds (1 second)
setInterval(updateClock, 1000);

// Call it once immediately to show correct time on load
updateClock();

//? ⏰ CLOCK ENDS ⏰
// ------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------


//! Start Location - Humidity - Temperature JS
// ------------------------------------------------------------------------------------------------------------------------------------------
    
if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      document.getElementById("location").textContent = "Geolocation not supported.";
    }

    function success(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // 🗺️ Reverse Geocoding to get city & state
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
        .then(res => res.json())
        .then(locationData => {
          const address = locationData.address;
          const city = address.city || address.town || address.village || "";
          const district = address.county || "";
          const state = address.state || "";
          const finalLocation = [city,state].filter(Boolean).join(", ");
          document.getElementById("location").textContent = `Location: ${finalLocation}`;
        })
        .catch(() => {
          document.getElementById("location").textContent = "Failed to fetch location name.";
        });

      // 🌤️ Fetch temperature and humidity
      const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m&timezone=auto`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const temp = data.current?.temperature_2m;
          const humidity = data.current?.relative_humidity_2m;

          if (temp !== undefined) {
            document.getElementById("temperature").textContent = `Temperature: ${temp}°C`;
          } else {
            document.getElementById("temperature").textContent = "Temperature data not available.";
          }

          if (humidity !== undefined) {
            document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
          } else {
            document.getElementById("humidity").textContent = "Humidity data not available.";
          }
        })
        .catch(() => {
          document.getElementById("temperature").textContent = "Error loading temperature.";
          document.getElementById("humidity").textContent = "Error loading humidity.";
        });
    }

    function error() {
      document.getElementById("location").textContent = "Location access denied.";
      document.getElementById("temperature").textContent = "-";
      document.getElementById("humidity").textContent = "-";
    }
    // ? Location- Humidity and Temp Ends
// ------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------


    //! Google Search Trigger Function
const searchInput = document.getElementById('searchQ');
const searchBtn = document.getElementById('enterBtn');

// Perform Google Search
function searchGoogle() {
  const query = searchInput.value.trim();
  if (query !== "") {
    const googleURL = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(googleURL);
  }
}

// Search on click
searchBtn.addEventListener('click', searchGoogle);

// Search on Enter key
searchInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    searchGoogle();
  }
});
// ? Search Fun Ends
// ------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------

//? clock bottom DAY AND DATE 
  function updateDateTime() {
      const now = new Date();

      const shortFormat = now.toLocaleDateString('en-US', {
        day: '2-digit', month: 'long', year: 'numeric'
      });

      const fullDay = now.toLocaleDateString('en-US', {
        weekday: 'long'
      });

      const time = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      document.getElementById('shortFormat').textContent = shortFormat;
      document.getElementById('fullDay').textContent = fullDay;
    }

    updateDateTime(); // Run once at start
    setInterval(updateDateTime, 1000); // Update every second
// ? Clock bottom day/date ends
// ------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------
