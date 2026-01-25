
param(
    [string]$Version
)

if ([string]::IsNullOrWhiteSpace($Version)) {
    # Try to read version from package.json if not provided
    if (Test-Path "package.json") {
        $packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
        $Version = $packageJson.version
        Write-Host "Auto-detected version from package.json: $Version"
    } else {
        Write-Error "Please provide a version number (e.g., ./release.ps1 4.0.0) or ensure package.json exists."
        exit 1
    }
}

$TagName = "v$Version"

Write-Host "Preparing to release $TagName..." -ForegroundColor Cyan

# Check for uncommitted changes
if ((git status --porcelain)) {
    Write-Warning "You have uncommitted changes. committing them now..."
    git add .
    git commit -m "chore: release $TagName"
}

# Create Tag
Write-Host "Creating tag $TagName..." -ForegroundColor Green
git tag $TagName

# Push changes and tags
Write-Host "Pushing to remote..." -ForegroundColor Green
git push origin main
git push origin $TagName

Write-Host "Release $TagName pushed successfully!" -ForegroundColor Cyan
Write-Host "---------------------------------------------------"
Write-Host "Next Steps:"
Write-Host "1. Go to GitHub Releases: https://github.com/Dharaneesh20/Neuro-Nav-App/releases"
Write-Host "2. Draft a new release from tag $TagName"
Write-Host "3. Upload the APK built by EAS."
Write-Host "---------------------------------------------------"
