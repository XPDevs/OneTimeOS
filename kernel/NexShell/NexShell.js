/**
* NexShell kernel
*
* defualt boot file for OS:
* index.html
*
* Global kernel for all Web-based OS's made by XPDevs
*
* Code for kernel and html files:
*
* This code is for the kernel and html files to contain so they may communicate with each other.
*
* For the kernel to contain:
*
* function (name)() {
* // js code here
* }
*
* For the html files to contain:
*
* <script src="/kernel/NexShell.js" defer></script>
* <script>
* window.onload = function() {
* //call specific functions
* (function name)();
* }
* </script>
*
* Notes:
*
* Somethings may be buggy or not work at all
* The SETUP function doesnt work read line: 179 about it
*
* add the the setup
* fix the terminal application and add it to kernel
*
* Components:
*
* 1.Starting - 4
* 2.Ending - 4
*
* start:
* Start of NexShell by using init.html
*/
function KERNEL() {
    let countdown = 15; // Set initial countdown time

    // Update the text every second
    const countdownInterval = setInterval(function() {
      // Update the text content with the current countdown
      document.querySelector("p").textContent = `Starting NexShell in ${countdown} seconds...`;

      countdown--;

      if (countdown < 0) {
        clearInterval(countdownInterval); // Stop the countdown when it's done
        window.location.href = "../boot/boot.html"; // Redirect after countdown ends
      }
    }, 1000);
}
function INDEX() {
window.location.href = "kernel/init.html"; // Redirect after countdown end
}
function BOOT() {
    let shiftHeld = false;
    let shiftStartTime = 0;

    // Redirect to check.html after 10 seconds
    setTimeout(() => {
      if (!shiftHeld) {
        window.location.href = "check.html";
      }
    }, 10000);

    // Listen for keydown and keyup events
    document.addEventListener("keydown", (event) => {
      if (event.key === "Shift" && !shiftHeld) {
        shiftStartTime = Date.now();
        shiftHeld = true;
      }
    });

    document.addEventListener("keyup", (event) => {
      if (event.key === "Shift") {
        const shiftDuration = Date.now() - shiftStartTime;
        if (shiftDuration >= 3000) {  // If Shift was held for 3 seconds
          window.location.href = "boot2.html";
        }
        shiftHeld = false;
      }
    });
}
function BOOT2() {
    // Redirect to check.html after 10 seconds
    setTimeout(() => {
      window.location.href = "check.html";
    }, 10000);
}
function CHECK() {
        document.addEventListener("DOMContentLoaded", function() {
            // Check the installation status from localStorage
            const isInstalled = localStorage.getItem("isInstalled");

            // Redirect based on the value of isInstalled
            if (isInstalled === "true") {
                // If installed, redirect to login page
                window.location.href = "../system/login/login.html";
            } else {
                // If not installed, redirect to the setup page
                window.location.href = "../setup/install.html";
            }
        });
}
function RESTART() {
let shiftPressedTime = 0;
    let shiftHeldDown = false;

    // Detect if the Shift key is held down
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Shift' && !shiftHeldDown) {
        shiftPressedTime = Date.now(); // Start tracking when Shift is pressed
        shiftHeldDown = true;
      }
    });

    document.addEventListener('keyup', (e) => {
      if (e.key === 'Shift') {
        shiftHeldDown = false;
      }
    });

    // Check if Shift key is held down for more than 5 seconds
    function checkShiftDuration() {
      if (shiftHeldDown && Date.now() - shiftPressedTime >= 5000) {
        window.location.href = 'op.html'; // Redirect to op.html after holding Shift for 5 seconds
      }
    }

    // Redirect to check.html after 10 seconds
    setTimeout(() => {
      if (!shiftHeldDown || Date.now() - shiftPressedTime < 5000) {
        window.location.href = "../index.html";
      }
    }, 10000);

    // Periodically check if Shift is held for 5 seconds
    setInterval(checkShiftDuration, 100);
}
function SHUTDOWN() {
 // After 10 seconds, clear the screen and display the message
    setTimeout(() => {
      // Clear the content of the container
      document.getElementById("container").style.display = "none";

      // Create the message element
      const message = document.createElement("div");
      message.className = "message";
      message.innerText = "It is now ok to turn off your computer";

      // Append the message to the body
      document.body.appendChild(message);

      // Show the message
      message.style.display = "block";
    }, 10000);
}
function TERMSRT() {
// Redirect to boot.html after 10 seconds
    setTimeout(() => {
      window.location.href = "boot.html";
    }, 10000);
}
function BOOTOPTION() {
// Redirect to check.html after 10 seconds
    setTimeout(() => {
      window.location.href = "terminal.html";
    }, 10000);
}
/**
* basic function completed now more complex functions that require a lot more work to get working in the kernel
*/
/**
*
* START OF MAIN SECTION
*
*/
function LOGIN() {
document.addEventListener("DOMContentLoaded", function () {
    const mainScreen = document.getElementById("main-screen");
    const loginScreen = document.getElementById("login-screen");
    const powerModal = document.getElementById("power-modal");
    const powerBtn = document.getElementById("power-btn");
    const shutdownBtn = document.getElementById("shutdown-btn");
    const restartBtn = document.getElementById("restart-btn");
    const cancelBtn = document.getElementById("cancel-btn");

    const loginBtn = document.getElementById("login-btn");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const loginMessage = document.getElementById("login-message");

    let inactivityTimer;

    function updateTimeAndDate() {
        const now = new Date();
        document.getElementById("time").textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        document.getElementById("date").textContent = now.toLocaleDateString();
    }
    setInterval(updateTimeAndDate, 1000);
    updateTimeAndDate();

    function switchToLoginScreen() {
        mainScreen.classList.remove("active");
        loginScreen.classList.add("active");
        resetInactivityTimer();
    }

    function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            loginScreen.classList.remove("active");
            mainScreen.classList.add("active");
        }, 10000);
    }

    mainScreen.addEventListener("click", switchToLoginScreen);
    mainScreen.addEventListener("keypress", switchToLoginScreen);

    loginScreen.addEventListener("click", resetInactivityTimer);
    loginScreen.addEventListener("keypress", resetInactivityTimer);

    powerBtn.addEventListener("click", () => {
        powerModal.style.display = "flex";
    });

    cancelBtn.addEventListener("click", () => {
        powerModal.style.display = "none";
    });

    shutdownBtn.addEventListener("click", () => {
        window.location.href = "../../end/shut.html";
    });

    restartBtn.addEventListener("click", () => {
        window.location.href = "../../end/rest.html";
    });

    loginBtn.addEventListener("click", function () {
        const storedUsername = localStorage.getItem("username");
        const storedPassword = localStorage.getItem("password");

        const enteredUsername = usernameInput.value.trim();
        const enteredPassword = passwordInput.value.trim();

        if (!enteredUsername || !enteredPassword) {
            loginMessage.textContent = "Please enter both username and password.";
            loginMessage.style.color = "red";
            return;
        }

        if (enteredUsername === storedUsername && enteredPassword === storedPassword) {
            loginMessage.innerHTML = `
                <div class="welcome-message">
                    <div class="spinner"></div>
                    <p>Welcome</p>
                </div>
            `;
            loginMessage.style.color = "green";
            setTimeout(() => {
                window.location.href = "../desktop/desktop.html";
            }, 2000);
        } else {
            loginMessage.textContent = "Invalid Username or Password.";
            loginMessage.style.color = "red";
        }
    });
});
}

