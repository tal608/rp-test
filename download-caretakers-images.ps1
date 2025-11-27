# PowerShell script to download caretaker images from the live River Paws website
# Run this script from the riverpaws directory: .\download-caretakers-images.ps1

Write-Host "Downloading caretaker images from https://www.riverpaws.dog/caretakers/" -ForegroundColor Green

# Create caretakers directory if it doesn't exist
$caretakersDir = "public\caretakers"
if (-not (Test-Path $caretakersDir)) {
    New-Item -ItemType Directory -Path $caretakersDir -Force | Out-Null
    Write-Host "Created directory: $caretakersDir" -ForegroundColor Yellow
}

# Mapping of caretaker names to expected filenames
$caretakerMapping = @{
    "amanda" = "amanda-masarik.jpg"
    "masarik" = "amanda-masarik.jpg"
    "kelly" = "kelly-esterholm.jpg"
    "esterholm" = "kelly-esterholm.jpg"
    "stephanie" = "stephanie-helt.jpg"
    "helt" = "stephanie-helt.jpg"
    "steph" = "stephanie-helt.jpg"
    "chloe" = "chloe-lane.jpg"
    "lane" = "chloe-lane.jpg"
    "elaina" = "elaina-katzke.jpg"
    "katzke" = "elaina-katzke.jpg"
    "france" = "france-lozano.jpg"
    "lozano" = "france-lozano.jpg"
}

# Fetch the caretakers page HTML
try {
    $response = Invoke-WebRequest -Uri "https://www.riverpaws.dog/caretakers/" -UseBasicParsing
    $html = $response.Content
    
    Write-Host "`nParsing HTML to find caretaker images..." -ForegroundColor Cyan
    
    # Extract image URLs with their surrounding context
    $imagePattern = '(?s)(.{0,500})(https://www\.riverpaws\.dog/wp-content/uploads/[^"\s<>]+\.(jpg|jpeg|png|webp))(.{0,500})'
    $matches = [regex]::Matches($html, $imagePattern)
    
    $downloadedImages = @{}
    
    foreach ($match in $matches) {
        $contextBefore = $match.Groups[1].Value
        $imageUrl = $match.Groups[2].Value
        $contextAfter = $match.Groups[4].Value
        $fullContext = ($contextBefore + $contextAfter).ToLower()
        
        # Skip common non-caretaker images
        if ($imageUrl -like "*logo*" -or $imageUrl -like "*icon*" -or $imageUrl -like "*favicon*" -or 
            $imageUrl -like "*gallery*" -or $imageUrl -like "*hero*" -or $imageUrl -like "*banner*") {
            continue
        }
        
        # Try to identify which caretaker this image belongs to based on context
        $assignedCaretaker = $null
        $foundFilename = $null
        
        foreach ($key in $caretakerMapping.Keys) {
            if ($fullContext -like "*$key*" -or $imageUrl.ToLower() -like "*$key*") {
                $foundFilename = $caretakerMapping[$key]
                $assignedCaretaker = $key
                break
            }
        }
        
        # If we found a match and haven't downloaded this caretaker's image yet
        if ($foundFilename -ne $null) {
            if (-not ($downloadedImages.ContainsKey($foundFilename))) {
                $tempPath = Join-Path $caretakersDir (Split-Path $imageUrl -Leaf)
                $finalPath = Join-Path $caretakersDir $foundFilename
                
                Write-Host "`nFound image for ${assignedCaretaker}:" -ForegroundColor Yellow
                Write-Host "  URL: $imageUrl" -ForegroundColor Gray
                Write-Host "  Will save as: $foundFilename" -ForegroundColor Cyan
                
                try {
                    # Download the image
                    Invoke-WebRequest -Uri $imageUrl -OutFile $tempPath -UseBasicParsing
                    
                    # Convert webp to jpg if needed
                    if ($imageUrl -like "*.webp") {
                        Write-Host "  Note: WebP file detected. Consider converting to JPG." -ForegroundColor Yellow
                    }
                    
                    # Rename to final filename
                    if (Test-Path $tempPath) {
                        if (Test-Path $finalPath) {
                            Remove-Item $finalPath -Force
                        }
                        Rename-Item -Path $tempPath -NewName $foundFilename -Force
                        Write-Host "  Downloaded and renamed to: $foundFilename" -ForegroundColor Green
                        $downloadedImages[$foundFilename] = $true
                    }
                } catch {
                    Write-Host "  Failed to download: $($_.Exception.Message)" -ForegroundColor Red
                }
            }
        }
    }
    
    # Check which images we still need
    $requiredImages = @(
        "amanda-masarik.jpg",
        "kelly-esterholm.jpg", 
        "stephanie-helt.jpg",
        "chloe-lane.jpg",
        "elaina-katzke.jpg",
        "france-lozano.jpg"
    )
    
    $missingImages = @()
    foreach ($required in $requiredImages) {
        $filePath = Join-Path $caretakersDir $required
        if (-not (Test-Path $filePath)) {
            $missingImages += $required
        }
    }
    
    if ($missingImages.Count -gt 0) {
        Write-Host "`nMissing images:" -ForegroundColor Yellow
        foreach ($missing in $missingImages) {
            Write-Host "  - $missing" -ForegroundColor Red
        }
        Write-Host "`nYou may need to manually download these from:" -ForegroundColor Yellow
        Write-Host "https://www.riverpaws.dog/caretakers/" -ForegroundColor Cyan
        Write-Host "`nRight-click each image -> Save image as -> Name it exactly as shown above" -ForegroundColor White
    } else {
        Write-Host "`nAll caretaker images downloaded successfully!" -ForegroundColor Green
    }
    
    Write-Host "`nDownloaded images saved to: $((Resolve-Path $caretakersDir).Path)" -ForegroundColor Cyan
    
} catch {
    Write-Host "Error fetching the page: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "`nPlease manually download images from https://www.riverpaws.dog/caretakers/" -ForegroundColor Yellow
    Write-Host "Save them to: $((Resolve-Path $caretakersDir).Path)" -ForegroundColor Yellow
}
