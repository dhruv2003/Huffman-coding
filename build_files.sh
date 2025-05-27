#!/bin/bash
# Build script for Vercel deployment

echo "Building the project..."

# Make sure the script fails on errors
set -e

# Install project dependencies
pip install -r requirements.txt

# Make migrations and migrate 
python manage.py makemigrations
python manage.py migrate

# Create staticfiles directory if it doesn't exist
mkdir -p staticfiles

# Collect static files
python manage.py collectstatic --noinput

# Verify that the staticfiles directory exists and is not empty
if [ -d "staticfiles" ]; then
  echo "Staticfiles directory exists"
  ls -la staticfiles
else
  echo "Error: staticfiles directory was not created"
  exit 1
fi

echo "Build completed successfully"

# Exit with success code
exit 0