function DESKTOP() {
const startButton = document.getElementById('startButton');
const startMenu = document.getElementById('startMenu');
const taskbarTime = document.getElementById('taskbarTime');

const appIcons = [
  { id: 'app1Icon', windowId: 'window1' },
  { id: 'app2Icon', windowId: 'window2' },
  { id: 'app3Icon', windowId: 'window3' },
  { id: 'app4Icon', windowId: 'window4' },
];

// Set up draggable windows
const draggableWindows = [
  { windowId: 'window1', headerId: 'window1Header' },
  { windowId: 'window2', headerId: 'window2Header' },
  { windowId: 'window3', headerId: 'window3Header' },
  { windowId: 'window4', headerId: 'window4Header' },
];

let isDragging = false;
let offsetX, offsetY;

function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const date = now.toLocaleDateString();
  taskbarTime.textContent = `${hours}:${minutes} | ${date}`;
}
setInterval(updateTime, 1000);
updateTime();

startButton.addEventListener('click', () => {
  startMenu.style.display = startMenu.style.display === 'block' ? 'none' : 'block';
});

window.addEventListener('click', (e) => {
  if (!startButton.contains(e.target) && !startMenu.contains(e.target)) {
    startMenu.style.display = 'none';
  }
});

// Window controls and draggable functionality
function makeDraggable(windowElement, headerElement) {
  headerElement.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - windowElement.offsetLeft;
    offsetY = e.clientY - windowElement.offsetTop;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function onMouseMove(e) {
    if (isDragging) {
      const windowTop = e.clientY - offsetY;
      const windowLeft = e.clientX - offsetX;

      windowElement.style.left = `${windowLeft}px`;
      windowElement.style.top = `${windowTop}px`;

      if (windowTop <= 0) {
        windowElement.classList.add('fullscreen');
        windowElement.style.left = '0';
        windowElement.style.top = '0';
        windowElement.style.width = '100vw';
        windowElement.style.height = '100vh';
      } else if (windowElement.classList.contains('fullscreen')) {
        windowElement.classList.remove('fullscreen');
        windowElement.style.width = '300px';
        windowElement.style.height = '400px';
        windowElement.style.left = '50px';
        windowElement.style.top = '50px';
      }
    }
  }

  function onMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
}

