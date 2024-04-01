import numpy as np
from PIL import Image
from PIL import ImageEnhance


with Image.open("static/favicon.png") as im:
    a = np.array(im)

crop_x = []
prev = a[0]
b = a.copy()
for i in range(a.shape[0]):
    row = a[i]
    if (row - prev).any():
        if not prev.any():
            print(i - 1)
            b[i - 1] = 255
            crop_x.append(i - 1)
        if not row.any():
            print(i)
            b[i] = 255
            crop_x.append(i)
    prev = row

print("---")

crop_y = []
prev = a[:, 0]
c = b.copy()
for i in range(a.shape[1]):
    col = a[:, i]
    if (col - prev).any():
        if not prev.any():
            print(i - 1)
            c[:, i - 1] = 255
            crop_y.append(i - 1)
        if not col.any():
            print(i)
            c[:, i] = 255
            crop_y.append(i)
    prev = col

print(crop_x, crop_y)
cropper = (crop_y[0] + 6, crop_x[0] + 7, crop_y[1] - 5, crop_x[1] - 3)

im = Image.fromarray(c)
im.show()

im_c = im.crop(cropper)
e = ImageEnhance.Sharpness(im_c)
im_e = e.enhance(0)  # blur
im_e.show()

im_e.save("./script/logo_blurred_cropped.png")

# NOTE: Inkscape's trace-to-bitmap can generate inverse paths already
# So this is section is just to check the cropping is satisfactory
im_inv = Image.fromarray(255 - c)
im_inv.show()
im_inv_c = im_inv.crop(cropper)
e_inv = ImageEnhance.Sharpness(im_inv_c)
im_inv_e = e_inv.enhance(0)  # blur
im_inv_e.show()

im_inv_e.save("./script/logo_blurred_cropped_inverted.png")

print("Size: ", im_e.size)
