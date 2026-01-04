/*

    ╔═  ══  ══  ══  ══  ══  ══  ══  ══  ══  ══  ══  ══  ══  ══  ══  ══  ══  ══  ══  ══  ══  ═╗
           ______             _____   ______    _____   __  __   ______   _   _   _______    
    ║     |____  |           / ____| |  ____|  / ____| |  \/  | |  ____| | \ | | |__   __|   ║
              / /   ______  | (___   | |__    | |  __  | \  / | | |__    |  \| |    | |      
    ║        / /   |______|  \___ \  |  __|   | | |_ | | |\/| | |  __|   | . ` |    | |      ║
            / /              ____) | | |____  | |__| | | |  | | | |____  | |\  |    | |      
    ║      /_/              |_____/  |______|  \_____| |_|  |_| |______| |_| \_|    |_|      ║                               
                              _____                              __                          
    ║                        / ___/ ___   ___  _  __ ___   ____ / /_ ___   ____              ║
                            / /__  / _ \ / _ \| |/ // -_) / __// __// _ \ / __/             
    ║                       \___/  \___//_//_/|___/ \__/ /_/   \__/ \___//_/                 ║

    ╚═  ══  ══  ══  ══  ══  ══  ══  ══  ══  ══  ══  ══  ══  ══  ══  ══  ══  ══  ══  ══  ══  ═╝
     01010011 01000001 01001010 01000001 01000100 00100000 01011010 01000001 01010010 01000101

 * @file script.js
 * @description A tool for converting numbers, alphabets, and special characters into binary, 
 *              hexadecimal, and decimal codes for seven-segment displays.
 * @author [Sajad Zare]
 * @license MIT (with humanitarian clause)
 * @version 1.0.0
 * @created [04:30 AM 2/23/2025]
 * @updated [10:42 AM 2/25/2025]
 * Copyright (c) 2025 Sajad Zare
 * 
 * @overview
 * This program is essentially a converter for numbers, letters, and special characters that can be displayed
 * on seven-segment displays into binary, hexadecimal, and decimal codes. You can easily draw all numbers, letters, or
 * special characters on the display with just a click and finally copy the corresponding code to use in your programs
 * effortlessly. This saves you time, allowing you to focus on your main project.
 * This tool is designed and developed solely for educational purposes, aimed at electronics and computer enthusiasts,
 * programmers, and anyone interested in learning or teaching these concepts. I will soon add 14-segment and 16-segment
 * displays to this project as well.
 * I’d be happy if anyone uses this program in their lessons or educational videos, and just so you know, there are no
 * restrictions from my side in this regard. Please share your feedback to help me identify my strengths and weaknesses
 * so I can improve or refine them in future versions.
 *
 * I love you all very much! ❤
 * 
 * @license
 * This project is completely free and has no restrictions on usage, distribution, or modification 
 * as long as it is used for **humanitarian and ethical purposes**. You are encouraged (but not required) 
 * to credit the original author.  
 * 
 * @features
 * - Supports numbers, alphabets, and special characters
 * - Easy visualization and code generation
 * - Saves time by simplifying segment coding
 * - Designed for learning, teaching, and practical use
 * - Future updates will include 14-segment and 16-segment displays
 * 
 * @usage
 * Feel free to use this program in educational videos, tutorials, and learning materials. 
 * There are no restrictions on its educational use. Your feedback is highly appreciated 
 * to help improve future versions.
 * 
 * @contact
 * Developer: [Sajad Zare]
 * Email: [sss.zare@gmail.com]
 * GitHub: [sss-zare]
 * 
 * Enjoy coding! ❤
 */


// Available surface display colors (background area around segments)
const surfaceColors = {
    BLACK: "#2c2e32",
    GRAY: "#7b8e95"
};


// Available inactive segment colors (when a segment is turn off)
const inactiveColors = {
    LIGHTGRAY: "#9b9b9b",
    CITRON: "#d9ce5a",
    BLACK: "#2c2e32"
}


// Available emitting segment colors (when a segment is turn on)
const activeColors = {
    RED: "#ef233c",
    GREEN: "#06d6a0",
    BLUE: "#00bbf9",
    YELLOW: "#ffbe0b",
    ORANGE: "#fb5607",
    WHITE: "#ffffff"
};


