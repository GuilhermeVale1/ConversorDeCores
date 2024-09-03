import cv2
import numpy as np

# Carrega a imagem
img = cv2.imread("dog.webp")

# Verifica se a imagem foi carregada corretamente
if img is None:
    print("Erro ao carregar a imagem. Verifique o nome e o caminho do arquivo.")
    exit()

# Converte a imagem para o espaço de cores HSV
hsv_image = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

# Mostra a imagem original
cv2.imshow('dog', img)

# Mostra a imagem HSV inicial (mesmo que o usuário ainda não tenha ajustado os trackbars)
cv2.imshow('doghsv', hsv_image)

# Função para atualizar a imagem HSV com base nos sliders
def update_image(*args):
    # Obtém os valores atuais dos trackbars
    s = cv2.getTrackbarPos('Saturation', 'doghsv')
    v = cv2.getTrackbarPos('Value', 'doghsv')
    
    # Faz uma cópia da imagem HSV original para não modificar os dados originais
    hsv_adjusted = hsv_image.copy()
    
    # Ajusta a saturação e o valor (brilho)
    hsv_adjusted[:, :, 1] = np.clip(hsv_image[:, :, 1] * (s / 100), 0, 255)
    hsv_adjusted[:, :, 2] = np.clip(hsv_image[:, :, 2] * (v / 100), 0, 255)
    
    
    cv2.imshow('doghsv', hsv_adjusted)


cv2.createTrackbar('Saturation', 'doghsv', 100, 200, update_image)
cv2.createTrackbar('Value', 'doghsv', 100, 200, update_image)


update_image()


cv2.waitKey(0)
cv2.destroyAllWindows()
