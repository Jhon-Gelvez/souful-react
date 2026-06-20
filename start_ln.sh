#!/bin/bash

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Launch Backend and Frontend in Kitty
kitty --directory "server" npm run dev &
kitty --directory "client" npm run dev &