/*
    NOTE:
    Handle the issue of white color visibility on a white background.
    Replace white with a grayish shade for better visibility on a white background. 
*/
const EXCEPTION_COLOR = activeColors.WHITE.toLocaleLowerCase();
const ALTERNATIVE_COLOR = "#8d8d8d";


/*
    NOTE:
    There are two common types of LED 7-segment displays (Common Type)

    1. Common Cathode → (CC)
    2. Common Anode → (CA)

    Each segment has two states:

    1. Active (when a segment is turn on or lit)
    2. Inactive (when a segment is turn off or unlit)

    Segment behavior for each type:

    Common Cathode ➝ Active segment = 1 (ON) , Inactive segment = 0 (OFF)
    Common Anode ➝  Active segment = 0 (ON), Inactive segment = 1 (OFF)        
*/
const commonTypes = {
    COMMON_CATHODE: "CommonCathode",
    COMMON_ANODE: "CommonAnode"
};

/* 
    ╔═════════════╗
    ║  BIT ORDER  ║
    ╚═════════════╝

    + LSBFIRST (Most Significant Bit)
    
             MSB                         LSB
              ↓                           ↓
            ┌───┬───┬───┬───┬───┬───┬───┬───┐
            │ A │ B │ C │ D │ E │ F │ G │DP │ ─→─┐
            └───┴───┴───┴───┴───┴───┴───┴───┘    ↓ 
        ┌──←────←────←────←────←────←────←────←──┘
        ↓   ┌───┬───┬───┬───┬───┬───┬───┬───┐
        └─→ │Q0 │Q1 │Q2 │Q3 │Q4 │Q5 │Q6 │Q7 │ ─→ STORAGE REGISTER
            └───┴───┴───┴───┴───┴───┴───┴───┘

    + MSBFIRST (Least Significant Bit)

             MSB                         LSB
              ↓                           ↓
            ┌───┬───┬───┬───┬───┬───┬───┬───┐
        ┌─← │DP │ G │ F │ E │ D │ C │ B │ A │
        ↓   └───┴───┴───┴───┴───┴───┴───┴───┘
        │    
        ↓   ┌───┬───┬───┬───┬───┬───┬───┬───┐
        └─→ │Q0 │Q1 │Q2 │Q3 │Q4 │Q5 │Q6 │Q7 │ ─→ STORAGE REGISTER
            └───┴───┴───┴───┴───┴───┴───┴───┘
*/

// Define bit order options for most significant bit (MSB) and least significant bit (LSB)
const bitOrders = {
    LSB_FIRST: "LSBFIRST",
    MSB_FIRST: "MSBFIRST"
}

// Defines segment labels representing the parts of a 7-segment display
const segmentNames = ["A", "B", "C", "D", "E", "F", "G", "DP"];


// Binary map for Common Cathode 7-segment display (LSBFIRST)
const commonCathodeLookup = {
    "0" : "11111100", // 0
    "1" : "01100000", // 1
    "2" : "11011010", // 2
    "3" : "11110010", // 3
    "4" : "01100110", // 4
    "5" : "10110110", // 5
    "6" : "10111110", // 6
    "7" : "11100000", // 7
    "8" : "11111110", // 8
    "9" : "11110110", // 9
    "A" : "11101110", // A
    "b" : "00111110", // b
    "C" : "10011100", // C
    "d" : "01111010", // d
    "E" : "10011110", // E
    "F" : "10001110", // F
     "" : "00000000"  // Turn off all segments 
}


// Binary map for Common Anode 7-segment display (LSBFIRST)
const commonAnodeLookup = {
    "0" : "00000011", // 0
    "1" : "10011111", // 1
    "2" : "00100101", // 2
    "3" : "00001101", // 3
    "4" : "10011001", // 4
    "5" : "01001001", // 5
    "6" : "01000001", // 6
    "7" : "00011111", // 7
    "8" : "00000001", // 8
    "9" : "00001001", // 9
    "A" : "00010001", // A
    "b" : "11000001", // b
    "C" : "01100011", // C
    "d" : "10000101", // d
    "E" : "01100001", // E
    "F" : "01110001", // F
     "" : "11111111"  // Turn off all segments
};


