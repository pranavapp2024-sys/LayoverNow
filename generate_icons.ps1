# PowerShell script to generate standard Chrome extension icons from base64 strings.
# Native to Windows, avoiding dependency on Node.js.

$iconsDir = Join-Path $PSScriptRoot "icons"
if (-not (Test-Path $iconsDir)) {
    New-Item -ItemType Directory -Force -Path $iconsDir | Out-Null
    Write-Host "Created directory: $iconsDir"
}

$ICON_BASE64 = @{
    "icon16.png" = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH6AYDFhgiO2kQoAAAAbBJREFUOMuFUk1Lw0AQfW+zaZqkNq22pbaKoqAIehAv4lXEg3gQv+JRxIP4Fd5EPLTiTxBPUhREvImCiuBJU9tms8lms4+HpG2sCg4Ms7xv3rx5OwPAOqchfV8QBJFj24ZtG7ZtCIJQJqIoFIIg5HmeJVEUrYdhGAHg4mKWSV0BvL5+vN3c3n29vH6wKIocAIwxbwzTNE3bNE1m26ZlmrptaLpu2KYh/FfQdd1WVVVTVcWqKiuqisVxHGeaptq2rVmWpZmmaZimaQAoiiIDwDRNzTRNTdf1N6VpmhJFEeP8H0mSWJZlGqapV1XVNE2zlWVZEsfxp6oqWpZpaZqmpaqaqihyHMcBoGZqGlmWGXme5WEYCqZpyCRJIjVNs+u6pvd913Vd0zSNc74C4BvAIAxDkWVZkWVZkWmaEsaYyLIM3/eFnuedHMeRrutK3/eVZVlsP0/T1D89PzY2N9bX1tdW11YlALBtW0qSxCRJYoqiSIyxz7Zty7ZtiTFWSZJEJEliAEjXdSWAMcZM09SNosgDwLquf7quKxljknO+kCSJKYoC27aP/7n9BwYVwJcQZ1oAAAAASUVORK5CYII=";
    
    "icon48.png" = "iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH6AYDFhg2B3NqWgAAAwtJREFUaN7tmr9rFEEUxz/v3s3lkkvicpZcxFprp7GyEsRCbUTBRsRCbMTGv8BCbMTGv8BCbETBQrGwsFCwsBDU2hErKzHkfLvL5e7tODa3h7tELrt3uRzMZ7k99s2H+b7MvNn3FpxxHOdg54ePHzPjE1NT05Px+MTUZDweHx2bGDdZxsfGx0z/uH+M/3b6O39jX+zYxX0/eLw/FoslIuFwOBwJh0Nh12g47BqXwyHHkGvIMeS48g/H9f/Wb4y9/s2f2JfbvY9F/x2Xf9b7cTgcCrs/85z1+5x1eF78u5x98ePy91n/4zZ9M/+f9z/u02f+/3r+Wf/j/D17Yvdf7t9m/eM2bepmX3x52pQv94+a9Pn/Z/3jNm1qE4tEwq7reW6v523WdXu9nrtZ/6P+x336mvdP3dRN/ePyP8b/uI3/D01N+t+d3s+/5n2Xfdd91/170zfqf9R/2l9sN9/MtzM19Z02dfOd/z9P/eP/X30+Nen8T5s2daP+R/2n/cV28818O/2dvrkvtnv5w2G3z4ZDhx2PfZ/Hjse+z3FchxzHcRxX/uG4/l2/Mfb6N39iX273Phb/73+415Dr9TmuPMMx5RlyfR6PfZ/t2g7bsd1eyO1/yFv9H/tK7P5Z79Xl9nk8t+cx2+f22A6X5RjyLMsxZDuWvRnL/oxt2zZl2zZt2zYt237ZluWwbNuibcuibNuWy7ZtWjZpWTZt26Zty6Jty6Jty5BlWfJnLDsze2a2ZfbMbEvsmdmW2DOyJ2JbxLbEvpB9Mdsi1o+sH1nvZ+39rPez1s9aP2vdj2v2c2P9nHXDz429XDPX38+1/X1/x9/xf+Gj7/s3fubf/Bl/45+9Wb4v+Xf5t/y5f/Jn/snf8Bf8+Wb5Z6//vfnM35nPMzPzX/5d/i1/7p/8mX/yN/wFf75Z/tnrf28+83fms/xz/8g/9w/8A3++Wf7Z639vPvN35rP8c//IP/cP/AN/vln+2et/bz7zd/4D/T4+H+Zc8e0AAAAASUVORK5CYII=";
    
    "icon128.png" = "iVBORw0KGgoAAAAAAElFTkSuQmCC"
}

foreach ($item in $ICON_BASE64.GetEnumerator()) {
    $filename = $item.Key
    $base64Str = $item.Value
    $filePath = Join-Path $iconsDir $filename
    
    $bytes = [System.Convert]::FromBase64String($base64Str)
    [System.IO.File]::WriteAllBytes($filePath, $bytes)
    
    Write-Host "Generated icon asset: $filePath"
}

Write-Host "All extension icons successfully generated!"
