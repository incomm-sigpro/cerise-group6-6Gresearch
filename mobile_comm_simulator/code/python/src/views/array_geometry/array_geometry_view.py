import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D  # necessário para 3D
import numpy as np

class ArrayGeometryView:
    """View to visualize the sensor positions in the array."""

    @staticmethod
    def plot_sensor_positions(positions: np.ndarray, title="Array Geometry"):
        dim = positions.shape[1]
        fig = plt.figure()
        
        if dim == 1:
            plt.plot(positions[:, 0], np.zeros_like(positions[:, 0]), 'o')
            plt.xlabel("X")
            plt.yticks([])
        elif dim == 2:
            plt.scatter(positions[:, 0], positions[:, 1])
            plt.xlabel("X")
            plt.ylabel("Y")
        elif dim == 3:
            ax = fig.add_subplot(111, projection='3d')
            ax.scatter(positions[:, 0], positions[:, 1], positions[:, 2])
            ax.set_xlabel("X")
            ax.set_ylabel("Y")
            ax.set_zlabel("Z")
        else:
            raise ValueError("Unsupported dimensionality for visualization")

        plt.title(title)
        plt.grid(True)
        plt.tight_layout()
        plt.show()
