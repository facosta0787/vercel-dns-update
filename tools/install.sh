#!/bin/bash

curl https://raw.githubusercontent.com/facosta0787/vercel-dns-update/v0.0.1/bin/dns-update -o- | cat > dns-update &&
chmod +x dns-update