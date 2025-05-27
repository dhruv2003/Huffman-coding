#!/usr/bin/env python
"""
Development helper script for the Huffman Coding Virtual Lab.
This script provides a command-line interface to perform common development tasks.
"""

import os
import sys
import subprocess
import argparse


def run_server(port=8000):
    """Run the Django development server"""
    print(f"Starting development server on port {port}...")
    subprocess.run([sys.executable, "manage.py", "runserver", f"127.0.0.1:{port}"])


def run_tests(app=None):
    """Run the test suite"""
    print("Running tests...")
    cmd = [sys.executable, "manage.py", "test"]
    if app:
        cmd.append(app)
    subprocess.run(cmd)


def make_migrations(app=None):
    """Make database migrations"""
    cmd = [sys.executable, "manage.py", "makemigrations"]
    if app:
        cmd.append(app)
    subprocess.run(cmd)
    subprocess.run([sys.executable, "manage.py", "migrate"])


def collect_static():
    """Collect static files"""
    subprocess.run([sys.executable, "manage.py", "collectstatic", "--noinput"])


def main():
    parser = argparse.ArgumentParser(description="Huffman Coding Virtual Lab development helper")
    
    subparsers = parser.add_subparsers(dest="command", help="command to run")
    
    # Server command
    server_parser = subparsers.add_parser("server", help="Run the development server")
    server_parser.add_argument("-p", "--port", type=int, default=8000, help="Port to run the server on")
    
    # Test command
    test_parser = subparsers.add_parser("test", help="Run tests")
    test_parser.add_argument("app", nargs="?", default=None, help="App to test (optional)")
    
    # Migrations command
    migrations_parser = subparsers.add_parser("migrations", help="Make and apply migrations")
    migrations_parser.add_argument("app", nargs="?", default=None, help="App to migrate (optional)")
    
    # Static files command
    subparsers.add_parser("static", help="Collect static files")

    args = parser.parse_args()

    if args.command == "server":
        run_server(args.port)
    elif args.command == "test":
        run_tests(args.app)
    elif args.command == "migrations":
        make_migrations(args.app)
    elif args.command == "static":
        collect_static()
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