// Get references to essential DOM elements for segment display, controls, and user input
const surface = document.getElementById("surface");
const segments = document.querySelectorAll(".segment");
const leds = document.querySelectorAll(".led");
const ledLights = document.querySelectorAll(".led-light");
const ledLabels = document.querySelectorAll(".led-label");
const nets = document.querySelectorAll(".net");

const commonTypeRadios = document.querySelectorAll('input[name="commonTypes"]');
const bitOrderRadios = document.querySelectorAll('input[name="bitOrders"]');
const activeColorRadios = document.querySelectorAll('input[name="activeColors"]');
const presetButtons = document.querySelector('#presetButtons')
const txtBinaryCode = document.querySelector("#txtBinaryCode");
const txtHexCode = document.querySelector("#txtHexCode");
const txtDecimalCode = document.querySelector("#txtDecimalCode");
const btnBinaryCode = document.querySelector("#btnBinaryCode");
const btnHexCode = document.querySelector("#btnHexCode");
const btnDecimalCode = document.querySelector("#btnDecimalCode");


// Initialize radio button values and default selections
// → Display Common Type
// → Bit Order
// → Emitting Color
initializeRadioButtons();

// Define global variables and set default value for display surface, segment and led colors
let surfaceColor = surfaceColors.BLACK.toLowerCase();
let inactiveSegmentColor = inactiveColors.LIGHTGRAY.toLowerCase(); // When segment is turn off or inactive
let inactiveLedColor = inactiveColors.BLACK.toLowerCase(); // When led is turn off or inactive
let activeColor = activeColorRadios[0].value.toLowerCase(); // When segment is turn on or active
let commonType = commonTypeRadios[0].value;
let bitOrder = bitOrderRadios[0].value;

// Initialize LEDs, segments, labels, led lights and bit order 
initializeMainElements();


// ========================================================================================= //
// ===| Event Listeners |=================================================================== //
// ========================================================================================= //

// Event listener for the segments
segments.forEach((segment, index) => {
    segment.addEventListener("click", function () {
        toggleSegment(segment);
        let inewIndex = bitOrder === bitOrders.LSB_FIRST ? index : 7 - index;
        setFocusOnBit(inewIndex);
    });
});


// Event listener for the leds
leds.forEach((led, index) => {
    led.addEventListener("click", function () {
        const segment = getRelatedElement(led, "segment");
        toggleSegment(segment);
        setFocusOnBit(index);
    });
});


// Event listener for the common type radio buttons
commonTypeRadios.forEach(radio => {
    radio.addEventListener("change", function () {
        if (this.checked) {
            flipVerticalLeds(this.value);
            toggleSegmentBits();
            updateCodes();

            // Common Cathode or Common Anode label change
            document.getElementById('lblCommonType')
            .textContent = commonType.replace(/(Common)/, '$1 ');
                
            document.getElementById('lblCommonLabel')
            .textContent = this.value === commonTypes.COMMON_CATHODE ? "GND" : "VCC"; 
        }
    });
});


// Event listener for the bit order radio buttons
bitOrderRadios.forEach(radio => {
    radio.addEventListener("change", function () {
        if (this.checked) {
            setBitOrder(this.value);
            updateCodes();
        }
    });
});


// Event listener for the active color radio buttons (emitting color)
activeColorRadios.forEach(radio => {
    radio.addEventListener("change", function () {
        if (this.checked) {
            setActiveSegmentColor(this.value);
        }
    });
});


// Event listener for the alphanumeric buttons (preset alphanumeric)
presetButtons.addEventListener('click', (e) => {
    const button = e.target;
    if (button.tagName === 'SPAN') {
        const alphanumeric = button.getAttribute('data-alphanumeric');
        displayAlphanumeric(alphanumeric);
    }
});


// Attach event listeners to both copy buttons
btnBinaryCode.addEventListener("click", copyCodeToClipboard);
btnHexCode.addEventListener("click", copyCodeToClipboard);
btnDecimalCode.addEventListener("click", copyCodeToClipboard);


// ========================================================================================= //
// ===| Mutation Observer |================================================================= //
// ========================================================================================= //

// Setting up MutationObserver for change segment fill
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.type === "attributes" && mutation.attributeName === "fill") {
            const oldValue = mutation.oldValue;
            const newValue = mutation.target.getAttribute("fill");

            // Only log the status if the new fill value is different from the old one
            if (oldValue !== newValue) {

                // Current segment
                const segment = mutation.target;

                initializeSegmentAttributes(segment);
                updateRelatedElements(segment);

                updateCodes();

                /* Uncomment the following code for monitor log. */
                logSegmentStatus(segment);
            }
        }
    });
});

