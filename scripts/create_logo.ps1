Add-Type -AssemblyName System.Drawing

$sourcePath = "C:\Users\Rye\.gemini\antigravity-ide\brain\1cc1f323-ac6f-4d6c-ac3d-a8e0791a579d\masung_smokehouse_logo_1788112207482.jpg"
$destPath = "c:\dev\masung\public\logo.png"

$bmp = [System.Drawing.Bitmap]::FromFile($sourcePath)
# Create a new 32-bit ARGB bitmap for clean transparency
$width = $bmp.Width
$height = $bmp.Height
$rect = [System.Drawing.Rectangle]::new(0, 0, $width, $height)
$newBmp = [System.Drawing.Bitmap]::new($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $height; $y++) {
    for ($x = 0; $x -lt $width; $x++) {
        $c = $bmp.GetPixel($x, $y)
        # If pixel is near pure black (background), make it transparent
        if ($c.R -lt 15 -and $c.G -lt 15 -and $c.B -lt 15) {
            $newBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } else {
            $newBmp.SetPixel($x, $y, $c)
        }
    }
}

$newBmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
$newBmp.Dispose()
$bmp.Dispose()
Write-Output "Successfully generated transparent logo.png"
