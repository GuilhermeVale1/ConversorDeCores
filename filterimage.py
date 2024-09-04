import cv2
import numpy as np

# Função callback para o trackbar
def update_image(*args):
    # Obter os valores dos trackbars
    s = cv2.getTrackbarPos('Saturation', 'Ajuste HSV')
    v = cv2.getTrackbarPos('Value', 'Ajuste HSV')
    
    # Fazer uma cópia da imagem HSV original
    hsv_adjusted = hsv_image.copy()
    
    # Ajustar a Saturação e o Valor baseando-se nos valores originais
    # Multiplicar a Saturação e o Valor pela razão do trackbar
    hsv_adjusted[:, :, 1] = np.clip(hsv_image[:, :, 1] * (s / 100), 0, 255)
    hsv_adjusted[:, :, 2] = np.clip(hsv_image[:, :, 2] * (v / 100), 0, 255)
    
    # Converter de volta para BGR para exibição
    adjusted_img = cv2.cvtColor(hsv_adjusted, cv2.COLOR_HSV2BGR)
    
    # Mostrar a imagem ajustada
    cv2.imshow('Ajuste HSV', adjusted_img)


img = cv2.imread("dog.webp")


hsv_image = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)


cv2.imshow('Ajuste HSV', img)

# Criar trackbars para ajustar Saturação (S) e Valor (V)
cv2.createTrackbar('Saturation', 'Ajuste HSV', 100, 200, update_image)
cv2.createTrackbar('Value', 'Ajuste HSV', 100, 200, update_image)

# Aguarda até que uma tecla seja pressionada
cv2.waitKey(0)
cv2.destroyAllWindows()
