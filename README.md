# Huffman Coding Virtual Lab

A comprehensive virtual laboratory for learning and experimenting with Huffman coding algorithms, designed as an educational tool for students and educators.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Deployment](#deployment)
- [Usage Guide](#usage-guide)
- [Contributing](#contributing)
- [License](#license)
- [Development Guide](#development-guide)

## Overview

The Huffman Coding Virtual Lab is an interactive web application built with Django that allows users to learn about Huffman coding, a popular algorithm for lossless data compression. The application provides theoretical foundations, step-by-step procedures, pre-test and post-test evaluations, and interactive simulations to help users understand and apply Huffman coding concepts.

## Features

- **Comprehensive Learning Path**: Structured learning sequence from theory to practical application
- **Interactive Simulations**: Step-by-step simulation of the Huffman coding algorithm
- **Pre and Post Testing**: Knowledge assessment before and after the simulation
- **Responsive Design**: Works on various devices and screen sizes
- **Certificate Generation**: Create certificates upon successful completion of the lab

## Project Structure

The project is organized as follows:

- `huffman_lab/`: Contains the main Django application code
- `static/`: Holds static files like CSS, JavaScript, and images
- `templates/`: Contains HTML templates for the web application
- `tests/`: Includes unit tests for the application
- `docs/`: Documentation and resources for the project

## Requirements

To run the Huffman Coding Virtual Lab, you need the following:

- Python 3.8 or higher
- Django 3.2 or higher
- A web browser (Chrome, Firefox, Edge, etc.)
- SQLite (default database for Django)

## Installation

Follow these steps to install the project:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/huffman-coding-lab.git
   cd huffman-coding-lab
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Apply migrations:
   ```bash
   python manage.py migrate
   ```

## Running the Project

To start the development server, run the following command:

```bash
python manage.py runserver
```

Open your web browser and navigate to `http://127.0.0.1:8000` to access the application.

## Deployment

To deploy the project, follow these steps:

1. Set up a production server (e.g., AWS, Heroku, or DigitalOcean).
2. Configure the database and environment variables.
3. Use a WSGI server like Gunicorn or uWSGI to serve the application.
4. Set up a reverse proxy with Nginx or Apache.
5. Ensure static files are collected using:
   ```bash
   python manage.py collectstatic
   ```

## Usage Guide

1. Navigate to the homepage to start learning about Huffman coding.
2. Follow the theoretical content and interactive simulations.
3. Complete the pre-test and post-test evaluations.
4. Generate a certificate upon successful completion.

## Contributing

We welcome contributions to improve the Huffman Coding Virtual Lab. To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Development Guide

### Setting Up the Development Environment

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/huffman-coding.git
   cd huffman-coding
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the project root with the following variables:
   ```
   DJANGO_SECRET_KEY=your_secret_key_here
   DJANGO_DEBUG=True
   DB_ENGINE=django.db.backends.sqlite3
   DB_NAME=db.sqlite3
   ```

5. Apply migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. Create a superuser (optional):
   ```bash
   python manage.py createsuperuser
   ```

### Running the Application

1. Start the development server:
   ```bash
   python manage.py runserver
   ```

2. Open your web browser and navigate to:
   - Application: `http://127.0.0.1:8000/`
   - Admin interface: `http://127.0.0.1:8000/admin/`
   - API documentation: `http://127.0.0.1:8000/api/docs/`

### Testing

Run all tests with:

```bash
python manage.py test
```

Or run specific test modules:

```bash
python manage.py test huffman.tests
```

For more detailed test output:

```bash
python run_tests.py
```

