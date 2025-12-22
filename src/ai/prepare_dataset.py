import json

INPUT_FILE = "raw_data.json"     
OUTPUT_FILE = "train.json"         # output for fine-tuning

with open(INPUT_FILE, "r") as f:
    raw = json.load(f)

system_prompt = ""
samples = []

# Extract system instruction
for item in raw["data"]:
    if item["type"] == "instruction":
        system_prompt = item["content"]

# Convert QA pairs
for item in raw["data"]:
    if item["type"] == "qa":
        text = (
            "<System>\n"
            f"{system_prompt}\n\n"
            "<User>\n"
            f"{item['question']}\n\n"
            "<Assistant>\n"
            f"{item['answer']}"
        )
        samples.append({"text": text})

# Save training file
with open(OUTPUT_FILE, "w") as f:
    json.dump(samples, f, indent=2)

print(f"✅ Created {len(samples)} training samples in {OUTPUT_FILE}")
