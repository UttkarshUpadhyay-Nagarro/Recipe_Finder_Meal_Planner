import PyPDF2
import os

PDF_PATH = r"c:\Users\uttkarshupadhyay\Downloads\Recipe_Finder_Meal_Planner\Recipe_Finder_Meal_Planner_Assignment_v2.pdf"
OUT_PATH = r"c:\Users\uttkarshupadhyay\Downloads\Recipe_Finder_Meal_Planner\Recipe_Finder_Meal_Planner_Assignment_v2.txt"


def extract():
    with open(PDF_PATH, "rb") as f:
        reader = PyPDF2.PdfReader(f)
        texts = []
        for i, page in enumerate(reader.pages):
            try:
                txt = page.extract_text() or ""
            except Exception:
                txt = ""
            texts.append(f"--- Page {i+1} ---\n" + txt)
    with open(OUT_PATH, "w", encoding="utf-8") as out:
        out.write("\n\n".join(texts))


if __name__ == "__main__":
    extract()
    print("Extraction complete:", OUT_PATH)
