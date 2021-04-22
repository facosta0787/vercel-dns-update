#!/bin/bash

curl -o- https://raw.githubusercontent.com/facosta0787/vercel-dns-update/main/bin/dns-update | cat > dns-update &&
chmod +x dns-update