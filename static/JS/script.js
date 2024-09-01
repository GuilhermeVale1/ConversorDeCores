function convertRGB(){
    var R = document.getElementById("R").value;
    var G = document.getElementById("G").value;
    var B = document.getElementById("B").value;
    var convertOption = document.getElementById("ops").value;
    if(convertOption == "HSL"){
        var hsl = convertHSL(R,G,B);
        var divHsl = document.getElementById("HSL");
        console.log(hsl);
        divHsl.textContent = `O valor em HSL é H: ${hsl.h}° S: ${hsl.s}% L: ${hsl.l}%`;
    }
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

