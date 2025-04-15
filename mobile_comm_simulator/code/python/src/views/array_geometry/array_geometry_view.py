import matplotlib.pyplot as plt

# from mpl_toolkits.mplot3d import Axes3D
import numpy as np


class ArrayGeometryView:
    """View to visualize the sensor positions in the array."""

    def __init__(self, wait_time=None):
        self.wait_time = wait_time

    def plot_sensor_positions(
        self, positions: np.ndarray, title="Array Geometry"
    ) -> None:
        """
        Plot the sensor positions in the array.
        Args:
            positions: ndarray of shape (num_sensors, num_dimensions)
            title: Title of the plot
        """

        dim = positions.shape[1]
        fig = plt.figure()

        if dim == 1:
            plt.plot(positions[:, 0], np.zeros_like(positions[:, 0]), "o")
            plt.xlabel("X")
            plt.yticks([])
        elif dim == 2:
            plt.scatter(positions[:, 0], positions[:, 1])
            plt.xlabel("X")
            plt.ylabel("Y")
        elif dim == 3:
            ax = fig.add_subplot(111, projection="3d")
            ax.scatter(positions[:, 0], positions[:, 1], positions[:, 2])
            ax.set_xlabel("X")
            ax.set_ylabel("Y")
            ax.set_zlabel("Z")
        else:
            raise ValueError("Unsupported dimensionality for visualization")

        plt.title(title)
        plt.grid(True)
        plt.tight_layout()

        if self.wait_time is None:
            plt.show()
        else:
            plt.draw()  # Draw the figure
            plt.pause(self.wait_time)  # Wait for the specified time
            plt.close(fig)  # Close the figure