draggableWindows.forEach(({ windowId, headerId }) => {
  const windowElement = document.getElementById(windowId);
  const headerElement = document.getElementById(headerId);
  makeDraggable(windowElement, headerElement);
});

appIcons.forEach(({ id, windowId }) => {
  const icon = document.getElementById(id);
  const windowElement = document.getElementById(windowId);

  icon.addEventListener('click', () => {
    windowElement.style.display = 'block';
  });

  const closeButton = windowElement.querySelector('.window-button:nth-child(3)');
  const maximizeButton = windowElement.querySelector('.window-button:nth-child(2)');
  const minimizeButton = windowElement.querySelector('.window-button:nth-child(1)');

  closeButton.addEventListener('click', () => {
    windowElement.style.display = 'none';
  });

  maximizeButton.addEventListener('click', () => {
    const isFullScreen = windowElement.classList.toggle('fullscreen');
    if (isFullScreen) {
      windowElement.style.left = '0';
      windowElement.style.top = '0';
      windowElement.style.width = '100vw';
      windowElement.style.height = '100vh';
    } else {
      windowElement.style.left = '50px';
      windowElement.style.top = '50px';
      windowElement.style.width = '300px';
      windowElement.style.height = '400px';
    }
  });

  minimizeButton.addEventListener('click', () => {
    windowElement.style.display = 'none';
  });
});

const desktop = document.getElementById('desktop');
const contextMenu = document.getElementById('contextMenu');
const newFolderButton = document.getElementById('newFolder');
const newFileButton = document.getElementById('newFile');
const nameModal = document.getElementById('nameModal');
const itemNameInput = document.getElementById('itemName');
const saveNameButton = document.getElementById('saveNameButton');
const cancelNameButton = document.getElementById('cancelNameButton');
let currentItem = null;

const gridSpacing = 100;
let occupiedCells = [];
let itemElements = [];

