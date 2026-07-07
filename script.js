// Transform Controls
    const rotateSlider = document.getElementById('rotateSlider');
    const scaleSlider = document.getElementById('scaleSlider');
    const rotateBox = document.getElementById('rotateBox');
    const rotateValue = document.getElementById('rotateValue');
    const scaleValue = document.getElementById('scaleValue');
    const transformCode = document.getElementById('transformCode');

    function updateTransform() {
        const rotate = rotateSlider.value;
        const scale = scaleSlider.value;
        
        rotateBox.style.transform = `rotate(${rotate}deg) scale(${scale})`;
        rotateValue.textContent = `${rotate}deg`;
        scaleValue.textContent = `${scale}x`;
        transformCode.textContent = `transform: rotate(${rotate}deg) scale(${scale});`;
    }

    rotateSlider.addEventListener('input', updateTransform);
    scaleSlider.addEventListener('input', updateTransform);

    // Shadow Controls
    const shadowX = document.getElementById('shadowX');
    const shadowY = document.getElementById('shadowY');
    const shadowBlur = document.getElementById('shadowBlur');
    const shadowSpread = document.getElementById('shadowSpread');
    const shadowBox = document.getElementById('shadowBox');
    const shadowXValue = document.getElementById('shadowXValue');
    const shadowYValue = document.getElementById('shadowYValue');
    const shadowBlurValue = document.getElementById('shadowBlurValue');
    const shadowSpreadValue = document.getElementById('shadowSpreadValue');
    const shadowCode = document.getElementById('shadowCode');

    function updateShadow() {
        const x = shadowX.value;
        const y = shadowY.value;
        const blur = shadowBlur.value;
        const spread = shadowSpread.value;
        
        shadowBox.style.boxShadow = `${x}px ${y}px ${blur}px ${spread}px rgba(0,0,0,0.5)`;
        shadowXValue.textContent = `${x}px`;
        shadowYValue.textContent = `${y}px`;
        shadowBlurValue.textContent = `${blur}px`;
        shadowSpreadValue.textContent = `${spread}px`;
        shadowCode.textContent = `box-shadow: ${x}px ${y}px ${blur}px ${spread}px rgba(0,0,0,0.5);`;
    }

    shadowX.addEventListener('input', updateShadow);
    shadowY.addEventListener('input', updateShadow);
    shadowBlur.addEventListener('input', updateShadow);
    shadowSpread.addEventListener('input', updateShadow);

    // Color Picker
    let currentColor = '#CE5937';
    let currentOpacity = 1;

    const hexDisplay = document.getElementById('hexDisplay');
    const opacitySlider = document.getElementById('opacitySlider');
    const opacityValue = document.getElementById('opacityValue');
    const colorInput = document.getElementById('colorInput');
    const bgInput = document.getElementById('bgInput');
    const borderInput = document.getElementById('borderInput');
    const textShadowInput = document.getElementById('textShadowInput');
    const boxShadowInput = document.getElementById('boxShadowInput');
    const paletteGrid = document.getElementById('paletteGrid');
    const colorLabels = document.querySelectorAll('.color-label');

    // Palette colors - 36 colors gaya nung nasa picture
    const paletteColors = [
        '#000000', '#5C3317', '#3D2817', '#000080', '#0000FF', '#404040', '#800000', '#FF0000', '#FF8C00', '#808000', '#00FF00', '#0000FF',
        '#808080', '#999999', '#FF0000', '#FFA500', '#FFD700', '#90EE90', '#00FFFF', '#4169E1', '#8A2BE2', '#A9A9', '#FF00FF', '#FFFF00',
        '#FFFF00', '#00FF00', '#00FFFF', '#87CEEB', '#8B008B', '#FFB6C1', '#FFA07A', '#FFE4B5', '#ADD8E6', '#E0FFFF'
    ];

    function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    function getContrastColor(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 128 ? '#000' : '#fff';
    }

    function updateColorPicker(color, opacity) {
        currentColor = color;
        currentOpacity = opacity;
        
        hexDisplay.value = color.substring(1).toUpperCase();
        hexDisplay.style.background = color;
        hexDisplay.style.color = getContrastColor(color);
        opacityValue.textContent = opacity;
        
        const rgba = hexToRgba(color, opacity);
        
        // Update all CSS outputs
        colorInput.value = `color: ${color};`;
        bgInput.value = `background-color:${color};`;
        borderInput.value = `border: 3px solid ${color};`;
        textShadowInput.value = `text-shadow: 1px 2px 2px ${color};`;
        boxShadowInput.value = `box-shadow: 2px 2px 7px 1px ${color};`;
        
        // Update slider background
        opacitySlider.style.background = `linear-gradient(to right, transparent, ${color})`;
    }

    // Create palette
    paletteColors.forEach(color => {
        const div = document.createElement('div');
        div.className = 'palette-color';
        div.style.background = color;
        div.addEventListener('click', () => {
            updateColorPicker(color, currentOpacity);
        });
        paletteGrid.appendChild(div);
    });

    // Opacity slider
    opacitySlider.addEventListener('input', (e) => {
        updateColorPicker(currentColor, e.target.value);
    });

    // Color label clicks - highlight selected
    colorLabels.forEach(label => {
        label.addEventListener('click', () => {
            colorLabels.forEach(l => l.classList.remove('selected'));
            label.classList.add('selected');
            
            // Copy to clipboard
            const input = label.previousElementSibling;
            if (input && input.tagName === 'INPUT') {
                input.select();
                navigator.clipboard.writeText(input.value);
                
                // Visual feedback
                const originalText = label.textContent;
                label.textContent = 'Copied!';
                setTimeout(() => {
                    label.textContent = originalText;
                }, 1000);
            }
        });
    });

    // Float Controls
    const floatSelect = document.getElementById('floatSelect');
    const floatBox = document.getElementById('floatBox');
    const floatCode = document.getElementById('floatCode');
    const clearFloatBtn = document.getElementById('clearFloatBtn');
    const clearDiv = document.getElementById('clearDiv');
    let clearActive = false;

    function updateFloat() {
        const floatValue = floatSelect.value;
        floatBox.style.float = floatValue;
        floatCode.textContent = `.box { float: ${floatValue}; }`;
    }

    floatSelect.addEventListener('change', updateFloat);

    clearFloatBtn.addEventListener('click', () => {
        clearActive = !clearActive;
        if (clearActive) {
            clearDiv.style.display = 'block';
            clearFloatBtn.textContent = 'Remove Clear';
            clearFloatBtn.classList.add('active');
        } else {
            clearDiv.style.display = 'none';
            clearFloatBtn.textContent = 'Clear Float';
            clearFloatBtn.classList.remove('active');
        }
    });

    // Display Playground Controls
    const displaySelect = document.getElementById('displaySelect');
    const displayParent = document.getElementById('displayParent');
    const displayInfo = document.getElementById('displayInfo');
    const displayCode = document.getElementById('displayCode');
    const addElementBtn = document.getElementById('addElementBtn');
    const resetDisplayBtn = document.getElementById('resetDisplayBtn');
    let elementCount = 3;

    const displayDescriptions = {
        'block': '<strong>display: block</strong> - Tumatakbo sa buong width, may sariling line. Pwede lagyan ng width/height, margin, padding. Example: div, p, h1',
        'inline': '<strong>display: inline</strong> - Tumatabi lang, walang width/height. Hindi pwede lagyan ng margin top/bottom. Example: span, a, strong',
        'inline-block': '<strong>display: inline-block</strong> - Best of both! Tumatabi PERO pwede lagyan ng width/height at full margin/padding. Example: button, img',
        'none': '<strong>display: none</strong> - Mawawala completely sa page, parang di nag-exist. Hindi lang invisible — removed sa layout!',
        'flex': '<strong>display: flex</strong> - Parent becomes flex container. Anak magiging flex items na naka-row by default.',
        'grid': '<strong>display: grid</strong> - Parent becomes grid container. Anak magiging grid items na naka-auto-flow.'
    };

    function updateDisplay() {
        const displayValue = displaySelect.value;
        const elements = displayParent.querySelectorAll('.display-element');

        if (displayValue === 'flex' || displayValue === 'grid') {
            displayParent.style.display = displayValue;
            if (displayValue === 'grid') {
                displayParent.style.gridTemplateColumns = 'repeat(3, 1fr)';
                displayParent.style.gap = '10px';
            } else {
                displayParent.style.gap = '10px';
            }
            elements.forEach(el => {
                el.style.display = 'block';
            });
        } else {
            displayParent.style.display = 'block';
            displayParent.style.gridTemplateColumns = '';
            displayParent.style.gap = '';
            elements.forEach(el => {
                el.style.display = displayValue;
            });
        }

        displayInfo.innerHTML = displayDescriptions[displayValue];
        displayCode.textContent = `.element { display: ${displayValue}; }`;
    }

    displaySelect.addEventListener('change', updateDisplay);

    addElementBtn.addEventListener('click', () => {
        elementCount++;
        const newBox = document.createElement('div');
        newBox.className = 'display-element';
        newBox.textContent = `Box ${elementCount}`;
        newBox.style.background = `hsl(${Math.random() * 360}, 70%, 50%)`;
        displayParent.appendChild(newBox);
        updateDisplay();
    });

    resetDisplayBtn.addEventListener('click', () => {
        displayParent.innerHTML = `
            <div class="display-element">Box 1</div>
            <div class="display-element">Box 2</div>
            <div class="display-element">Box 3</div>
        `;
        elementCount = 3;
        displaySelect.value = 'block';
        updateDisplay();
    });
        
        
    // Initialize lahat
    updateTransform();
    updateShadow();
    updateColorPicker('#CE5937', 1);
    updateFloat();
    updateDisplay();
