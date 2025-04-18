# PowerShell script to check for remaining Supabase references
# This script scans the codebase for any remaining references to Supabase
# that need to be updated to use MySQL instead.

# Directories to scan
$dirsToScan = @("app", "components", "lib")

# Files to ignore (already migrated or intentionally kept)
$ignoredFiles = @(
    "lib\supabase.ts",  # This file is kept for backward compatibility
    "scripts\cleanup-supabase.js"  # This is the cleanup script itself
)

# Function to check if a file should be ignored
function ShouldIgnoreFile($filePath) {
    foreach ($ignoredPath in $ignoredFiles) {
        if ($filePath -like "*$ignoredPath*") {
            return $true
        }
    }
    return $false
}

# Function to scan a file for Supabase references
function ScanFileForSupabase($filePath) {
    try {
        $content = Get-Content -Path $filePath -Raw

        # Check for direct Supabase references
        $directReferences = @(
            "supabase.",
            "createClient",
            "from('",
            ".storage",
            ".auth",
            ".rpc"
        )

        foreach ($ref in $directReferences) {
            if ($content -match [regex]::Escape($ref)) {
                return $true
            }
        }

        # Check for import statements
        if ($content -match "import.*from.*supabase") {
            return $true
        }

        return $false
    }
    catch {
        Write-Error "Error scanning file ${filePath}"
        return $false
    }
}

# Main function to scan the codebase
function ScanCodebase {
    Write-Host "Scanning codebase for Supabase references..."

    $filesWithReferences = @()

    foreach ($dir in $dirsToScan) {
        try {
            $dirPath = Join-Path -Path $PWD -ChildPath $dir
            if (Test-Path -Path $dirPath) {
                # Get all TypeScript and JavaScript files
                $files = Get-ChildItem -Path $dirPath -Recurse -Include "*.ts", "*.tsx", "*.js", "*.jsx" -File

                foreach ($file in $files) {
                    if (-not (ShouldIgnoreFile $file.FullName)) {
                        if (ScanFileForSupabase $file.FullName) {
                            $filesWithReferences += $file.FullName
                        }
                    }
                }
            }
        }
        catch {
            Write-Error "Error scanning directory ${dir}"
        }
    }

    return $filesWithReferences
}

# Run the scan
$filesWithReferences = ScanCodebase

if ($filesWithReferences.Count -gt 0) {
    Write-Host "`nFound Supabase references in the following files:" -ForegroundColor Yellow
    foreach ($file in $filesWithReferences) {
        Write-Host "- $($file.Replace($PWD.Path, ''))" -ForegroundColor Yellow
    }
    Write-Host "`nTotal files with Supabase references: $($filesWithReferences.Count)" -ForegroundColor Yellow
    Write-Host "`nThese files need to be updated to use MySQL instead of Supabase." -ForegroundColor Yellow
}
else {
    Write-Host "`nNo Supabase references found! The migration is complete." -ForegroundColor Green
}
