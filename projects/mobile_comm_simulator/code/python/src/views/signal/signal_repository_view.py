import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns


class SignalView:
    """View to visualize the received signal and its covariance matrix."""

    @staticmethod
    def plot_snapshots_by_sensor(
        received_signal: np.ndarray, wait_time=5, title="Received Signal per Sensor"
    ):
        """
        Plot subfigures showing each sensor's received signal (magnitude over time).

        Args:
            received_signal: ndarray of shape (num_sensors, num_snapshots)
        """
        num_sensors = received_signal.shape[0]
        num_cols = 4
        num_rows = int(np.ceil(num_sensors / num_cols))

        fig, axs = plt.subplots(
            num_rows, num_cols, figsize=(16, 3 * num_rows), sharex=True
        )
        axs = axs.flatten()

        for i in range(num_sensors):
            axs[i].plot(np.real(received_signal[i]), color="blue", lw=1)
            axs[i].set_title(f"Sensor {i + 1}")
            axs[i].set_ylabel("Magnitude")
            axs[i].set_xlabel("Snapshot")

        # Remove unused axes
        for j in range(num_sensors, len(axs)):
            fig.delaxes(axs[j])

        fig.suptitle(title, fontsize=16)
        fig.tight_layout(rect=[0, 0, 1, 0.96])

        if wait_time is None:
            plt.show()
        else:
            plt.draw()  # Draw the figure
            plt.pause(wait_time)  # Wait for the specified time
            plt.close(fig)  # Close the figure

    @staticmethod
    def plot_covariance_heatmap(
        received_signal: np.ndarray, wait_time=5, title="Covariance Matrix"
    ):
        """
        Plot heatmap of the covariance matrix of the received signal.

        Args:
            received_signal: ndarray of shape (num_sensors, num_snapshots)
        """
        R = received_signal @ received_signal.conj().T
        R /= received_signal.shape[1]
        cov_matrix = np.abs(R)

        fig = plt.figure(figsize=(8, 6))
        sns.heatmap(cov_matrix, cmap="viridis", annot=False)
        plt.title(title)
        plt.xlabel("Sensor")
        plt.ylabel("Sensor")
        plt.tight_layout()

        if wait_time is None:
            plt.show()
        else:
            plt.draw()  # Draw the figure
            plt.pause(wait_time)  # Wait for the specified time
            plt.close(fig)  # Close the figure

    @staticmethod
    def plot_spatial_sample(
        received_signal: np.ndarray,
        wait_time: float = 5.0,
        snapshot_index: int = 0,
        title="Spatial Sample Across Sensors",
    ):
        """
        Plot a single snapshot across all sensors to show spatial wavefront.

        Args:
            received_signal (np.ndarray): Matrix of shape (num_sensors, num_snapshots)
            snapshot_index (int): Time index to extract the spatial pattern
            title (str): Plot title
        """
        if snapshot_index >= received_signal.shape[1]:
            raise ValueError("Snapshot index exceeds number of available snapshots")

        spatial_sample = received_signal[:, snapshot_index]

        fig = plt.figure(figsize=(8, 4))
        plt.plot(np.real(spatial_sample), marker="o", label="Real")
        plt.plot(np.imag(spatial_sample), marker="s", label="Imag", linestyle="--")
        plt.plot(np.abs(spatial_sample), marker="^", label="Magnitude", linestyle=":")
        plt.title(title + f" (snapshot {snapshot_index})")
        plt.xlabel("Sensor Index")
        plt.ylabel("Amplitude")
        plt.grid(True)
        plt.legend()
        plt.tight_layout()

        if wait_time is None:
            plt.show()
        else:
            plt.draw()  # Draw the figure
            plt.pause(wait_time)  # Wait for the specified time
            plt.close(fig)  # Close the figure