// Observer configuration (store old values)
const config = { attributes: true, attributeOldValue: true };

// Initialize observer for each segment
segments.forEach(segment => {
    observer.observe(segment, config);
});

// ========================================================================================= //
// ===| Page Load |========================================================================= //
// ========================================================================================= //

// Initialize the page
window.onload = function () {
    feather.replace(); // load svg icons
    updateCodes(); // Update the binary, hex and decimal codes on change
};

// ========================================================================================= //
// ===| Sidebar |=========================================================================== //
// ========================================================================================= //

document.getElementById("toggle-btn").addEventListener("click", function () {
    document.getElementById("sidebar").classList.toggle("active");;
    this.classList.toggle('opened');
    this.setAttribute('aria-expanded', this.classList.contains('opened'));
});

// Click anywhere to close sidebar
document.addEventListener("click", function (event) {

    const sidebar = document.getElementById("sidebar");
    const button = document.getElementById("toggle-btn");

    if (!sidebar.contains(event.target) && event.target !== button) {
        sidebar.classList.remove("active");
    }

});

// ========================================================================================= //
// ===| Define functions |================================================================== //
// ========================================================================================= //

// Function to initialize radio button values and default selections
function initializeRadioButtons() {
    // Set values for common type radio buttons (Common Cathode & Common Anode)
    commonTypeRadios[0].value = commonTypes.COMMON_CATHODE;
    commonTypeRadios[1].value = commonTypes.COMMON_ANODE;

    // Set the first radio button as checked by default on page load (Common Type)
    commonTypeRadios[0].checked = true;

    // Set values for bit order radio buttons (LSB & MSB)
    bitOrderRadios[0].value = bitOrders.LSB_FIRST;
    bitOrderRadios[1].value = bitOrders.MSB_FIRST;

    // Set the first radio button as checked by default on page load (Bit Order)
    bitOrderRadios[0].checked = true;

    // Assign corresponding color values to each active color radio button
    activeColorRadios.forEach((radio, index) => {
        radio.value = Object.values(activeColors)[index];
    });

    // Set the first radio button as checked by default on page load (Active Color)
    activeColorRadios[0].checked = true;
}


// Function to initialize LEDs, segments, labels and led lights
function initializeMainElements() {
    // Set the surface color
    surface.setAttribute("fill", surfaceColor);

    // Initialize segments, leds, ledLabels, and ledLights on page load
    segments.forEach((segment, index) => {

        // Set initial segment attributes
        segment.setAttribute("fill", inactiveSegmentColor);
        segment.style.opacity = "1";

        // Set initial LED attributes if they exist
        if (leds[index]) {
            leds[index].id = `led_${segmentNames[index].toLowerCase()}`;
            leds[index].setAttribute("fill", inactiveLedColor);
            leds[index].style.opacity = "1";
        }

        // Set initial LED labels and LED lights based on the selected bit order (MSB or LSB)
        setBitOrder(bitOrders.LSB_FIRST);

        // Initializes and retrieves the segment's attributes (Custom Attributes)
        initializeSegmentAttributes(segment);
    });
}


// Function to update the binary, hexadecimal and decimal codes
function updateCodes() {
    let binaryCode = "";
    segments.forEach(segment => {
        const bit = segment.dataset.value;
        binaryCode = bitOrder === bitOrders.LSB_FIRST ? binaryCode + bit : bit + binaryCode;
    });

    // Update the binary input fields with each bit
    for (let i = 0; i < 8; i++) {
        // Get the bit for the current position (0 to 7)
        const bit = binaryCode.charAt(i) || "0"; // Default to "0" if no bit available
        const inputElement = document.getElementById(`txtBit${i}`); // Map bit position to input field
        inputElement.value = bit;
    }

    // Update binary code input
    txtBinaryCode.value = `B${binaryCode}`; // Add prefix "B"

    // Convert binary to hexadecimal with prefix and padding
    let hexCode = parseInt(binaryCode, 2).toString(16).toUpperCase();
    hexCode = hexCode.padStart(2, "0"); // Ensure hex is at least 2 characters
    hexCode = `0x${hexCode}`; // Add prefix "0x"
    txtHexCode.value = hexCode;

    // Convert binary to decimal
    let decimalCode = parseInt(binaryCode, 2);
    txtDecimalCode.value = decimalCode;
}


