"""
This module contains a function to find two coprime integers (M, N)
that satisfy the condition M + N <= max_sensors.
It is used in the context of sensor array configurations
for Direction of Arrival (DOA) estimation.
The function iterates through pairs of integers,
checking their coprimality using the gcd function.
It returns a random coprime pair from the candidates found.
"""

import math


def find_coprime_pair(num_sensors: int):
    """
    Find a pair of coprime integers (M, N) such that:
    - M + N == num_sensors
    - gcd(M, N) == 1
    - M and N are close to num_sensors / 2

    Args:
        num_sensors (int): Desired total number of sensors

    Returns:
        tuple: (M, N), coprime pair summing to num_sensors
    """
    midpoint = num_sensors // 2
    candidates = []

    for m in range(1, num_sensors):
        n = num_sensors - m
        if math.gcd(m, n) == 1:
            distance = abs(midpoint - m)
            candidates.append(((m, n), distance))

    if not candidates:
        raise ValueError(f"No coprime pair found with sum = {num_sensors}")

    # Ordenar pela menor distância ao ponto médio
    candidates.sort(key=lambda x: x[1])
    best_pair = candidates[0][0]
    return best_pair
