document.getElementById("R").addEventListener("input", convertRGB);
document.getElementById("G").addEventListener("input", convertRGB);
document.getElementById("B").addEventListener("input", convertRGB);

function convertRGB(){
    var R = document.getElementById("R").value;
    var G = document.getElementById("G").value;
    var B = document.getElementById("B").value;

    document.getElementById("RValue").textContent = R;
    document.getElementById("GValue").textContent = G;
    document.getElementById("BValue").textContent = B;
    
    var colorBlocks = document.getElementById("colorblock");
    colorBlocks.innerHTML = '';


    
    var hsv = convertHSV(R,G,B);
    var rgbBlock = document.createElement("div");
    var rgbBlock = document.createElement("div");
    var cmyk = convertCMYK(R,G,B);
    var hsl = convertHSL(R,G,B);
    var hsvRGB = convertHSVToRGB(hsv.h , hsv.s , hsv.v);
    var hslRGB = convertHSLToRGB(hsl.h,hsl.l,hsl.l);
    var cmykRGB = convertCMYKToRGB(cmyk.c,cmyk.m,cmyk.y,cmyk.k)


    rgbBlock.className = "color-block";
    rgbBlock.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
    rgbBlock.textContent = `RGB(${R}, ${G}, ${B})`;
    colorBlocks.appendChild(rgbBlock);

        
    
    

        
    var hsvBlock = document.createElement("div");
    hsvBlock.className = "color-block";
    hsvBlock.style.backgroundColor = `rgb(${hsvRGB.r}, ${hsvRGB.r}, ${hsvRGB.b})`;  
    hsvBlock.textContent = `HSV(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;
    colorBlocks.appendChild(hsvBlock);


    var cmykBlock = document.createElement("div");
    cmykBlock.className = "color-block";
    cmykBlock.style.backgroundColor = `rgb(${cmykRGB.r}, ${cmykRGB.g}, ${cmykRGB.b})`; 
    cmykBlock.textContent = `CMYK(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
    colorBlocks.appendChild(cmykBlock);

    var hslBlock = document.createElement("div");
    hslBlock.className = "color-block";
    hslBlock.style.backgroundColor = `rgb(${hslRGB.r}, ${hslRGB.g}, ${hslRGB.b})`;
    hslBlock.textContent = `HSL(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
    colorBlocks.appendChild(hslBlock);
       
    
}

function convertHSV(r,g,b){
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r,g,b);
    const min = Math.min(r,g,b);
    const delta = max - min;

    let h ,s , v = max;
    if (delta === 0) {
        h = 0;
    }
    else{
        if (max === r) {
            h = ((g - b) / delta + (g < b ? 6 : 0)) % 6;
        } else if (max === g) {
            h = (b - r) / delta + 2;
        } else {
            h = (r - g) / delta + 4;
        }

        h = Math.round(h * 60);
    }
    s = max === 0 ? 0 : delta / max;
    s = Math.round(s * 100);
    v = Math.round(v * 100);    
   
  
       
    return {h,s ,v};
}
function convertCMYK(r, g, b) {
    
    var c = 1 - (r / 255);
    var m = 1 - (g / 255);
    var y = 1 - (b / 255);

   
    var k = Math.min(c, m, y);

    
    if (k == 1) {
        c = 0;
        m = 0;
        y = 0;
    } else {
        
        c = ((c - k) / (1 - k)).toFixed(2);
        m = ((m - k) / (1 - k)).toFixed(2);
        y = ((y - k) / (1 - k)).toFixed(2);
    }

  
    c = Math.round(c * 100);
    m = Math.round(m * 100);
    y = Math.round(y * 100);
    k = Math.round(k * 100);

    return { c, m, y, k };
}
function convertHSL(r,g,b){
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r,g,b);
    const min = Math.min(r,g,b);
    const delta = max - min;

    let h ,s;
    let l = (max + min) / 2;

    if (delta === 0){
        h=s=0
    }else{
        s = delta === 0 ? 0 : delta / (1 - Math.abs(2* l -1));

    }
    switch (max) {
        case r:
            h = ((g - b) / delta + (g < b ? 6 : 0)) % 6;
            break;
        case g:
            h = (b - r) / delta + 2;
            break;
        case b:
            h = (r - g) / delta + 4;
            break;
    }
    h /= 6;
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);


    return {h,s ,l};
}
function convertHSVToRGB(h, s, v) {
    s /= 100;
    v /= 100;

    var r, g, b;
    var c = v * s;
    var x = c * (1 - Math.abs((h / 60) % 2 - 1));
    var m = v - c;

    switch (Math.floor(h / 60)) {
        case 0:
            r = c; g = x; b = 0;
            break;
        case 1:
            r = x; g = c; b = 0;
            break;
        case 2:
            r = 0; g = c; b = x;
            break;
        case 3:
            r = 0; g = x; b = c;
            break;
        case 4:
            r = x; g = 0; b = c;
            break;
        case 5:
            r = c; g = 0; b = x;
            break;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return { r, g, b };
}

function convertCMYKToRGB(c, m, y, k) {
    c /= 100;
    m /= 100;
    y /= 100;
    k /= 100;

    var r = 255 * (1 - c) * (1 - k);
    var g = 255 * (1 - m) * (1 - k);
    var b = 255 * (1 - y) * (1 - k);

    return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
}

function convertHSLToRGB(h, s, l) {
    s /= 100;
    l /= 100;

    var r, g, b;
    var c = (1 - Math.abs(2 * l - 1)) * s;
    var x = c * (1 - Math.abs((h / 60) % 2 - 1));
    var m = l - c / 2;

    switch (Math.floor(h / 60)) {
        case 0:
            r = c; g = x; b = 0;
            break;
        case 1:
            r = x; g = c; b = 0;
            break;
        case 2:
            r = 0; g = c; b = x;
            break;
        case 3:
            r = 0; g = x; b = c;
            break;
        case 4:
            r = x; g = 0; b = c;
            break;
        case 5:
            r = c; g = 0; b = x;
            break;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return { r, g, b };
}


function convertHSVToRGB(h, s, v) {
    s /= 100;
    v /= 100;

    var r, g, b;
    var c = v * s;
    var x = c * (1 - Math.abs((h / 60) % 2 - 1));
    var m = v - c;

    switch (Math.floor(h / 60)) {
        case 0:
            r = c; g = x; b = 0;
            break;
        case 1:
            r = x; g = c; b = 0;
            break;
        case 2:
            r = 0; g = c; b = x;
            break;
        case 3:
            r = 0; g = x; b = c;
            break;
        case 4:
            r = x; g = 0; b = c;
            break;
        case 5:
            r = c; g = 0; b = x;
            break;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return { r, g, b };
}



