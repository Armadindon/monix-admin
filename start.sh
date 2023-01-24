#!/bin/sh

if [ -n "$BACKEND_URL" ]; then
    ESCAPED_BACKEND_URL=$(printf '%s\n' "$BACKEND_URL" | sed -e 's/[\/&]/\\&/g')
    sed -i "s/http:\/\/localhost:1337/$ESCAPED_BACKEND_URL/g" /usr/share/nginx/html/static/js/main.*.js
    echo "Successfully changed environment variable"
fi

nginx -g 'daemon off;'