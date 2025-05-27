#!/bin/bash
# Build script for Vercel deployment

echo "Building the project..."

# Install project dependencies
pip install -r requirements.txt

# Make migrations and migrate 
python manage.py makemigrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput
echo "Build completed"

# Exit with success code
exit 0