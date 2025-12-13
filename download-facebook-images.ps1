# PowerShell script to help download and optimize images from Facebook
# Instructions:
# 1. Visit https://www.facebook.com/riverpaws in your browser
# 2. Right-click on images you want to download
# 3. Save them to riverpaws/public/gallery/ with descriptive names
# 4. This script will then help optimize them

Write-Host "Facebook Image Download Helper for River Paws Gallery" -ForegroundColor Green
Write-Host "=" -ForegroundColor Cyan

$galleryDir = "public\gallery"
if (-not (Test-Path $galleryDir)) {
    New-Item -ItemType Directory -Path $galleryDir -Force | Out-Null
    Write-Host "Created directory: $galleryDir" -ForegroundColor Yellow
}

Write-Host "`nManual Download Instructions:" -ForegroundColor Cyan
Write-Host "1. Visit: https://www.facebook.com/riverpaws" -ForegroundColor White
Write-Host "2. Look for posts with:" -ForegroundColor White
Write-Host "   - Happy dogs after grooming (transformation photos)" -ForegroundColor Gray
Write-Host "   - Dogs on hikes/outdoor adventures" -ForegroundColor Gray
Write-Host "   - Multiple dogs having fun together" -ForegroundColor Gray
Write-Host "   - Before/after grooming comparisons" -ForegroundColor Gray
Write-Host "   - Dogs looking relaxed and happy" -ForegroundColor Gray
Write-Host "3. Right-click each image -> Save image as..." -ForegroundColor White
Write-Host "4. Save to: $((Resolve-Path $galleryDir).Path)" -ForegroundColor Yellow
Write-Host "5. Use descriptive filenames like:" -ForegroundColor White
Write-Host "   - grooming-before-after-golden-retriever.jpg" -ForegroundColor Gray
Write-Host "   - hiking-adventure-multiple-dogs.jpg" -ForegroundColor Gray
Write-Host "   - happy-customer-dog-transformation.jpg" -ForegroundColor Gray
Write-Host "   - spa-day-relaxed-dog.jpg" -ForegroundColor Gray

Write-Host "`nRecommended Image Categories:" -ForegroundColor Cyan
Write-Host "- Grooming Transformations (before/after - these convert!)" -ForegroundColor Green
Write-Host "- Happy Dogs During Grooming (show comfort/trust)" -ForegroundColor Green
Write-Host "- Trail Hiking Adventures (groups of happy dogs)" -ForegroundColor Green
Write-Host "- Relaxed/Finished Dogs (post-groom satisfaction)" -ForegroundColor Green
Write-Host "- Multiple Dogs Together (shows socialization)" -ForegroundColor Green

Write-Host "`nAfter downloading images:" -ForegroundColor Cyan
Write-Host "- Images should be optimized to web size (1200-2000px width max)" -ForegroundColor White
Write-Host "- File sizes should be under 500KB for fast loading" -ForegroundColor White
Write-Host "- Use descriptive filenames with keywords (dog-grooming-waunakee.jpg)" -ForegroundColor White

Write-Host "`nCurrent gallery images:" -ForegroundColor Cyan
if (Test-Path $galleryDir) {
    $existingImages = Get-ChildItem -Path $galleryDir -Filter *.jpg,*.jpeg,*.png -ErrorAction SilentlyContinue
    if ($existingImages) {
        foreach ($img in $existingImages) {
            Write-Host "  ✓ $($img.Name)" -ForegroundColor Green
        }
    } else {
        Write-Host "  No images found in gallery directory yet." -ForegroundColor Yellow
    }
}

Write-Host "`nFor best SEO, ensure images have:" -ForegroundColor Cyan
Write-Host "- Descriptive filenames with location keywords (waunakee, madison, dog-grooming)" -ForegroundColor White
Write-Host "- Alt text in gallery page (will be added automatically)" -ForegroundColor White
Write-Host "- Good lighting and clear subject matter" -ForegroundColor White
Write-Host "- Happy, engaging content that shows results" -ForegroundColor White







