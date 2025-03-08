import os
from dotenv import load_dotenv

from app.main import run_simulation

# Load environment variables
load_dotenv()

print(f"Running simulation on {os.getenv('ENVIRONMENT', 'development')} environment")

if __name__ == "__main__":
    run_simulation()