desktop.addEventListener('contextmenu', (e) => {
  e.preventDefault();

  const { clientX: mouseX, clientY: mouseY } = e;
  const x = Math.round(mouseX / gridSpacing) * gridSpacing;
  const y = Math.round(mouseY / gridSpacing) * gridSpacing;

  const existingItem = itemElements.find(item =>
    Math.round(item.offsetLeft / gridSpacing) * gridSpacing === x &&
    Math.round(item.offsetTop / gridSpacing) * gridSpacing === y
  );

  if (existingItem) {
    // If an item exists in this square, show the "Open" and "Delete" options
    openItemContextMenu(existingItem, mouseX, mouseY);
  } else {
    // If no item exists, show the "New Folder" and "New File" options
    contextMenu.style.top = `${mouseY}px`;
    contextMenu.style.left = `${mouseX}px`;
    contextMenu.style.display = 'block';

    const newFolderOption = document.createElement('div');
    newFolderOption.classList.add('context-menu-item');
    newFolderOption.textContent = 'New Folder';
    newFolderOption.addEventListener('click', () => {
      createNewItem('folder');
    });

    const newFileOption = document.createElement('div');
    newFileOption.classList.add('context-menu-item');
    newFileOption.textContent = 'New File';
    newFileOption.addEventListener('click', () => {
      createNewItem('file');
    });

    contextMenu.innerHTML = ''; // Clear existing options
    contextMenu.appendChild(newFolderOption);
    contextMenu.appendChild(newFileOption);
  }
});
function createNewItem(type) {
  const item = document.createElement('div');
  item.classList.add('desktop-item');

  if (type === 'file' || type === 'folder') {
    // Show modal for naming the item
    nameModal.style.display = 'flex';
    itemNameInput.value = '';
    currentItem = item;

    // Set the context for file or folder creation
    if (type === 'file') {
      item.innerHTML = `
        <img src="taskbar/textf.png" alt="file">
        <span>New File</span>
      `;
    } else {
      item.innerHTML = `
        <img src="taskbar/fe.jpg" alt="folder">
        <span>New Folder</span>
      `;
    }

    // Add event listener to the Save button
    saveNameButton.onclick = () => {
      const newName = itemNameInput.value.trim();
      if (newName) {
        if (type === 'file' && newName.endsWith('.nexs')) {
          // Special handling for .nexs files
          item.innerHTML = `
            <img src="taskbar/nexs.jpg" alt="file">
            <span>${newName}</span>
          `;
        } else if (type === 'file') {
          // Handle normal file creation
          item.innerHTML = `
            <img src="taskbar/textf.png" alt="file">
            <span>${newName}</span>
          `;
        } else if (type === 'folder') {
          // Handle folder creation
          item.innerHTML = `
            <img src="taskbar/fe.jpg" alt="folder">
            <span>${newName}</span>
          `;
        }
        desktop.appendChild(item);
        makeDraggable(item);

        itemElements.push(item);  // Track the item
        currentItem = null;
        nameModal.style.display = 'none'; // Hide modal after saving name
        contextMenu.style.display = 'none'; // Hide context menu
      } else {
        alert('Please enter a valid name for the item.');
      }
    };

    cancelNameButton.onclick = () => {
      nameModal.style.display = 'none'; // Close modal without saving
      currentItem = null;
    };
  }
}


saveNameButton.addEventListener('click', () => {
  const newName = itemNameInput.value.trim();
  if (newName) {
    if (!currentItem) {
      const type = contextMenu.style.display === 'none' ? 'file' : 'folder';
      createNewItem(type);
    } else {
      currentItem.querySelector('span').textContent = newName;
    }
    nameModal.style.display = 'none';
    currentItem = null;
  } else {
    alert('Please enter a valid name for the item.');
  }
});

cancelNameButton.addEventListener('click', () => {
  nameModal.style.display = 'none';
  currentItem = null;
});

