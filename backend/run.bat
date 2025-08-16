@echo off
REM Activate venv if you created one (optional):
REM call venv\Scripts\activate

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000