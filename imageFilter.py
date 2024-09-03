import cv2
import numpy as np


def update_image(*args):
   
    s = cv2.getTrackbarPos('Saturation', 'Ajuste HSV')
    v = cv2.getTrackbarPos('Value', 'Ajuste HSV')
    
   
    hsv_adjusted = hsv_image.copy()
    
  
    hsv_adjusted[:, :, 1] = np.clip(hsv_image[:, :, 1] * (s / 100), 0, 255)
    hsv_adjusted[:, :, 2] = np.clip(hsv_image[:, :, 2] * (v / 100), 0, 255)
   
    adjusted_img = cv2.cvtColor(hsv_adjusted, cv2.COLOR_HSV2BGR)
    
    
    cv2.imshow('Ajuste HSV', adjusted_img)


img = cv2.imread("dog.webp")


hsv_image = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)


cv2.imshow('Ajuste HSV', img)


cv2.createTrackbar('Saturation', 'Ajuste HSV', 100, 200, update_image)
cv2.createTrackbar('Value', 'Ajuste HSV', 100, 200, update_image)


cv2.waitKey(0)
cv2.destroyAllWindows()
