// Converts PNGs under public/assets to WebP, resized to display-appropriate widths.
// Usage: npm run compress-images
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..', 'public', 'assets')

function walk(dir) {
  let out = []
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name)
    if (f.isDirectory()) out = out.concat(walk(p))
    else if (f.name.endsWith('.png')) out.push(p)
  }
  return out
}

;(async () => {
  const files = walk(ROOT)
  if (files.length === 0) {
    console.log('No PNGs found under public/assets — nothing to do.')
    return
  }

  let totalBefore = 0
  let totalAfter = 0

  for (const f of files) {
    const isCard = path.basename(f).startsWith('card_')
    const maxWidth = isCard ? 1200 : 1920
    const before = fs.statSync(f).size
    const out = f.replace(/\.png$/, '.webp')

    await sharp(f)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(out)

    const after = fs.statSync(out).size
    totalBefore += before
    totalAfter += after

    console.log(
      path.relative(ROOT, f),
      (before / 1024).toFixed(0) + 'KB ->',
      (after / 1024).toFixed(0) + 'KB',
      '(' + (100 - (after / before) * 100).toFixed(0) + '% smaller)',
    )
    fs.unlinkSync(f)
  }

  console.log('---')
  console.log(
    'total',
    (totalBefore / 1024 / 1024).toFixed(2) + 'MB ->',
    (totalAfter / 1024 / 1024).toFixed(2) + 'MB',
  )
  console.log('Original PNGs removed. Update any url(...) / import references to .webp.')
})()
