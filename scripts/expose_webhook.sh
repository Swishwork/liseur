#!/bin/bash

# Run Tailscale funnel to expose adws/trigger_webhook.py to the public internet
# Uses Tailscale Funnel on port 8001 (where trigger_webhook.py runs)

echo "Exposing webhook server on https://kristophers-macbook-pro.tail0456fa.ts.net/liseur-webhook"
echo "Make sure trigger_webhook.py is running on port 8001"
echo ""

# Serve the local webhook server (port 8001) via Tailscale Funnel
tailscale funnel --bg --set-path=/liseur-webhook 8001