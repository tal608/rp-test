# Image Management Scripts

## Overview
Scripts for processing image CSV files and managing image placements across the River Paws website.

## Installation

```bash
npm install csv-parse --save-dev
```

## Usage

### Process Image CSV

```bash
# Dry run (preview changes without applying)
node scripts/process-image-csv.js --csv path/to/file.csv --dry-run

# Execute changes
node scripts/process-image-csv.js --csv path/to/file.csv --execute
```

### Example

```bash
# Preview what would change
node scripts/process-image-csv.js --csv public/Grooming/river-paws-optimization-report.csv --dry-run

# Apply changes
node scripts/process-image-csv.js --csv public/Grooming/river-paws-optimization-report.csv --execute
```

## CSV Format

The CSV file should contain the following columns:
- `Original Filename`
- `New SEO Filename`
- `Target City`
- `Total Score`
- `Emotional (25%)`
- `Technical (20%)`
- `Brand (20%)`
- `Marketing (20%)`
- `SEO (15%)`
- `Focal X (%)`
- `Focal Y (%)`
- `Category`
- `Alt Text`
- `Caption`
- `Placement Tags` (semicolon-separated)
- `Reasoning`

## Features

- **Intelligent Matching**: Matches images to placement opportunities based on tags, categories, scores, and cities
- **Replacement Logic**: Compares new images against current placements and suggests replacements when improvement threshold is met
- **Rotation Support**: Supports rotating up to 5 images per placement location
- **Lock Support**: Respects locked images and won't replace them
- **Strict City Matching**: Enforces strict city matching for city-specific pages
- **Gallery Integration**: Automatically adds all qualifying images to gallery categories

## Configuration

Edit `process-image-csv.js` to adjust:
- Replacement thresholds by priority level
- Maximum rotations per location
- City matching strictness
- Match scoring weights

## Output

The script generates a detailed report showing:
- New placements recommended
- Replacements suggested
- Rotations to add
- Gallery additions
- Skipped images and reasons