function makeDraggable(item) {
  let offsetX, offsetY;
  let isDragging = false;

  item.addEventListener('mousedown', (e) => {
    if (e.button === 0) {  // Left mouse button (0)
      e.preventDefault();

      isDragging = true;

      offsetX = e.clientX - item.getBoundingClientRect().left;
      offsetY = e.clientY - item.getBoundingClientRect().top;

      window.addEventListener('mousemove', moveItem);
      window.addEventListener('mouseup', dropItem);
    }
  });

  function moveItem(e) {
    if (isDragging) {
      let x = e.clientX - offsetX;
      let y = e.clientY - offsetY;

      x = Math.round(x / gridSpacing) * gridSpacing;
      y = Math.round(y / gridSpacing) * gridSpacing;

      if (!isPositionOccupied(x, y)) {
        item.style.position = 'absolute';
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
      }
    }
  }

  function dropItem() {
    if (isDragging) {
      const x = Math.round(item.offsetLeft / gridSpacing) * gridSpacing;
      const y = Math.round(item.offsetTop / gridSpacing) * gridSpacing;

      if (!isPositionOccupied(x, y)) {
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        markPositionOccupied(x, y);
      } else {
        item.style.left = `${item.offsetLeft}px`;
        item.style.top = `${item.offsetTop}px`;
      }

      isDragging = false;
      window.removeEventListener('mousemove', moveItem);
      window.removeEventListener('mouseup', dropItem);
    }
  }
}

function isPositionOccupied(x, y) {
  return occupiedCells.some(cell => cell.x === x && cell.y === y);
}

function markPositionOccupied(x, y) {
  occupiedCells.push({ x, y });
}

function removeOccupiedPosition(x, y) {
  occupiedCells = occupiedCells.filter(cell => !(cell.x === x && cell.y === y));
}

function openItemContextMenu(item, mouseX, mouseY) {
  contextMenu.style.top = `${mouseY}px`;
  contextMenu.style.left = `${mouseX}px`;
  contextMenu.style.display = 'block';

  const openOption = document.createElement('div');
  openOption.classList.add('context-menu-item');
  openOption.textContent = 'Open';
  openOption.addEventListener('click', () => {
    openItem(item);
  });

  const deleteOption = document.createElement('div');
  deleteOption.classList.add('context-menu-item');
  deleteOption.textContent = 'Delete';
  deleteOption.addEventListener('click', () => {
    deleteItem(item);
  });

  contextMenu.innerHTML = ''; // Clear existing options
  contextMenu.appendChild(openOption);
  contextMenu.appendChild(deleteOption);
}

function openItem(item) {
  alert(`Opening ${item.querySelector('span').textContent}`);
  contextMenu.style.display = 'none';
}

function deleteItem(item) {
  item.remove();
  const x = Math.round(item.offsetLeft / gridSpacing) * gridSpacing;
  const y = Math.round(item.offsetTop / gridSpacing) * gridSpacing;

  removeOccupiedPosition(x, y);
  contextMenu.style.display = 'none';
}

