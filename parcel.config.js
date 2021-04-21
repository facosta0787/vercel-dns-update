const Parcel = require('parcel-bundler')
const path = require('path')

function main() {
  const entry = path.join(__dirname, './index.js')

  const options = {
    outDir: './bin',
    outFile: 'dns-update',
    cache: false,
    sourceMaps: false,
    target: 'node',
    bundleNodeModules: true,
    minify: true
  }

  const parcel = new Parcel(entry, options)

  parcel.on('buildEnd', () => {
    process.exit(0)
  });

  parcel.bundle()
}

main()