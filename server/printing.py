# import matplotlib
# matplotlib.use('Agg')  # Use the Agg backend (non-GUI)
import matplotlib.pyplot as plt
def printing(decrypted_array):
    plt.imshow(decrypted_array)
    plt.axis('off')
    plt.show()

if __name__ == "__main__":
    dec = []
    printing(dec)