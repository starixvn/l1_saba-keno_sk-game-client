@echo off
setlocal

:: Set default values
set REGISTRY=hub.lumigame.com/pentagon-base
set IMAGE_NAME=sk-game-client-base
set TAG=20.9.0-alpine-npm-cache-latest
set FULL_IMAGE_NAME=%REGISTRY%/%IMAGE_NAME%:%TAG%

echo Building Docker image %IMAGE_NAME%:%TAG%...
docker build -t %IMAGE_NAME%:%TAG% -f dockerfile-npm-cache .

if %ERRORLEVEL% neq 0 (
    echo Error: Docker build failed
    exit /b 1
)

:: Check if push parameter is provided
echo Tagging image for registry...
docker tag %IMAGE_NAME%:%TAG% %FULL_IMAGE_NAME%

echo Pushing image to registry...
docker push %FULL_IMAGE_NAME%

if %ERRORLEVEL% neq 0 (
    echo Error: Failed to push image to registry
    exit /b 1
)

echo Successfully built and pushed %FULL_IMAGE_NAME%