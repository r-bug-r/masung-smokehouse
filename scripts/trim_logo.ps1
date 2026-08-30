Add-Type -AssemblyName System.Drawing

$filePath = "c:\dev\masung\public\logo.png"
$bmp = [System.Drawing.Bitmap]::FromFile($filePath)

$minX = $bmp.Width
$maxX = 0
$minY = $bmp.Height
$maxY = 0

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.A -gt 10) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

# Add small padding
$pad = 10
$cropX = [Math]::Max(0, $minX - $pad)
$cropY = [Math]::Max(0, $minY - $pad)
$cropW = [Math]::Min($bmp.Width - $cropX, ($maxX - $minX) + ($pad * 2))
$cropH = [Math]::Min($bmp.Height - $cropY, ($maxY - $minY) + ($pad * 2))

$cropRect = [System.Drawing.Rectangle]::new($cropX, $cropY, $cropW, $cropH)
$croppedBmp = $bmp.Clone($cropRect, $bmp.PixelFormat)
$bmp.Dispose()

# Save cropped image back
$croppedBmp.Save("c:\dev\masung\public\logo.png", [System.Drawing.Imaging.ImageFormat]::Png)
$croppedBmp.Dispose()
Write-Output "Trimmed transparent margins: $cropW x $cropH"
