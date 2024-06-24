@echo off
setlocal enabledelayedexpansion

if "%~1"=="" (
    echo Usage: extract_function filename function_name output_file
    exit /b 1
)

set filename=%1
set function_name=%2
set output_file=%3

if "%output_file%"=="" (
    set output_file=output.txt
)

set start_copy=0
set brackets=0

(for /f "tokens=*" %%i in ('type "%filename%"') do (
    set line=%%i

    rem Check if the line contains the function definition
    echo !line! | findstr /r /c:"%function_name%.*(" >nul
    if !errorlevel! equ 0 (
        set start_copy=1
    )

    if !start_copy! equ 1 (
        echo !line!>>"%output_file%"

        rem Count the number of opening and closing brackets
        set /a brackets+=!line: =! | findstr /o "(" | find /c /v ""
        set /a brackets-=!line: =! | findstr /o ")" | find /c /v ""

        rem If brackets balance to zero, stop copying
        if !brackets! equ 0 (
            set start_copy=0
        )
    )
)) >nul

echo Function "%function_name%" copied to "%output_file%"