window.addEventListener('click', () => {
  contextMenu.style.display = 'none';
});
}
/**
* now time for the app the behavour is also buggy which is going to be investgated
*/
function EXPLORER() {
console.log("File Explorer has not been made")
}
function SETTINGS() {
const taskbarOverlayCheckbox = document.getElementById('taskbar-overlay');
        const restartModal = document.getElementById('restart-modal');
        const restartNowButton = document.querySelector('.restart-now');

        const personalizationSection = document.getElementById('personalization-section');
        const factoryResetSection = document.getElementById('factory-reset-section');
        const factoryResetButton = document.querySelector('[data-section="factory-reset"]');

        // Show modal when the checkbox is toggled
        taskbarOverlayCheckbox.addEventListener('change', () => {
            restartModal.style.display = 'flex';
        });

        // Toggle between sections
        factoryResetButton.addEventListener('click', () => {
            personalizationSection.style.display = 'none';
            factoryResetSection.style.display = 'block';
        });

        // Factory Reset actions
        document.getElementById('delete-btn').addEventListener('click', function() {
            // Clear local storage
            localStorage.clear();

            // Show restart modal
            restartModal.style.display = 'flex';
        });

        // Prevent any actions until restart is complete
        restartNowButton.addEventListener('click', function() {
            // Here you can trigger the restart operation or show a message

        });

        // Close the operation (cancel)
        document.getElementById('exit-btn').addEventListener('click', function() {
            window.location.href = "settings.html"; // Example redirection to the main page
        });
}
function TEXT() {
const editor = document.getElementById('text-editor');
        const modal = document.getElementById('clearModal');
        const alertModal = document.getElementById('alertModal');
        const saveModal = document.getElementById('saveModal');
        const fileMenu = document.getElementById('file-menu');

        // Load saved content from localStorage
        window.onload = () => {
            const savedText = localStorage.getItem('textEditorContent');
            if (savedText) {
                editor.value = savedText;
            }
        };

        // Save content to localStorage as you type
        editor.addEventListener('input', () => {
            localStorage.setItem('textEditorContent', editor.value);
        });

        // Toggle file menu visibility
        function toggleFileMenu() {
            fileMenu.style.display = fileMenu.style.display === 'block' ? 'none' : 'block';
        }

        // Hide file menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!event.target.closest('.editor-header')) {
                fileMenu.style.display = 'none';
            }
        });

        // Show save confirmation modal
        function showSaveModal() {
            localStorage.setItem('textEditorContent', editor.value); // Save to localStorage
            saveModal.style.display = 'flex';
        }

        // Close the save modal
        function closeSaveModal() {
            saveModal.style.display = 'none';
        }

        // Show modal for clearing content
        function showModal() {
            modal.style.display = 'block';
        }

        // Hide modal
        function hideModal() {
            modal.style.display = 'none';
        }

        // Clear content
        function confirmClear() {
            editor.value = '';
            localStorage.removeItem('textEditorContent');
            hideModal();
        }

        // Show alert in modal
        function showAlert(message) {
            alertMessage.textContent = message;
            alertModal.style.display = 'flex';
        }

        // Close alert modal
        function closeAlert() {
            alertModal.style.display = 'none';
        }
}
/**
* START OF TRAP
*/
function SETUP() {
}
/**
*
* this is the setup function it for some reason doesnt like to work and likes to make everything buggy
* this is going to be investigated as it has no reason to do as as it works perfectly fine in the html file not this kernel
* has been tested in other kernels and other javascript files but that still doesn't work
* the suspected reason is that it requires html code to start if so i will add a html section for the setup and other codes that may need it if that is the case
*
*/
function TERMINAL() {
}
/**
* this is the terminal function it for some reason doesnt like to work and likes to make everything buggy
* this is going to be investigated as it has no reason to do as as it works perfectly fine in the html file not this kernel
* has been tested in other kernels and other javascript files but that still doesn't work
* the suspected reason is that it requires html code to start if so i will add a html section for the setup and other codes that may need it if that is the case
*
* END OF TRAP
*/
/**
* End of the kernel for this there will be an error handiling section with all of the codefor if theres an error with any files just in case.
* what will happen is that this function will be called and it will:
*
* Clear the screen and display a balck background with text and an image saying about theres been a kernel error
* It will automaticlly restart and try again if not it will keep returning to this screen
*/
function ERROR() {
// Create a new style element to add CSS
    const style = document.createElement('style');
    style.textContent = `
        body {
            margin: 0;
            padding: 0;
            background-color: black;
            color: white;
            display: flex;
            justify-content: topleft;
            align-items: center;
            height: 100vh;
            font-family: Arial, sans-serif;
            text-align: center;
        }
        #message {
            font-size: 2em;
        }
    `;
    document.head.appendChild(style);

    // Create a message element to display the text
    const message = document.createElement('div');
    message.id = 'message';
    message.textContent = 'Kernel Error';
    document.body.appendChild(message);

    // Redirect to another HTML file after 5 seconds
    setTimeout(() => {
        window.location.href = 'rest.html'; // Replace with your desired target HTML file
    }, 5000); // 5 seconds delay before redirecting
}