// Function to flip vertical LEDs based on the selected common type
function flipVerticalLeds(type) {
    commonType = type;
    // Determine angle based on segment configuration
    let angle = commonType === commonTypes.COMMON_CATHODE ? "0" : "180";

    leds.forEach(led => {
        // Use getBBox to get the coordinates and dimensions of each led element
        var bbox = led.getBBox();

        // Calculate the center (cx, cy) of the led
        var cx = bbox.x + bbox.width / 2;
        var cy = bbox.y + bbox.height / 2;

        // Apply the rotation based on the calculated center
        led.setAttribute('transform', `rotate(${angle} ${cx} ${cy})`);
    });
}


// Function to  toggle the 'data-value' attribute of each segment between 0 and 1
function toggleSegmentBits() {
    segments.forEach(segment => {
        const currentValue = segment.dataset.value;
        const newValue = currentValue === "0" ? "1" : "0";  // Toggle the value
        segment.dataset.value = newValue;  // Update the dataset value
    });
}


// Function to Update LED elements' IDs and labels and LED lights based on the selected bit order (MSB or LSB)
function setBitOrder(order) {

    // → LED
    // → LED Light
    // → LED Label

    bitOrder = order;
    const names = order === bitOrders.LSB_FIRST ? segmentNames : [...segmentNames].reverse();

    leds.forEach((led, index) => {
        const name = names[index];
        const n = name.toLowerCase();

        led.id = `led_${n}`;
        ledLights[index].id = `ledLight_${n}`;
        ledLabels[index].id = `ledLabel_${n}`;
        ledLabels[index].textContent = name;
    });

    reverseActiveLeds();
}


// Function to  turns off all active LEDs, updating their state, color, and related elements.
function reverseActiveLeds() {
    
    // Loop through all LEDs and set them to an inactive state
    leds.forEach(led => {
        ["ledLight", "ledLabel"].forEach(type => {
            const element = getRelatedElement(led, type);
            element.setAttribute("data-state", "off");
            element.setAttribute("fill", inactiveLedColor);
        });

        led.setAttribute("data-state", "off");
        led.setAttribute("fill", inactiveLedColor);

        getRelatedElement(led, "ledLight")
        .setAttribute("opacity", 0);
    });

    // Ensure segments is an iterable array before filtering
    Array.from(segments)
    .filter(segment => segment.currentState === "on") // Select active segments
    .forEach(updateRelatedElements); // Update their related elements
}


// Function to toggle the segment state between active (on) and inactive (off) states.
function toggleSegment(segment) {
    const isOff = segment.currentState === "off";
    const newState = isOff ? "on" : "off";
    const newValue = (isOff !== (commonType === commonTypes.COMMON_CATHODE)) ? "0" : "1";
    const newColor = isOff ? activeColor : inactiveSegmentColor;

    segment.dataset.state = newState;
    segment.dataset.value = newValue;
    segment.setAttribute("fill", newColor);
}


// Function to Updates the LED, LED Light, and LED Label states and colors based on the segment's current state.
function updateRelatedElements(segment) {

    // → LED
    // → LED Light
    // → LED Label

    const { relatedLedId, relatedLedLightId, relatedLedLabelId, currentState, currentColor } = segment;

    const led = document.getElementById(relatedLedId);
    const ledLight = document.getElementById(relatedLedLightId);
    const ledLabel = document.getElementById(relatedLedLabelId);

    if (!led || !ledLight || !ledLabel) return;

    [led, ledLight, ledLabel].forEach(el => el.setAttribute("data-state", currentState));

    const isInactive = getColorKey(inactiveColors, inactiveSegmentColor) === currentColor;
    const currentColorCode = isInactive ? inactiveLedColor : activeColors[currentColor];

    // Handling exception white color for visibility in white background
    const altCurrentColor = currentColorCode === EXCEPTION_COLOR ? ALTERNATIVE_COLOR : currentColorCode;

    led.setAttribute("fill", currentColorCode);
    ledLight.setAttribute("fill", altCurrentColor);
    ledLabel.setAttribute("fill", altCurrentColor);

    ledLight.setAttribute("opacity", currentState === "off" ? 0 : 0.3);
}


