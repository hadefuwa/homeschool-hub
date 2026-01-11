# PowerShell script to build and start Electron app
Write-Host "Building web app..." -ForegroundColor Green
flutter build web

if ($LASTEXITCODE -eq 0) {
    Write-Host "Starting Electron app..." -ForegroundColor Green
    npm start
} else {
    Write-Host "Web build failed. Please fix errors and try again." -ForegroundColor Red
    exit 1
}

