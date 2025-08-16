# GrowPal Backend (FastAPI)

## Setup
```bash
cd backend
# (optional but recommended)
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
# source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload
```

The server runs on http://127.0.0.1:8000

Test endpoints:
- GET /health
- POST /plan  (JSON body: {"season":"summer","soil_type":"loamy"})