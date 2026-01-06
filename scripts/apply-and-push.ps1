# PowerShell script to apply patch, create branch, push and open PR (if `gh` is installed)
# Usage: Open PowerShell in project root and run: .\scripts\apply-and-push.ps1

param(
  [string]$branchName = "fix/deploy-gh-pages",
  [string]$patchFile = "fix-deploy.patch",
  [string]$prBase = "main"
)

if (-not (Test-Path $patchFile)) {
  Write-Error "Patch file '$patchFile' not found in project root."
  exit 1
}

Write-Host "Creating branch $branchName..."
git checkout -b $branchName

Write-Host "Applying patch $patchFile..."
git apply --index $patchFile

Write-Host "Staging changes..."
git add -A

git commit -m "chore: set relative base, fix CSS and add GH Pages workflow"

Write-Host "Pushing branch to origin..."
git push -u origin $branchName

# Create PR if gh cli exists
if (Get-Command gh -ErrorAction SilentlyContinue) {
  Write-Host "Creating PR with gh..."
  gh pr create --base $prBase --fill
} else {
  Write-Host "gh CLI not found; open a PR manually on GitHub from branch $branchName"
}

Write-Host "Done. After merge, Actions will deploy to gh-pages (check Actions tab)."