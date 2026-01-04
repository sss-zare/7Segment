# 7Segment Code Generator

7Segment is a simple tool that lets you quickly generate the codes for numbers, letters, and special characters used in 7-segment displays. No more manual calculations — just click to draw the character and instantly copy the code into your project. Save time, avoid errors, and enjoy coding!

## Live Demo
Try it directly in your browser: [7Segment Code Generator](https://sss-zare.github.io/7Segment/)

## Features
- 📝 Generate codes for numbers, letters, and special characters
- 📋 Copy codes instantly to use in your projects
- 🌐 Works entirely in the browser, no installation needed

- ## How to Use
Follow these simple steps to generate 7-segment codes:

1. 🎨 **Draw your character**  
   Click on the number, letter, or special character you want to display.

2. 🖱️ **Generate the code**  
   The corresponding 7-segment code will appear instantly.

3. 📋 **Copy the code**  
   Click the "Copy" button to copy the code to your clipboard.

4. 💻 **Use in your project**  
   Paste the code into your program for microcontrollers or 7-segment displays.

5. ⚡ **Enjoy coding**  
   Save time, avoid errors, and see your characters displayed correctly!

## Options

### 1️⃣ Display Common Type
Choose the type of 7-segment display you are using:  
- **Common Cathode**  
- **Common Anode**

### 2️⃣ Bit Order (Shift Register)
Specify the bit order for your shift register, especially important when using ICs like **74HC595**:  
- **LSB First** – Least Significant Bit is sent first  
- **MSB First** – Most Significant Bit is sent first
  
Choose the option that matches your hardware setup to ensure correct display output.

### 3️⃣ Preset Alphanumeric
Quickly display commonly used numbers and characters with just one click.  
A preset “keyboard” layout is provided for frequently used values, making it easy to generate and visualize them on your 7-segment display instantly.

### 4️⃣ Emitting Color
Customize the visual color of your 7-segment display.  
This option only affects how the segments look on screen and does **not** change the generated codes or functionality.  
Choose your favorite color for a more enjoyable experience!


/* 
    BIT ORDER HELP

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