// Function to Update the color of active segments without changing inactive ones
function setActiveSegmentColor(color) {
    segments.forEach(segment => segment.currentState === "on" && segment.setAttribute("fill", color));
    activeColor = color;
}


// Function to returns the key for a color value from activeColors or inactiveColors, or "unknown" if not found
function getColorKey(colorMap, colorValue) {
    return Object.keys(colorMap).find(key => colorMap[key] === colorValue) || 
           Object.keys(inactiveColors).find(key => inactiveColors[key] === colorValue) || 
           "unknown";
}


// Function to retrieve the related element based on the current element's ID and the specified type.
function getRelatedElement(currentElement, type) {
    const currentElementId = currentElement.id;
    const newElementId = currentElementId.replace(/^[^_]+/, type);
    return document.getElementById(newElementId);
}


// Function to initializes and retrieves the segment's attributes from HTML and assigns them to the segment object
function initializeSegmentAttributes(segment) {
    Object.assign(segment, {
        name: segment.id.replace("segment_", "").toUpperCase(),
        currentState: segment.dataset.state,
        currentValue: segment.dataset.value,
        currentColor: getColorKey(activeColors, segment.getAttribute("fill")),
        activeColor: getColorKey(activeColors, activeColor),
        inactiveColor: getColorKey(inactiveColors, inactiveSegmentColor),
        relatedLedId:  getRelatedElement(segment, "led")?.id,
        relatedLedLightId: getRelatedElement(segment, "ledLight")?.id,
        relatedLedLabelId: getRelatedElement(segment, "ledLabel")?.id
    });
}


// Function to convert an alphanumeric character to binary and update the 7-segment display
function displayAlphanumeric(alphanumeric) {
    
    const binaryCode = commonType === commonTypes.COMMON_CATHODE 
        ? commonCathodeLookup[alphanumeric] 
        : commonAnodeLookup[alphanumeric];

    const activeBit = commonType === commonTypes.COMMON_CATHODE ? "1" : "0";
    const inactiveBit = commonType === commonTypes.COMMON_CATHODE ? "0" : "1";

    segments.forEach((segment, index) => {
        const isActive = binaryCode[index] === activeBit;
        Object.assign(segment.dataset, {
            state: isActive ? "on" : "off",
            value: isActive ? activeBit : inactiveBit
        });
        segment.setAttribute("fill", isActive ? activeColor : inactiveSegmentColor);
    });
}


// Function to set focus on the specified bit input field
function setFocusOnBit(index) {
    const txtBit = document.getElementById(`txtBit${index}`);
    txtBit.focus();
}


// Function to copy code (binary or hex) to clipboard
function copyCodeToClipboard(event) {

    const targetId = event.target.id;
    let codeType, codeValue;

    if (targetId === "btnBinaryCode") {
        codeType = "Binary";
        codeValue = txtBinaryCode.value;
    } else if (targetId === "btnHexCode") {
        codeType = "Hex";
        codeValue = txtHexCode.value;
    } else if (targetId === "btnDecimalCode") {
        codeType = "Decimal";
        codeValue = txtDecimalCode.value;
    } else {
        return; // Exit if the button is not recognized
    }

    // Copy to clipboard
    navigator.clipboard.writeText(codeValue).then(() => {
        // Set the message content dynamically
        document.getElementById("message-title").textContent = "Copied!";
        document.getElementById("message-body").innerHTML =
            `Copied! ${codeType} code <span class="badge text-bg-warning" style="border-radius:3px">${codeValue}</span> to clipboard.`;

        // Show confirmation message
        const toast = new bootstrap.Toast(document.getElementById('toastMessage'));
        toast.show();

    }).catch(err => {
        console.error("Failed to copy:", err);
    });
}


// Function to log the current status of the segment element to the console.
function logSegmentStatus(segment) {
    console.log({
        id: segment.id,
        name: segment.name,
        currentState: segment.currentState,
        currentValue: segment.currentValue,
        currentColor: segment.currentColor,
        activeColor : segment.activeColor,
        inactiveColor: segment.inactiveColor,
        relatedLedId: segment.relatedLedId,
        relatedLedLightId: segment.relatedLedLightId,
        relatedLedLabelId: segment.relatedLedLabelId
    });
}