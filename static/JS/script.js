document.getElementById("R").addEventListener("input", convertRGB);
        document.getElementById("G").addEventListener("input", convertRGB);
        document.getElementById("B").addEventListener("input", convertRGB);

function convertRGB(){
    var R = document.getElementById("R").value;
    var G = document.getElementById("G").value;
    var B = document.getElementById("B").value;
    
    var colorBlocks = document.getElementById("colorblock");
    colorBlocks.innerHTML = '';


    
    var hsv = convertHSV(R,G,B);
    var rgbBlock = document.createElement("div");
    var rgbBlock = document.createElement("div");
    var cmyk = convertCMYK(R,G,B);
    rgbBlock.className = "color-block";
    rgbBlock.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
    rgbBlock.textContent = `RGB(${R}, ${G}, ${B})`;
    colorBlocks.appendChild(rgbBlock);

        
    var hsv = convertHSV(R, G, B);

        
    var hsvBlock = document.createElement("div");
    hsvBlock.className = "color-block";
    hsvBlock.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;  
    hsvBlock.textContent = `HSV(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;
    colorBlocks.appendChild(hsvBlock);


    var cmykBlock = document.createElement("div");
    cmykBlock.className = "color-block";
    cmykBlock.style.backgroundColor = `rgb(${R}, ${G}, ${B})`; 
    cmykBlock.textContent = `CMYK(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
    colorBlocks.appendChild(cmykBlock);
       
    
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

